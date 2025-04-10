<script setup lang="ts">
import { onMounted, nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  InfoFilled,
} from "@element-plus/icons-vue";
import ccLogo from "@/assets/cclogo.png";
import RewardDialog from "~/components/customize/RewardDialog.vue";
import WorkSelectorDialog from "~/components/goods/WorkSelectorDialog.vue";
import type { ElColorPicker } from "element-plus";

interface Product {
  id: number;
  name: string;
  icon: string;
  selected?: boolean;
}

interface ColorOption {
  id: string;
  name: string;
  color: string;
  selected?: boolean;
}

const products = ref<Product[]>([
  { id: 1, name: "冰箱贴", icon: ccLogo, selected: true },
  { id: 2, name: "马克杯", icon: ccLogo },
  { id: 3, name: "衬衫", icon: ccLogo },
  { id: 4, name: "手机壳", icon: ccLogo },
  { id: 5, name: "卫衣", icon: ccLogo },
  { id: 6, name: "帆布包", icon: ccLogo },
  { id: 7, name: "抱枕", icon: ccLogo },
  { id: 8, name: "笔记本", icon: ccLogo },
  { id: 9, name: "钥匙扣", icon: ccLogo },
  { id: 10, name: "鼠标垫", icon: ccLogo },
  { id: 11, name: "帽子", icon: ccLogo },
  { id: 12, name: "雨伞", icon: ccLogo },
  { id: 13, name: "水杯", icon: ccLogo },
  { id: 14, name: "毛巾", icon: ccLogo },
  { id: 15, name: "袜子", icon: ccLogo },
  { id: 16, name: "围巾", icon: ccLogo },
  { id: 17, name: "手套", icon: ccLogo },
  { id: 18, name: "口罩", icon: ccLogo },
  { id: 19, name: "徽章", icon: ccLogo },
  { id: 20, name: "明信片", icon: ccLogo },
]);

const colorOptions = ref<ColorOption[]>([
  { id: "default", name: "选净色", color: "#FFFFFF", selected: true },
  { id: "pink", name: "粉红色", color: "#FF69B4" },
  { id: "blue", name: "天蓝色", color: "#87CEEB" },
  { id: "purple", name: "科技紫", color: "#9370DB" },
  { id: "teal", name: "翠绿色", color: "#40E0D0" },
]);

const productName = ref("");
const price = ref(29.99);
const selectedImage = ref<File | null>(null);
const imagePreview = ref("");

const copyToProducts = ref(false);
const copyToShop = ref(false);

const showRewardDialog = ref(false);
const showColorPicker = ref(false);
const customColor = ref("");
const showCancelDialog = ref(false);

const productSelectorRef = ref<HTMLElement | null>(null);
const customColorPicker = ref<InstanceType<typeof ElColorPicker> | null>(null);

// 控制作品选择弹窗
const showWorkSelector = ref(false);
const selectedWorkId = ref("");

const router = useRouter();

// 获取当前选中的产品索引
const getSelectedProductIndex = () => {
  return products.value.findIndex((p) => p.selected);
};

// 处理上一个产品选择
const handlePrevProduct = () => {
  const currentIndex = getSelectedProductIndex();
  if (currentIndex > 0) {
    handleProductSelect(products.value[currentIndex - 1]);
  }
};

// 处理下一个产品选择
const handleNextProduct = () => {
  const currentIndex = getSelectedProductIndex();
  if (currentIndex < products.value.length - 1) {
    handleProductSelect(products.value[currentIndex + 1]);
  }
};

const handleProductSelect = (product: Product) => {
  products.value.forEach((p) => (p.selected = p.id === product.id));

  // 在下一个渲染周期中滚动到选中的产品
  nextTick(() => {
    const productSelector = productSelectorRef.value;
    if (!productSelector) return;

    const selectedItem = productSelector.querySelector(
      ".product-item.active"
    ) as HTMLElement;
    if (!selectedItem) return;

    const containerWidth = productSelector.clientWidth;
    const itemWidth = selectedItem.clientWidth;
    const itemLeft = selectedItem.offsetLeft;

    // 计算滚动位置，使选中的产品居中
    const scrollLeft = itemLeft - containerWidth / 2 + itemWidth / 2;

    productSelector.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  });
};

