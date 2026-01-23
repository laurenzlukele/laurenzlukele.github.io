<script setup lang="ts">
const isOpen = ref(false);
const route = useRoute();

const mapZones = [
  {
    id: "bedroom",
    name: "Bedroom",
    path: "/bedroom",
    x: 13,
    y: 12,
    w: 33,
    h: 64,
  },
  {
    id: "kitchen",
    name: "Kitchen",
    path: "/kitchen",
    x: 47,
    y: 12,
    w: 33,
    h: 64,
  },
  //   {
  //     id: "bathroom",
  //     name: "Bathroom",
  //     path: "/bathroom",
  //     x: 80,
  //     y: 12,
  //     w: 12,
  //     h: 80,
  //   },
  { id: "entrance", name: "Entrance", path: "/", x: 12, y: 78, w: 68, h: 16 },
];

const currentZone = computed(() => mapZones.find((z) => z.path === route.path));

const navigateToRoom = (path: string) => {
  if (path === route.path) return;
  isOpen.value = false;
  navigateTo(path);
};
</script>

<template>
  <div>
    <div
      v-show="!isOpen"
      class="fixed bottom-12 z-50 flex justify-center w-full"
    >
      <UButton
        icon="i-heroicons-map"
        size="xl"
        color="primary"
        variant="solid"
        class="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
        @click="isOpen = true"
      >
        Map
      </UButton>
    </div>

    <UModal
      v-model:open="isOpen"
      :ui="{
        content: 'sm:max-w-7xl bg-transparent',
        overlay: 'backdrop-blur-sm',
      }"
    >
      <template #content>
        <div>
          <div
            class="relative w-full aspect-video shadow-inner overflow-hidden"
          >
            <NuxtImg
              src="/images/floorplan.png"
              alt="Floor Plan Map"
              class="absolute inset-0 w-full h-full object-fill opacity-90"
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
        </div>
      </template>
    </UModal>
  </div>
</template>
