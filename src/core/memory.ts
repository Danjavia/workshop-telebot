import { saveMessage, getRecentMessages } from '../services/db.js';

export class MemoryManager {
  private userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }

  async saveUserMessage(content: string): Promise<void> {
    await saveMessage(this.userId, 'user', content);
  }

  async saveAssistantMessage(content: string): Promise<void> {
    await saveMessage(this.userId, 'assistant', content);
  }

  async saveSystemMessage(content: string): Promise<void> {
    await saveMessage(this.userId, 'system', content);
  }

  async getRecentContext(limit: number = 10): Promise<Array<{ role: 'system' | 'user' | 'assistant'; content: string }>> {
    return await getRecentMessages(this.userId, limit);
  }
}
