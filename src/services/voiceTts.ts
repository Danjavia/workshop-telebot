import { env } from '../config/env.js';
import { writeFile } from 'fs/promises';

const DEEPGRAM_TTS_URL = 'https://api.deepgram.com/v1/speak';
const TTS_MODEL = 'aura-2-celeste-es'; // Voz femenina colombiana

/**
 * Synthesize speech using Deepgram TTS API
 * @param text - Text to convert to speech
 * @param outputPath - Path to save the MP3 file
 * @returns Path to the generated audio file
 */
export async function synthesizeVoice(text: string, outputPath: string): Promise<string> {
  console.log(`Synthesizing voice for text: ${text.substring(0, 50)}...`);

  try {
    const url = `${DEEPGRAM_TTS_URL}?model=${TTS_MODEL}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${env.DEEPGRAM_API_KEY}`,
        'Content-Type': 'text/plain',
      },
      body: text,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Deepgram TTS error: ${response.status} - ${errorText}`);
    }

    // Get audio data as buffer
    const audioBuffer = await response.arrayBuffer();
    
    // Save to file
    await writeFile(outputPath, Buffer.from(audioBuffer));
    
    console.log(`Voice synthesized successfully: ${outputPath}`);
    return outputPath;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('TTS synthesis failed:', errorMessage);
    throw new Error(`Failed to synthesize voice: ${errorMessage}`);
  }
}
