<script setup lang="ts">
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

const rooms = [{ name: "Kitchen", path: "/kitchen" }];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg
        src="/images/storyboard.jpg"
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

    <RoomNavigation :rooms="rooms"></RoomNavigation>

    <UModal
      v-model:open="isStoryboardOpen"
      :ui="{
        overlay: 'backdrop-blur-sm',
        content: 'max-w-6xl',
      }"
    >
      <template #content>
        <div class="h-[90vh]">
          <iframe
            src="documents/storyboard.pdf"
            class="w-full h-full"
            frameborder="0"
          ></iframe>
        </div>
      </template>
    </UModal>
  </div>
</template>
