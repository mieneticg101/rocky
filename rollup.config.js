import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig([
  // React build
  {
    input: 'src/components/Icon.tsx',
    output: [
      {
        file: 'dist/react/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/react/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: ['react', 'react-dom'],
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist/react',
      }),
    ],
  },
  // Vue build
  {
    input: 'src/components/Icon.vue',
    output: [
      {
        file: 'dist/vue/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/vue/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    external: ['vue'],
    plugins: [
      resolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist/vue',
      }),
    ],
  },
]);
