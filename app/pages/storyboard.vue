<script setup lang="ts">
const VuePdfEmbed = defineAsyncComponent(() => import("vue-pdf-embed"));

definePageMeta({
  layout: "closeup",
});

const config = useAppConfig();
const roomName = "Storyboard";

useSeoMeta({
  title: roomName,
  ogTitle: `${roomName} | ${config.siteName}`,
});

const isStoryboardOpen = ref(false);

const openStoryboard = () => {
  isStoryboardOpen.value = true;
};

const hotspots = computed(() => [
  {
    id: 1,
    x: 45,
    y: 45,
    label: $t("tooltip.storyboard"),
    action: () => openStoryboard(),
  },
]);
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
            <!-- <VuePdfEmbed
              source="/documents/storyboard.pdf"
              class="w-full"
              :scale="0.7"
              :text-layer="false"
              :annotation-layer="false"
            /> -->
            <object
              data="/documents/storyboard.pdf#toolbar=0&navpanes=0"
              type="application/pdf"
              class="w-full h-full"
            >
              <p>
                Your browser does not support PDFs.
                <a href="/documents/storyboard.pdf">Download instead.</a>
              </p>
            </object>
          </ClientOnly>
        </div>
      </template>
    </UModal>
  </div>
</template>
