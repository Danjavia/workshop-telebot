## ADDED Requirements

### Requirement: Sistema de tools usa patrón registro común
El sistema SHALL registrar todas las tools en un mapa accesible por nombre único.

#### Scenario: Registrar una nueva tool
- **WHEN** se implementa una clase que cumple la interfaz Tool
- **THEN** se registra automáticamente en el registro de tools
- **AND** está disponible para ser llamada por el agente

### Requirement: Tool get_current_time retorna hora actual formateada
El sistema SHALL incluir la herramienta get_current_time que retorna la fecha/hora actual en formato legible.

#### Scenario: Usuario pregunta la hora
- **WHEN** el agente ejecuta get_current_time
- **THEN** retorna la fecha y hora actual del sistema en formato ISO/local

### Requirement: Interfaz Tool estandarizada
El sistema SHALL definir la interfaz: { name, description, parameters, execute(params) }.

#### Scenario: Implementación de tool válida
- **WHEN** una tool implementa name, description, parameters (JSON Schema), y execute
- **THEN** el sistema puede usarla en el agent loop sin errores

### Requirement: Tools exponen descripción para el LLM
El sistema SHALL generar descripciones de tools en formato que el LLM pueda entender para decidir cuándo usarlas.

#### Scenario: Prompt con tools disponibles
- **WHEN** se construye el system prompt
- **THEN** incluye descripción de todas las tools registradas
- **AND** especifica el formato para solicitar ejecución

### Requirement: Ejecución de tools es asíncrona
El sistema SHALL permitir que las tools ejecuten operaciones asíncronas.

#### Scenario: Tool con operación async
- **WHEN** una tool necesita esperar una operación externa
- **THEN** execute puede ser async y el agent loop espera su resolución

### Requirement: Sistema extensible para nuevas tools
El sistema SHALL permitir agregar nuevas tools sin modificar el código del agent loop.

#### Scenario: Agregar tool de búsqueda futura
- **WHEN** se implementa una tool de búsqueda siguiendo la interfaz
- **THEN** el registro la detecta automáticamente
- **AND** el LLM puede usarla sin cambios en el core
