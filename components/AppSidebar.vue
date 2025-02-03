<template>
  <div class="flex w-full flex-col items-center">
    <div class="sideItem mb-[32px]" @click="() => { }">
      <img class="w-[60px] h-[60px] rounded-[10px] mb-[10px]" :src="userAvatar" alt="" @click="handleClickHeadIcon">
      <span class="text-white text-xs">{{ userInfo.name || userInfo.username }}</span>
      <div v-show="showUserConfigPanel"
        class="w-[107px] h-[187px] bg-[#3413FF] rounded-[10px] flex flex-col absolute left-[114px] top-[0px] z-[999] justify-around">
        <div class="text-center config-panel-item" @click="clickShowOrderDialog">订单</div>
        <div class="text-center config-panel-item">资产</div>
        <div class="text-center config-panel-item" @click="clickShowSettingDialog">设置</div>
        <div class="text-center config-panel-item" @click="handleLogout">退出</div>
      </div>
    </div>
    <NuxtLink :to="item.path" @click="handleClick(item)" v-bind:key="index" v-for="(item, index) in routeInfo">
      <div :class="'sideItem ' + (curSelectedRouteItem?.name === item.name ? 'curClick' : '')">
        <div class="relative outerDiv">
          <img class="w-[24px] h-[24px]" :src="item.url" alt="">
        </div>
        <span>{{ item.name }}</span>
      </div>
    </NuxtLink>
    <!-- <LoginDialog ref="loginDialogRef" /> -->
    <!-- <BuyPayDialog ref="payDialogRef" /> -->
    <!-- <BuyReceiveDialog ref="receiveDialogRef" /> -->
    <ClientOnly>
      <UserSettingDialog ref="settingDialogRef" />
      <UserOrderDialog ref="orderDialogRef" />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
useHead({
  script: [
    {
      type: "text/javascript",
      src: 'https://unpkg.com/better-scroll@latest/dist/better-scroll.min.js'
    }
  ]
})
import WorkImg from '~/assets/work.png'
import CreateImg from '~/assets/create.png'
import PracticeImg from '~/assets/practice.png'
import ActivityImg from '~/assets/activity.png'
import HomeImg from '~/assets/home.png'
import DefaultAvatar from '~/assets/cclogo.png'

interface RouteItemInfo {
  name: string,
  url: string,
  path: string
}
const route = useRoute()
const router = useRouter()
const showUserConfigPanel = ref(false)
const authStore = useAuthStore()
const userInfo = computed(() => authStore.userInfo)
const userAvatar = computed(() => userInfo.value.avatar || DefaultAvatar)
const routeInfo: RouteItemInfo[] = [{
  name: '作品展示',
  url: WorkImg,
  path: '/explore'
}, {
  name: '创作区',
  url: CreateImg,
  path: '/create'
}, {
  name: '学习区',
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
  // 判断当前是否点击除explore 外菜单
  if (item.path !== '/explore') {
    if (!authStore.isLogin) {
      authStore.setLoginDialog(true)
      return
    }
  }

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

// const clickShowLoginDialog = () => {
//   // loginDialogRef.value.loginRef.dialogVisible = true
//   if (!authStore.isLogin) {
//     authStore.setLoginDialog(true)
//   } else {
//     orderDialogRef.value.userOrderRef.dialogVisible = true
//   }
// }

const clickShowPayDialog = () => {
  payDialogRef.value.payRef.dialogVisible = true
}

const clickShowReceiveDialog = () => {
  receiveDialogRef.value.receiveRef.dialogVisible = true
}

const clickShowOrderDialog = () => {
  orderDialogRef.value.userOrderRef.dialogVisible = true
}

const handleClickHeadIcon = () => {
  // 判断当前是否未登录
  if (!authStore.isLogin) {
    authStore.setLoginDialog(true)
    return
  }
  showUserConfigPanel.value = !showUserConfigPanel.value
}

const handleLogout = () => {
  authStore.logOut()
  // 判断当前是否在explore页，不是则跳转到explore页
  if (route.path !== '/explore') {
    router.push('/explore')
  }
  showUserConfigPanel.value = false
}

// onMounted(() => {
//   const path = route.path
//   console.log('route path', path)
//   curSelectedRouteItem.value = routeInfo.find(item => path.startsWith(item.path)) || null
// })

watch(() => route.path, (newVal: string) => {
  if (newVal) {
    curSelectedRouteItem.value = routeInfo.find(item => newVal.startsWith(item.path)) || null
  }
}, { immediate: true })
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

  .config-panel-item {
    font-family: Microsoft YaHei;
    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;
  }
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