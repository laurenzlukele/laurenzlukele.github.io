<script setup lang="ts">
const colorMode = useColorMode();

// Force dark mode on app start
colorMode.preference = "dark";
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style lang="css">
body {
  margin: 0 0;
}
</style>
