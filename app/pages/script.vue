<script setup lang="ts">
const VuePdfEmbed = defineAsyncComponent(() => import("vue-pdf-embed"));

definePageMeta({
  layout: "closeup",
});

const config = useAppConfig();
const roomName = "Official Script";

useSeoMeta({
  title: roomName,
  ogTitle: `${roomName} | ${config.siteName}`,
});

const isScriptOpen = ref(false);

const openPdf = () => {
  isScriptOpen.value = true;
};

const hotspots = computed(() => [
  {
    id: 1,
    x: 45,
    y: 45,
    label: $t("tooltip.script"),
    action: () => openPdf(),
  },
]);

const tabs = [
  {
    label: $t("language.english"),
    icon: "circle-flags:en",
    slot: "english",
  },
  {
    label: $t("language.japanese"),
    icon: "circle-flags:jp",
    slot: "japanese",
  },
];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg
        src="/images/script.webp"
        alt="Script closeup"
        class="scene-image"
      />

      <button
        v-for="spot in hotspots"
        :key="spot.id"
        class="hotspot"
        :style="{ left: `${spot.x}%`, top: `${spot.y}%` }"
        :aria-label="spot.label"
        @click="spot.action"
      >
        <span class="hotspot-ring"></span>
        <span class="hotspot-dot"></span>
        <span class="hotspot-label">{{ spot.label }}</span>
      </button>
    </div>

    <UModal
      v-model:open="isScriptOpen"
      :ui="{
        overlay: 'backdrop-blur-sm',
      }"
      title="Script"
    >
      <template #content>
        <UTabs :items="tabs">
          <template #english>
            <div class="h-[90vh] overflow-y-auto">
              <ClientOnly>
                <VuePdfEmbed
                  source="/documents/script-en.pdf"
                  class="w-full"
                  :text-layer="false"
                  :annotation-layer="false"
                />
              </ClientOnly>
            </div>
          </template>

          <template #japanese>
            <div class="h-[90vh] overflow-y-auto">
              <ClientOnly>
                <VuePdfEmbed
                  source="/documents/script-jp.pdf"
                  class="w-full"
                  :scale="0.7"
                  :text-layer="false"
                  :annotation-layer="false"
                />
              </ClientOnly>
            </div>
          </template>
        </UTabs>
      </template>
    </UModal>
  </div>
</template>
