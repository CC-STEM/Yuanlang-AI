<template>
  <div class="flex justify-center items-center flex-col rounded-[8px]"
    :style="props.option.selected ? 'border: 2px solid rgb(177, 181, 196);' : ''" @click="handleClick">
    <div class="text-[14px]" :style="{ color: textColor }">{{ props.option.name }}</div>
    <el-input-number v-model="curWeight" :min="-1" :max="2" :precision="1" :step="0.1" @change="handleChange"
      @click="handleNumClick" />
  </div>
</template>

<script lang="ts" setup>
import type { ModelFusionTypeOption } from '@/types'
import { modelFusionOptionsKey } from '@/utils'
interface Props {
  option: ModelFusionTypeOption
}

const props = defineProps<Props>()
const resourceOptions = inject(modelFusionOptionsKey, ref([]))

// watch(resourceOptions, (newVal) => {
//   // console.log('resourceOptions', newVal)
// }, { immediate: true })
const curWeight = ref(props.option.recommended_weight)
const borderColor = ref('')
const isDefaultState = ref(true)
const bgColor = computed(() => {
  return isDefaultState.value ? 'rgb(35, 38, 47)' : 'rgb(255, 255, 255)'
})
const textColor = computed(() => {
  return isDefaultState.value ? 'rgb(255, 255, 255)' : 'rgb(0,0,0)'
})

const handleChange = (num: number) => {
  // 更新外部数组中对应项值
  // console.log('handleChange', e)
  props.option.weight = num
}

const handleClick = () => {
  console.log('resourceOptions', resourceOptions.value)
  if (resourceOptions.value.filter(item => item.selected).length >= 5) {
    console.log('最多只能选择5个模型')
    return
  }
  props.option.selected = !props.option.selected
}

const handleNumClick = (e: Event) => {
  e.stopPropagation()
}

watch(() => props.option, (newVal) => {
  curWeight.value = newVal.weight
}, {
  immediate: true,
  deep: true
})
</script>

<style scoped lang="scss">
:deep(.el-input-number__decrease, .el-input-number__increase) {
  background: none;
}

:deep(.el-input-number__increase) {
  background: none;
}

:deep(.el-input-number) {
  width: 120px;
}

:deep(.el-input__wrapper) {
  box-shadow: none;
  color: #fff;
}

:deep(.el-input-number__decrease) {
  border-right: none;
  width: 25px;
}

:deep(.el-input-number__increase) {
  border-left: none;
  width: 25px;
}

:deep(.el-input__wrapper) {
  border-radius: 9px;
}

:deep(.el-input-number .el-input__wrapper) {
  padding-left: 22px;
  padding-right: 22px;
}
</style>