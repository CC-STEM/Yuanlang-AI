<template>
  <el-scrollbar>
    <div class="w-full h-full flex justify-center">
      <div class="w-[80%] h-full pt-[20px] flex justify-between">
        <div class="w-[50%] pl-[20px] pr-[20px] relative">
          <div class="h-[50px] w-full flex justify-between items-center text-white mb-[40px]">
            <span class="create-title">绘画创作</span>
            <div class="flex">
              <span tabindex="1" class="title-btn mr-[20px]">1000 积分</span>
              <span tabindex="2" class="title-btn">我的创作</span>
            </div>
          </div>
          <div class="w-full mb-[20px]">
            <div class="h-[24px] text-left text-white">* 模型选择</div>
            <div class="h-[112px] flex justify-start items-center pt-[4px] pb-[4px]">
              <div :tabindex="index"
                :style="{ border: selectedModelType.value === item.value ? '2px solid rgb(177, 181, 196)' : '2px solid rgb(35, 38, 47)' }"
                class="model-item flex flex-col items-center text-[12px] justify-around"
                v-for="(item, index) in modelTypes" @click="selectModelType(item)">
                <span class="text-white ">{{ item.name }}</span>
              </div>
            </div>
          </div>
          <div class="w-full mb-[40px]">
            <div class="w-full text-left text-white mb-[8px]">* 模型主题选择</div>
            <!-- <div class="w-full mb-[20px]">
              <el-radio-group v-model="curModelStyle" size="default">
                <el-radio-button v-for="item in modelStyleList" :label="item" :value="item" />
              </el-radio-group>
            </div> -->
            <div class="w-full flex flex-wrap">
              <div @click="selectModel(item)" class="model-theme-item flex justify-center items-center text-white"
                :style="{ border: selectedModel === item ? '2px solid rgb(177, 181, 196)' : '2px solid rgb(35, 38, 47)' }"
                :tabindex="index" v-for="(item, index) in modelList">
                {{ item.model_desc }}</div>
            </div>
          </div>
          <div class="w-full mb-[40px]">
            <div class="h-[30px] mb-[8px] flex justify-between items-center">
              <span class="text-white">* 画面描述</span>
              <span
                class="relative bg-[#23262f] text-xs font-semibold py-1 px-3 rounded-full text-white cursor-pointer">标签生成器</span>
            </div>
            <div class="w-full mb-[40px]">
              <el-input :maxlength="1000" :autosize="{ minRows: 4 }" :show-word-limit="true" v-model="promptStr"
                style="width: 100%" :rows="4" type="textarea" resize="none" placeholder="请输入咒语" />
            </div>
            <div class="h-[30px] mb-[8px] flex justify-between items-center">
              <span class="text-white">负面描述 (描述不需要在图片里看到的内容)</span>
            </div>
            <div class="w-full mb-[40px]">
              <el-input :maxlength="1000" :autosize="{ minRows: 4 }" :show-word-limit="true" v-model="negativePromptStr"
                style="width: 100%" :rows="4" type="textarea" resize="none" placeholder="请输入描述内容" />
            </div>
            <div class="w-full mb-[30px]">
              <div class="w-full text-left text-white mb-[8px]">* 画面大小</div>
              <div class="w-full flex h-[94px] mb-[20px]">
                <div :tabindex="index" v-for="(item, index) in resolutionRatios"
                  class="ratio-item flex flex-col items-center justify-around text-white"
                  :style="{ border: selectedRatio === item ? '2px solid rgb(177, 181, 196)' : 'none' }"
                  @click="selectRatio(item)">
                  <span>{{ item }}</span>
                  <span>{{ RESOLUTION_RATIO_CN_MAP[item as keyof typeof RESOLUTION_RATIO_CN_MAP] }}</span>
                </div>
              </div>
              <div class="w-full flex h-[40px]">
                <div :tabindex="index" v-for="(item, index) in resolutions"
                  class="resolute-item flex items-center justify-center text-white"
                  :style="{ border: selectedResolution === item ? '2px solid rgb(177, 181, 196)' : 'none' }"
                  @click="selectResolution(item)">
                  <span>{{ item.display_resolution }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full flex justify-between items-center mb-[40px]">
            <span class="text-white text-[14px]">作图数量</span>
            <el-input-number
              v-if="selectedModelType.value === MODEL_TYPE_VALUE_MAP.GENERAL_MODEL_TYPE || selectedModelType.value === MODEL_TYPE_VALUE_MAP.COMIC_MODEL_TYPE"
              v-model="createNum" :min="1" :max="10" @change="" style="width: 130px;margin-right: 12px" />
            <el-input-number v-if="selectedModelType.value === MODEL_TYPE_VALUE_MAP.MJ_MODEL_TYPE" v-model="createNum"
              :min="4" :max="4" :step="4" @change="" style="width: 130px;margin-right: 12px" />
          </div>
          <div class="w-full mb-[30px]">
            <div class="w-full flex items-center justify-between text-white mb-[40px]"><span>高级设置</span>
              <el-switch v-model="openAdvancedSetting" />
            </div>
            <template v-if="openAdvancedSetting">
              <template
                v-if="selectedModelType.value === MODEL_TYPE_VALUE_MAP.COMIC_MODEL_TYPE || selectedModelType.value === MODEL_TYPE_VALUE_MAP.GENERAL_MODEL_TYPE">
                <div class="w-full flex flex-col">
                  <span class="text-white mb-[8px]">参考图</span>
                  <el-upload :action="UPLOAD_URL" class="avatar-uploader mb-[30px]" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                      <Plus />
                    </el-icon>
                  </el-upload>
                </div>
                <CreateModuleResourceSelector ref="imageTypeSelectorRef" :outerTitle="'画面类型选择'" :drawerTitle="'画面选择器'"
                  :resource-options="imageOptions" />
                <CreateModuleResourceSelector ref="styleSelectorRef" :outerTitle="'风格类型选择'" :drawerTitle="'风格选择器'"
                  :resource-options="styleOptions" />
                <CreateModuleResourceSelector ref="artistSelectorRef" :outerTitle="'艺术家类型选择'" :drawerTitle="'艺术家选择器'"
                  :resource-options="artistOptions" />
                <CreateModuleResourceSelector ref="elementMagicSelectorRef" :outerTitle="'元素魔法类型选择'"
                  :drawer-title="'元素魔法选择器'" :resource-options="elementMagicOptions" />
                <CreateModuleResourceSelector ref="styleDecorationSelectorRef" :outerTitle="'风格修饰类型选择'"
                  :drawer-title="'风格修饰选择器'" :resource-options="styleDecorationOptions" />
                <CreateModuleResourceSelector ref="characterSelectorRef" :outerTitle="'角色与人物类型选择'"
                  :drawer-title="'角色与人物选择器'" :resource-options="characterOptions" />
                <CreateFusionModelSelector ref="fusionModelSelectorRef" :resource-options="modelFusionOptions" />
                <div class="w-full mb-[40px] flex flex-col randomBox p-[12px]">
                  <span class="text-[12px] mb-[8px] text-white">随机种子</span>
                  <el-input style="margin-bottom: 10px;" v-model="uniqueCreateNum" placeholder="请输入随机种子"></el-input>
                  <div class="flex justify-between items-center mb-[14px]">
                    <span class="text-white text-[12px]">提示词相关性</span>
                    <el-slider style="width: 80%" v-model="CFGScale" show-input />
                  </div>
                  <!-- <div class="flex justify-between items-center mb-[14px]">
                    <span class="text-white text-[12px]">风格参数</span>
                    <el-slider style="width: 80%" v-model="stylize" show-input />
                  </div>
                  <div class="flex justify-between items-center mb-[14px]">
                    <span class="text-white text-[12px]">混沌参数</span>
                    <el-slider style="width: 80%" v-model="chaos" show-input />
                  </div> -->
                </div>
              </template>
              <template v-if="selectedModelType.value === MODEL_TYPE_VALUE_MAP.MJ_MODEL_TYPE">
                <div class="w-full flex flex-col">
                  <span class="text-white mb-[8px]">风格参考图</span>
                  <el-upload :action="UPLOAD_URL" class="avatar-uploader mb-[30px]"
                    v-model:file-list="styleRefImageUrls" :on-success="handleAddStyleReImgSuccess"
                    :before-upload="beforeAvatarUpload" :on-remove="handleStyleRefImgRemove" list-type="picture-card">
                    <el-icon class="avatar-uploader-icon">
                      <Plus />
                    </el-icon>
                  </el-upload>
                </div>
                <div class="w-full flex flex-col">
                  <span class="text-white mb-[8px]">角色参考图</span>
                  <el-upload :action="UPLOAD_URL" class="avatar-uploader mb-[30px]"
                    v-model:file-list="characterRefImageUrls" :on-success="handleAddCharacterReImgSuccess"
                    :before-upload="beforeAvatarUpload" :on-remove="handleCharacterRefImgRemove"
                    list-type="picture-card">
                    <el-icon class="avatar-uploader-icon">
                      <Plus />
                    </el-icon>
                  </el-upload>
                </div>
                <div class="w-full mb-[40px] flex flex-col randomBox p-[12px]">
                  <!-- <span class="text-[12px] mb-[8px] text-white">随机种子</span>
                  <el-input style="margin-bottom: 10px;" v-model="uniqueCreateNum" placeholder="请输入随机种子"></el-input> -->
                  <div class="flex justify-between items-center mb-[14px]">
                    <span class="text-white text-[12px]">提示词相关性</span>
                    <el-slider style="width: 80%" v-model="CFGScale" show-input />
                  </div>
                  <div class="flex justify-between items-center mb-[14px]">
                    <span class="text-white text-[12px]">风格参考权重</span>
                    <el-slider style="width: 80%" v-model="stylizeWeight" show-input />
                  </div>
                  <div class="flex justify-between items-center mb-[14px]">
                    <span class="text-white text-[12px]">角色参考权重</span>
                    <el-slider style="width: 80%" v-model="characterWeight" show-input />
                  </div>
                  <div class="flex justify-between items-center mb-[14px]">
                    <span class="text-white text-[12px]">风格差异化</span>
                    <el-slider style="width: 80%" v-model="chaos" show-input />
                  </div>
                  <div class="flex justify-between items-center mb-[14px]">
                    <span class="text-white text-[12px]">风格艺术化</span>
                    <el-slider style="width: 80%" v-model="stylize" show-input />
                  </div>
                  <div class="flex justify-between items-center mb-[14px]">
                    <span class="text-white text-[12px]">QUALITY</span>
                    <el-radio-group v-model="quality">
                      <el-radio-button label="0.5" value="0.5" />
                      <el-radio-button label="1" value="1" />
                      <el-radio-button label="2" value="2" />
                    </el-radio-group>
                  </div>
                  <div class="flex justify-between items-center mb-[14px]">
                    <span class="text-white text-[12px]">UPBETA</span>
                    <el-radio-group v-model="upbeta">
                      <el-radio-button label="是" :value="true" />
                      <el-radio-button label="否" :value="false" />
                    </el-radio-group>
                  </div>
                  <div class="flex justify-between items-center mb-[14px]">
                    <span class="text-white text-[12px]">TILE</span>
                    <el-radio-group v-model="tile">
                      <el-radio-button label="是" :value="true" />
                      <el-radio-button label="否" :value="false" />
                    </el-radio-group>
                  </div>
                </div>
              </template>
            </template>
          </div>
          <div class="createWorkBtn flex items-center justify-center z-[99]" @click="createAI"><span>立即生成</span></div>
        </div>
        <div class="w-[50%] h-full">
          <div class="w-full h-[700px] bg-[#23262f] relative  rounded-[8px] mb-[10px]">
            <template v-if="selectedArtwork">
              <template v-if="selectedArtwork.status === ARTWORK_CREATE_SUCCESS && selectedArtwork.picture_url">
                <img class="w-full h-full object-cover" :src="selectedArtwork.picture_url" alt="" />
              </template>
              <template v-else>
                <ClientOnly>
                  <CreateLoading :size="'large'" />
                </ClientOnly>
              </template>
            </template>
          </div>
          <div class="w-full grid grid-cols-5 grid-rows-5 gap-[10px]">
            <template v-for="item in artworkInfoList">
              <div class="w-[130px] h-[130px] relative rounded-[8px] overflow-hidden" :style="{
                border: selectedArtwork === item ? '2px solid rgb(177, 181, 196)' : '0px'
              }" @click="selectArtwork(item)">
                <template v-if="item.status === ARTWORK_CREATE_SUCCESS && item.picture_url">
                  <img class="w-full h-full object-cover " :src="item.picture_url" alt="">
                </template>
                <template v-else>
                  <ClientOnly>
                    <CreateLoading :size="'small'" />
                  </ClientOnly>
                </template>
              </div>
            </template>
          </div>
          <div class="w-full flex justify-end">
            <el-pagination v-if="getArtworkHistoryListData && getArtworkHistoryListData.data.total! > 0" size="small"
              background layout="total,prev, pager, next" :total="getArtworkHistoryListData.data.total" class="mt-4"
              :current-page="artworksPageOption.page_num" :page-size="artworksPageOption.page_size"
              @current-change="handleCurrentChange" />
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>

