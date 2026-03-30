import { Tool } from '../../../../src/types/tool.js';
import { browserService } from '../../../../src/services/browser.js';

export const tool: Tool = {
  name: 'navigate',
  description: 'Abre una URL inicial en el navegador Chromium en modo headless.',
  parameters: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'La URL completa que quieres abrir (ej. https://example.com).'
      }
    },
    required: ['url']
  },
  execute: async ({ url }) => {
    try {
      if (!url || typeof url !== 'string') {
        return 'Error: Debes proporcionar una URL válida.';
      }
      await browserService.navigate(url);
      return `Navegación exitosa a ${url}. Ahora puedes usar 'scrape_page' para ver el contenido o 'interact' para realizar acciones.`;
    } catch (error) {
      return `Error al navegar a ${url}: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
};
