import { Tool } from '../types/tool.js';
import { skillManager } from '../skills/SkillManager.js';

export const learnSkillTool: Tool = {
  name: 'learnSkill',
  description: 'Loads a specialized skill from the local skill directory to enhance the agent\'s capabilities.',
  parameters: {
    type: 'object',
    properties: {
      skillName: {
        type: 'string',
        description: 'The name of the skill to learn (e.g., "openspec-propose").'
      }
    },
    required: ['skillName']
  },
  execute: async ({ skillName }) => {
    try {
      const skill = await skillManager.learnSkill(skillName as string);
      return `Successfully learned skill: ${skill.name}. New instructions are now available in your system prompt and any associated tools have been registered.`;
    } catch (error) {
      return `Error learning skill: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
};
