<script setup lang="ts">
definePageMeta({
  layout: "closeup",
});

type CastMember = {
  name: string;
  role: string;
  occupation: string;
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
    name: "新川千華 (Shinkawa Chiharu)",
    role: "Fumiko",
    occupation:
      "俳優、モーションキャプチャ、国内外の企業CM、クラシックバレ (Actress, motioncapture artist, international business, classical Ballet)",
    image: "/images/cast/shinkawa-chiharu.jpeg",
    socials: {
      web: "https://chiharushinkawa.wixsite.com/minichiiharu",
    },
  },
  {
    name: "真田 煌生 (Sanada  Kōki)",
    role: "Hansuke",
    occupation: "書道が得意なアーティストです (Künstler/Kaligraphist)",
    image: "/images/cast/sanada-koki.jpeg",
    socials: {
      instagram: "https://www.instagram.com/ko__oo__ki/",
    },
  },
  {
    name: "愛恵 (MANAE)",
    role: "Helene",
    occupation: "舞台と映画の二刀流俳優 (theater and film actress)",
    image: "/images/cast/manae.jpeg",
    socials: {
      instagram: "https://www.instagram.com/ma_na_e1/",
      web: "https://lit.link/manae212",
    },
  },
  {
    name: "根本もえり (Nemoto Moeri)",
    role: "Hako",
    occupation: "俳優,マルチタレント (Actress, Multitalent)",
    image: "/images/cast/nemoto-moeri.jpeg",
    socials: {
      instagram: "https://www.instagram.com/_moeri_n__/",
      web: "https//lit.link/moeri_nemoto",
    },
  },
  {
    name: "中野 響 (Nakano Hibiki)",
    role: "Park woman",
    occupation: "役者,アーティスト (Actress, Artist)",
    image: "/images/cast/nakano-hibiki.jpeg",
    socials: { instagram: "https://www.instagram.com/hibiki_n185/", imdb: "#" },
  },
  {
    name: "お名前 (Yamane Aya)",
    role: "Fumiko 2",
    occupation: "映像、舞台を中心に活動中 (Working in film and theater)",
    image: "/images/cast/yamane-aya.jpeg",
    socials: {
      instagram: "https://www.instagram.com/aya_yamane/",
      web: "https://lit.link/ayayamane",
    },
  },
  {
    name: "遠藤幸介 (Endō Kōsuke)",
    role: "Ryo",
    occupation: "舞台 (Theater actor)",
    image: "/images/cast/endo-kosuke.jpeg",
    socials: { web: "https://a-and-h-promotion.com/artists/Kousuke_Endo/" },
  },
  {
    name: "宮園兼生 (Miyazono Kensei)",
    role: "Totsuya",
    occupation: "俳優、(Actor)",
    image: "/images/cast/miyazono-kensei.jpeg",
    socials: { web: "http://gushout.info/archives/author/kensei_miyazono" },
  },
  {
    name: "小嶋そら (Kojima Sora)",
    role: "Walking woman",
    occupation:
      "ジャズダンス、役者活動、映画作り。(Jazz dance, actress, film maker)",
    image: "/images/cast/kojima-sora.jpeg",
    socials: { instagram: "https://www.instagram.com/kotori_rr/" },
  },
  {
    name: "藤原 明日人 (Fujihara Asuto)",
    role: "Koji",
    occupation: "Comedian, screenwriter, content creator, television persona",
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
    label: "Turn on lights",
    visible: () => !areLightsOn.value,
    action: () => openGallery(),
  },
];
</script>

