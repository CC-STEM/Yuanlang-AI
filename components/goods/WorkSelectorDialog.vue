<template>
  <el-dialog
    v-model="modelValue"
    title="我的作品"
    width="800px"
    class="work-selector-dialog"
    :show-close="false"
    destroy-on-close
    @close="handleClose"
  >
    <div class="works-grid">
      <div
        v-for="(work, index) in works"
        :key="index"
        class="work-item"
        :class="{ 'is-selected': selectedWorkId === work.id }"
        @click="handleSelect(work.id)"
      >
        <img :src="work.image" alt="作品图片" class="work-image" />
        <div v-if="selectedWorkId === work.id" class="selected-icon">
          <el-icon><Check /></el-icon>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button class="cancel-btn" @click="handleCancel">取消</el-button>
        <el-button type="primary" class="confirm-btn" @click="handleConfirm"
          >确认选择</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
// 使用普通的组件定义方式
import { defineComponent, ref } from "vue";
import { Check } from "@element-plus/icons-vue";
import ccLogo from "@/assets/cclogo.png";

export default defineComponent({
  name: "WorkSelectorDialog",
  components: {
    Check, // 注册 Check 组件
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "select"],
  setup(props, { emit }) {
    // 模拟作品数据
    const works = ref([
      { id: "1", image: ccLogo },
      { id: "2", image: ccLogo },
      { id: "3", image: ccLogo },
      { id: "4", image: ccLogo },
      { id: "5", image: ccLogo },
      { id: "6", image: ccLogo },
    ]);

    const selectedWorkId = ref("");

    const handleSelect = (workId: string) => {
      selectedWorkId.value = workId;
    };

    const handleCancel = () => {
      selectedWorkId.value = "";
      emit("update:modelValue", false);
    };

    const handleConfirm = () => {
      if (selectedWorkId.value) {
        emit("select", selectedWorkId.value);
        emit("update:modelValue", false);
      }
    };

    const handleClose = () => {
      selectedWorkId.value = "";
      emit("update:modelValue", false);
    };

    return {
      works,
      selectedWorkId,
      handleSelect,
      handleCancel,
      handleConfirm,
      handleClose,
    };
  },
});
</script>

<style>
.work-selector-dialog {
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

.work-selector-dialog .el-dialog__header {
  font-size: 32px !important;
  font-weight: 500 !important;
  text-align: center !important;
  display: flex !important;
  justify-content: center !important;
}
.work-selector-dialog .el-dialog__body {
  padding: 48px !important;
}
</style>

<style scoped>
.works-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.work-item {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.work-item:hover {
  transform: translateY(-2px);
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
}

.work-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.work-item.is-selected::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
}

.selected-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3468fe;
  font-size: 24px;
  z-index: 1;
}

.dialog-footer {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-top: 24px;
}

.cancel-btn,
.confirm-btn {
  width: 160px;
  height: 48px;
  border-radius: 24px;
  font-size: 18px;
}

.cancel-btn {
  background: white;
  border: none;
  color: #333;
}

.confirm-btn {
  background: #3468fe;
  border: none;
}

.confirm-btn:hover {
  background: #2857e0;
}
</style>
