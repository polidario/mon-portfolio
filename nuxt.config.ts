// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  runtimeConfig: {
    public: {
      performanceEndpoint: process.env.PERFORMANCE_ENDPOINT || '',
      errorEndpoint: process.env.ERROR_ENDPOINT || '',
      buildVersion: process.env.BUILD_VERSION || '1.0.0'
    }
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['motion'].includes(tag),
    },
  },

  css: ['@/assets/css/main.scss'],

  supabase: {
    redirect: false,
  },

  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt',
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:1337/graphql'
      }
    }
  },

  modules: [
    'motion-v/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxtjs/supabase',
    '@nuxtjs/device',
    '@nuxtjs/strapi',
    '@nuxtjs/apollo'
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