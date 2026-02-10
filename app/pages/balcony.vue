<script setup lang="ts">
const VuePdfEmbed = defineAsyncComponent(() => import("vue-pdf-embed"));

definePageMeta({
  layout: "closeup",
});

const config = useAppConfig();
const roomName = "Balcony";

useSeoMeta({
  title: roomName,
  ogTitle: `${roomName} | ${config.siteName}`,
});

const isDoorOpen = ref(false);
const isScoreOpen = ref(false);

const openDoor = () => {
  isDoorOpen.value = true;

  setTimeout(() => {
    nextTick(() => {
      isScoreOpen.value = true;
    });
  }, 500);
};

watch(isScoreOpen, (isOpen) => {
  if (!isOpen) {
    setTimeout(() => {
      isDoorOpen.value = false;
    }, 400);
  }
});

const hotspots = computed(() => [
  {
    id: 1,
    x: 37,
    y: 41,
    label: $t("tooltip.door"),
    visible: () => !isDoorOpen.value,
    action: () => openDoor(),
  },
]);
</script>

<template>
  <div class="viewport">
    <div class="scene-container relative overflow-hidden">
      <NuxtImg
        :src="
          isDoorOpen
            ? '/images/balcony-open.webp'
            : '/images/balcony-closed.webp'
        "
        alt="Balcony"
        class="scene-image"
        preload
      />

      <div style="display: none" aria-hidden="true">
        <NuxtImg src="/images/balcony-open.webp" />
      </div>

      <template v-for="spot in hotspots" :key="spot.id">
        <button
          v-if="spot.visible ? spot.visible() : true"
          class="hotspot"
          :style="{ left: `${spot.x}%`, top: `${spot.y}%` }"
          :aria-label="spot.label"
          @click="spot.action"
        >
          <span class="hotspot-ring"></span>
          <span class="hotspot-dot"></span>
          <span class="hotspot-label">{{ spot.label }}</span>
        </button>
      </template>
    </div>

    <UModal
      v-model:open="isScoreOpen"
      :ui="{
        overlay: 'backdrop-blur-sm',
        content: 'h-[90vh] overflow-y-auto',
      }"
      title="Score"
    >
      <template #content>
        <ClientOnly>
          <VuePdfEmbed
            source="/documents/score.pdf"
            class="w-full"
            :scale="0.7"
            :text-layer="false"
            :annotation-layer="false"
          />
        </ClientOnly>
      </template>
    </UModal>
  </div>
</template>