</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'

import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadRequestOptions, UploadUserFile } from 'element-plus'
import type { GetModuleResourceInfoRes, CreateOptionWithPicResponse, CreateOptionResolutionResponse, SimpleOptionResponse, CreateOptionWithDecorationResponse, ResourceOption, ModelFusionTypeOption, DefaultAICreateRequest, MJAICreateRequest, AiArtworkGenerateingInfoVoResponse, GetAiArtWorkHistoryResponse } from '../types'
import { modelFusionOptionsKey } from '@/utils'

// 我的作品集相关
const artworkInfoList = ref<AiArtworkGenerateingInfoVoResponse[]>([])
const artworksPageOption = ref({
  page_size: 25,
  page_num: 1,
  ai_artwork_type: 'PICTURE'
})

const artWorksQueryBody = computed(() => ({
  page_size: artworksPageOption.value.page_size,
  page_num: artworksPageOption.value.page_num - 1,
  ai_artwork_type: artworksPageOption.value.ai_artwork_type
}))

const handleCurrentChange = (pageNum: number) => {
  artworksPageOption.value.page_num = pageNum;
}

const runtimeConfig = useRuntimeConfig();

// 1.模型大类选择
const modelTypes = ref(MODEL_TYPE_LIST)
const selectedModelType = ref(modelTypes.value[0])
const selectModelType = (item: typeof MODEL_TYPE_LIST[number]) => {
  selectedModelType.value = item
}

