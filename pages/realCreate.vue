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
        }" :src="curBaseImgSrc" alt="" id="base-img">
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
        <div @click="clickToReturn"
          class="cursor-pointer w-[48%] h-full rounded-[10px] bg-[#1DC1D3] flex justify-center items-center text-white text-[16px]">
          返回上一页，重新选择作品
        </div>
        <div class="w-[48%] h-full rounded-[10px] bg-[#0043FF] flex justify-center items-center text-white text-[16px]"
          @click="clickToCreate">
          下单制作
        </div>
      </div>
    </div>
    <!-- <BuyPayDialog ref="payDialogRef" /> -->
    <!-- <BuyReceiveDialog ref="receiveDialogRef" /> -->
    <BaseDialog ref="realWorkDialogRef" :title="'下单制作'" :width="1000" :height="800">
      <div class="w-full flex flex-col items-center">
        <div class="w-[800px] h-[600px] flex items-center justify-center">
          <Icon name="svg-spinners:clock" style="color: rgb(255, 217, 37);font-size: 200px" v-if="!toCreateImgUrl" />
          <img v-else id="toCreateImg" :src="toCreateImgUrl" alt="" class="object-contain w-full h-full">
        </div>
        <div class="w-full flex justify-around mt-[26px]">
          <div class="cancel-btn" @click="handleRealWorkCancel">取消</div>
          <div class="save-btn" @click="handleRealWorkConfirm">下一步，填写收货地址</div>
        </div>
      </div>
    </BaseDialog>
    <BaseDialog ref="receiveDialogRef" :title="'收货信息'" :width="462" :height="500">
      <div class="h-[483px] w-full flex flex-col items-center">
        <div class="w-full justify-between flex mt-[30px]"><span class="buy-num">购买数量</span> <el-input-number
            v-model="goodsNum" :min="1" :max="10" /></div>
        <div class="w-full justify-between flex mt-[29px]">
          <div class="flex flex-col w-[194px]">
            <span class="receiver-label">收件人</span>
            <el-input class="receiver-input mt-[12px]" placeholder="请输入收件人姓名" v-model="receiverName"></el-input>
          </div>
          <div class="flex flex-col w-[194px]">
            <span class="phone-label">手机号</span>
            <el-input class="phone-input mt-[12px]" placeholder="请输入收件人手机号" v-model="receiverPhone"></el-input>
          </div>
        </div>
        <div class="w-full flex flex-col mt-[13px]">
          <span class="region-label">省市区</span>
          <el-input class="region-input mt-[10px]" placeholder="请选择行政区域" v-model="receiverRegion"></el-input>
        </div>
        <div class="w-full flex flex-col mt-[13px]">
          <span class="region-label">详细地址</span>
          <el-input class="address-input mt-[12px]" type="textarea" placeholder="请输入详细地址" v-model="receiverAddress" />
        </div>
        <div class="w-[150px] h-[50px] mt-[25px] bg-[#034AFF] rounded-[25px]  flex items-center justify-center" style="font-family: Microsoft YaHei;
font-weight: bold;
font-size: 16px;
color: #FFFFFF;
cursor: pointer" @click="handleReceiveConfirm">
          去支付
        </div>
      </div>
    </BaseDialog>
    <BaseDialog ref="payDialogRef" :title="'支付'" :width="395" :height="441">
      <div class="h-[391px] w-full flex flex-col items-center">
        <div class="mt-[38px] w-[89px]"><span class="text-[18px]">¥</span><span class="cnyNum">{{ curOrderTotal
            }}</span></div>
        <!-- <img class="w-[153px] h-[153px] mt-[33px]" src="" alt=""> -->
        <BuyQRCode v-if="!qrCodeloading" :value="curOrderUrlQRCode" :size="153" />
        <div class="mt-[37px] h-[21px] w-[207px] flex items-center"><img src="~/assets/wxpay.png"
            class="w-[30px] h-[30px] mr-[11px]" alt=""><span class="pay-text">请通过微信扫一扫支付</span>
        </div>
      </div>
    </BaseDialog>
  </div>
</template>

<script lang="ts" setup>
import VueDragResize from 'vue-drag-resize/src'

const router = useRouter()
const route = useRoute()
const curBaseImgSrc = ref('')
const payDialogRef = ref()
const receiveDialogRef = ref()
const realWorkDialogRef = ref()
const curDragX = ref(0)
const curDragY = ref(0)
const curDragWidth = ref(200)
const curDragHeight = ref(200)
const toCreateImgUrl = ref('')
const runtimeConfig = useRuntimeConfig();
const goodsNum = ref(1)
const receiverName = ref('')
const receiverPhone = ref('')
const receiverRegion = ref('')
const receiverAddress = ref('')
const curOrderUrlQRCode = ref('')
const curOrderNo = ref('')
const curOrderTotal = ref(0)
const qrCodeloading = ref(true)
let queryOrderStatusTimer: any

