<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";
const { locale } = useI18n();
const colorMode = useColorMode();
const config = useAppConfig();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | ${config.siteName}` : config.siteName;
  },
});

useSeoMeta({
  description: config.description,
  ogSiteName: config.siteName,
  ogDescription: config.description,
});

// Force dark mode on app start
colorMode.preference = "dark";
</script>

<template>
  <UApp :locale="locales[locale]">
    <div
      id="portrait-overlay"
      class="hidden fixed inset-0 z-9999 bg-black flex-col items-center justify-center text-center p-6 touch-none"
    >
      <UIcon
        name="i-heroicons-device-phone-mobile"
        class="w-16 h-16 text-primary-500 mb-4 animate-pulse rotate-90"
      />

      <h1 class="text-xl font-bold text-white mb-2">Landscape Mode Required</h1>
      <p class="text-gray-400 max-w-xs">
        This application is optimized for horizontal viewing. Please rotate your
        device.
      </p>
    </div>

    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style>
body {
  margin: 0;
  /* prevents background bounce on some mobile browsers */
  overscroll-behavior: none;
}

/* 
   Show overlay if:
   1. The device is in portrait mode.
   2. The width is less than 1024px (covers almost all mobile phones & small tablets).
*/
@media screen and (orientation: portrait) and (max-width: 1024px) {
  #portrait-overlay {
    display: flex !important;
  }
}
</style>
