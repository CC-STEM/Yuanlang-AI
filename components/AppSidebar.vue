<template>
  <div class="flex w-full flex-col items-center">
    <div class="sideItem mb-[32px]" @click="clickShowLoginDialog">
      <img class="w-[60px] h-[60px] rounded-[10px] mb-[10px]" src="~/assets/head.jpeg" alt="">
      <span class="text-white text-xs">AI创作者</span>
    </div>
    <NuxtLink :to="item.path" @click="handleClick(item)" v-for="(item, index) in routeInfo">
      <div :class="'sideItem ' + (curSelectedRouteItem?.name === item.name ? 'curClick' : '')">
        <div class="relative outerDiv">
          <img class="w-[24px] h-[24px]" :src="item.url" alt="">
        </div>
        <span>{{ item.name }}</span>
      </div>
    </NuxtLink>
    <!-- <LoginDialog ref="loginDialogRef" /> -->
    <BuyPayDialog ref="payDialogRef" />
    <BuyReceiveDialog ref="receiveDialogRef" />
    <UserSettingDialog ref="settingDialogRef" />
    <UserOrderDialog ref="orderDialogRef" />
  </div>
</template>

<script lang="ts" setup>
import WorkImg from '~/assets/work.png'
import CreateImg from '~/assets/create.png'
import PracticeImg from '~/assets/practice.png'
import ActivityImg from '~/assets/activity.png'
import HomeImg from '~/assets/home.png'


interface RouteItemInfo {
  name: string,
  url: string,
  path: string
}

const authStore = useAuthStore()
const routeInfo: RouteItemInfo[] = [{
  name: '作品展示',
  url: WorkImg,
  path: '/explore'
}, {
  name: '创作区',
  url: CreateImg,
  path: '/create'
}, {
  name: '练习场',
  url: PracticeImg,
  path: '/practice'
}, {
  name: '活动赛事',
  url: ActivityImg,
  path: '/activity'
}, {
  name: '个人主页',
  url: HomeImg,
  path: '/home'
}]

const curSelectedRouteItem = ref<RouteItemInfo | null>(null)
const handleClick = (item: RouteItemInfo) => {
  curSelectedRouteItem.value = item
  console.log('curSelectedRouteItem', curSelectedRouteItem)
}
const loginDialogRef = ref()
const payDialogRef = ref()
const receiveDialogRef = ref()
const settingDialogRef = ref()
const orderDialogRef = ref()

const clickShowSettingDialog = () => {
  settingDialogRef.value.userSettingRef.dialogVisible = true
}

const clickShowLoginDialog = () => {
  // loginDialogRef.value.loginRef.dialogVisible = true
  if (!authStore.isLogin) {
    authStore.setLoginDialog(true)
  } else {
    orderDialogRef.value.userOrderRef.dialogVisible = true
  }
}

const clickShowPayDialog = () => {
  payDialogRef.value.payRef.dialogVisible = true
}

const clickShowReceiveDialog = () => {
  receiveDialogRef.value.receiveRef.dialogVisible = true
}

const clickShowOrderDialog = () => {
  orderDialogRef.value.userOrderRef.dialogVisible = true
}

</script>

<style scoped lang="scss">
.sideItem {
  width: 104px;
  height: 88px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Microsoft YaHei;
  font-weight: 300;
  font-size: 16px;
  color: #FFFFFF;
  cursor: pointer;
  position: relative;
}

.curClick {
  background: #0054FF;
}

.outerDiv::after {
  width: 26px;
  height: 16px;
  content: url(~/assets/hot.png);
  position: absolute;
  top: -16px;
  right: -26px;
}

:deep(.el-dialog__close) {
  width: 16px;
  height: 16px;
  color: #0F0F0F;
}

:deep(.el-dialog) {
  padding: 30px;
}

:deep(.el-dialog__header) {
  padding-bottom: 0px;
}
</style>