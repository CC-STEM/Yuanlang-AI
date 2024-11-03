<template>
  <BaseDialog ref="loginRef" :title="'登录第一时间掌握最新动态'" :width="797" :height="441">
    <div class="h-[295px] w-full flex mt-[44px]">
      <div class="w-[50%] flex flex-col items-center border-r-[1px] border-r-[#F3F3F3]">
        <span class="first-letter">登录小程序</span>
        <img src="~/assets/code.png" class="w-[153px] h-[153px] mt-[25px]" />
        <span class="second-letter">请使用微信扫一扫登录CC小程序</span>
        <div class="w-[334px] h-[19px] rounded-[10px] third-letter">
        </div>
      </div>
      <div class="w-[50%] flex flex-col items-center">
        <span class="mt-[17px] code">验证码登录</span>
        <el-input class="mt-[20px] input" placeholder="请输入手机号"></el-input>
        <div class="mt-[15px] relative">
          <el-input class="input" placeholder="请输入验证码"></el-input>
          <span class="codeInfo">发送验证码</span>
        </div>
        <el-button class="mt-[46px] login">登录</el-button>
        <div class="flex items-center">
          <el-checkbox v-model="checkedAgree" label="" size="large" />
          <span class="agree">我已阅读并同意服务协议与隐私政策</span>
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<script lang="ts" setup>
const loginRef = ref()

defineExpose({
  loginRef
})

const checkedAgree = ref(false)
</script>

<style>
.first-letter {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  margin-top: 17px;
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

.code {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 16px;
  color: #000000;
}

.input {
  width: 316px;
  height: 45px;
  background: rgba(0, 0, 0, 0);
  border-radius: 10px;
  /* border: 1px solid #DEDEDE; */
}

.el-input__inner {
  font-family: Microsoft YaHei;
  font-weight: 300;
  font-size: 14px;
  color: #9B9B9B;
}

.login {
  width: 316px;
  height: 45px;
  background: #2850FF;
  border-radius: 10px;

  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 16px;
  color: #FFFFFF;
}

.agree {
  font-family: Microsoft YaHei;
  font-weight: 300;
  font-size: 14px;
  color: #000000;
}

.codeInfo {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #1D1D1D;
  line-height: 76px;
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
}
</style>