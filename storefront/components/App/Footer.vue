<template>
  <div class="footer w-full">
    <div class="footer-nav w-full flex justify-around h-80 p-4 text-dark-blue">
      <div class="orders flex flex-col gap-4 w-1/6">
        <h2 class="text-xl border-b-4 border-vivid-amber font-semibold">
          Orders
        </h2>
        <NuxtLink v-for="item in ordersLinks" :href="item.href">{{
          item.name
        }}</NuxtLink>
      </div>
      <div class="services flex flex-col gap-4 w-1/6">
        <h2 class="text-xl border-b-4 border-vivid-amber font-semibold">
          Services
        </h2>
        <NuxtLink v-for="item in servicesLinks" :href="item.href">{{
          item.name
        }}</NuxtLink>
      </div>
      <div class="about flex flex-col gap-4 w-1/6">
        <h2 class="text-xl border-b-4 border-vivid-amber font-semibold">
          About
        </h2>
        <NuxtLink v-for="item in aboutLinks" :href="item.href">{{
          item.name
        }}</NuxtLink>
      </div>
      <div class="your-store flex flex-col gap-4 w-2/5">
        <h2 class="text-xl font-semibold">
          <strong class="border-b-4 border-vivid-amber">Your</strong> Wilco
          Store
        </h2>
      </div>
    </div>
    <div
      class="footer-help w-full h-52 bg-primary-blue text-off-white p-4 px-16 flex flex-col gap-4"
    >
      <div class="need-help flex flex-col gap-4">
        <h2 class="text-2xl">
          <strong class="border-b-4 border-vivid-amber">Need</strong> Help?
        </h2>
        <span
          class="questions flex items-center gap-4 border-b-2 border-off-white border-dotted text-lg"
        >
          <Icon name="mdi:phone-outline" />
          <p>
            For questions or help with online orders call:
            <strong class="text-light-amber underline">(888) 78-WILCO</strong>
          </p>
        </span>
        <p class="text-sm">
          Limited to stock on hand. Some items may vary from photos. Because of
          store size limitations or geography, some items featured may not be
          available in all stores but will be made available by special order
          during sale periods at advertised prices. All sale prices listed as
          “dollars off” or “% off” are discounted from our regular posted shelf
          price, not from discounts given with specialty, bulk or pallet
          pricing. Reseller and Drop-shippers must contact us for pre-approval
          to place orders with the intent to re-distribute.
        </p>
      </div>
    </div>
    <div
      class="footer-foot w-full h-10 bg-dark-blue text-white flex justify-between px-8"
    >
      <nav class="social flex items-center gap-4">
        <NuxtLink href="#"><Icon name="mdi:facebook" /></NuxtLink>
        <NuxtLink href="#"><Icon name="mdi:instagram" /></NuxtLink>
        <NuxtLink href="#"><Icon name="mdi:twitter" /></NuxtLink>
        <NuxtLink href="#"><Icon name="mdi:linkedin" /></NuxtLink>
        <NuxtLink href="#"><Icon name="mdi:youtube" /></NuxtLink>
      </nav>
      <nav class="flex items-center gap-8">
        <NuxtLink href="'#'" class="text-light-amber underline"
          >Privacy Policy</NuxtLink
        >
        <NuxtLink href="'#'" class="text-light-amber underline"
          >Terms of Service</NuxtLink
        >
        <NuxtLink href="'#'" class="text-light-amber underline"
          >Return Policy</NuxtLink
        >
        <p>&#169; 2023, Wilco Farmstores</p>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
const ordersLinks = [
  { name: 'Shipping Rates', href: '#' },
  { name: 'Easy Returns', href: '#' },
  { name: 'Manage Your Account', href: '#' },
  { name: 'Gift Cards', href: '#' },
];

const servicesLinks = [
  { name: 'Wilco Family Rewards', href: '#' },
  { name: 'FAQs', href: '#' },
  { name: 'Store Feedback', href: '#' },
  { name: 'Specialty Programs', href: '#' },
  { name: 'Credit Terms & Conditions', href: '#' },
];

const aboutLinks = [
  { name: 'Learn About Wilco', href: '#' },
  { name: 'Jobs At Wilco', href: '#' },
  { name: 'FFA Forever', href: '#' },
  { name: 'Events', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Contact', href: '#' },
];
</script>
