<template>
  <div class="checkout-page w-full p-8 flex flex-col gap-4">
    <div v-if="!main.cart.email">
      <CheckoutGuestForm />
    </div>
    <div v-else>
      <h1 class="text-2xl">Review Order:</h1>
      <div class="flex w-full gap-8 justify-center">
        <div
          class="flex flex-col p-4 g-4 border rounded border-vivid-amber w-2/5"
        >
          <h2>Shipping to <strong>Home</strong>:</h2>
          <ul>
            <li v-for="item in main.cart.items">
              <div class="flex gap-4" v-if="item.metadata.pickup === false">
                <p>
                  {{ Math.ceil(Number(item.total) / Number(item.unit_price)) }}x
                </p>
                <p>{{ item.title }}</p>
                <p>${{ Number(item.total) / 100 }}</p>
              </div>
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
            <li v-for="item in main.cart.items">
              <div class="flex gap-4" v-if="item.metadata.pickup">
                <p>
                  {{ Math.ceil(Number(item.total) / Number(item.unit_price)) }}x
                </p>
                <p>{{ item.title }}</p>
                <p>${{ Number(item.total) / 100 }}</p>
              </div>
            </li>
          </ul>

          <div class="border-t-2 border-dull-orange w-full p-8">
            <p><em>No shipping for in-store pickup.</em></p>
          </div>
        </div>
      </div>
      <div class="p-4 flex items-center gap-4">
        <p>Have a discount code:</p>
        <input type="text" placeholder="Ex. SUMMER23" v-model="code" />
        <button class="p-2 border rounded" @click="addDiscountCode">Add</button>
      </div>
      <div class="p-4 border-t-2 border-b-2 border-vivid-amber w-full">
        <p>
          Subtotal:
          {{ Number(main.cart.subtotal) / 100 }}
        </p>
        <p>
          Discounts:
          {{ Number(main.cart.discount_total) / 100 }}
        </p>
        <p>
          Shipping:
          {{ Number(main.cart.shipping_total) / 100 }}
        </p>
        <div class="w-full flex justify-between items-center pr-12 mt-2">
          <p class="p-2 border-t-2 border-primary-blue text-xl">
            Total:
            {{ Number(main.cart.total) / 100 }}
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
  </div>
</template>

<script setup lang="ts">
import { sdk } from '../../sdk/packages/sdk.config';
import { useMainStore } from '~/store/main';
const main = useMainStore();

const availableShippingOptions = ref([]);
const selectedShippingOption = ref('');

const code = ref('');

const addDiscounts = async () => {
  const body = {
    discounts: main.discounts,
  };
  const { data } = await sdk.medusa.updateCart({
    id: main.cart.id,
    body,
  });

  main.setCart(data.cart);
};

const addDiscountCode = () => {
  const codes: { code: string }[] = main.discounts;
  codes.push({ code: code.value });
  main.setDiscounts(codes);
  addDiscounts();
};

const addShippingMethod = async () => {
  const { data } = await sdk.medusa.addShippingMethod({
    id: main.cart.id,
    option_id: selectedShippingOption.value.id,
  });

  main.setCart(data.cart);
};

// complete both carts, returns each order, each cart will have it's own order (one for pickup fulfillment, one to be shipped)
const completeCart = async () => {
  const { data } = await sdk.medusa.completeCart({ id: main.cart.id });
  console.log('order placed', data);
};

const createPaymentSessions = async () => {
  try {
    const { data } = await sdk.medusa.createPaymentSessions({
      id: main.cart.id,
    });
    main.setCart(data.cart);
  } catch (err) {
    console.error(err);
  }

  selectPaymentSession();
};

const listCartShippingOptions = async () => {
  const { data } = await sdk.medusa.listCartShippingOptions({
    id: main.cart.id,
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
    id: main.cart.id,
    option_id: pickup_option_id,
  });
  main.setCart(pickup.data.cart);
};

const selectOption = async (option: any) => {
  selectedShippingOption.value = option;
  await addShippingMethod();
};

const selectPaymentSession = async () => {
  const provider_id = main.cart.payment_session.provider_id;

  const { data } = await sdk.medusa.selectPaymentSession({
    id: main.cart.id,
    provider_id: provider_id,
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

//When the checkout page is loaded, we:
// 1. apply available discounts to cart(s)
// 2. create payment sessions for cart(s)
// 3. list available shipping options for delivery cart
// 4. add the customer's shipping address to cart(s)
onMounted(async () => {
  addDiscounts();
  await createPaymentSessions();
  await listCartShippingOptions();
  if (main.customer.shipping_addresses) {
    updateShippingAddress();
  }
});
</script>
