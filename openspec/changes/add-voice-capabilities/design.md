## Context

OpenGravity actualmente solo procesa mensajes de texto. Se requiere añadir capacidades de voz para mejorar la accesibilidad y experiencia del usuario, permitiendo enviar mensajes de voz y recibir respuestas en audio.

## Goals / Non-Goals

**Goals:**
- Implementar transcripción de mensajes de voz usando Groq API (STT)
- Implementar síntesis de voz usando Deepgram API con voz femenina colombiana (TTS)
- Integrar manejo de mensajes de voz en el bot de Telegram
- Permitir al agente responder por voz cuando el usuario envía audio
- Mantener compatibilidad con mensajes de texto existentes

**Non-Goals:**
- Soporte para múltiples idiomas en STT/TTS en esta fase
- Voz masculina o variantes de acento diferentes
- Transcripción en tiempo real (streaming)
- Personalización de velocidad/pitch de la voz

## Decisions

### 1. STT con Groq API usando fetch nativo
**Decisión:** Usar Groq API endpoint `/openai/v1/audio/transcriptions` con modelo `whisper-large-v3`
- **Rationale:** Groq ofrece transcripción rápida y económica, API compatible con OpenAI
- **Implementación:** fetch nativo, método POST con FormData (file blob)

### 2. TTS con Deepgram API modelo aura-2-celeste-es
**Decisión:** Usar endpoint `/v1/speak` con modelo `aura-2-celeste-es` (voz femenina colombiana)
- **Rationale:** Deepgram ofrece calidad de voz superior y latencia baja
- **Headers:** Authorization Token, Content-Type text/plain
- **Output:** Archivo MP3 descargado

### 3. Flujo de procesamiento de voz
**Decisión:** Cuando el bot recibe un mensaje de voz:
1. Descargar archivo de audio desde Telegram
2. Transcribir usando Groq STT
3. Procesar transcripción como mensaje de texto normal (agent loop)
4. Generar respuesta de texto
5. Convertir respuesta a voz usando Deepgram TTS
6. Enviar audio de respuesta al usuario

### 4. Manejo de archivos temporales
**Decisión:** Usar directorio `temp/` para almacenar archivos de audio
- Descargar de Telegram → `temp/voice_${timestamp}.ogg`
- Respuesta TTS → `temp/response_${timestamp}.mp3`
- Limpiar archivos después de envío (o mantener breve tiempo para debug)

## Risks / Trade-offs

**[RISK]** Archivos de audio consumen almacenamiento temporal → **Mitigación:** Limpiar archivos después de procesamiento, límite de tamaño en descargas

**[RISK]** Latencia aumentada por doble procesamiento (STT + TTS + LLM) → **Mitigación:** Mostrar "typing" indicator, procesamiento asíncrono, considerar respuesta texto+音频 paralelo

**[RISK]** Dependencia adicional (Deepgram) → **Mitigación:** Fallback a respuesta de texto si TTS falla

**[RISK]** Costos de API (Groq STT + Deepgram TTS) → **Mitigación:** Monitorear uso, límites de rate

**[TRADE-OFF]** Voz solo en español colombiano → **Aceptable** para MVP, extensible a otros acentos/idiomas

## Migration Plan

No requiere migración de datos. Cambios son adicionales:
1. Añadir `DEEPGRAM_API_KEY` a `.env`
2. Desplegar nueva versión del bot
3. Los usuarios pueden inmediatamente usar mensajes de voz

## Open Questions

- ¿Límite de duración de mensajes de voz? (Sugerencia: 60 segundos máximo)
- ¿Respuesta siempre en voz cuando el input es voz, o opción del usuario?
