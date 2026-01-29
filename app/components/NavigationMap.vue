<script setup lang="ts">
const isMapOpen = ref(false);
const route = useRoute();

const isPressed = ref(false);

const mapZones = [
  {
    id: "bedroom",
    name: "Bedroom",
    path: "/bedroom",
    x: 11,
    y: 4,
    w: 36,
    h: 74,
  },
  {
    id: "kitchen",
    name: "Kitchen",
    path: "/kitchen",
    x: 48,
    y: 4,
    w: 36,
    h: 74,
  },
  {
    id: "bathroom",
    name: "Bathroom",
    path: "/bathroom",
    x: 85,
    y: 4,
    w: 12,
    h: 91,
  },
  { id: "entrance", name: "Entrance", path: "/", x: 9, y: 80, w: 75, h: 19 },
];

const currentZone = computed(() => mapZones.find((z) => z.path === route.path));

const navigateToRoom = (path: string) => {
  if (path === route.path) {
    return;
  }
  isMapOpen.value = false;
  navigateTo(path);
};

const triggerClick = () => {
  if (isPressed.value) {
    return;
  }

  isPressed.value = true;

  setTimeout(() => {
    isPressed.value = false;
    openMap();
  }, 150);
};

const openMap = () => {
  setTimeout(() => {
    isMapOpen.value = true;
  }, 150);
};
</script>

<template>
  <div
    class="fixed z-50 flex select-none w-full justify-center landscape:w-auto landscape:right-5 lg:landscape:w-full lg:landscape:justify-center lg:landscape:right-auto landscape:bottom-5 lg:landscape:bottom-8"
  >
    <button
      class="group relative outline-none focus:outline-none cursor-pointer"
      aria-label="Open Apartment Map"
      @click="triggerClick"
    >
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-24 bg-gray-800 -z-10 mt-8 rounded-full transition-opacity duration-300 group-hover:opacity-0"
      />

      <div
        class="relative z-10 w-20 h-20 border-4 border-black transform rotate-45 bg-amber-50 rounded-full transition-all ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-amber-800 group-hover:rounded-br-none group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        :class="
          isPressed
            ? 'translate-y-1! translate-x-1! shadow-none! duration-100! bg-amber-800 rounded-br-none'
            : 'duration-300'
        "
      >
        <div
          class="absolute inset-0 flex items-center justify-center -rotate-45"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-9 h-9 text-amber-800 transition-colors duration-300 group-hover:text-amber-50"
          >
            <path d="M3 6l6-3 6 3 6-3v13l-6 3-6-3-6 3z" />
            <path d="M9 3v13" />
            <path d="M15 6v13" />
          </svg>
        </div>
      </div>
    </button>

    <UModal
      v-model:open="isMapOpen"
      :ui="{
        content: 'lg:max-w-6xl bg-transparent shadow-none ring-0',
        overlay: 'backdrop-blur-sm',
      }"
    >
      <template #content>
        <div class="relative grow aspect-video shadow-inner overflow-hidden">
          <img
            src="/images/floorplan.webp"
            alt="Floor Plan Map"
            class="absolute inset-0 w-full h-full object-fill"
          />

          <button
            v-for="zone in mapZones"
            :key="zone.id"
            class="absolute group transition-all duration-200 focus:outline-none"
            :class="[
              route.path === zone.path
                ? 'cursor-default bg-green-500/20 border-2 border-green-600'
                : 'cursor-pointer hover:bg-yellow-400/30 hover:border-2 hover:border-yellow-600',
            ]"
            :style="{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: `${zone.w}%`,
              height: `${zone.h}%`,
            }"
            @click="navigateToRoom(zone.path)"
          >
            <div
              v-if="route.path === zone.path"
              class="absolute inset-0 flex flex-col items-center justify-center"
            >
              <UIcon
                name="i-heroicons-map-pin-solid"
                class="text-5xl text-red-600 drop-shadow-md animate-bounce"
              />
            </div>
            <div
              v-else
              class="hidden group-hover:flex absolute inset-0 flex-col items-center justify-center z-10"
            >
              <span
                class="bg-yellow-100 text-yellow-900 text-[10px] uppercase font-bold px-1 py-0.5 rounded border border-yellow-600 shadow-sm"
              >
                {{ zone.name }}
              </span>
            </div>
          </button>
        </div>
      </template>
    </UModal>
  </div>
</template>
