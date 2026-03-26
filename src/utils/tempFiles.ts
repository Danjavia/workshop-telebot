import { mkdirSync, existsSync } from 'fs';

const TEMP_DIR = './temp';

/**
 * Ensure temp directory exists
 */
export function ensureTempDir(): void {
  if (!existsSync(TEMP_DIR)) {
    mkdirSync(TEMP_DIR, { recursive: true });
    console.log(`Created temp directory: ${TEMP_DIR}`);
  }
}

/**
 * Generate a unique temporary file path
 * @param prefix - File prefix
 * @param extension - File extension (without dot)
 * @returns Full path to temp file
 */
export function generateTempPath(prefix: string, extension: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${TEMP_DIR}/${prefix}_${timestamp}_${random}.${extension}`;
}

/**
 * Get temp directory path
 */
export function getTempDir(): string {
  return TEMP_DIR;
}
