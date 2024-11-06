<template>
  <div class="w-full h-[53px] border-solid border-t-[1px] border-t-[#ebebeb1f] flex justify-between items-center">
    <div class="flex flex-col justify-center">
      <div class="assets-item-info">变动原因</div>
      <div class="mt-[7px] assets-item-date">2024-10-8 17:20:20</div>
    </div>
    <div class="assets-item-num">
      {{ props.num }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  num: number;
}
const props: Props = defineProps<Props>();
const numStyle = computed(() => {
  return props.num >= 0 ? '#039749' : '#F73A00'
})
</script>

<style lang="scss" scoped>
.assets-item-num {
  line-height: 13px;
  font-family: DIN;
  font-weight: bold;
  font-size: 18px;
  color: v-bind(numStyle);
}

.assets-item-info {
  line-height: 13px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
}

.assets-item-date {
  line-height: 9px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #FFFFFF;
}
</style>