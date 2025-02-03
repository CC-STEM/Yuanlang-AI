<template>
  <div class="w-full h-full pl-[44px] pt-[51px]">
    <!-- <el-scrollbar> -->
    <div class="w-full flex pb-[19px] border-b-solid border-b-[1px] border-b-[#262F4E]">
      <img class="w-[100px] h-[100px] rounded-[50%]" :src="userAvatar" alt="头像">
      <div class="flex flex-col h-[100px] justify-around ml-[28px]">
        <span class="username">{{ userInfo.name || userInfo.username }}</span>
        <div class="flex items-center info">
          <span>关注 {{ userDetail?.followCount || 0 }}</span>
          <span class="gutter ml-[33px]"></span>
          <span class="ml-[33px]">粉丝 {{ userDetail?.fansCount || 0 }}</span>
          <span class="gutter ml-[33px]"></span>
          <span class="ml-[33px]">获赞 {{ userDetail?.totalLikes }}</span>
        </div>
        <span class="detail">{{ userInfo.sign }}</span>
      </div>
    </div>
    <div class="w-full h-[calc(100%-119px)] flex">
      <div class="w-[1128px] h-full border-r-solid border-r-[1px] border-r-[#262F4E]">
        <div class="flex mt-[22px]">
          <div class="work cursor-pointer" @click="clickMyWork"
            :style="{ 'border-bottom': isMyWork ? '7px solid #1F2FFF' : 'none' }">
            我的作品</div>
          <div class="work ml-[52px] cursor-pointer" @click="clickMyCollection"
            :style="{ 'border-bottom': !isMyWork ? '7px solid #1F2FFF' : 'none' }">我的收藏</div>
        </div>
        <div class="w-full h-[calc(100%-47px)]">
          <ClientOnly>
            <BScrollBox ref="bs" @pullingUp="pullingUp">
              <Waterfall :gutter="10" :rowKey="'id'" ref="waterfall" :list="globalDrawList" :background-color="'none'"
                :align="'left'" :load-props="loadProps">
                <template #default="{ item, url, index }">
                  <div
                    class="relative rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg group"
                    @click="handleClickImgCard(item)">
                    <LazyImg :url="url" title="title" :alt="item.name"
                      class="cursor-pointer transition-all duration-300 ease-linear group-hover:scale-110 rounded-[20px]" />
                    <ImgUser class="absolute bottom-0" :name="item.user.name" :head="item.user.head"
                      :liked="item.likedCount" />
                  </div>
                </template>
              </Waterfall>
            </BScrollBox>
          </ClientOnly>
          <!-- <el-scrollbar class="h-full">
              <div class="flex flex-wrap mt-[23px] justify-between pr-[43px]">
                <ImgCard class="w-[260px] h-[346px] " v-for="item in 13" :url="DemoImg" />
              </div>
            </el-scrollbar> -->
        </div>
      </div>
      <div class="w-[calc(100%-1128px)] h-full">
        <UserAssets />
      </div>
    </div>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script lang="ts" setup>
useHead({
  script: [
    {
      type: "text/javascript",
      src: 'https://unpkg.com/better-scroll@latest/dist/better-scroll.min.js'
    }
  ]
})
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'

import DemoImg from '~/assets/img1.jpeg'
import DefaultAvatar from '~/assets/cclogo.png'

import { useCounterStore } from '../composables/counter';
import type { UserDetail } from '../types'
import ImgError from '~/assets/error.png'
import ImgLoading from '~/assets/loading.png'


const authStore = useAuthStore()
const userInfo = computed(() => authStore.userInfo)
const userAvatar = computed(() => userInfo.value.avatar || DefaultAvatar)
const userDetail = ref<UserDetail | null>(null)
const bs = ref<any>(null)
const router = useRouter()


const isMyWork = ref(true)

const pageOptions = ref({
  page: 1,
  size: 10
})

const loadProps = {
  loading: ImgLoading,
  error: ImgError,
  // ratioCalculator: (width: number, height: number) => {
  //   // 我设置了最小宽高比
  //   const minRatio = 1.78
  //   const maxRatio = 2
  //   // 获取当前图片的比例
  //   const curRatio = height / width;
  //   console.log('width height curRatio', width, height, curRatio)
  //   // 如果当前图片比列不在此范围内，我们取最小或者最大值
  //   if (curRatio < minRatio) {
  //     return minRatio;
  //   } else if (curRatio > maxRatio) {
  //     return maxRatio;
  //   } else {
  //     return curRatio;
  //   }
  //   // return curRatio
  // },
}

const globalDrawList = ref<{
  src: string;
  name: string;
  user: {
    name: string;
    head: string;
  }
}[]>([])

async function pullingUp() {
  pageOptions.value.page += 1
  await fetchGlobalDrawList()
  if (bs.value)
    bs.value.finishPullUp()
}

const fetchGlobalDrawList = async () => {
  if (!userInfo.value.id) {
    return
  }
  const res = isMyWork.value ? (await batchGetFinishedDrawInfoByUser(userInfo.value.id, pageOptions.value.page, pageOptions.value.size)) : (await batchGetCollectedDrawInfoByUser(userInfo.value.id, pageOptions.value.page, pageOptions.value.size))
  globalDrawList.value.push(...(res.data.list.map(item => ({
    src: item.qcloud_cos_url || item.wujie_picture_url || '',
    name: item.key!,
    likedCount: item.likedCount || 0,
    user: {
      name: item.user?.name || '',
      head: item.user?.head || ''
    }
  }))))
}

const handleClickImgCard = (item: any) => {
  if (!authStore.isLogin) {
    authStore.setLoginDialog(true)
  }

  // 跳转详情页
  router.push({
    path: '/detail',
    query: {
      key: item.name
    }
  })
}

const clickMyWork = async () => {
  if (isMyWork.value) {
    return
  }

  isMyWork.value = true
  pageOptions.value.page = 1
  globalDrawList.value = []
  await fetchGlobalDrawList()
}

const clickMyCollection = async () => {
  if (!isMyWork.value) {
    return
  }

  isMyWork.value = false
  pageOptions.value.page = 1
  globalDrawList.value = []
  await fetchGlobalDrawList()
}

watch(() => userInfo.value.id, async (newVal) => {
  if (newVal) {
    const { data, code } = await getUserDetail(newVal)
    console.log('getUserDetail', data)
    userDetail.value = data
    await fetchGlobalDrawList()
  }
}, { immediate: true })
</script>

<style scoped lang="scss">
.gutter {
  width: 1px;
  height: 14px;
  background: #E2E2E2;
}

.username {
  line-height: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 18px;
  color: #FFFFFF;
}

.info {
  line-height: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
}

.detail {
  line-height: 11px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #FFFFFF;
}

.work {
  line-height: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 18px;
  color: #FFFFFF;
  border-bottom: 7px solid #1F2FFF
}
</style>