<template>
  <BaseDialog ref="userOrderRef" :title="'我的订单'" :width="1453" :height="795">
    <div class="w-full h-[613px]">
      <el-table :data="orders" style="width: 100%" class="mt-[25px]">
        <el-table-column type="index" />
        <el-table-column prop="logisticsOrderNum" label="物流单号" width="200" />
        <el-table-column prop="workName" label="作品名称" width="180" />
        <el-table-column prop="num" label="数量" />
        <el-table-column prop="price" label="价格" />
        <el-table-column prop="receiver" label="收件人" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="address" label="详细地址" />
      </el-table>
    </div>
  </BaseDialog>
</template>

<script lang="ts" setup>
interface OrderInfo {
  logisticsOrderNum: string;
  workName: string;
  num: number;
  price: number;
  receiver: string;
  phone: string;
  address: string;
}

const userOrderRef = ref()
const orders = ref<OrderInfo[]>([
  {
    logisticsOrderNum: 'DH202410141455413211',
    workName: '测试作品',
    num: 1,
    price: 100,
    receiver: '测试收件人',
    phone: '13800138000',
    address: '测试地址'
  },
  {
    logisticsOrderNum: 'DH202410141455413211',
    workName: '测试作品',
    num: 1,
    price: 100,
    receiver: '测试收件人',
    phone: '13800138000',
    address: '测试地址'
  },
  {
    logisticsOrderNum: 'DH202410141455413211',
    workName: '测试作品',
    num: 1,
    price: 100,
    receiver: '测试收件人',
    phone: '13800138000',
    address: '测试地址'
  },
  {
    logisticsOrderNum: 'DH202410141455413211',
    workName: '测试作品',
    num: 1,
    price: 100,
    receiver: '测试收件人',
    phone: '13800138000',
    address: '测试地址'
  },
])
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