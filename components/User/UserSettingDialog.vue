<template>
  <BaseDialog ref="userSettingRef" :title="'设置'" :width="395" :height="545">
    <div class="w-full flex flex-col items-center">
      <!-- <img class="mt-[16px] settingImg" src="~/assets/head.jpeg" alt="">-->
      <el-upload :action="UPLOAD_URL" class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img class="mt-[16px] settingImg" v-if="userSettingInfo.avatar" :src="userSettingInfo.avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
      <span class="setting-text">点击修改头像</span>
      <div class="w-full flex flex-col mt-[30px]">
        <span class="setting-label">昵称</span>
        <el-input class="name-input mt-[11px]" placeholder="请输入昵称" v-model="userSettingInfo.name"></el-input>
      </div>
      <div class="w-full flex flex-col mt-[15px]">
        <span class="setting-label">简介</span>
        <el-input type="textarea" class="info-input mt-[12px]" placeholder="介绍一下自己"
          v-model="userSettingInfo.sign"></el-input>
      </div>
      <div class="w-full flex justify-between mt-[26px]">
        <div class="cancel-btn" @click="clickCancel">取消</div>
        <div class="save-btn" @click="clickSave">保存</div>
      </div>
    </div>
  </BaseDialog>
</template>

<script lang="ts" setup>
import { Search, Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadRequestOptions, UploadUserFile } from 'element-plus'
const authStore = useAuthStore()
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log('rawFile', rawFile)
  if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('picture size can not exceed 10MB!')
    return false
  }

  return true
}

console.log('userInfo', authStore.userInfo)
const userSettingInfo = ref<{
  name?: string,
  avatar?: string,
  sign?: string
}>({})
watch(() => authStore.userInfo, (val) => {
  userSettingInfo.value = {
    name: val.name,
    avatar: val.avatar,
    sign: val.sign
  }
}, { immediate: true, deep: true })
const userSettingRef = ref()
const runtimeConfig = useRuntimeConfig();
const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log('handleAvatarSuccess', response, uploadFile)
  userSettingInfo.value.avatar = response.data
}

// 通用及漫画模型底图
const UPLOAD_URL = `${runtimeConfig.public.apiBase
  }/api/upload/file`;

const clickCancel = () => {
  if (userSettingRef.value) {
    userSettingRef.value.dialogVisible = false
  }
}

const clickSave = async () => {
  await updateUserInfo({
    name: userSettingInfo.value.name,
    avatar: userSettingInfo.value.avatar,
    sign: userSettingInfo.value.sign
  })
  ElMessage.success('保存成功')
  // 刷新user
  authStore.getUserInfo()
  if (userSettingRef.value) {
    userSettingRef.value.dialogVisible = false
  }
}
defineExpose({ userSettingRef })
</script>

<style lang="scss" scoped>
// .avatar-uploader .avatar {
//   width: 178px;
//   height: 178px;
//   display: block;
// }

.settingImg {
  width: 104px;
  height: 104px;
  background: #F4F4F4;
  border-radius: 50%;
  object-fit: cover;
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

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: black;
  width: 104px;
  height: 104px;
  text-align: center;
}
</style>