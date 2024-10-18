export default defineNuxtConfig({
  css: ['@/assets/css/tailwind.css'],
  
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt' , '@nuxtjs/supabase'],
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    }
  },
  compatibilityDate: '2024-10-18',
  ssr: false,
  components: true,
});