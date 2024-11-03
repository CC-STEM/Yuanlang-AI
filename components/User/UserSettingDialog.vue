<template>
  <BaseDialog ref="userSettingRef" :title="'设置'" :width="395" :height="545">
    <div class="w-full flex flex-col items-center">
      <img class="mt-[16px] settingImg" src="~/assets/head.jpeg" alt="">
      <span class="setting-text">点击修改头像</span>
      <div class="w-full flex flex-col mt-[30px]">
        <span class="setting-label">昵称</span>
        <el-input class="name-input mt-[11px]" placeholder="请输入昵称"></el-input>
      </div>
      <div class="w-full flex flex-col mt-[15px]">
        <span class="setting-label">简介</span>
        <el-input type="textarea" class="info-input mt-[12px]" placeholder="介绍一下自己"></el-input>
      </div>
      <div class="w-full flex justify-between mt-[26px]">
        <div class="cancel-btn">取消</div>
        <div class="save-btn">保存</div>
      </div>
    </div>
  </BaseDialog>
</template>

<script lang="ts" setup>
const userSettingRef = ref()
defineExpose({ userSettingRef })
</script>

<style lang="scss" scoped>
.settingImg {
  width: 104px;
  height: 104px;
  background: #F4F4F4;
  border-radius: 50%;
}

.setting-text {
  font-family: Microsoft YaHei;
  font-weight: 300;
  font-size: 12px;
  color: #9F9F9F;
  line-height: 11px;
  margin-top: 12px;
}

.setting-label {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #151414;
  line-height: 13px;
}

.name-input {
  width: 100%;
  height: 33px;
  background: #FFFFFF;
  border-radius: 10px;
  // border: 1px solid #EBEBEB;
}

.info-input {
  width: 100%;
  height: 113px;
  background: #FFFFFF;
  border-radius: 10px;
  // border: 1px solid #EBEBEB;
}

:deep(.info-input .el-textarea__inner) {
  height: 113px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #A8A8A8;
  line-height: 11px;
}

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

:deep(.el-input__inner) {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #A8A8A8;
}
</style>