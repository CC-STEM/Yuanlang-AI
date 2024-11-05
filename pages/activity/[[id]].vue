<template>
  <div class="w-full h-full flex flex-col items-center" v-if="!$route.params.id">
    <el-scrollbar>
      <ActivityCard @click="clickActivity(item.id)" class="mt-[30px] cursor-pointer w-[1218px]" :width="1200"
        :height="385" :url="item.url" :status="item.status" :name="item.name" :is-show-time="item.isShowTime"
        :deadline="item.deadline" :parti-num="item.partiNum" v-for="item in mockActivityData"></ActivityCard>
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
      <div class="changeBtn mt-[39px]">上一个</div>
      <div class="changeBtn mt-[11px]">下一个</div>
    </div>
    <div class="w-[1128px] h-full flex flex-col ml-[107px]">
      <el-scrollbar>
        <div class="flex">
          <ActivityCard v-if="curActivity" :url="curActivity.url" :status="curActivity.status" :name="curActivity.name"
            :is-show-time="curActivity.isShowTime" :deadline="curActivity.deadline" :parti-num="curActivity.partiNum"
            :width="860" :height="292"></ActivityCard>
          <div class="flex flex-col w-[252px] h-[292px] justify-between">
            <ActivitySubCard class="w-[252px] h-[138px]" :style="item.style" :comment="item.desc"
              :icon-url="item.iconUrl" :title="item.title" v-for="item in bannerConfig"></ActivitySubCard>
          </div>
        </div>
        <div class="flex flex-col w-full h-[447px] relative pt-[33px] pl-[23px] info-card mt-[38px]">
          <ActivityInfo class="w-[calc(100%-23px)] info" :content="item.content" :title="item.title"
            v-for="item in infoList">
          </ActivityInfo>
        </div>
        <div class="w-full text-center hope mt-[53px]">期待您的加入</div>
        <div class="w-full flex flex-row flex-wrap justify-around mt-[44px]">
          <ImgCard class="w-[260px] h-[346px] " v-for="item in 8" :url="DemoImg" />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ActivityImg from '~/assets/activity.webp'
import AddIcon from '~/assets/add.png'
import SendIcon from '~/assets/send.png'
import DemoImg from '~/assets/img1.jpeg'
const route = useRoute()
const router = useRouter()
const mockActivityData = [{
  id: 1,
  status: 0,
  name: 'AI创作大赛福建赛区报名',
  isShowTime: true,
  deadline: new Date().getTime() + 24 * 3600 * 1000,
  url: ActivityImg
}, {
  id: 2,
  status: 1,
  name: 'AI创作大赛浙江赛区报名',
  isShowTime: false,
  partiNum: 500,
  url: ActivityImg
}, {
  id: 3,
  status: 0,
  name: 'AI创作大赛福建赛区报名',
  isShowTime: true,
  deadline: new Date().getTime() + 24 * 3600 * 1000,
  url: ActivityImg
}, {
  id: 4,
  status: 1,
  name: 'AI创作大赛浙江赛区报名',
  isShowTime: false,
  partiNum: 500,
  url: ActivityImg
}]



const curActivity = computed(() => {
  const id = parseInt(route.params.id as string)
  return mockActivityData.find(item => item.id === id)
})

const bannerConfig = [{
  iconUrl: AddIcon,
  title: '立即创作',
  desc: '(活动已结束)',
  style: {
    background: 'rgb(31,47,255,0.14)',
    borderRadius: px2vw(20),
  }
}, {
  iconUrl: SendIcon,
  title: '立即投稿',
  desc: '(活动已结束)',
  style: {
    background: 'rgb(0,205,229,0.14)',
    borderRadius: px2vw(20),
  }
}]

const infoList = [{
  title: '活动介绍',
  content: '活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容活动内容'
}, {
  title: '参与方式',
  content: '线上投稿',
}, {
  title: '时间安排',
  content: '2024年10月1日-2024年10月30日'
}, {
  title: '活动奖励',
  content: '奖励说明奖励说明奖励说明奖励说明'
}]

const clickActivity = (id: number) => {
  router.push({ path: '/activity/' + id })
}

const clickBack = () => {
  router.back()
}
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