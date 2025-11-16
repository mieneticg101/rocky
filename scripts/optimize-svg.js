#!/usr/bin/env node

/**
 * SVG Optimizer for Rocky Icons
 * Optimizes all SVG files in the icons directory
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { optimize } from 'svgo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../icons');

// SVGO Configuration
const svgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Preserve viewBox
          removeViewBox: false,
          // Preserve IDs for gradients and filters
          cleanupIDs: {
            preserve: ['gradient', 'filter', 'mask'],
          },
        },
      },
    },
    // Remove unnecessary metadata
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    // Clean up attributes
    'removeEmptyAttrs',
    'removeHiddenElems',
    'removeEmptyText',
    // Optimize paths
    'convertPathData',
    'mergePaths',
    // Optimize transformations
    'convertTransform',
    'removeUselessStrokeAndFill',
    // Round numbers
    {
      name: 'cleanupNumericValues',
      params: {
        floatPrecision: 2,
      },
    },
  ],
};

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
 * Optimize a single SVG file
 */
function optimizeSvg(filePath) {
  const svgContent = fs.readFileSync(filePath, 'utf-8');
  const originalSize = Buffer.byteLength(svgContent, 'utf-8');

  try {
    const result = optimize(svgContent, {
      path: filePath,
      ...svgoConfig,
    });

    const optimizedContent = result.data;
    const optimizedSize = Buffer.byteLength(optimizedContent, 'utf-8');
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    // Write optimized content back to file
    fs.writeFileSync(filePath, optimizedContent);

    return {
      path: filePath,
      originalSize,
      optimizedSize,
      savings,
      success: true,
    };
  } catch (error) {
    return {
      path: filePath,
      error: error.message,
      success: false,
    };
  }
}

/**
 * Main optimization function
 */
function optimizeIcons() {
  console.log('🎨 Rocky Icons SVG Optimizer');
  console.log('============================\n');

  const svgFiles = findSvgFiles(ICONS_DIR);
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let successCount = 0;
  let errorCount = 0;

  console.log(`Found ${svgFiles.length} SVG files\n`);

  svgFiles.forEach((filePath, index) => {
    const fileName = path.basename(filePath);
    const result = optimizeSvg(filePath);

    if (result.success) {
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;
      successCount++;

      console.log(
        `✅ [${index + 1}/${svgFiles.length}] ${fileName}: ${result.originalSize}B → ${result.optimizedSize}B (${result.savings}% saved)`
      );
    } else {
      errorCount++;
      console.log(`❌ [${index + 1}/${svgFiles.length}] ${fileName}: ${result.error}`);
    }
  });

  const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);

  console.log('\n============================');
  console.log('📊 Optimization Summary:');
  console.log(`   Total files: ${svgFiles.length}`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   Original size: ${(totalOriginalSize / 1024).toFixed(2)} KB`);
  console.log(`   Optimized size: ${(totalOptimizedSize / 1024).toFixed(2)} KB`);
  console.log(`   Total savings: ${totalSavings}%`);
  console.log('============================\n');
}

// Run optimizer
optimizeIcons();
