#!/usr/bin/env node

/**
 * Fix duplicate attributes in gradient SVG files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GRADIENT_DIR = path.join(__dirname, '../icons/gradient');

function fixSvgFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;

  // Fix SVG opening tag - remove duplicates
  content = content.replace(
    /<svg[^>]*>/,
    '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">'
  );

  // Remove any stroke="currentColor" that might still exist
  content = content.replace(/stroke="currentColor"/g, '');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    return true;
  }

  return false;
}

function main() {
  const files = fs.readdirSync(GRADIENT_DIR)
    .filter(f => f.startsWith('gradient-') && f.endsWith('.svg'))
    .map(f => path.join(GRADIENT_DIR, f));

  console.log(`🔧 Fixing ${files.length} gradient SVG files...\n`);

  let fixed = 0;
  for (const file of files) {
    if (fixSvgFile(file)) {
      fixed++;
      console.log(`✅ Fixed: ${path.basename(file)}`);
    }
  }

  console.log(`\n✨ Done! Fixed ${fixed} files`);
}

main();
