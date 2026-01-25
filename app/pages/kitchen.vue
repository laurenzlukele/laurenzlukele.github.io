<script setup lang="ts">
const goToScript = () => {
  navigateTo("/script");
};

const goToStoryboard = () => {
  navigateTo("/storyboard");
};
const goToWall = () => {
  navigateTo("/stills");
};

const rooms = [
  { name: "Entrance", path: "/" },
  { name: "Bedroom", path: "/bedroom" },
];

const hotspots = [
  {
    id: 1,
    x: 13,
    y: 62,
    label: "Examine shelf",
    action: () => goToStoryboard(),
  },
  {
    id: 2,
    x: 54,
    y: 20,
    label: "Examine wall",
    action: () => goToWall(),
  },
  {
    id: 3,
    x: 73,
    y: 83,
    label: "Examine table",
    action: () => goToScript(),
  },
];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg src="/images/kitchen.jpg" alt="Kitchen" class="scene-image" />
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
  </div>
</template>

<style scoped>
.scene-container {
  position: relative;
  aspect-ratio: 16/9;
  min-width: 100vw;
  min-height: 100vh;
}

.scene-image {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
