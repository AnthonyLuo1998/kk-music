// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

import { icons } from './icons.config'

export default defineConfig({
  // ...UnoCSS options
  rules: [
    ['drag', { '-webkit-app-region': 'drag' }],
    ['no-drag', { '-webkit-app-region': 'no-drag' }]
  ],
  shortcuts: [
    [
      /^op-btn-(.*)$/,
      ([, m]) => {
        const arr = m.split('-')
        console.log(arr)
        return `text-${arr[0]}  text-${arr[1] ? arr[1] : '#7f8c8d'} hover:text-${
          arr[2] ? arr[2] : '#2ed573'
        } cursor-pointer`
      }
    ],
    [/^op-btn-d-(.*)$/, ([, p]) => `text-${p} text-#bdc3c7 pointer-events-none`]
  ],
  presets: [
    presetIcons({
      collections: {
        solar: () => import('@iconify-json/solar/icons.json').then((i) => i.default as any),
        emoji: () =>
          import('@iconify-json/fluent-emoji-high-contrast/icons.json').then((i) => i.default)
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    }),
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetWebFonts()
  ],
  safelist: [...icons],
  transformers: [transformerDirectives(), transformerVariantGroup()]
})
