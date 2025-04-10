<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft } from "@element-plus/icons-vue";
import ccLogo from "@/assets/cclogo.png";
import WorkSelectorDialog from "~/components/goods/WorkSelectorDialog.vue";
import PaymentDialog from "@/components/payment/PaymentDialog.vue";
import PaymentResultDialog from "@/components/payment/PaymentResultDialog.vue";

const router = useRouter();

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

// 配送方式
const deliveryType = ref("express"); // express 或 store

// 表单数据
const receiver = ref("");
const phone = ref("");
const province = ref("");
const city = ref("");
const district = ref("");
const detailAddress = ref("");
const saveAddress = ref(false);
const quantity = ref(1);
const selectedStore = ref(""); // 选中的店铺

// 模拟省市区数据
const provinces = [
  { value: "guangdong", label: "广东省" },
  { value: "beijing", label: "北京市" },
];

const cities = [
  { value: "guangzhou", label: "广州市" },
  { value: "shenzhen", label: "深圳市" },
];

const districts = [
  { value: "tianhe", label: "天河区" },
  { value: "haizhu", label: "海珠区" },
];

// 模拟店铺数据
const stores = [
  {
    id: "store1",
    name: "湖北省武汉市人信汇店",
    address: "湖北省武汉市汉阳区人信汇B座3楼",
    phone: "131 1111 2222",
  },
  {
    id: "store2",
    name: "湖北省武汉市光谷店",
    address: "湖北省武汉市洪山区光谷广场B座2楼",
    phone: "131 1111 3333",
  },
  {
    id: "store3",
    name: "湖北省武汉市武昌店",
    address: "湖北省武汉市武昌区中南路步行街A座1楼",
    phone: "131 1111 4444",
  },
  {
    id: "store4",
    name: "湖北省武汉市汉口店",
    address: "湖北省武汉市江汉区解放大道购物中心C座2楼",
    phone: "131 1111 5555",
  },
];

// 计算总价
const totalPrice = computed(() => {
  return (product.value.price * quantity.value).toFixed(2);
});

// 控制作品选择弹窗
const showWorkSelector = ref(false);
const selectedWorkId = ref("");

// 处理作品选择
const handleWorkSelect = (workId: string) => {
  console.log("Work selected:", workId);
  selectedWorkId.value = workId;
};

// 点击选择作品
const handleClickSelectWork = () => {
  console.log("Opening work selector");
  showWorkSelector.value = true;
};

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
    quantity.value = Number(quantity.value) + 1;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value = Number(quantity.value) - 1;
  }
};

// 控制支付弹窗
const showPaymentDialog = ref(false);

// 支付结果弹窗
const showPaymentResult = ref(false);
const paymentStatus = ref<"success" | "failure">("success");

// 处理支付
const handlePay = () => {
  showPaymentDialog.value = true;
};

// 处理支付结果
const handlePaymentResult = (status: "success" | "failure") => {
  paymentStatus.value = status;
  showPaymentResult.value = true;
};

// 处理重试支付
const handleRetryPayment = () => {
  showPaymentDialog.value = true;
};
</script>