const handleColorSelect = (color: ColorOption) => {
  // 只更新选中状态，不影响自定义颜色的值
  colorOptions.value.forEach((c) => (c.selected = c.id === color.id));
};

const handleCustomColorChange = (value: string | null) => {
  if (!value) return;
  // 更新自定义颜色
  customColor.value = value;
  // 取消其他颜色的选中状态
  colorOptions.value.forEach((c) => (c.selected = false));
};

const handleSubmit = () => {
  const selectedProduct = products.value.find((p) => p.selected);
  const selectedColor = colorOptions.value.find((c) => c.selected);

  console.log("提交数据:", {
    product: selectedProduct?.name,
    color: selectedColor?.name,
    name: productName.value,
    price: price.value,
    image: selectedImage.value,
  });
};

const handleSaveAndBuy = () => {
  router.push("./product");
};

const handleSaveOnly = () => {
  showCancelDialog.value = true;
};

// 处理取消确认
const handleCancelConfirm = () => {
  router.push("./product");
  showCancelDialog.value = false;
};

// 处理作品选择
const handleWorkSelect = (workId: string) => {
  console.log("Work selected:", workId);
  selectedWorkId.value = workId;
  // TODO: 更新预览图等逻辑
};

onMounted(() => {
  // 确保有一个产品被选中
  if (!products.value.some((p) => p.selected) && products.value.length > 0) {
    handleProductSelect(products.value[0]);
  }
});
</script>

<template>
  <div class="customize-page h-full">
    <!-- 返回按钮 -->
    <div class="back-nav">
      <el-button class="back-btn" text>
        <el-icon><ArrowLeft /></el-icon>
        定制实物商品
      </el-button>
    </div>

    <!-- 商品选择器 -->
    <div class="product-selector-wrapper">
      <el-button
        class="nav-btn prev-btn"
        :disabled="getSelectedProductIndex() === 0"
        @click="handlePrevProduct"
      >
        <el-icon><ArrowLeft /></el-icon>
      </el-button>

      <div class="product-selector" ref="productSelectorRef">
        <div
          v-for="product in products"
          :key="product.id"
          class="product-item"
          :class="{ active: product.selected }"
          @click="handleProductSelect(product)"
        >
          <img :src="product.icon" :alt="product.name" class="product-icon" />
          <span class="product-name">{{ product.name }}</span>
        </div>
      </div>

      <el-button
        class="nav-btn next-btn"
        :disabled="getSelectedProductIndex() === products.length - 1"
        @click="handleNextProduct"
      >
        <el-icon><ArrowRight /></el-icon>
      </el-button>
    </div>

    <div class="main-content">
      <!-- 左侧预览区 -->
      <div class="preview-section">
        <div class="image-preview">
          <img :src="ccLogo" alt="预览图" />
        </div>
      </div>

      <!-- 右侧设置区 -->
      <div class="settings-section">
        <el-form class="settings-form" label-position="left">
          <!-- 图片上传 -->
          <el-form-item label="图片">
            <div class="form-content">
              <div class="section-tabs">
                <span
                  class="tab active"
                  @click="
                    () => {
                      console.log('Opening work selector');
                      showWorkSelector = true;
                    }
                  "
                  style="cursor: pointer"
                >
                  选择作品
                </span>
              </div>
            </div>
          </el-form-item>

          <!-- 颜色选择 -->
          <el-form-item label="颜色">
            <div class="form-content">
              <div class="color-selector">
                <div
                  v-for="color in colorOptions"
                  :key="color.id"
                  class="color-option"
                  :class="{ active: color.selected }"
                  @click="handleColorSelect(color)"
                >
                  <div
                    class="color-preview"
                    :style="{ backgroundColor: color.color }"
                  />
                  <span class="color-name">{{ color.name }}</span>
                </div>
                <!-- 自定义颜色选项 -->
                <div
                  class="color-option"
                  :class="{ active: !colorOptions.some((c) => c.selected) }"
                  @click="customColorPicker?.focus()"
                >
                  <div
                    class="color-preview"
                    :style="customColor ? { backgroundColor: customColor } : {}"
                  >
                    <el-icon class="plus-icon"><Plus /></el-icon>
                  </div>
                  <el-color-picker
                    ref="customColorPicker"
                    v-model="customColor"
                    class="custom-color-picker"
                    show-alpha
                    :predefine="[
                      '#ff4500',
                      '#ff8c00',
                      '#ffd700',
                      '#90ee90',
                      '#00ced1',
                      '#1e90ff',
                      '#c71585',
                      '#ff69b4',
                    ]"
                    @change="handleCustomColorChange"
                  />
                  <span class="color-name">自定义</span>
                </div>
              </div>
            </div>
          </el-form-item>

          <!-- 名称输入 -->
          <el-form-item label="名称">
            <div class="form-content">
              <el-input
                v-model="productName"
                placeholder="请输入名称"
                maxlength="12"
                show-word-limit
              />
            </div>
          </el-form-item>

          <!-- 价格输入 -->
          <el-form-item label="售价">
            <div class="form-content">
              <div class="price-input">
                <el-input v-model="price" placeholder="请输入价格" />
                <span class="currency">元/个</span>
                <span @click="showRewardDialog = true" class="info">
                  <el-icon class="info-icon"><InfoFilled></InfoFilled></el-icon>
                  设计奖励说明
                </span>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <!-- 复制商品设置 -->
        <div class="copy-settings">
          <el-checkbox v-model="copyToProducts">
            复制商品设置，分享到微信
          </el-checkbox>
          <el-checkbox v-model="copyToShop"> 复制到店铺全站 </el-checkbox>
        </div>

        <!-- 操作按钮 -->
        <div class="button-group">
          <button class="save-buy-btn" @click="handleSaveAndBuy">
            保存并购买
          </button>
          <button class="save-only-btn" @click="handleSaveOnly">
            保存，暂不购买
          </button>
        </div>
      </div>
    </div>

    <!-- 添加作品选择弹窗 -->
    <WorkSelectorDialog v-model="showWorkSelector" @select="handleWorkSelect" />

    <!-- 添加奖励说明弹窗 -->
    <RewardDialog v-model="showRewardDialog" />

    <!-- 添加取消确认弹窗 -->
    <el-dialog
      v-model="showCancelDialog"
      title="取消"
      width="320px"
      :show-close="false"
      class="cancel-dialog"
      destroy-on-close
    >
      <div class="cancel-content">确认取消本次定制吗？</div>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            class="cancel-confirm-btn"
            type="primary"
            @click="handleCancelConfirm"
            >取消定制</el-button
          >
          <el-button class="cancel-back-btn" @click="showCancelDialog = false"
            >留在本页</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style>
