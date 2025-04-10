<template>
  <el-dialog
    v-model="dialogVisible"
    :title="status === 'success' ? '支付成功！' : '支付失败'"
    width="400px"
    :show-close="false"
    class="payment-result-dialog"
    destroy-on-close
  >
    <div class="result-content">
      <div class="result-image">
        <img
          :src="status === 'success' ? successImage : failureImage"
          :alt="status === 'success' ? '支付成功' : '支付失败'"
        />
      </div>
      <div class="result-title">
        {{ status === "success" ? "支付成功！" : "支付失败" }}
      </div>
      <div class="result-message">
        {{
          status === "success"
            ? "您的商品正在向您加速奔来，请耐心等候\n您可在个人主页-订单列表查看物流进度"
            : "请稍后再试"
        }}
      </div>
      <div class="dialog-footer">
        <el-button
          v-if="status === 'success'"
          type="primary"
          class="confirm-btn"
          @click="handleClose"
        >
          我知道了
        </el-button>
        <el-button v-else type="primary" class="retry-btn" @click="handleRetry">
          重新支付
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import successImage from "~/assets/payment/success.png?url";
import failureImage from "~/assets/payment/failureImage.png?url";

const props = defineProps<{
  modelValue: boolean;
  status: "success" | "failure";
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "retry"): void;
}>();

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleClose = () => {
  dialogVisible.value = false;
};

const handleRetry = () => {
  emit("retry");
  dialogVisible.value = false;
};
</script>

<style scoped>
.payment-result-dialog :deep(.el-dialog) {
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

.payment-result-dialog :deep(.el-dialog__header) {
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  padding: 20px 24px;
  margin: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.result-content {
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.result-image {
  width: 200px;
  height: 200px;
  margin-bottom: 24px;
}

.result-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.result-title {
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 16px;
}

.result-message {
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  white-space: pre-line;
  margin-bottom: 32px;
}

.dialog-footer {
  display: flex;
  justify-content: center;
}

.confirm-btn,
.retry-btn {
  width: 160px;
  height: 48px;
  border-radius: 24px;
  font-size: 18px;
  border: none;
}

.confirm-btn {
  background: #3468fe;
}

.confirm-btn:hover {
  background: #2857e0;
}

.retry-btn {
  background: #ff4d4f;
}

.retry-btn:hover {
  background: #ff3436;
}
</style>
