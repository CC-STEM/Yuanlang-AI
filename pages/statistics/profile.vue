<!-- <?xml version="1.0" encoding="UTF-8"?> -->
<script setup lang="ts">
import { ref, computed } from "vue";

// 标签页
const activeTab = ref("我的作品");
const tabs = ["我的作品", "我的收藏", "我的实物定制商品"];

// 用户信息
const userInfo = ref({
  name: "AI创作者",
  followers: "1.5万",
  likes: "29.8万",
  totalViews: "500.8万",
  description: "个人介绍个人简介",
});

// 列表数据
const productList = ref([
  {
    id: 1,
    name: "少女的马克杯",
    price: 39.99,
    status: "已上架",
    image: "/products/mug.png",
  },
  {
    id: 2,
    name: "少女的马克杯",
    price: 39.99,
    status: "已下架",
    image: "/products/mug.png",
  },
  {
    id: 3,
    name: "少女的马克杯",
    price: 39.99,
    status: "已上架",
    image: "/products/mug.png",
  },
  {
    id: 4,
    name: "少女的马克杯",
    price: 39.99,
    status: "已下架",
    image: "/products/mug.png",
  },
]);

// 分页
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(46);

// 选中项
const selectedItems = ref<number[]>([]);

// 批量操作
const handleBatchAction = (action: string) => {
  if (selectedItems.value.length === 0) {
    // 提示选择商品
    return;
  }
  switch (action) {
    case "price":
      showPriceDialog();
      break;
    case "up":
      handleBatchUp();
      break;
    case "down":
      handleBatchDown();
      break;
    case "delete":
      handleBatchDelete();
      break;
  }
};

// 单个操作
const handleItemAction = (action: string, item: any) => {
  switch (action) {
    case "up":
      handleUp(item);
      break;
    case "down":
      handleDown(item);
      break;
    case "delete":
      handleDelete(item);
      break;
  }
};

// 选择处理
const handleSelectAll = (val: boolean) => {
  if (val) {
    selectedItems.value = productList.value.map((item) => item.id);
  } else {
    selectedItems.value = [];
  }
};

const handleSelect = (val: boolean, item: any) => {
  if (val) {
    selectedItems.value.push(item.id);
  } else {
    selectedItems.value = selectedItems.value.filter((id) => id !== item.id);
  }
};

// 分页处理
const handlePageChange = (page: number) => {
  currentPage.value = page;
  // 加载对应页数据
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  // 加载对应页数据
};

// 表格选择处理
const handleSelectionChange = (selection: any[]) => {
  selectedItems.value = selection.map((item) => item.id);
};

// 弹窗控制
const priceDialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const newPrice = ref("");

const showPriceDialog = () => {
  priceDialogVisible.value = true;
};

const handlePriceConfirm = () => {
  priceDialogVisible.value = false;
  // 处理价格修改
};

const handleDelete = (item: any) => {
  deleteDialogVisible.value = true;
  // 处理删除
};

const handleBatchDelete = () => {
  deleteDialogVisible.value = true;
  // 处理批量删除
};

const handleDeleteConfirm = () => {
  deleteDialogVisible.value = false;
  // 执行删除
};

const handleUp = (item: any) => {
  // 处理上架
};

const handleDown = (item: any) => {
  // 处理下架
};

const handleBatchUp = () => {
  // 处理批量上架
};

const handleBatchDown = () => {
  // 处理批量下架
};
</script>

