import { callLLM } from '../services/llm.js';
import { MemoryManager } from './memory.js';
import { getTool, generateToolsDescription } from '../tools/index.js';

const MAX_ITERATIONS = 5;

interface ToolCall {
  tool: string;
  parameters: Record<string, unknown>;
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

function parseToolCall(content: string): ToolCall | null {
  try {
    // Try to find JSON in the response
    const jsonMatch = content.match(/\{[\s\S]*"tool"[\s\S]*\}/);
    if (!jsonMatch) {
      return null;
    }

    const parsed = JSON.parse(jsonMatch[0]) as unknown;
    
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'tool' in parsed &&
      typeof (parsed as Record<string, unknown>).tool === 'string' &&
      'parameters' in parsed &&
      typeof (parsed as Record<string, unknown>).parameters === 'object'
    ) {
      return parsed as ToolCall;
    }

    return null;
  } catch {
    return null;
  }
}

async function executeTool(toolCall: ToolCall): Promise<string> {
  const tool = getTool(toolCall.tool);
  
  if (!tool) {
    return `Error: Tool "${toolCall.tool}" not found`;
  }

  try {
    const result = await tool.execute(toolCall.parameters || {});
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return `Error executing tool "${toolCall.tool}": ${errorMessage}`;
  }
}

export async function runAgent(
  userId: number,
  userMessage: string
): Promise<string> {
  const memory = new MemoryManager(userId);
  
  // Save user message to memory
  await memory.saveUserMessage(userMessage);
  
  // Build messages array
  const messages: Message[] = [];
  
  // Add system prompt with tools description
  const toolsDescription = generateToolsDescription();
  messages.push({
    role: 'system',
    content: `Eres OpenGravity, un asistente de IA útil que ejecuta localmente. Tienes acceso a herramientas que puedes usar para ayudar al usuario.

${toolsDescription}

Cuando necesites usar una herramienta, responde SOLO con el formato JSON mostrado arriba. Cuando no necesites herramientas, responde directamente de manera conversacional y útil en español.`,
  });
  
  // Add recent context from memory
  const recentMessages = await memory.getRecentContext(10);
  messages.push(...recentMessages);
  
  // Add current user message
  messages.push({
    role: 'user',
    content: userMessage,
  });
  
  // Agent loop
  let iteration = 0;
  let finalResponse = '';
  
  while (iteration < MAX_ITERATIONS) {
    iteration++;
    console.log(`Agent iteration ${iteration}/${MAX_ITERATIONS}`);
    
    try {
      const llmResponse = await callLLM(messages);
      
      // Check if it's a tool call
      const toolCall = parseToolCall(llmResponse);
      
      if (toolCall) {
        console.log(`Tool call detected: ${toolCall.tool}`);
        
        // Execute the tool
        const toolResult = await executeTool(toolCall);
        console.log(`Tool result: ${toolResult}`);
        
        // Add the tool interaction to messages
        messages.push({
          role: 'assistant',
          content: llmResponse,
        });
        messages.push({
          role: 'user',
          content: `Tool result: ${toolResult}`,
        });
        
        // Continue to next iteration
        continue;
      }
      
      // No tool call - this is the final response
      finalResponse = llmResponse;
      break;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`Error in iteration ${iteration}:`, errorMessage);
      
      if (iteration === MAX_ITERATIONS) {
        finalResponse = `I encountered an error and reached the maximum number of iterations. Error: ${errorMessage}`;
      } else {
        // Add error to context and try again
        messages.push({
          role: 'user',
          content: `There was an error: ${errorMessage}. Please try again.`,
        });
      }
    }
  }
  
  if (iteration >= MAX_ITERATIONS && !finalResponse) {
    finalResponse = 'I reached the maximum number of iterations without completing the task. Please try rephrasing your request.';
  }
  
  // Save assistant response to memory
  await memory.saveAssistantMessage(finalResponse);
  
  return finalResponse;
}
