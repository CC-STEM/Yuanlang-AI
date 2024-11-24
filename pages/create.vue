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
            <div class="w-full flex items-center justify-between text-white mb-[8px]"><span>画面类型选择</span>
              <el-switch v-model="openConfigImageType" />
            </div>
            <template v-if="openConfigImageType">
              <div class="w-full text-left text-white mb-[8px] label-set ml-[20px]" @click="clickOpenLabelSetDialog">标签库
              </div>
              <div class="w-full text-left text-white text-[14px] mb-[20px]">已选标签项</div>
              <div class="w-full mb-[8px] flex flex-wrap">
                <div class="seletedTagContainer">
                  <div
                    class="text-white h-[36px] w-[80%] text-[12px] text-center leading-[36px] rounded-[90px] bg-[#23262f] pl-[5px] pr-[5px] truncate"
                    v-for="item in selectedTags">{{ item }}</div>
                </div>
              </div>
            </template>
          </div>
          <div class="w-full mb-[40px]">
            <div class="w-full flex items-center justify-between text-white mb-[8px]"><span>主题标签选择</span>
              <el-switch v-model="openConfigTag" />
            </div>
            <div class="w-full text-left text-white mb-[8px] label-set ml-[20px]" @click="clickOpenLabelSetDialog">标签库
            </div>
            <div class="w-full text-left text-white text-[14px] mb-[20px]">已选标签项</div>
            <div class="w-full mb-[8px] flex flex-wrap">
              <div class="seletedTagContainer">
                <div
                  class="text-white h-[36px] w-[80%] text-[12px] text-center leading-[36px] rounded-[90px] bg-[#23262f] pl-[5px] pr-[5px] truncate"
                  v-for="item in selectedTags">{{ item }}</div>
              </div>
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
                <div :tabindex="index" v-for="(item, index) in aspectRatios"
                  class="ratio-item flex flex-col items-center justify-around text-white">
                  <span>{{ item.name }}</span>
                  <span>{{ item.size }}</span>
                </div>
              </div>
              <div class="w-full flex h-[40px]">
                <div :tabindex="index" v-for="(item, index) in resolutions"
                  class="resolute-item flex items-center justify-center text-white">
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>
            <div class="w-full mb-[30px]">
              <div class="w-full flex items-center justify-between text-white mb-[40px]"><span>高级设置</span>
                <el-switch v-model="openAdvancedSetting" />
              </div>
              <div class="w-full flex flex-col">
                <span class="text-white mb-[8px]">参考图</span>
                <el-upload class="avatar-uploader mb-[30px]"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false"
                  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
                <span class="text-white mb-[8px]">风格参考</span>
                <el-upload class="avatar-uploader mb-[30px]"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false"
                  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
                <span class="text-white mb-[8px]">角色参考</span>
                <el-upload class="avatar-uploader mb-[30px]"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false"
                  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
                <span class="text-white mb-[8px]">结构参考</span>
                <el-upload class="avatar-uploader mb-[30px]"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :show-file-list="false"
                  :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                  </el-icon>
                </el-upload>
              </div>
            </div>
          </div>
          <div class="w-full mb-[40px]">
            <div class="w-full flex items-center justify-between text-white mb-[8px]"><span>融合模型选择</span>
              <el-switch v-model="openConfigMixModel" />
            </div>
            <div class="w-full text-left text-white mb-[8px] label-set ml-[20px]" @click="clickOpenMixModelSetDialog">
              模型库
            </div>
            <div class="w-full text-left text-white text-[14px] mb-[20px]">已选模型项</div>
            <div class="w-full mb-[8px] flex flex-wrap">
              <div class="seletedTagContainer">
                <CreateMixModelItem class="w-[160px] h-[70px]" v-for="item in mockMixModels" :name="item" :num="1" />
                <!-- <div
                  class="text-white h-[36px] w-[80%] text-[12px] text-center leading-[36px] rounded-[90px] bg-[#23262f] pl-[5px] pr-[5px] truncate"
                  v-for="item in selectedTags">{{ item }}</div> -->
              </div>
            </div>
          </div>
          <div class="w-full mb-[40px] flex flex-col randomBox p-[12px]">
            <span class="text-[12px] mb-[8px] text-white">随机种子</span>
            <el-input style="margin-bottom: 10px;" v-model="uniqueCreateNum" placeholder="请输入随机种子"></el-input>
            <div class="flex justify-between items-center mb-[14px]">
              <span class="text-white text-[12px]">提示词相关性</span>
              <el-slider style="width: 80%" v-model="CFGScale" show-input />
            </div>
            <div class="flex justify-between items-center mb-[14px]">
              <span class="text-white text-[12px]">风格参数</span>
              <el-slider style="width: 80%" v-model="stylize" show-input />
            </div>
            <div class="flex justify-between items-center mb-[14px]">
              <span class="text-white text-[12px]">混沌参数</span>
              <el-slider style="width: 80%" v-model="chaos" show-input />
            </div>
          </div>
          <div class="w-full flex justify-between items-center mb-[40px]">
            <span class="text-white text-[14px]">作图数量</span>
            <el-input-number v-model="createNum" :min="1" :max="10" @change=""
              style="width: 130px;margin-right: 12px" />
          </div>
          <div class="createWorkBtn flex items-center justify-center z-[99]"><span>立即生成</span></div>
        </div>
        <div class="w-[50%] h-full">
          <div class="w-full h-[700px] bg-[#23262f] relative">
            <ClientOnly>
              <CreateLoading />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
    <el-drawer v-model="openLabelSet" title="标签选择" direction="rtl" size="60%">
      <template #header="{ titleId }">
        <div class="flex">
          <h1 :id="titleId" class="text-white text-[26px]">标签选择器</h1>
          <el-input v-model="tagSearchInput" style="width: 240px;margin-left: 20px" size="large" placeholder="请输入"
            :suffix-icon="Search" />
        </div>
      </template>
      <el-segmented v-model="tagType" :options="tagTypes" size="default" class="w-full" />
      <div class="w-full mt-[20px] h-[calc(100%-92px)]">
        <el-scrollbar>
          <div class="w-full flex flex-wrap">
            <el-check-tag :checked="checked" @change="onChange1" v-for="item in mockTags">{{ item }}</el-check-tag>
          </div>
        </el-scrollbar>
      </div>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelLabelSet">取消</el-button>
          <el-button type="primary" @click="confirmLabelSet">确认</el-button>
        </div>
      </template>
    </el-drawer>
    <el-drawer v-model="openMixModelSet" title="融合模型选择" direction="rtl" size="60%">
      <template #header="{ titleId }">
        <div class="flex">
          <h1 :id="titleId" class="text-white text-[26px]">模型库</h1>
          <el-input v-model="mixModelSearchInput" style="width: 240px;margin-left: 20px" size="large" placeholder="请输入"
            :suffix-icon="Search" />
        </div>
      </template>
      <el-segmented v-model="mixModelType" :options="mixModelTypes" size="default" class="w-full" />
      <div class="w-full mt-[20px] h-[calc(100%-92px)]">
        <el-scrollbar>
          <div class="w-full flex flex-wrap justify-around">
            <CreateMixModelItem class="w-[160px] h-[70px]" v-for="item in mockMixModels" :name="item" :num="1" />
          </div>
        </el-scrollbar>
      </div>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelMixModel">取消</el-button>
          <el-button type="primary" @click="confirmMixModel">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </el-scrollbar>

