import type { Tool } from '../types/tool.js';
import { getCurrentTimeTool } from './getCurrentTime.js';
import { learnSkillTool } from './learnSkill.js';
import { skillManager } from '../skills/SkillManager.js';

export const tools: Map<string, Tool> = new Map();

// Initialize skillManager callback
skillManager.setToolRegistrationCallback((tool: Tool) => {
  console.log(`Dynamically registering tool: ${tool.name}`);
  registerTool(tool);
});

export function registerTool(tool: Tool): void {
  tools.set(tool.name, tool);
}

export function getTool(name: string): Tool | undefined {
  return tools.get(name);
}

export function getAllTools(): Tool[] {
  return Array.from(tools.values());
}

export function generateToolsDescription(): string {
  const toolList = getAllTools();
  
  if (toolList.length === 0) {
    return '';
  }

  const descriptions = toolList.map((tool) => {
    const params = Object.entries(tool.parameters.properties)
      .map(([name, info]) => {
        const required = tool.parameters.required.includes(name) ? ' (requerido)' : ' (opcional)';
        return `    - ${name}: ${info.type}${required} - ${info.description}`;
      })
      .join('\n');

    return `
## ${tool.name}
${tool.description}

Parámetros:
${params || '    (sin parámetros)'}

Para usar esta herramienta, responde SOLO con este JSON:
{"tool": "${tool.name}", "parameters": {${tool.parameters.required.map(p => `"${p}": "valor"`).join(', ')}}}`;
  });

  return `Herramientas disponibles:\n${descriptions.join('\n---\n')}\n\nSi necesitas usar una herramienta, responde ÚNICAMENTE con el formato JSON. Si no necesitas herramientas, responde normalmente.`;
}

// Register all tools
registerTool(getCurrentTimeTool);
registerTool(learnSkillTool);
