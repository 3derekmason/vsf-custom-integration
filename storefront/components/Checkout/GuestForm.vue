<template>
  <div class="guest-form p-4 w-full flex flex-col gap-4">
    <div class="guest">
      <input
        type="text"
        placeholder="Email"
        v-model="email"
        class="p-2 border rounded"
      />
    </div>
    <div class="shipAdd w-1/2">
      <h2>Update your shipping address:</h2>
      <form class="flex flex-col items-center gap-2 w-full">
        <div class="flex justify-between w-full">
          <input
            type="text"
            placeholder="First Name"
            class="border rounded border-primary-blue w-1/2 p-2"
            v-model="first_name"
          />
          <input
            type="text"
            placeholder="Last Name"
            class="border rounded border-primary-blue w-1/2 p-2"
            v-model="last_name"
          />
        </div>
        <input
          type="text"
          placeholder="Address 1"
          class="border rounded border-primary-blue w-full p-2"
          v-model="address_1"
        />
        <input
          type="text"
          placeholder="Address 2"
          class="border rounded border-primary-blue w-full p-2"
          v-model="address_2"
        />
        <div class="flex justify-between w-full">
          <input
            type="text"
            placeholder="City"
            class="border rounded border-primary-blue w-1/4 p-2"
            v-model="city"
          />
          <input
            type="text"
            placeholder="State/Province"
            class="border rounded border-primary-blue w-1/4 p-2"
            v-model="province"
          />
          <input
            type="text"
            placeholder="Postal Code"
            class="border rounded border-primary-blue w-1/4 p-2"
            v-model="postal_code"
          />
        </div>
        <button
          class="border rounded border-primary-blue bg-primary-blue text-off-white w-full p-2"
          @click="addGuest"
        >
          Update
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '~/store/main';
import { sdk } from '../../../sdk/packages/sdk.config';
const main = useMainStore();

const email = ref('');
const first_name = ref('');
const last_name = ref('');
const address_1 = ref('');
const address_2 = ref('');
const city = ref('');
const postal_code = ref('');
const province = ref('');

const addGuest = async (e: any) => {
  e.preventDefault();
  const address = {
    first_name: first_name.value,
    last_name: last_name.value,
    address_1: address_1.value,
    address_2: address_2.value,
    city: city.value,
    country_code: 'us',
    postal_code: postal_code.value,
    province: province.value,
  };

  const body = {
    email: email.value,
    shipping_address: address,
    billing_address: address,
  };
  const pickup = await sdk.medusa.updateCart({ id: main.cart_pickup.id, body });
  main.setPickupCart(pickup.data.cart);
  const delivery = await sdk.medusa.updateCart({
    id: main.cart_delivery.id,
    body,
  });
  main.setDeliveryCart(delivery.data.cart);
};
</script>
