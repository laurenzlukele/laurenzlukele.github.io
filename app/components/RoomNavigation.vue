<script setup lang="ts">
defineProps<{
  rooms: Array<{
    name: string;
    path: string;
  }>;
}>();
</script>

<template>
  <div class="absolute bottom-12 flex gap-4 inset-x-0 z-20 justify-center">
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
</template>
