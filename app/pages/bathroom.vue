<script setup lang="ts">
import { ref } from "vue";

const isGhostActive = ref(false);

const triggerEasterEgg = () => {
  isGhostActive.value = true;

  setTimeout(() => {
    isGhostActive.value = false;
  }, 2000);
};

const hotspots = [
  {
    id: 1,
    x: 34,
    y: 32,
    label: "Examine towel",
    action: () => triggerEasterEgg(),
  },
];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg src="/images/bathroom.jpg" alt="Bathroom" class="scene-image" />

      <div v-if="isGhostActive" class="ghost-wrapper">
        <NuxtImg
          src="/images/ghost-woman.png"
          alt="Ghost"
          class="ghost-image horror-flicker"
        />
      </div>

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
.ghost-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10;
}

.ghost-image {
  width: 100%;
  opacity: 0; /* Start invisible, animation handles the rest */

  mix-blend-mode: hard-light;
  filter: contrast(1.2) brightness(0.8) grayscale(0.8);
}

/* --- FLICKER ANIMATION --- */
@keyframes flicker {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  2% {
    opacity: 1;
    transform: scale(1);
  }
  4% {
    opacity: 0;
  }
  8% {
    opacity: 0;
  }
  10% {
    opacity: 0.8;
    transform: scale(0.98);
  }
  12% {
    opacity: 0;
  }
  18% {
    opacity: 1;
    filter: invert(1);
  }
  20% {
    opacity: 0;
    filter: invert(0);
  }
  40% {
    opacity: 0;
  }
  42% {
    opacity: 1;
  }
  43% {
    opacity: 0;
  }
  44% {
    opacity: 0.6;
  }
  45% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  90% {
    opacity: 0.9;
  }
  95% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.horror-flicker {
  animation: flicker 2s linear forwards;
}
</style>
