import { computed } from 'vue';
<template>
  <el-dialog v-model="props.visible" :before-close="customClose" :style="{
    width: px2vw(797), height: px2vw(441), background: 'linear-gradient(-72deg, #B5CFFF, #FFFFFF, #FFFFFF, #C2F9FF)',
    borderRadius: '20px'
  }">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        {{ '登录第一时间掌握最新动态' }}
      </div>
    </template>
    <div class="h-[315px] w-full flex">
      <div class="w-[50%] flex flex-col items-center border-r-[1px] border-r-[#F3F3F3]">
        <span class="first-letter">登录小程序</span>
        <img src="~/assets/code.png" class="w-[153px] h-[153px] mt-[25px]" />
        <span class="second-letter">请使用微信扫一扫登录CC小程序</span>
        <div class="w-[334px] h-[2px] rounded-[10px] third-letter">
        </div>
      </div>
      <div class="w-[50%] flex flex-col items-center">
        <span class="mt-[17px] code">{{ topLoginTitleText }}</span>
        <template v-if="isPhoneLogin">

          <el-input class="mt-[20px] input" placeholder="请输入手机号" v-model="phone"></el-input>
          <div class="mt-[15px] relative">
            <el-input class="input" placeholder="请输入验证码" v-model="code"></el-input>
            <span class="codeInfo" v-if="!showCountDown" @click="handleClickSendCode">发送验证码</span>
            <span class="codeInfo" v-else>{{ initCountDownNum }}</span>
          </div>
        </template>
        <template v-else>

          <el-input class="mt-[20px] input" placeholder="请输入您的用户名" v-model="username"></el-input>
          <el-input class="mt-[20px] input" placeholder="请输入您的密码" v-model="password"></el-input>
        </template>
        <el-button class="mt-[46px] login" @click="handleClickLogin" v-loading="loginLoading">登录</el-button>
        <div class="flex items-center flex-col">
          <div class="flex items-center">
            <el-checkbox v-model="checkedAgree" label="" size="large" />
            <span class="agree">我已阅读并同意服务协议与隐私政策</span>
          </div>
          <span class="text-[#0054FF]" @click="clickChangeLoginEntry">{{ footerLoginEntryText }}</span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
interface Props {
  visible: boolean;
}

const loginLoading = ref(false)
const authStore = useAuthStore()
const props = defineProps<Props>()
const phone = ref('')
const code = ref('')
const username = ref('')
const password = ref('')
const loginRef = ref()
const dialogVisible = ref(false)
const showCountDown = ref(false)
const countDownInterval = ref()
const isPhoneLogin = ref(true)
const footerLoginEntryText = computed(() => isPhoneLogin.value ? '用户名密码登录' : '手机验证码登录')
const topLoginTitleText = computed(() => isPhoneLogin.value ? '手机验证码登录' : '用户名密码登录')
let initCountDownNum = ref(60)

const clickChangeLoginEntry = () => {
  isPhoneLogin.value = !isPhoneLogin.value
}

const customClose = () => {
  authStore.setLoginDialog(false)
}

const handleClickSendCode = async () => {
  try {
    const { data, code, message } = await fetchPhoneCode(phone.value)
    console.log('fetchPhoneCode data', data, code, message)
    if (code && parseInt(code) == 200) {
      showCountDown.value = true
      ElMessage.success('验证码已发送，请注意查收')
      // 重置定时器
      countDownInterval.value = clearInterval(countDownInterval.value)
      countDownInterval.value = setInterval(() => {
        initCountDownNum.value--
        if (initCountDownNum.value === 0) {
          showCountDown.value = false
          clearInterval(countDownInterval.value)
          initCountDownNum.value = 60
        }
      }, 1000)
    } else {
      ElMessage.error('验证码发送失败，错误信息：' + message)
    }
  } catch (e: any) {
    console.log('fetchPhoneCode error', e.data)
    ElMessage.error('验证码发送失败，错误信息：' + (e.data.message ? JSON.stringify(e.data.message) : ''))
  }

}

const handleClickLogin = async () => {
  loginLoading.value = true
  try {
    const { data, code: resCode, message } = isPhoneLogin.value ? (await loginByPhoneCode(phone.value, code.value)) : (await loginByUserName(username.value, password.value))
    loginLoading.value = false
    console.log('loginByPhoneCode data', data, resCode, message)
    if (resCode && parseInt(resCode) == 200) {
      ElMessage.success('登录成功')
      authStore.setLoginDialog(false)
      authStore.setToken(data)
      authStore.getUserInfo()
      // 刷新页面
      location.reload()
    } else {
      ElMessage.error('登录失败，错误信息：' + message)
    }
  } catch (e: any) {
    console.log('handleClickLogin error', e)
    ElMessage.error('登录失败，错误信息：' + (e.data.message ? JSON.stringify(e.data.message) : ''))
  }
  loginLoading.value = false
}

defineExpose({
  loginRef
})

const checkedAgree = ref(false)
</script>

<style lang="scss" scoped>
.my-header {
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 22px;
  color: #000000;
  height: 22px;
  line-height: 22px;
}

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