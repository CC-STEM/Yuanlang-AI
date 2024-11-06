import { UserAssetsItem } from '../../.nuxt/components';
<template>
  <div class="w-full h-full pt-[25px] pl-[45px] pr-[82px]">
    <div class="assets-title mt-[25px] mb-[23px]">我的资产</div>
    <div class="w-[461px] h-[705px] assets-card pt-[29px] pl-[26px] pr-[28px] relative">
      <div class="flex type-title items-center">
        <span @click="clickIncome" class="mr-[24px]" :style="isIncome ? clickedStyle : {}">收入</span>
        <span @click="clickPoint" :style="!isIncome ? clickedStyle : {}">积分</span>
      </div>
      <div class="h-[103px] flex justify-between">
        <div :class="(isIncome ? 'assets-income-num' : 'assets-point-num') + ' mt-[23px]'">18744</div>
        <img :src="curImg" alt="">
      </div>
      <div class="w-full mt-[6px] mb-[24px] balance">账户余额</div>
      <div class="h-[441px]">
        <el-scrollbar>
          <div class="flex flex-col">
            <UserAssetsItem class="w-full" v-for="(item, index) in mockItem" :key="index" :num="item" />
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IncomeImg from '~/assets/asset-income.png'
import PointImg from '~/assets/asset-point.png'

const isIncome = ref(true)
const clickIncome = () => {
  isIncome.value = true
}
const clickPoint = () => {
  isIncome.value = false
}

const clickedStyle = {
  lineHeight: '18px',
  fontFamily: 'Microsoft YaHei',
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#FFFFFF',
  borderBottom: '7px solid #1F2FFF'
}

const mockItem = [
  0, 100, -100, 200, -200, 300, 500
]

const curImg = computed(() => isIncome.value ? IncomeImg : PointImg)
</script>

<style>
.assets-title {
  line-height: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 18px;
  color: #FFFFFF;
}

.assets-card {
  background: rgb(0, 84, 255, 0.07);
  border-radius: 20px;
  /* opacity: 0.07; */
}

.type-title {
  line-height: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
}

.assets-income-num {
  line-height: 61px;
  font-family: DIN;
  font-weight: bold;
  font-size: 85px;
  color: #FF5400;
  background: linear-gradient(25deg, #034AFF 0%, #00DEFF 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.assets-point-num {
  line-height: 61px;
  font-family: DIN;
  font-weight: bold;
  font-size: 80px;
  color: #034AFF;
  background: linear-gradient(25deg, #FF2626 0%, #FF9662 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.balance {
  line-height: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #8A8A8A;
}
</style>