</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'

import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'
import type { CreateOptionWithPicResponse } from '../types'

const imageUrl = ref('')

const tagSearchInput = ref('')
const mixModelSearchInput = ref('')
const checked = ref(false)
const onChange1 = (status: boolean) => {
  console.log('status', status)
  checked.value = status
}


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
    return modelTypeList.value.data.filter(item => item.type === selectedModelType.value.value)
  }
  return []
})

const selectedModel = ref(modelList.value[0])
const selectModel = (item: typeof modelList.value[number]) => {
  selectedModel.value = item
}

// 3.正面描述Prompt 与 负面描述
const promptStr = ref('请输入咒语')
const negativePromptStr = ref('请输入描述') // 图片中不需要包含的内容

// 4. 画面类型/
const openConfigImageType = ref(false)
const imageTypes = ref<CreateOptionWithPicResponse[]>([])
watch(selectedModel, async (newVal) => {
  if (newVal?.model_code !== undefined) {
    const { data } = await getModuleResourceInfo(newVal.model_code)
    console.log('getModuleResourceInfo', data)
  }
}, {
  deep: true,
  immediate: true,
})


const aspectRatios = ref([{
  name: '头像图',
  size: '1:1'
}, {
  name: '手机屏幕',
  size: '1:2'
}, {
  name: '文章配图',
  size: '4:3'
}, {
  name: '社交媒体',
  size: '3:4'
}, {
  name: '电脑壁纸',
  size: '16:9'
}, {
  name: '宣传海报',
  size: '9:16'
}])

