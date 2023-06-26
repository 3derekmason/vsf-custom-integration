<template>
  <main class="w-screen min-h-screen">
    <AppNavBar />
    <div class="w-full p-4">
      <button
        class="flex items-center gap-2 p-2 hover:underline"
        @click="
          () => {
            $router.back();
          }
        "
      >
        <Icon name="mdi:chevron-left" /> Back
      </button>
    </div>
    <div>
      <slot />
    </div>
    <AppFooter />
  </main>
</template>
