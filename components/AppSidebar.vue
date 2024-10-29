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
    <LoginDialog ref="loginDialogRef" />
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

const clickShowLoginDialog = () => {
  loginDialogRef.value.loginRef.dialogVisible = true
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

:deep(.el-dialog__header) {
  padding-bottom: 0px;
}
</style>