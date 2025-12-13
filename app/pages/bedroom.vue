<script setup lang="ts">
const rooms = [
  { name: "Entrance", path: "/" },
  { name: "Kitchen", path: "/kitchen" },
];
</script>

<template>
  <div class="room">
    <NuxtImg
      src="/images/bedroom.jpg"
      alt="Bedroom"
      class="room-image"
      height="100vw"
      width="100vw"
    />

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
</template>

<style scoped>
.room {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.room-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.room-nav {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
}
</style>
