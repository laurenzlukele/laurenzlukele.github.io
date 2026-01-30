<script setup lang="ts">
const VuePdfEmbed = defineAsyncComponent(() => import("vue-pdf-embed"));

definePageMeta({
  layout: "closeup",
});

const isStoryboardOpen = ref(false);

const openStoryboard = () => {
  isStoryboardOpen.value = true;
};

const hotspots = [
  {
    id: 1,
    x: 45,
    y: 45,
    label: "Read the storyboard",
    action: () => openStoryboard(),
  },
];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg
        src="/images/storyboard.webp"
        alt="Storyboard closeup"
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
      v-model:open="isStoryboardOpen"
      :ui="{ overlay: 'backdrop-blur-sm', content: 'max-w-6xl' }"
      title="Storyboard"
    >
      <template #content>
        <div class="h-[90vh] overflow-y-auto">
          <ClientOnly>
            <VuePdfEmbed source="/documents/storyboard.pdf" class="w-full" />
          </ClientOnly>
        </div>
      </template>
    </UModal>
  </div>
</template>
