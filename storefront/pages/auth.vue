<template>
  <div
    class="auth-page w-full p-8 flex flex-col gap-4 items-center justify-center"
    v-if="!isProfile"
  >
    <AuthLogin v-if="isLogin" />
    <AuthRegister v-else />
    <button @click="isLogin = !isLogin" class="underline">
      {{
        isLogin
          ? "Don't have an account? Register here"
          : 'Have an account? Log in here'
      }}
    </button>
  </div>
  <div v-else>
    <AuthProfile />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '~/store/main';
const main = useMainStore();

const isLogin = ref(true);
const isProfile = ref(false);

watchEffect(() => {
  if (main.customer.email) {
    isProfile.value = true;
  }
});
</script>
