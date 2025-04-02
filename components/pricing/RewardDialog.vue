<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "RewardDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const handleClose = () => {
      emit("update:modelValue", false);
    };

    const rewardRecords = [
      {
        avatar: "/avatar1.png",
        name: "春水煎茶",
        time: "2025-1-1 10:00:00",
        amount: 28,
      },
      {
        avatar: "/avatar2.png",
        name: "空间站的bear",
        time: "2025-1-1 10:00:00",
        amount: 128,
      },
      {
        avatar: "/avatar3.png",
        name: "群打",
        time: "2025-1-1 10:00:00",
        amount: 28,
      },
    ];

    const rewardAmounts = [1, 8, 28, 58, 128, 288];
    const customAmount = ref("");

    const handleReward = () => {
      // 处理打赏逻辑
      handleClose();
    };

    return {
      handleClose,
      rewardRecords,
      rewardAmounts,
      customAmount,
      handleReward,
    };
  },
});
</script>

<template>
  <el-dialog
    v-model="modelValue"
    :show-close="true"
    @close="handleClose"
    width="400px"
    class="reward-dialog"
  >
    <div class="reward-container">
      <!-- 打赏记录标题 -->
      <div class="record-header">
        <span class="title">打赏记录</span>
        <span class="subtitle">打赏金额将转入对应创作者的收款账户</span>
      </div>

      <!-- 打赏记录列表 -->
      <div class="record-list">
        <div
          v-for="record in rewardRecords"
          :key="record.name"
          class="record-item"
        >
          <div class="user-info">
            <img :src="record.avatar" :alt="record.name" class="avatar" />
            <div class="info">
              <span class="name">{{ record.name }}</span>
              <span class="time">{{ record.time }}</span>
            </div>
          </div>
          <div class="amount">¥{{ record.amount }}</div>
        </div>
        <div class="more">— 已经到底啦 —</div>
      </div>
    </div>

    <!-- 打赏金额选择 -->
    <div class="reward-section">
      <div class="reward-header">
        <!-- <img src="/avatar.png" alt="avatar" class="creator-avatar" /> -->
        <span class="creator-name">春水煎茶</span>
        <span class="reward-text">共收到3次打赏</span>
      </div>

      <div class="amount-selection">
        <span class="guide-text">选择一个喜欢的数字支持创作者</span>
        <div class="amount-grid">
          <button
            v-for="amount in rewardAmounts"
            :key="amount"
            class="amount-btn"
            :class="{ active: false }"
          >
            ¥{{ amount }}
          </button>
        </div>
        <div class="custom-amount">
          <input
            type="text"
            v-model="customAmount"
            placeholder="输入¥1~288元的任意金额"
            class="custom-input"
          />
        </div>
      </div>

      <div class="reward-footer">
        <div class="reward-tip">打赏是为了表达对创作者的认可和支持</div>
        <div class="action-buttons">
          <button class="cancel-btn" @click="handleClose">取消</button>
          <button class="reward-btn" @click="handleReward">赏</button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
.reward-dialog :deep(.el-dialog) {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.8) 100%
  );
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 0;
}

.reward-container {
  padding: 20px;
}

.record-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.subtitle {
  font-size: 14px;
  color: #666;
}

.record-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.record-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  font-size: 14px;
  color: #333;
}

.time {
  font-size: 12px;
  color: #999;
}

.amount {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.more {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-top: 16px;
}

.reward-section {
  background: #fff;
  border-radius: 0 0 16px 16px;
  padding: 20px;
}

.reward-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.creator-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.creator-name {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.reward-text {
  font-size: 14px;
  color: #666;
}

.amount-selection {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.guide-text {
  font-size: 14px;
  color: #666;
  text-align: center;
}

.amount-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.amount-btn {
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.amount-btn.active {
  background: #1677ff;
  color: #fff;
  border-color: #1677ff;
}

.custom-amount {
  margin-top: 8px;
}

.custom-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  outline: none;
}

.custom-input::placeholder {
  color: #999;
}

.reward-footer {
  margin-top: 20px;
}

.reward-tip {
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-bottom: 16px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.cancel-btn,
.reward-btn {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn {
  background: #f5f5f5;
  border: none;
  color: #666;
}

.reward-btn {
  background: #1677ff;
  border: none;
  color: #fff;
}

.cancel-btn:hover {
  background: #e8e8e8;
}

.reward-btn:hover {
  background: #0e5cd1;
}
</style>
