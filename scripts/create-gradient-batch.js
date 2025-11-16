#!/usr/bin/env node

/**
 * Create Gradient Icon Batch
 * Converts normal icons to gradient versions
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../icons');
const GRADIENT_DIR = path.join(ICONS_DIR, 'gradient');

// Gradient color schemes for different icon types
const GRADIENT_SCHEMES = {
  // Arrows and directions - Blue gradient
  arrow: ['#667eea', '#764ba2'],
  direction: ['#667eea', '#764ba2'],

  // Activities and actions - Pink/Purple gradient
  activity: ['#fc466b', '#3f5efb'],
  action: ['#fc466b', '#3f5efb'],

  // Technology - Cyan/Blue gradient
  tech: ['#06beb6', '#48b1bf'],
  technology: ['#06beb6', '#48b1bf'],

  // Nature - Green gradient
  nature: ['#56ab2f', '#a8e063'],
  plant: ['#56ab2f', '#a8e063'],

  // Business - Orange/Red gradient
  business: ['#f46b45', '#eea849'],
  finance: ['#f46b45', '#eea849'],

  // Healthcare - Red/Pink gradient
  health: ['#eb3349', '#f45c43'],
  medical: ['#eb3349', '#f45c43'],

  // Social - Purple gradient
  social: ['#a044ff', '#6a3093'],

  // Entertainment - Yellow/Orange gradient
  entertainment: ['#ffd89b', '#19547b'],

  // Default vibrant gradient
  default: ['#fc466b', '#3f5efb']
};

/**
 * Determine gradient colors based on icon name and category
 */
function getGradientColors(iconName, iconPath) {
  // Check icon name patterns
  if (iconName.includes('arrow')) return GRADIENT_SCHEMES.arrow;
  if (iconName.includes('activity')) return GRADIENT_SCHEMES.activity;
  if (iconName.match(/plant|tree|leaf|flower|nature/)) return GRADIENT_SCHEMES.nature;
  if (iconName.match(/heart|medical|health|hospital/)) return GRADIENT_SCHEMES.health;

  // Check by directory/category
  if (iconPath.includes('/technology/')) return GRADIENT_SCHEMES.tech;
  if (iconPath.includes('/business/')) return GRADIENT_SCHEMES.business;
  if (iconPath.includes('/healthcare/')) return GRADIENT_SCHEMES.health;
  if (iconPath.includes('/nature/')) return GRADIENT_SCHEMES.nature;
  if (iconPath.includes('/social/')) return GRADIENT_SCHEMES.social;
  if (iconPath.includes('/entertainment/')) return GRADIENT_SCHEMES.entertainment;

  // Default
  return GRADIENT_SCHEMES.default;
}

/**
 * Create gradient version of an icon
 */
function createGradientIcon(sourcePath) {
  const iconName = path.basename(sourcePath, '.svg');
  const destPath = path.join(GRADIENT_DIR, `gradient-${iconName}.svg`);

  // Skip if already exists
  if (fs.existsSync(destPath)) {
    console.log(`⏭️  Skip: ${iconName} (already exists)`);
    return false;
  }

  // Read source SVG
  const content = fs.readFileSync(sourcePath, 'utf-8');

  // Get gradient colors
  const [color1, color2] = getGradientColors(iconName, sourcePath);

  // Extract inner content (paths, lines, etc.)
  const innerMatch = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  let innerContent = innerMatch ? innerMatch[1].trim() : '';

  // Remove existing defs if any
  innerContent = innerContent.replace(/<defs>[\s\S]*?<\/defs>/g, '');

  // Replace stroke and fill attributes
  innerContent = innerContent
    .replace(/stroke="currentColor"/g, `stroke="url(#${iconName}-gradient)"`)
    .replace(/fill="none"/g, `fill="url(#${iconName}-gradient)" opacity="0.1"`)
    .replace(/stroke-width="[^"]*"/g, 'stroke-width="1.5"');

  // For elements without stroke, add gradient stroke
  innerContent = innerContent.replace(
    /(<(?:path|line|circle|rect|polyline|polygon|ellipse)(?![^>]*stroke=)[^>]*?)(\/?>)/g,
    `$1 stroke="url(#${iconName}-gradient)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"$2`
  );

  // For elements without fill (that can have fill), add gradient fill with opacity
  innerContent = innerContent.replace(
    /(<(?:path|circle|rect|polygon|ellipse)(?![^>]*fill=)[^>]*?)(\/?>)/g,
    `$1 fill="url(#${iconName}-gradient)" opacity="0.1"$2`
  );

  // Build gradient SVG with clean attributes
  const gradientSvg = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${iconName}-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
  </defs>
  ${innerContent}
</svg>
`;

  // Write to file
  fs.writeFileSync(destPath, gradientSvg);
  console.log(`✅ Created: gradient-${iconName}.svg`);
  return true;
}

/**
 * Find all icon files recursively
 */
function findIconFiles(dir, iconNames = null) {
  const files = [];

  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      // Skip gradient and animated directories
      if (entry.isDirectory()) {
        if (entry.name !== 'gradient' && entry.name !== 'animated') {
          traverse(fullPath);
        }
      } else if (entry.name.endsWith('.svg')) {
        const iconName = entry.name.replace('.svg', '');

        // If iconNames filter is provided, only include those
        if (!iconNames || iconNames.includes(iconName)) {
          files.push(fullPath);
        }
      }
    }
  }

  traverse(dir);
  return files;
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node create-gradient-batch.js <icon1> <icon2> ...');
    console.log('   or: node create-gradient-batch.js --all');
    console.log('   or: node create-gradient-batch.js --batch 25');
    process.exit(1);
  }

  // Ensure gradient directory exists
  if (!fs.existsSync(GRADIENT_DIR)) {
    fs.mkdirSync(GRADIENT_DIR, { recursive: true });
  }

  let iconFiles = [];

  if (args[0] === '--all') {
    // Find all icons
    iconFiles = findIconFiles(ICONS_DIR);
  } else if (args[0] === '--batch') {
    // Create a batch of N icons
    const batchSize = parseInt(args[1]) || 25;

    // Find all icons that don't have gradient versions yet
    const allIcons = findIconFiles(ICONS_DIR);
    const existingGradients = fs.readdirSync(GRADIENT_DIR)
      .filter(f => f.startsWith('gradient-') && f.endsWith('.svg'))
      .map(f => f.replace('gradient-', '').replace('.svg', ''));

    iconFiles = allIcons.filter(iconPath => {
      const iconName = path.basename(iconPath, '.svg');
      return !existingGradients.includes(iconName);
    }).slice(0, batchSize);

    console.log(`📦 Creating batch of ${iconFiles.length} gradient icons...\n`);
  } else {
    // Specific icon names provided
    iconFiles = findIconFiles(ICONS_DIR, args);
  }

  console.log(`🎨 Processing ${iconFiles.length} icons...\n`);

  let created = 0;
  let skipped = 0;

  for (const iconPath of iconFiles) {
    if (createGradientIcon(iconPath)) {
      created++;
    } else {
      skipped++;
    }
  }

  console.log(`\n✨ Done! Created ${created} gradient icons, skipped ${skipped}`);
}

main();
