## ADDED Requirements

### Requirement: Cliente usa Groq API como proveedor primario
El sistema SHALL enviar prompts a Groq API usando modelos gratuitos disponibles.

#### Scenario: Envío exitoso de prompt a Groq
- **WHEN** el agente necesita una respuesta del LLM
- **THEN** el cliente Groq envía el prompt y retorna la respuesta

#### Scenario: Manejo de rate limit en Groq
- **WHEN** Groq retorna error 429 (rate limit exceeded)
- **THEN** el sistema captura el error y activa el fallback a OpenRouter

### Requirement: Cliente usa OpenRouter como fallback
El sistema SHALL intentar OpenRouter cuando Groq falle por rate limits o errores.

#### Scenario: Fallback exitoso a OpenRouter
- **WHEN** Groq retorna error de rate limit
- **THEN** el sistema reenvía el mismo prompt a OpenRouter
- **AND** retorna la respuesta de OpenRouter al agente

#### Scenario: Ambos proveedores fallan
- **WHEN** tanto Groq como OpenRouter retornan errores
- **THEN** el sistema retorna un mensaje de error informativo al agente
- **AND** el agente informa al usuario sobre el problema temporal

### Requirement: Cliente formatea mensajes en formato OpenAI-compatible
El sistema SHALL usar el formato de mensajes {role, content} compatible con chat completions.

#### Scenario: Conversación con historial
- **WHEN** el agente envía un array de mensajes con roles (system, user, assistant)
- **THEN** el cliente formatea correctamente para la API del proveedor activo

### Requirement: Cliente lee modelo de OpenRouter desde configuración
El sistema SHALL usar OPENROUTER_MODEL del .env para seleccionar el modelo fallback.

#### Scenario: Configuración de modelo personalizado
- **WHEN** OPENROUTER_MODEL="meta-llama/llama-3.3-70b-instruct"
- **THEN** el cliente OpenRouter usa ese modelo específico para las requests

### Requirement: Cliente incluye tool definitions en el prompt
El sistema SHALL incluir descripciones de tools disponibles en el system prompt.

#### Scenario: Tool calling habilitado
- **WHEN** se envía un prompt al LLM
- **THEN** el system message incluye descripción de todas las tools registradas
- **AND** instrucciones de cómo llamarlas en formato JSON
