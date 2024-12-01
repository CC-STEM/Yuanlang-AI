<template>
  <div class="w-full mb-[40px]">
    <div class="w-full flex items-center justify-between text-white mb-[8px]"><span>{{ props.outerTitle }}</span>
      <el-switch v-model="openConfigResourceType" />
    </div>
    <template v-if="openConfigResourceType">
      <div class="w-full text-left text-white mb-[8px] label-set ml-[20px]" @click="clickOpenResourceTypeSetDialog">
        打开类型库
      </div>
      <div v-if="selectedResourceTypes.length > 0" class="w-full text-left text-white text-[14px] mb-[20px]">已选类型项</div>
      <div class="w-full mb-[8px] flex flex-wrap">
        <div class="seletedTagContainer">
          <div
            class="text-white w-[80%] text-[12px] text-center leading-[36px] rounded-[90px] bg-[#23262f] pl-[5px] pr-[5px] truncate cursor-pointer"
            v-for="item in selectedResourceTypes" @click="clickResourceType(item)"
            :style="item.selected ? 'border: 2px solid rgb(177, 181, 196);' : ''">{{ item.name }}
          </div>
        </div>
      </div>
    </template>
  </div>
  <el-drawer v-model="openResourceTypeSet" title="画面类型选择" direction="rtl" size="60%">
    <template #header="{ titleId }">
      <div class="flex">
        <h1 :id="titleId" class="text-white text-[26px]">{{ props.drawerTitle }} ({{ selectedResourceTypes.length }} /
          10)
        </h1>
        <el-input v-model="tagSearchInput" style="width: 240px;margin-left: 20px" size="large" placeholder="请输入"
          :suffix-icon="Search" />
      </div>
    </template>
    <div class="w-full h-[calc(100%-92px)]">
      <el-scrollbar>
        <div class="w-full flex flex-wrap">
          <div @click="clickResourceType(item)" v-for="item in props.resourceOptions"
            :style="{ backgroundImage: `url(${item.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', border: item.selected ? '2px solid rgb(177, 181, 196)' : 'none' }"
            class="flex justify-center items-center w-[200px] h-[150px] m-[10px] rounded-[8px] cursor-pointer">
            <span class="text-white">{{ item.name }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelResourceTypeSet">取消</el-button>
        <el-button type="primary" @click="confirmResourceTypeSet">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'

import type { ImageTypeOption, StyleTypeOption, ArtistTypeOption, ElementMagicTypeOption, StyleDecorationTypeOption, ResourceOption } from '@/types'
interface ResourceOptions {
  outerTitle: string;
  drawerTitle: string;
  resourceOptions: ResourceOption[]
}
const props = defineProps<ResourceOptions>()
const openConfigResourceType = ref(false)
const openResourceTypeSet = ref(false)
const tagSearchInput = ref('')

const clickOpenResourceTypeSetDialog = () => {
  openResourceTypeSet.value = true
}

const selectedResourceTypes = computed(() => props.resourceOptions.filter(item => item.selected))
const clickResourceType = (item: ResourceOption) => {
  // 判断当前已选择项数量是否达到10
  if (selectedResourceTypes.value.length >= 10) {
    // 如果当前未选择，则不允许进行选择
    if (!item.selected) {
      console.log('最多10种')
      return
    }
  }
  item.selected = !item.selected
}

const cancelResourceTypeSet = () => {
  openResourceTypeSet.value = false
}

const confirmResourceTypeSet = () => {
  openResourceTypeSet.value = false
}

defineExpose({
  selectedResourceTypes
})
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

.label-set {
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #23262f;
  font-size: 14px;
  cursor: pointer;
}
</style>