<template>
  <div class="flex justify-center items-center flex-col rounded-[8px]"
    :style="{ backgroundColor: bgColor, color: textColor }" @click="handleClick">
    <div class="text-[14px]" :style="{ color: textColor }">{{ props.name }}</div>
    <el-input-number v-model="curNum" :min="1" :max="10" @change="handleChange" @click="handleNumClick" />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  name: string;
  num: number;
}

const props = defineProps<Props>()
const curNum = ref(props.num)
const borderColor = ref('')
const isDefaultState = ref(true)
const bgColor = computed(() => {
  return isDefaultState.value ? 'rgb(35, 38, 47)' : 'rgb(255, 255, 255)'
})
const textColor = computed(() => {
  return isDefaultState.value ? 'rgb(255, 255, 255)' : 'rgb(0,0,0)'
})

const handleChange = () => {
  // 更新外部数组中对应项值

}

const handleClick = () => {
  isDefaultState.value = !isDefaultState.value
}

const handleNumClick = (e: Event) => {
  e.stopPropagation()
}
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
</style>