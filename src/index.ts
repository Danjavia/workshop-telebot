import { initDatabase, closeDatabase } from './services/db.js';
import { setupBot, bot } from './bot.js';
import { skillManager } from './skills/SkillManager.js';

async function main(): Promise<void> {
  console.log('🚀 Starting OpenGravity Agent...');

  try {
    // Initialize database
    initDatabase();

    // Load skills
    await skillManager.loadAllSkills();

    // Setup bot handlers
    setupBot();

    // Start bot with long polling
    console.log('🤖 Bot is running with long polling...');
    await bot.start();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Failed to start:', errorMessage);
    process.exit(1);
  }
}

// Handle graceful shutdown
function shutdown(signal: string): void {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  
  // Stop bot
  bot.stop();
  
  // Close database
  closeDatabase();
  
  console.log('✅ Shutdown complete');
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Run main
main();
