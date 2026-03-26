import sqlite3 from 'sqlite3';
import { env } from '../config/env.js';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

let db: sqlite3.Database | null = null;

export async function initDatabase(): Promise<sqlite3.Database> {
  const dbPath = env.DATABASE_PATH;
  
  // Ensure data directory exists
  const dataDir = dirname(dbPath);
  try {
    mkdirSync(dataDir, { recursive: true });
  } catch {
    // Directory might already exist
  }
  
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        reject(err);
        return;
      }
      
      // Create messages table if not exists
      db!.exec(`
        CREATE TABLE IF NOT EXISTS messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          role TEXT NOT NULL CHECK(role IN ('system', 'user', 'assistant')),
          content TEXT NOT NULL,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
          metadata TEXT
        );
        
        CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
        CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);
      `, (err) => {
        if (err) {
          reject(err);
          return;
        }
        console.log('Database initialized at:', dbPath);
        resolve(db!);
      });
    });
  });
}

export function getDatabase(): sqlite3.Database {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

export function closeDatabase(): void {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Database connection closed');
      }
    });
    db = null;
  }
}

export async function saveMessage(
  userId: number,
  role: 'system' | 'user' | 'assistant',
  content: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  const database = getDatabase();
  
  return new Promise((resolve, reject) => {
    const stmt = database.prepare(
      'INSERT INTO messages (user_id, role, content, metadata) VALUES (?, ?, ?, ?)'
    );
    stmt.run(userId, role, content, metadata ? JSON.stringify(metadata) : null, (err: Error | null) => {
      stmt.finalize();
      if (err) {
        console.error('Error saving message:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function getRecentMessages(
  userId: number,
  limit: number = 10
): Promise<Array<{ role: 'system' | 'user' | 'assistant'; content: string }>> {
  const database = getDatabase();
  
  return new Promise((resolve, reject) => {
    database.all(
      'SELECT role, content FROM messages WHERE user_id = ? ORDER BY timestamp DESC LIMIT ?',
      [userId, limit],
      (err: Error | null, results: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>) => {
        if (err) {
          console.error('Error retrieving messages:', err);
          reject(err);
          return;
        }
        resolve(results.reverse()); // Return in chronological order
      }
    );
  });
}
