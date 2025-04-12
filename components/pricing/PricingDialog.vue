<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { ElMessage } from "element-plus";
import { getPackage } from "~/composables/member";
import PaymentDialog from "../payment/PaymentDialog.vue";
import { useAuthStore } from "~/composables/auth";

interface PricingPlan {
  id: number;
  type: string;
  price: number;
  period: string;
  pointsPerHundred: number;
  bonusPoints: number;
  features: string[];
  buttonText: string;
  buttonClass: string;
  isPro?: boolean;
  validDays: number;
  level: number;
}

interface PackageResponse {
  id: number;
  type: string;
  title: string;
  price: number;
  priceUnit: string;
  points: number;
  level: number;
  validMonth: number;
  addendum: string;
  createdAt: string;
  updatedAt: string;
}

defineOptions({
  name: "PricingDialog",
});

const props = defineProps<{
  modelValue: boolean;
  currentLevel?: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

// 使用计算属性处理 v-model
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// 会员套餐数据
const pricingPlans = ref<PricingPlan[]>([]);

// 添加支付相关的状态
const showPaymentDialog = ref(false);
const selectedPlan = ref<PricingPlan | null>(null);

// 获取用户store
const authStore = useAuthStore();
console.log("初始化时的登录状态:", authStore.isLogin);
console.log("初始化时的用户信息:", authStore.userInfo);

// 获取会员套餐数据
const getPackageApi = async () => {
  try {
    const res = await getPackage();
    console.log("会员套餐数据:", res);
    console.log("当前用户等级:", props.currentLevel);
    if (res?.datas) {
      pricingPlans.value = res.datas.map((pkg: PackageResponse) => {
        console.log("套餐信息:", pkg.title, pkg.level);
        // 基础权益项
        const baseFeatures = [`赠送${pkg.points}积分`];

        // 根据套餐级别添加不同权益
        let features = [...baseFeatures];

        if (pkg.level === 1) {
          // 基础会员
          features.push(
            `积分${pkg.validMonth === 1 ? 30 + "天" : 365 + "天"}有效`,
            "初阶权益课程",
            "参与活动赛事",
            "设计奖励金返点5%"
          );
        } else if (pkg.level === 2) {
          // 高级会员
          features.push(
            `积分${pkg.validMonth === 1 ? 30 + "天" : 365 + "天"}有效`,
            "初阶权益课程",
            "中阶课程权益",
            "参与活动赛事",
            "设计奖励金返点5%"
          );
        } else if (pkg.level === 3) {
          // Pro会员
          features.push(
            `积分${pkg.validMonth === 1 ? 30 + "天" : 365 + "天"}有效`,
            "初阶权益课程",
            "中阶课程权益",
            "高阶课程权益",
            "参与活动赛事",
            "发起活动赛事",
            "活动赛事奖励 ",
            "设计奖励金返点10%",
            "子账户3个"
          );
        } else if (pkg.level === 4) {
          // 企业版会员
          features.push(
            `积分${pkg.validMonth === 1 ? 30 + "天" : 365 + "天"}有效`,
            "初阶权益课程",
            "中阶课程权益",
            "高阶课程权益",
            "参与活动赛事",
            "发起活动赛事",
            "活动赛事奖励 ",
            "设计奖励金返点10%",
            "子账户5个"
          );
        }

        // 添加后端返回的额外权益
        // if (pkg.addendum) {
        //   features.push(...pkg.addendum.split(","));
        // }

        return {
          id: pkg.id,
          type: pkg.title,
          price: pkg.price,
          period: pkg.priceUnit,
          pointsPerHundred: pkg.points,
          bonusPoints: 0,
          features: features,
          validDays: pkg.validMonth === -1 ? -1 : pkg.validMonth * 30,
          isPro: pkg.level >= 3,
          level: pkg.level,
          buttonText: pkg.level >= 1 ? "订阅购买" : "",
          buttonClass: pkg.level >= 3 ? "btn-pro" : "btn-premium",
        };
      });
    }
  } catch (error) {
    console.error("获取会员套餐失败:", error);
    ElMessage.error("获取会员套餐失败，请稍后重试");
  }
};

// 初始化用户信息
onMounted(async () => {
  console.log("组件挂载时的登录状态:", authStore.isLogin);
  console.log("组件挂载时的用户信息:", authStore.userInfo);

  if (authStore.isLogin && !authStore.userInfo?.id) {
    console.log("开始获取用户信息...");
    try {
      await authStore.getUserInfo();
      console.log("获取用户信息成功:", authStore.userInfo);
    } catch (error) {
      console.error("获取用户信息失败:", error);
    }
  }
  getPackageApi();
});

// 监听登录状态变化
watch(
  () => authStore.isLogin,
  async (newVal, oldVal) => {
    console.log("登录状态变化:", oldVal, "->", newVal);
    if (newVal) {
      console.log("登录状态变化后开始获取用户信息...");
      try {
        await authStore.getUserInfo();
        console.log("登录后获取用户信息成功:", authStore.userInfo);
      } catch (error) {
        console.error("登录后获取用户信息失败:", error);
      }
    }
  }
);

// 监听弹窗显示状态
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      getPackageApi();
    }
  }
);

