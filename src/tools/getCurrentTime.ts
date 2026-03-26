import type { Tool } from '../types/tool.js';

export const getCurrentTimeTool: Tool = {
  name: 'get_current_time',
  description: 'Obtiene la fecha y hora actual del sistema en formato legible para humanos',
  parameters: {
    type: 'object',
    properties: {
      format: {
        type: 'string',
        description: 'Formato de salida: "iso", "local", o "full". Default: "full"',
      },
    },
    required: [],
  },
  execute: async (params: Record<string, unknown>): Promise<string> => {
    const now = new Date();
    const format = (params.format as string) || 'full';
    
    switch (format) {
      case 'iso':
        return now.toISOString();
      case 'local':
        return now.toLocaleString();
      case 'full':
      default:
        return now.toLocaleString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
    }
  },
};
