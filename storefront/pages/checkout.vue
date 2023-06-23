<template>
  <div class="checkout-page w-full p-8 flex flex-col gap-4">
    <div v-for="option in availableShippingOptions" class="flex gap-4">
      <p>{{ option.name }}</p>
      <p>${{ Number(option.price_incl_tax) / 100 }}</p>
      <button @click="selectOption(option)">Select this option</button>
    </div>
    <button
      v-if="main.customer.shipping_addresses"
      @click="updateShippingAddress"
    >
      Use my shipping address
    </button>
    <button @click="selectPaymentSession">Select Payment Session</button>
    <div>
      <p>Subtotal: {{ Number(main.cart.subtotal) / 100 }}</p>
      <p>Shipping: {{ Number(main.cart.shipping_total) / 100 }}</p>
      <p>Total: {{ Number(main.cart.total) / 100 }}</p>
    </div>
    <button @click="completeCart">COMPLETE ORDER</button>
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

const selectOption = async (option: any) => {
  selectedShippingOption.value = option;
  await addShippingMethod();
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

const completeCart = async () => {
  const { data } = await sdk.medusa.completeCart({ id: main.cart.id });
  console.log(data);
};

onMounted(async () => {
  await createPaymentSessions();
  await listCartShippingOptions();
});
</script>
