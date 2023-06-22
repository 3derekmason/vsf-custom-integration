<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { sdk } from '../sdk/playground/app/sdk.config';
import { useMainStore } from './store/main';

const main = useMainStore();

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
