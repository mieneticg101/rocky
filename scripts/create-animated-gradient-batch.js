#!/usr/bin/env node

/**
 * Convert Animated Icons to Animated-Gradient Icons
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ANIMATED_DIR = path.join(__dirname, '../icons/animated');

// Gradient color schemes (reuse from create-gradient-batch.js)
const GRADIENT_SCHEMES = {
  arrow: ['#667eea', '#764ba2'],
  activity: ['#fc466b', '#3f5efb'],
  tech: ['#06beb6', '#48b1bf'],
  nature: ['#56ab2f', '#a8e063'],
  business: ['#f46b45', '#eea849'],
  health: ['#eb3349', '#f45c43'],
  social: ['#a044ff', '#6a3093'],
  entertainment: ['#ffd89b', '#19547b'],
  default: ['#fc466b', '#3f5efb']
};

function getGradientColors(iconName) {
  if (iconName.includes('arrow')) return GRADIENT_SCHEMES.arrow;
  if (iconName.includes('activity')) return GRADIENT_SCHEMES.activity;
  if (iconName.match(/plant|tree|leaf|flower|nature/)) return GRADIENT_SCHEMES.nature;
  if (iconName.match(/heart|medical|health|hospital/)) return GRADIENT_SCHEMES.health;
  return GRADIENT_SCHEMES.default;
}

/**
 * Convert animated icon to animated-gradient
 */
function convertToAnimatedGradient(sourcePath) {
  const fileName = path.basename(sourcePath);

  // Skip if not an animated icon or already animated-gradient
  if (!fileName.startsWith('animated-') || fileName.startsWith('animated-gradient-')) {
    return false;
  }

  const iconName = fileName.replace('animated-', '').replace('.svg', '');
  const destPath = path.join(ANIMATED_DIR, `animated-gradient-${iconName}.svg`);

  // Skip if already exists
  if (fs.existsSync(destPath)) {
    console.log(`⏭️  Skip: ${iconName} (already exists)`);
    return false;
  }

  // Read source animated SVG
  let content = fs.readFileSync(sourcePath, 'utf-8');

  // Get gradient colors
  const [color1, color2] = getGradientColors(iconName);

  // Extract inner content
  const innerMatch = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  let innerContent = innerMatch ? innerMatch[1].trim() : '';

  // Remove existing defs if any
  const existingDefs = innerContent.match(/<defs>[\s\S]*?<\/defs>/);
  innerContent = innerContent.replace(/<defs>[\s\S]*?<\/defs>/g, '');

  // Replace stroke with gradient
  innerContent = innerContent
    .replace(/stroke="currentColor"/g, `stroke="url(#${iconName}-anim-gradient)"`)
    .replace(/stroke="[^"]*"/g, `stroke="url(#${iconName}-anim-gradient)"`);

  // Replace fill with gradient
  innerContent = innerContent
    .replace(/fill="none"/g, `fill="url(#${iconName}-anim-gradient)" opacity="0.1"`)
    .replace(/fill="currentColor"/g, `fill="url(#${iconName}-anim-gradient)" opacity="0.1"`);

  // Ensure all SVG elements have stroke if they don't
  innerContent = innerContent.replace(
    /(<(?:path|line|circle|rect|polyline|polygon|ellipse)(?![^>]*stroke=)[^>]*?)(\/?>)/g,
    `$1 stroke="url(#${iconName}-anim-gradient)" stroke-width="1.5"$2`
  );

  // Build animated-gradient SVG
  const animatedGradientSvg = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${iconName}-anim-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  ${innerContent}
</svg>
`;

  // Write to file
  fs.writeFileSync(destPath, animatedGradientSvg);
  console.log(`✅ Created: animated-gradient-${iconName}.svg`);
  return true;
}

function main() {
  const args = process.argv.slice(2);

  if (args[0] === '--help' || args.length === 0) {
    console.log('Usage: node create-animated-gradient-batch.js <count|--all>');
    console.log('Example: node create-animated-gradient-batch.js 50');
    console.log('         node create-animated-gradient-batch.js --all');
    process.exit(1);
  }

  // Get all animated (non-gradient) icons
  const animatedFiles = fs.readdirSync(ANIMATED_DIR)
    .filter(f => f.startsWith('animated-') && !f.startsWith('animated-gradient-') && f.endsWith('.svg'))
    .map(f => path.join(ANIMATED_DIR, f));

  // Filter to only those without animated-gradient version
  const filesToConvert = animatedFiles.filter(file => {
    const fileName = path.basename(file);
    const iconName = fileName.replace('animated-', '').replace('.svg', '');
    const gradientPath = path.join(ANIMATED_DIR, `animated-gradient-${iconName}.svg`);
    return !fs.existsSync(gradientPath);
  });

  let count = filesToConvert.length;
  if (args[0] !== '--all') {
    count = Math.min(parseInt(args[0]) || 50, filesToConvert.length);
  }

  const files = filesToConvert.slice(0, count);

  console.log(`🎨 Converting ${files.length} animated icons to animated-gradient...\n`);

  let created = 0;
  let skipped = 0;

  for (const file of files) {
    if (convertToAnimatedGradient(file)) {
      created++;
    } else {
      skipped++;
    }
  }

  console.log(`\n✨ Done! Created ${created} animated-gradient icons, skipped ${skipped}`);
  console.log(`📊 Remaining: ${filesToConvert.length - created} animated icons without gradient version`);
}

main();
