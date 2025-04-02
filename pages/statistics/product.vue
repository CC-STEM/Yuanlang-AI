<script setup lang="ts">
import { ref } from "vue";

// 商品信息
const product = ref({
  id: "29393939",
  name: "魔光马克杯",
  price: 59.99,
  originalPrice: 99.99,
  stock: 999,
  sales: 2000,
  type: "马克杯",
  image: "/products/mug.png",
  description: "独特的魔光效果，让您的饮品体验更加精彩",
  specs: [
    { label: "容量", value: "350ml" },
    { label: "材质", value: "陶瓷" },
    { label: "尺寸", value: "8.5 x 9.6cm" },
  ],
});

// 发货信息
const shipping = ref({
  address: "北京市海淀区某某小区1号楼1单元102室",
  contact: "Lucy",
  phone: "131 2222 1111",
});

// 购买数量
const quantity = ref(1);

// 复制商品ID
const copyProductId = () => {
  navigator.clipboard
    .writeText(product.value.id)
    .then(() => {
      // 可以添加成功提示
    })
    .catch((err) => {
      console.error("复制失败: ", err);
    });
};

// 增减数量
const increaseQuantity = () => {
  if (quantity.value < product.value.stock) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// 购买操作
const handleBuyNow = () => {
  // 立即购买逻辑
};

const handleAddToCart = () => {
  // 加入购物车逻辑
};
</script>

<template>
  <div class="product-detail-page">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <span class="back-icon">←</span>
        <h1>商品详情</h1>
      </div>

      <!-- 基本信息 -->
      <div class="section basic-info">
        <div class="section-header">
          <h2>基本信息</h2>
        </div>

        <div class="section-content">
          <div class="info-item">
            <span class="label">商品编号</span>
            <div class="value-with-action">
              <span class="value">{{ product.id }}</span>
              <el-button size="small" class="copy-btn" @click="copyProductId"
                >复制</el-button
              >
            </div>
          </div>

          <div class="info-item">
            <span class="label">商品名称</span>
            <span class="value product-name">{{ product.name }}</span>
          </div>

          <div class="info-item">
            <span class="label">商品价格</span>
            <div class="price-info">
              <span class="current-price">¥{{ product.price }}</span>
              <span class="original-price">¥{{ product.originalPrice }}</span>
            </div>
          </div>

          <div class="info-item">
            <span class="label">库存</span>
            <span class="value">{{ product.stock }}</span>
          </div>

          <div class="info-item">
            <span class="label">销量</span>
            <span class="value">{{ product.sales }}</span>
          </div>
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="section product-info">
        <div class="section-header">
          <h2>商品信息</h2>
        </div>

        <div class="section-content">
          <div class="product-image-container">
            <img :src="product.image" :alt="product.name" class="main-image" />
            <div class="thumbnail-list">
              <img :src="product.image" alt="thumbnail" class="thumbnail" />
              <img :src="product.image" alt="thumbnail" class="thumbnail" />
              <img :src="product.image" alt="thumbnail" class="thumbnail" />
            </div>
          </div>

          <div class="product-description">
            <p>{{ product.description }}</p>
          </div>

          <div class="product-specs">
            <div
              v-for="spec in product.specs"
              :key="spec.label"
              class="spec-item"
            >
              <span class="spec-label">{{ spec.label }}</span>
              <span class="spec-value">{{ spec.value }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 发货信息 -->
      <div class="section shipping-info">
        <div class="section-header">
          <h2>发货信息</h2>
        </div>

        <div class="section-content">
          <div class="info-item">
            <span class="label">收货地址</span>
            <span class="value">{{ shipping.address }}</span>
          </div>

          <div class="info-item">
            <span class="label">联系人</span>
            <span class="value">{{ shipping.contact }}</span>
          </div>

          <div class="info-item">
            <span class="label">联系电话</span>
            <span class="value">{{ shipping.phone }}</span>
          </div>
        </div>
      </div>

      <!-- 购买操作 -->
      <div class="purchase-section">
        <div class="quantity-selector">
          <span class="quantity-label">数量</span>
          <div class="quantity-controls">
            <button class="quantity-btn" @click="decreaseQuantity">-</button>
            <span class="quantity-value">{{ quantity }}</span>
            <button class="quantity-btn" @click="increaseQuantity">+</button>
          </div>
        </div>

        <div class="action-buttons">
          <el-button type="primary" class="buy-now-btn" @click="handleBuyNow"
            >立即购买</el-button
          >
          <el-button class="add-to-cart-btn" @click="handleAddToCart"
            >加入购物车</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  padding: 20px;
  background: #121212;
  color: rgba(255, 255, 255, 0.85);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 120px;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 0 4px;
}

.back-icon {
  font-size: 24px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.85);
}

h1 {
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
}

.section {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
}

.section-header {
  background: rgba(0, 0, 0, 0.25);
  padding: 14px 20px;
}

h2 {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
}

.section-content {
  padding: 16px 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  color: rgba(255, 255, 255, 0.45);
  font-size: 14px;
}

.value {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
}

.value-with-action {
  display: flex;
  align-items: center;
  gap: 12px;
}

.copy-btn {
  background: #1677ff;
  color: #ffffff;
  border: none;
  padding: 4px 12px;
  height: 24px;
  font-size: 12px;
  border-radius: 4px;
  line-height: 1;
}

.product-name {
  color: #1677ff;
  font-weight: 400;
}

.price-info {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.current-price {
  color: #ff4d4f;
  font-size: 20px;
  font-weight: 500;
}

.original-price {
  color: rgba(255, 255, 255, 0.45);
  font-size: 14px;
  text-decoration: line-through;
}

.product-image-container {
  margin: -16px -20px 16px;
}

.main-image {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover;
}

.thumbnail-list {
  display: flex;
  padding: 12px 20px 0;
  gap: 8px;
}

.thumbnail {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
}

.thumbnail.active {
  border-color: #1677ff;
}

.product-description {
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
  font-size: 14px;
  margin-bottom: 16px;
}

.product-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.spec-item {
  display: flex;
  gap: 8px;
  font-size: 14px;
}

.spec-label {
  color: rgba(255, 255, 255, 0.45);
}

.spec-value {
  color: rgba(255, 255, 255, 0.85);
}

.purchase-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  padding: 12px 20px calc(12px + env(safe-area-inset-bottom));
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.quantity-label {
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1px;
  border-radius: 4px;
  overflow: hidden;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: #1677ff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: background-color 0.2s;
}

.quantity-btn:hover {
  background: rgba(255, 255, 255, 0.12);
}

.quantity-btn:disabled {
  color: rgba(255, 255, 255, 0.25);
  cursor: not-allowed;
}

.quantity-value {
  width: 44px;
  height: 32px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.buy-now-btn,
.add-to-cart-btn {
  flex: 1;
  height: 40px;
  font-size: 15px;
  border-radius: 20px;
  font-weight: 500;
}

.buy-now-btn {
  background: #1677ff;
  border-color: #1677ff;
}

.buy-now-btn:hover {
  background: #4096ff;
  border-color: #4096ff;
}

.add-to-cart-btn {
  background: transparent;
  border: 1px solid #1677ff;
  color: #1677ff;
}

.add-to-cart-btn:hover {
  background: rgba(22, 119, 255, 0.1);
}
</style>
