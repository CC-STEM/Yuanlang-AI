<template>
  <div class="w-full h-full flex">
    <div class="h-full relative"
      style="width: 70%;background: linear-gradient(90deg, rgb(20, 20, 22) 0%, rgb(30, 31, 33) 100%)">
      <img class="w-full h-full object-contain" v-if="curDrawDetail"
        :src="curDrawDetail.qcloud_cos_url || curDrawDetail.wujie_picture_url" alt="">
      <Icon @click="clickReturn" name="streamline:return-2"
        style="cursor: pointer;color: white;position: absolute; top: 10px;right: 10px;font-size: 28px" />
      <Icon name="material-symbols:ink-pen-outline" width="24" height="24"
        style="cursor: pointer;color: white;position: absolute; top: 60px;right: 10px;font-size: 28px"
        @click="handleClickRealCreate" />
    </div>
    <div class="h-full ml-[20px] mr-[20px] relative" style="width: 30%">
      <template v-if="curDrawDetail">
        <div class="w-full h-[calc(100%-80px)]">
          <el-scrollbar>
            <div class="w-full h-[60px] mb-[16px] flex justify-between items-center pl-[12px] pr-[12px]">
              <div class="h-[52px] flex items-center">
                <img class="h-full mr-[10px]" :src="curDrawDetail.user.head" alt="">
                <span class="text-white text-[18px]">{{ curDrawDetail.user.name }}</span>
              </div>
              <div
                class="w-[100px] h-[32px] rounded-[50px] bg-[#FFD925] flex items-center justify-center text-[14px] cursor-pointer"
                @click="clickFollow">
                {{ curDrawDetail.isFollow ? '已关注' : '关注' }}
              </div>
            </div>
            <div class="mb-[16px] text-white pl-[12px]">{{ curDrawDetail.input_model_prompt }}
            </div>
            <div class="w-full mt-[16px] p-[12px] rounded-2xl bg-[#23262f]">
              <div class="flex items-center w-[calc(100%-24px)] h-[50px] border-b border-[#353945] text-white">
                英文 Prompt
              </div>
              <div class="w-[calc(100%-24px)] min-h-10 text-white mt-[10px]">
                {{ curDrawDetail.model_prompt }}
              </div>
            </div>
            <div class="w-full mt-[16px] p-[12px] rounded-2xl bg-[#23262f]" v-if="curDrawInfo">
              <div class="flex items-center w-[calc(100%-24px)] h-[50px] border-b border-[#353945] text-white">
                创作信息
              </div>
              <div class="w-[calc(100%-24px)]  min-h-10 text-white mt-[10px] flex flex-col">
                <div class="w-full flex justify-between m-[10px]">
                  <span>模型类型</span>
                  <span>{{ curDrawInfo.type }}</span>
                </div>
                <div class="w-full flex justify-between m-[10px]">
                  <span>图片宽度</span>
                  <span>{{ curDrawInfo.width }}</span>
                </div>
                <div class="w-full flex justify-between  m-[10px]">
                  <span>图片高度</span>
                  <span>{{ curDrawInfo.height }}</span>
                </div>
                <div class="w-full flex justify-between  m-[10px]">
                  <span>完成时间</span>
                  <span>{{ new Date(curDrawInfo.complete_time * 1000).toLocaleString() }}</span>
                </div>
                <div class="w-full flex justify-between  m-[10px]">
                  <span>积分消耗</span>
                  <span>{{ curDrawInfo.integral_cost }}</span>
                </div>
              </div>
            </div>
            <div class="w-full mt-[16px] p-[12px] rounded-2xl bg-[#23262f]">
              <div class="flex items-center w-[calc(100%-24px)] h-[50px] border-b border-[#353945] text-white">
                我的评论
              </div>
              <div class="w-[calc(100%)] min-h-10 text-white mt-[10px]">
                <el-input v-model="myComment" style="width: 100%" :rows="2" type="textarea"
                  placeholder="Please input" />
              </div>
            </div>
            <div class="w-full mt-[16px] p-[12px] rounded-2xl bg-[#23262f]">
              <div class="flex items-center w-[calc(100%-24px)] h-[50px] border-b border-[#353945] text-white">
                评论区
              </div>
              <div class="w-[calc(100%)] min-h-10 text-white mt-[10px]">
                <div class="w-full flex mb-[10px]" v-for="(item, index) in comments" :key="index">
                  <img
                    class="mr-[20px] w-[60px] h-[60px] mr-[10px] rounded-[50px] border-[1px] border-solid border-[#353945]"
                    :src="item.user.head || DefaultAvatar" alt="">
                  <div class="flex flex-col">
                    <span class="mb-[2px] text-[18px] font-[500]">{{
                      item.user.name }}</span>
                    <span class="mb-[2px]">{{ item.content }}</span>
                    <span class="text-[14px] text-[#9499A0]">{{ new Date(item.createdAt).toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </template>
      <div
        class="absolute w-full h-[68px] rounded-full bg-[#23262f] bottom-0 flex items-center justify-between p-[12px]">
        <div class="w-[30%] flex">
          <div class="w-[50%] flex flex-col items-center">
            <Icon name="mdi:cards-heart"
              :style="{ color: curDrawDetail?.isLike ? 'red' : 'white', fontSize: '26px', cursor: 'pointer' }"
              @click="clickLike" />
            <span class="text-white text-[14px] font-bold">{{ curDrawDetail?.likedCount || '' }}</span>
          </div>
          <div class="w-[50%] flex flex-col items-center">
            <Icon name="mdi:star"
              :style="{ color: curDrawDetail?.isCollect ? 'red' : 'white', fontSize: '26px', cursor: 'pointer' }"
              @click="clickCollect" />
            <span class="text-white text-[14px] font-bold">{{ curDrawDetail?.collectedCount || '' }}</span>
          </div>
        </div>
        <div
          class="w-[60%] h-full bg-[#FFD925] rounded-[50px] flex items-center justify-center text-[18px] cursor-pointer"
          @click="clickComment">
          发表评论
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DrawTaskDetailItemByUser, DrawTaskInfo, DrawCommentItem } from '../types'
import DefaultAvatar from '~/assets/cclogo.png'

const route = useRoute()
const router = useRouter()
const curDrawDetail = ref<DrawTaskDetailItemByUser | null>(null)
const curDrawInfo = ref<DrawTaskInfo | null>(null)
const authStore = useAuthStore()
const userInfo = computed(() => authStore.userInfo)
const myComment = ref('')
const comments = ref<DrawCommentItem[]>([])

const clickFollow = async () => {
  console.log('follow userInfo', userInfo.value)
  if (!curDrawDetail.value) return
  if (!userInfo.value.id) {
    ElMessage.error('请先登录')
    return
  }
  const { code, message } = curDrawDetail.value.isFollow ? (await unfollowUser({ sourceType: 'user', targetType: 'user', sourceId: userInfo.value.id, targetId: curDrawDetail.value.user.id })) : (await followUser({ sourceType: 'user', targetType: 'user', sourceId: userInfo.value.id, targetId: curDrawDetail.value.user.id }))
  console.log('followUser', code, message)
  curDrawDetail.value.isFollow = !curDrawDetail.value.isFollow
}

const clickLike = async () => {
  if (!curDrawDetail.value) return
  if (!userInfo.value.id) {
    ElMessage.error('请先登录')
    return
  }
  const { code, message } = curDrawDetail.value.isLike ? (await dislikeDraw({ sourceType: 'user', targetType: 'wujie', sourceId: userInfo.value.id, targetId: curDrawDetail.value.id })) : (await likeDraw({ sourceType: 'user', targetType: 'wujie', sourceId: userInfo.value.id, targetId: curDrawDetail.value.id }))
  console.log('likeDrawTask', code, message)
  curDrawDetail.value.isLike = !curDrawDetail.value.isLike
  curDrawDetail.value.likedCount += curDrawDetail.value.isLike ? 1 : -1
}

const clickCollect = async () => {
  if (!curDrawDetail.value) return
  if (!userInfo.value.id) {
    ElMessage.error('请先登录')
    return
  }
  const { code, message } = curDrawDetail.value.isCollect ? (await uncollectDraw({ sourceType: 'user', targetType: 'wujie', sourceId: userInfo.value.id, targetId: curDrawDetail.value.id })) : (await collectDraw({ sourceType: 'user', targetType: 'wujie', sourceId: userInfo.value.id, targetId: curDrawDetail.value.id }))
  console.log('collectDrawTask', code, message)
  curDrawDetail.value.isCollect = !curDrawDetail.value.isCollect
  curDrawDetail.value.collectedCount += curDrawDetail.value.isCollect ? 1 : -1
}

const clickReturn = () => {
  router.back()
}

const handleClickRealCreate = () => {
  if (!curDrawDetail.value?.qcloud_cos_url && !curDrawDetail.value?.wujie_picture_url) {
    ElMessage.error("请先选择一张图片")
    return
  }
  router.push({
    path: '/realCreate',
    query: {
      src: encodeURIComponent(curDrawDetail.value?.qcloud_cos_url || curDrawDetail.value?.wujie_picture_url || '')
    }
  })
}

const clickComment = async () => {
  if (!myComment.value) {
    ElMessage.error('请输入评论内容')
    return
  }

  if (!userInfo.value.id) {
    ElMessage.error('请先登录')
    return
  }

  if (!curDrawDetail.value) {
    ElMessage.error('请先选择一张图片')
    return
  }

  const { code, message } = await commentDraw({ sourceType: 'user', sourceId: userInfo.value.id, targetType: 'wujie', targetId: curDrawDetail.value?.id, actionContent: myComment.value })
  console.log('commentDraw', code, message)
  await fetchComments()
}

const fetchComments = async () => {
  if (!curDrawDetail.value) return
  const { data } = await getDrawComments(curDrawDetail.value.id)
  console.log('getDrawComments', data)
  comments.value = data.list
}

watch(() => route.query.key, async (newVal) => {
  // curImg.value = id
  const { data } = await getDrawDetailByKey(newVal as string)
  console.log('getDrawDetailByKey', data)
  curDrawDetail.value = data

  const { data: drawInfo } = await getDrawTaskInfo(newVal as string)
  console.log('getDrawTaskInfo', drawInfo)
  curDrawInfo.value = drawInfo

  await fetchComments()
}, {
  immediate: true
})


</script>

<style scoped lang="scss">
:deep(.el-textarea__inner) {
  background: none;
  color: white;
}
</style>