import { ImgUser } from '../../.nuxt/components';
<template>
  <div class="relative rounded-lg">
    <img class="w-full h-full rounded-[20px]" :src="props.url" alt="">
    <ImgUser class="absolute bottom-0" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  url: string
}

const props = defineProps<Props>();
</script>

<style></style>