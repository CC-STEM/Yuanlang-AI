<script setup lang="ts">
import { ref } from "vue";

// 订单信息
const order = ref({
  id: "29393939",
  status: "待收货",
  payTime: "2023-06-19 10:00:00",
  completeTime: "2023-06-19 10:00:00",
  payMethod: "支付宝",
  amount: 59.99,
});

// 商品信息
const product = ref({
  name: "魔光马克杯",
  type: "马克杯",
  image: "/products/mug.png",
  quantity: 1,
});

// 收货信息
const shipping = ref({
  method: "快递",
  receiver: "Lucy",
  phone: "131 2222 1111",
  address: "北京市海淀区某某小区1号楼1单元102室",
  trackingNumber: "YT727282828",
});

// 复制订单号
const copyOrderId = () => {
  navigator.clipboard
    .writeText(order.value.id)
    .then(() => {
      // 可以添加成功提示
    })
    .catch((err) => {
      console.error("复制失败: ", err);
    });
};

// 确认收货
const confirmReceipt = () => {
  // 确认收货逻辑
};
</script>

<template>
  <div class="order-detail-page">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <span class="back-icon">←</span>
        <h1>订单详情</h1>
      </div>

      <!-- 基本信息 -->
      <div class="section basic-info">
        <div class="section-header">
          <h2>基本信息</h2>
        </div>

        <div class="section-content">
          <div class="info-item">
            <span class="label">订单编号</span>
            <div class="value-with-action">
              <span class="value">{{ order.id }}</span>
              <el-button size="small" class="copy-btn" @click="copyOrderId"
                >复制</el-button
              >
            </div>
          </div>

          <div class="info-item">
            <span class="label">订单状态</span>
            <span class="value status">{{ order.status }}</span>
          </div>

          <div class="info-item">
            <span class="label">付款时间</span>
            <span class="value">{{ order.payTime }}</span>
          </div>

          <div class="info-item">
            <span class="label">完成时间</span>
            <span class="value">{{ order.completeTime }}</span>
          </div>

          <div class="info-item">
            <span class="label">实付款</span>
            <span class="value price">¥{{ order.amount }}</span>
          </div>

          <div class="info-item">
            <span class="label">付款方式</span>
            <span class="value">{{ order.payMethod }}</span>
          </div>
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="section product-info">
        <div class="section-header">
          <h2>商品信息</h2>
        </div>

        <div class="section-content">
          <div class="product-item">
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-details">
              <div class="product-name">{{ product.name }}</div>
              <div class="product-type">{{ product.type }}</div>
              <div class="product-quantity">数量：{{ product.quantity }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 收货信息 -->
      <div class="section shipping-info">
        <div class="section-header">
          <h2>收货信息</h2>
        </div>

        <div class="section-content">
          <div class="info-item">
            <span class="label">发货方式</span>
            <span class="value">{{ shipping.method }}</span>
          </div>

          <div class="info-item">
            <span class="label">收货人</span>
            <span class="value">{{ shipping.receiver }}</span>
          </div>

          <div class="info-item">
            <span class="label">手机号</span>
            <span class="value">{{ shipping.phone }}</span>
          </div>

          <div class="info-item">
            <span class="label">收货地址</span>
            <span class="value">{{ shipping.address }}</span>
          </div>

          <div class="info-item">
            <span class="label">物流单号</span>
            <span class="value tracking-number">{{
              shipping.trackingNumber
            }}</span>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-container">
        <el-button type="primary" class="confirm-btn" @click="confirmReceipt"
          >确认收货</el-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-detail-page {
  min-height: 100vh;
  padding: 20px;
  background: #000000;
  color: #ffffff;
}

.container {
  max-width: 800px;
  margin: 0 auto;
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

h1 {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}

.section {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}

.section-header {
  background: rgba(0, 0, 0, 0.3);
  padding: 12px 16px;
}

h2 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.section-content {
  padding: 16px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 12px;
}

.info-item:last-child {
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: 0;
}

.label {
  color: #999999;
  font-size: 14px;
}

.value {
  font-size: 14px;
}

.value-with-action {
  display: flex;
  align-items: center;
  gap: 12px;
}

.copy-btn {
  background: #1677ff;
  color: white;
  border: none;
  padding: 4px 16px;
  font-size: 12px;
  border-radius: 4px;
}

.status {
  color: #ff8800;
  font-weight: 500;
}

.price {
  color: #ff4d4f;
  font-size: 18px;
  font-weight: 600;
}

.tracking-number {
  color: #1677ff;
}

.product-item {
  display: flex;
  gap: 16px;
}

.product-image {
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-name {
  font-size: 16px;
  font-weight: 500;
  color: #1677ff;
}

.product-type,
.product-quantity {
  font-size: 14px;
  color: #999999;
}

.action-container {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
}

.confirm-btn {
  background: #1677ff;
  border-color: #1677ff;
  padding: 10px 40px;
  font-size: 16px;
  border-radius: 22px;
}
</style>
