<script setup lang="ts">
const open = defineModel<boolean>("open", { default: false });

defineProps<{
  youtubeId: string;
  title: string;
}>();
</script>

<template>
  <UModal
    v-model:open="open"
    :ui="{
      content: 'max-w-5xl bg-transparent shadow-none ring-0',
      overlay: 'backdrop-blur-md',
    }"
    :title="title"
  >
    <template #content>
      <div class="aspect-video w-full max-h-[90vh] max-w-[142vh] mx-auto">
        <iframe
          v-if="open"
          width="100%"
          height="100%"
          :src="`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`"
          title="Video Player"
          frameborder="0"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
          "
          allowfullscreen
        ></iframe>
      </div>
    </template>
  </UModal>
</template>
