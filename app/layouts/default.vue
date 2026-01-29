<template>
  <div class="relative">
    <NavigationMap />
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
