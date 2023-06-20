<template>
  <div class="productList">
    Here are the products:

    <ul>
      <li v-for="product in products">
        <p>{{ product.title }}</p>
        <img :src="product.thumbnail" alt="product image" width="88" />
        <p>{{ product.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: string;
  created_at: string;
  description: string;
  discountable: boolean;
  handle: string;
  status: string;
  thumbnail: string;
  title: string;
}

const products: Ref<Product[] | undefined> = ref([]);

const endpoint = 'http://localhost:8181/medusa/getProducts';

const fetchProducts = async () => {
  await fetch(endpoint, { method: 'post' })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      products.value = data.data.products;
      console.log(products);
    });
};

onMounted(() => {
  fetchProducts();
});
</script>
