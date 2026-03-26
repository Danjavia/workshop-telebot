## ADDED Requirements

### Requirement: Sistema transcribe mensajes de voz usando Groq API
El sistema SHALL enviar archivos de audio a Groq API para obtener la transcripción en texto.

#### Scenario: Transcripción exitosa de mensaje de voz
- **WHEN** el bot recibe un archivo de audio de Telegram
- **THEN** el sistema descarga el archivo y lo envía a Groq STT endpoint
- **AND** obtiene el texto transcrito para procesamiento

### Requirement: Groq STT usa modelo whisper-large-v3
El sistema SHALL usar el modelo whisper-large-v3 para transcripción.

#### Scenario: Configuración de modelo STT
- **WHEN** se envía audio a Groq API
- **THEN** la request usa model="whisper-large-v3" en el FormData

### Requirement: Implementación usa fetch nativo
El sistema SHALL usar fetch nativo de Node.js para llamadas a Groq STT.

#### Scenario: Llamada STT sin librerías externas
- **WHEN** se transcribe un mensaje de voz
- **THEN** se usa fetch() nativo, no dependencias adicionales de HTTP

### Requirement: Manejo de errores en transcripción
El sistema SHALL manejar errores de Groq STT gracefulmente.

#### Scenario: Error en transcripción
- **WHEN** Groq STT retorna error (rate limit, archivo inválido, etc.)
- **THEN** el sistema informa al usuario sobre el error
- **AND** no crashea el bot