// 2.模型主题选择
const { data: modelTypeList, status, error } = getModelInfo()
console.log(modelTypeList, status, error)
// 根据当前模型类型计算模型列表
const modelList = computed(() => {
  if (modelTypeList.value?.data) {
    return modelTypeList.value.data.filter(item => item.type === selectedModelType.value.value) || []
  }
  return []
})

const selectedModel = ref()
watch(modelList, (newVal, oldVal) => {
  console.log('modelList', newVal, oldVal)
  if ((oldVal && oldVal.length === 0) && newVal.length > 0) {
    selectedModel.value = newVal[0]
  }
}, { immediate: true })

const selectModel = (item: typeof modelList.value[number]) => {
  // ElMessage.success('选择成功')
  selectedModel.value = item
}

// 根据模型主题拉取资源选项
const { data: getModuleResourceInfoData, status: getModuleResourceInfoStatus, error: getModuleResourceInfoError } = useLazyFetch<GetModuleResourceInfoRes>(
  () => `/api/wujie/getResourseModule?model=${selectedModel.value?.model_code}`,
  {
    baseURL: runtimeConfig.public.apiBase,
    pick: ["data"],
    immediate: false
  }
);

// 查询所有历史作画任务ID
const { data: getArtworkHistoryListData, status: getArtworkHistoryListStatus, error: getArtworkHistoryListError, refresh: getArtworkHistoryListRefresh } = useFetch<GetAiArtWorkHistoryResponse>(
  `/api/wujie/getDrawList`,
  {
    baseURL: runtimeConfig.public.apiBase,
    body: artWorksQueryBody,
    method: "POST",
  }
)

