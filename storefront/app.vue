<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { sdk } from '../sdk/packages/sdk.config';
import { useMainStore } from './store/main';

const main = useMainStore();

const createCarts = async () => {
  const cart1 = await sdk.medusa.createCart('');
  const cart2 = await sdk.medusa.createCart('');
  main.setDeliveryCart(cart1.data.cart);
  main.setPickupCart(cart2.data.cart);
};

onMounted(() => {
  createCarts();
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
