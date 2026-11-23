export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@pinia/nuxt'],
  css: ['~/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/mixins/mixins.scss" as *;'
        }
      }
    }
  },
  app: {
    head: {
      title: 'FoodBlog',
      htmlAttrs: { lang: 'ru' }
    }
  },
  devServer: {
    host: '0.0.0.0'
  }
})
