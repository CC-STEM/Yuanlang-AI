<script setup lang="ts">
import { onMounted } from "vue";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  InfoFilled,
} from "@element-plus/icons-vue";
import RewardDialog from "~/components/customize/RewardDialog.vue";

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
  { id: 1, name: "冰箱贴", icon: "/products/magnet.png", selected: true },
  { id: 2, name: "马克杯", icon: "/products/mug.png" },
  { id: 3, name: "衬衫", icon: "/products/shirt.png" },
  { id: 4, name: "手机壳", icon: "/products/phone-case.png" },
  { id: 5, name: "卫衣", icon: "/products/hoodie.png" },
  { id: 6, name: "帆布包", icon: "/products/tote.png" },
  { id: 7, name: "抱枕", icon: "/products/pillow.png" },
  { id: 8, name: "笔记本", icon: "/products/notebook.png" },
  { id: 9, name: "钥匙扣", icon: "/products/keychain.png" },
  { id: 10, name: "鼠标垫", icon: "/products/mousepad.png" },
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

const visibleProducts = ref<Product[]>([]);
const currentPage = ref(0);
const itemsPerPage = 5;

const copyToProducts = ref(false);
const copyToShop = ref(false);

const showRewardDialog = ref(false);

const showImagePicker = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      selectedImage.value = file;
      imagePreview.value = URL.createObjectURL(file);
    }
  };
  input.click();
};

const updateVisibleProducts = () => {
  const start = currentPage.value * itemsPerPage;
  const end = start + itemsPerPage;
  visibleProducts.value = products.value.slice(start, end);

  if (currentPage.value === 0 && !products.value.some((p) => p.selected)) {
    handleProductSelect(products.value[0]);
  }
};

const handlePrevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    updateVisibleProducts();
  }
};

const handleNextPage = () => {
  if ((currentPage.value + 1) * itemsPerPage < products.value.length) {
    currentPage.value++;
    updateVisibleProducts();
  }
};

const handleProductSelect = (product: Product) => {
  products.value.forEach((p) => (p.selected = p.id === product.id));
};

const handleColorSelect = (color: ColorOption) => {
  colorOptions.value.forEach((c) => (c.selected = c.id === color.id));
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

onMounted(() => {
  updateVisibleProducts();
});
</script>

<template>
  <div class="customize-page">
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
        :disabled="currentPage === 0"
        @click="handlePrevPage"
      >
        <el-icon><ArrowLeft /></el-icon>
      </el-button>

      <div class="product-selector">
        <div
          v-for="product in visibleProducts"
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
        :disabled="(currentPage + 1) * itemsPerPage >= products.length"
        @click="handleNextPage"
      >
        <el-icon><ArrowRight /></el-icon>
      </el-button>
    </div>

    <div class="main-content">
      <!-- 左侧预览区 -->
      <div class="preview-section">
        <div
          class="image-preview"
          :class="{ empty: !imagePreview }"
          @click="showImagePicker"
        >
          <img v-if="imagePreview" :src="imagePreview" alt="预览图" />
          <div v-else class="upload-placeholder">
            <el-icon><Plus /></el-icon>
            <span>点击上传图片</span>
          </div>
        </div>
      </div>

      <!-- 右侧设置区 -->
      <div class="settings-section">
        <div class="section-tabs">
          <span class="tab active">图片</span>
          <span class="tab">选作品</span>
        </div>

        <!-- 颜色选择器 -->
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
          <div class="color-option custom">
            <div class="color-preview custom">
              <el-icon><Plus /></el-icon>
            </div>
            <span class="color-name">自定义</span>
          </div>
        </div>

        <!-- 商品信息 -->
        <div class="product-info">
          <el-input
            v-model="productName"
            placeholder="名称"
            maxlength="12"
            show-word-limit
          />

          <div class="price-input">
            <span class="currency">¥</span>
            <el-input v-model="price" placeholder="最低29.99">
              <template #append>元/个</template>
            </el-input>
            <el-tooltip content="设计定价说明" placement="top">
              <el-icon class="info-icon" @click="showRewardDialog = true">
                <InfoFilled />
              </el-icon>
            </el-tooltip>
          </div>
        </div>

        <!-- 复制商品设置 -->
        <div class="copy-settings">
          <el-checkbox v-model="copyToProducts">
            复制商品设置，分享到微信
          </el-checkbox>
          <el-checkbox v-model="copyToShop"> 复制到店铺全站 </el-checkbox>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <el-button type="primary" class="save-btn" @click="handleSubmit">
            保存并购买
          </el-button>
          <el-button class="save-later-btn"> 保存，暂不购买 </el-button>
        </div>
      </div>
    </div>

    <!-- 添加奖励说明弹窗 -->
    <RewardDialog v-model="showRewardDialog" />
  </div>
</template>

<style scoped>
.customize-page {
  min-height: 100vh;
  background: #0a0f25;
  padding: 20px;
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
  justify-content: flex-start;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  min-height: 104px;
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
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
}

.preview-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-preview {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.upload-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  gap: 12px;
}

.settings-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
}

.section-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.tab {
  color: rgba(255, 255, 255, 0.5);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.tab.active {
  color: #fff;
  background: rgba(64, 158, 255, 0.2);
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
}

.color-preview {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.color-option.active .color-preview {
  border-color: #409eff;
  transform: scale(1.1);
}

.color-preview.custom {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.1);
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
  margin-top: 16px;
}

.currency {
  color: #fff;
  font-size: 16px;
}

.info-icon {
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.copy-settings {
  margin-bottom: 24px;
}

.copy-settings :deep(.el-checkbox__label) {
  color: #fff;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.save-btn {
  background: #ff4d4f;
  border: none;
  height: 44px;
  font-size: 16px;
}

.save-btn:hover {
  background: #f03f41;
}

.save-later-btn {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.2);
}

.save-later-btn:hover {
  border-color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .preview-section {
    aspect-ratio: 1;
  }
}
</style>
