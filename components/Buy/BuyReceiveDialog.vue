<template>
  <BaseDialog ref="receiveRef" :title="'收货信息'" :width="462" :height="410">
    <div class="h-[358px] w-full flex flex-col">
      <div class="w-full justify-between flex mt-[30px]"><span class="buy-num">购买数量</span> <el-input-number
          v-model="num" :min="1" :max="10" @change="handleChange" /></div>
      <div class="w-full justify-between flex mt-[29px]">
        <div class="flex flex-col w-[194px]">
          <span class="receiver-label">收件人</span>
          <el-input class="receiver-input mt-[12px]" placeholder="请输入收件人姓名"></el-input>
        </div>
        <div class="flex flex-col w-[194px]">
          <span class="phone-label">手机号</span>
          <el-input class="phone-input mt-[12px]" placeholder="请输入收件人手机号"></el-input>
        </div>
      </div>
      <div class="w-full flex flex-col mt-[13px]">
        <span class="region-label">省市区</span>
        <el-input class="region-input mt-[10px]" placeholder="请选择行政区域"></el-input>
      </div>
      <div class="w-full flex flex-col mt-[13px]">
        <span class="region-label">详细地址</span>
        <el-input class="address-input mt-[12px]" type="textarea" placeholder="请输入详细地址" />
      </div>
    </div>
  </BaseDialog>
</template>

<script lang="ts" setup>
const receiveRef = ref()
const num = ref(1)
const handleChange = (value: any) => {
  console.log(value)
}
defineExpose({
  receiveRef
})
</script>

<style lang="scss" scoped>
.receiver-input,
.phone-input {
  width: 194px;
  height: 33px;
  background: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #EBEBEB;
  opacity: 0.63;
}

.region-input {
  width: 100%;
  height: 33px;
  background: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #EBEBEB;
  opacity: 0.63;
}

.address-input {
  width: 100%;
  height: 88px;
  background: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #EBEBEB;
  opacity: 0.63;
}

.receiver-label,
.phone-label,
.region-label {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #151414;
  line-height: 12px;
}

.buy-num {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #151414;
}

:deep(.address-input .el-textarea__inner) {
  height: 88px;
}

:deep(.el-input-number__decrease) {
  width: 32px;
  height: 32px;
  background: #EDF2FF;
  border-radius: 10px;
}

:deep(.el-input-number__increase) {
  width: 32px;
  height: 32px;
  background: #EDF2FF;
  border-radius: 10px;
}
</style>