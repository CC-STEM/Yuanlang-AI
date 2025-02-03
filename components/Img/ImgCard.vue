<template>
  <div class="relative rounded-lg">
    <img class="w-full h-full rounded-[20px] object-cover" :src="props.url" alt="">
    <ImgUser class="absolute bottom-0" :name="''" :head="''"/>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  url: string
}

const props = defineProps<Props>();
</script>

<style></style>