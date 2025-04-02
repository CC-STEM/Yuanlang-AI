<template>
  <BaseDialog
    ref="userOrderRef"
    :title="'我的订单'"
    :width="1553"
    :height="795"
  >
    <div class="order-table-container position-relative">
      <el-table
        :data="orderList"
        style="width: 100%"
        class="mt-[25px]"
        height="400"
      >
        <el-table-column
          fixed="left"
          prop="orderItems"
          label="商品名称"
          width="100"
        >
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
        <el-table-column
          prop="logisticsOrderNum"
          label="物流单号"
          width="100"
        />
        <el-table-column prop="receiverName" label="收件人" width="70" />
        <el-table-column prop="receiverPhone" label="手机号" width="100" />
        <el-table-column prop="receiverAddress" label="详细地址" width="200" />
        <el-table-column prop="status" label="订单状态" width="150">
          <template #default="{ row }">
            <el-tag type="success">{{
              NEW_ORDER_STATUS_MAP[row.status]
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <div class="operation-buttons">
              <el-button
                v-if="scope.row.status === 0"
                size="small"
                type="primary"
                @click="handleClickPay(scope.row)"
              >
                去支付
              </el-button>
              <el-button
                v-if="scope.row.status === 1"
                size="small"
                type="info"
                @click="handleClickSendNotify(scope.row)"
              >
                提醒发货
              </el-button>
              <el-button
                v-if="scope.row.status === 2"
                size="small"
                type="success"
                @click="handleClickConfirmReceive(scope.row)"
              >
                确认收货
              </el-button>
              <el-button
                v-if="scope.row.status === 1 || scope.row.status === 2"
                size="small"
                type="warning"
                @click="handleClickApplyForSale(scope.row)"
              >
                申请退货退款
              </el-button>
              <el-button
                v-if="scope.row.status === 0"
                size="small"
                type="danger"
                @click="handleCloseOrder(scope.row)"
              >
                取消订单
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :current-page="page"
          :page-size="size"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="sizes, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <BaseDialog ref="payDialogRef" :title="'支付'" :width="395" :height="441">
      <div
        class="h-[391px] w-full flex flex-col items-center"
        v-if="curSelectedOrder"
      >
        <div class="mt-[38px] w-[89px]">
          <span class="text-[18px]">¥</span
          ><span class="cnyNum">{{ curSelectedOrder.total }}</span>
        </div>
        <!-- <img class="w-[153px] h-[153px] mt-[33px]" src="" alt=""> -->
        <BuyQRCode
          v-if="curSelectedOrder.qrcodeUrl"
          :value="curSelectedOrder.qrcodeUrl"
          :size="153"
        />
        <Icon
          v-else
          name="tabler:refresh"
          style="font-size: 50px"
          @click="handleRefreshQrcode"
        />
        <div class="mt-[37px] h-[21px] w-[207px] flex items-center">
          <img
            src="~/assets/wxpay.png"
            class="w-[30px] h-[30px] mr-[11px]"
            alt=""
          /><span class="pay-text">请通过微信扫一扫支付</span>
        </div>
      </div>
    </BaseDialog>
  </BaseDialog>
</template>

<script lang="ts" setup>
import type { GoodsOrder } from "../../types";

const page = ref(1);
const size = ref(10);
const total = ref(0);
const userOrderRef = ref();
const payDialogRef = ref();
const orderList = ref<GoodsOrder[]>([]);
const curSelectedOrder = ref<GoodsOrder | null>(null);
let queryOrderStatusTimer: any;

// 订单状态映射
const NEW_ORDER_STATUS_MAP: { [key: number]: string } = {
  0: "待支付",
  1: "待发货",
  2: "待收货",
  3: "已完成",
  4: "已取消",
  5: "退款中",
  6: "已退款",
  7: "已关闭",
};

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  size.value = val;
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  page.value = val;
};

const handleEdit = (index: number, row: any) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: any) => {
  console.log(index, row);
};

const handleClickPay = (row: GoodsOrder) => {
  curSelectedOrder.value = row;
  payDialogRef.value.dialogVisible = true;
  // 轮训订单状态
  queryOrderStatusTimer = setInterval(() => {
    queryOrderStatus();
  }, 2000);
};