const fetchArtworkHistoryListByKeys = async (keys: string[]) => {
  const { data, code, message } = await getArtworkHistoryDetailList(keys)
  let dataList: AiArtworkGenerateingInfoVoResponse[] = []
  console.log('fetchArtworkHistoryListByKeys', data, code, message)
  if ((code && parseInt(code)) !== 200) {
    ElMessage.error('获取作画任务列表失败，错误信息：' + message)
    dataList = []
  } else {
    dataList = data?.list || []
  }

  return dataList
}

// 针对等待中的任务开启轮询查询处理
const queryArtworkListInterval = ref()

// 查询所有作画任务详情
watch(() => getArtworkHistoryListData.value?.data.list, async (newVal, oldVal) => {
  if (newVal) {
    const list = await fetchArtworkHistoryListByKeys(newVal.map(item => item.key!))
    // 把状态已提交，排队中，生成中的任务放在最前面
    let waitingList = list.filter(item => [ARTWORK_SUBMITTED, ARTWORK_QUEUING, ARTWORK_CREATING].includes(item.status!)) || []
    console.log('waitingList', waitingList)
    artworkInfoList.value = waitingList.concat((list.filter(item => ![ARTWORK_SUBMITTED, ARTWORK_QUEUING, ARTWORK_CREATING].includes(item.status!)) || []).sort((a, b) => b.start_gen_time! - a.start_gen_time!) || [])
    console.log('artworkInfoList', artworkInfoList.value)
    // TODO:
    if (artworkInfoList.value.length > 0) {
      selectedArtworkKey.value = artworkInfoList.value[0].key!
    }

    queryArtworkListInterval.value && clearInterval(queryArtworkListInterval.value)
    // 针对等待中的任务轮询处理
    queryArtworkListInterval.value = setInterval(async () => {
      if (waitingList.length > 0) {
        const list = await fetchArtworkHistoryListByKeys(waitingList.map(item => item.key!))
        // 找到list中完成的， 并更新 artworkInfoList 中对应项的数据
        const completedList = list.filter(item => ![ARTWORK_SUBMITTED, ARTWORK_QUEUING, ARTWORK_CREATING].includes(item.status!))
        console.log('completedList', completedList)
        for (let item of completedList) {
          let curItemIndex = artworkInfoList.value.findIndex(artwork => artwork.key === item.key)
          if (curItemIndex !== -1) {
            artworkInfoList.value[curItemIndex] = item
          }
        }
        waitingList = list.filter(item => [ARTWORK_SUBMITTED, ARTWORK_QUEUING, ARTWORK_CREATING].includes(item.status!)) || []
        console.log('waitingList', waitingList)
      } else {
        clearInterval(queryArtworkListInterval.value)
      }
    }, 5000)
  }
}, {
  deep: true,
  immediate: true
})

