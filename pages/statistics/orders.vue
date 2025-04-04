<script setup lang="ts">
import { ref, computed } from "vue";

interface OrderItem {
  orderId: string;
  payTime: string;
  completeTime: string;
  status: string;
  productName: string;
  productType: string;
  image: string;
  quantity: number;
  amount: number;
  shippingMethod: string;
  trackingNumber: string;
  actions: string[];
}

// 搜索条件
const orderNumber = ref("");
const payTimeRange = ref("");
const completeTimeRange = ref("");
const orderStatus = ref("全部");
const productType = ref("全部");
const shippingMethod = ref("全部");
const trackingNumber = ref("");

// 生成模拟数据
const generateOrders = (count: number): OrderItem[] => {
  const statuses = ["已退款", "已完成", "待收货", "待发货"];
  const products = [
    { name: "仙女的马克杯", type: "马克杯", price: 59.99 },
    { name: "魔法T恤", type: "T恤", price: 99.99 },
    { name: "星空手机壳", type: "手机壳", price: 39.99 },
    { name: "彩虹帽衫", type: "帽衫", price: 159.99 },
  ];
  const shippingMethods = ["快递", "自提"];

  return Array.from({ length: count }, (_, index) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const isExpress =
      shippingMethods[Math.floor(Math.random() * shippingMethods.length)] ===
      "快递";
    const orderId = (1222244 + index).toString();
    const quantity = Math.floor(Math.random() * 3) + 1;

    const baseDate = new Date("2024-02-20");
    const randomDays = Math.floor(Math.random() * 30);
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    const payTime = new Date(
      baseDate.getTime() -
        (randomDays * 24 * 60 * 60 * 1000 +
          randomHours * 60 * 60 * 1000 +
          randomMinutes * 60 * 1000)
    );

    return {
      orderId,
      payTime: payTime.toLocaleString("zh-CN", { hour12: false }),
      completeTime:
        status === "已完成"
          ? payTime.toLocaleString("zh-CN", { hour12: false })
          : "/",
      status,
      productName: product.name,
      productType: product.type,
      image: `/products/${product.type.toLowerCase()}.png`,
      quantity,
      amount: Number((product.price * quantity).toFixed(2)),
      shippingMethod: isExpress ? "快递" : "自提",
      trackingNumber: isExpress ? `YT${18282282 + index}` : "/",
      actions: getActions(status),
    };
  });
};

const getActions = (status: string): string[] => {
  switch (status) {
    case "已完成":
      return ["查看", "再次购买"];
    case "待收货":
      return ["查看", "确认收货"];
    case "已退款":
    case "待发货":
      return ["查看"];
    default:
      return ["查看"];
  }
};

// 表格数据
const orders = ref<OrderItem[]>(generateOrders(50));

// 分页配置
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(orders.value.length);

// 获取当前页数据
const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return orders.value.slice(start, end);
});

// 处理搜索
const handleSearch = () => {
  // 实现搜索逻辑
};

// 处理重置
const handleReset = () => {
  orderNumber.value = "";
  payTimeRange.value = "";
  completeTimeRange.value = "";
  orderStatus.value = "全部";
  productType.value = "全部";
  shippingMethod.value = "全部";
  trackingNumber.value = "";
};

// 处理分页变化
const handlePageChange = (page: number) => {
  currentPage.value = page;
};

// 处理每页条数变化
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
};

// 获取状态样式
const getStatusStyle = (status: string) => {
  const styles: Record<string, { color: string }> = {
    已退款: { color: "#00B578" },
    已完成: { color: "#999999" },
    待收货: { color: "#FF8800" },
    待发货: { color: "#FF8800" },
  };
  return styles[status] || {};
};

// 获取按钮样式
const getButtonStyle = (text: string) => {
  const styles: Record<string, string> = {
    查看: "view-btn",
    再次购买: "buy-again-btn",
    确认收货: "confirm-btn",
  };
  return styles[text] || "";
};
</script>

