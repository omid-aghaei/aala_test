// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'تست آلا',
      htmlAttrs: { lang: 'fa', dir: 'rtl' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
      ],
      link: [ { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } ],
      script: []
    }
  },
  css: ['~/assets/main.css'],
  modules: [
    'nuxt-purgecss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig: {
    api:'https://alaatv.com/api/v2/',
    public: {
      api: 'https://alaatv.com/api/v2/',
    }
  },
  build: { transpile: [] },
  postcss: { plugins: { tailwindcss: {}, autoprefixer: {} } },
  purgecss: { enabled: true, safelist: [] }
})
