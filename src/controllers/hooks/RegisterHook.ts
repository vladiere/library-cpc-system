import { createWorker } from 'tesseract.js';

export default async function recognizeText(
  imagePath: string
): Promise<string> {
  const worker = createWorker();

  try {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    const result = await worker.recognize(imagePath);
    const text = result.data.text.trim();
    return text;
  } catch (error) {
    console.error('OCR Error:', error);
    throw error;
  } finally {
    await worker.terminate();
  }
}