<template>
  <div class="profile-page">
    <!-- 用户信息 -->
    <div class="user-info">
      <div class="avatar-section">
        <!-- <img src="/avatar.png" alt="avatar" class="avatar" /> -->
        <div class="user-details">
          <h1>{{ userInfo.name }}</h1>
          <div class="stats">
            <span>粉丝 {{ userInfo.followers }}</span>
            <span>获赞 {{ userInfo.likes }}</span>
            <span>播放量 {{ userInfo.totalViews }}</span>
          </div>
          <p class="description">{{ userInfo.description }}</p>
        </div>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="content-area">
      <!-- 标签页 -->
      <div class="tabs">
        <div
          v-for="tab in tabs"
          :key="tab"
          :class="['tab-item', { active: activeTab === tab }]"
          @click="activeTab = tab"
        >
          {{ tab }}
        </div>
      </div>

      <!-- 操作栏 -->
      <div class="action-bar">
        <div class="batch-actions">
          <el-button type="primary" @click="handleBatchAction('price')"
            >批量改价</el-button
          >
          <el-button type="primary" @click="handleBatchAction('up')"
            >批量上架</el-button
          >
          <el-button type="primary" @click="handleBatchAction('down')"
            >批量下架</el-button
          >
          <el-button type="primary" @click="handleBatchAction('delete')"
            >批量删除</el-button
          >
        </div>
      </div>

      <!-- 列表 -->
      <div class="product-list">
        <el-table
          :data="productList"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="商品名称" width="300">
            <template #default="{ row }">
              <div class="product-info">
                <img :src="row.image" :alt="row.name" class="product-image" />
                <span class="product-name">{{ row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="售价" width="120">
            <template #default="{ row }">
              <span class="price">¥{{ row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="120">
            <template #default="{ row }">
              <span
                :class="[
                  'status',
                  row.status === '已上架' ? 'online' : 'offline',
                ]"
              >
                {{ row.status }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="{ row }">
              <div class="actions">
                <el-button
                  v-if="row.status === '已下架'"
                  type="primary"
                  size="small"
                  @click="handleItemAction('up', row)"
                  >上架</el-button
                >
                <el-button
                  v-else
                  type="warning"
                  size="small"
                  @click="handleItemAction('down', row)"
                  >下架</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  @click="handleItemAction('delete', row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          :model-value="currentPage"
          :page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          @update:model-value="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>

    <!-- 改价弹窗 -->
    <el-dialog
      v-model="priceDialogVisible"
      title="批量改价"
      width="400px"
      class="price-dialog"
    >
      <div class="price-form">
        <el-form label-width="80px">
          <el-form-item label="新价格">
            <el-input
              type="number"
              v-model="newPrice"
              placeholder="请输入新价格"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="priceDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlePriceConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 删除确认弹窗 -->
    <el-dialog
      v-model="deleteDialogVisible"
      title="确认删除"
      width="400px"
      class="delete-dialog"
    >
      <p>确定要删除选中的商品吗？</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="handleDeleteConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #121212;
  color: rgba(255, 255, 255, 0.85);
  padding: 20px;
}

.user-info {
  margin-bottom: 24px;
}

.avatar-section {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details h1 {
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 12px;
}

.stats {
  display: flex;
  gap: 24px;
  margin-bottom: 12px;
}

.stats span {
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
}

.description {
  color: rgba(255, 255, 255, 0.45);
  font-size: 14px;
  margin: 0;
}

.content-area {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
}

.tabs {
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 16px;
}

.tab-item {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.65);
  cursor: pointer;
  padding-bottom: 16px;
  margin-bottom: -16px;
  position: relative;
}

.tab-item.active {
  color: #1677ff;
}

.tab-item.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #1677ff;
  border-radius: 1px;
}

.action-bar {
  margin-bottom: 20px;
}

.batch-actions {
  display: flex;
  gap: 12px;
}

.product-list {
  margin-bottom: 20px;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-image {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
}

.product-name {
  color: rgba(255, 255, 255, 0.85);
}

.price {
  color: #ff4d4f;
  font-weight: 500;
}

.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status.online {
  background: rgba(82, 196, 26, 0.15);
  color: #52c41a;
}

.status.offline {
  background: rgba(255, 77, 79, 0.15);
  color: #ff4d4f;
}

.actions {
  display: flex;
  gap: 8px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

:deep(.el-table) {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
}

:deep(.el-table th),
:deep(.el-table td) {
  background: transparent;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
  background: rgba(255, 255, 255, 0.04);
}

:deep(.el-button) {
  border-radius: 4px;
}

:deep(.el-dialog) {
  background: #1f1f1f;
  border-radius: 12px;
}

:deep(.el-dialog__title) {
  color: rgba(255, 255, 255, 0.85);
}

:deep(.el-dialog__body) {
  color: rgba(255, 255, 255, 0.65);
}

:deep(.el-form-item__label) {
  color: rgba(255, 255, 255, 0.85);
}

:deep(.el-input__inner) {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.85);
}

:deep(.el-pagination) {
  --el-pagination-bg-color: transparent;
  --el-pagination-text-color: rgba(255, 255, 255, 0.85);
  --el-pagination-border-radius: 4px;
}

:deep(.el-pagination .btn-prev),
:deep(.el-pagination .btn-next) {
  background: rgba(255, 255, 255, 0.08);
}

:deep(.el-pagination .el-pager li) {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.65);
}

:deep(.el-pagination .el-pager li.active) {
  background: #1677ff;
  color: #ffffff;
}
</style>
