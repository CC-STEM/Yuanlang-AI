<template>
  <div class="w-full h-full flex justify-center">
    <div class="w-[95%] h-full flex flex-col items-center">
      <div class="w-full h-[80px] mb-[12px] bg-[#20283F] rounded-[20px] border-[1px] border-solid border-[#20283F]">
      </div>
      <div class="w-[800px] h-[600px]" id="create-container" :style="{
        // background: `url('https://cc-web-1313504415.cos.ap-shanghai.myqcloud.com/mj/TTPRO1466632-0.png')`,
        // backgroundSize: 'contain',
        // objectFit: 'contain',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        position: 'relative'
      }">
        <img :style="{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }" src="https://cc-web-1313504415.cos.ap-shanghai.myqcloud.com/mj/TTPRO1466632-0.png" alt="" id="base-img">
        <VueDragResize :isActive="false" :w="200" :h="200" @resizing="onResize" @dragging="onDrag" id="drag-box">
          <img :style="{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }" src="https://cc-web-1313504415.cos.ap-shanghai.myqcloud.com/mj/TTPRO1510411-0-sr_x2.0.png" alt=""
            id="drag-img">
        </VueDragResize>
      </div>
      <div class="w-full h-[50px] mt-[20px] flex justify-around">
        <div class="w-[48%] h-full rounded-[10px] bg-[#1DC1D3] flex justify-center items-center text-white text-[16px]">
          返回上一页，重新选择作品
        </div>
        <div class="w-[48%] h-full rounded-[10px] bg-[#0043FF] flex justify-center items-center text-white text-[16px]"
          @click="clickToCreate">
          下单制作
        </div>
      </div>
    </div>
    <BuyPayDialog ref="payDialogRef" />
    <BuyReceiveDialog ref="receiveDialogRef" />
    <BuyRealWorkShowDialog ref="realWorkDialogRef" />
  </div>
</template>

<script lang="ts" setup>
import VueDragResize from 'vue-drag-resize/src'

const payDialogRef = ref()
const receiveDialogRef = ref()
const realWorkDialogRef = ref()
const curDragX = ref(0)
const curDragY = ref(0)
const curDragWidth = ref(200)
const curDragHeight = ref(200)

const baseImgWidth = ref(0)
const baseImgHeight = ref(0)
const dragImgWidth = ref(0)
const dragImgHeight = ref(0)

// 拖拽事件处理
const onDrag = (position: { height: number; width: number; left: number; top: number }) => {
  const containerEle = document.getElementById('create-container')
  const baseImgEle = document.getElementById('base-img')
  console.log('拖拽位置：', position.left, position.top)
  console.log('container width height', containerEle?.clientWidth, containerEle?.clientHeight)
  console.log('baseImg width height', baseImgEle?.clientWidth, baseImgEle?.clientHeight)
  curDragX.value = position.left
  curDragY.value = position.top
}

// 调整大小事件处理
const onResize = (position: { height: number; width: number; left: number; top: number }) => {
  console.log('新的尺寸：', position)
  curDragWidth.value = position.width
  curDragHeight.value = position.height
}

const readImage = (imageHTML: HTMLElement): Promise<HTMLImageElement> => {
  console.log('raw img', imageHTML.clientWidth, imageHTML.clientHeight)
  return new Promise(resolve => {
    const image = new Image();
    image.src = imageHTML.getAttribute('src')!;

    image.crossOrigin = 'Anonymous';
    image.onload = function () {
      // image.style.width = imageHTML.clientWidth + 'px'
      // image.style.height = imageHTML.clientHeight + 'px'
      // image.style.objectFit = 'cover'
      // console.log('raw w h', image.width, image.height)
      resolve(image);
    };
  });
}

const clickToCreate = async () => {
  console.log('realWorkDialogRef', realWorkDialogRef.value)
  if (realWorkDialogRef.value) {
    realWorkDialogRef.value.realWorkRef.dialogVisible = true

    // 在弹窗中绘制canvas
    const baseImgEle = document.getElementById('base-img')
    const dragImgEle = document.getElementById('drag-img')
    if (baseImgEle && dragImgEle) {
      const baseImg = await readImage(baseImgEle)
      const dragImg = await readImage(dragImgEle)

      // 获取 drag-img 的实际尺寸与显示尺寸
      const rawWidth = dragImg.width;
      const rawHeight = dragImg.height;
      const displayWidth = dragImgEle.clientWidth;
      const displayHeight = dragImgEle.clientHeight;
      console.log('rawWidth rawHeight displayWidth displayHeight', rawWidth, rawHeight, displayWidth, displayHeight)
      const canvas = document.createElement('canvas');
      canvas.width = baseImgEle?.clientWidth || 0
      canvas.height = baseImgEle?.clientHeight || 0
      const context = canvas.getContext('2d');


      if (context) {
        console.log('baseImg', baseImg)
        console.log('dragImg', dragImg)
        context.drawImage(baseImg, 0, 0, (baseImg.width), (baseImg.height), 0, 0, canvas.width, canvas.height)
        context.drawImage(dragImg, 0, 0, rawWidth, rawHeight, curDragX.value, curDragY.value, displayWidth, displayHeight)
        // 获取canvas base64的图片流
        const base64 = canvas.toDataURL('image/png');
        console.log('base64', base64)
        document.getElementById('toCreateImg')?.setAttribute('src', base64);
        document.getElementById('toCreateImg')?.setAttribute('style', 'width: 100%; height: 100%; object-fit: contain;')
      }
    }
  }
}
</script>

<style></style>