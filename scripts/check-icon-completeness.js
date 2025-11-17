import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const iconsDir = path.join(__dirname, '..', 'icons');

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

function checkGradientExists(normalIconPath) {
  const dir = path.dirname(normalIconPath);
  const name = path.basename(normalIconPath);
  const gradientPath = path.join(dir, 'gradient', name);
  return fs.existsSync(gradientPath);
}

function checkAnimatedGradientExists(animatedIconPath) {
  const parts = animatedIconPath.split(path.sep);
  const animatedIndex = parts.findIndex(p => p === 'animated');
  if (animatedIndex === -1) return false;

  parts[animatedIndex] = 'animated-gradient';
  const animatedGradientPath = parts.join(path.sep);
  return fs.existsSync(animatedGradientPath);
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
        } else if (!['gradient', 'animated', 'animated-gradient'].includes(entry.name)) {
          scan(fullPath);
        }
      }
    }
  }

  scan(dir);
  return icons;
}

console.log('🔍 Checking icon completeness...\n');

// Check normal vs gradient
const normalIcons = getAllNormalIcons(iconsDir);
console.log(`📊 Normal icons: ${normalIcons.length}`);

const missingGradients = normalIcons.filter(icon => !checkGradientExists(icon));
console.log(`📊 Icons with gradient: ${normalIcons.length - missingGradients.length}`);

if (missingGradients.length > 0) {
  console.log(`\n❌ Missing ${missingGradients.length} gradient versions:\n`);
  missingGradients.slice(0, 20).forEach(icon => {
    console.log(`   ${icon.replace(iconsDir + '/', '')}`);
  });
  if (missingGradients.length > 20) {
    console.log(`   ... and ${missingGradients.length - 20} more`);
  }
} else {
  console.log('✅ All normal icons have gradient versions');
}

// Check animated vs animated-gradient
const animatedIcons = getAllAnimatedIcons(iconsDir);
console.log(`\n📊 Animated icons: ${animatedIcons.length}`);

const missingAnimatedGradients = animatedIcons.filter(icon => !checkAnimatedGradientExists(icon));
console.log(`📊 Icons with animated-gradient: ${animatedIcons.length - missingAnimatedGradients.length}`);

if (missingAnimatedGradients.length > 0) {
  console.log(`\n❌ Missing ${missingAnimatedGradients.length} animated-gradient versions:\n`);
  missingAnimatedGradients.slice(0, 20).forEach(icon => {
    console.log(`   ${icon.replace(iconsDir + '/', '')}`);
  });
  if (missingAnimatedGradients.length > 20) {
    console.log(`   ... and ${missingAnimatedGradients.length - 20} more`);
  }
} else {
  console.log('✅ All animated icons have animated-gradient versions');
}

console.log('\n✨ Done!');
