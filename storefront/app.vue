<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { sdk } from '../sdk/packages/sdk.config';
import { useMainStore } from './store/main';

const main = useMainStore();

// When the app loads we create two carts, one for items that will be picked up in store, and one for items to be shipped

const createCart = async () => {
  const { data } = await sdk.medusa.createCart('');
  main.setCart(data.cart);
};

onMounted(() => {
  createCart();
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

body,
main {
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
}
</style>
