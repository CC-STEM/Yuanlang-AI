<template>
  <BaseDialog ref="userOrderRef" :title="'我的订单'" :width="1553" :height="795">
    <div class="w-full h-[613px]">
      <el-table :data="orderList" style="width: 100%" class="mt-[25px]">
        <el-table-column fixed="left" prop="orderItems" label="商品名称" width="100">
          <template #default="{ row }">
            <div v-for="item in row.orderItems" :key="item.id">
              <p>{{ item.goodsName }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="orderItems" label="数量" width="50">
          <template #default="{ row }">
            <div v-for="item in row.orderItems" :key="item.id">
              <p>{{ item.goodsCount }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" width="50">
          <template #default="{ row }">
            <div v-for="item in row.orderItems" :key="item.id">
              <p>{{ item.sellingPrice }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="总价" width="50" />
        <el-table-column prop="logisticsOrderNum" label="物流单号" width="100" />
        <el-table-column prop="receiverName" label="收件人" width="70" />
        <el-table-column prop="receiverPhone" label="手机号" width="100" />
        <el-table-column prop="receiverAddress" label="详细地址" width="200" />
        <el-table-column prop="status" label="订单状态" width="150">
          <template #default="{ row }">
            <el-tag type="success">{{ NEW_ORDER_STATUS_MAP[row.status] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button> -->
            <el-button v-if="scope.row.status === 0" size="small" @click="handleClickPay(scope.row)">
              去支付
            </el-button>
            <el-button v-if="scope.row.status === 1" size="small"
              @click="handleClickSendNotify(scope.row)">提醒发货</el-button>
            <el-button v-if="scope.row.status === 2" size="small" @click="handleClickConfirmReceive(scope.row)">
              确认收货
            </el-button>
            <el-button v-if="scope.row.status === 1 || scope.row.status === 2" size="small"
              @click="handleClickApplyForSale(scope.row)">申请退货退款</el-button>
            <el-button v-if="scope.row.status === 0" size="small" @click="handleCloseOrder(scope.row)">
              取消订单
            </el-button>
            <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="w-full flex justify-end">
      <el-pagination :current-page="page" :page-size="size" :page-sizes="[10, 20, 30, 40]" :background="true"
        layout="sizes, prev, pager, next" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <BaseDialog ref="payDialogRef" :title="'支付'" :width="395" :height="441">
      <div class="h-[391px] w-full flex flex-col items-center" v-if="curSelectedOrder">
        <div class="mt-[38px] w-[89px]"><span class="text-[18px]">¥</span><span class="cnyNum">{{ curSelectedOrder.total
            }}</span></div>
        <!-- <img class="w-[153px] h-[153px] mt-[33px]" src="" alt=""> -->
        <BuyQRCode v-if="curSelectedOrder.qrcodeUrl" :value="curSelectedOrder.qrcodeUrl" :size="153" />
        <Icon v-else name="tabler:refresh" style="font-size: 50px" @click="handleRefreshQrcode" />
        <div class="mt-[37px] h-[21px] w-[207px] flex items-center"><img src="~/assets/wxpay.png"
            class="w-[30px] h-[30px] mr-[11px]" alt=""><span class="pay-text">请通过微信扫一扫支付</span>
        </div>
      </div>
    </BaseDialog>
  </BaseDialog>
</template>

<script lang="ts" setup>
import type { GoodsOrder } from '../../types'

const page = ref(1)
const size = ref(10)
const total = ref(0)
const userOrderRef = ref()
const payDialogRef = ref()
const orderList = ref<GoodsOrder[]>([])
const curSelectedOrder = ref<GoodsOrder | null>(null)
let queryOrderStatusTimer: any

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  size.value = val
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  page.value = val
}

const handleEdit = (index: number, row: any) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: any) => {
  console.log(index, row)
}

const handleClickPay = (row: GoodsOrder) => {
  curSelectedOrder.value = row
  payDialogRef.value.dialogVisible = true
  // 轮训订单状态
  queryOrderStatusTimer = setInterval(() => {
    queryOrderStatus()
  }, 2000)

}

const handleClickSendNotify = (row: GoodsOrder) => {
  ElMessage.success('已发送提醒')
  console.log(row)
}

const handleClickConfirmReceive = async (row: GoodsOrder) => {
  // TODO:
  console.log(row)
  const { data } = await completeGoodsOrder(row.orderNo)
  if (data.affected > 0) {
    ElMessage.success('确认收货成功')
    fetchOrderList()
  }
}

const handleClickApplyForSale = async (row: GoodsOrder) => {
  // TODO:
  const { data } = await applyAfterSale(row.orderNo)
  if (data.affected > 0) {
    ElMessage.success('申请成功，等待平台处理中')
    fetchOrderList()
  }
}

const handleCloseOrder = async (row: GoodsOrder) => {
  // TODO:
  const { data } = await cancelGoodsOrder(row.orderNo)
  if (data.affected > 0) {
    ElMessage.success('订单取消成功')
    fetchOrderList()
  }
}

const handleRefreshQrcode = () => {
  // TODO:
}

const queryOrderStatus = async () => {
  if (!curSelectedOrder.value?.orderNo)
    return
  const result = await queryGoodsOrderByNo(curSelectedOrder.value.orderNo)
  const { code, data, message } = result
  if (Number(code) === 200) {
    const { payStatus } = data
    if (payStatus === 1) {
      clearInterval(queryOrderStatusTimer)
      ElMessage.success('恭喜你支付成功、可通过 “我的订单” 查看订单详情！')
      // 刷新订单列表
      fetchOrderList()
      setTimeout(() => {
        if (payDialogRef.value) {
          payDialogRef.value.dialogVisible = false
        }
      }, 2000)
    }
  }
}

// onMounted(async () => {
//   const { data: { data, total: totalCount } } = await queryGoodsOrder(page.value, size.value)
//   orderList.value = data
//   total.value = totalCount
// })

const fetchOrderList = async () => {
  const { data: { data, total: totalCount } } = await queryGoodsOrder(page.value, size.value)
  orderList.value = data
  total.value = totalCount
}

watch([page, size], async () => {
  fetchOrderList()
}, {
  immediate: true
})

defineExpose({ userOrderRef })
</script>

<style lang="scss" scoped>
:deep(.el-table__header thead) {
  background: #2850FF;
  border-radius: 10px;
}

:deep(.el-table__header thead tr) {
  background: #2850FF;
  border-radius: 10px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 14px;
  color: #FFFFFF;
}

:deep(.el-table th.el-table__cell) {
  background: none;
}

:deep(.el-table__row .el-table__cell) {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #1B1B1B;
  line-height: 11px;
}
</style>