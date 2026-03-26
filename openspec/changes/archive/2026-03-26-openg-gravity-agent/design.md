## Context

OpenGravity es un agente de IA personal diseñado para ejecutarse completamente en local. El usuario requiere un sistema modular, seguro y escalable que use Telegram como única interfaz de comunicación. No es un fork de proyectos existentes - es una implementación propia desde cero.

**Stack tecnológico elegido:**
- TypeScript con ES modules para código moderno y mantenible
- grammy para bot de Telegram con long polling (evita necesidad de servidor web)
- Groq API como LLM primario (modelos gratuitos como Llama 3.3 70B)
- OpenRouter como fallback cuando Groq llegue a límites
- better-sqlite3 para persistencia local simple y robusta
- tsx para ejecución en desarrollo sin compilación explícita

## Goals / Non-Goals

**Goals:**
- Arquitectura modular con separación clara de responsabilidades
- Comunicación bidireccional via Telegram con autenticación segura (whitelist)
- Sistema de agente con loop iterativo y herramientas ejecutables
- Memoria persistente para contexto entre conversaciones
- Manejo graceful de fallbacks cuando el LLM primario no esté disponible
- Base escalable para futuras extensiones (cloud, STT, TTS, más canales)

**Non-Goals:**
- Interfaz web o API REST (solo Telegram)
- Soporte multi-usuario fuera del whitelist (intencionalmente restringido)
- Procesamiento de audio/imagen en fase inicial (preparado para extensión)
- Deploy automático a cloud en esta fase (pero arquitectura preparada)

## Decisions

### 1. Arquitectura de Módulos
**Decisión:** Estructura por capas: `config/` → `services/` → `core/` → `tools/`
- **config/**: Variables de entorno y validación
- **services/**: Clientes externos (Telegram, Groq, OpenRouter, DB)
- **core/**: Lógica del agente (loop, memory management)
- **tools/**: Implementaciones de herramientas disponibles

**Rationale:** Cada capa tiene una responsabilidad única. Services son stateless clients, core contiene la lógica de negocio, tools son plugins ejecutables.

### 2. Telegram Long Polling vs Webhook
**Decisión:** Long polling con `bot.start()` de grammy
- **Alternativa considerada:** Webhook requiere servidor web expuesto y SSL
- **Ventaja:** Funciona en local sin configuración de dominio/SSL
- **Trade-off:** Menos eficiente para alta carga (irrelevante para uso personal)

### 3. Dual LLM Strategy (Groq + OpenRouter)
**Decisión:** Groq como primario, OpenRouter como fallback automático
- **Patrón:** Intentar Groq primero, capturar errores 429/límites, failover a OpenRouter
- **Configuración:** OPENROUTER_MODEL configurable para diferentes modelos gratuitos
- **Rationale:** Groq es más rápido y tiene buenos modelos gratuitos, pero OpenRouter ofrece más opciones si hay rate limiting

### 4. SQLite con better-sqlite3
**Decisión:** better-sqlite3 sobre Turso para fase local
- **Alternativa considerada:** Turso (libsql) para cloud
- **Rationale:** better-sqlite3 es síncrono, más simple, zero-config para local. La arquitectura permite migrar a Turso en cloud luego.
- **Esquema mínimo:** Tabla `conversations` (user_id, message, role, timestamp, context)

### 5. Agent Loop con Límite de Iteraciones
**Decisión:** Loop máximo 5 iteraciones por mensaje de usuario
- **Flujo:** User input → LLM → Parse response → If tool call → Execute → Loop → Final response
- **Seguridad:** Límite absoluto previene loops infinitos por errores LLM
- **Detección de fin:** Respuesta sin tool calls o mensaje explícito "final_answer"

### 6. Sistema de Tools Extensible
**Decisión:** Pattern registry + interface común
```typescript
interface Tool {
  name: string;
  description: string;
  parameters: JSONSchema;
  execute: (params: any) => Promise<string>;
}
```
- **Registro:** Mapa en `core/tools/` que expone todas las tools disponibles
- **LLM Prompting:** Lista de tools inyectada en system prompt para que LLM sepa qué puede llamar

### 7. Estructura de Mensajes y Contexto
**Decisión:** Almacenar historial completo en SQLite, inyectar ventana reciente en prompts
- **Ventana de contexto:** Últimos 10 mensajes para LLM
- **Persistencia:** Toda la conversación guardada para referencia futura
- **Formato:** OpenAI-style messages array {role, content}

## Risks / Trade-offs

**[RISK]** Rate limiting en LLMs gratuitos afecta experiencia → **Mitigación:** Fallback automático a OpenRouter, mensaje informativo al usuario si ambos fallan

**[RISK]** SQLite local no permite múltiples instancias simultáneas → **Mitigación:** Single-process design intencional. Para cloud futuro, migrar a Turso.

**[RISK]** LLM puede generar tool calls inválidos → **Mitigación:** Schema validation con Zod, error handling graceful que informa al LLM para corregir

**[RISK]** Crecimiento de base de datos SQLite sin límite → **Mitigación:** Implementar rotación/archivado de conversaciones antiguas en iteración futura

**[TRADE-OFF]** Long polling consume más batería/recursos que webhooks → **Aceptable** para uso personal y desarrollo local

## Migration Plan

Esta es la fase inicial (Foundation). Próximas fases planificadas:

1. **Fase 1 (Actual):** Local-only, better-sqlite3, long polling
2. **Fase 2 (Cloud-ready):** Migrar a Turso, webhook opcional, deploy en Render
3. **Fase 3 (Audio):** Integrar Deepgram para STT/TTS
4. **Fase 4 (Multi-channel):** WhatsApp, Discord adicionales

La arquitectura actual está diseñada para soportar estas migraciones sin rewrites mayores.

## Open Questions

- Ninguno - requisitos claros para fase inicial
