<template>
  <div class="products-page w-full p-2">
    <h1>All Products</h1>
    <div
      class="product-container w-full flex flex-wrap gap-2 p-2 border-2 border-primary-blue"
    >
      <ProductTile
        v-for="product in products"
        :key="product.id"
        :item="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { sdk } from '../../../sdk/packages/sdk.config';

interface Product {
  id: string;
  thumbnail: string;
  title: string;
}

const products: Ref<Product[] | undefined> = ref([]);

const fetchProducts = async () => {
  const { data } = await sdk.medusa.getProducts('');

  products.value = data.products;
};

onMounted(() => {
  fetchProducts();
});
</script>
