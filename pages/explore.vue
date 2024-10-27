<template>
  <div class="w-full h-full pr-[47px] pt-[30px]">
    <div class="h-[78px] w-full flex items-center">
      <div class="w-[calc(100%-139px)]">
        <div class="h-[30px] w-full mt-[9px] mb-[9px] flex">
          <div @click="handleClickOption1(item)" :class="'tag ' + (curSelectedFilterOption1 === item ? 'selected' : '')"
            v-for="item in mockFilterOptions1">{{ item }}</div>
        </div>
        <div class="h-[30px] w-full mt-[9px] mb-[9px] flex">
          <div @click="handleClickOption2(item)" :class="'tag ' + (curSelectedFilterOption2 === item ? 'selected' : '')"
            v-for="item in mockFilterOptions2">{{ item }}</div>
        </div>
      </div>
      <div class="w-[1px] h-[58px] bg-[#2B4187] mr-[30px]"></div>
      <div
        class="w-[108px] h-[64px] bg-[#1F2FFF] rounded-[15px] bg-opacity-[.45] flex items-center justify-center sortTxt">
        排序
      </div>
    </div>
    <div class="h-[calc(100%-78px)] w-full">
      <ClientOnly>
        <el-scrollbar>
          <Waterfall :gutter="10" :rowKey="'id'" ref="waterfall" :list="mockImgList" :background-color="'none'"
            :align="'right'" :load-props="loadProps">
            <template #default="{ item, url, index }">
              <div
                class="relative rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-linear hover:shadow-lg group"
                @click="() => { }">
                <!-- <div class="overflow-hidden"> -->
                <LazyImg :url="url" title="title" :alt="item.name"
                  class="cursor-pointer transition-all duration-300 ease-linear group-hover:scale-110" />
                <!-- </div> -->
                <ImgUser class="absolute bottom-0" />
              </div>
            </template>
          </Waterfall>
        </el-scrollbar>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import Img1 from '~/assets/img1.jpeg'
import Img2 from '~/assets/img2.jpeg'
import Img3 from '~/assets/img3.jpeg'
import Img4 from '~/assets/img4.jpeg'
import Img5 from '~/assets/img5.jpeg'
import Img6 from '~/assets/img6.jpeg'
import Img7 from '~/assets/img7.jpeg'
import Img8 from '~/assets/img8.jpeg'
import Img9 from '~/assets/img9.jpeg'
import Img10 from '~/assets/img10.jpeg'
import Img11 from '~/assets/img11.jpeg'
import Img12 from '~/assets/img12.jpeg'
import Img13 from '~/assets/img13.jpeg'
import Img14 from '~/assets/img14.jpeg'
import ImgError from '~/assets/error.png'
import ImgLoading from '~/assets/loading.png'

const waterfall = ref(null)
const mockFilterOptions1 = [
  '全部', '个性化杯子', '流行风', '复古风', '高原风'
]

const mockFilterOptions2 = [
  '全部', '个性化杯子', '流行风', '复古风', '高原风', '动漫风'
]

const curSelectedFilterOption1 = ref('全部')
const curSelectedFilterOption2 = ref('全部')

const handleClickOption1 = (option: string) => {
  curSelectedFilterOption1.value = option
}

const handleClickOption2 = (option: string) => {
  curSelectedFilterOption2.value = option
}

const mockImgList = [{
  id: 13,
  src: Img13,
  name: 'fjdk fkdsjfksal fdsakjfjs'
}, {
  id: 1,
  src: Img1,
  name: 'fjdk fkdsjfksal fdsakjfjs'
}
  , {
  id: 2,
  src: Img2,
  name: 'fskfj'
},
{
  id: 3,
  src: Img3,
  name: 'fsjdkajfksjfsdjfkljsdklfjsafjklsjljs'
},
{
  id: 11,
  src: Img11,
  name: 'fsjdkajfksjfsdjfkljsdklfjsafjklsjljs'
},
{
  id: 4,
  src: Img4
},
{
  id: 5,
  src: Img5
},
{
  id: 12,
  src: Img12,
},
{
  id: 6,
  src: Img6
},
{
  id: 7,
  src: Img7
},
{
  id: 8,
  src: Img8
},
{
  id: 14,
  src: Img14,
  name: 'fjdk fkdsjfksal fdsakjfjs'
},
{
  id: 9,
  src: Img9
},
{
  id: 10,
  src: Img10
}
]

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
</style>