.cancel-dialog {
  background: linear-gradient(
    112.85deg,
    rgba(194, 249, 255, 0.88) 0%,
    rgba(227, 251, 255, 0.88) 30.78%,
    rgba(235, 235, 255, 0.88) 64.09%,
    rgba(181, 207, 255, 0.88) 100%
  ) !important;
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.cancel-dialog .el-dialog__header {
  font-size: 32px !important;
  font-weight: 500 !important;
  text-align: center !important;
  display: flex !important;
  justify-content: center !important;
}
</style>
<style scoped>
.customize-page {
  /* min-height: 100vh; */
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

.product-selector-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.product-selector {
  flex: 1;
  display: flex;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  min-height: 104px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.product-selector::-webkit-scrollbar {
  height: 6px;
}

.product-selector::-webkit-scrollbar-track {
  background: transparent;
}

.product-selector::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.nav-btn {
  width: 32px;
  height: 80px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.nav-btn:not(:disabled):hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-btn:disabled {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.3);
  cursor: not-allowed;
}

.product-item {
  flex: 0 0 auto;
  width: 100px;
  min-width: 100px;
  max-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.03);
}

.product-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.product-item.active {
  background: rgba(64, 158, 255, 0.2);
}

.product-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  padding: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-icon img {
  max-width: 100%;
  max-height: 100%;
}

.product-name {
  color: #fff;
  font-size: 14px;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.main-content {
  display: flex;
  justify-content: center;
  width: 100%;
}

.preview-section {
  /* background: rgba(255, 255, 255, 0.05); */
  border-radius: 16px;
  /* padding: 24px; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 40px;
  flex: 1;
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

.settings-section {
  /* background: rgba(255, 255, 255, 0.05); */
  border-radius: 16px;
  /* padding: 24px;  */
  flex: 1;
  margin-top: 72px;
}

.section-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  justify-content: flex-start;
}

.tab {
  color: rgba(255, 255, 255, 0.5);
  padding: 0px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.tab.active {
  color: #fff;
  background: #3468fe;
}

.color-selector {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.color-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 0;
}

.color-option.active {
  background: rgba(52, 104, 254, 0.1);
}

.color-preview {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* border: 2px solid rgba(255, 255, 255, 0.2); */
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;
}

.color-option.active .color-preview {
  border-color: #3468fe;
  transform: scale(1.1);
}

.color-option.active .color-preview::after {
  content: "";
  position: absolute;
  inset: -4px;
  border: 2px solid #3468fe;
  border-radius: 50%;
}

.color-option.active .color-name {
  color: #3468fe;
  font-weight: 500;
}

.plus-icon {
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.color-option:hover .plus-icon {
  color: rgba(255, 255, 255, 0.8);
}

.color-name {
  color: #fff;
  font-size: 12px;
}

.product-info {
  margin-bottom: 24px;
}

.price-input {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-start;
  /* width: 50%; */
}

.price-input .el-input {
  width: 100%;
}

.currency {
  color: #fff;
  font-size: 16px;
  flex-shrink: 0;
}
.info {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 20.27px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: Center;
}

.info-icon {
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  flex-shrink: 0;
}

.copy-settings {
  margin-bottom: 32px;
  margin-left: 100px;
}

.copy-settings :deep(.el-checkbox__label) {
  color: #fff;
  font-size: 15px;
}

.button-group {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  width: 100%;
}

.save-buy-btn,
.save-only-btn {
  /* flex: 0.5; */
  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  justify-content: center;
  width: 32%;
}

.save-buy-btn {
  background: #ff8a00;
  color: white;
  border: none;
}

.save-buy-btn:hover {
  background: #e67a00;
}

.save-only-btn {
  background: white;
  color: #ff8a00;
  /* border: 1px solid #ff8a00; */
}

.save-only-btn:hover {
  background: rgba(255, 138, 0, 0.05);
}

@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .preview-section {
    aspect-ratio: 1;
  }
}

.settings-form {
  margin-bottom: 24px;
}

.settings-form :deep(.el-form-item) {
  margin-bottom: 24px;
  display: flex;
}

.settings-form :deep(.el-form-item__label) {
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 28.96px;
  width: 60px !important;
  padding-top: 8px;
}

.settings-form :deep(.el-form-item__content) {
  margin-left: 40px !important;
  flex: 1;
}

.form-content {
  width: 100%;
  margin-bottom: 12px;
}

.settings-form :deep(.el-input) {
  width: 50%;
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

.settings-form :deep(.el-input__count) {
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  line-height: 1;
  height: auto;
  padding: 0;
  margin-top: 4px;
}

.settings-form :deep(.el-input__count-inner) {
  background: transparent;
  padding: 0;
  font-size: 16px;
}

.color-option :deep(.el-color-picker) {
  width: 40px;
  height: 40px;
  position: absolute;
  inset: 8px;
  opacity: 0;
  z-index: 2;
}

.color-option :deep(.el-color-picker__trigger) {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
}

.cancel-dialog :deep(.el-dialog) {
  background: linear-gradient(
    112.85deg,
    rgba(194, 249, 255, 0.88) 0%,
    rgba(227, 251, 255, 0.88) 30.78%,
    rgba(235, 235, 255, 0.88) 64.09%,
    rgba(181, 207, 255, 0.88) 100%
  );
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.cancel-dialog :deep(.el-dialog__header) {
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  padding: 20px 24px;
  margin: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.cancel-content {
  text-align: center;
  font-size: 16px;
  color: #333;
  padding: 32px 0;
}

.cancel-dialog :deep(.el-dialog__footer) {
  padding: 0 24px 24px;
}

.cancel-dialog .dialog-footer {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.cancel-confirm-btn,
.cancel-back-btn {
  width: 160px;
  height: 48px;
  border-radius: 24px;
  font-size: 18px;
  border: none;
}

.cancel-confirm-btn {
  background: #3468fe;
}

.cancel-confirm-btn:hover {
  background: #2857e0;
}

.cancel-back-btn {
  background: white;
  color: #333;
}

.cancel-back-btn:hover {
  background: #f5f5f5;
}
</style>
