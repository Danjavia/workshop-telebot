import { Bot, type Context, type NextFunction } from 'grammy';
import { env } from '../config/env.js';

export const bot = new Bot(env.TELEGRAM_BOT_TOKEN);

export function whitelistMiddleware(ctx: Context, next: NextFunction): Promise<void> | void {
  const userId = ctx.from?.id;
  
  if (!userId) {
    return;
  }
  
  if (!env.TELEGRAM_ALLOWED_USER_IDS.includes(userId)) {
    console.log(`Blocked unauthorized user: ${userId}`);
    return;
  }
  
  return next();
}

export async function sendTypingIndicator(chatId: number): Promise<void> {
  await bot.api.sendChatAction(chatId, 'typing');
}

export function setupCommandHandlers(): void {
  bot.command('start', async (ctx) => {
    await ctx.reply(
      '🤖 *OpenGravity Agent*\n\n' +
      'Tu agente de IA personal está listo.\n\n' +
      '*Comandos disponibles:*\n' +
      '/start - Iniciar el bot\n' +
      '/help - Ver ayuda\n\n' +
      'Envía cualquier mensaje y el agente responderá usando IA.',
      { parse_mode: 'Markdown' }
    );
  });

  bot.command('help', async (ctx) => {
    await ctx.reply(
      '📖 *Ayuda de OpenGravity*\n\n' +
      'Este es un agente de IA que:\n' +
      '• Responde a tus mensajes\n' +
      '• Ejecuta herramientas (ej: consultar hora)\n' +
      '• Recuerda el contexto de conversación\n\n' +
      '*Herramientas disponibles:*\n' +
      '• get_current_time - Consulta la hora actual\n\n' +
      'Simplemente envía un mensaje con lo que necesites.',
      { parse_mode: 'Markdown' }
    );
  });
}
