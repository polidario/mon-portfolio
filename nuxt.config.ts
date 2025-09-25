// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['motion'].includes(tag),
    },
  },

  css: ['@/assets/css/main.scss'],

  supabase: {
    redirect: false,
  },



  modules: [
    'motion-v/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxtjs/supabase',
    '@nuxtjs/device'
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/_variables.scss" as *;'
        }
      }
    }
  },

  compatibilityDate: '2025-05-04'
})