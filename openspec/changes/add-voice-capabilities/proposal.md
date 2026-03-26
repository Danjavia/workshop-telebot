## Why

El agente OpenGravity necesita capacidades de voz para ofrecer una experiencia más natural y accesible. Los usuarios deben poder enviar mensajes de voz para ser transcritos y recibir respuestas en audio con voz femenina colombiana, mejorando la accesibilidad y usabilidad del agente.

## What Changes

- **Integración STT (Speech-to-Text)** usando Groq API para transcribir mensajes de voz de Telegram
- **Integración TTS (Text-to-Speech)** usando Deepgram API con modelo `aura-2-celeste-es` para voz femenina colombiana
- **Handler de mensajes de voz** en el bot de Telegram para procesar notas de voz
- **Sistema de respuesta por voz** que convierte las respuestas del agente en audio MP3
- **Configuración de Deepgram API key** en variables de entorno
- **Manejo de archivos temporales** para audio (descarga y envío)

## Capabilities

### New Capabilities
- `voice-stt`: Transcripción de mensajes de voz usando Groq API (modelo whisper-large-v3)
- `voice-tts`: Síntesis de voz usando Deepgram API con voz femenina colombiana (aura-2-celeste-es)
- `telegram-voice`: Manejo de mensajes de voz en Telegram (recepción y envío)

### Modified Capabilities
- Ninguno (extensión de funcionalidad existente)

## Impact

- **Nuevas dependencias**: Deepgram API para TTS, fetch nativo para Groq STT
- **Variables de entorno**: `DEEPGRAM_API_KEY` requerida
- **Cambios en servicios**: Extensión de servicio Telegram para manejar voice messages
- **API externas**: Groq (STT), Deepgram (TTS)
- **Archivos temporales**: Manejo de archivos de audio descargados y generados
