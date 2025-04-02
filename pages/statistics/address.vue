<script setup lang="ts">
import { ref, computed } from "vue";
import { Close } from "@element-plus/icons-vue";

interface AddressItem {
  id: number;
  isDefault: boolean;
  receiver: string;
  phone: string;
  region: string;
  address: string;
}

interface AddressFormData {
  id?: number;
  isDefault: boolean;
  receiver: string;
  phone: string;
  region: string;
  address: string;
}

// 生成模拟数据
const generateAddresses = (count: number): AddressItem[] => {
  const receivers = ["Lucy", "Tom", "Jerry", "Mike", "Sarah", "Emma", "Jack"];
  const regions = [
    "北京市海淀区",
    "北京市朝阳区",
    "上海市浦东新区",
    "广州市天河区",
    "深圳市南山区",
  ];
  const addresses = [
    "某某街道某某小区1号楼1单元103室",
    "创新大厦B座12层1208室",
    "阳光花园3期5栋2单元801室",
    "科技园区23号楼4层",
    "星河世纪大厦A座15楼",
  ];

  return Array.from({ length: count }, (_, index) => {
    const receiver = receivers[Math.floor(Math.random() * receivers.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const address = addresses[Math.floor(Math.random() * addresses.length)];
    const phone = `1${Math.floor(Math.random() * 9 + 3)}${Array.from(
      { length: 9 },
      () => Math.floor(Math.random() * 10)
    ).join("")}`;

    return {
      id: index + 1,
      isDefault: index === 0,
      receiver,
      phone: phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1 $2 $3"),
      region,
      address,
    };
  });
};

// 表格数据
const addresses = ref<AddressItem[]>(generateAddresses(20));

// 分页配置
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const total = computed(() => addresses.value.length);

// 获取当前页数据
const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return addresses.value.slice(start, end);
});

// 弹窗控制
const dialogVisible = ref(false);
const dialogTitle = ref("新建");
const isEdit = ref(false);

// 表单数据
const formData = ref<AddressFormData>({
  receiver: "",
  phone: "",
  region: "",
  address: "",
  isDefault: false,
});

// 打开新增弹窗
const handleAdd = () => {
  dialogTitle.value = "新建";
  isEdit.value = false;
  formData.value = {
    receiver: "",
    phone: "",
    region: "",
    address: "",
    isDefault: false,
  };
  dialogVisible.value = true;
};

// 打开编辑弹窗
const handleEdit = (item: AddressItem) => {
  dialogTitle.value = "编辑";
  isEdit.value = true;
  formData.value = {
    id: item.id,
    receiver: item.receiver,
    phone: item.phone,
    region: item.region,
    address: item.address,
    isDefault: item.isDefault,
  };
  dialogVisible.value = true;
};

// 处理保存
const handleSave = () => {
  const saveData: AddressItem = {
    id: formData.value.id || addresses.value.length + 1,
    receiver: formData.value.receiver,
    phone: formData.value.phone,
    region: formData.value.region,
    address: formData.value.address,
    isDefault: formData.value.isDefault,
  };

  if (isEdit.value) {
    // 更新地址
    const index = addresses.value.findIndex(
      (item) => item.id === formData.value.id
    );
    if (index !== -1) {
      addresses.value[index] = saveData;
    }
  } else {
    // 新增地址
    addresses.value.push(saveData);
  }
  dialogVisible.value = false;
};

// 删除确认弹窗
const deleteDialogVisible = ref(false);
const addressToDelete = ref<AddressItem | null>(null);

// 打开删除确认弹窗
const handleDeleteConfirm = (item: AddressItem) => {
  addressToDelete.value = item;
  deleteDialogVisible.value = true;
};

// 确认删除
const confirmDelete = () => {
  if (addressToDelete.value) {
    addresses.value = addresses.value.filter(
      (item) => item.id !== addressToDelete.value?.id
    );
    deleteDialogVisible.value = false;
    addressToDelete.value = null;
  }
};

// 设为默认地址
const setAsDefault = (item: AddressItem) => {
  addresses.value.forEach((address) => {
    address.isDefault = address.id === item.id;
  });
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
</script>

<template>
  <div class="address-page">
    <div class="page-header">
      <span class="back-icon">←</span>
      <h1>收货地址管理</h1>
    </div>

    <div class="address-container">
      <div class="toolbar">
        <el-button type="primary" @click="handleAdd">新建</el-button>
      </div>

      <div class="table-section">
        <el-table :data="currentPageData" style="width: 100%">
          <el-table-column label="收货人" width="150">
            <template #default="{ row }">
              <div class="receiver">
                <span>{{ row.receiver }}</span>
                <el-tag v-if="row.isDefault" size="small" type="primary"
                  >默认</el-tag
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="150" />
          <el-table-column prop="region" label="省市区" width="150" />
          <el-table-column prop="address" label="详细地址" min-width="200" />
          <el-table-column label="操作" width="300" fixed="right">
            <template #default="{ row }">
              <div class="action-buttons">
                <el-button type="primary" @click="handleEdit(row)"
                  >编辑</el-button
                >
                <el-button type="warning" @click="handleDeleteConfirm(row)"
                  >删除</el-button
                >
                <el-button
                  v-if="!row.isDefault"
                  type="info"
                  @click="setAsDefault(row)"
                  >设为默认</el-button
                >
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
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            :pager-count="5"
            layout="prev, pager, next, jumper"
            @update:current-page="handlePageChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
    </div>

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="400px"
      custom-class="address-dialog"
      :show-close="false"
    >
      <div class="dialog-header">
        <span class="dialog-title">{{ dialogTitle }}</span>
        <el-icon class="close-icon" @click="dialogVisible = false">
          <Close />
        </el-icon>
      </div>

      <div class="dialog-body">
        <el-form :model="formData" label-width="80px">
          <el-form-item label="收货人">
            <el-input
              v-model="formData.receiver"
              placeholder="请输入收货人姓名"
            />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formData.phone" placeholder="+86">
              <template #prefix>+86</template>
            </el-input>
          </el-form-item>
          <el-form-item label="收货地址">
            <el-select
              v-model="formData.region"
              placeholder="省市区"
              class="region-select"
            >
              <el-option label="北京市海淀区" value="北京市海淀区" />
            </el-select>
            <el-input
              v-model="formData.address"
              type="textarea"
              placeholder="详细地址，如门牌号"
              rows="3"
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="formData.isDefault"
              >保存为默认地址</el-checkbox
            >
          </el-form-item>
        </el-form>
      </div>

      <div class="dialog-footer">
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>

    <!-- 删除确认弹窗 -->
    <el-dialog
      v-model="deleteDialogVisible"
      title="删除"
      width="300px"
      custom-class="delete-dialog"
      :show-close="false"
    >
      <div class="delete-content">
        <p>确认删除吗？</p>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="confirmDelete">确认</el-button>
        <el-button @click="deleteDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.address-page {
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

.address-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
}

.toolbar {
  margin-bottom: 20px;
}

.table-section {
  background: transparent;
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

.receiver {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-buttons {
  display: flex;
  gap: 8px;
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

/* 弹窗样式 */
.address-dialog {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.85) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: 16px;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.dialog-title {
  font-size: 18px;
  font-weight: 600;
}

.close-icon {
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.dialog-body {
  padding: 20px;
}

.region-select {
  width: 100%;
  margin-bottom: 12px;
}

.dialog-footer {
  padding: 20px;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

/* 删除确认弹窗 */
.delete-dialog {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
}

.delete-content {
  padding: 20px;
  text-align: center;
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
