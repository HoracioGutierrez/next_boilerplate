/** @type {import('next').NextConfig} */

const UnoCSS = require('@unocss/webpack').default

const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.plugins.push(new UnoCSS())
        return config
    },
    images: {
        remotePatterns: [
            {
                hostname: "lh3.googleusercontent.com"
            },
            {
                hostname: "api.dicebear.com",
            }
        ],
        dangerouslyAllowSVG: true,
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig
