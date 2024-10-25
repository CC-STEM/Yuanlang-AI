<template>
  <div class="contain">
    <!-- <AppHeader /> -->
    <slot />
    <!-- <AppFooter /> -->
  </div>
</template>
<script setup lang="ts">
import Bg from '~/assets/bg.png'
</script>
<style lang="scss" scoped>
.contain {
  background-image: url(~/assets/bg.png);
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>