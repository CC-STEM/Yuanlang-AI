import { AppFooter } from './.nuxt/components';
<template>
  <div class="contain">
    <AppHeader />
    <div class="h-[calc(100vh-169px)] w-full flex">
      <div class="w-[157px] h-full">
        <AppSidebar />
      </div>
      <div class="w-[calc(100%-157px)] h-full ">
        <NuxtPage />
      </div>
    </div>
    <AppFooter />
  </div>
  <LoginDialog :visible="authStore.loginDialog" ref="loginDialogRef" />
</template>
<script setup lang="ts">
const loginDialogRef = ref()
const authStore = useAuthStore()

onBeforeMount(() => {
  authStore.initializeToken()
})
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