const selectedArtworkKey = ref('')

const selectArtwork = (item: AiArtworkGenerateingInfoVoResponse) => {
  selectedArtworkKey.value = item.key!
}

const selectedArtwork = computed<AiArtworkGenerateingInfoVoResponse | null>(() => artworkInfoList.value.find(item => item.key === selectedArtworkKey.value) || null)

watch(getModuleResourceInfoData, (newVal) => {
  console.log('getModuleResourceInfoData', newVal?.data.create_option_menu?.image_type)
  // 画面类型
  if (newVal?.data.create_option_menu?.image_type) {
    imageOptions.value = newVal.data.create_option_menu.image_type.map(item => {
      return { ...item, selected: false }
    })
  }

  // 画面风格
  if (newVal?.data.create_option_menu?.style) {
    styleOptions.value = newVal.data.create_option_menu.style.map(item => {
      return { ...item, selected: false }
    })
  }

  // 艺术家
  if (newVal?.data.create_option_menu?.artist) {
    artistOptions.value = newVal.data.create_option_menu.artist.map(item => {
      return { ...item, selected: false }
    })
  }

  // 元素魔法
  if (newVal?.data.create_option_menu?.element_magic) {
    elementMagicOptions.value = newVal.data.create_option_menu.element_magic.map(item => {
      return { ...item, selected: false }
    })
  }

  // 风格修饰参数
  if (newVal?.data.create_option_menu?.style_decoration) {
    styleDecorationOptions.value = newVal.data.create_option_menu.style_decoration.map(item => {
      return { ...item, selected: false }
    })
  }

  // 角色与人物
  if (newVal?.data.create_option_menu?.character) {
    characterOptions.value = newVal.data.create_option_menu.character.map(item => {
      return { ...item, selected: false }
    })
  }

  // 融合模型
  if (newVal?.data.create_option_menu?.model_fusion) {
    modelFusionOptions.value = newVal.data.create_option_menu.model_fusion.map(item => {
      return { ...item, selected: false, weight: item.recommended_weight }
    })
  }

  // 推荐分辨率
  if (newVal?.data.create_option_menu?.resolution) {
    resolutionOptionsList.value = newVal.data.create_option_menu.resolution_new?.resolution_list || []
  }
}, {
  deep: true,
  immediate: true
})

