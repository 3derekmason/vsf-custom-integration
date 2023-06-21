<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { sdk } from '../sdk/playground/app/sdk.config';

const createCart = async () => {
  const { data } = await sdk.medusa.createCart('');
  console.log(data);
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
