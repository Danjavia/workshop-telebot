## 1. Configuration & Environment

- [x] 1.1 Añadir DEEPGRAM_API_KEY a .env.example
- [x] 1.2 Validar DEEPGRAM_API_KEY en env.ts usando Zod
- [x] 1.3 Añadir dependencias necesarias (temp directory management si es necesario)

## 2. Voice STT Service (Groq)

- [x] 2.1 Crear servicio src/services/voiceStt.ts
- [x] 2.2 Implementar función transcribeVoice() con fetch nativo
- [x] 2.3 Usar endpoint Groq /openai/v1/audio/transcriptions
- [x] 2.4 Usar modelo whisper-large-v3
- [x] 2.5 Formatear FormData correctamente con archivo de audio
- [x] 2.6 Manejar errores de transcripción (rate limits, archivos inválidos)
- [x] 2.7 Retornar texto transcrito o error

## 3. Voice TTS Service (Deepgram)

- [x] 3.1 Crear servicio src/services/voiceTts.ts
- [x] 3.2 Implementar función synthesizeVoice() con fetch nativo
- [x] 3.3 Usar endpoint Deepgram https://api.deepgram.com/v1/speak
- [x] 3.4 Usar modelo aura-2-celeste-es (voz femenina colombiana)
- [x] 3.5 Implementar headers: Authorization Token, Content-Type text/plain
- [x] 3.6 Enviar texto como body raw/plain text
- [x] 3.7 Guardar respuesta como archivo MP3 temporal
- [x] 3.8 Retornar path del archivo generado
- [x] 3.9 Manejar errores de Deepgram API

## 4. Telegram Voice Handler

- [x] 4.1 Crear handler de mensajes de voz en src/bot.ts
- [x] 4.2 Detectar mensajes tipo "voice" usando grammy
- [x] 4.3 Descargar archivo de audio desde Telegram (file_id → URL → descarga)
- [x] 4.4 Guardar archivo temporalmente (formato OGG)
- [x] 4.5 Llamar a servicio STT para transcribir
- [x] 4.6 Procesar texto transcrito con agent loop existente
- [x] 4.7 Generar respuesta de voz usando TTS
- [x] 4.8 Enviar archivo MP3 como mensaje de voz al usuario
- [x] 4.9 Implementar typing/uploading_voice_note indicators

## 5. Audio File Management

- [x] 5.1 Crear directorio temp/ para archivos de audio
- [x] 5.2 Implementar función generateTempPath() para nombres únicos
- [x] 5.3 Limpiar archivos temporales después de envío (cleanup)
- [x] 5.4 Añadir temp/ a .gitignore

## 6. Integration & Error Handling

- [x] 6.1 Integrar servicios STT y TTS en el flujo del bot
- [x] 6.2 Implementar fallback a texto si TTS falla
- [x] 6.3 Añadir mensajes de error informativos al usuario
- [x] 6.4 Verificar que mensajes de texto siguen funcionando
- [ ] 6.5 Probar flujo completo: voz → texto → voz (requiere pruebas manuales)

## 7. Testing & Verification

- [ ] 7.1 Testear transcripción STT con audio de prueba
- [ ] 7.2 Testear generación TTS con texto de prueba
- [ ] 7.3 Testear envío y recepción de mensajes de voz en Telegram
- [ ] 7.4 Verificar calidad de voz colombiana (aura-2-celeste-es)
- [ ] 7.5 Testear manejo de errores (API no disponible)
- [ ] 7.6 Verificar limpieza de archivos temporales