// 3.正面描述Prompt 与 负面描述
const promptStr = ref('')
const negativePromptStr = ref('') // 图片中不需要包含的内容

// 4. 画面类型
const imageTypeSelectorRef = ref<any>()
const imageOptions = ref<ResourceOption[]>([])

// 5. 画面风格
const styleSelectorRef = ref<any>()
const styleOptions = ref<ResourceOption[]>([])

// 6. 艺术家
const artistSelectorRef = ref<any>()
const artistOptions = ref<ResourceOption[]>([])

// 7. 元素魔法
const elementMagicSelectorRef = ref<any>()
const elementMagicOptions = ref<ResourceOption[]>([])


// 8. 风格参数
const styleDecorationSelectorRef = ref<any>()
const styleDecorationOptions = ref<(ResourceOption)[]>([])

// 9. 角色与人物
const characterSelectorRef = ref<any>()
const characterOptions = ref<ResourceOption[]>([])

// 10. 融合模型
const modelFusionSelectorRef = ref<any>()
const modelFusionOptions = ref<ModelFusionTypeOption[]>([])
provide(modelFusionOptionsKey, modelFusionOptions)

// 11. 推荐分辨率
const resolutionOptionsList = ref<CreateOptionResolutionResponse[]>([])
const resolutionRatios = computed(() => Array.from(new Set(resolutionOptionsList.value.map(item => item.size_ratio!))))
const selectedRatio = ref<string>()
const selectRatio = (item: string) => {
  selectedRatio.value = item
}

const resolutions = computed(() => resolutionOptionsList.value.filter(item => item.size_ratio === selectedRatio.value))
const selectedResolution = ref<CreateOptionResolutionResponse>()
const selectResolution = (item: CreateOptionResolutionResponse) => {
  selectedResolution.value = item
}

const selectedResolutionWithAndHeight = computed(() => {
  if (selectedResolution.value) {
    const [width, height] = selectedResolution.value.display_resolution?.split('*') || []
    return { width: parseInt(width), height: parseInt(height) }
  }
  return null
})

const openAdvancedSetting = ref(false)

// 高级参数
const uniqueCreateNum = ref('1')  // 随机种子编号
const CFGScale = ref(7) // 1 - 30
const stylize = ref(100) // 0 - 1000
const stylizeWeight = ref(100) // 0 - 1000
const characterWeight = ref(0) // 0 - 100
const chaos = ref(0) // 0 - 100
const quality = ref('1') // 0.5 1 2
const upbeta = ref(false)
const tile = ref(false)
// 上传底图相关

// 通用及漫画模型底图
const UPLOAD_URL = `${runtimeConfig.public.apiBase
  }/api/upload/file`;
const imageUrl = ref('')
const customUploadRequest = async (data: UploadRequestOptions) => {
  console.log('customUploadRequest', data)
  const str = await getBase64FromFile(data.file)
  console.log('customUploadRequest str', str)
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log('handleAvatarSuccess', response, uploadFile)
  imageUrl.value = response.data
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log('rawFile', rawFile)
  if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('picture size can not exceed 10MB!')
    return false
  }

  return true
}

// mj 模型风格参考图，角色参考图
const styleRefImageUrls = ref<UploadUserFile[]>([])
const characterRefImageUrls = ref<UploadUserFile[]>([])

const handleAddStyleReImgSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log('handleAddStyleReImgSuccess', response, uploadFile)
  styleRefImageUrls.value.push({
    name: uploadFile.name,
    url: response.data
  })
  // imageUrl.value = response.data
}

const handleStyleRefImgRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handleAddCharacterReImgSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log('handleAddStyleReImgSuccess', response, uploadFile)
  styleRefImageUrls.value.push({
    name: uploadFile.name,
    url: response.data
  })
  // imageUrl.value = response.data
}

const handleCharacterRefImgRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const createNum = ref(1)

const generateDefaultCreateOption = () => {
  const createOption: DefaultAICreateRequest = {
    model: selectedModel.value?.model_code,
    num: createNum.value,
    accelerate_times: 0,
    prompt: promptStr.value,
  }

  if (imageUrl.value) {
    createOption.init_image_url = imageUrl.value
    createOption.creativity_degree = 50
    createOption.create_source = 1
  }
  if (selectedResolution.value) {
    createOption.width = selectedResolution.value.width
    createOption.height = selectedResolution.value.height
    createOption.prefine_multiple = selectedResolution.value.prefine_multiples
    createOption.super_size_multiple = selectedResolution.value.super_size_multiple
  }
  return createOption
}

const generateStyleModelOption = () => {

}

const generateMJModelOption = () => {
  if (!selectedResolutionWithAndHeight.value) {
    ElMessage.error('请选择分辨率')
    return null
  }

  const createOption: MJAICreateRequest = {
    model: selectedModel.value?.model_code,
    num: createNum.value,
    prompt: promptStr.value,
    width: selectedResolutionWithAndHeight.value.width,
    height: selectedResolutionWithAndHeight.value.height,
    mj_param: {
      chaos: chaos.value,
      stylize: stylize.value,
      // sw: stylizeWeight.value,
      // cw: characterWeight.value,
      quality: quality.value,
      upbeta: upbeta.value,
      tile: tile.value,
      // sref_urls: styleRefImageUrls.value.map(item => item.url!),
      // cref_urls: characterRefImageUrls.value.map(item => item.url!),
    }
  }
  return createOption
}

const createWithDefaultAI = async () => {
  try {
    let createOption = generateDefaultCreateOption()
    if (createOption) {
      const { data: createAIByWujieData, code, message } = await createAIByWujie(createOption)
      if (code && parseInt(code) == 200) {
        ElMessage.success('任务已提交，请等待生成结果')
        // 触发刷新 artWorkList
        getArtworkHistoryListRefresh()
      } else {
        ElMessage.error('任务提交失败，错误信息：' + message)
      }
      console.log('createAIByWujieData', createAIByWujieData)
    }
  } catch (e: Error) {
    console.log('createAIByWujie error', e.data)
    ElMessage.error('任务提交失败，错误信息：' + (e.data.message ? JSON.stringify(e.data.message) : ''))
  }
}

const createWithMJAI = async () => {
  try {
    let createOption = generateMJModelOption()
    if (createOption) {
      const { data: createAIByWujieData, code, message } = await createAIByMJ(createOption)
      if (code && parseInt(code) == 200) {
        ElMessage.success('任务已提交，请等待生成结果')
        // 触发刷新 artWorkList
        getArtworkHistoryListRefresh()
      } else {
        ElMessage.error('任务提交失败，错误信息：' + message)
      }
      console.log('createAIByWujieData', createAIByWujieData)
    }
  } catch (e: Error) {
    console.log('createAIByWujie error', e.data)
    ElMessage.error('任务提交失败，错误信息：' + (e.data.message ? JSON.stringify(e.data.message) : ''))
  }
}

const createAI = async () => {
  if (selectedModelType.value.value === MODEL_TYPE_VALUE_MAP.COMIC_MODEL_TYPE || selectedModelType.value.value === MODEL_TYPE_VALUE_MAP.GENERAL_MODEL_TYPE) {
    await createWithDefaultAI()
  }

  if (selectedModelType.value.value === MODEL_TYPE_VALUE_MAP.MJ_MODEL_TYPE) {
    await createWithMJAI()
  }
}

</script>

<style scoped lang="scss">
.create-title {
  font-size: 40px;
  line-height: 48px;
  font-weight: 600;
  word-break: break-all;
  color: rgb(252, 252, 253);
}

