<script setup lang="ts">
import { ref, onMounted, watch, computed, onUnmounted } from "vue";
import {
  getWxPay,
  getAliPay,
  queryOrder,
  queryAliOrder,
} from "~/composables/member";
import { ElMessage } from "element-plus";
import WechatIcon from "~/assets/topNavBar/vx.png";
import AlipayIcon from "~/assets/topNavBar/zfb.png";

const props = defineProps<{
  modelValue: boolean;
  amount: number;
  packageId: number;
  userId?: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "payment-success"): void;
  (e: "payment-failure"): void;
  (e: "close-package-dialog"): void;
  (e: "update-member-info"): void;
}>();

const paymentMethod = ref<"wechat" | "alipay">("wechat");
const qrCode = ref("");
const loading = ref(false);
const pollingTimer = ref<ReturnType<typeof setInterval> | null>(null);
const orderNo = ref("");
const isExpired = ref(false);
const expirationTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const remainingTime = ref(300); // 5分钟 = 300秒
const countdownTimer = ref<ReturnType<typeof setInterval> | null>(null);

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
    if (!value) {
      stopPolling();
    }
  },
});

// 停止轮询
const stopPolling = () => {
  if (pollingTimer.value) {
    clearInterval(pollingTimer.value);
    pollingTimer.value = null;
  }
};

// 开始轮询订单状态
const startPolling = async () => {
  stopPolling(); // 先停止之前的轮询

  const checkOrderStatus = async () => {
    try {
      const res = await (paymentMethod.value === "wechat"
        ? queryOrder(orderNo.value)
        : queryAliOrder(orderNo.value));
      console.log(res, "res");
      if (res?.data === "支付成功") {
        stopPolling();
        stopExpirationTimer();
        stopCountdown();
        ElMessage.success("支付成功！");
        emit("payment-success");
        emit("close-package-dialog"); // 关闭套餐弹窗
        emit("update-member-info"); // 更新会员信息
        dialogVisible.value = false; // 关闭支付弹窗
      } else if (res?.data === "支付失败") {
        stopPolling();
        stopExpirationTimer();
        stopCountdown();
        emit("payment-failure");
        dialogVisible.value = false;
      }
    } catch (error) {
      console.error("查询订单状态失败:", error);
      stopPolling();
      stopExpirationTimer();
      stopCountdown();
      emit("payment-failure");
      dialogVisible.value = false;
    }
  };

  // 每3秒轮询一次
  pollingTimer.value = setInterval(checkOrderStatus, 3000);
};

// 开始计时5分钟过期
const startExpirationTimer = () => {
  if (expirationTimer.value) {
    clearTimeout(expirationTimer.value);
  }
  isExpired.value = false;
  startCountdown(); // 开始倒计时
  expirationTimer.value = setTimeout(() => {
    isExpired.value = true;
    stopPolling();
    stopCountdown(); // 停止倒计时
  }, 5 * 60 * 1000);
};

// 停止过期计时
const stopExpirationTimer = () => {
  if (expirationTimer.value) {
    clearTimeout(expirationTimer.value);
    expirationTimer.value = null;
  }
};

// 获取支付二维码
const getPayQrCode = async () => {
  loading.value = true;
  qrCode.value = "";
  orderNo.value = "";
  stopPolling();
  stopExpirationTimer();
  stopCountdown(); // 停止倒计时

  try {
    const params = {
      productDesc: "11",
      productId: props.packageId,
      productNum: 1,
      totalPrice: props.amount,
      type: 1,
      userId: props.userId,
    };

    let res;
    if (paymentMethod.value === "wechat") {
      res = await getWxPay(params);
    } else {
      res = await getAliPay(params);
    }

    if (res?.data?.qrCode) {
      qrCode.value = res.data.qrCode;
      orderNo.value = res.data.orderNo; // 保存订单号
      startPolling(); // 获取二维码成功后开始轮询
      startExpirationTimer(); // 开始计时过期
    } else {
      ElMessage.error(
        `获取${
          paymentMethod.value === "wechat" ? "微信" : "支付宝"
        }支付二维码失败`
      );
    }
  } catch (error) {
    console.error("获取支付二维码失败:", error);
    ElMessage.error("获取支付二维码失败，请稍后重试");
  } finally {
    loading.value = false;
  }
};

