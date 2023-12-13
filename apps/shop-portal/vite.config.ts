import path from 'node:path'
import { defineConfig } from 'vite'
import { baseConfig } from '@dcloud/shop-vite-config'
import type { ConfigEnv } from 'vite'

import pkg from './package.json'

const ViteConfig: any = ({ mode }: ConfigEnv) => {
  const defaultConfig: any = baseConfig({
    mode,
    pkg,
    entry: path.resolve(__dirname, 'bootstrap/main.tsx')
  })

  return defineConfig({
    ...defaultConfig,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
        '~': path.resolve(__dirname, './')
      }
    }
  })
}

export default ViteConfig
