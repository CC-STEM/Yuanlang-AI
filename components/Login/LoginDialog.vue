<template>
  <BaseDialog ref="loginRef" :title="'登录第一时间掌握最新动态'" :width="797" :height="441">
    <div class="h-[295px] w-full flex">
      <div class="w-[50%] flex flex-col items-center border-r-[1px] border-r-[#F3F3F3]">
        <span class="first-letter">登录小程序</span>
        <img src="~/assets/code.png" class="w-[153px] h-[153px] mt-[25px]" />
        <span class="second-letter">请使用微信扫一扫登录CC小程序</span>
        <div class="w-[334px] h-[19px] rounded-[10px] third-letter">
        </div>
      </div>
      <div class="w-[50%] flex flex-col items-center"></div>
    </div>
  </BaseDialog>
</template>

<script lang="ts" setup>
const loginRef = ref()

defineExpose({
  loginRef
})
</script>

<style>
.first-letter {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  margin-top: 61px;
}

.second-letter {
  font-family: Microsoft YaHei;
  font-weight: 300;
  font-size: 16px;
  color: #000000;
  margin-top: 38px;
}

.third-letter {
  font-family: Microsoft YaHei;
  font-weight: 300;
  font-size: 12px;
  color: #333333;
  background: linear-gradient(88deg, #AEF7FF, #FFFFFF);
  margin-top: 12px;
}
</style>