// 监听支付方式变化
watch(paymentMethod, () => {
  getPayQrCode();
});

// 监听弹窗显示
watch(dialogVisible, (val) => {
  if (val) {
    getPayQrCode();
  } else {
    qrCode.value = "";
    stopPolling();
    stopExpirationTimer();
    stopCountdown(); // 停止倒计时
  }
});

// 组件卸载时清理轮询
onUnmounted(() => {
  stopPolling();
  stopExpirationTimer();
  stopCountdown(); // 停止倒计时
});

// Add countdown functions
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const startCountdown = () => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value);
  }
  remainingTime.value = 300;
  countdownTimer.value = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      if (countdownTimer.value) {
        clearInterval(countdownTimer.value);
      }
    }
  }, 1000);
};

const stopCountdown = () => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value);
    countdownTimer.value = null;
  }
};
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="付款"
    width="400px"
    :close-on-click-modal="false"
    destroy-on-close
    class="payment-dialog"
  >
    <div class="payment-container">
      <div class="amount">¥{{ amount.toFixed(2) }}</div>
      <div class="payment-methods">
        <div
          class="method-item"
          :class="{ active: paymentMethod === 'wechat' }"
          @click="paymentMethod = 'wechat'"
        >
          <img :src="WechatIcon" class="payment-icon" alt="微信支付" />
          <span>微信支付</span>
        </div>
        <div
          class="method-item"
          :class="{ active: paymentMethod === 'alipay' }"
          @click="paymentMethod = 'alipay'"
        >
          <img :src="AlipayIcon" class="payment-icon" alt="支付宝" />
          <span>支付宝</span>
        </div>
      </div>
      <div class="qr-code" v-loading="loading">
        <div v-if="qrCode" class="relative w-full h-full">
          <img
            :src="qrCode"
            alt="支付二维码"
            class="w-full h-full object-contain"
          />
          <div v-if="isExpired" class="expired-overlay" @click="getPayQrCode">
            <div class="expired-text">二维码已过期</div>
            <div class="reload-text">点击重新加载</div>
          </div>
        </div>
        <div v-else class="qr-code-placeholder">
          {{ loading ? "加载中..." : "暂无二维码" }}
        </div>
      </div>
      <div class="countdown-container" v-if="qrCode && !isExpired">
        <span class="countdown-text">二维码有效期还剩：</span>
        <span class="countdown-time">{{ formatTime(remainingTime) }}</span>
      </div>
      <div class="payment-tips">
        请使用{{ paymentMethod === "wechat" ? "微信" : "支付宝" }}扫码支付
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
.payment-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.amount {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
}

.payment-methods {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  width: 100%;
}

.payment-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.method-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid #eee;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.method-item:hover {
  border-color: #c0eec0;
}

.method-item.active {
  border-color: #c0eec0;
  background: rgba(192, 238, 192, 0.1);
}

.method-item:hover:has(img[alt="支付宝"]),
.method-item.active:has(img[alt="支付宝"]) {
  border-color: #027aff;
  background: rgba(2, 122, 255, 0.1);
}

.qr-code {
  width: 200px;
  height: 200px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.qr-code img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.qr-code-placeholder {
  color: #999;
  font-size: 14px;
}

.payment-tips {
  font-size: 14px;
  color: #666;
  text-align: center;
}

:deep(.el-dialog) {
  border-radius: 16px;
}

:deep(.el-dialog__header) {
  text-align: center;
  margin-right: 0;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

:deep(.el-dialog__title) {
  font-size: 18px;
  font-weight: 600;
}

:deep(.el-dialog__body) {
  padding: 0;
}

:deep(.el-dialog__headerbtn) {
  top: 20px;
}

.expired-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.expired-text {
  color: #fff;
  font-size: 16px;
  margin-bottom: 8px;
}

.reload-text {
  color: #fff;
  font-size: 14px;
  text-decoration: underline;
}

.countdown-container {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
}

.countdown-text {
  color: #666;
  font-size: 14px;
}

.countdown-time {
  color: #ff4d4f;
  font-size: 14px;
  font-weight: 500;
}
</style>

<script lang="ts">
export default {
  name: "PaymentDialog",
};
</script>
