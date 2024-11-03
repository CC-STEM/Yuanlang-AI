<template>
  <BaseDialog ref="payRef" :title="'支付'" :width="395" :height="441">
    <div class="h-[391px] w-full flex flex-col items-center">
      <div class="mt-[38px] w-[89px]"><span class="text-[18px]">¥</span><span class="cnyNum">188</span></div>
      <img class="w-[153px] h-[153px] mt-[33px]" src="~/assets/code.png" alt="">
      <div class="mt-[37px] h-[21px] w-[207px] flex items-center"><img src="~/assets/pay.png" class="mr-[11px]"
          alt=""><span class="pay-text">请通过支付宝扫一扫支付</span>
      </div>
    </div>
  </BaseDialog>
</template>

<script lang="ts" setup>
const payRef = ref()

defineExpose({
  payRef
})
</script>

<style scoped lang="scss">
.cnyNum {
  font-family: Microsoft YaHei;
  font-weight: bold;

  font-size: 48px;
  color: #FF3B0D;
  height: 34px;
  line-height: 34px;
}

.pay-text {
  font-family: Microsoft YaHei;
  font-weight: 300;
  font-size: 15px;
  color: #000000;
}
</style>