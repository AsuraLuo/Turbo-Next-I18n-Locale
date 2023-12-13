import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react-swc'
import banner from 'vite-plugin-banner'
import { createHtmlPlugin } from 'vite-plugin-html'
import { loadEnv } from 'vite'
import type { UserConfigExport } from 'vite'

import { httpProxy, svgBuilder } from './plugin'

export type BaseConfigType = {
  entry: string
  mode: string
  pkg?: any
}

export const baseConfig = ({ entry, mode, pkg = {} }: BaseConfigType) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), 'REACT_') }

  const isProd: boolean = mode === 'production'
  const API: string | undefined = process.env.REACT_APP_API_URL

  const config: UserConfigExport = {
    envPrefix: 'REACT_',
    build: {
      cssMinify: isProd,
      reportCompressedSize: !isProd,
      sourcemap: !isProd,
      rollupOptions: {
        output: {
          manualChunks: {
            runtime: []
          }
        }
      }
    },
    server: {
      cors: true,
      host: '127.0.0.1',
      port: 3000,
      hmr: true
    },
    plugins: [
      createHtmlPlugin({
        minify: false,
        entry,
        inject: {
          data: {
            cdnPath: process.env.REACT_CDN_PATH,
            apiPath: process.env.REACT_APP_API_URL
          },
          tags: [
            {
              injectTo: 'body-prepend',
              tag: 'div',
              attrs: {
                id: 'root'
              }
            }
          ]
        }
      }),
      pkg &&
        banner(
          `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * author: ${pkg.author}\n * version: ${pkg.version}\n * copyright: ${pkg.copyright}\n */`
        ),
      legacy({
        targets: ['defaults', 'ie >= 9', 'chrome 52']
      }),
      react({
        jsxImportSource: '@emotion/react',
        plugins: [
          [
            '@swc/plugin-emotion',
            {
              sourceMap: true,
              autoLabel: 'dev-only',
              labelFormat: '[local]'
            }
          ]
        ]
      }),
      API &&
        httpProxy({
          '/api/': {
            target: API,
            changeOrigin: true,
            secure: false,
            rewrite: (url: string) => url.replace(/^\/api/, '/')
          }
        }),
      svgBuilder('svgs/'),
      process.env.REACT_APP_BUNDLE_VISUALIZE === '1' &&
        require('rollup-plugin-visualizer').visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true
        })
    ]
  }

  return config
}
