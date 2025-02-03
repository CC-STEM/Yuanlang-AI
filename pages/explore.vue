<template>
  <div class="w-full h-full pr-[47px] pt-[30px]">
    <div class="h-[78px] w-full flex items-center">
      <div class="w-[calc(100%-139px)]">
        <div class="h-[30px] w-full mt-[9px] mb-[9px] flex">
          <div v-bind:key="index" @click="handleClickOption1(item)"
            :class="'tag ' + (curSelectedFilterOption1 === item ? 'selected' : '')"
            v-for="(item, index) in mockFilterOptions1">{{ item }}</div>
        </div>
        <div class="h-[30px] w-full mt-[9px] mb-[9px] flex">
          <div v-bind:key="index" @click="handleClickOption2(item)"
            :class="'tag ' + (curSelectedFilterOption2 === item ? 'selected' : '')"
            v-for="(item, index) in mockFilterOptions2">{{ item }}</div>
        </div>
      </div>
      <div class="w-[1px] h-[58px] bg-[#2B4187] mr-[30px]"></div>
      <div @click="handleClickExpandSortOption"
        class="relative w-[108px] h-[64px] bg-[#1F2FFF] rounded-[15px] bg-opacity-[.45] flex items-center justify-center sortTxt">
        排序
        <div v-show="expandSortOption"
          class="absolute w-[108px] h-[145px] bg-[#000000] rounded-[15px] bottom-[-145px] z-[10] flex flex-col items-center justify-around sortOption">
          <span>最新</span>
          <span>点击量</span>
          <span>收藏数</span>
          <span>种草下单</span>
        </div>
      </div>
    </div>
    <div class="h-[calc(100%-78px)] w-full">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
// useHead({
//   script: [
//     {
//       type: "text/javascript",
//       src: 'https://unpkg.com/better-scroll@latest/dist/better-scroll.min.js'
//     }
//   ]
// })

import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import Img1 from '~/assets/img1.jpeg'
import ImgError from '~/assets/error.png'
import ImgLoading from '~/assets/loading.png'

const router = useRouter()
const authStore = useAuthStore()
const expandSortOption = ref(false)
const waterfall = ref(null)
const mockFilterOptions1 = [
  '全部', '个性化杯子', '流行风', '复古风', '高原风'
]

const mockFilterOptions2 = [
  '全部', '个性化杯子', '流行风', '复古风', '高原风', '动漫风'
]

const curSelectedFilterOption1 = ref('全部')
const curSelectedFilterOption2 = ref('全部')

const bs = ref<any>(null)
const pageOptions = ref({
  page: 1,
  size: 20
})

const globalDrawList = ref<{
  src: string;
  name: string;
  user: {
    name: string;
    head: string;
  }
}[]>([])

onMounted(() => {
  fetchGlobalDrawList()
})

const fetchGlobalDrawList = async () => {
  const res = await getGlobalDrawTasks(pageOptions.value.page, pageOptions.value.size)
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

async function pullingUp() {
  pageOptions.value.page += 1
  await fetchGlobalDrawList()
  if (bs.value)
    bs.value.finishPullUp()
}

const handleClickOption1 = (option: string) => {
  curSelectedFilterOption1.value = option
}

const handleClickOption2 = (option: string) => {
  curSelectedFilterOption2.value = option
}

const handleClickExpandSortOption = () => {
  expandSortOption.value = !expandSortOption.value
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


</script>

<style lang="scss" scoped>
.tag {
  width: 108px;
  height: 30px;
  background: #000000;
  border-radius: 15px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.selected {
  background: #1F2FFF;
}

.sortTxt {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
}

.animate__animated {
  animation-fill-mode: both;
  animation-duration: 1s;
}

.card {
  // cursor: pointer;
}

.sortOption {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #FFFFFF;

  span {
    cursor: pointer;
  }
}
</style>