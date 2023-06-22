<template>
  <div class="featured-finds w-screen flex items-center justify-around p-4">
    <h2 class="w-1/12 text-4xl border-b-8 border-vivid-amber">
      Featured Finds
    </h2>
    <div
      v-for="product in featuredFinds"
      class="find-tile h-10/12 border border-vivid-amber rounded flex flex-col items-center justify-around bg-off-white p-4 gap-2"
    >
      <img :src="product.thumbnail" class="h-1/2 border-b-2 border-gray" />
      <p class="text-center">{{ product.title }}</p>
      <button class="border-2 border-primary-blue rounded-full p-1 w-11/12">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sdk } from '../../../sdk/playground/app/sdk.config';

interface Product {
  id: string;
  thumbnail: string;
  title: string;
}

const featuredFinds: Ref<Product[] | undefined> = ref([]);

const fetchProducts = async () => {
  const { data } = await sdk.medusa.getProducts('');

  featuredFinds.value = data.products.slice(0, 5);
};

onMounted(() => {
  fetchProducts();
});
</script>

<style>
.featured-finds {
  background: linear-gradient(-115deg, #fff7fb, 90%, #fef3c7);
}

.find-tile {
  width: calc((80vw / 6));
}
</style>
