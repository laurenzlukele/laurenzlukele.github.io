<script setup lang="ts">
definePageMeta({
  layout: "closeup",
});

type CastMember = {
  name: string;
  role: string;
  about: string;
  image: string;
  socials: {
    instagram?: string;
    twitter?: string;
    imdb?: string;
    web?: string;
  };
};

const isGalleryOpen = ref(true);
const areLightsOn = ref(false);
const isFlickering = ref(false);

const expandedActorIndex = ref<number | null>(null);

const toggleActor = (index: number) => {
  if (expandedActorIndex.value === index) {
    expandedActorIndex.value = null;
  } else {
    expandedActorIndex.value = index;
  }
};

const castList = ref<CastMember[]>([
  {
    name: $t("cast.shinkawa-chiharu.name"),
    role: "Fumiko",
    about: $t("cast.shinkawa-chiharu.about"),
    image: "/images/cast/shinkawa-chiharu.jpeg",
    socials: {
      web: "https://chiharushinkawa.wixsite.com/minichiiharu",
    },
  },
  {
    name: $t("cast.sanada-koki.name"),
    role: "Hansuke",
    about: $t("cast.sanada-koki.about"),
    image: "/images/cast/sanada-koki.jpeg",
    socials: {
      instagram: "https://www.instagram.com/ko__oo__ki/",
    },
  },
  {
    name: $t("cast.manae.name"),
    role: "Helene",
    about: $t("cast.manae.about"),
    image: "/images/cast/manae.jpeg",
    socials: {
      instagram: "https://www.instagram.com/ma_na_e1/",
      web: "https://lit.link/manae212",
    },
  },
  {
    name: $t("cast.nemoto-moeri.name"),
    role: "Hako",
    about: $t("cast.nemoto-moeri.about"),
    image: "/images/cast/nemoto-moeri.jpeg",
    socials: {
      instagram: "https://www.instagram.com/_moeri_n__/",
      web: "https//lit.link/moeri_nemoto",
    },
  },
  {
    name: $t("cast.nakano-hibiki.name"),
    role: "Park woman",
    about: $t("cast.nakano-hibiki.about"),
    image: "/images/cast/nakano-hibiki.jpeg",
    socials: { instagram: "https://www.instagram.com/hibiki_n185/", imdb: "#" },
  },
  {
    name: $t("cast.yamane-aya.name"),
    role: "Fumiko 2",
    about: $t("cast.yamane-aya.about"),
    image: "/images/cast/yamane-aya.jpeg",
    socials: {
      instagram: "https://www.instagram.com/aya_yamane/",
      web: "https://lit.link/ayayamane",
    },
  },
  {
    name: $t("cast.endo-kosuke.name"),
    role: "Ryo",
    about: $t("cast.endo-kosuke.about"),
    image: "/images/cast/endo-kosuke.jpeg",
    socials: { web: "https://a-and-h-promotion.com/artists/Kousuke_Endo/" },
  },
  {
    name: $t("cast.miyazono-kensei.name"),
    role: "Totsuya",
    about: $t("cast.miyazono-kensei.about"),
    image: "/images/cast/miyazono-kensei.jpeg",
    socials: { web: "http://gushout.info/archives/author/kensei_miyazono" },
  },
  {
    name: $t("cast.kojima-sora.name"),
    role: "Walking woman",
    about: $t("cast.kojima-sora.about"),
    image: "/images/cast/kojima-sora.jpeg",
    socials: { instagram: "https://www.instagram.com/kotori_rr/" },
  },
  {
    name: $t("cast.fujihara-asuto.name"),
    role: "Koji",
    about: $t("cast.fujihara-asuto.about"),
    image: "/images/cast/fujihara-asuto.jpeg",
    socials: {
      twitter: "https://x.com/amajioasuri1310?s=21&t=Ph_95DKcR_jGSQ0B4zoJ9w",
    },
  },
]);

const openGallery = () => {
  isFlickering.value = true;
  setTimeout(() => {
    areLightsOn.value = true;
  }, 150);
  setTimeout(() => {
    isFlickering.value = false;
  }, 600);
  setTimeout(() => {
    isGalleryOpen.value = true;
  }, 800);
};

watch(isGalleryOpen, (isOpen) => {
  if (!isOpen) {
    setTimeout(() => {
      areLightsOn.value = false;
    }, 400);
    expandedActorIndex.value = null;
  }
});

const hotspots = [
  {
    id: 1,
    x: 29,
    y: 41,
    label: $t("tooltip.lights"),
    visible: () => !areLightsOn.value,
    action: () => openGallery(),
  },
];
</script>

