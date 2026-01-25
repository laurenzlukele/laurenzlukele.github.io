<script setup lang="ts">
const openCV = () => {};

// Coordinates (x, y) are percentages relative to the IMAGE, not the screen
const hotspots = [
  {
    id: 1,
    x: 55,
    y: 20,
    label: "Examine towel",
    action: () => openCV(),
  },
];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg src="/images/bathroom.jpg" alt="Bathroom" class="scene-image" />

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
