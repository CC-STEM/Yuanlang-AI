<template>
  <div class="flex flex-col mb-[33px]">
    <div class="flex">
      <span class="infoStart mr-[9px]"></span>
      <span class="infoTitle">{{ props.title }}</span>
    </div>
    <div class="w-full text-wrap mt-[16px] ml-[17px]">{{ props.content }}</div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
  content: string;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
.infoStart {
  width: 8px;
  height: 22px;
  background: #0DFFF6;
  border-radius: 4px;
}

.infoTitle {
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 20px;
  color: #0DFFF6;
  line-height: 20px;
}
</style>