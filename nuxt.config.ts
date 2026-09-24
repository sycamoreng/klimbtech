// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.VITE_SUPABASE_URL,
      supabaseAnonKey: process.env.VITE_SUPABASE_ANON_KEY,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://klimbtech.com',
      analyticsId: process.env.NUXT_PUBLIC_ANALYTICS_ID || '',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Klimb Technology — Premium software products & technology consulting',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Klimb Technology designs high-end SaaS products and delivers expert technology consulting that elevate customer engagement, communication, and operations for ambitious, high-growth businesses.',
        },
        { property: 'og:title', content: 'Klimb Technology — Premium software products & technology consulting' },
        {
          property: 'og:description',
          content:
            'High-end SaaS products and expert technology consulting that ambitious, high-growth businesses embed into their operations.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/app-icon.png' },
        { rel: 'apple-touch-icon', href: '/app-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap',
        },
      ],
    },
  },
})