const UPLOAD_URL = `${runtimeConfig.public.apiBase
  }/api/upload/file`;

if (route.query?.src) {
  const src = decodeURIComponent(route.query.src as string)
  curBaseImgSrc.value = src
}

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
    realWorkDialogRef.value.dialogVisible = true

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
        // const base64 = canvas.toDataURL('image/png');
        // console.log('base64', base64)
        canvas.toBlob(async (blob) => {
          console.log('blob', blob)

          if (blob) {
            const formData = new FormData()
            const tempFile = new File([blob], new Date().getTime() + '-temp.png') // TODO: 改成userID-goodsID-timestamp.png
            formData.append('file', tempFile)
            // fetch
            const res = await fetch(UPLOAD_URL, {
              method: 'POST',
              body: formData,
              headers: {
                // 'Content-Type': 'multipart/form-data'
              }
            })

            // 上传图片,换取腾讯云cos链接
            const cosRes = await res.json()
            console.log('res', cosRes)
            if (cosRes.code === 200) {
              console.log('cos url', cosRes.data)
              toCreateImgUrl.value = cosRes.data
            }
          }
        })
        // document.getElementById('toCreateImg')?.setAttribute('src', base64);
        // document.getElementById('toCreateImg')?.setAttribute('style', 'width: 100%; height: 100%; object-fit: contain;')
      }
    }
  }
}

const clickToReturn = () => {
  router.push('/create')
}

const handleRealWorkCancel = () => {
  if (realWorkDialogRef.value) {
    realWorkDialogRef.value.dialogVisible = false
  }
}

const handleRealWorkConfirm = () => {
  if (realWorkDialogRef.value) {
    realWorkDialogRef.value.dialogVisible = false
  }

  if (receiveDialogRef.value) {
    receiveDialogRef.value.dialogVisible = true
  }
}

const queryOrderStatus = async () => {
  if (!curOrderNo.value)
    return
  const result = await queryGoodsOrderByNo(curOrderNo.value)
  const { code, data, message } = result
  if (Number(code) === 200) {
    const { payStatus } = data
    if (payStatus === 1) {
      clearInterval(queryOrderStatusTimer)
      ElMessage.success('恭喜你支付成功、可通过 “我的订单” 查看订单详情！')
      setTimeout(() => {
        if (payDialogRef.value) {
          payDialogRef.value.dialogVisible = false
        }
      }, 2000)
    }
  }
}

const handleReceiveConfirm = async () => {
  if (receiveDialogRef.value) {
    receiveDialogRef.value.dialogVisible = false
  }

  if (payDialogRef.value) {
    payDialogRef.value.dialogVisible = true
    qrCodeloading.value = true

    // 创建订单
    const { data, code, message } = await createGoodsOrder({
      channel: 'native',
      receiverName: receiverName.value,
      receiverPhone: receiverPhone.value,
      receiverAddress: receiverRegion.value + '' + receiverAddress.value,
      goodsId: 1,
      goodsCount: goodsNum.value,
      goodsCoverImg: toCreateImgUrl.value,
    })

    if (Number(code) === 200) {
      console.log('createOrderRes', data)
      qrCodeloading.value = false
      curOrderUrlQRCode.value = data.url_qrcode
      curOrderNo.value = data.orderNo
      curOrderTotal.value = data.total

      // 轮训订单状态
      queryOrderStatusTimer = setInterval(() => {
        queryOrderStatus()
      }, 2000)
    }
  }
}

</script>

<style scoped lang="scss">
.cancel-btn {
  width: 350px;
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
  cursor: pointer;
}

.save-btn {
  width: 350px;
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
  cursor: pointer;
}

.receiver-input,
.phone-input {
  width: 194px;
  height: 33px;
  background: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #EBEBEB;
  opacity: 0.63;
}

.region-input {
  width: 100%;
  height: 33px;
  background: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #EBEBEB;
  opacity: 0.63;
}

.address-input {
  width: 100%;
  height: 88px;
  background: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #EBEBEB;
  opacity: 0.63;
}

.receiver-label,
.phone-label,
.region-label {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #151414;
  line-height: 12px;
}

.buy-num {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #151414;
}

:deep(.address-input .el-textarea__inner) {
  height: 88px;
}

// :deep(.el-input-number__decrease) {
//   width: 32px;
//   height: 32px;
//   background: #EDF2FF;
//   border-radius: 10px;
// }

// :deep(.el-input-number__increase) {
//   width: 32px;
//   height: 32px;
//   background: #EDF2FF;
//   border-radius: 10px;
// }

:deep(.el-dialog__header) {
  padding-bottom: 0;
}

:deep(.el-input-number) {
  height: 32px;
}

.cnyNum {
  font-family: Microsoft YaHei;
  font-weight: bold;

  font-size: 48px;
  color: #FF3B0D;
  height: 34px;
  line-height: 34px;
}

.pay-text {
  font-family: Microsoft YaHei;
  font-weight: 300;
  font-size: 15px;
  color: #000000;
}
</style>