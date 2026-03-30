import { callGroq } from './groq.js';
import { callOpenRouter } from './openrouter.js';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function callLLM(messages: Message[]): Promise<string> {
  try {
    console.log('Attempting Groq API...');
    const response = await callGroq(messages);
    console.log('Groq API succeeded');
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes('RATE_LIMIT') || errorMessage.includes('rate_limit_exceeded')) {
      console.log('Groq limit exceeded, falling back to OpenRouter...');
      try {
        const response = await callOpenRouter(messages);
        console.log('OpenRouter fallback succeeded');
        return response;
      } catch (fallbackError) {
        const fallbackMessage = fallbackError instanceof Error ? fallbackError.message : String(fallbackError);
        console.error('OpenRouter fallback failed:', fallbackMessage);
        throw new Error(`Both LLM providers failed. Groq: LIMIT_EXCEEDED, OpenRouter: ${fallbackMessage}`);
      }
    }
    
    console.error('Groq error:', errorMessage);
    throw error;
  }
}
