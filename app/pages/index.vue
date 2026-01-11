<script setup lang="ts">
const rooms = [
  { name: "Bedroom", path: "/bedroom" },
  { name: "Kitchen", path: "/kitchen" },
];
</script>

<template>
  <div class="room">
    <NuxtImg
      src="/images/entrance.jpg"
      alt="Entrance"
      class="room-image"
      height="100vw"
      width="100vw"
      preload
    />

    <RoomNavigation :rooms="rooms"></RoomNavigation>
  </div>
</template>

<style scoped>
.room {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.room-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
