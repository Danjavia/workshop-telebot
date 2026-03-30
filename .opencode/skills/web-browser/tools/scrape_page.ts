import { Tool } from '../../../../src/types/tool.js';
import { browserService } from '../../../../src/services/browser.js';
import { htmlToMarkdown } from '../../../../src/utils/markdown.js';

export const tool: Tool = {
  name: 'scrape_page',
  description: 'Extrae el contenido de la página actual y lo convierte a Markdown para su consumo.',
  parameters: {
    type: 'object',
    properties: {
      format: {
        type: 'string',
        description: 'Formato de salida (markdown por defecto).'
      }
    },
    required: []
  },
  execute: async () => {
    try {
      const html = await browserService.getContent();
      const markdown = htmlToMarkdown(html);
      return `Contenido extraído (Markdown):\n\n${markdown.substring(0, 4000)}`; // Truncado más agresivamente para evitar exceso de tokens en el prompt (aprox 1000 tokens)
    } catch (error) {
      return `Error al extraer contenido: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
};
