<template>
  <div class="product-details w-full p-2 flex gap-2 px-20">
    <div class="image-container flex gap-2">
      <div class="prod-images flex flex-col gap-1">
        <img
          v-for="image in product?.images"
          :key="image.id"
          width="150"
          height="150"
          :alt="product.title"
          :src="image.url"
          @click="imageToShow = image.id"
          :class="
            imageToShow === image.id
              ? 'shown border-1 border-primary-blue'
              : 'border-1 border-primary-blue'
          "
        />
      </div>

      <div class="shown-image max-w-md overflow-hidden">
        <div v-for="image in product?.images" :key="image.id">
          <div v-if="image.id === imageToShow">
            <img :alt="product.title" :src="image.url" width="400" />
          </div>
        </div>
      </div>
    </div>

    <div class="prod-actions flex flex-col gap-1">
      <h1 class="text-2xl">
        {{ product?.title }}
      </h1>
      <p v-if="product?.variants">
        {{ product.variants[0].prices[0].amount / 100 }}
        {{ product.variants[0].prices[0].currency_code.toUpperCase() }}
      </p>
      <p>
        {{ product?.description }}
      </p>
      <div v-for="option in options" :key="option.id">
        <div>
          <p>{{ option.title }}:</p>
          <div class="option-picker mt-1 flex gap-1">
            <button
              :disabled="selected === value.value"
              v-for="value in option.values"
              :key="value.id"
              @click="setVariant(value.value)"
              class="w-10 h-10 rounded text-off-white bg-primary-blue"
            >
              {{ value.value }}
            </button>
          </div>
        </div>
      </div>
      <div class="cart-actions flex flex-col gap-1">
        <p>Quantity:</p>
        <span
          class="w-24 p-1 flex gap-1 items-center justify-between rounded text-off-white bg-primary-blue text-xl"
        >
          <button
            class="h-full flex items-center bg-transparent text-off-white text-lg"
            @click="
              if (quantity > 0) {
                quantity = quantity - 1;
              }
            "
          >
            –
          </button>
          <caption>
            {{
              JSON.stringify(quantity)
            }}
          </caption>
          <button @click="quantity = quantity + 1">+</button>
        </span>
        <span class="fulfillment flex gap-1 my-2">
          <button
            class="h-24 w-32 flex flex-col items-center justify-center text-primary-blue bg-off-white border-4 rounded border-dark-blue disabled:border-vivid-amber"
            :disabled="pickup"
            @click="pickup = true"
          >
            Store Pickup
            <Icon name="mdi:check-bold" v-if="pickup" />
          </button>
          <button
            class="h-24 w-32 flex flex-col items-center justify-center text-primary-blue bg-off-white border-4 rounded border-dark-blue disabled:border-vivid-amber"
            :disabled="!pickup"
            @click="pickup = false"
          >
            Ship to Home
            <Icon name="mdi:check-bold" v-if="!pickup" />
          </button>
        </span>
        <div class="my-store flex gap-2">
          <h4>Pickup at <strong class="underline">Denver</strong></h4>
          <button class="underline text-primary-blue">
            Check other stores
          </button>
        </div>
        <button
          class="toCart rounded bg-transparent text-dark-blue h-10 w-48 border-2 border-primary-blue hover:bg-primary-blue hover:text-off-white"
          @click="addToCart"
        >
          Add to cart
        </button>
      </div>
      <div class="details mt-1 p-1 border-y border-primary-blue">
        <div>
          <h3>
            <button
              class="w-full flex justify-between bg-transparent"
              type="button"
              @click="showDetails = !showDetails"
            >
              <span>Details</span>
              <span>
                <span>—</span>
              </span>
            </button>
          </h3>
          <div v-if="showDetails">
            <div>
              <ul class="m-2 list-none">
                <li>
                  Weight:
                  {{ product.weight ? `${product.weight} g` : '--' }}
                </li>
                <li>
                  Width:
                  {{ product.width ? `${product.width} cm` : '--' }}
                </li>
                <li>
                  Height:
                  {{ product.height ? `${product.height} cm` : '--' }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sdk } from '../../../sdk/packages/sdk.config';
import { useMainStore } from '~/store/main';
const main = useMainStore();
const route = useRoute();
const productId = route.params.id.toString();

const product = ref();
const options = ref();

let showDetails = ref(false);
let imageToShow = ref();
let quantity = ref(1);
let selected = ref();
let variantId = ref('');
let pickup = ref(true);

const getProduct = async () => {
  const { data } = await sdk.medusa.getProduct({ id: productId });
  product.value = data.product;
  imageToShow.value = data.product.images[0].id;
  options.value = data.product.options;
};

const setVariant = (value: string) => {
  selected.value = value;
  product.value.variants.forEach((variant: any) => {
    if (variant.title === value) {
      variantId = variant.id;
    }
  });
};

const addToCart = async () => {
  if (variantId.value === '') {
    alert('Please choose a size/variant');
    return new Error('No Variant Id');
  }
  const body = {
    pickup: pickup.value,
    quantity: quantity.value,
    id: main.cart.id,
    variant_id: variantId,
  };
  const { data } = await sdk.medusa.addCartLineItem(body);
  main.setCart(data.cart);
  selected.value = false;
  quantity.value = 1;
};

onMounted(() => {
  getProduct();
});
</script>

<style>
.prod-images img.shown {
  opacity: 0.6;
  border: 1px solid var(--secondary-main);
}

.shown-image img {
  transition: 0.2s ease-in-out;
}

.shown-image:hover img {
  scale: 1.5;
  transition: 0.2s ease-in-out;
}

.option-picker button:disabled {
  opacity: 0.8;
}
</style>
