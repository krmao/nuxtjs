// noinspection JSUnusedGlobalSymbols
// https://nuxt.com/docs/api/configuration/nuxt-config

import path from "path";

export default defineNuxtConfig({
    ssr: true,
    runtimeConfig: {
        // 只在服务器端可用的私有键
        valueUsedOnServerSide: '123',
        // public中的键也可以在客户端使用
        public: {
            valueUsedOnClientSide: '321'
        }
    },
    app: {
        baseURL: '/',
        cdnURL: '',
        buildAssetsDir: '/_nuxt/',
        head: {
            charset: 'UTF-8',
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        },
        keepalive: false,
        pageTransition: {name: 'fade', mode: 'out-in'},
        layoutTransition: {name: 'slide', mode: 'out-in'},
        rootId: "__nuxt",
        rootTag: "div",
    },
    srcDir: 'src',
    dir: {
        // https://nuxt.com.cn/docs/getting-started/assets#%E8%B5%84%E6%BA%90%E7%9B%AE%E5%BD%95
        assets: 'assets',
        public: '../public',
        pages: 'pages',
        modules: 'modules',
        middleware: '../middleware',
        layouts: 'layouts',
        plugins: '../plugins',
    },
    alias: {
        "~~": path.resolve(__dirname),
        "@@": path.resolve(__dirname),
        "~": path.resolve(__dirname, 'src'),
        "@": path.resolve(__dirname, 'src'),
        "@public": path.resolve(__dirname, 'public'),
        "@assets": path.resolve(__dirname, 'src/assets'),
        "@components": path.resolve(__dirname, 'src/components'),
        "@layouts": path.resolve(__dirname, 'src/layouts'),
    },
    css: ['@/assets/styles/_global.scss'],
    tailwindcss: {},
    vite: {
        optimizeDeps: {include: []},
        build: {target: 'modules'},
        vue: {customElement: true},
        vueJsx: {mergeProps: true},
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/styles/_colors.scss" as *;'
                }
            }
        },
    },
    modules: ['@nuxt/ui'],
    devtools: {enabled: false, vscode: {}},
    $production: {},
    $development: {},
    postcss: {},
    routeRules: {
        '/': {
            isr: false,
            cache: {maxAge: 0},
            // redirect: { to: '/', statusCode: 302 }
        },
    },
    // https://nuxt.com.cn/docs/getting-started/deployment#%E9%80%89%E6%8B%A9%E6%80%A7%E9%A2%84%E6%B8%B2%E6%9F%93
    nitro: {
        prerender: {
            routes: ['/', '/sitemap.xml', '/robots.txt'],
            ignore: [],
            crawlLinks: true,
        }
    },
})