// 监听 currentLevel 变化
watch(
  () => props.currentLevel,
  (newVal) => {
    console.log("当前会员等级变化:", newVal);
    console.log(
      "当前套餐等级:",
      pricingPlans.value.map((plan) => ({
        type: plan.type,
        level: plan.level,
      }))
    );
  }
);

// 处理订阅按钮点击
const handleSubscribe = async (plan: PricingPlan) => {
  console.log("点击订阅按钮时的登录状态:", authStore.isLogin);
  console.log("点击订阅按钮时的用户信息:", authStore.userInfo);

  if (!authStore.isLogin) {
    ElMessage.warning("请先登录");
    authStore.setLoginDialog(true);
    return;
  }

  // 确保有用户信息
  if (!authStore.userInfo?.id) {
    console.log("订阅时开始获取用户信息...");
    try {
      await authStore.getUserInfo();
      console.log("订阅时获取用户信息成功:", authStore.userInfo);
    } catch (error) {
      console.error("订阅时获取用户信息失败:", error);
      ElMessage.error("获取用户信息失败，请刷新页面重试");
      return;
    }
  }

  if (!authStore.userInfo?.id) {
    ElMessage.error("无法获取用户信息，请刷新页面重试");
    return;
  }

  selectedPlan.value = plan;
  showPaymentDialog.value = true;
};

// 处理支付成功
const handlePaymentSuccess = () => {
  showPaymentDialog.value = false;
  dialogVisible.value = false;
};
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="会员订阅"
    width="80%"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <div class="pricing-container">
      <div class="pricing-grid">
        <div
          v-for="plan in pricingPlans"
          :key="plan.type + plan.price"
          class="pricing-card"
          :class="{
            free: plan.price === 0,
            pro: plan.level >= 3,
            premium: plan.level === 2 || plan.level === 1,
          }"
        >
          <!-- 会员类型标签和PRO标签容器 -->
          <div class="plan-header">
            <div class="plan-type">
              {{ plan.type === "试用" ? "免费" : plan.type }}
              <span
                v-if="Number(props.currentLevel) === plan.level"
                class="current-tag"
                >当前</span
              >
            </div>
            <!-- PRO标签 -->
            <div v-if="plan.level >= 3" class="pro-badge">PRO</div>
          </div>

          <!-- 价格区域 -->
          <div class="price-section">
            <span class="currency">¥</span>
            <span class="price">{{ plan.price }}</span>
            <span class="period" v-if="plan.level >= 1">{{ plan.period }}</span>
          </div>

          <!-- 每月价格和积分比率 -->
          <div class="secondary-info">
            <span v-if="plan.period === '每年'" class="monthly-price">
              约¥{{ (plan.price / 12).toFixed(2) }}/月
            </span>
            <span v-if="plan.pointsPerHundred" class="points-rate">
              ¥{{ plan.pointsPerHundred }}/100积分
            </span>
          </div>
          <!-- 订阅按钮 -->
          <button
            class="subscribe-btn"
            :class="plan.buttonClass"
            v-if="plan.buttonText"
            @click="handleSubscribe(plan)"
          >
            {{ plan.buttonText }}
          </button>
          <!-- 功能列表 -->
          <ul class="feature-list">
            <li v-for="feature in plan.features" :key="feature">
              <span class="check-icon">✓</span>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 支付弹窗 -->
    <PaymentDialog
      v-model="showPaymentDialog"
      :amount="selectedPlan?.price || 0"
      :package-id="selectedPlan?.id || 0"
      :user-id="authStore.userInfo?.id"
      :package-title="selectedPlan?.type || ''"
      @payment-success="handlePaymentSuccess"
    />
  </el-dialog>
