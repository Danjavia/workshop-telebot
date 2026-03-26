## ADDED Requirements

### Requirement: Bot responde solo a usuarios autorizados
El sistema SHALL rechazar mensajes de usuarios cuyo ID no esté en TELEGRAM_ALLOWED_USER_IDS.

#### Scenario: Usuario no autorizado intenta interactuar
- **WHEN** un usuario con ID no permitido envía un mensaje al bot
- **THEN** el bot no procesa el mensaje y no responde

#### Scenario: Usuario autorizado interactúa exitosamente
- **WHEN** un usuario con ID en la whitelist envía un mensaje
- **THEN** el bot procesa el mensaje y responde normalmente

### Requirement: Bot usa long polling para recibir mensajes
El sistema SHALL usar grammy long polling para recibir mensajes sin necesidad de servidor web.

#### Scenario: Bot inicia y escucha mensajes
- **WHEN** se ejecuta npm run dev
- **THEN** el bot inicia long polling y escucha mensajes de Telegram

#### Scenario: Bot recibe mensaje de texto
- **WHEN** un usuario autorizado envía un mensaje de texto
- **THEN** el bot recibe el mensaje y lo envía al agente para procesamiento

### Requirement: Bot maneja comandos básicos
El sistema SHALL responder a /start y /help con información del agente.

#### Scenario: Usuario ejecuta /start
- **WHEN** un usuario autorizado envía /start
- **THEN** el bot responde con mensaje de bienvenida y capacidades del agente

#### Scenario: Usuario ejecuta /help
- **WHEN** un usuario autorizado envía /help
- **THEN** el bot responde con lista de comandos disponibles y uso

### Requirement: Bot muestra indicador de "typing" durante procesamiento
El sistema SHALL enviar acción "typing" mientras el agente procesa la respuesta.

#### Scenario: Bot procesa mensaje complejo
- **WHEN** el agente está generando una respuesta que toma más de 1 segundo
- **THEN** el bot envía acción "typing" al chat para indicar actividad
