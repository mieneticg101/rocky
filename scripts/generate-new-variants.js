import fs from 'fs';
import path from 'path';

const ICONS_DIR = 'icons';

const gradientColors = {
  'technology/ai': { start: '#3b82f6', end: '#8b5cf6' },
  'technology/database': { start: '#3b82f6', end: '#06b6d4' },
  'technology/cloud': { start: '#3b82f6', end: '#06b6d4' },
  'business': { start: '#f59e0b', end: '#ef4444' },
  'dev': { start: '#10b981', end: '#06b6d4' }
};

// Helper to add animations
function addAnimations(svg) {
  svg = svg.replace(/<path /g, '<path <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/> ');
  svg = svg.replace(/<circle /g, '<circle <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/> ');
  svg = svg.replace(/<rect /g, '<rect <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/> ');
  svg = svg.replace(/<ellipse /g, '<ellipse <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/> ');
  svg = svg.replace(/<polygon /g, '<polygon <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/> ');
  return svg;
}

// 1. Filled (Solid) variant with animation
function createFilledSVG(name, svg, category) {
  const animatedSvg = addAnimations(svg);
  return `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg">
  ${animatedSvg}
</svg>
`;
}

// 2. Duotone variant with animation
function createDuotoneSVG(name, svg, category) {
  const animatedSvg = addAnimations(svg);
  // Primary elements with full opacity, secondary with 0.3 opacity
  let duotoneSvg = animatedSvg.replace(/opacity" values="[^"]+"/g, 'opacity" values="1;0.6;1"');

  return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <style>
    path:nth-child(odd) { opacity: 0.3; }
    rect:nth-child(odd) { opacity: 0.3; }
    circle:nth-child(odd) { opacity: 0.3; }
  </style>
  ${duotoneSvg}
</svg>
`;
}

// 3. Bold variant with animation
function createBoldSVG(name, svg, category) {
  const animatedSvg = addAnimations(svg);
  return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  ${animatedSvg}
</svg>
`;
}

// 4. Light variant with animation
function createLightSVG(name, svg, category) {
  const animatedSvg = addAnimations(svg);
  return `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  ${animatedSvg}
</svg>
`;
}

// 5. Filled-Gradient variant with animation
function createFilledGradientSVG(name, svg, category) {
  const colors = gradientColors[category] || gradientColors.dev;
  const gradId = `grad-filled-${name}`;
  const animatedSvg = addAnimations(svg);

  return `<svg viewBox="0 0 24 24" width="24" height="24" fill="url(#${gradId})" stroke="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1"/>
    </linearGradient>
  </defs>
  ${animatedSvg}
</svg>
`;
}

// Scan and process all icons
function processAllIcons() {
  let totalProcessed = 0;

  function traverse(dir, category = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip existing variant directories
        if (['gradient', 'animated', 'animated-gradient', 'filled', 'duotone', 'bold', 'light', 'filled-gradient'].includes(entry.name)) {
          continue;
        }

        const subCategory = category ? `${category}/${entry.name}` : entry.name;
        traverse(fullPath, subCategory);
      } else if (entry.name.endsWith('.svg')) {
        // Read original SVG content
        const svgContent = fs.readFileSync(fullPath, 'utf-8');

        // Extract SVG body (remove svg wrapper)
        const svgMatch = svgContent.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
        if (!svgMatch) continue;

        let svgBody = svgMatch[1].trim();

        // Remove existing animations from original
        svgBody = svgBody.replace(/<animate[^>]*\/>/g, '');
        svgBody = svgBody.replace(/<animate[^>]*>[\s\S]*?<\/animate>/g, '');

        const iconName = entry.name.replace('.svg', '');
        const baseDir = path.dirname(fullPath);

        // Create variant directories
        const variants = ['filled', 'duotone', 'bold', 'light', 'filled-gradient'];
        variants.forEach(variant => {
          const variantDir = path.join(baseDir, variant);
          fs.mkdirSync(variantDir, { recursive: true });
        });

        // Generate and write all 5 new variants
        fs.writeFileSync(
          path.join(baseDir, 'filled', entry.name),
          createFilledSVG(iconName, svgBody, category)
        );

        fs.writeFileSync(
          path.join(baseDir, 'duotone', entry.name),
          createDuotoneSVG(iconName, svgBody, category)
        );

        fs.writeFileSync(
          path.join(baseDir, 'bold', entry.name),
          createBoldSVG(iconName, svgBody, category)
        );

        fs.writeFileSync(
          path.join(baseDir, 'light', entry.name),
          createLightSVG(iconName, svgBody, category)
        );

        fs.writeFileSync(
          path.join(baseDir, 'filled-gradient', entry.name),
          createFilledGradientSVG(iconName, svgBody, category)
        );

        totalProcessed++;
        if (totalProcessed % 50 === 0) {
          console.log(`✓ Processed ${totalProcessed} icons...`);
        }
      }
    }
  }

  console.log('🔄 Generating 5 new animated variants for all icons...\n');
  traverse(ICONS_DIR);
  console.log(`\n✅ Successfully created 5 variants for ${totalProcessed} icons`);
  console.log(`📦 Total new files: ${totalProcessed * 5} (${totalProcessed} icons × 5 variants)`);
  console.log(`\n📁 New variants created:`);
  console.log(`   1. filled/ - Filled solid icons with animation`);
  console.log(`   2. duotone/ - Duotone two-color icons with animation`);
  console.log(`   3. bold/ - Bold stroke icons with animation`);
  console.log(`   4. light/ - Light stroke icons with animation`);
  console.log(`   5. filled-gradient/ - Filled gradient icons with animation`);
}

processAllIcons();
