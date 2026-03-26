## Why

Necesito un agente de IA personal que funcione completamente en local bajo mi control, sin depender de servicios cloud ni forks de proyectos existentes. OpenGravity proporcionará una interfaz segura via Telegram para ejecutar tareas, recordar información y ejecutar herramientas, priorizando la privacidad y el control total sobre mis datos.

## What Changes

- **Crear agente OpenGravity desde cero** con arquitectura modular TypeScript
- **Integración Telegram** usando grammy con long polling (sin servidor web)
- **Sistema de LLM dual**: Groq API como principal, OpenRouter como fallback
- **Memoria persistente** con SQLite usando better-sqlite3
- **Agent loop** con límite de iteraciones para prevención de loops infinitos
- **Sistema de herramientas** extensible (inicia con `get_current_time`)
- **Seguridad**: whitelist de Telegram user IDs, credenciales en .env
- **Estructura escalable** preparada para cloud (Render + Turso), transcripción, TTS, e integraciones adicionales

## Capabilities

### New Capabilities
- `telegram-bot`: Bot de Telegram con long polling, autenticación por whitelist, y manejo de mensajes
- `llm-client`: Cliente dual para Groq (primario) y OpenRouter (fallback) con manejo de rate limits
- `memory-store`: Almacenamiento persistente con SQLite para contexto de conversaciones y datos del usuario
- `agent-loop`: Sistema de ejecución iterativa con herramientas, parsing de respuestas LLM, y límites de seguridad
- `tool-system`: Framework extensible para registrar y ejecutar herramientas (time, futuras: búsqueda, APIs)

### Modified Capabilities
- Ninguno (proyecto nuevo)

## Impact

- **Nueva codebase TypeScript** con ES modules, completamente local
- **Sin dependencias externas no verificadas** - solo paquetes auditados
- **Configuración via .env** - tokens de Telegram, Groq, OpenRouter
- **Base para escalabilidad** - arquitectura preparada para migración a Render + Turso cloud
- **Futuras extensiones**: Deepgram (STT/TTS), múltiples canales, integraciones con servicios externos