const handleClickSendNotify = (row: GoodsOrder) => {
  ElMessage.success("已发送提醒");
  console.log(row);
};

const handleClickConfirmReceive = async (row: GoodsOrder) => {
  // TODO:
  console.log(row);
  const { data } = await completeGoodsOrder(row.orderNo);
  if (data.affected > 0) {
    ElMessage.success("确认收货成功");
    fetchOrderList();
  }
};

const handleClickApplyForSale = async (row: GoodsOrder) => {
  // TODO:
  const { data } = await applyAfterSale(row.orderNo);
  if (data.affected > 0) {
    ElMessage.success("申请成功，等待平台处理中");
    fetchOrderList();
  }
};

const handleCloseOrder = async (row: GoodsOrder) => {
  // TODO:
  const { data } = await cancelGoodsOrder(row.orderNo);
  if (data.affected > 0) {
    ElMessage.success("订单取消成功");
    fetchOrderList();
  }
};

const handleRefreshQrcode = () => {
  // TODO:
};

const queryOrderStatus = async () => {
  if (!curSelectedOrder.value?.orderNo) return;
  const result = await queryGoodsOrderByNo(curSelectedOrder.value.orderNo);
  const { code, data, message } = result;
  if (Number(code) === 200) {
    const { payStatus } = data;
    if (payStatus === 1) {
      clearInterval(queryOrderStatusTimer);
      ElMessage.success('恭喜你支付成功、可通过 "我的订单" 查看订单详情！');
      // 刷新订单列表
      fetchOrderList();
      setTimeout(() => {
        if (payDialogRef.value) {
          payDialogRef.value.dialogVisible = false;
        }
      }, 2000);
    }
  }
};

// onMounted(async () => {
//   const { data: { data, total: totalCount } } = await queryGoodsOrder(page.value, size.value)
//   orderList.value = data
//   total.value = totalCount
// })

const fetchOrderList = async () => {
  const {
    data: { data, total: totalCount },
  } = await queryGoodsOrder(page.value, size.value);
  orderList.value = data;
  total.value = totalCount;
};

watch(
  [page, size],
  async () => {
    fetchOrderList();
  },
  {
    immediate: true,
  }
);

defineExpose({ userOrderRef });
</script>

<style lang="scss" scoped>
/* 订单列表容器 */
.order-table-container {
  height: 500px;
  padding: 0 20px;
  box-sizing: border-box;
}

/* 表格滚动条样式 */
:deep(.el-table__body-wrapper::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-thumb) {
  border-radius: 3px;
  background: #ddd;
}

:deep(.el-table__body-wrapper::-webkit-scrollbar-track) {
  border-radius: 3px;
  background: #f5f5f5;
}

:deep(.el-table__header thead) {
  background: #2850ff;
  border-radius: 10px;
}

:deep(.el-table__header thead tr) {
  background: #2850ff;
  border-radius: 10px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
}

:deep(.el-table th.el-table__cell) {
  background: none;
}

:deep(.el-table__row .el-table__cell) {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #1b1b1b;
  line-height: 1.5;
  vertical-align: middle;
}

/* 支付弹窗样式 */
.cnyNum {
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.pay-text {
  font-size: 14px;
  color: #666;
}

:deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.el-dialog__header) {
  margin: 0;
  padding: 20px;
  border-bottom: 1px solid #eee;
  background: #fff;
}

:deep(.el-dialog__body) {
  padding: 0;
  overflow: hidden;
}

:deep(.el-dialog__title) {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

:deep(.el-dialog__headerbtn) {
  top: 20px;
}

/* 支付内容容器 */
[class~="h-[391px]"] {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
}

/* 金额显示 */
[class~="mt-[38px]"] {
  margin-top: 20px;
  text-align: center;
  width: auto;
  min-width: 89px;
}

/* 二维码容器 */
[class~="mt-[33px]"] {
  margin-top: 20px;
}

/* 支付方式提示 */
[class~="mt-[37px]"] {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: #f8f8f8;
  border-radius: 8px;
  width: 100%;
  max-width: 207px;
}

/* 微信图标 */
[class~="w-[30px]"] {
  width: 30px;
  height: 30px;
  object-fit: contain;
}

/* 刷新图标 */
:deep(.icon) {
  font-size: 50px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #409eff;
    transform: rotate(180deg);
  }
}

