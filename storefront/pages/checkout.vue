<template>
  <div class="checkout-page w-full p-8 flex flex-col gap-4">
    <h1 class="text-2xl">Review Order:</h1>
    <div class="flex w-full gap-8 justify-center">
      <div
        class="flex flex-col p-4 g-4 border rounded border-vivid-amber w-2/5"
      >
        <h2>Shipping to <strong>Home</strong>:</h2>
        <ul>
          <li v-for="item in main.cart_delivery.items" class="flex gap-4">
            <p>
              {{ Math.ceil(Number(item.total) / Number(item.unit_price)) }}x
            </p>
            <p>{{ item.title }}</p>
            <p>${{ Number(item.total) / 100 }}</p>
          </li>
        </ul>
        <div
          class="border-t-2 border-dull-orange w-full p-4 flex flex-col gap-2"
        >
          <p><em>Choose a shipping option:</em></p>
          <div
            v-for="option in availableShippingOptions.slice(0, 2)"
            class="flex gap-4 w-full justify-between items-center"
          >
            <p>{{ option.name }}</p>
            <p>${{ Number(option.price_incl_tax) / 100 }}</p>
            <button
              @click="selectOption(option)"
              class="p-2 border rounded border-primary-blue bg-primary-blue text-off-white w-40"
              v-if="selectedShippingOption.id === option.id"
            >
              <Icon name="mdi:check-bold" />
            </button>
            <button
              @click="selectOption(option)"
              class="p-2 border rounded border-primary-blue w-40"
              v-else
            >
              <p>Select this Option</p>
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col p-4 g-4 border rounded border-vivid-amber w-2/5"
      >
        <h2>Pickup in <strong>Denver</strong>:</h2>
        <ul>
          <li v-for="item in main.cart_pickup.items" class="flex gap-4">
            <p>
              {{ Math.ceil(Number(item.total) / Number(item.unit_price)) }}x
            </p>
            <p>{{ item.title }}</p>
            <p>${{ Number(item.total) / 100 }}</p>
          </li>
        </ul>
        <div class="border-t-2 border-dull-orange w-full p-8">
          <p><em>No shipping for in-store pickup.</em></p>
        </div>
      </div>
    </div>
    <div class="p-4 border-t-2 border-b-2 border-vivid-amber w-full">
      <p>
        Subtotal:
        {{
          (Number(main.cart_pickup.subtotal) +
            Number(main.cart_delivery.subtotal)) /
          100
        }}
      </p>
      <p>
        Discounts:
        {{
          (Number(main.cart_pickup.discount_total) +
            Number(main.cart_delivery.discount_total)) /
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
      <div class="w-full flex justify-between items-center pr-12 mt-2">
        <p class="p-2 border-t-2 border-primary-blue text-xl">
          Total:
          {{
            (Number(main.cart_pickup.total) +
              Number(main.cart_delivery.total)) /
            100
          }}
        </p>
        <button
          @click="completeCart"
          class="p-2 border border-primary-blue bg-primary-blue text-off-white hover:text-vivid-amber"
        >
          COMPLETE ORDER
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sdk } from '../../sdk/packages/sdk.config';
import { useMainStore } from '~/store/main';
const main = useMainStore();

const availableShippingOptions = ref([]);
const selectedShippingOption = ref('');

const addShippingMethod = async () => {
  const delivery = await sdk.medusa.addShippingMethod({
    id: main.cart_delivery.id,
    option_id: selectedShippingOption.value.id,
  });

  main.setDeliveryCart(delivery.data.cart);
};

const completeCart = async () => {
  const pickup = await sdk.medusa.completeCart({ id: main.cart_pickup.id });
  const delivery = await sdk.medusa.completeCart({ id: main.cart_delivery.id });
  console.log('pickup', pickup);
  console.log('delivery', delivery);
};

const createPaymentSessions = async () => {
  const pickup = await sdk.medusa.createPaymentSessions({
    id: main.cart_pickup.id,
  });
  const delivery = await sdk.medusa.createPaymentSessions({
    id: main.cart_delivery.id,
  });

  main.setPickupCart(pickup.data.cart);
  main.setDeliveryCart(delivery.data.cart);

  selectPaymentSession();
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

const selectOption = async (option: any) => {
  selectedShippingOption.value = option;
  await addShippingMethod();
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

const addDiscounts = async () => {
  console.log(main.discounts);
  const body = {
    discounts: main.discounts,
  };
  const pickup = await sdk.medusa.updateCart({ id: main.cart_pickup.id, body });
  const delivery = await sdk.medusa.updateCart({
    id: main.cart_pickup.id,
    body,
  });

  main.setPickupCart(pickup.data.cart);
  main.setDeliveryCart(delivery.data.cart);
};

onMounted(async () => {
  await createPaymentSessions();
  await listCartShippingOptions();
  if (main.customer.shipping_addresses) {
    updateShippingAddress();
  }
  addDiscounts();
});
</script>
