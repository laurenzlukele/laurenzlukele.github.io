<script setup lang="ts">
definePageMeta({
  layout: "closeup",
});

const isScriptOpen = ref(false);

const openPdf = () => {
  isScriptOpen.value = true;
};

const hotspots = [
  {
    id: 1,
    x: 45,
    y: 45,
    label: "Read the script",
    action: () => openPdf(),
  },
];

const tabs = [
  {
    label: "English",
    icon: "circle-flags:en",
    slot: "english",
  },
  {
    label: "Japanese",
    icon: "circle-flags:jp",
    slot: "japanese",
  },
];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg
        src="/images/script.jpg"
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
    >
      <template #content>
        <UTabs :items="tabs">
          <template #english>
            <div class="h-[90vh]">
              <iframe
                src="documents/script-en.pdf"
                class="w-full h-[90vh]"
                frameborder="0"
              ></iframe>
            </div>
          </template>

          <template #japanese>
            <div class="h-[90vh]">
              <iframe
                src="documents/script-jp.pdf"
                class="w-full h-[90vh]"
                frameborder="0"
              ></iframe>
            </div>
          </template>
        </UTabs>
      </template>
    </UModal>
  </div>
</template>
