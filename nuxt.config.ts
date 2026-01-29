// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        // Hides the Safari UI (address bar and bottom nav)
        { name: "apple-mobile-web-app-capable", content: "yes" },
        // Changes the status bar style (black, white, or translucent)
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black-translucent",
        },
        // Prevents zooming which can break the layout
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
        },
      ],
      title: "Tethered",
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
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui"],
  vite: {
    plugins: [tailwindcss()],
  },
});
