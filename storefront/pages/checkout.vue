<template>
  <div class="checkout-page w-full p-8 flex flex-col gap-4">
    <div
      v-for="option in availableShippingOptions.slice(0, 2)"
      class="flex gap-4"
    >
      <p>{{ option.name }}</p>
      <p>${{ Number(option.price_incl_tax) / 100 }}</p>
      <button @click="selectOption(option)">Select this option</button>
    </div>
    <button @click="selectPaymentSession">Select Payment Session</button>
    <div>
      <p>
        Subtotal:
        {{
          (Number(main.cart_pickup.subtotal) +
            Number(main.cart_delivery.subtotal)) /
          100
        }}
      </p>
      <p>
        Shipping:
        {{
          (Number(main.cart_pickup.shipping_total) +
            Number(main.cart_delivery.shipping_total)) /
          100
        }}
      </p>
      <p>
        Total:
        {{
          (Number(main.cart_pickup.total) + Number(main.cart_delivery.total)) /
          100
        }}
      </p>
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
  const pickup = await sdk.medusa.createPaymentSessions({
    id: main.cart_pickup.id,
  });
  const delivery = await sdk.medusa.createPaymentSessions({
    id: main.cart_delivery.id,
  });

  main.setPickupCart(pickup.data.cart);
  main.setDeliveryCart(delivery.data.cart);
};

const selectOption = async (option: any) => {
  selectedShippingOption.value = option;
  await addShippingMethod();
};

const listCartShippingOptions = async () => {
  const { data } = await sdk.medusa.listCartShippingOptions({
    id: main.cart_delivery.id,
  });
  availableShippingOptions.value = data.shipping_options;

  // get in store pickup option
  let pickup_option_id = '';
  data.shipping_options.forEach((option: any) => {
    if (option.amount === 0) {
      pickup_option_id = option.id;
    }
  });
  const pickup = await sdk.medusa.addShippingMethod({
    id: main.cart_pickup.id,
    option_id: pickup_option_id,
  });
  main.setPickupCart(pickup.data.cart);
};

const addShippingMethod = async () => {
  const delivery = await sdk.medusa.addShippingMethod({
    id: main.cart_delivery.id,
    option_id: selectedShippingOption.value.id,
  });

  main.setDeliveryCart(delivery.data.cart);
};

const updateShippingAddress = async () => {
  const body = {
    shipping_address: main.customer.shipping_addresses[0].id,
    billing_address: main.customer.shipping_addresses[0].id,
  };
  const pickup = await sdk.medusa.updateCart({ id: main.cart_pickup.id, body });
  const delivery = await sdk.medusa.updateCart({
    id: main.cart_delivery.id,
    body,
  });

  main.setPickupCart(pickup.data.cart);
  main.setDeliveryCart(delivery.data.cart);
};

const selectPaymentSession = async () => {
  const pickup_provider_id = main.cart_pickup.payment_session.provider_id;
  const delivery_provider_id = main.cart_delivery.payment_session.provider_id;

  const pickup = await sdk.medusa.selectPaymentSession({
    id: main.cart_pickup.id,
    provider_id: pickup_provider_id,
  });
  const delivery = await sdk.medusa.selectPaymentSession({
    id: main.cart_delivery.id,
    provider_id: delivery_provider_id,
  });

  main.setPickupCart(pickup.data.cart);
  main.setDeliveryCart(delivery.data.cart);
};

const completeCart = async () => {
  const pickup = await sdk.medusa.completeCart({ id: main.cart_pickup.id });
  const delivery = await sdk.medusa.completeCart({ id: main.cart_delivery.id });
  console.log('pickup', pickup);
  console.log('delivery', delivery);
};

onMounted(async () => {
  await createPaymentSessions();
  await listCartShippingOptions();
  if (main.customer.shipping_addresses) {
    updateShippingAddress();
  }
});
</script>
