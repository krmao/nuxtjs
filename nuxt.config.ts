// noinspection JSUnusedGlobalSymbols
// https://nuxt.com/docs/api/configuration/nuxt-config

import path from 'path';

export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    valueUsedOnServerSide: '123',
    public: { valueUsedOnClientSide: '321' }
  },
  $production: {},
  $development: {},
  routeRules: {
    '/': { isr: true, cache: { maxAge: 0 } },
    '/pc': { isr: true, cache: { maxAge: 0 } }
  },
  app: {
    baseURL: '/',
    cdnURL: '',
    buildAssetsDir: '/_nuxt/',
    head: {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    },
    keepalive: true, // https://nuxt.com.cn/docs/api/nuxt-config#keepalive
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: { name: 'slide', mode: 'out-in' },
    rootId: '__nuxt',
    rootTag: 'div'
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
    plugins: '../plugins'
  },
  alias: {
    '~~': path.resolve(__dirname),
    '@@': path.resolve(__dirname),
    '~': path.resolve(__dirname, 'src'),
    '@': path.resolve(__dirname, 'src'),
    '@public': path.resolve(__dirname, 'public'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@layouts': path.resolve(__dirname, 'src/layouts')
  },
  css: ['@/assets/css/global.scss'],
  vite: {
    optimizeDeps: { include: [] },
    build: { target: 'modules' },
    vue: { customElement: true },
    vueJsx: { mergeProps: true },
    css: { preprocessorOptions: { scss: { additionalData: '@use "@/assets/css/colors.scss" as *;' } } }
  },
  modules: ['@vant/nuxt', '@nuxtjs/stylelint-module', '@tresjs/nuxt', '@nuxtjs/tailwindcss'],
  vant: {
    // for compat pc https://github.com/youzan/vant/tree/main/packages/vant-touch-emulator
    lazyload: { lazyComponent: true },
    importStyle: true,
    excludeExports: ['Lazyload', 'Locale'],
    components: [],
    include: [/\.vue$/, /\.vue\?vue/, /\.vue\?v=/, /\.(([cm])?j|t)sx?$/],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    imports: []
  },
  stylelint: { lintOnStart: false },
  devtools: { enabled: false, vscode: {} },
  postcss: {
    plugins: {
      'postcss-px-to-viewport-8-plugin': {
        unitToConvert: 'px', // 需要转换的单位，默认为"px"
        viewportWidth: (filePath: string) => {
          // console.log('----- viewportWidth file', filePath)
          // for mobile vant https://blog.csdn.net/YongChao_bms/article/details/132305310
          if (filePath.includes('van')) {
            return 375;
          }
          // for pc
          if (filePath.includes('/src/pages/pc/')) {
            return 1440;
          }
          // for mobile
          return 750;
        },
        viewportHeight: 1334, // 设计稿的视口高度
        landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
        landscapeUnit: 'vw', // 横屏时使用的单位
        landscapeWidth: (filePath: string) => {
          // 横屏时使用的视口宽度
          // console.log('----- viewportWidth file', filePath)
          // for mobile vant https://blog.csdn.net/YongChao_bms/article/details/132305310
          if (filePath.includes('van')) {
            return 375;
          }
          // for pc
          if (filePath.includes('/src/pages/pc/')) {
            return 1080;
          }
          // for mobile
          return 1334;
        },
        unitPrecision: 5, // 单位转换后保留的精度
        propList: ['*', '!font-size'], // 能转化为vw的属性列表,!font-size表示font-size后面的单位不会被转换
        viewportUnit: 'vw', // 希望使用的视口单位
        fontViewportUnit: 'vw', // 字体使用的视口单位
        selectorBlackList: ['ignore-'], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位, 置表示类名中含有'keep-px'都不会被转换
        minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
        mediaQuery: false, // 媒体查询里的单位是否需要转换单位
        replace: true, //  是否直接更换属性值，而不添加备用属性
        exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        include: [/src/] // 如果设置了include，那将只有匹配到的文件才会被转换
      }
    }
  }
  // region nitro
  // https://nuxt.com.cn/docs/getting-started/deployment#%E9%80%89%E6%8B%A9%E6%80%A7%E9%A2%84%E6%B8%B2%E6%9F%93
  // nitro: undefined // 前后端分离项目不需要 nitro 插件
  // endregion
});
