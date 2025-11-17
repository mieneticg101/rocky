import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const iconsDir = path.join(__dirname, '..', 'icons');

// Gradient color mapping by category
const categoryGradients = {
  'technology/ai': { start: '#3b82f6', end: '#8b5cf6' },
  'technology/cloud': { start: '#3b82f6', end: '#06b6d4' },
  'technology/blockchain': { start: '#3b82f6', end: '#06b6d4' },
  'technology/database': { start: '#10b981', end: '#06b6d4' },
  'technology': { start: '#3b82f6', end: '#8b5cf6' },
  'dev': { start: '#10b981', end: '#06b6d4' },
  'business/design': { start: '#8b5cf6', end: '#ec4899' },
  'business/productivity': { start: '#f59e0b', end: '#ef4444' },
  'business': { start: '#f59e0b', end: '#ec4899' },
  'app': { start: '#3b82f6', end: '#8b5cf6' },
  'brand': { start: '#3b82f6', end: '#8b5cf6' },
  'entertainment': { start: '#ec4899', end: '#8b5cf6' },
  'thai': { start: '#ef4444', end: '#f59e0b' },
  'default': { start: '#3b82f6', end: '#8b5cf6' }
};

function getGradientColors(filePath) {
  const relativePath = filePath.replace(iconsDir + '/', '');

  for (const [category, colors] of Object.entries(categoryGradients)) {
    if (category !== 'default' && relativePath.startsWith(category)) {
      return colors;
    }
  }

  return categoryGradients.default;
}

function createAnimatedGradientFromAnimated(animatedPath, category) {
  const content = fs.readFileSync(animatedPath, 'utf-8');
  const name = path.basename(animatedPath, '.svg');
  const colors = getGradientColors(animatedPath);

  // Create gradient ID
  const gradientId = `grad-${name}-anim`;

  // Create gradient definition
  const gradientDef = `  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1">
        <animate attributeName="stop-color" values="${colors.start};${colors.end};${colors.start}" dur="3s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1">
        <animate attributeName="stop-color" values="${colors.end};${colors.start};${colors.end}" dur="3s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
  </defs>`;

  // Replace stroke="currentColor" with stroke="url(#grad-...)"
  let newContent = content.replace(
    /stroke="currentColor"/g,
    `stroke="url(#${gradientId})"`
  );

  // Replace fill="currentColor" with fill="url(#grad-...)"
  newContent = newContent.replace(
    /fill="currentColor"/g,
    `fill="url(#${gradientId})"`
  );

  // Insert gradient definition after <svg> tag
  newContent = newContent.replace(
    /(<svg[^>]*>)/,
    `$1\n${gradientDef}`
  );

  return newContent;
}

function getAllAnimatedIcons(dir) {
  const icons = [];

  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === 'animated' && !fullPath.includes('animated-gradient')) {
          const svgFiles = fs.readdirSync(fullPath)
            .filter(f => f.endsWith('.svg'))
            .map(f => path.join(fullPath, f));
          icons.push(...svgFiles);
        } else if (!['gradient', 'animated-gradient'].includes(entry.name)) {
          scan(fullPath);
        }
      }
    }
  }

  scan(dir);
  return icons;
}

function getAnimatedGradientPath(animatedPath) {
  const parts = animatedPath.split(path.sep);
  const animatedIndex = parts.findIndex(p => p === 'animated');
  if (animatedIndex === -1) return null;

  parts[animatedIndex] = 'animated-gradient';
  return parts.join(path.sep);
}

console.log('🔍 Finding animated icons without animated-gradient versions...\n');

const animatedIcons = getAllAnimatedIcons(iconsDir);
console.log(`📊 Total animated icons: ${animatedIcons.length}`);

const missing = animatedIcons.filter(icon => {
  const animatedGradientPath = getAnimatedGradientPath(icon);
  return animatedGradientPath && !fs.existsSync(animatedGradientPath);
});

console.log(`📊 Missing animated-gradient versions: ${missing.length}\n`);

if (missing.length > 0) {
  console.log(`🎨 Creating ${missing.length} animated-gradient versions...\n`);

  let created = 0;
  for (const animatedPath of missing) {
    try {
      const animatedGradientPath = getAnimatedGradientPath(animatedPath);
      const dir = path.dirname(animatedGradientPath);

      // Create directory if it doesn't exist
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Create animated-gradient content
      const content = createAnimatedGradientFromAnimated(animatedPath);

      // Write file
      fs.writeFileSync(animatedGradientPath, content, 'utf-8');
      created++;

      if (created % 50 === 0) {
        console.log(`   Created ${created}/${missing.length}...`);
      }
    } catch (err) {
      console.error(`Failed to create ${animatedPath}: ${err.message}`);
    }
  }

  console.log(`\n✅ Created ${created} animated-gradient files`);
} else {
  console.log('✅ All animated icons have animated-gradient versions!');
}

console.log('\n✨ Done!');
