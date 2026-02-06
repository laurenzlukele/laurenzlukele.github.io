<script setup lang="ts">
const config = useAppConfig();
const roomName = "Bedroom";

useSeoMeta({
  title: roomName,
  ogTitle: `${roomName} | ${config.siteName}`,
});

const goToTelevision = () => {
  navigateTo("/television");
};

const goToRecordPlayer = () => {
  navigateTo("/recordplayer");
};

const goToCast = () => {
  navigateTo("/cast");
};

// Coordinates (x, y) are percentages relative to the IMAGE, not the screen
const hotspots = computed(() => [
  {
    id: 1,
    x: 55,
    y: 20,
    label: $t("tooltip.record-player"),
    action: () => goToRecordPlayer(),
  },
  {
    id: 2,
    x: 42,
    y: 64,
    label: $t("tooltip.television"),
    action: () => goToTelevision(),
  },
  {
    id: 3,
    x: 6,
    y: 50,
    label: $t("tooltip.closet"),
    action: () => goToCast(),
  },
]);
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg src="/images/bedroom.webp" alt="Bedroom" class="scene-image" />

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
