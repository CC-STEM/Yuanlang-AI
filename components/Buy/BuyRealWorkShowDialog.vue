<template>
  <BaseDialog ref="realWorkRef" :title="'下单制作'" :width="1000" :height="800">
    <div class="w-full flex flex-col items-center">
      <div class="w-[800px] h-[600px]">
        <img id="toCreateImg" src="" alt="" class="object-contain w-full h-full">
      </div>
      <div class="w-full flex justify-between mt-[26px]">
        <div class="cancel-btn" @click="clickCancel">取消</div>
        <div class="save-btn" @click="clickSave">保存</div>
      </div>
    </div>
  </BaseDialog>
</template>

<script lang="ts" setup>


const realWorkRef = ref()
const runtimeConfig = useRuntimeConfig();
const imageUrl = ref('')

// 通用及漫画模型底图
const UPLOAD_URL = `${runtimeConfig.public.apiBase
  }/api/upload/file`;

const clickCancel = () => {
  if (realWorkRef.value) {
    realWorkRef.value.dialogVisible = false
  }
}

const clickSave = async () => {

  ElMessage.success('保存成功')
  // 刷新user
  if (realWorkRef.value) {
    realWorkRef.value.dialogVisible = false
  }
}
defineExpose({ realWorkRef })
</script>

<style lang="scss" scoped>
.cancel-btn {
  width: 150px;
  height: 50px;
  background: #F4F4F4;
  border-radius: 25px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 16px;
  color: #191919;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.save-btn {
  width: 150px;
  height: 50px;
  background: #034AFF;
  border-radius: 25px;
  line-height: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 16px;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>