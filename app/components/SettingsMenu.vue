<script setup lang="ts">
import { en, ja } from "@nuxt/ui/locale";

const locale = ref("en");
</script>

<template>
  <div class="absolute top-5 right-5 z-90">
    <USlideover title="Settings">
      <UButton
        icon="i-lucide-settings"
        color="neutral"
        variant="outline"
        size="xl"
      >
      </UButton>

      <template #body>
        <p class="font-bold inline mr-3">Language:</p>
        <ULocaleSelect
          v-model="locale"
          name="language"
          :locales="[en, ja]"
          size="xl"
        />
        <USeparator class="my-5" />
      </template>
    </USlideover>
  </div>
</template>
