// https://nuxt.com/docs/api/configuration/nuxt-config
// noinspection JSUnusedGlobalSymbols
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
    routeRules: {
        // 为了SEO目的，在构建时生成
        // '/docs': {isr: false},
        // 缓存1小时
        // '/api/*': {cache: {maxAge: 60 * 60}},
        // 重定向以避免404
        // '/old-page': {
        //     redirect: {
        //         to: '/new-page', statusCode: 302
        //     }
        // },
    },
    // https://nuxt.com.cn/docs/getting-started/deployment#%E9%80%89%E6%8B%A9%E6%80%A7%E9%A2%84%E6%B8%B2%E6%9F%93
    nitro: {
        prerender: {
            routes: [],
            ignore: [],
            crawlLinks: true,
        }
    },
    app: {
        baseURL: '/',
        buildAssetsDir: '/_nuxt/',
        cdnURL: '',
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1'
        },
        keepalive: false,
        // layoutTransition: false,
        // pageTransition: false,
        pageTransition: {name: 'fade', mode: 'out-in'},
        layoutTransition: {
            name: 'slide',
            mode: 'out-in'
        },
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
        "~": path.resolve(__dirname),
        "@": path.resolve(__dirname),
        "@public": path.resolve(__dirname, 'public'),
        "@assets": path.resolve(__dirname, 'src/assets'),
        "@components": path.resolve(__dirname, 'src/components'),
        "@layouts": path.resolve(__dirname, 'src/layouts'),
    },
    vite: {
        optimizeDeps: {
            include: []
        },
        build: {
            target: 'modules',
        },
        vue: {
            customElement: true
        },
        vueJsx: {
            mergeProps: true
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/styles/_colors.scss" as *;'
                }
            }
        },
    },
    $production: {
        routeRules: {
            '/**': {isr: true}
        }
    },
    $development: {},
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    devtools: {enabled: true},
    postcss: {},
})