<template>
  <div class="viewport">
    <div class="scene-container relative overflow-hidden">
      <NuxtImg
        :src="
          areLightsOn ? '/images/closet-on.webp' : '/images/closet-off.webp'
        "
        alt="Inside closet"
        class="scene-image"
        preload
      />

      <div style="display: none" aria-hidden="true">
        <NuxtImg src="/images/closet-on.webp" />
      </div>

      <div
        class="absolute inset-0 bg-white pointer-events-none transition-opacity duration-100 ease-out z-10"
        :class="
          isFlickering
            ? 'opacity-60 mix-blend-hard-light animate-flicker'
            : 'opacity-0'
        "
      ></div>

      <template v-for="spot in hotspots" :key="spot.id">
        <button
          v-if="spot.visible ? spot.visible() : true"
          class="hotspot"
          :style="{ left: `${spot.x}%`, top: `${spot.y}%` }"
          :aria-label="spot.label"
          @click="spot.action"
        >
          <span class="hotspot-ring"></span>
          <span class="hotspot-dot"></span>
          <span class="hotspot-label">{{ spot.label }}</span>
        </button>
      </template>
    </div>

    <UModal
      v-model:open="isGalleryOpen"
      :ui="{
        content:
          'max-w-7xl bg-transparent shadow-none ring-0 flex flex-col justify-center',
        overlay: 'backdrop-blur-sm',
      }"
      title="Cast gallery"
    >
      <template #content>
        <div
          class="grid grid-flow-col items-center auto-cols-[40%] md:auto-cols-[25%] landscape:auto-cols-[22%] lg:landscape:auto-cols-[20%] gap-5 landscape:gap-8 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide"
        >
          <div
            v-for="(actor, index) in castList"
            :key="index"
            class="relative group snap-center flex flex-col min-h-0 h-full"
            :class="expandedActorIndex === index ? 'z-50' : 'z-10'"
            @click="toggleActor(index)"
          >
            <h3
              class="line-clamp-1 text-base mb-2 font-bold text-white tracking-tight shrink-0"
            >
              {{ actor.name }}
            </h3>

            <div
              class="relative aspect-3/4 min-h-0 overflow-hidden cursor-pointer"
            >
              <img
                :src="actor.image"
                :alt="actor.name"
                class="h-full w-full absolute inset-0 object-cover rounded-md group-hover:scale-105 duration-300"
              />

              <div
                class="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-60 rounded-md"
              ></div>

              <div class="absolute bottom-3 left-3">
                <span class="italic">as</span>
                <div class="text-highlighted text-xl font-bold tracking-wide">
                  {{ actor.role }}
                </div>
              </div>

              <UIcon
                name="i-lucide-info"
                class="absolute right-3 top-3 size-6 group-hover:size-7 duration-300"
              ></UIcon>
            </div>
            <Transition name="slide-fade">
              <div
                v-if="expandedActorIndex === index"
                class="absolute left-[105%] top-0 bottom-0 w-60 md:w-70 bg-black/70 backdrop-blur-lg border border-white/20 rounded-r-lg shadow-2xl z-50 p-5 flex flex-col justify-between overflow-y-auto"
                @click.stop
              >
                <div>
                  <h4
                    class="text-sm uppercase tracking-widest text-text font-bold mb-1"
                  >
                    Bio
                  </h4>
                  <p class="text-muted text-sm leading-relaxed italic">
                    {{ actor.about }}
                  </p>
                </div>

                <div class="flex gap-2 pt-3 border-t border-white/10">
                  <UButton
                    v-if="actor.socials.instagram"
                    icon="i-simple-icons-instagram"
                    variant="ghost"
                    color="white"
                    size="xs"
                    :to="actor.socials.instagram"
                    target="_blank"
                  />
                  <UButton
                    v-if="actor.socials.twitter"
                    icon="i-simple-icons-twitter"
                    variant="ghost"
                    color="white"
                    size="xs"
                    :to="actor.socials.twitter"
                    target="_blank"
                  />
                  <UButton
                    v-if="actor.socials.imdb"
                    icon="i-simple-icons-imdb"
                    variant="ghost"
                    color="white"
                    size="xs"
                    :to="actor.socials.imdb"
                    target="_blank"
                  />
                  <UButton
                    v-if="actor.socials.web"
                    icon="i-lucide-globe"
                    variant="ghost"
                    color="white"
                    size="xs"
                    :to="actor.socials.web"
                    target="_blank"
                  />
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

@keyframes flicker {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  20% {
    opacity: 0.1;
  }
  30% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0;
  }
}

.animate-flicker {
  animation: flicker 0.6s linear forwards;
}

/* Scrollbar Hide Utility */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
