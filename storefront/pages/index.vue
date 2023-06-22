<template>
  <div class="homePage w-full">
    <HomeHeroSection />
    <HomeFeaturedCategories />
    <HomeFeaturedFinds />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '~/store/main';
const main = useMainStore();

console.log(main.cart);
</script>
