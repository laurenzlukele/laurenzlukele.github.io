// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  colorMode: {
    preference: "dark", // default on first visit
    fallback: "dark", // used if system preference can’t be detected
    classSuffix: "",
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui"],
  vite: {
    plugins: [tailwindcss()],
  },
});
