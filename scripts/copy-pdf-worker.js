import { copyFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const source = join(projectRoot, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs');
const destDir = join(projectRoot, 'public');
const dest = join(destDir, 'pdf.worker.min.mjs');

try {
  // Create public directory if it doesn't exist
  mkdirSync(destDir, { recursive: true });

  // Copy the file
  copyFileSync(source, dest);
  console.log('✓ PDF worker copied successfully');
} catch (error) {
  console.error('Error copying PDF worker:', error.message);
  process.exit(1);
}
