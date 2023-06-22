<template>
  <div class="profile w-full p-4 flex flex-col gap-8">
    <h1 class="text-2xl">
      Welcome to your store, {{ main.customer.first_name }}
    </h1>
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
            placeholder="Country Code"
            class="border rounded border-primary-blue w-1/4 p-2"
            v-model="country_code"
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
          @click="updateShippingAddress"
        >
          Update
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sdk } from '../../../sdk/playground/app/sdk.config';
import { useMainStore } from '~/store/main';
const main = useMainStore();

const first_name = ref(main.customer.first_name || '');
const last_name = ref(main.customer.last_name || '');
const address_1 = ref('');
const address_2 = ref('');
const city = ref('');
const country_code = ref('US');
const postal_code = ref('');
const province = ref('');

const updateShippingAddress = async (e: any) => {
  e.preventDefault();
  const body = {
    first_name: first_name.value,
    last_name: last_name.value,
    address_1: address_1.value,
    address_2: address_2.value,
    city: city.value,
    country_code: country_code.value,
    postal_code: postal_code.value,
    province: province.value,
  };

  const { data } = await sdk.medusa.updateShippingAddress(body);
  console.log(data);
};
</script>
