<script setup lang="ts">
import { ref } from "vue";
// import TrendChart from "@/components/statistics/TrendChart.vue";

interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  bgColor: string;
  iconBg: string;
}

interface Product {
  id: string;
  title: string;
  image: string;
  sales: number;
  price?: string;
}

const timeRange = ref("按月·统计");
const timeOptions = ["7天内", "30天内", "今年", "历史以来"];

const todayStats: StatCard[] = [
  {
    title: "今日收入（设计奖励+打赏）",
    value: "¥2,750.00",
    icon: "🏆",
    bgColor: "bg-gradient-to-br from-[#FFF9E7] to-[#FFF6D9]",
    iconBg: "bg-[#FFF0C2]",
  },
  {
    title: "销量",
    value: "790",
    icon: "🔒",
    bgColor: "bg-gradient-to-br from-[#F5EFFF] to-[#F0E6FF]",
    iconBg: "bg-[#E6D6FF]",
  },
  {
    title: "未提现设计奖励",
    value: "¥75.00",
    icon: "💰",
    bgColor: "bg-gradient-to-br from-[#FFF0F5] to-[#FFE6EF]",
    iconBg: "bg-[#FFD6E6]",
  },
  {
    title: "新增订单",
    value: "778",
    icon: "📈",
    bgColor: "bg-gradient-to-br from-[#EBF9FF] to-[#E6F7FF]",
    iconBg: "bg-[#D6F0FF]",
  },
];

const historyStats: StatCard[] = [
  {
    title: "累计收入（设计奖励+打赏）",
    value: "¥122,750",
    icon: "💰",
    bgColor: "bg-gradient-to-br from-[#F0FFF4] to-[#E6FFE6]",
    iconBg: "bg-[#D6FFD6]",
  },
  {
    title: "销量",
    value: "750",
    icon: "📦",
    bgColor: "bg-gradient-to-br from-[#F5EFFF] to-[#F0E6FF]",
    iconBg: "bg-[#E6D6FF]",
  },
  {
    title: "订单量",
    value: "99",
    icon: "📝",
    bgColor: "bg-gradient-to-br from-[#FFF0F5] to-[#FFE6EF]",
    iconBg: "bg-[#FFD6E6]",
  },
  {
    title: "由我分享订单量",
    value: "80",
    icon: "🔄",
    bgColor: "bg-gradient-to-br from-[#EBF9FF] to-[#E6F7FF]",
    iconBg: "bg-[#D6F0FF]",
  },
  {
    title: "上架商品量",
    value: "12",
    icon: "🏪",
    bgColor: "bg-gradient-to-br from-[#FFF0F5] to-[#FFE6EF]",
    iconBg: "bg-[#FFD6E6]",
  },
];

const topProducts: Product[] = [
  {
    id: "1",
    title: "蝴蝶的梦-抱枕",
    image: "/products/1.jpg",
    sales: 2000,
    price: "¥233.00",
  },
  {
    id: "2",
    title: "蝴蝶的梦-抱枕",
    image: "/products/2.jpg",
    sales: 2000,
    price: "¥233.00",
  },
  {
    id: "3",
    title: "蝴蝶的梦-抱枕",
    image: "/products/3.jpg",
    sales: 2000,
    price: "¥233.00",
  },
];

const chartData = {
  dates: ["07-08", "07-09", "07-10", "07-11", "07-12", "07-13"],
  sales: [180, 320, 130, 210, 180, 180],
  amounts: [260, 480, 190, 320, 260, 260],
  rewards: [500, 1200, 800, 900, 1100, 1300],
};
</script>

<template>
  <div class="statistics-page">
    <!-- 返回按钮和标题 -->
    <div class="page-header">
      <el-button class="back-btn" icon="ArrowLeft" link @click="$router.back()">
        <span class="text-white">今日数据</span>
      </el-button>
    </div>

    <!-- 今日数据卡片 -->
    <div class="stats-grid">
      <div
        v-for="stat in todayStats"
        :key="stat.title"
        class="stat-card"
        :class="[stat.bgColor]"
      >
        <div class="stat-icon" :class="[stat.iconBg]">
          {{ stat.icon }}
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-title">{{ stat.title }}</div>
        </div>
      </div>
    </div>

    <!-- 历史数据 -->
    <div class="section-header">
      <h2>历史数据</h2>
      <div class="time-filter">
        <el-radio-group v-model="timeRange" size="small">
          <el-radio-button
            v-for="option in timeOptions"
            :key="option"
            :label="option"
            class="custom-radio"
          />
        </el-radio-group>
      </div>
    </div>

    <div class="stats-grid">
      <div
        v-for="stat in historyStats"
        :key="stat.title"
        class="stat-card"
        :class="[stat.bgColor]"
      >
        <div class="stat-icon" :class="[stat.iconBg]">
          {{ stat.icon }}
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-title">{{ stat.title }}</div>
        </div>
      </div>
    </div>

    <!-- 趋势图 -->
    <div class="section-header">
      <h2>趋势图</h2>
      <div class="time-filter">
        <el-radio-group v-model="timeRange" size="small">
          <el-radio-button
            v-for="option in timeOptions"
            :key="option"
            :label="option"
            class="custom-radio"
          />
        </el-radio-group>
      </div>
    </div>

    <div class="chart-container">
      <!-- <TrendChart :data="chartData" /> -->
    </div>

    <!-- 销量前三商品 -->
    <div class="section-header">
      <h2>销量前三商品</h2>
      <div class="time-filter">
        <el-radio-group v-model="timeRange" size="small">
          <el-radio-button
            v-for="option in timeOptions"
            :key="option"
            :label="option"
            class="custom-radio"
          />
        </el-radio-group>
      </div>
    </div>

    <div class="product-grid">
      <div
        v-for="product in topProducts"
        :key="product.id"
        class="product-card"
      >
        <el-image :src="product.image" fit="cover" class="product-image" />
        <div class="product-info">
          <h3>{{ product.title }}</h3>
          <div class="product-meta">
            <span class="price">{{ product.price }}</span>
            <span class="sales">销量 {{ product.sales }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.statistics-page {
  padding: 24px;
  background-color: #0a0f25;
  min-height: 100vh;
  color: #fff;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.back-btn {
  font-size: 16px;
  font-weight: 500;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  padding: 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s;
  backdrop-filter: blur(8px);
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 24px;
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content {
  flex: 1;
}

.stat-title {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  margin-top: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
}

.chart-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  height: 400px;
  margin-bottom: 32px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.product-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.product-info {
  padding: 16px;
}

.product-info h3 {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  color: #ff6b6b;
  font-weight: 500;
}

.sales {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.custom-radio :deep(.el-radio-button__inner) {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 6px 16px;
  border-radius: 4px;
}

.custom-radio
  :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background-color: #1989fa;
  border-color: #1989fa;
  color: #fff;
  box-shadow: none;
}

:deep(.el-radio-button:first-child .el-radio-button__inner) {
  border-radius: 4px;
}

:deep(.el-radio-button:last-child .el-radio-button__inner) {
  border-radius: 4px;
}
</style>
