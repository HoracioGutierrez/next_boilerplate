import { defineConfig, presetUno } from 'unocss'
import { presetAttributify } from 'unocss'
import { presetIcons } from 'unocss'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
    ],
    transformers : [
        transformerAttributifyJsx(),
        transformerVariantGroup(),
    ]
})