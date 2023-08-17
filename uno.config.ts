import { defineConfig, presetUno } from 'unocss'
import { presetAttributify } from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
    ]
})