<template>
  <div class="orders-page">
    <div class="page-header">
      <span class="back-icon">←</span>
      <h1>订单列表</h1>
    </div>

    <div class="search-section">
      <div class="search-row">
        <div class="search-item">
          <el-input
            v-model="orderNumber"
            placeholder="订单编号"
            class="search-input"
          />
        </div>
        <div class="search-item">
          <el-date-picker
            v-model="payTimeRange"
            type="datetime"
            placeholder="付款时间"
            class="search-input"
          />
        </div>
        <div class="search-item">
          <el-date-picker
            v-model="completeTimeRange"
            type="datetime"
            placeholder="完成时间"
            class="search-input"
          />
        </div>
        <div class="search-item">
          <el-select
            v-model="orderStatus"
            placeholder="状态"
            class="search-input"
          >
            <el-option label="全部" value="全部" />
            <el-option label="已退款" value="已退款" />
            <el-option label="已完成" value="已完成" />
            <el-option label="待收货" value="待收货" />
            <el-option label="待发货" value="待发货" />
          </el-select>
        </div>
        <div class="search-item">
          <el-select
            v-model="productType"
            placeholder="实物类型"
            class="search-input"
          >
            <el-option label="全部" value="全部" />
            <el-option label="马克杯" value="马克杯" />
          </el-select>
        </div>
        <div class="search-item">
          <el-select
            v-model="shippingMethod"
            placeholder="发货方式"
            class="search-input"
          >
            <el-option label="全部" value="全部" />
            <el-option label="快递" value="快递" />
            <el-option label="自提" value="自提" />
          </el-select>
        </div>
        <div class="search-item">
          <el-input
            v-model="trackingNumber"
            placeholder="物流单号"
            class="search-input"
          />
        </div>
      </div>
      <div class="button-row">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </div>

    <div class="table-section">
      <el-table :data="currentPageData" style="width: 100%">
        <el-table-column prop="orderId" label="订单编号" width="120" />
        <el-table-column prop="payTime" label="付款时间" width="180" />
        <el-table-column prop="completeTime" label="完成时间" width="180" />
        <el-table-column prop="status" label="订单状态" width="100">
          <template #default="{ row }">
            <span :style="getStatusStyle(row.status)">{{ row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="200">
          <template #default="{ row }">
            <div class="product-cell">
              <img
                :src="row.image"
                :alt="row.productName"
                class="product-image"
              />
              <span class="product-name">{{ row.productName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="productType" label="实物类型" width="100" />
        <el-table-column prop="quantity" label="数量" width="80" />
        <el-table-column prop="amount" label="实付款 (¥)" width="120" />
        <el-table-column prop="shippingMethod" label="发货方式" width="100" />
        <el-table-column prop="trackingNumber" label="物流单号" width="120" />
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button
                v-for="action in row.actions"
                :key="action"
                :class="getButtonStyle(action)"
                @click="() => {}"
              >
                {{ action }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-section">
        <span class="total-text">共{{ total }}条数据</span>
        <el-select v-model="pageSize" class="page-size-select">
          <el-option label="10条/页" :value="10" />
          <el-option label="20条/页" :value="20" />
          <el-option label="50条/页" :value="50" />
        </el-select>
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          :pager-count="5"
          layout="prev, pager, next, jumper"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.orders-page {
  min-height: 100vh;
  padding: 20px;
  background: #000000;
  color: #ffffff;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.back-icon {
  font-size: 20px;
  cursor: pointer;
}

.search-section {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.search-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.search-item {
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
}

.button-row {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.table-section {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
}

:deep(.el-table) {
  background: transparent !important;
  color: #ffffff !important;
}

:deep(.el-table th) {
  background: rgba(0, 0, 0, 0.3) !important;
  color: #ffffff !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.el-table td) {
  background: transparent !important;
  color: #ffffff !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
  background: rgba(255, 255, 255, 0.1) !important;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-image {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.product-name {
  color: #1677ff;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.view-btn {
  background: #1677ff;
  color: #ffffff;
}

.buy-again-btn {
  background: #ff8800;
  color: #ffffff;
}

.confirm-btn {
  background: #00b578;
  color: #ffffff;
}

.pagination-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 20px;
}

.total-text {
  color: #999999;
}

.page-size-select {
  width: 100px;
}

:deep(.el-pagination) {
  --el-pagination-bg-color: transparent;
  --el-pagination-text-color: #ffffff;
  --el-pagination-button-color: #ffffff;
  --el-pagination-button-bg-color: transparent;
  --el-pagination-button-disabled-color: #606266;
  --el-pagination-button-disabled-bg-color: transparent;
  --el-pagination-hover-color: #409eff;
}
</style>
