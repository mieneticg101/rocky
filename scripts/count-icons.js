#!/usr/bin/env node

/**
 * Count icons by category
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../icons');

function countIconsInDir(dir) {
  let count = 0;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      count += countIconsInDir(filePath);
    } else if (file.endsWith('.svg')) {
      count++;
    }
  }

  return count;
}

function getIconStats() {
  const categories = fs.readdirSync(ICONS_DIR);
  const stats = {};
  let total = 0;

  for (const category of categories) {
    const categoryPath = path.join(ICONS_DIR, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const count = countIconsInDir(categoryPath);
      stats[category] = count;
      total += count;
    }
  }

  return { stats, total };
}

// Main
const { stats, total } = getIconStats();

console.log('📊 Rocky Icons Statistics');
console.log('=========================\n');

console.log(`Total Icons: ${total}\n`);

console.log('By Category:');
Object.entries(stats)
  .sort((a, b) => b[1] - a[1])
  .forEach(([category, count]) => {
    const percentage = ((count / total) * 100).toFixed(1);
    console.log(`  ${category.padEnd(20)} ${count.toString().padStart(4)} (${percentage}%)`);
  });

console.log('\n=========================');
