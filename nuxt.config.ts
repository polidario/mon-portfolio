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
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxtjs/supabase',
    '@nuxtjs/device',
    '@nuxtjs/strapi',
    '@nuxtjs/apollo'
  ],

  compatibilityDate: '2025-05-04'
})