<template>
  <div class="product-page h-full">
    <!-- 返回按钮 -->
    <div class="back-nav">
      <el-button class="back-btn" text @click="router.back()">
        <el-icon><ArrowLeft /></el-icon>
        购买
      </el-button>
    </div>

    <div class="main-content">
      <!-- 左侧预览区 -->
      <div class="preview-section">
        <div class="image-preview">
          <img :src="ccLogo" alt="商品预览图" />
        </div>
      </div>

      <!-- 右侧设置区 -->
      <div class="settings-section">
        <!-- 商品标题 -->
        <div class="product-title">蓝发嘻哈星球-卫衣</div>

        <el-form class="settings-form" label-position="left">
          <!-- 配送方式 -->
          <el-form-item>
            <div class="form-content">
              <div class="delivery-tabs">
                <div
                  class="tab"
                  :class="{ active: deliveryType === 'express' }"
                  @click="deliveryType = 'express'"
                >
                  快递
                </div>
                <div
                  class="tab"
                  :class="{ active: deliveryType === 'store' }"
                  @click="deliveryType = 'store'"
                >
                  到店自取
                </div>
              </div>

              <!-- 到店自取店铺列表 -->
              <div v-if="deliveryType === 'store'" class="store-list">
                <el-radio-group
                  v-model="selectedStore"
                  class="store-radio-group"
                >
                  <el-radio
                    v-for="store in stores"
                    :key="store.id"
                    :label="store.id"
                    class="store-radio"
                  >
                    <div class="store-info">
                      <div class="store-name">{{ store.name }}</div>
                      <div class="store-address">{{ store.address }}</div>
                      <div class="store-phone">电话 {{ store.phone }}</div>
                    </div>
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
          </el-form-item>

          <!-- 收货人 -->
          <el-form-item v-if="deliveryType === 'express'" label="收货人">
            <div class="form-content">
              <el-input v-model="receiver" placeholder="请输入收货人姓名" />
            </div>
          </el-form-item>

          <!-- 手机号 -->
          <el-form-item v-if="deliveryType === 'express'" label="手机号">
            <div class="form-content">
              <div class="phone-input">
                <el-input v-model="phone" placeholder="请输入手机号" />
              </div>
            </div>
          </el-form-item>

          <!-- 收货地址 -->
          <el-form-item v-if="deliveryType === 'express'" label="收货地址">
            <div class="form-content">
              <div class="address-selectors">
                <el-select
                  v-model="province"
                  placeholder="省"
                  class="address-select"
                >
                  <el-option
                    v-for="item in provinces"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-select
                  v-model="city"
                  placeholder="市"
                  class="address-select"
                >
                  <el-option
                    v-for="item in cities"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-select
                  v-model="district"
                  placeholder="区"
                  class="address-select"
                >
                  <el-option
                    v-for="item in districts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <el-input
                v-model="detailAddress"
                type="textarea"
                placeholder="请输入详细地址"
                :rows="3"
                class="detail-address"
              />
            </div>
          </el-form-item>

          <!-- 保存地址 -->
          <el-form-item v-if="deliveryType === 'express'">
            <div class="form-content" style="margin-left: 70px">
              <el-checkbox v-model="saveAddress">保存为默认地址</el-checkbox>
            </div>
          </el-form-item>

          <!-- 数量 -->
          <el-form-item label="数量">
            <div class="form-content">
              <div class="quantity-input">
                <el-button :disabled="quantity <= 1" @click="decreaseQuantity"
                  >-</el-button
                >
                <el-input
                  v-model.number="quantity"
                  :min="1"
                  :max="product.stock"
                  controls-position="right"
                  :disabled="true"
                />
                <el-button
                  :disabled="quantity >= product.stock"
                  @click="increaseQuantity"
                  >+</el-button
                >
              </div>
            </div>
          </el-form-item>

          <!-- 价格和付款按钮 -->
          <el-form-item>
            <div class="form-content">
              <div class="bottom-bar">
                <div class="price">{{ totalPrice }}</div>
                <div>
                  <el-button type="primary" class="pay-btn" @click="handlePay">
                    去付款
                  </el-button>
                  <div class="payment-tip">
                    温馨提示：该商品为定制商品，下单后不支持退款。
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 作品选择弹窗 -->
    <WorkSelectorDialog v-model="showWorkSelector" @select="handleWorkSelect" />

    <!-- 支付弹窗 -->
    <PaymentDialog
      v-model="showPaymentDialog"
      :amount="Number(totalPrice)"
      :package-id="1"
      @payment-success="handlePaymentResult('success')"
      @payment-failure="handlePaymentResult('failure')"
    />

    <!-- 支付结果弹窗 -->
    <PaymentResultDialog
      v-model="showPaymentResult"
      :status="paymentStatus"
      @retry="handleRetryPayment"
    />
  </div>
</template>

<style scoped>
.product-page {
  background: #0a0f25;
  padding: 20px;
  overflow-y: auto;
}

.back-nav {
  margin-bottom: 20px;
}

