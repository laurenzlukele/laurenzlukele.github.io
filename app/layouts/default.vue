<template>
  <div class="relative">
    <NavigationMap />
    <slot />
    <div class="hidden sm:block absolute right-5 bottom-5">
      Created by
      <a
        class="hover:underline font-bold"
        href="https://github.com/kkukelka"
        target="_blank"
        >Kilian Kukelka</a
      >
    </div>
  </div>
</template>
