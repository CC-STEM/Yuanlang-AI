<template>
  <div class="w-full h-full flex justify-center">
    <div class="w-[80%] h-full pt-[20px] flex justify-between">
      <div class="w-[50%] pl-[20px] pr-[20px]">
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
            <div :tabindex="index" class="model-item flex flex-col items-center text-[12px] justify-around"
              v-for="(item, index) in mockModelTypes">
              <span class="text-white ">{{ item.name }}</span>
              <span class="text-[#b1b5c4]">{{ item.desc }}</span>
            </div>
          </div>
        </div>
        <div class="w-full mb-[20px]">
          <div class="w-full text-left text-white mb-[8px]">* 模型主题选择</div>
          <div class="w-full mb-[20px]">
            <el-radio-group v-model="curModelStyle" size="default">
              <el-radio-button v-for="item in modelStyleList" :label="item" :value="item" />
            </el-radio-group>
          </div>
          <div class="w-full flex flex-wrap">
            <div class="model-theme-item flex justify-center items-center text-white" :tabindex="index"
              v-for="(item, index) in modelThemes">
              {{ item.name }}</div>
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
        </div>
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
</template>

<script lang="ts" setup>
const mockModelTypes = [{ name: '通用模型', desc: '描人绘景，真实生动' }, { name: '漫画模型', desc: '激发想象，创作二次元' }, { name: '风格模型', desc: '有趣多彩' }, { name: 'mj模型', desc: '专业质量，表现力强' }]
const promptStr = ref('请输入咒语')
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

const modelThemes = ref([
  {
    "name": "汽车设计"
  },
  {
    "name": "服装模型"
  },
  {
    "name": "儿童摄影"
  },
  {
    "name": "玩具设计"
  },
  {
    "name": "影视（架空）"
  },
  {
    "name": "私人影像"
  },
  {
    "name": "室内设计XL"
  },
  {
    "name": "影视近代"
  },
  {
    "name": "艺术插画"
  },
  {
    "name": "NJXL V6"
  },
  {
    "name": "加密艺术"
  },
  {
    "name": "头像"
  },
  {
    "name": "植物花卉"
  },
  {
    "name": "纹样"
  },
  {
    "name": "家居设计"
  },
  {
    "name": "MJXL V6"
  },
  {
    "name": "国漫"
  },
  {
    "name": "NJXL V5"
  },
  {
    "name": "游戏设计"
  },
  {
    "name": "工艺美术"
  },
  {
    "name": "宠物摄影"
  },
  {
    "name": "美食"
  },
  {
    "name": "壁纸"
  },
  {
    "name": "产品美学"
  },
  {
    "name": "汉服"
  },
  {
    "name": "插画"
  },
  {
    "name": "文字"
  },
  {
    "name": "室内设计"
  },
  {
    "name": "MJ"
  },
  {
    "name": "二次元"
  },
  {
    "name": "风景"
  },
  {
    "name": "科幻"
  },
  {
    "name": "女性漫"
  },
  {
    "name": "中国风"
  },
  {
    "name": "儿童"
  },
  {
    "name": "奇幻"
  },
  {
    "name": "游戏"
  },
  {
    "name": "艺术"
  },
  {
    "name": "珠宝"
  },
  {
    "name": "动物"
  },
  {
    "name": "通用"
  }
])

const resolutions = ref(['1024*1024', '1360*1360', '2048*2048'])

const modelStyleList = ref(['收藏', '推荐', 'MJ', '二次元', '真人', '科幻', '儿童', '设计', '画风', '中国风', '风景'])
const curModelStyle = ref('')
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

.model-item:focus {
  border: 2px solid rgb(177, 181, 196);
}

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
  width: 13%;
  height: 36px;
  background: #23262f;
  margin: 3px;
  border-radius: 90px;
  font-size: 12px;
}

.model-theme-item:focus {
  border: 2px solid rgb(177, 181, 196);
}

:deep(.el-radio-button__inner) {
  border: 1px solid rgb(35, 38, 47);
  background: none;
}
</style>