.back-btn {
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.main-content {
  display: flex;
  justify-content: center;
  gap: 40px;
  width: 100%;
}

.preview-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.image-preview {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-preview img {
  width: 80%;
  height: 80%;
  object-fit: contain;
}

.product-title {
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 24px;
}

.settings-section {
  flex: 1;
  position: relative;
}

.delivery-tabs {
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
  width: fit-content;
}

.tab {
  color: rgba(255, 255, 255, 0.5);
  padding: 2px 0;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s ease;
  position: relative;
}

.tab.active {
  color: #fff;
  font-weight: 500;
}

.tab.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #3468fe;
}

.phone-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

.prefix {
  color: #fff;
  font-size: 16px;
}

.address-selectors {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.address-select {
  flex: 1;
}

.detail-address {
  width: 100%;
}

.quantity-input {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 190px;
}

.quantity-input .el-input {
  width: 126px !important;
}

.quantity-input :deep(.el-button) {
  background: rgba(34, 47, 245, 1);
  border: none;
  color: #fff;
  font-size: 20px;
  padding: 0;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-input :deep(.el-button:hover) {
  background: rgba(34, 47, 245, 0.8);
}

.quantity-input :deep(.el-button.is-disabled) {
  background: rgba(34, 47, 245, 0.5);
  color: rgba(255, 255, 255, 0.5);
  cursor: not-allowed;
}

.quantity-input :deep(.el-input__inner) {
  padding: 0;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #fff !important;
  background: transparent;
}

.quantity-input :deep(.el-input .el-input__wrapper) {
  background: #2a2a2a;
  padding: 0;
  justify-content: center;
  border-radius: 4px;
  box-shadow: none !important;
  height: 40px;
}

.quantity-input :deep(.el-input .el-input__wrapper.is-focus) {
  box-shadow: none !important;
}

.quantity-input :deep(.el-input.is-disabled .el-input__inner) {
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
}

.bottom-bar {
  display: flex;
  align-items: flex-start;
  /* flex-direction: column; */
  gap: 12px;
  width: 100%;
}

.price {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin-right: 40px;
}

.price::before {
  content: "¥";
  font-size: 24px;
  margin-right: 4px;
}

.pay-btn {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  font-size: 18px;
  background: rgba(34, 47, 245, 1);
  border: none;
}

.pay-btn:hover {
  background: rgba(34, 47, 245, 0.8);
}

.payment-tip {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
}

.settings-form {
  margin-bottom: 24px;
}

.settings-form :deep(.el-form-item) {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}

.settings-form :deep(.el-form-item__label) {
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 28.96px;
  width: 100px !important;
  padding-top: 8px;
}

.settings-form :deep(.el-form-item__content) {
  /* margin-left: 40px !important; */
  flex: 1;
}

.form-content {
  width: 70%;
}

.settings-form :deep(.el-input),
.settings-form :deep(.el-select) {
  width: 100%;
}

.settings-form :deep(.el-input .el-input__wrapper) {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: none;
  border: none;
  padding: 0 12px;
}

.settings-form :deep(.el-input .el-input__inner) {
  height: 40px;
  line-height: 40px;
  color: #fff;
  background: transparent;
}

.settings-form :deep(.el-input .el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
}

.settings-form :deep(.el-textarea .el-textarea__inner) {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  box-shadow: none !important;
  color: #fff;
  padding: 12px;
  font-size: 18px;
}

.settings-form :deep(.el-textarea .el-textarea__inner::placeholder) {
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
}

.settings-form :deep(.el-textarea .el-textarea__inner:focus) {
  box-shadow: none !important;
}

.settings-form :deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: none !important;
}

.settings-form :deep(.el-select .el-input__wrapper.is-focus) {
  box-shadow: none !important;
}

.settings-form :deep(.el-checkbox__label) {
  color: #fff;
}

.settings-form :deep(.el-select-dropdown) {
  background: #1a1f35;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.settings-form :deep(.el-select-dropdown__item) {
  color: rgba(255, 255, 255, 0.8);
  height: 40px;
  line-height: 40px;
}

.settings-form :deep(.el-select-dropdown__item.hover),
.settings-form :deep(.el-select-dropdown__item:hover) {
  background: rgba(52, 104, 254, 0.1);
}

.settings-form :deep(.el-select-dropdown__item.selected) {
  color: #3468fe;
  font-weight: 500;
  background: rgba(52, 104, 254, 0.1);
}

.settings-form :deep(.el-popper__arrow) {
  display: none;
}

.store-list {
  margin-top: 16px;
  height: 300px; /* 固定高度，显示两条记录 */
  overflow-y: auto;
  background: rgba(18, 18, 18, 1);
  border-radius: 8px;
}

.store-list::-webkit-scrollbar {
  width: 4px;
}

.store-list::-webkit-scrollbar-track {
  background: transparent;
}

.store-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.store-radio-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 300px; */
}

.store-radio {
  padding: 16px;
  margin: 0 !important;
  height: 150px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
}

.store-radio:last-child {
  border-bottom: none;
}

.store-info {
  margin-left: 8px;
}

.store-name {
  font-size: 16px;
  color: #fff;
  line-height: 40px;
  /* margin-bottom: 8px; */
}

.store-address,
.store-phone {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  /* margin-bottom: 4px; */
  line-height: 32px;
}

.settings-form :deep(.el-radio) {
  width: 100%;
  margin-right: 0;
}

.settings-form :deep(.el-radio__input) {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.settings-form :deep(.el-radio__label) {
  padding: 0;
}

.settings-form :deep(.el-radio__inner) {
  width: 24px;
  height: 24px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.settings-form :deep(.el-radio__inner::after) {
  width: 12px;
  height: 12px;
  background: #3468fe;
}

.settings-form :deep(.el-radio.is-checked .el-radio__inner) {
  border-color: #3468fe;
  background: transparent;
}

.settings-form :deep(.el-radio.is-checked .el-radio__label) {
  color: #fff;
}

::v-deep .el-select__wrapper {
  background-color: unset !important;
}
</style>
