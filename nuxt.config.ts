// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  runtimeConfig: {
    public: {
      apiMediasURL: process.env.NUXT_PUBLIC_MEDIAS_URL
    }
  },

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