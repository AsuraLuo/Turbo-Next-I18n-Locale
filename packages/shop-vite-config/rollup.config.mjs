import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'

/**
 * @type {import('rollup').RollupOptions}
 */
export default defineConfig({
  input: 'index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      inlineDynamicImports: true
    },
    {
      file: 'dist/index.mjs',
      format: 'esm',
      inlineDynamicImports: true
    }
  ],
  plugins: [
    typescript({
      outputToFilesystem: false
    })
  ],
  external: []
})
