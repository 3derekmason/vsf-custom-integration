// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      WILCO_FAMILY_REWARDS: process.env.DC_WILCO_FAMILY_REWARDS || '',
    },
  },
});
