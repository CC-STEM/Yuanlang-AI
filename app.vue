import { AppFooter } from './.nuxt/components';
<template>
  <div>
    <div class="contain">
      <div class="w-full flex items-center h-[96px] pr-[47px]">
        <AppHeader />

        <div class="flex-1 flex justify-end items-center gap-6">
          <TopNavBar />
          <UserAvatar />
        </div>
      </div>

      <div class="h-[calc(100vh-217px)] w-full flex">
        <div class="w-[157px] h-full pt-6">
          <AppSidebar />
        </div>
        <div class="w-[calc(100%-157px)] h-full">
          <NuxtPage />
        </div>
      </div>
      <AppFooter />
    </div>
    <LoginDialog :visible="authStore.loginDialog" ref="loginDialogRef" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/composables/auth";

const loginDialogRef = ref();
const authStore = useAuthStore();

onBeforeMount(() => {
  authStore.initializeToken();
  if (authStore.token) {
    authStore.getUserInfo();
  }
});
</script>
<style lang="scss" scoped>
.contain {
  background-image: url(~/assets/bg.png);
  background-size: cover;
  width: 100%;
  height: 100%;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  // filter: blur(1rem);
}
</style>
