# Skill: Firecrawl
Web scraping, search, and data extraction using Firecrawl API. Use when users need to fetch web content, discover URLs on sites, search the web, or extract structured data from pages.

## Cuándo usar esta habilidad
- **Scraping**: Obtener contenido de una URL específica en formato markdown.
- **Mapping**: Descubrir todas las URLs de un sitio web para entender su estructura.
- **Searching**: Buscar en la web y opcionalmente extraer resultados.
- **Extracting**: Extraer datos estructurados de páginas usando prompts de LLM.

## Comandos y Herramientas (Conceptos)
El agente debe preferir usar herramientas de Firecrawl cuando estén disponibles a través de MCP o herramientas locales.

### Scrape - Obtener contenido de página
Convierte una página web a markdown limpio.
- **Uso**: Obtener documentación, artículos o texto para análisis.
- **Opciones**: `--format markdown|summary`.

### Map - Descubrir URLs
Encuentra todas las URLs en un sitio web. Útil para entender la estructura antes de scrapear.
- **Opciones**: `--limit N` (por defecto 100).

### Search - Búsqueda Web
Busca en la web y devuelve resultados con scraping opcional.
- **Operadores**: `"frase exacta"`, `-término`, `site:dominio`, `intitle:palabra`.

### Extract - Datos Estructurados
Extrae datos específicos usando prompts de LLM y opcionalmente un JSON Schema.
- **Uso**: Precios, nombres, fechas, listas de características.

## Configuración de Entorno
Requiere la variable de entorno `FIRECRAWL_API_KEY`. Obtenla en: https://firecrawl.dev

## Eficiencia de Tokens
- **Scrape**: Markdown limpio truncado a 8000 caracteres.
- **Map**: Hasta 50 URLs con títulos.
- **Search**: Límite de 10 resultados con resúmenes.
- **Extract**: Devuelve solo los datos solicitados.

## Notas de Créditos
Firecrawl cobra por operación:
- Scrape: 1 crédito por página.
- Map: 1 crédito por llamada.
- Search: 1 crédito por resultado.
- Extract: Varía según la complejidad.
