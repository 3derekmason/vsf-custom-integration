<template>
  <div class="checkout-page w-full p-8">
    <div v-for="option in availableShippingOptions">
      <p>{{ option.name }}</p>
      <p>${{ Number(option.price_incl_tax) / 100 }}</p>
      <button @click="selectOption(option)">Select this option</button>
    </div>
    <p>Selected: {{ selectedShippingOption.id || '' }}</p>
    <button @click="addShippingMethod" v-if="selectedShippingOption.id">
      Confirm
    </button>
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
  console.log('payment sessions', data);
};

const selectOption = (option: any) => {
  selectedShippingOption.value = option;
  console.log(selectedShippingOption.value);
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
  console.log(data);
};

onMounted(async () => {
  // fetchShippingOptions();
  await createPaymentSessions();
  await listCartShippingOptions();
});
</script>
