import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const iconsDir = path.join(__dirname, '..', 'icons');

function getAllGradientIcons(dir) {
  const icons = [];

  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === 'gradient' && !fullPath.includes('animated-gradient')) {
          const svgFiles = fs.readdirSync(fullPath)
            .filter(f => f.endsWith('.svg'))
            .map(f => path.join(fullPath, f));
          icons.push(...svgFiles);
        } else if (!['animated', 'animated-gradient'].includes(entry.name)) {
          scan(fullPath);
        }
      }
    }
  }

  scan(dir);
  return icons;
}

function checkNormalExists(gradientPath) {
  const parts = gradientPath.split(path.sep);
  const gradientIndex = parts.findIndex(p => p === 'gradient');
  if (gradientIndex === -1) return false;

  parts.splice(gradientIndex, 1);
  const normalPath = parts.join(path.sep);
  return fs.existsSync(normalPath);
}

console.log('🔍 Finding orphan gradient icons...\n');

const gradientIcons = getAllGradientIcons(iconsDir);
console.log(`📊 Total gradient icons: ${gradientIcons.length}`);

const orphans = gradientIcons.filter(icon => !checkNormalExists(icon));

console.log(`📊 Orphan gradients (no normal version): ${orphans.length}\n`);

if (orphans.length > 0) {
  console.log('❌ Found orphan gradients:\n');
  orphans.slice(0, 20).forEach(icon => {
    console.log(`   ${icon.replace(iconsDir + '/', '')}`);
  });
  if (orphans.length > 20) {
    console.log(`   ... and ${orphans.length - 20} more\n`);
  }

  console.log('🗑️  Deleting orphan gradients...\n');
  let deleted = 0;
  for (const orphan of orphans) {
    try {
      fs.unlinkSync(orphan);
      deleted++;
    } catch (err) {
      console.error(`Failed to delete ${orphan}: ${err.message}`);
    }
  }
  console.log(`✅ Deleted ${deleted} orphan gradient files`);
} else {
  console.log('✅ No orphan gradients found!');
}

console.log('\n✨ Done!');
