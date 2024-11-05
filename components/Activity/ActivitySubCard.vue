<template>
  <div class="w-full h-full flex flex-col items-center" :style="props.style">
    <img :src="props.iconUrl" alt="" class="w-[39px] h-[39px] mt-[31px]">
    <div class="title mt-[17px]">{{ props.title }}</div>
    <div class="comment mt-[5px]">{{ props.comment }}</div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  iconUrl: string;
  title: string;
  comment: string;
  style: any
}
const props = defineProps<Props>();

</script>

<style scoped lang="scss">
.title {
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 20px;
  color: #FFFFFF;
  line-height: 20px;
}

.comment {
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 13px;
}
</style>