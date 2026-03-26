## ADDED Requirements

### Requirement: Sistema sintetiza voz usando Deepgram API
El sistema SHALL convertir texto de respuesta a audio usando Deepgram TTS.

#### Scenario: Generación exitosa de audio de respuesta
- **WHEN** el agente genera una respuesta de texto
- **THEN** el sistema envía el texto a Deepgram /v1/speak endpoint
- **AND** recibe archivo MP3 con la voz sintetizada

### Requirement: TTS usa voz femenina colombiana aura-2-celeste-es
El sistema SHALL usar el modelo aura-2-celeste-es para voz femenina colombiana.

#### Scenario: Configuración de voz colombiana
- **WHEN** se genera audio de respuesta
- **THEN** la URL incluye ?model=aura-2-celeste-es

### Requirement: Implementación usa fetch nativo con curl-equivalent
El sistema SHALL usar fetch nativo equivalente al ejemplo curl proporcionado.

#### Scenario: Llamada TTS con headers correctos
- **WHEN** se llama a Deepgram API
- **THEN** incluye headers: Authorization Token, Content-Type text/plain
- **AND** envía texto como body raw/plain text

### Requirement: Audio generado se envía a usuario de Telegram
El sistema SHALL enviar el archivo MP3 generado al chat de Telegram.

#### Scenario: Envío de respuesta por voz
- **WHEN** el audio TTS está listo
- **THEN** el bot envía el archivo como mensaje de voz a Telegram
- **AND** el usuario recibe el audio reproducible

### Requirement: Manejo de archivos temporales de audio
El sistema SHALL gestionar archivos temporales de audio de forma segura.

#### Scenario: Limpieza de archivos temporales
- **WHEN** el audio se envía exitosamente
- **THEN** el sistema elimina archivos temporales después de un tiempo
- **AND** no acumula archivos en disco

### Requirement: Fallback a texto si TTS falla
El sistema SHALL responder con texto si el servicio TTS no está disponible.

#### Scenario: Error en generación de voz
- **WHEN** Deepgram TTS retorna error
- **THEN** el sistema envía la respuesta como texto normal
- **AND** informa al usuario sobre la indisponibilidad temporal de voz
