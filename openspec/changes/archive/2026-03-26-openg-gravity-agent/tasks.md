## 1. Project Setup & Configuration

- [x] 1.1 Create project structure: src/{config,services,core,tools}/ directories
- [x] 1.2 Create package.json with ES modules, TypeScript, and all dependencies (grammy, better-sqlite3, tsx, zod, dotenv)
- [x] 1.3 Create .env.example with todas las variables documentadas
- [x] 1.4 Create .gitignore para Node.js, SQLite, y archivos de entorno
- [x] 1.5 Create tsconfig.json con configuración para ES modules

## 2. Config Module

- [x] 2.1 Implement env.ts con validación de variables usando Zod
- [x] 2.2 Validar TELEGRAM_BOT_TOKEN, TELEGRAM_ALLOWED_USER_IDS (array), GROQ_API_KEY, OPENROUTER_API_KEY, OPENROUTER_MODEL

## 3. Services Layer

- [x] 3.1 Implement Telegram service (services/telegram.ts) con grammy Bot
- [x] 3.2 Implement whitelist middleware que filtra usuarios no autorizados
- [x] 3.3 Implement handlers para /start y /help
- [x] 3.4 Implement typing indicator helper
- [x] 3.5 Implement Groq client (services/groq.ts) con fetch
- [x] 3.6 Implement OpenRouter client (services/openrouter.ts) con fallback
- [x] 3.7 Implement dual LLM wrapper que intenta Groq primero, luego OpenRouter
- [x] 3.8 Implement SQLite service (services/db.ts) con better-sqlite3
- [x] 3.9 Crear esquema de tabla messages con init script

## 4. Tools System

- [x] 4.1 Definir interfaz Tool en types/tool.ts
- [x] 4.2 Implementar registry de tools en tools/index.ts
- [x] 4.3 Implementar get_current_time tool
- [x] 4.4 Crear función para generar descripción de tools para LLM prompts

## 5. Core Agent System

- [x] 5.1 Implementar MemoryManager en core/memory.ts (saveMessage, getRecentMessages)
- [x] 5.2 Implementar agent loop en core/agent.ts con límite de 5 iteraciones
- [x] 5.3 Implementar parser de tool calls desde respuestas LLM
- [x] 5.4 Implementar integración de contexto histórico en cada iteración
- [x] 5.5 Implementar manejo de errores en tool execution

## 6. Bot Integration & Entry Point

- [x] 6.1 Crear handler de mensajes de texto en src/bot.ts
- [x] 6.2 Integrar agent loop con Telegram message handler
- [x] 6.3 Implementar envío de respuestas al usuario via Telegram
- [x] 6.4 Crear index.ts como entry point con inicialización de servicios
- [x] 6.5 Implementar graceful shutdown para SQLite y bot

## 7. Testing & Verification

- [x] 7.1 Verificar npm install ejecuta sin errores
- [x] 7.2 Verificar npm run dev inicia el bot con long polling
- [ ] 7.3 Testear comando /start responde a usuarios autorizados
- [ ] 7.4 Testear usuarios no autorizados son ignorados
- [ ] 7.5 Testear get_current_time tool ejecuta correctamente
- [ ] 7.6 Verificar persistencia de mensajes en SQLite
