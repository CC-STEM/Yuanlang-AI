import { AppFooter } from './.nuxt/components';
<template>
  <div class="contain">
    <AppHeader />
    <div class="h-[calc(100vh-169px)] w-full flex">
      <div class="w-[157px] h-full">
        <AppSidebar />
      </div>
      <div class="w-[calc(100%-157px)] h-full bg-black bg-opacity-[.38]">
        <NuxtPage />
      </div>
    </div>
    <AppFooter />
  </div>
</template>
<style lang="scss" scoped>
.contain {
  background-image: url(~/assets/bg.png);
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
