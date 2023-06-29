<template>
  <main class="w-screen min-h-screen">
    <AppNavBar />
    <div class="w-full p-4 bg-light-orange">
      <button
        class="flex items-center gap-2 p-2 underline hover:no-underline"
        @click="
          () => {
            $router.back();
          }
        "
      >
        <Icon name="mdi:chevron-left" /> Back
      </button>
    </div>
    <div class="bg-light-orange">
      <slot />
    </div>
    <AppFooter />
  </main>
</template>
