<script setup lang="ts">
type CastMember = {
  name: string;
  role: string; // character name
  occupation: string; // e.g. "Actress", "Stunt Double"
  image: string;
  socials: {
    instagram?: string;
    twitter?: string;
    imdb?: string;
    web?: string;
  };
};

const isCastOpen = ref(false);

const castList = ref<CastMember[]>([
  {
    name: "新川千華 (Shinkawa Chiharu)",
    role: "Role 1",
    occupation:
      "俳優、モーションキャプチャ、国内外の企業CM、クラシックバレ (Actress, motioncapture artist, international business, classical Ballet)",
    image: "/images/cast/shinkawa-chiharu.jpeg",
    socials: {
      web: "https://chiharushinkawa.wixsite.com/minichiiharu",
    },
  },
  {
    name: "真田 煌生 (Sanada  Kōki)",
    role: "Role 2",
    occupation: "書道が得意なアーティストです (Künstler/Kaligraphist)",
    image: "/images/cast/sanada-koki.jpeg",
    socials: {
      instagram: "https://www.instagram.com/ko__oo__ki/",
    },
  },
  {
    name: "愛恵 (MANAE)",
    role: "Role 3",
    occupation: "舞台と映画の二刀流俳優 (theater and film actress)",
    image: "/images/cast/manae.jpeg",
    socials: {
      instagram: "https://www.instagram.com/ma_na_e1/",
      web: "https://lit.link/manae212",
    },
  },
  {
    name: "根本もえり (Nemoto Moeri)",
    role: "Role 4",
    occupation: "俳優,マルチタレント (Actress, Multitalent)",
    image: "/images/cast/nemoto-moeri.jpeg",
    socials: {
      instagram: "https://www.instagram.com/_moeri_n__/",
      web: "https//lit.link/moeri_nemoto",
    },
  },
  {
    name: "中野 響 (Nakano Hibiki)",
    role: "Role 5",
    occupation: "役者,アーティスト (Actress, Artist)",
    image: "/images/cast/nakano-hibiki.jpeg",
    socials: { instagram: "https://www.instagram.com/hibiki_n185/", imdb: "#" },
  },
  {
    name: "お名前 (Yamane Aya)",
    role: "Role 6",
    occupation: "映像、舞台を中心に活動中 (Working in film and theater)",
    image: "/images/cast/yamane-aya.jpeg",
    socials: {
      instagram: "https://www.instagram.com/aya_yamane/",
      web: "https://lit.link/ayayamane",
    },
  },
  {
    name: "遠藤幸介 (Endō Kōsuke)",
    role: "Role 7",
    occupation: "舞台 (Theater actor)",
    image: "/images/cast/endo-kosuke.jpeg",
    socials: { web: "https://a-and-h-promotion.com/artists/Kousuke_Endo/" },
  },
  {
    name: "宮園兼生 (Miyazono Kensei)",
    role: "Role 8",
    occupation: "俳優、(Actor)",
    image: "/images/cast/miyazono-kensei.jpeg",
    socials: { web: "http://gushout.info/archives/author/kensei_miyazono" },
  },
  {
    name: "小嶋そら (Kojima Sora)",
    role: "Role 9",
    occupation:
      "ジャズダンス、役者活動、映画作り。(Jazz dance, actress, film maker)",
    image: "/images/cast/kojima-sora.jpeg",
    socials: { instagram: "https://www.instagram.com/kotori_rr/" },
  },
  {
    name: "藤原 明日人 (Fujihara Asuto)",
    role: "Role 10",
    occupation: "Comedian, screenwriter, content creator, television persona",
    image: "/images/cast/fujihara-asuto.jpeg",
    socials: {
      twitter: "https://x.com/amajioasuri1310?s=21&t=Ph_95DKcR_jGSQ0B4zoJ9w",
    },
  },
]);


const goToTelevision = () => {
  navigateTo("/television");
};

const goToRecordPlayer = () => {
  navigateTo("/recordplayer");
};

const openCastGallery = () => {
  isCastOpen.value = true;
};

const rooms = [
  { name: "Entrance", path: "/" },
  { name: "Kitchen", path: "/kitchen" },
];

// Define point-and-click hotspot
// Coordinates (x, y) are percentages relative to the IMAGE, not the screen
const hotspots = [
  {
    id: 1,
    x: 55,
    y: 20,
    label: "Examine record player",
    action: () => goToRecordPlayer(),
  },
  {
    id: 2,
    x: 42,
    y: 64,
    label: "Examine television",
    action: () => goToTelevision(),
  },
  {
    id: 3,
    x: 84,
    y: 48,
    label: "Meet the cast",
    action: () => openCastGallery(),
  },
];
</script>

<template>
  <div class="viewport">
    <div class="scene-container">
      <NuxtImg src="/images/bedroom.jpg" alt="Bedroom" class="scene-image" />

      <button
        v-for="spot in hotspots"
        :key="spot.id"
        class="hotspot"
        :style="{ left: `${spot.x}%`, top: `${spot.y}%` }"
        :aria-label="spot.label"
        @click="spot.action"
      >
        <span class="hotspot-ring"></span>
        <span class="hotspot-dot"></span>
        <span class="hotspot-label">{{ spot.label }}</span>
      </button>
    </div>

    <RoomNavigation :rooms="rooms"></RoomNavigation>


    <UModal
      v-model:open="isCastOpen"
      :ui="{
        content: 'sm:max-w-7xl bg-transparent shadow-none ring-0',
        container: 'flex items-center justify-center min-h-full',
        overlay: ' backdrop-blur-md',
      }"
    >
      <template #content>
        <div class="w-full py-8">
          <div
            class="flex gap-8 overflow-x-auto px-12 pb-12 pt-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          >
            <div
              v-for="(actor, index) in castList"
              :key="index"
              class="group relative flex-none w-80 snap-center flex flex-col gap-4"
            >
              <div class="text-left space-y-1">
                <h3 class="text-2xl font-bold text-white tracking-tight">
                  {{ actor.name }}
                </h3>
                <p
                  class="text-xs h-8 text-white/50 uppercase tracking-[0.2em] font-medium line-clamp-2"
                >
                  {{ actor.occupation }}
                </p>
              </div>

              <div
                class="relative w-full aspect-3/4 rounded-2xl overflow-hidden bg-gray-900 ring-1 ring-white/10 group-hover:ring-white/30 transition-all duration-500"
              >
                <img
                  :src="actor.image"
                  :alt="actor.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
              </div>

              <div class="flex gap-1 transition-opacity duration-300">
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

            <div class="w-12 flex-none"></div>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style scoped>
/* Scrollbar Hide Utility */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
