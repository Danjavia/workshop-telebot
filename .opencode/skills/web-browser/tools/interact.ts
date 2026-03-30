import { Tool } from '../../../../src/types/tool.js';
import { browserService } from '../../../../src/services/browser.js';

export const tool: Tool = {
  name: 'interact',
  description: 'Realiza acciones interactivas en el navegador (clic, escribir, etc.).',
  parameters: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        description: 'La acción a realizar: "click", "type", "wait", "close".'
      },
      selector: {
        type: 'string',
        description: 'El selector CSS o XPath del elemento (requerido para clic y type).'
      },
      text: {
        type: 'string',
        description: 'El texto a escribir (requerido para type).'
      }
    },
    required: ['action']
  },
  execute: async ({ action, selector, text }) => {
    try {
      if (action === 'click') {
        if (!selector) return 'Error: Selector requerido para clic.';
        await browserService.click(selector as string);
        return `Clic realizado en ${selector}.`;
      }
      
      if (action === 'type') {
        if (!selector || text === undefined) return 'Error: Selector y texto requeridos para type.';
        await browserService.type(selector as string, text as string);
        return `Texto '${text}' escrito en ${selector}.`;
      }

      if (action === 'close') {
        await browserService.close();
        return 'Navegador cerrado con éxito.';
      }

      return `Error: Acción desconocida '${action}'.`;
    } catch (error) {
      return `Error al realizar acción '${action}': ${error instanceof Error ? error.message : String(error)}`;
    }
  }
};
