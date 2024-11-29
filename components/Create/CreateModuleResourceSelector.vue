<template>
  <div class="w-full mb-[40px]">
    <div class="w-full flex items-center justify-between text-white mb-[8px]"><span>画面类型选择</span>
      <el-switch v-model="openConfigImageType" />
    </div>
    <template v-if="openConfigImageType">
      <div class="w-full text-left text-white mb-[8px] label-set ml-[20px]" @click="clickOpenImageTypeSetDialog">类型库
      </div>
      <div class="w-full text-left text-white text-[14px] mb-[20px]">已选类型项</div>
      <div class="w-full mb-[8px] flex flex-wrap">
        <div class="seletedTagContainer">
          <div
            class="text-white h-[36px] w-[80%] text-[12px] text-center leading-[36px] rounded-[90px] bg-[#23262f] pl-[5px] pr-[5px] truncate"
            v-for="item in selectedImageTypes" @click="clickImageType(item)"
            :style="item.selected ? 'border: 2px solid rgb(177, 181, 196);' : ''">{{ item.name }}
          </div>
        </div>
      </div>
    </template>
  </div>
  <el-drawer v-model="openImageTypeSet" title="画面类型选择" direction="rtl" size="60%">
    <template #header="{ titleId }">
      <div class="flex">
        <h1 :id="titleId" class="text-white text-[26px]">画面选择器 ({{ selectedImageTypes.length }} / 10)</h1>
        <el-input v-model="tagSearchInput" style="width: 240px;margin-left: 20px" size="large" placeholder="请输入"
          :suffix-icon="Search" />
      </div>
    </template>
    <div class="w-full h-[calc(100%-92px)]">
      <el-scrollbar>
        <div class="w-full flex flex-wrap">
          <div @click="clickImageType(item)" v-for="item in imageOptions"
            :style="{ backgroundImage: `url(${item.url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', border: item.selected ? '2px solid rgb(177, 181, 196)' : 'none' }"
            class="flex justify-center items-center w-[200px] h-[150px] m-[10px] rounded-[8px] cursor-pointer">
            <span class="text-white">{{ item.name }}</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelImageTypeSet">取消</el-button>
        <el-button type="primary" @click="confirmImageTypeSet">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>

</script>

<style></style>