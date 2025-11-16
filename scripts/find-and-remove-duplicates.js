#!/usr/bin/env node

/**
 * Find and Remove Duplicate Icons
 * Keep only one copy of each icon (prefer most appropriate category)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../icons');

// Category priority (higher = keep this one)
const CATEGORY_PRIORITY = {
  'essential': 10,
  'brand': 9,
  'social': 8,
  'technology': 7,
  'business': 6,
  'dev': 6,
  'entertainment': 5,
  'healthcare': 5,
  'nature': 5,
  'home': 4,
  'thai': 4,
  'app': 3,
};

function getCategoryPriority(filePath) {
  for (const [category, priority] of Object.entries(CATEGORY_PRIORITY)) {
    if (filePath.includes(`/${category}/`)) {
      return priority;
    }
  }
  return 1; // Default lowest priority
}

function findAllIcons() {
  const icons = new Map(); // iconName -> [paths]

  function traverse(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Skip gradient and animated directories
      if (entry.isDirectory()) {
        if (entry.name !== 'gradient' && entry.name !== 'animated') {
          traverse(fullPath);
        }
      } else if (entry.name.endsWith('.svg')) {
        const iconName = entry.name;

        if (!icons.has(iconName)) {
          icons.set(iconName, []);
        }
        icons.get(iconName).push(fullPath);
      }
    }
  }

  traverse(ICONS_DIR);
  return icons;
}

function main() {
  console.log('🔍 Scanning for duplicate icons...\n');

  const icons = findAllIcons();
  const duplicates = new Map();

  // Find duplicates
  for (const [iconName, paths] of icons.entries()) {
    if (paths.length > 1) {
      duplicates.set(iconName, paths);
    }
  }

  console.log(`Found ${duplicates.size} duplicate icons:\n`);

  let totalRemoved = 0;

  for (const [iconName, paths] of duplicates.entries()) {
    // Sort by priority (highest first)
    paths.sort((a, b) => getCategoryPriority(b) - getCategoryPriority(a));

    const keepPath = paths[0];
    const removePaths = paths.slice(1);

    console.log(`📄 ${iconName}`);
    console.log(`  ✅ Keep: ${keepPath.replace(ICONS_DIR, '')}`);

    for (const removePath of removePaths) {
      console.log(`  ❌ Remove: ${removePath.replace(ICONS_DIR, '')}`);
      fs.unlinkSync(removePath);
      totalRemoved++;
    }
    console.log('');
  }

  console.log(`\n✨ Done! Removed ${totalRemoved} duplicate icons`);
  console.log(`📊 Kept ${duplicates.size} unique icons`);
}

main();
