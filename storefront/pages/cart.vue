<template>
  <div class="cart-page w-full bg-primary-blue text-off-white p-8">
    <h2 class="text-2xl my-4">My Cart:</h2>
    <h3 class="text-xl border-b-2 border-vivid-amber">Shipping to Home:</h3>
    <ul class="p-4">
      <li v-for="item in cartItems">
        <div
          v-if="item.metadata?.pickup === false"
          class="flex gap-4 items-center"
        >
          <button
            class="flex items-center gap-1 p-2 border rounded border-off-white"
            @click="removeItem(item)"
          >
            <Icon name="mdi:delete-outline" /> Remove
          </button>
          <img :src="item.thumbnail" :alt="item.title" width="96" />
          <p class="text-2xl">{{ item.title }}</p>
          <p class="border rounded border-off-white p-2">
            {{ item.variant.title }}
          </p>
          <p>Qty: {{ Number(item.total) / Number(item.unit_price) }}</p>
          <p class="text-vivid-amber text-xl">
            ${{ Number(item.total) / 100 }}
          </p>
        </div>
      </li>
    </ul>
    <h3 class="text-xl border-b-2 border-vivid-amber">Picking up in store:</h3>
    <ul class="p-4">
      <li v-for="item in main.cart.items">
        <div
          v-if="item.metadata?.pickup === true"
          class="flex gap-4 items-center"
        >
          <button
            class="flex items-center gap-1 p-2 border rounded border-off-white"
            @click="removeItem(item)"
          >
            <Icon name="mdi:delete-outline" /> Remove
          </button>
          <img :src="item.thumbnail" :alt="item.title" width="96" />
          <p class="text-2xl">{{ item.title }}</p>
          <p class="border rounded border-off-white p-2">
            {{ item.variant.title }}
          </p>
          <p>Qty: {{ Number(item.total) / Number(item.unit_price) }}</p>
          <p class="text-vivid-amber text-xl">
            ${{ Number(item.total) / 100 }}
          </p>
        </div>
      </li>
    </ul>
    <div class="flex gap-8 items-center border-t-2 border-light-amber p-8">
      <h3 class="text-xl">
        Subtotal:
        <strong class="text-vivid-amber mx-8"
          >${{ Number(main.cart.subtotal) / 100 }}</strong
        >
      </h3>
      <NuxtLink
        to="/checkout"
        class="p-2 border rounded border-off-white hover:bg-off-white hover:text-primary-blue hover:border-primary-blue"
        >Proceed to Checkout</NuxtLink
      >
    </div>

    <!-- <h2>Available Shipping Options:</h2>
    <ul>
      <li v-for="option in shippingOptions" class="flex gap-4">
        <caption>
          {{
            option.is_return ? 'Shipping' : 'Return'
          }}
        </caption>
        <p>{{ option.name }}</p>
        <p>{{ Number(option.amount) / 100 }}</p>
      </li>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
import { sdk } from '../../sdk/packages/sdk.config';
import { useMainStore } from '~/store/main';
const main = useMainStore();

interface ShippingOption {
  id: string;
  amount: number;
  name: string;
  is_return: boolean;
}

const cartItems = ref([]);
const shippingOptions: Ref<ShippingOption[] | undefined> = ref([]);

const fetchShippingOptions = async () => {
  const { data } = await sdk.medusa.getShippingMethods('');

  shippingOptions.value = data.shipping_options;
};

const removeItem = async (item: any) => {
  const id = main.cart.id;
  const line_id = item.id;
  const { data } = await sdk.medusa.removeLineItem({ id, line_id });
  main.setCart(data.cart);
};

const calculateCartTaxes = async () => {
  const { data } = await sdk.medusa.calculateCartTaxes({ id: main.cart.id });
  console.log('taxes', data);
};

onMounted(async () => {
  // fetchShippingOptions();
  await calculateCartTaxes();
});

watchEffect(() => {
  cartItems.value = main.cart.items;
});
</script>
