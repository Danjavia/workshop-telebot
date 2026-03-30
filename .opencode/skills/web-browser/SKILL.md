# Skill: Web Browser
Esta habilidad permite al agente navegar e interactuar con sitios web utilizando un navegador real (Chromium). Es ideal para sitios que requieren JavaScript, Single-Page Applications (SPAs) o cuando se necesita realizar acciones interactivas como hacer clic o rellenar formularios.

## Cuándo usar esta habilidad
- Cuando el usuario proporciona una URL que requiere interacción o tiene contenido dinámico.
- Cuando se necesita navegar por varias páginas de un mismo sitio.
- Cuando el usuario pide "entrar en un sitio y buscar X" o "rellenar este formulario".

## Herramientas
- `navigate`: Abre una URL inicial en el navegador.
- `interact`: Realiza acciones como clic, escribir texto o esperar elementos.
- `scrape_page`: Extrae el contenido de la página actual y lo convierte a Markdown.

## Consejos de uso
1. Siempre comienza con `navigate` para abrir el sitio.
2. Usa `scrape_page` después de navegar o interactuar para ver el estado actual del sitio.
3. Si el sitio es complejo, realiza las acciones una por una y verifica el resultado.
