<template>
  <div class="w-full h-full pl-[30px] pr-[30px]">
    <el-scrollbar>
      <div class="flex">
        <!-- <div class="pra-btn mr-[11px]" @click="handleClickBase"
          :style="{ backgroundColor: praType === 'base' ? '#0054FF' : '#030a67' }">基础练习场</div>
        <div class="pra-btn" @click="handleClickPro"
          :style="{ backgroundColor: praType === 'pro' ? '#0054FF' : '#030a67' }">专业练习场</div> -->
        <div v-bind:key="index" class="pra-btn mr-[11px]" @click="handleClickLevel(item)" :style="{
          backgroundColor: curSelectedLevel === item.value ? '#0054FF' : '#030a67'
        }" v-for="(item, index) in studyResouceLevelDictMap">
          {{ item.label }}</div>
      </div>
      <el-radio-group style="margin-top: 10px;" v-model="curSelectedCategory" size="large">
        <el-radio-button v-bind:key="index" :label="item.label" :value="item.value"
          v-for="(item, index) in studyResouceCategoryDictMap" />
      </el-radio-group>
      <div class="w-full h-[755px] flex">
        <div class="w-[1275px] h-[755px] flex justify-center items-center">
          <VideoPlayer v-if="curStudyCource" :videoUrl="curStudyCource.src" :lessonName="curStudyCource.name"
            :lessonId="curStudyCource.id" />
          <el-empty v-else :image-size="200" description="暂无视频" />
        </div>
        <div class="w-[416px] h-[732px] playList mt-[67px] ml-[14px] pl-[16px] pr-[16px]">
          <el-scrollbar>
            <PracticeVideoItem v-bind:key="item.id" v-for="(item) in studyResourceList" :name="item.name">
            </PracticeVideoItem>
          </el-scrollbar>
        </div>
      </div>
      <!-- <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="">
        <el-tab-pane label="手机壳设计" name="first">

        </el-tab-pane>
        <el-tab-pane label="手机壳设计" name="second"></el-tab-pane>
        <el-tab-pane label="手机壳设计" name="third"></el-tab-pane>
        <el-tab-pane label="手机壳设计" name="fourth"></el-tab-pane>
      </el-tabs> -->
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import type { DictPair, StudyResource } from '../types'
const dictStore = useDictStore()
const studyResouceCategoryDictMap = computed(() => dictStore.dictMap && dictStore.dictMap['study_resource_category'])
const studyResouceLevelDictMap = computed(() => dictStore.dictMap && dictStore.dictMap['study_resource_level'])
const curSelectedLevel = ref()
const curSelectedCategory = ref()
const studyResourceList = ref<StudyResource[]>([])
const curStudyCource = ref<StudyResource | null>(null)

const mockData = {
  videoUrl: "https://cc-web-1313504415.cos.ap-shanghai.myqcloud.com/web_pc/2024-11-04/20241104215648_meeting_quick_record.mp4",
  lessonName: "零基础入门AI动画系统教程！Stable Diffusion 使用安装+实战案例！",
  lessonId: 1
}
const handleClickLevel = (item: DictPair) => {
  curSelectedLevel.value = item.value
}

watch(studyResouceLevelDictMap, (newVal) => {
  console.log('studyResouceLevelDictMap', newVal)
  if (newVal && newVal.length > 0) {
    curSelectedLevel.value = newVal[0].value
  }
}, { immediate: true })

watch(studyResouceCategoryDictMap, (newVal) => {
  console.log('studyResouceCategoryDictMap', newVal)
  if (newVal && newVal.length > 0) {
    curSelectedCategory.value = newVal[0].value
  }
}, { immediate: true })

watch([curSelectedLevel, curSelectedCategory], async (newVal) => {
  if (newVal[0] !== undefined && newVal[1] !== undefined) {
    const { data: { data } } = await queryStudyResources(
      Number(curSelectedLevel.value),
      Number(curSelectedCategory.value)
    )
    console.log('queryStudyResources', data)
    studyResourceList.value = data
    if (data.length > 0) {
      curStudyCource.value = data[0]
    } else {
      curStudyCource.value = null
    }
  }
}, {
  immediate: true
})

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

// :deep(.el-tabs__nav-wrap:after) {
//   height: 1px;
//   background: #3F5E9D;
// }

// :deep(.el-tabs__active-bar) {
//   height: 9px;
//   background: #0054FF;
//   border: 1px solid #000000;
// }

// :deep(.el-tabs__item) {
//   line-height: 12px;
//   font-family: Microsoft YaHei;
//   font-weight: 400;
//   font-size: 14px;
//   color: #FFFFFF;
// }

.playList {
  background: rgb(0, 0, 0, 0.26);
  border-radius: 20px;
}

:deep(.el-radio-button__inner) {
  // border-radius: 20px;
  // background: #030a67;
  // color: #FFFFFF;
  color: black !important;
}
</style>
