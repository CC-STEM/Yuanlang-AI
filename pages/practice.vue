<template>
  <div class="w-full h-full pl-[30px] pr-[30px]">
    <div class="flex">
      <div class="pra-btn mr-[11px]" @click="handleClickBase"
        :style="{ backgroundColor: praType === 'base' ? '#0054FF' : '#030a67' }">基础练习场</div>
      <div class="pra-btn" @click="handleClickPro"
        :style="{ backgroundColor: praType === 'pro' ? '#0054FF' : '#030a67' }">专业练习场</div>
    </div>
    <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="">
      <el-tab-pane label="手机壳设计" name="first">
        <div class="w-full h-full flex">
          <div class="w-[1275px] h-[755px]">
            <VideoPlayer :videoUrl="mockData.videoUrl" :lessonName="mockData.lessonName"
              :lessonId="mockData.lessonId" />
          </div>
          <div class="w-[416px] h-[732px] playList mt-[67px] ml-[14px] pl-[16px] pr-[16px]">
            <el-scrollbar>
              <PracticeVideoItem v-for="item in 10"></PracticeVideoItem>
            </el-scrollbar>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="手机壳设计" name="second"></el-tab-pane>
      <el-tab-pane label="手机壳设计" name="third"></el-tab-pane>
      <el-tab-pane label="手机壳设计" name="fourth"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
const activeTab = ref('first')
const praType = ref('base')

const mockData = {
  videoUrl: "https://cc-web-1313504415.cos.ap-shanghai.myqcloud.com/web_pc/2024-11-04/20241104215648_meeting_quick_record.mp4",
  lessonName: "零基础入门AI动画系统教程！Stable Diffusion 使用安装+实战案例！",
  lessonId: 1
}
const handleClickBase = () => {
  praType.value = 'base'
}

const handleClickPro = () => {
  praType.value = 'pro'
}
</script>

<style lang="scss" scoped>
.pra-btn {
  width: 113px;
  height: 42px;
  border-radius: 10px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-tabs__nav-wrap:after) {
  height: 1px;
  background: #3F5E9D;
}

:deep(.el-tabs__active-bar) {
  height: 9px;
  background: #0054FF;
  border: 1px solid #000000;
}

:deep(.el-tabs__item) {
  line-height: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
}

.playList {
  background: rgb(0, 0, 0, 0.26);
  border-radius: 20px;
}
</style>
