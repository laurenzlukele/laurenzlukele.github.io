<script setup lang="ts">
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

const rooms = [{ name: "Kitchen", path: "/kitchen" }];
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

    <RoomNavigation :rooms="rooms"></RoomNavigation>

    <UModal
      v-model:open="isScriptOpen"
      :ui="{
        overlay: 'backdrop-blur-sm',
      }"
    >
      <template #content>
        <div class="h-[90vh]">
          <iframe
            src="documents/script.pdf"
            class="w-full h-[90vh]"
            frameborder="0"
          ></iframe>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style scoped>
.viewport {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  display: grid;
  place-items: center;
}

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
  object-fit: cover;
}

.hotspot {
  position: absolute;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
}

.hotspot-dot {
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  transition: transform 0.2s ease;
}

.hotspot-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 2s infinite;
  pointer-events: none;
}

.hotspot-label {
  margin-top: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
  opacity: 0;
  transform: translateY(5px);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.hotspot:hover .hotspot-dot {
  transform: scale(1.3);
  background-color: #fbbf24;
}

.hotspot:hover .hotspot-label {
  opacity: 1;
  transform: translateY(0);
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}
</style>
