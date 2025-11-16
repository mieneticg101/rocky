#!/usr/bin/env node

/**
 * Generate icons.json for website
 * Scans all icons and creates a JSON file with metadata
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../icons');
const OUTPUT_FILE = path.join(__dirname, '../docs/public/icons.json');

function scanIcons() {
  const icons = {};

  function traverse(dir, category = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip special directories
        if (['gradient', 'animated', 'animated-gradient'].includes(entry.name)) {
          continue;
        }

        // Recurse into subdirectories
        const subCategory = category ? `${category}/${entry.name}` : entry.name;
        traverse(fullPath, subCategory);
      } else if (entry.name.endsWith('.svg')) {
        const iconName = entry.name.replace('.svg', '');

        // Skip if already exists (shouldn't happen after dedup)
        if (icons[iconName]) {
          console.warn(`⚠️  Duplicate icon: ${iconName}`);
          continue;
        }

        // Read SVG content
        const svgContent = fs.readFileSync(fullPath, 'utf-8');

        // Determine category
        const cat = category.split('/')[0] || 'other';

        // Check for variants
        const basePath = path.dirname(fullPath);
        const gradientPath = path.join(ICONS_DIR, 'gradient', `gradient-${iconName}.svg`);
        const animatedPath = path.join(ICONS_DIR, 'animated', `animated-${iconName}.svg`);
        const animGradPath = path.join(ICONS_DIR, 'animated', `animated-gradient-${iconName}.svg`);

        icons[iconName] = {
          name: iconName,
          category: cat,
          path: `icons/${category}/${entry.name}`,
          svg: svgContent,
          variants: {
            normal: true,
            gradient: fs.existsSync(gradientPath),
            animated: fs.existsSync(animatedPath),
            'animated-gradient': fs.existsSync(animGradPath)
          },
          tags: generateTags(iconName, cat)
        };
      }
    }
  }

  traverse(ICONS_DIR);
  return Object.values(icons).sort((a, b) => a.name.localeCompare(b.name));
}

function generateTags(name, category) {
  const tags = [category];

  // Add name parts as tags
  const parts = name.split('-');
  tags.push(...parts);

  // Add common tags based on category
  const categoryTags = {
    'social': ['social', 'media', 'network'],
    'technology': ['tech', 'software'],
    'dev': ['development', 'code', 'tools'],
    'brand': ['logo', 'company'],
    'business': ['work', 'office'],
    'entertainment': ['media', 'fun'],
    'thai': ['thailand', 'local']
  };

  if (categoryTags[category]) {
    tags.push(...categoryTags[category]);
  }

  return [...new Set(tags)];
}

function main() {
  console.log('🔍 Scanning icons directory...\n');

  const icons = scanIcons();

  console.log(`\n📊 Found ${icons.length} icons\n`);

  // Create stats
  const stats = {
    total: icons.length,
    gradient: icons.filter(i => i.variants.gradient).length,
    animated: icons.filter(i => i.variants.animated).length,
    'animated-gradient': icons.filter(i => i.variants['animated-gradient']).length,
    categories: {}
  };

  icons.forEach(icon => {
    stats.categories[icon.category] = (stats.categories[icon.category] || 0) + 1;
  });

  const output = {
    generated: new Date().toISOString(),
    stats,
    icons
  };

  // Ensure public directory exists
  const publicDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`✅ Generated: ${OUTPUT_FILE}`);
  console.log(`📈 Stats:`);
  console.log(`   Total: ${stats.total}`);
  console.log(`   Gradient: ${stats.gradient}`);
  console.log(`   Animated: ${stats.animated}`);
  console.log(`   Animated-Gradient: ${stats['animated-gradient']}`);
  console.log(`\n📁 Categories:`, stats.categories);
}

main();