/* 操作按钮样式 */
.operation-buttons {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
}

:deep(.el-button--small) {
  padding: 0 12px;
  min-width: 86px;
  margin: 0;
  height: 26px;
  line-height: 1;
  font-size: 12px;
  border-radius: 3px;
  font-weight: normal;
  transition: all 0.2s ease;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &.el-button--primary {
    background: linear-gradient(135deg, #2850ff, #4066ff);
    &:hover {
      background: linear-gradient(135deg, #4066ff, #5c7fff);
    }
  }

  &.el-button--info {
    background: linear-gradient(135deg, #8c8c8c, #a3a3a3);
    &:hover {
      background: linear-gradient(135deg, #a3a3a3, #bababa);
    }
  }

  &.el-button--success {
    background: linear-gradient(135deg, #52c41a, #73d13d);
    &:hover {
      background: linear-gradient(135deg, #73d13d, #95de64);
    }
  }

  &.el-button--warning {
    background: linear-gradient(135deg, #faad14, #ffc53d);
    &:hover {
      background: linear-gradient(135deg, #ffc53d, #ffd666);
    }
  }

  &.el-button--danger {
    background: linear-gradient(135deg, #ff4d4f, #ff7875);
    &:hover {
      background: linear-gradient(135deg, #ff7875, #ffa39e);
    }
  }

  /* 禁用状态 */
  &.is-disabled {
    background: #f5f7fa !important;
    border: 1px solid #e4e7ed !important;
    color: #c0c4cc !important;
    cursor: not-allowed;
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}

/* 表格单元格内容垂直居中 */
:deep(.el-table__row .el-table__cell) {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #1b1b1b;
  line-height: 1.5;
  vertical-align: middle;
}

/* 订单状态标签样式 */
:deep(.el-tag) {
  border: none;
  border-radius: 3px;
  padding: 3px 8px;
  font-size: 12px;
  font-weight: normal;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

:deep(.el-tag--success) {
  background: linear-gradient(135deg, #f6ffed, #e8f5e9);
  color: #52c41a;
}

:deep(.el-tag--warning) {
  background: linear-gradient(135deg, #fff7e6, #fff3e0);
  color: #faad14;
}

:deep(.el-tag--danger) {
  background: linear-gradient(135deg, #fff1f0, #ffebee);
  color: #ff4d4f;
}

:deep(.el-tag--info) {
  background: linear-gradient(135deg, #f5f5f5, #fafafa);
  color: #8c8c8c;
}

/* 分页样式 */
.pagination-container {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

:deep(.el-pagination) {
  --el-pagination-hover-color: #2850ff;
  --el-pagination-button-color: #606266;
  --el-pagination-hover-bg-color: #f0f2ff;

  .el-pagination__sizes {
    margin-right: 15px;
  }

  .el-select .el-input {
    width: 110px;
    margin: 0 8px;

    input {
      border-radius: 4px;
      &:hover {
        border-color: #2850ff;
      }
    }
  }

  button {
    background: transparent;
    border: none;
    padding: 0 8px;
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;

    &:hover {
      color: #2850ff;
      background-color: #f0f2ff;
    }

    &:disabled {
      background: transparent;
      color: #c0c4cc;
    }
  }

  .el-pager {
    li {
      background: transparent;
      border: none;
      padding: 0 8px;
      min-width: 32px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      font-weight: normal;

      &:hover {
        color: #2850ff;
        background-color: #f0f2ff;
      }

      &.active {
        background: #2850ff;
        color: #fff;
        font-weight: bold;
      }
    }
  }

  .btn-prev,
  .btn-next {
    padding: 0 8px;
    border-radius: 4px;

    &:hover {
      color: #2850ff;
      background-color: #f0f2ff;
    }

    .el-icon {
      font-size: 14px;
    }
  }
}
</style>
