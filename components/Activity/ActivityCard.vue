<template>
  <div class="pl-[9px] pr-[9px]">
    <div class=" w-full relative overflow-visible">
      <img :style="{ width: px2vw(props.width), height: px2vw(props.height) }" class="object-cover" :src="props.url"
        alt="" />
      <img class="absolute top-[30px] left-[-9px] w-[69px] h-[38px] z-[999] flex" :src="statusImg" />
    </div>
    <div class="w-full flex mt-[24px] justify-between items-end">
      <span class="cardName ml-[13px]">{{ name }}</span>
      <span v-if="isShowTime && timeLeft" class="cardDesc">
        <span class="time-unit">{{ timeLeft.day }}</span>
        天
        <span class="time-unit">{{ timeLeft.hour }}</span>
        时
        <span class="time-unit">{{ timeLeft.minute }}</span>
        分
        <span class="time-unit">{{ timeLeft.second }}</span>
        秒
      </span>
      <span v-else class="cardDesc">
        <span class="partiNum">{{ partiNum }}</span>
        人已投稿
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import In from '~/assets/in.png'
import Over from '~/assets/over.png'

interface Props {
  status: number;
  isShowTime: boolean;
  deadline?: number;
  partiNum?: number;
  name: string;
  url: string;
  width: number;
  height: number;
}

const props = defineProps<Props>();
// 计算剩余时间
const timeLeft = computed(() => {
  if (props.isShowTime && props.deadline) {
    const now = new Date().getTime();
    const timeLeft = props.deadline - now;
    // 转换成天,时,分,秒
    const day = Math.floor(timeLeft / (24 * 3600 * 1000));
    const hour = Math.floor((timeLeft % (24 * 3600 * 1000)) / (3600 * 1000));
    const minute = Math.floor((timeLeft % (3600 * 1000)) / (60 * 1000));
    const second = Math.floor((timeLeft % (60 * 1000)) / 1000);
    return { day, hour, minute, second };
  } else {
    return null;
  }
})

const statusImg = computed(() => {
  if (props.status === 0) {
    return In
  }
  return Over
})
</script>

<style scoped lang="scss">
.cardName {
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 24px;
  color: #FFFFFF;
  line-height: 26px;
}

.time-unit {
  width: 23px;
  height: 22px;
  background: #1F2FFF;
  border-radius: 4px;
}

.cardDesc {
  font-family: Microsoft YaHei;
  font-weight: 300;
  font-size: 12px;
  color: #FFFFFF;
  line-height: 10px;
}

.partiNum {
  font-family: DIN;
  font-weight: bold;
  font-size: 18px;
  color: #FFFFFF;
  line-height: 14px;
}
</style>