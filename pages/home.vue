<template>
  <div class="w-full h-full pl-[44px] pt-[51px]">
    <el-scrollbar>
      <div class="w-full flex pb-[19px] border-b-solid border-b-[1px] border-b-[#262F4E]">
        <img class="w-[100px] h-[100px] rounded-[50%]" src="~/assets/head.jpeg" alt="">
        <div class="flex flex-col h-[100px] justify-around ml-[28px]">
          <span class="username">AI创作者</span>
          <div class="flex items-center info">
            <span>关注 {{ 98 }}</span>
            <span class="gutter ml-[33px]"></span>
            <span class="ml-[33px]">粉丝 {{ 1.5 }}万</span>
            <span class="gutter ml-[33px]"></span>
            <span class="ml-[33px]">获赞 {{ 29.8 }}万</span>
            <span class="gutter ml-[33px]"></span>
            <span class="ml-[33px]">被围观 {{ 500.8 }}万</span>
          </div>
          <span class="detail">个人介绍内容个人介绍内容</span>
        </div>
      </div>
      <div class="w-full h-[calc(100%-119px)] flex">
        <div class="w-[1128px] h-full border-r-solid border-r-[1px] border-r-[#262F4E]">
          <div class="flex mt-[22px]">
            <div class="work" @click="clickMyWork"
              :style="{ 'border-bottom': isMyWork ? '7px solid #1F2FFF' : 'none' }">
              我的作品</div>
            <div class="work ml-[52px]" @click="clickMyCollection"
              :style="{ 'border-bottom': !isMyWork ? '7px solid #1F2FFF' : 'none' }">我的收藏</div>
          </div>
          <div class="w-full h-[calc(100%-47px)]">
            <el-scrollbar class="h-full">
              <div class="flex flex-wrap mt-[23px] justify-between pr-[43px]">
                <ImgCard class="w-[260px] h-[346px] " v-for="item in 13" :url="DemoImg" />
              </div>
            </el-scrollbar>
          </div>
        </div>
        <div class="w-[calc(100%-1128px)] h-full">
          <UserAssets />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import DemoImg from '~/assets/img1.jpeg'
import { useCounterStore } from '../composables/counter';

const isMyWork = ref(true)
const clickMyWork = () => {
  isMyWork.value = true
}

const clickMyCollection = () => {
  isMyWork.value = false
}

</script>

<style scoped lang="scss">
.gutter {
  width: 1px;
  height: 14px;
  background: #E2E2E2;
}

.username {
  line-height: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 18px;
  color: #FFFFFF;
}

.info {
  line-height: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
}

.detail {
  line-height: 11px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #FFFFFF;
}

.work {
  line-height: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 18px;
  color: #FFFFFF;
  border-bottom: 7px solid #1F2FFF
}
</style>