</template>

<style scoped>
.pricing-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 0;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  align-items: stretch;
}

.pricing-card {
  position: relative;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  min-height: 480px;
  transition: transform 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-4px);
}

.pricing-card.free {
  background: #2a2a2a;
  color: #ffffff;
}

.pricing-card.pro {
  background: #ffffff;
  border: 2px solid #ff4d4f;
}

.pricing-card.premium {
  background: #ffffff;
  border: 2px solid rgba(255, 141, 26, 1);
}

.plan-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  position: relative;
}

.plan-type {
  font-size: 24px;
  font-weight: 600;
  color: inherit;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.pro-badge {
  background: #ff4d4f;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  height: fit-content;
  position: absolute;
  top: 0;
  right: 0;
}

.price-section {
  margin: 24px 0;
  display: flex;
  align-items: baseline;
}

.currency {
  font-size: 20px;
  margin-right: 4px;
}

.price {
  font-size: 36px;
  font-weight: 700;
}

.period {
  font-size: 16px;
  margin-left: 4px;
  color: #666;
}

.free .period {
  color: #999;
}

.secondary-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 24px;
  white-space: nowrap;
  padding: 0 4px;
}

.monthly-price {
  font-size: 13px;
  color: #666;
  flex-shrink: 0;
}

.points-rate {
  font-size: 13px;
  color: #999;
  flex-shrink: 0;
}

.free .monthly-price,
.free .points-rate {
  color: #999;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

.feature-list li {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  color: #666;
}

.free .feature-list li {
  color: #ffffff;
}

.check-icon {
  margin-right: 8px;
  color: #52c41a;
}

.free .check-icon {
  color: #ffffff;
}

.subscribe-btn {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;
  box-shadow: 0px 2px 8px ；;
}

.btn-current {
  background: #404040;
  color: #ffffff;
}

.btn-premium {
  background: #ff9f40;
  color: #ffffff;
}

.btn-premium:hover {
  background: #f28c30;
}

.btn-pro {
  background: #ff4d4f;
  color: #ffffff;
}

.btn-pro:hover {
  background: #f03f41;
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }

  .pricing-card {
    min-height: auto;
  }
}

:deep(.el-dialog) {
  background: #0a0f25;
  border-radius: 16px;
}

:deep(.el-dialog__header) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-right: 0;
  padding-bottom: 20px;
  text-align: center;
}

:deep(.el-dialog__title) {
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
}

:deep(.el-dialog__headerbtn) {
  top: 16px;
}

:deep(.el-dialog__headerbtn .el-dialog__close) {
  color: #ffffff;
}

.current-tag {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  padding: 2px 8px;
  background: linear-gradient(135deg, #52c41a, #7cb305);
  border-radius: 4px;
  margin-left: 8px;
  color: #ffffff;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(82, 196, 26, 0.2);
  transform-origin: center;
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0% {
    opacity: 1;
    box-shadow: 0 2px 4px rgba(82, 196, 26, 0.2);
  }
  50% {
    opacity: 0.8;
    box-shadow: 0 2px 8px rgba(82, 196, 26, 0.4);
  }
  100% {
    opacity: 1;
    box-shadow: 0 2px 4px rgba(82, 196, 26, 0.2);
  }
}
</style>

<script lang="ts">
export default {
  name: "PricingDialog",
};
</script>
