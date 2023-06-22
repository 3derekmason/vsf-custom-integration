<template>
  <div class="hero w-screen h-80">
    <div
      class="mask w-full h-full flex justify-center items-center flex-col gap-8"
    >
      <h1 class="text-5xl font-bold text-gray">
        Make <strong class="border-b-8 border-vivid-amber">Mom's</strong> Day
      </h1>
      <p class="text-xl text-gray">Unforgettable gifts, unbeatable deals.</p>
      <NuxtLink
        href="/products"
        class="bg-primary-blue rounded-full text-lg p-4 text-white"
      >
        Discover the Mother's Day Sale
      </NuxtLink>
    </div>
  </div>
</template>

<style>
.hero {
  background-image: url(https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80);
  background-position: center;
}

.mask {
  background: linear-gradient(90deg, #fffbeb40, 10%, #fffbeb, 90%, #fffbeb40);
}
</style>
