<script setup lang="ts">
const rooms = [
  { name: "Entrance", path: "/" },
  { name: "bedroom", path: "/bedroom" },
];

// Define point-and-click hotspots here
// Coordinates (x, y) are percentages relative to the IMAGE, not the screen
const hotspots = [
  {
    id: 1,
    x: 13,
    y: 62,
    label: "Explore the storyboard",
    action: () => console.log("Storyboard clicked"),
  },
  {
    id: 2,
    x: 54,
    y: 20,
    label: "Flick through movie stills",
    action: () => console.log("Poster clicked"),
  },
  {
    id: 3,
    x: 73,
    y: 83,
    label: "Read the script",
    action: () => console.log("Script clicked"),
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

    <div class="ui-overlay">
      <div class="room-nav">
        <UButton
          v-for="room in rooms"
          :key="room.path"
          :to="room.path"
          color="secondary"
          size="lg"
        >
          Go to {{ room.name }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 1. The Viewport: Locks the screen size and hides overflow */
.viewport {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  display: grid;
  place-items: center; /* Centers the scene */
}

/* 2. The Scene: Mimics object-fit: cover on a DIV */
.scene-container {
  position: relative;

  /* CRITICAL: Set this to the intrinsic aspect ratio of your image */
  /* Example: 16/9, 4/3, or actual pixel dims like 1920/1080 */
  aspect-ratio: 16/9;

  /* These two lines force the container to expand until it covers the whole screen */
  min-width: 100vw;
  min-height: 100vh;
}

.scene-image {
  width: 100%;
  height: 100%;
  display: block;
  /* Image just fills the container, which is already handling the aspect ratio */
}

/* 3. The UI Overlay: Floats above the scene, fixed to the viewport */
.ui-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none; /* Let clicks pass through */
  z-index: 10;
}

.room-nav {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  pointer-events: auto; /* Re-enable clicks for buttons */
}

/* 4. Hotspot Styling */
.hotspot {
  position: absolute;
  transform: translate(-50%, -50%); /* Centers the coordinate */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  group: hover; /* For Tailwind-like group logic */
}

/* The solid center dot */
.hotspot-dot {
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  transition: transform 0.2s ease;
}

/* The pulsing outer ring */
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

/* The Label (Hidden by default, shown on hover) */
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

/* Hover Effects */
.hotspot:hover .hotspot-dot {
  transform: scale(1.3);
  background-color: #fbbf24; /* Gold color */
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
