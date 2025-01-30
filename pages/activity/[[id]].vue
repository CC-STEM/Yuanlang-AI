<template>
  <div class="w-full h-full flex flex-col items-center" v-if="!$route.params.id">
    <el-scrollbar>
      <ActivityCard v-bind:key="item.id" @click="clickActivity(item.id)" class="mt-[30px] cursor-pointer w-[1218px]"
        :width="1200" :height="385" :url="item.coverImg" :status="calcActivityStatus(item)" :name="item.name"
        :begin="new Date(item.startTime).getTime()" :is-show-time="true" :deadline="new Date(item.endTime).getTime()"
        :parti-num="0" v-for="item in activityList">
      </ActivityCard>
    </el-scrollbar>
  </div>
  <div class="w-full h-full flex flex-row mt-[10px]" v-else>
    <div class="w-[107px] h-full flex flex-col items-center ml-[35px]">
      <div class="flex items-center cursor-pointer back" @click="clickBack">
        <!-- <el-icon>
          <Back />
        </el-icon> -->
        返回
      </div>
      <div class="changeBtn mt-[39px] cursor-pointer" @click="clickToLast">上一个</div>
      <div class="changeBtn mt-[11px] cursor-pointer" @click="clickToNext">下一个</div>
    </div>
    <div class="w-[1128px] h-full flex flex-col ml-[107px]">
      <el-scrollbar>
        <div class="flex">
          <ActivityCard v-if="curActivity" :url="curActivity.coverImg" :status="calcActivityStatus(curActivity)"
            :name="curActivity.name" :is-show-time="true" :deadline="new Date(curActivity.endTime).getTime()"
            :parti-num="0" :width="860" :height="292"></ActivityCard>
          <div class="flex flex-col w-[252px] h-[292px] justify-between">
            <!-- <ActivitySubCard v-bind:key="index" class="w-[252px] h-[138px]" :style="item.style" :comment="item.desc"
              :icon-url="item.iconUrl" :title="item.title" v-for="(item, index) in bannerConfig"></ActivitySubCard> -->
            <ActivitySubCard class="w-[252px] h-[138px] cursor-pointer" :style="{
              background: 'rgb(31,47,255,0.14)',
              borderRadius: px2vw(20),
            }" :comment="''" :icon-url="AddIcon" :title="'立即创作'" @click="clickToCreate"></ActivitySubCard>
            <ActivitySubCard class="w-[252px] h-[138px] cursor-pointer" :style="{
              background: 'rgb(0,205,229,0.14)',
              borderRadius: px2vw(20),
            }" :comment="''" :icon-url="SendIcon" :title="'立即投稿'" @click="clickToSend"></ActivitySubCard>
          </div>
        </div>
        <div class="flex flex-col w-full h-[447px] relative pt-[33px] pl-[23px] info-card mt-[38px]">
          <!-- <ActivityInfo class="w-[calc(100%-23px)] info" :content="item.content" :title="item.title"
            v-for="item in infoList">
          </ActivityInfo> -->
          <ActivityInfo class="w-[calc(100%-23px)] info" :content="curActivity?.intro || ''" :title="'活动介绍'">
          </ActivityInfo>
          <ActivityInfo class="w-[calc(100%-23px)] info" :content="curActivity?.category" :title="'参与方式'">
          </ActivityInfo>
          <ActivityInfo class="w-[calc(100%-23px)] info"
            :content="new Date(curActivity?.startTime).toLocaleString() + '-' + new Date(curActivity?.endTime).toLocaleString()"
            :title="'时间安排'">
          </ActivityInfo>
          <ActivityInfo class="w-[calc(100%-23px)] info" :content="curActivity?.activityRewards || ''" :title="'活动奖励'">
          </ActivityInfo>
          <img class="absolute right-[9px] bottom-[33px]" src="~/assets/activity-detail.png" alt="">
        </div>
        <div class="w-full text-center hope mt-[53px]">期待您的加入</div>
        <div class="w-full flex flex-row flex-wrap justify-around mt-[44px]">
          <ImgCard class="w-[260px] h-[346px]" v-bind:key="index" v-for="(item, index) in recommendImgList"
            :url="item.src" />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AddIcon from '~/assets/add.png'
import SendIcon from '~/assets/send.png'
import DemoImg from '~/assets/img1.jpeg'
import type { Activity, QueryActivityRes } from '../../types'

const route = useRoute()
const router = useRouter()

const activityList = ref<Activity[]>([])

const recommendImgList = ref<{
  src: string;
  name: string;
}[]>([])

const curActivity = computed(() => {
  const id = parseInt(route.params.id as string)
  return activityList.value.find(item => item.id === id)
})

const calcActivityStatus = (activity: Activity) => {
  const curTime = new Date().getTime()
  const startTime = new Date(activity.startTime).getTime()
  const endTime = new Date(activity.endTime).getTime()
  if (curTime < startTime) {
    return 0 // 未开始
  } else if (curTime > endTime) {
    return 2 // 已结束
  } else {
    return 1 // 进行中
  }
}

const clickActivity = (id: number) => {
  router.push({ path: '/activity/' + id })
}

const clickBack = () => {
  router.push('/activity')
}

const clickToLast = () => {
  const index = activityList.value.findIndex(item => item.id === curActivity.value?.id)
  if (index === 0) {
    return
  }
  router.push({ path: '/activity/' + activityList.value[index - 1].id })
}

const clickToNext = () => {
  const index = activityList.value.findIndex(item => item.id === curActivity.value?.id)
  if (index === activityList.value.length - 1) {
    return
  }
  router.push({ path: '/activity/' + activityList.value[index + 1].id })
}

const clickToCreate = () => {
  router.push('/create')
}

const clickToSend = () => {
  router.push('/create')
}

onMounted(async () => {
  const { data: { data } } = await queryActivities()
  activityList.value = data.filter(item => item.status === 1)

  const res = await getGlobalDrawTasks(1, 8)
  recommendImgList.value = res.data.list.map(item => ({
    src: item.qcloud_cos_url || item.wujie_picture_url || '',
    name: item.key!
  }))
})
</script>

<style lang="scss" scoped>
.back {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
}

.changeBtn {
  width: 107px;
  height: 43px;
  background: linear-gradient(-89deg, #0054ff, #34F3FF);
  border-radius: 22px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-card {
  background: rgb(0, 84, 255, 0.07);
  border-radius: 20px;
}

.info {
  font-family: Microsoft YaHei;
  font-weight: 300;
  font-size: 14px;
  color: #FEFEFE;
  line-height: 24px;
}

.hope {
  line-height: 36px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 36px;
  color: #FFFFFF;
}
</style>