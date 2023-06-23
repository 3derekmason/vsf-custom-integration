<template>
  <div class="checkout-page w-full p-8 flex flex-col gap-4">
    <div v-for="option in availableShippingOptions">
      <p>{{ option.name }}</p>
      <p>${{ Number(option.price_incl_tax) / 100 }}</p>
      <button @click="selectOption(option)">Select this option</button>
    </div>
    <p>Selected: {{ selectedShippingOption.id || '' }}</p>
    <button @click="addShippingMethod" v-if="selectedShippingOption.id">
      Confirm
    </button>
    <button
      v-if="main.customer.shipping_addresses"
      @click="updateShippingAddress"
    >
      Use my shipping address
    </button>
    <button @click="selectPaymentSession">Select Payment Session</button>
  </div>
</template>

<script setup lang="ts">
import { sdk } from '../../sdk/packages/sdk.config';
import { useMainStore } from '~/store/main';
const main = useMainStore();

const availableShippingOptions = ref([]);
const selectedShippingOption = ref('');

const createPaymentSessions = async () => {
  const { data } = await sdk.medusa.createPaymentSessions({ id: main.cart.id });
  main.setCart(data.cart);
};

const selectOption = (option: any) => {
  selectedShippingOption.value = option;
};

const listCartShippingOptions = async () => {
  const { data } = await sdk.medusa.listCartShippingOptions({
    id: main.cart.id,
  });
  availableShippingOptions.value = data.shipping_options;
};

const addShippingMethod = async () => {
  const { data } = await sdk.medusa.addShippingMethod({
    id: main.cart.id,
    option_id: selectedShippingOption.value.id,
  });
  main.setCart(data.cart);
};

const updateShippingAddress = async () => {
  const body = {
    shipping_address: main.customer.shipping_addresses[0].id,
    billing_address: main.customer.shipping_addresses[0].id,
  };
  const { data } = await sdk.medusa.updateCart({ id: main.cart.id, body });
  main.setCart(data.cart);
};

const selectPaymentSession = async () => {
  const provider_id = main.cart.payment_session.provider_id;
  const { data } = await sdk.medusa.selectPaymentSession({
    id: main.cart.id,
    provider_id: provider_id,
  });
  main.setCart(data.cart);
};

onMounted(async () => {
  // fetchShippingOptions();
  await createPaymentSessions();
  await listCartShippingOptions();
});
</script>
