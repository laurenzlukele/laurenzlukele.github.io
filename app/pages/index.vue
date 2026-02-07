<script setup lang="ts">
const { t } = useI18n();
const config = useAppConfig();
const roomName = "Entrance";

useSeoMeta({
  title: roomName,
  ogTitle: `${roomName} | ${config.siteName}`,
});

const movie = reactive({
  poster: "/images/poster.jpeg",
  year: "2026",
  length: "1h 14m",
  director: "Laurenz Lukele",
  tmdbUrl: "https://www.themoviedb.org/person/5112297-laurenz-lukele",
});
</script>

<template>
  <div class="relative w-full h-dvh overflow-hidden">
    <div class="absolute inset-0 z-0">
      <NuxtImg
        src="/images/entrance.webp"
        alt="Background"
        class="w-full h-full object-cover opacity-60"
        preload
      />
      <!-- <div class="absolute inset-0 backdrop-blur-xs"></div> -->
    </div>

    <div
      class="relative flex flex-col landscape:flex-row h-full w-full max-w-7xl mx-auto"
    >
      <div
        class="hidden landscape:block landscape:w-[35%] shrink-0 self-center"
      >
        <NuxtImg
          :src="movie.poster"
          :alt="$t('movie.tethered')"
          class="w-full object-contain"
        />
      </div>

      <div
        class="flex-1 flex flex-col justify-center p-6 landscape:p-6 landscape:pl-8 overflow-hidden"
      >
        <div class="mb-2 landscape:mb-3">
          <h1 class="landscape:text-4xl lg:landscape:text-5xl font-black mb-3">
            {{ $t("movie.tethered") }}
          </h1>
          <div
            class="flex items-center text-gray-400 landscape:text-sm lg:landscape:text-base font-medium space-x-2"
          >
            <span>{{ movie.year }}</span>
            <span class="text-gray-600">•</span>
            <span>{{ movie.length }}</span>
            <span class="text-gray-600 hidden landscape:inline">•</span>
            <div class="flex gap-1.5 ml-2">
              <span
                v-for="genre in [
                  t('movie.genre.ensemble'),
                  t('movie.genre.mystery'),
                  t('movie.genre.drama'),
                ]"
                :key="genre"
                class="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-highlighted border border-white/30"
              >
                {{ genre }}
              </span>
            </div>
          </div>
        </div>

        <div
          class="space-y-1 mb-3 landscape:mb-4 text-xs landscape:text-sm lg:landscape:text-base text-toned"
        >
          <p class="truncate">
            <strong class="text-white">{{ $t("movie.director") }}:</strong>
            {{ movie.director }}
          </p>
          <p class="truncate">
            <strong class="text-white">{{ $t("movie.cast") }}:</strong>
            {{
              [
                $t("cast.shinkawa-chiharu.name-without"),
                $t("cast.sanada-koki.name-without"),
                $t("cast.manae.name-without"),
                $t("cast.nemoto-moeri.name-without"),
                $t("cast.miyazono-kensei.name-without"),
              ].join(", ")
            }}
          </p>
        </div>

        <div
          class="mb-4 landscape:mb-5 text-sm landscape:text-sm lg:landscape:text-base landscape:leading-relaxed text-toned"
        >
          <p
            class="line-clamp-3 landscape:line-clamp-4 lg:line-clamp-none max-w-lg"
          >
            {{ $t("movie.synopsis") }}
          </p>
        </div>

        <div>
          <UButton
            :to="movie.tmdbUrl"
            target="_blank"
            icon="i-heroicons-arrow-top-right-on-square"
            variant="solid"
            size="md"
          >
            {{ $t("movie.view-on") }} TMDB
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No custom CSS needed! 
   Everything is handled by Tailwind utility classes.
*/
</style>