<template>
  <div class="viewport">
    <div class="scene-container relative overflow-hidden">
      <NuxtImg
        :src="areLightsOn ? '/images/closet-on.jpg' : '/images/closet-off.jpg'"
        alt="Inside closet"
        class="scene-image"
        preload
      />

      <div style="display: none" aria-hidden="true">
        <NuxtImg src="/images/closet-on.jpg" />
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
        content: 'max-w-7xl bg-transparent shadow-none ring-0',
        overlay: 'backdrop-blur-md',
      }"
      title="Cast gallery"
    >
      <template #content>
        <div
          class="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
        >
          <div
            v-for="(actor, index) in castList"
            :key="index"
            class="group relative flex-none snap-center flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
            :class="[
              /* Default Portrait Width */
              'w-60',
              /* Desktop Landscape Width */
              'lg:landscape:w-80 lg:landscape:gap-4',
              /* Mobile Landscape Width Logic (Expandable) */
              expandedActorIndex === index
                ? 'landscape:w-lg'
                : 'landscape:w-48',
            ]"
          >
            <div class="text-left space-y-1 mb-2">
              <h3
                class="line-clamp-1 text-base landscape:text-lg lg:landscape:text-2xl font-bold text-white tracking-tight"
              >
                {{ actor.name }}
              </h3>
              <p
                class="text-xs h-8 text-white/50 uppercase tracking-[0.2em] font-medium line-clamp-2 landscape:hidden lg:landscape:block"
              >
                {{ actor.occupation }}
              </p>
            </div>

            <div
              class="flex flex-col landscape:flex-row lg:landscape:flex-col items-start landscape:gap-0 lg:landscape:gap-4 transition-all duration-500"
            >
              <div
                class="relative shrink-0 rounded-2xl overflow-hidden bg-gray-900 ring-1 ring-white/10 transition-all duration-500 cursor-pointer"
                :class="[
                  'w-full aspect-3/4', // Default
                  'landscape:w-48 landscape:h-auto', // Mobile Landscape Size
                  'lg:landscape:w-full', // Desktop Landscape Reset
                  expandedActorIndex === index
                    ? 'ring-primary-500/50 rounded-r-none'
                    : 'group-hover:ring-white/30',
                ]"
                @click="toggleActor(index)"
              >
                <img
                  :src="actor.image"
                  :alt="actor.name"
                  class="w-full h-full object-cover transition-transform duration-700"
                  :class="{
                    'group-hover:scale-105': expandedActorIndex !== index,
                  }"
                />

                <div
                  class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60"
                ></div>

                <div class="absolute bottom-4 left-4">
                  <span class="text-white/80 text-sm font-serif italic"
                    >as</span
                  >
                  <div class="text-white text-xl font-bold tracking-wide">
                    {{ actor.role }}
                  </div>
                </div>

                <div
                  v-if="expandedActorIndex !== index"
                  class="absolute top-2 right-2 hidden landscape:block lg:landscape:hidden animate-pulse"
                >
                  <UIcon
                    name="i-heroicons-information-circle"
                    class="text-white w-6 h-6 drop-shadow-md"
                  />
                </div>
              </div>

              <div
                class="flex h-full flex-col justify-center bg-black/40 backdrop-blur-sm rounded-r-2xl landscape:flex lg:landscape:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                :class="
                  expandedActorIndex === index
                    ? 'w-80 opacity-100 p-4'
                    : 'w-0 opacity-0'
                "
              >
                <div class="min-w-[18rem] space-y-4">
                  <p class="text-white/90 text-sm leading-relaxed">
                    {{ actor.occupation }}
                  </p>

                  <p class="text-white/60 text-xs leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>

                  <div class="flex gap-2 pt-2 border-t border-white/10">
                    <UButton
                      v-if="actor.socials.instagram"
                      icon="i-simple-icons-instagram"
                      variant="ghost"
                      color="white"
                      size="md"
                      :to="actor.socials.instagram"
                      target="_blank"
                    />
                    <UButton
                      v-if="actor.socials.twitter"
                      icon="i-simple-icons-twitter"
                      variant="ghost"
                      color="white"
                      size="md"
                      :to="actor.socials.twitter"
                      target="_blank"
                    />
                    <UButton
                      v-if="actor.socials.imdb"
                      icon="i-simple-icons-imdb"
                      variant="ghost"
                      color="white"
                      size="md"
                      :to="actor.socials.imdb"
                      target="_blank"
                    />
                    <UButton
                      v-if="actor.socials.web"
                      icon="i-lucide-globe"
                      variant="ghost"
                      color="white"
                      size="md"
                      :to="actor.socials.web"
                      target="_blank"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              class="landscape:hidden lg:landscape:flex gap-1 transition-opacity duration-300 mt-2"
            >
              <UButton
                v-if="actor.socials.instagram"
                icon="i-simple-icons-instagram"
                variant="ghost"
                color="white"
                size="xl"
                :to="actor.socials.instagram"
                target="_blank"
                class="hover:text-primary"
              />
              <UButton
                v-if="actor.socials.twitter"
                icon="i-simple-icons-twitter"
                variant="ghost"
                color="white"
                size="xl"
                :to="actor.socials.twitter"
                target="_blank"
              />
              <UButton
                v-if="actor.socials.imdb"
                icon="i-simple-icons-imdb"
                variant="ghost"
                color="white"
                size="xl"
                :to="actor.socials.imdb"
                target="_blank"
                class="hover:text-primary"
              />
              <UButton
                v-if="actor.socials.web"
                icon="i-lucide-globe"
                variant="ghost"
                color="white"
                size="xl"
                :to="actor.socials.web"
                target="_blank"
                class="hover:text-primary"
              />
            </div>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style scoped>
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