.title-btn {
  border-color: rgb(53, 57, 69);
  background: rgb(20, 20, 22);
  color: rgb(119, 126, 144);
  padding: 7px 16px;
  border-width: 2px;
  height: 40px;
  border-radius: 90px;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;
  // line-height: 40px;
}

.title-btn:focus {
  color: #fff;
  border-color: #fff;

}

.model-item {
  flex: 1;
  height: 100%;
  margin-left: 4px;
  margin-right: 4px;
  border: 2px solid rgb(35, 38, 47);
  border-radius: 12px;
}

// .model-item:focus {
//   border: 2px solid rgb(177, 181, 196);
// }

:deep(.el-textarea__inner) {
  background: none;
  box-shadow: 0 0 0 1px rgb(35, 38, 47) inset
}

:deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 1px rgb(177, 181, 196) inset
}

:deep(.el-textarea .el-input__count) {
  background: none;
}

.ratio-item {
  flex: 1;
  height: 100%;
  background: #23262f;
  margin-left: 4px;
  margin-right: 4px;
  border-radius: 12px;
  font-size: 12px;
  // border: 2px solid #23262f;
}

// .ratio-item:focus {
//   border: 2px solid rgb(177, 181, 196);
// }

.resolute-item {
  flex: 1;
  height: 100%;
  background: #23262f;
  margin-left: 4px;
  margin-right: 4px;
  border-radius: 90px;
  font-size: 12px;
}

// .resolute-item:focus {
//   border: 2px solid rgb(177, 181, 196);
// }

.model-theme-item {
  // flex: 1;
  width: 18%;
  height: 40px;
  background: #23262f;
  margin: 3px;
  border-radius: 90px;
  font-size: 12px;
  text-wrap: wrap;
  text-align: center
}

// .model-theme-item:focus {
//   border: 2px solid rgb(177, 181, 196);
// }

:deep(.el-radio-button__inner) {
  border: 1px solid rgb(35, 38, 47);
  background: none;
}

:deep(.el-radio-button:first-child .el-radio-button__inner) {
  border-left: 1px solid rgb(35, 38, 47);
}

:deep(.el-radio-button__inner) {
  color: white;
}

.createWorkBtn {
  width: 100%;
  padding: 7px 16px;
  border-width: 2px;
  font-weight: bold;
  height: 48px;
  font-size: 16px;
  border-radius: 90px;
  box-shadow: none;
  color: black;
  position: sticky;
  bottom: 0px;
  background: #FFD925;
}

:deep(.el-switch__core) {
  background: none
}

.label-set {
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #23262f;
  cursor: pointer;
}

:deep(.el-drawer) {
  // --el-drawer-bg-color: rgb(35, 38, 47)
  --el-drawer-bg-color: rgb(20, 20, 22);
}

.el-segmented {
  --el-segmented-bg-color: none;
  --el-segmented-color: white;
  --el-segmented-item-selected-bg-color: #ebedf0;
  --el-segmented-item-selected-color: #000;
}

:deep(.el-segmented__item:not(.is-disabled):not(.is-selected):hover) {
  color: #fff;
  background: none;
}

:deep(.el-check-tag) {
  width: auto;
  margin: 5px;
  border-radius: 90px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(35, 38, 47);
  color: #fff;
}

:deep(.el-check-tag.el-check-tag--primary.is-checked) {
  background-color: #fff;
  color: #000;
}

.seletedTagContainer {
  width: 100%;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-row-gap: 10px;
  justify-items: center;
  align-items: center;
}

:deep(.el-input__wrapper) {
  background: none;
}

:deep(.el-switch) {
  --el-switch-on-color: #FFD925;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

:deep(.avatar-uploader .el-upload) {
  border: 2px dashed rgb(35, 38, 47);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: .2s;
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: #fff;
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.randomBox {
  border: 2px solid #353945
}

:deep(.el-input-number__decrease) {
  background: none;
  // color: #fff;
}

:deep(.el-input-number__increase) {
  background: none;
  // color: #fff;
}

:deep(.el-input__inner) {
  color: #fff;
}

:deep(.el-input__wrapper) {
  border-radius: 9px;
}

:deep(.el-upload--picture-card) {
  background: none;
}
</style>