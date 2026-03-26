import { env } from '../config/env.js';
import { readFile } from 'fs/promises';

const GROQ_STT_URL = 'https://api.groq.com/openai/v1/audio/transcriptions';
const STT_MODEL = 'whisper-large-v3';

interface SttResponse {
  text: string;
  error?: {
    message: string;
    type: string;
  };
}

/**
 * Transcribe an audio file using Groq STT API
 * @param audioFilePath - Path to the audio file (OGG format from Telegram)
 * @returns Transcribed text
 */
export async function transcribeVoice(audioFilePath: string): Promise<string> {
  console.log(`Transcribing audio file: ${audioFilePath}`);

  try {
    // Read file as buffer
    const fileBuffer = await readFile(audioFilePath);
    const blob = new Blob([fileBuffer], { type: 'audio/ogg' });
    
    // Create form data
    const formData = new FormData();
    formData.append('file', blob, 'voice.ogg');
    formData.append('model', STT_MODEL);

    const response = await fetch(GROQ_STT_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.GROQ_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq STT error: ${response.status} - ${errorText}`);
    }

    const data = await response.json() as SttResponse;
    
    if (data.error) {
      throw new Error(`Groq STT error: ${data.error.message}`);
    }

    const transcribedText = data.text || '';
    console.log(`Transcription result: ${transcribedText.substring(0, 100)}...`);
    
    return transcribedText;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('STT transcription failed:', errorMessage);
    throw new Error(`Failed to transcribe audio: ${errorMessage}`);
  }
}
