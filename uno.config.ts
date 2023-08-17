import { defineConfig, presetUno } from 'unocss'
import { presetAttributify } from 'unocss'
import { presetIcons } from 'unocss'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            extraProperties : {
                /* "display" : "inline",
                "vertical-align" : "middle", */
            }
        }),
    ]
})