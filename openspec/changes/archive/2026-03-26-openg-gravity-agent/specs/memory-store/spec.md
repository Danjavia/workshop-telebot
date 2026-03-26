## ADDED Requirements

### Requirement: Sistema persiste mensajes en SQLite
El sistema SHALL almacenar cada mensaje de conversación en la base de datos SQLite.

#### Scenario: Guardar mensaje de usuario
- **WHEN** un usuario autorizado envía un mensaje
- **THEN** el sistema almacena el mensaje con role="user", timestamp, y user_id

#### Scenario: Guardar respuesta del agente
- **WHEN** el agente genera una respuesta
- **THEN** el sistema almacena la respuesta con role="assistant" y contexto relevante

### Requirement: Sistema recupera historial de conversación
El sistema SHALL recuperar los últimos N mensajes de un usuario específico.

#### Scenario: Recuperar contexto para el agente
- **WHEN** el agente necesita contexto previo para responder
- **THEN** el sistema retorna los últimos 10 mensajes del usuario ordenados por timestamp

### Requirement: Esquema de base de datos minimalista
El sistema SHALL usar un esquema simple: tabla `messages` con campos (id, user_id, role, content, timestamp, metadata).

#### Scenario: Creación de tabla inicial
- **WHEN** el sistema inicia por primera vez
- **THEN** la tabla `messages` se crea automáticamente si no existe

### Requirement: Base de datos inicializa automáticamente
El sistema SHALL crear la base de datos y tablas en la primera ejecución si no existen.

#### Scenario: Primera ejecución del bot
- **WHEN** npm run dev ejecuta por primera vez
- **THEN** se crea el archivo SQLite y las tablas necesarias

### Requirement: API simple para operaciones CRUD
El sistema SHALL exponer métodos: saveMessage(userId, role, content), getRecentMessages(userId, limit).

#### Scenario: Guardar y recuperar mensajes
- **WHEN** se llama a saveMessage() con datos válidos
- **THEN** el mensaje se persiste y getRecentMessages() puede recuperarlo
