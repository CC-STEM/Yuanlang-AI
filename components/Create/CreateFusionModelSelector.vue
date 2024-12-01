<template>
  <div class="w-full mb-[40px]">
    <div class="w-full flex items-center justify-between text-white mb-[8px]"><span>融合模型选择</span>
      <el-switch v-model="openConfigMixModel" />
    </div>
    <template v-if="openConfigMixModel">
      <div class="w-full text-left text-white mb-[8px] label-set ml-[20px]" @click="clickOpenMixModelSetDialog">
        模型库
      </div>
      <div class="w-full text-left text-white text-[14px] mb-[20px]">已选模型项</div>
      <div class="w-full mb-[8px] flex flex-wrap">
        <div class="seletedTagContainer">
          <!-- <CreateMixModelItem class="w-[160px] h-[70px]" v-for="item in mockMixModels" :option="{}" /> -->
        </div>
      </div>
    </template>
  </div>
  <el-drawer v-model="openMixModelSet" title="融合模型选择" direction="rtl" size="60%">
    <template #header="{ titleId }">
      <div class="flex">
        <h1 :id="titleId" class="text-white text-[26px]">模型库</h1>
        <el-input v-model="mixModelSearchInput" style="width: 240px;margin-left: 20px" size="large" placeholder="请输入"
          :suffix-icon="Search" />
      </div>
    </template>
    <el-scrollbar style="height: auto">
      <el-segmented v-model="category" :options="categories" size="default" class="w-full" />
    </el-scrollbar>
    <div class="w-full mt-[20px] h-[calc(100%-92px)]">
      <el-scrollbar>
        <div class="w-full flex flex-wrap">
          <CreateMixModelItem class="w-[160px] h-[70px] m-[5px]" :key="item.key"
            v-for="item in fusionModelOptionsByCategory" :option="item" />
        </div>
      </el-scrollbar>
    </div>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelMixModel">取消</el-button>
        <el-button type="primary" @click="confirmMixModel">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import type { ModelFusionTypeOption } from '@/types'
interface ResourceOptions {
  resourceOptions: ModelFusionTypeOption[]
}

const props = defineProps<ResourceOptions>()

const categories = computed(() => Array.from(new Set(props.resourceOptions?.map(item => item.category!) || [])))
const category = ref('')

watch(categories, (newVal, oldVal) => {
  if (oldVal && oldVal.length === 0 && newVal.length > 0) {
    category.value = newVal[0]
  }
}, {
  deep: true,
  immediate: true
})
const fusionModelOptionsByCategory = computed(() => {
  const options = props.resourceOptions?.filter(item => item.category === category.value)
  return options || []
})
const openConfigMixModel = ref(false)
const openMixModelSet = ref(false)
const mixModelSearchInput = ref('')

const clickOpenMixModelSetDialog = () => {
  openMixModelSet.value = true
}

const mockMixModels = [
  '黑神话',
  '黑悟空',
  '自然之歌',
  '感官刺激',
  '万物有灵',
  '野性斑斓']

const mixModelTypes = ['推荐',
  '摄影',
  '产品',
  '插画',
  '漫画',
  '绘本',
  '人物',
  '设计',
  '国风',
  '室内',
  '奇幻']
const mixModelType = ref(mixModelTypes[0])

const cancelMixModel = () => {
  openMixModelSet.value = false
}

const confirmMixModel = () => {
  openMixModelSet.value = false
}
</script>

<style scoped lang="scss">
.seletedTagContainer {
  width: 100%;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-row-gap: 10px;
  justify-items: center;
  align-items: center;
}

.el-segmented {
  --el-segmented-bg-color: none;
  --el-segmented-color: white;
  --el-segmented-item-selected-bg-color: #ebedf0;
  --el-segmented-item-selected-color: #000;
}

:deep(.el-segmented__item:not(.is-disabled):not(.is-selected):hover) {
  color: #fff;
  background: none;
}

:deep(.el-check-tag) {
  width: auto;
  margin: 5px;
  border-radius: 90px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(35, 38, 47);
  color: #fff;
}

:deep(.el-check-tag.el-check-tag--primary.is-checked) {
  background-color: #fff;
  color: #000;
}

// :deep(.category-scrollbar) {
//   height: none;
// }</style>