<script setup lang="ts">
import { ref } from "vue";

const isVideoPlayerOpen = ref(false);
const youtubeId = "J8XGf_Ik_0M";

const openVideoPlayer = () => {
  isVideoPlayerOpen.value = true;
};
</script>

<template>
  <div class="relative">
    <SettingsMenu />
    <UButton
      color="neutral"
      variant="outline"
      size="xl"
      class="absolute top-5 right-17 z-90"
      @click="openVideoPlayer"
    >
      {{ $t("movie.trailer") }}
    </UButton>
    <NavigationMap />
    <VideoPlayerModal
      v-model:open="isVideoPlayerOpen"
      :youtube-id="youtubeId"
      title="Trailer"
    />
    <slot />
    <div
      class="hidden lg:flex absolute right-5 bottom-5 items-center gap-1 z-90"
    >
      <span class="text-2xl">©</span>
      <a
        class="hover:underline"
        href="https://github.com/kkukelka"
        target="_blank"
        >Kilian Kukelka</a
      >
    </div>
  </div>
</template>
