## ADDED Requirements

### Requirement: Bot maneja mensajes de voz de Telegram
El sistema SHALL recibir y procesar mensajes de voz (voice messages) enviados por usuarios.

#### Scenario: Usuario envía mensaje de voz
- **WHEN** un usuario autorizado envía una nota de voz en Telegram
- **THEN** el bot detecta el mensaje como tipo "voice"
- **AND** inicia el proceso de transcripción y respuesta

### Requirement: Bot descarga archivos de audio de Telegram
El sistema SHALL descargar el archivo de audio desde los servidores de Telegram.

#### Scenario: Descarga de archivo de voz
- **WHEN** se recibe un mensaje de voz
- **THEN** el bot obtiene el file_id y descarga el archivo
- **AND** guarda temporalmente el archivo en formato OGG

### Requirement: Bot envía mensajes de voz como respuesta
El sistema SHALL enviar archivos de audio como mensajes de voz en Telegram.

#### Scenario: Envío de respuesta por voz
- **WHEN** la respuesta TTS está lista
- **THEN** el bot envía el archivo MP3 como voice message
- **AND** el usuario puede reproducir la respuesta en Telegram

### Requirement: Procesamiento completo de voz a voz
El sistema SHALL procesar el flujo completo: voz entrada → texto → voz salida.

#### Scenario: Conversación por voz completa
- **WHEN** usuario envía mensaje de voz
- **THEN** bot transcribe el audio a texto
- **AND** procesa con el agente LLM
- **AND** genera respuesta de voz
- **AND** envía audio de respuesta al usuario

### Requirement: Indicador de procesamiento durante transcripción
El sistema SHALL mostrar "typing" o "uploading voice" mientras procesa audio.

#### Scenario: Indicador de actividad en audio
- **WHEN** el bot está transcribiendo o generando voz
- **THEN** envía acción "typing" o "uploading_voice_note" al chat
- **AND** el usuario ve que el bot está procesando
