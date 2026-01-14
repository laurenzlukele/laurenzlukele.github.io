<script setup lang="ts">
const rooms = [
  { name: "Bedroom", path: "/bedroom" },
  { name: "Kitchen", path: "/kitchen" },
];

const movie = {
  title: "Tethered",
  poster: "/images/poster.jpeg",
  year: "2026",
  length: "1h 14m",
  director: "Laurenz Lukele",
  actors: [
    "新川千華 (Shinkawa Chiharu)",
    "真田 煌生 (Sanada  Kōki)",
    "愛恵 (MANAE)",
  ],
  genres: ["Drama", "Romance", "Mystery"],
  description: [
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
  ],
  imdbUrl: "https://www.imdb.com",
};
</script>

<template>
  <div class="room">
    <div class="background-wrapper">
      <NuxtImg
        src="/images/entrance.jpg"
        alt="Entrance"
        class="room-image"
        preload
      />
    </div>

    <div class="content-container">
      <div class="movie-card">
        <div class="poster-wrapper">
          <NuxtImg
            :src="movie.poster"
            :alt="movie.title"
            class="movie-poster"
            width="300"
            height="450"
          />
        </div>

        <div class="details-wrapper">
          <div class="header">
            <h1 class="movie-title">{{ movie.title }}</h1>
            <div class="meta-row">
              <span class="year">{{ movie.year }}</span>
              <span class="dot">•</span>
              <span class="length">{{ movie.length }}</span>
            </div>
          </div>

          <div class="tags">
            <UBadge
              v-for="genre in movie.genres"
              :key="genre"
              color="gray"
              variant="solid"
              class="mr-2 mb-2"
            >
              {{ genre }}
            </UBadge>
          </div>

          <div class="credits">
            <p>
              <strong>Director:</strong>
              <span class="text-gray-300">{{ movie.director }}</span>
            </p>
            <p>
              <strong>Stars:</strong>
              <span class="text-gray-300">{{ movie.actors.join(", ") }}</span>
            </p>
          </div>

          <div class="synopsis">
            <p
              v-for="(para, index) in movie.description"
              :key="index"
              class="mb-4"
            >
              {{ para }}
            </p>
          </div>

          <div class="actions">
            <UButton
              :to="movie.imdbUrl"
              target="_blank"
              icon="i-heroicons-arrow-top-right-on-square"
              color="yellow"
              variant="solid"
              size="lg"
            >
              View on IMDb
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div class="nav-wrapper">
      <RoomNavigation :rooms="rooms"></RoomNavigation>
    </div>
  </div>
</template>

<style scoped>
.room {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
  color: white;
}

.background-wrapper {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.room-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-container {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  padding-bottom: 6rem;
}

.nav-wrapper {
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 20;
}

.movie-card {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2.5rem;
  max-width: 1000px;
  width: 100%;
  background-color: rgba(20, 20, 20, 0.75); /* Dark semi-transparent */
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.movie-poster {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  aspect-ratio: 2/3;
  object-fit: cover;
  background-color: #333;
}

.movie-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.meta-row {
  display: flex;
  align-items: center;
  color: #9ca3af; /* Gray-400 */
  font-size: 1rem;
  margin-bottom: 1rem;
}

.dot {
  margin: 0 0.5rem;
}

.tags {
  margin-bottom: 1.5rem;
}

.credits {
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  color: #d1d5db; /* Gray-300 */
}

.credits strong {
  color: white;
  margin-right: 0.5rem;
}

.synopsis {
  color: #d1d5db;
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 65ch;
}

@media (max-width: 768px) {
  .movie-card {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    overflow-y: auto;
    max-height: 80vh; /* Allow scrolling inside card on small screens */
  }

  .movie-poster {
    width: 150px;
    margin: 0 auto;
    display: block;
  }

  .poster-wrapper {
    text-align: center;
  }

  .movie-title {
    font-size: 1.75rem;
    text-align: center;
  }

  .meta-row {
    justify-content: center;
  }
}
</style>
