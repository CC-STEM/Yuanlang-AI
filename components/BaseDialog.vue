<template>
  <ClientOnly>
    <el-dialog v-model="dialogVisible" :title="props.title" :style="{
      width: px2vw(props.width), height: px2vw(props.height), background: 'linear-gradient(-72deg, #B5CFFF, #FFFFFF, #FFFFFF, #C2F9FF)',
      borderRadius: '20px'
    }">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          {{ props.title }}
        </div>
      </template>
      <slot></slot>
    </el-dialog>
  </ClientOnly>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
  height: number;
  width: number;
}

const props = defineProps<Props>()
const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认是否关闭')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

defineExpose({
  dialogVisible
})
</script>

<style scoped lang="scss">
.my-header {
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 22px;
  color: #000000;
  height: 22px;
  line-height: 22px;
}
</style>