<template>
  <div
    class="featured-categories w-screen h-96 bg-light-amber flex items-center justify-around p-4"
  >
    <h2 class="w-1/6 text-4xl border-b-8 border-vivid-amber">
      Featured Categories
    </h2>
    <div
      v-for="category in featuredCategories"
      class="category w-1/6 flex items-center justify-center flex-col gap-4"
    >
      <span
        class="h-48 w-48 rounded-full border-8 border-white shadow-sm shadow-gray overflow-hidden flex justify-center items-center"
      >
        <img class="object-cover h-48" :src="category.img" :alt="category.name"
      /></span>
      <p>{{ category.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const featuredCategories = [
  {
    name: 'Dog Food',
    img: 'https://images.unsplash.com/photo-1632236568054-12f36ecee2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: 'Home & Outdoor',
    img: 'https://images.unsplash.com/photo-1656646549569-e3ad3ff8f9f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
  },
  {
    name: 'Stock Tanks & Watering',
    img: 'https://plus.unsplash.com/premium_photo-1661900456508-8fb0acce71b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    name: "Men's Jeans & Pants",
    img: 'https://plus.unsplash.com/premium_photo-1661962852327-8153ac8967a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];
</script>
