// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['motion'].includes(tag),
    },
  },

  css: [
    '~/assets/css/main.scss',
    '~/assets/css/import.css'
  ],

  supabase: {
    redirect: false,
  },

  alias: {
    '#shared': './shared'
  },

  modules: [
    'motion-v/nuxt',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/eslint',
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