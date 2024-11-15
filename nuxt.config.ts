// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  modules: ['nuxt-vuefire'],
  app: {
    head:{
      htmlAttrs:{
        'data-bs-theme': 'dark'
      },
      link:[
        {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'}
      ],
      scripts: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js'
        }
      ],
    }
  },
  vuefire: {
    config: {
      apiKey: "AIzaSyADaUYGx5nKkJ7n26S2tXiwyBzeGBnD2b8",
      authDomain: "badge-reader-baf95.firebaseapp.com",
      projectId: "badge-reader-baf95",
      storageBucket: "badge-reader-baf95.firebasestorage.app",
      messagingSenderId: "28474122511",
      appId: "1:28474122511:web:71469fa091b68c2b391e7a"
    },
    auth: {
      enabled: true,
      sessionCookies: false
    }
  }
})
