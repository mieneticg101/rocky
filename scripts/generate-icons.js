#!/usr/bin/env node

/**
 * Rocky Icons Generator
 * Automatically generates icon components and catalog
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../icons');
const OUTPUT_DIR = path.join(__dirname, '../src/components/generated');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Convert filename to PascalCase component name
 */
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Read SVG file and extract content
 */
function readSvgContent(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Extract paths and other SVG elements (excluding svg wrapper)
  const match = content.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  return match ? match[1].trim() : '';
}

/**
 * Generate React component
 */
function generateReactComponent(iconName, svgContent) {
  const componentName = `Icon${toPascalCase(iconName)}`;

  return `import React from 'react';
import { Icon, IconProps } from '../Icon';

export const ${componentName}: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    ${svgContent}
  </Icon>
);

export default ${componentName};
`;
}

/**
 * Generate Vue component
 */
function generateVueComponent(iconName, svgContent) {
  return `<script setup lang="ts">
import Icon, { IconProps } from '../Icon.vue';

defineProps<IconProps>();
</script>

<template>
  <Icon v-bind="$props">
    ${svgContent}
  </Icon>
</template>
`;
}

/**
 * Recursively find all SVG files
 */
function findSvgFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findSvgFiles(filePath, fileList);
    } else if (file.endsWith('.svg')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Main generator function
 */
function generateComponents() {
  console.log('🎨 Rocky Icons Generator');
  console.log('=========================\n');

  const svgFiles = findSvgFiles(ICONS_DIR);
  const iconCatalog = [];

  console.log(`Found ${svgFiles.length} SVG files\n`);

  svgFiles.forEach(filePath => {
    const fileName = path.basename(filePath, '.svg');
    const relativePath = path.relative(ICONS_DIR, filePath);
    const category = path.dirname(relativePath).split(path.sep)[0];

    console.log(`Processing: ${fileName} (${category})`);

    const svgContent = readSvgContent(filePath);
    const componentName = toPascalCase(fileName);

    // Generate React component
    const reactComponent = generateReactComponent(fileName, svgContent);
    const reactPath = path.join(OUTPUT_DIR, 'react', `${componentName}.tsx`);
    fs.mkdirSync(path.dirname(reactPath), { recursive: true });
    fs.writeFileSync(reactPath, reactComponent);

    // Generate Vue component
    const vueComponent = generateVueComponent(fileName, svgContent);
    const vuePath = path.join(OUTPUT_DIR, 'vue', `${componentName}.vue`);
    fs.mkdirSync(path.dirname(vuePath), { recursive: true });
    fs.writeFileSync(vuePath, vueComponent);

    // Add to catalog
    iconCatalog.push({
      name: fileName,
      component: componentName,
      category,
      path: relativePath,
    });
  });

  // Generate index files
  generateIndexFiles(iconCatalog);

  // Generate catalog JSON
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'catalog.json'),
    JSON.stringify(iconCatalog, null, 2)
  );

  console.log('\n✅ Icon generation complete!');
  console.log(`📦 Generated ${iconCatalog.length} icon components`);
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
}

/**
 * Generate index files for easy importing
 */
function generateIndexFiles(catalog) {
  // React index
  const reactIndex = catalog
    .map(icon => `export { default as Icon${icon.component} } from './react/${icon.component}';`)
    .join('\n');

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'react-index.ts'),
    reactIndex
  );

  // Vue index
  const vueIndex = catalog
    .map(icon => `export { default as Icon${icon.component} } from './vue/${icon.component}.vue';`)
    .join('\n');

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'vue-index.ts'),
    vueIndex
  );

  console.log('✅ Generated index files');
}

// Run generator
generateComponents();
