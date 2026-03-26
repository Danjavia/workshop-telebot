## ADDED Requirements

### Requirement: Agent loop procesa mensajes iterativamente
El sistema SHALL ejecutar un loop que: recibe input → llama LLM → parsea respuesta → ejecuta tools si es necesario → repite hasta respuesta final.

#### Scenario: Respuesta directa sin tools
- **WHEN** el usuario envía un mensaje que no requiere herramientas
- **THEN** el LLM responde directamente y el loop termina en 1 iteración

#### Scenario: Ejecución con tool call
- **WHEN** el LLM solicita ejecutar una herramienta
- **THEN** el loop ejecuta la tool, envía el resultado al LLM, y continúa
- **AND** el LLM genera respuesta final basada en el resultado

### Requirement: Agent loop tiene límite máximo de iteraciones
El sistema SHALL limitar el loop a máximo 5 iteraciones por mensaje de usuario.

#### Scenario: Prevención de loops infinitos
- **WHEN** el LLM entra en un ciclo de tool calls repetitivos
- **THEN** después de 5 iteraciones el loop se detiene
- **AND** se retorna mensaje de error al usuario

### Requirement: Agent loop parsea tool calls del LLM
El sistema SHALL interpretar solicitudes de tool calls en formato JSON desde la respuesta del LLM.

#### Scenario: LLM solicita get_current_time
- **WHEN** el LLM responde con JSON indicando tool: "get_current_time"
- **THEN** el parser extrae el nombre de la tool y los parámetros
- **AND** el sistema ejecuta la herramienta correspondiente

#### Scenario: LLM responde sin tool calls
- **WHEN** el LLM responde con texto plano sin formato de tool call
- **THEN** el parser identifica que es respuesta final
- **AND** el loop termina y retorna la respuesta al usuario

### Requirement: Agent loop maneja errores de ejecución de tools
El sistema SHALL capturar errores en tools y enviarlos al LLM como feedback.

#### Scenario: Tool execution falla
- **WHEN** una herramienta lanza un error durante ejecución
- **THEN** el error se formatea y se envía al LLM como contexto
- **AND** el LLM puede decidir cómo responder al error

### Requirement: Agent loop integra contexto de memoria
El sistema SHALL incluir mensajes previos del usuario en cada iteración del loop.

#### Scenario: Conversación con contexto
- **WHEN** el agente procesa un mensaje
- **THEN** los últimos 10 mensajes de historial se incluyen en el prompt al LLM
