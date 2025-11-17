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
  'entertainment/nft': { start: '#ec4899', end: '#8b5cf6' },
  'entertainment/gaming': { start: '#8b5cf6', end: '#06b6d4' },
  'entertainment': { start: '#ec4899', end: '#8b5cf6' },
  'essential': { start: '#3b82f6', end: '#8b5cf6' },
  'thai': { start: '#ef4444', end: '#f59e0b' },
  'social': { start: '#ec4899', end: '#f59e0b' },
  'healthcare': { start: '#10b981', end: '#06b6d4' },
  'home': { start: '#f59e0b', end: '#ef4444' },
  'nature': { start: '#10b981', end: '#059669' },
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

function createGradientFromNormal(normalPath) {
  const content = fs.readFileSync(normalPath, 'utf-8');
  const name = path.basename(normalPath, '.svg');
  const colors = getGradientColors(normalPath);

  // Create gradient ID
  const gradientId = `grad-${name}`;

  // Create gradient definition
  const gradientDef = `  <defs>
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1"/>
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

function getAllNormalIcons(dir) {
  const icons = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!['gradient', 'animated', 'animated-gradient'].includes(entry.name)) {
        icons.push(...getAllNormalIcons(fullPath));
      }
    } else if (entry.name.endsWith('.svg')) {
      icons.push(fullPath);
    }
  }

  return icons;
}

function getGradientPath(normalPath) {
  const dir = path.dirname(normalPath);
  const name = path.basename(normalPath);
  return path.join(dir, 'gradient', name);
}

console.log('🔍 Finding normal icons without gradient versions...\n');

const normalIcons = getAllNormalIcons(iconsDir);
console.log(`📊 Total normal icons: ${normalIcons.length}`);

const missing = normalIcons.filter(icon => {
  const gradientPath = getGradientPath(icon);
  return !fs.existsSync(gradientPath);
});

console.log(`📊 Missing gradient versions: ${missing.length}\n`);

if (missing.length > 0) {
  console.log(`🎨 Creating ${missing.length} gradient versions...\n`);

  let created = 0;
  for (const normalPath of missing) {
    try {
      const gradientPath = getGradientPath(normalPath);
      const dir = path.dirname(gradientPath);

      // Create directory if it doesn't exist
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Create gradient content
      const content = createGradientFromNormal(normalPath);

      // Write file
      fs.writeFileSync(gradientPath, content, 'utf-8');
      created++;

      if (created % 50 === 0) {
        console.log(`   Created ${created}/${missing.length}...`);
      }
    } catch (err) {
      console.error(`Failed to create gradient for ${normalPath}: ${err.message}`);
    }
  }

  console.log(`\n✅ Created ${created} gradient files`);
} else {
  console.log('✅ All normal icons have gradient versions!');
}

console.log('\n✨ Done!');
