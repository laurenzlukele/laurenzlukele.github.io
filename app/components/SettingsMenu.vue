<script setup lang="ts">
import { en, ja } from "@nuxt/ui/locale";

const { locale, setLocale } = useI18n();
</script>

<template>
  <div class="absolute top-5 right-5 z-90">
    <USlideover :title="$t('settings.title')">
      <UButton
        icon="i-lucide-settings"
        color="neutral"
        variant="outline"
        size="xl"
      >
      </UButton>

      <template #body>
        <p class="font-bold inline mr-3">{{ $t("settings.language") }}:</p>
        <ULocaleSelect
          :locales="[en, ja]"
          :model-value="locale"
          name="language"
          size="xl"
          @update:model-value="setLocale($event)"
        />
        <USeparator class="my-5" />
      </template>
    </USlideover>
  </div>
</template>
