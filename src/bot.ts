import { bot, whitelistMiddleware, sendTypingIndicator, setupCommandHandlers } from './services/telegram.js';
import { InputFile } from 'grammy';
import { runAgent } from './core/agent.js';
import { transcribeVoice } from './services/voiceStt.js';
import { synthesizeVoice } from './services/voiceTts.js';
import { ensureTempDir, generateTempPath } from './utils/tempFiles.js';
import { writeFile } from 'fs/promises';
import { unlink } from 'fs/promises';

export function setupBot(): void {
  // Ensure temp directory exists
  ensureTempDir();

  // Setup command handlers
  setupCommandHandlers();

  // Apply whitelist middleware to all updates
  bot.use(whitelistMiddleware);

  // Handle text messages
  bot.on('message:text', async (ctx) => {
    const userId = ctx.from?.id;
    const messageText = ctx.message.text;

    if (!userId) {
      return;
    }

    console.log(`Received text message from ${userId}: ${messageText}`);

    try {
      // Show typing indicator
      await sendTypingIndicator(ctx.chat.id);

      // Run agent
      const response = await runAgent(userId, messageText);

      // Send response
      await ctx.reply(response);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error processing message:', errorMessage);
      await ctx.reply('Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta de nuevo.');
    }
  });

  // Handle voice messages
  bot.on('message:voice', async (ctx) => {
    const userId = ctx.from?.id;

    if (!userId) {
      return;
    }

    console.log(`Received voice message from ${userId}`);

    try {
      // Show uploading voice indicator
      await ctx.replyWithChatAction('upload_voice');

      // Get voice file info
      const voice = ctx.message.voice;
      const fileId = voice.file_id;

      // Get file URL from Telegram
      const file = await ctx.api.getFile(fileId);
      const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;

      // Download audio file
      const tempOggPath = generateTempPath('voice', 'ogg');
      console.log(`Downloading voice file to: ${tempOggPath}`);

      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Failed to download voice file: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      await writeFile(tempOggPath, Buffer.from(arrayBuffer));

      // Transcribe voice to text
      await ctx.replyWithChatAction('typing');
      const transcribedText = await transcribeVoice(tempOggPath);
      console.log(`Transcribed: ${transcribedText}`);

      // Process with agent
      await ctx.replyWithChatAction('typing');
      const agentResponse = await runAgent(userId, transcribedText);

      // Generate voice response
      await ctx.replyWithChatAction('upload_voice');
      const tempMp3Path = generateTempPath('response', 'mp3');
      
      try {
        await synthesizeVoice(agentResponse, tempMp3Path);

        // Send voice response
        await ctx.replyWithVoice(new InputFile(tempMp3Path));
      } catch (ttsError) {
        // Fallback to text if TTS fails
        console.error('TTS failed, falling back to text:', ttsError);
        await ctx.reply(agentResponse);
      }

      // Cleanup temp files
      try {
        await unlink(tempOggPath);
        await unlink(tempMp3Path);
      } catch (cleanupError) {
        console.error('Error cleaning up temp files:', cleanupError);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error processing voice message:', errorMessage);
      await ctx.reply('Lo siento, ocurrió un error al procesar tu mensaje de voz. Por favor, intenta de nuevo o usa texto.');
    }
  });
}

export { bot };
