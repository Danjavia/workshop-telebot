import fs from 'fs/promises';
import path from 'path';
import { Tool } from '../types/tool.js';

export interface Skill {
  name: string;
  description: string;
  instructions: string;
  tools: Tool[];
}

export class SkillManager {
  private skillsPath: string;
  private learnedSkills: Map<string, Skill> = new Map();
  private onToolRegistered?: (tool: Tool) => void;

  constructor(skillsPath: string = path.join(process.cwd(), '.opencode', 'skills')) {
    this.skillsPath = skillsPath;
  }

  setToolRegistrationCallback(callback: (tool: Tool) => void) {
    this.onToolRegistered = callback;
  }

  async learnSkill(skillName: string): Promise<Skill> {
    const skillDir = path.join(this.skillsPath, skillName);
    const skillFile = path.join(skillDir, 'SKILL.md');

    try {
      const content = await fs.readFile(skillFile, 'utf-8');
      
      const skill: Skill = {
        name: skillName,
        description: `Specialized skill for ${skillName}`,
        instructions: content,
        tools: []
      };

      // Load tools from the tools directory if it exists
      const toolsDir = path.join(skillDir, 'tools');
      try {
        const toolFiles = await fs.readdir(toolsDir);
        for (const file of toolFiles) {
          if (file.endsWith('.js') || file.endsWith('.ts')) {
            try {
              // Using file:// protocol for ESM compatibility with absolute paths
              const toolModule = await import(`file://${path.join(toolsDir, file)}`);
              const tool = toolModule.tool || toolModule.default;
              
              if (tool && typeof tool === 'object' && 'name' in tool && 'execute' in tool) {
                skill.tools.push(tool as Tool);
                if (this.onToolRegistered) {
                  this.onToolRegistered(tool as Tool);
                }
                console.log(`Dynamically loaded tool "${tool.name}" from skill "${skillName}"`);
              }
            } catch (importError) {
              console.error(`Error importing tool from ${file}:`, importError);
            }
          }
        }
      } catch (e) {
        // No tools directory or error reading it
      }

      this.learnedSkills.set(skillName, skill);
      return skill;
    } catch (error) {
      throw new Error(`Failed to learn skill ${skillName}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  getLearnedSkills(): Skill[] {
    return Array.from(this.learnedSkills.values());
  }

  getInstructions(): string {
    return Array.from(this.learnedSkills.values())
      .map(skill => `## Skill: ${skill.name}\n${skill.instructions}`)
      .join('\n\n');
  }
}

// Export a singleton instance
export const skillManager = new SkillManager();
