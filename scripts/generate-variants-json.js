#!/usr/bin/env node

/**
 * Generate separate JSON files for each icon variant
 * Creates: icons.json, icons-gradient.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../icons');
const PUBLIC_DIR = path.join(__dirname, '../docs/public');

function scanIconsByVariant(variant = 'normal') {
  const icons = {};

  function traverse(dir, category = '', inVariantDir = false) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Handle variant directories
        const isVariantDir = ['gradient'].includes(entry.name);

        if (variant === 'normal') {
          // For normal variant, skip variant directories
          if (!isVariantDir) {
            const subCategory = category ? `${category}/${entry.name}` : entry.name;
            traverse(fullPath, subCategory, false);
          }
        } else {
          // For specific variants, enter only matching variant directory
          if (isVariantDir && entry.name === variant) {
            traverse(fullPath, category, true);
          } else if (!isVariantDir && !inVariantDir) {
            // Continue traversing category structure
            const subCategory = category ? `${category}/${entry.name}` : entry.name;
            traverse(fullPath, subCategory, false);
          }
        }
      } else if (entry.name.endsWith('.svg')) {
        // Only process SVG files in correct context
        if ((variant === 'normal' && !inVariantDir) || (variant !== 'normal' && inVariantDir)) {
          const iconName = entry.name.replace('.svg', '');

          // Skip if already exists
          if (icons[iconName]) {
            continue;
          }

          // Read SVG content
          const svgContent = fs.readFileSync(fullPath, 'utf-8');

          // Determine category
          const cat = category.split('/')[0] || 'other';

          // Build path
          let iconPath;
          if (variant === 'normal') {
            iconPath = `icons/${category}/${entry.name}`;
          } else {
            iconPath = `icons/${category}/${variant}/${entry.name}`;
          }

          icons[iconName] = {
            name: iconName,
            category: cat,
            path: iconPath,
            svg: svgContent,
            variant: variant,
            tags: generateTags(iconName, cat)
          };
        }
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

function generateVariantFile(variant, filename) {
  console.log(`🔍 Scanning ${variant} icons...`);

  const icons = scanIconsByVariant(variant);

  // Create stats
  const stats = {
    total: icons.length,
    variant: variant,
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
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // Write JSON file
  const outputFile = path.join(PUBLIC_DIR, filename);
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));

  console.log(`✅ Generated: ${filename} (${icons.length} icons)`);

  return stats;
}

function main() {
  console.log('📦 Generating separate JSON files for each variant...\n');

  const variants = [
    { variant: 'normal', filename: 'icons.json' },
    { variant: 'gradient', filename: 'icons-gradient.json' }
  ];

  const allStats = {};

  for (const { variant, filename } of variants) {
    const stats = generateVariantFile(variant, filename);
    allStats[variant] = stats.total;
  }

  console.log('\n📊 Summary:');
  console.log(`   Normal icons:   ${allStats.normal}`);
  console.log(`   Gradient icons: ${allStats.gradient}`);
  console.log(`\n✨ All 2 variant JSON files generated successfully!`);
}

main();
