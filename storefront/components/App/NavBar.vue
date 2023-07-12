<template>
  <div class="navbar w-screen h-28">
    <div
      class="navbar-nav w-full h-8 bg-primary-blue text-white flex justify-between items-center px-4 text-sm"
    >
      <span class="flex gap-8">
        <p><Icon name="mdi:map-marker-outline" />{{ ' ' }}Location</p>
        <p><Icon name="mdi:storefront-outline" />{{ ' ' }}Current Store</p>
      </span>
      <nav class="flex gap-8">
        <NuxtLink href="#"> Family Rewards </NuxtLink>
        <NuxtLink href="#"> On Sale </NuxtLink>
        <NuxtLink href="#"> Grooming </NuxtLink>
        <NuxtLink href="#"> Locations </NuxtLink>
      </nav>
    </div>
    <div class="navbar-hero w-full h-20 flex justify-around items-center">
      <div class="logo">
        <NuxtLink to="/">
          <h1 class="text-3xl">Wilco</h1>
        </NuxtLink>
      </div>
      <div class="departments h-2/3 flex items-center">
        <SfButton
          class="h-full border-2 border-primary-blue rounded-full"
          type="button"
          variant="secondary"
          >Departments <Icon class="w-6 h-6" name="mdi:chevron-down"
        /></SfButton>
      </div>
      <div
        class="search flex justify-between items-center gap-1 w-1/3 h-2/3 rounded-full bg-light-orange p-1 border-2 border-dull-orange"
      >
        <input
          class="bg-transparent min-w-4/5 ml-4 focus:outline-0"
          aria-label="Search your Farmstore"
          placeholder="Search your Farmstore"
        />
        <button
          class="text-black bg-dull-orange rounded-full w-11 h-11 flex justify-center items-center"
          type="button"
        >
          <Icon name="mdi:magnify" />
        </button>
      </div>
      <div class="auth text-lg">
        <NuxtLink to="/auth">
          <Icon class="w-6 h-6" name="mdi:account-outline" />
          {{ main.customer.first_name || 'Login/Register' }}
        </NuxtLink>
      </div>
      <div class="cart text-lg">
        <NuxtLink href="/cart">
          <Icon class="w-6 h-6" name="mdi:cart-outline" /> Cart ({{
            totalItems
          }})
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';
import { useMainStore } from '~/store/main';
const main = useMainStore();
const totalItems = ref(0);

watchEffect(() => {
  // Add the total items from both cart and display as `totalItems`
  totalItems.value = main.cart.items?.length || 0;
});
</script>
