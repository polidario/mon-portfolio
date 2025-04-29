// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['motion'].includes(tag),
    },
  },

  css: [
    '@/assets/css/main.scss',
  ],
  supabase: {
    redirect: false,
  },
  image: {
    dir: 'assets/images',
    domains: ['avatars0.githubusercontent.com']
  },
  modules: [
    'motion-v/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxtjs/supabase',
  ]
})