const resolutions = ref(['1024*1024', '1360*1360', '2048*2048'])

// const modelStyleList = ref(['收藏', '推荐', 'MJ', '二次元', '真人', '科幻', '儿童', '设计', '画风', '中国风', '风景'])
// const curModelStyle = ref('')
const openConfigTag = ref(false)
const openAdvancedSetting = ref(false)
const openLabelSet = ref(false)
const openConfigMixModel = ref(false)
const openMixModelSet = ref(false)

const clickOpenLabelSetDialog = () => {
  openLabelSet.value = true
}

const clickOpenMixModelSetDialog = () => {
  openMixModelSet.value = true
}

const gridData = [
  {
    date: '2016-05-02',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-04',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-01',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-03',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
]

const tagTypes = ['风格', '网络热词', '上衣', '下装', '外衣', '配饰', '背景', '衬衫', '连衣裙', '连帽衫', '牛仔裤', '紧身裤', '开衫', '大衣', '夹克']
const tagType = ref(tagTypes[0])

const mockTags = [
  '宽松的BF晚秋外套',
  '灰色印花猫耳领贴钻石短t恤',
  '条纹短袖t恤',
  '条纹马球衫',
  '黑白格子羊袖不对称设计连衣裙',
  '宽松的BF晚秋外套',
  '灰色印花猫耳领贴钻石短t恤',
  '条纹短袖t恤',
  '条纹马球衫',
  '黑白格子羊袖不对称设计连衣裙',
  '宽松的BF晚秋外套',
  '灰色印花猫耳领贴钻石短t恤',
  '条纹短袖t恤',
  '条纹马球衫',
  '黑白格子羊袖不对称设计连衣裙',
  '宽松的BF晚秋外套',
  '灰色印花猫耳领贴钻石短t恤',
  '条纹短袖t恤',
  '条纹马球衫',
  '黑白格子羊袖不对称设计连衣裙',
  '宽松的BF晚秋外套',
  '灰色印花猫耳领贴钻石短t恤',
  '条纹短袖t恤',
  '条纹马球衫',
  '黑白格子羊袖不对称设计连衣裙',
  '宽松的BF晚秋外套',
  '灰色印花猫耳领贴钻石短t恤',
  '条纹短袖t恤',
  '条纹马球衫',
  '黑白格子羊袖不对称设计连衣裙',
]


const mixModelTypes = ['推荐',
  '摄影',
  '产品',
  '插画',
  '漫画',
  '绘本',
  '人物',
  '设计',
  '国风',
  '室内',
  '奇幻']
const mixModelType = ref(mixModelTypes[0])
const mockMixModels = [
  '黑神话',
  '黑悟空',
  '自然之歌',
  '感官刺激',
  '万物有灵',
  '野性斑斓']

const selectedTags = [
  '宽松的BF晚秋外套',
  '灰色印花猫耳领贴钻石短t恤',
  '条纹短袖t恤',
  '条纹马球衫',
  '黑白格子羊袖不对称设计连衣裙',
  '宽松的BF晚秋外套',
]

const selectedMixModels = mockMixModels

const cancelLabelSet = () => {
  openLabelSet.value = false
}

const confirmLabelSet = () => {
  openLabelSet.value = false
}

const cancelMixModel = () => {
  openMixModelSet.value = false
}

const confirmMixModel = () => {
  openMixModelSet.value = false
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const uniqueCreateNum = ref(0)
const CFGScale = ref(0)
const stylize = ref(0)
const chaos = ref(0)
const createNum = ref(1)

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

.ratio-item:focus {
  border: 2px solid rgb(177, 181, 196);
}

.resolute-item {
  flex: 1;
  height: 100%;
  background: #23262f;
  margin-left: 4px;
  margin-right: 4px;
  border-radius: 90px;
  font-size: 12px;
}

.resolute-item:focus {
  border: 2px solid rgb(177, 181, 196);
}

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
</style>