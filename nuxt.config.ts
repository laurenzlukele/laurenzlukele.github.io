// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
      meta: [
        // Hides the Safari UI (address bar and bottom nav)
        { name: "apple-mobile-web-app-capable", content: "yes" },
        // Changes the status bar style (black, white, or translucent)
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/android-chrome-512x512.png",
        },
      ],
    },
    pageTransition: { name: "iris", mode: "out-in" },
  },
  compatibilityDate: "2025-07-15",
  colorMode: {
    preference: "dark", // default on first visit
    fallback: "dark", // used if system preference can’t be detected
    classSuffix: "",
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: false },
  i18n: {
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "ja",
        name: "Japanese",
        file: "ja.json",
      },
    ],
  },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui", "@nuxtjs/i18n"],
  vite: {
    plugins: [tailwindcss()],
  },
});
