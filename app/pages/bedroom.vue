<script setup lang="ts">
const goToTelevision = () => {
  navigateTo("/television");
};

const goToRecordPlayer = () => {
  navigateTo("/recordplayer");
};

const goToCast = () => {
  navigateTo("/cast");
};

const rooms = [
  { name: "Entrance", path: "/" },
  { name: "Kitchen", path: "/kitchen" },
];

// Define point-and-click hotspot
// Coordinates (x, y) are percentages relative to the IMAGE, not the screen
const hotspots = [
  {
    id: 1,
    x: 55,
    y: 20,
    label: "Examine record player",
    action: () => goToRecordPlayer(),
  },
  {
    id: 2,
    x: 42,
    y: 64,
    label: "Examine television",
    action: () => goToTelevision(),
  },
  {
    id: 3,
    x: 6,
    y: 50,
    label: "Open closet",
    action: () => goToCast(),
  },
];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg src="/images/bedroom.jpg" alt="Bedroom" class="scene-image" />

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
