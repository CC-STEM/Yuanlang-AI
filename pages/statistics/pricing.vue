<script setup lang="ts">
import RewardDialog from "~/components/pricing/RewardDialog.vue";
import LogisticsDialog from "~/components/pricing/LogisticsDialog.vue";
import { InfoFilled } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { getPackage } from "~/composables/member";

interface PricingPlan {
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
}

// API响应类型
interface PackageResponse {
  type: string;
  price: number;
  period: "month" | "year";
  pointsPerHundred: number;
  bonusPoints: number;
  validDays: number;
  features: string[];
  isCurrent: boolean;
  isPro: boolean;
}

// 会员套餐数据
const pricingPlans = ref<PricingPlan[]>([]);

// 获取会员套餐数据
const getPackageApi = async () => {
  try {
    const res = await getPackage();
    console.log("会员套餐数据:", res);
    if (res?.data) {
      // 转换API响应数据为展示格式
      pricingPlans.value = res.data.map((pkg: PackageResponse) => ({
        type: pkg.type,
        price: pkg.price,
        period: pkg.period === "year" ? "/年" : "/月",
        pointsPerHundred: pkg.pointsPerHundred,
        bonusPoints: pkg.bonusPoints,
        features: pkg.features,
        validDays: pkg.validDays,
        isPro: pkg.isPro,
        buttonText: pkg.isCurrent ? "当前套餐" : "立即开通",
        buttonClass: pkg.isCurrent
          ? "btn-current"
          : pkg.isPro
          ? "btn-pro"
          : "btn-premium",
      }));
    }
  } catch (error) {
    console.error("获取会员套餐失败:", error);
    ElMessage.error("获取会员套餐失败，请稍后重试");
  }
};

// 组件挂载时获取数据
onMounted(() => {
  console.log("Component mounted, fetching data...");
  getPackageApi();
});

// 打赏弹窗控制
const rewardDialogVisible = ref(false);

const showRewardDialog = () => {
  rewardDialogVisible.value = true;
};

const showLogisticsDialog = ref(false);

const openLogisticsDialog = () => {
  showLogisticsDialog.value = true;
};
</script>

<template>
  <div class="pricing-page">
    <div class="pricing-container">
      <div class="page-header">
        <h1 class="page-title">会员套餐</h1>
        <div class="header-actions">
          <el-button type="primary" @click="showRewardDialog">打赏</el-button>
          <el-button class="logistics-btn" @click="openLogisticsDialog">
            查看物流
          </el-button>
          <el-button class="reward-info-btn" @click="showRewardDialog">
            <el-icon class="info-icon"><InfoFilled /></el-icon>
            设计奖励说明
          </el-button>
        </div>
      </div>

      <div class="pricing-grid">
        <div
          v-for="plan in pricingPlans"
          :key="plan.type + plan.price"
          class="pricing-card"
          :class="{ free: plan.price === 0, pro: plan.isPro }"
        >
          <!-- 会员类型标签 -->
          <div class="plan-type">{{ plan.type }}</div>

          <!-- PRO标签 -->
          <div v-if="plan.isPro" class="pro-badge">PRO</div>

          <!-- 价格区域 -->
          <div class="price-section">
            <span class="currency">¥</span>
            <span class="price">{{ plan.price }}</span>
            <span class="period">{{ plan.period }}</span>
          </div>

          <!-- 积分比率 -->
          <div v-if="plan.pointsPerHundred" class="points-rate">
            ¥{{ plan.pointsPerHundred }}/100积分
          </div>

          <!-- 功能列表 -->
          <ul class="feature-list">
            <li v-for="feature in plan.features" :key="feature">
              <span class="check-icon">✓</span>
              {{ feature }}
            </li>
          </ul>

          <!-- 订阅按钮 -->
          <button class="subscribe-btn" :class="plan.buttonClass">
            {{ plan.buttonText }}
          </button>
        </div>
      </div>
    </div>

    <!-- 打赏弹窗 -->
    <RewardDialog v-model="rewardDialogVisible" />
    <LogisticsDialog v-model="showLogisticsDialog" />
  </div>
</template>

<style scoped>
.pricing-page {
  min-height: 100vh;
  padding: 40px 20px;
  background: #0a0f25;
}

.pricing-container {
  max-width: 1400px;
  margin: 0 auto;
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

.plan-type {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: inherit;
}

.pro-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #ff4d4f;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
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

.points-rate {
  font-size: 14px;
  color: #999;
  margin-bottom: 24px;
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
  border-radius: 24px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 24px;
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

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 16px;
}

.logistics-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.logistics-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.reward-info-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.reward-info-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.info-icon {
  font-size: 16px;
}
</style>
