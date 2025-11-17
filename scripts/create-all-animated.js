import fs from 'fs';
import path from 'path';

// Category-based gradient colors
const gradientColors = {
  'technology/ai': { start: '#3b82f6', end: '#8b5cf6' },
  'technology/blockchain': { start: '#3b82f6', end: '#06b6d4' },
  'technology/cloud': { start: '#3b82f6', end: '#06b6d4' },
  'technology/database': { start: '#3b82f6', end: '#06b6d4' },
  'technology': { start: '#3b82f6', end: '#06b6d4' },
  'dev': { start: '#10b981', end: '#06b6d4' },
  'business': { start: '#8b5cf6', end: '#ec4899' },
  'brand': { start: '#f59e0b', end: '#ef4444' },
  'entertainment': { start: '#ec4899', end: '#8b5cf6' },
  'social': { start: '#06b6d4', end: '#8b5cf6' },
  'healthcare': { start: '#10b981', end: '#06b6d4' },
  'thai': { start: '#f59e0b', end: '#ef4444' },
  'default': { start: '#6366f1', end: '#8b5cf6' }
};

function getGradientColors(iconPath) {
  for (const [category, colors] of Object.entries(gradientColors)) {
    if (iconPath.includes(`/${category}/`)) {
      return colors;
    }
  }
  return gradientColors.default;
}

function getAllNormalIcons(dir) {
  const icons = [];

  function scan(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (item !== 'gradient' && item !== 'animated' && item !== 'animated-gradient') {
          scan(fullPath);
        }
      } else if (item.endsWith('.svg')) {
        icons.push(fullPath);
      }
    }
  }

  scan(dir);
  return icons;
}

function createAnimatedVersion(normalPath, content) {
  // Add animation to SVG elements
  let animated = content;

  // Animation patterns based on SVG structure
  const animations = [
    // Fade animations
    '<animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>',
    '<animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>',
    '<animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>',
    // Dash animations
    '<animate attributeName="stroke-dasharray" values="0,10;10,0;0,10" dur="2s" repeatCount="indefinite"/>',
    // Pulse animations
    '<animate attributeName="stroke-opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>'
  ];

  // Simple approach: add fade animation to path elements
  animated = animated.replace(/<path /g, `<path ${animations[0].replace('/>', '')} `);
  animated = animated.replace(/<circle /g, `<circle ${animations[2].replace('/>', '')} `);
  animated = animated.replace(/<rect /g, `<rect ${animations[1].replace('/>', '')} `);

  return animated;
}

function createAnimatedGradientVersion(normalPath, content) {
  const colors = getGradientColors(normalPath);
  const name = path.basename(normalPath, '.svg');
  const gradientId = `grad-${name}`;

  // Create gradient definition
  const gradientDef = `  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1"/>
    </linearGradient>
  </defs>`;

  // Replace stroke="currentColor" with gradient
  let gradientContent = content.replace(/stroke="currentColor"/g, `stroke="url(#${gradientId})"`);

  // Insert gradient definition after opening <svg> tag
  gradientContent = gradientContent.replace(/<svg([^>]*)>/, `<svg$1>\n${gradientDef}`);

  // Add animations
  gradientContent = createAnimatedVersion(normalPath, gradientContent);

  return gradientContent;
}

console.log('🔍 Finding all normal icons...');
const iconsDir = 'icons';
const normalIcons = getAllNormalIcons(iconsDir);

console.log(`📊 Found ${normalIcons.length} normal icons`);

let createdAnimated = 0;
let createdAnimatedGradient = 0;
let skippedAnimated = 0;
let skippedAnimatedGradient = 0;

for (const normalPath of normalIcons) {
  const dir = path.dirname(normalPath);
  const name = path.basename(normalPath);

  const animatedDir = path.join(dir, 'animated');
  const animatedGradientDir = path.join(dir, 'animated-gradient');
  const animatedPath = path.join(animatedDir, name);
  const animatedGradientPath = path.join(animatedGradientDir, name);

  // Read normal icon content
  const content = fs.readFileSync(normalPath, 'utf-8');

  // Create animated version if doesn't exist
  if (!fs.existsSync(animatedPath)) {
    fs.mkdirSync(animatedDir, { recursive: true });
    const animatedContent = createAnimatedVersion(normalPath, content);
    fs.writeFileSync(animatedPath, animatedContent);
    createdAnimated++;
  } else {
    skippedAnimated++;
  }

  // Create animated-gradient version if doesn't exist
  if (!fs.existsSync(animatedGradientPath)) {
    fs.mkdirSync(animatedGradientDir, { recursive: true });
    const animatedGradientContent = createAnimatedGradientVersion(normalPath, content);
    fs.writeFileSync(animatedGradientPath, animatedGradientContent);
    createdAnimatedGradient++;
  } else {
    skippedAnimatedGradient++;
  }

  // Progress indicator every 100 icons
  if ((createdAnimated + createdAnimatedGradient) % 100 === 0) {
    console.log(`  Progress: ${createdAnimated + createdAnimatedGradient} files created...`);
  }
}

console.log('\n✅ Complete!');
console.log(`📈 Stats:`);
console.log(`   Animated created: ${createdAnimated}`);
console.log(`   Animated skipped (already exists): ${skippedAnimated}`);
console.log(`   Animated-Gradient created: ${createdAnimatedGradient}`);
console.log(`   Animated-Gradient skipped (already exists): ${skippedAnimatedGradient}`);
console.log(`   Total files created: ${createdAnimated + createdAnimatedGradient}`);
