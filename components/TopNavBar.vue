<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { findByUserId, freeRegister } from "~/composables/member";
import { useAuthStore } from "~/composables/auth";
import PricingDialog from "../components/pricing/PricingDialog.vue";
import CustomizeIcon from "~/assets/topNavBar/customize_button_normal.png";

const authStore = useAuthStore();
const memberInfo = ref({
  diamonds: 0,
  type: "", // 会员类型
  memberPackage: {
    level: 0, // 会员等级
  },
  userPoint: {
    totalPaidPoints: 0,
    availableFreePoints: 0,
    availablePaidPoints: 0,
  },
});

// 计算会员显示文本
const memberText = computed(() => {
  const level = memberInfo.value.memberPackage?.level || 0;

  if (level === 0) {
    return "开会员 挣现金奖励";
  }

  if (level >= 3) {
    return "专业会员";
  }

  return "高级会员";
});

// 计算会员文字样式
const memberTextStyle = computed(() => {
  const level = memberInfo.value.memberPackage?.level || 0;

  if (level === 0) {
    return {
      color: "rgba(255, 255, 255, 1)",
    };
  }

  return {
    background:
      level >= 3
        ? "linear-gradient(90deg, rgba(30, 74, 246, 1) 0%, rgba(121, 72, 234, 1) 100%)"
        : "linear-gradient(90deg, rgba(21, 193, 209, 1) 0%, rgba(30, 74, 246, 1) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };
});

// 判断是否为免费/非会员
const isFreeOrNoMember = computed(() => {
  const level = memberInfo.value.memberPackage?.level || 0;
  return level === 0;
});

// 计算显示的积分
const displayPoints = computed(() => {
  const level = memberInfo.value.memberPackage?.level || 0;
  const userPoint = memberInfo.value.userPoint;

  if (level === 0) {
    // 免费会员只显示可用免费积分
    return userPoint?.availableFreePoints || 0;
  } else {
    // 其他会员显示可用付费积分+可用免费积分
    return (
      (userPoint?.availablePaidPoints || 0) +
      (userPoint?.availableFreePoints || 0)
    );
  }
});

const getMemberInfo = async () => {
  try {
    const res = await findByUserId();
    console.log("会员信息:", res);
    if (res?.data) {
      memberInfo.value = res.data;
      return true; // 有会员信息
    }
    return false; // 没有会员信息
  } catch (error) {
    console.error("获取会员信息失败:", error);
    return false;
  }
};

const handleFreeRegister = async () => {
  try {
    const res = await freeRegister();
    console.log("免费注册结果:", res);
    if (res?.code === 200) {
      // 注册成功后重新获取会员信息
      await getMemberInfo();
    }
  } catch (error) {
    console.error("免费注册失败:", error);
  }
};

// 检查会员状态并按需注册
const checkAndRegisterMember = async () => {
  if (!authStore.isLogin) return;

  console.log("检查会员信息...");
  const hasMemberInfo = await getMemberInfo();
  console.log(hasMemberInfo, "hasMemberInfo");
  if (!hasMemberInfo) {
    console.log("未找到会员信息，执行免费注册");
    await handleFreeRegister();
  } else {
    console.log("已是会员，无需注册");
  }
};

// 监听登录状态
watch(
  () => authStore.isLogin,
  async (newVal) => {
    if (newVal) {
      await checkAndRegisterMember();
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (authStore.isLogin) {
    checkAndRegisterMember();
  }
});

// 控制会员套餐弹窗
const showPricingDialog = ref(false);

// 处理会员点击
const handleMemberClick = () => {
  // 只有免费会员才显示购买弹窗
  if (memberInfo.value.memberPackage?.level === 0) {
    showPricingDialog.value = true;
  }
};
</script>

<template>
  <div class="flex items-center space-x-8">
    <div class="nav-item custom-item">
      <img :src="CustomizeIcon" class="custom-icon" alt="定制" />
      <span>定制实物商品</span>
    </div>

    <div
      class="nav-item diamond-item"
      :class="{ 'free-member': isFreeOrNoMember }"
      @click="handleMemberClick"
    >
      <img
        src="@/assets/topNavBar/vip_button_normal.png"
        class="diamond-icon"
        alt="vip"
      />
      <template v-if="isFreeOrNoMember">
        <span class="diamond-count">{{ displayPoints }}</span>
        <span class="separator">|</span>
        <span class="diamond-text">{{ memberText }}</span>
      </template>
      <template v-else>
        <span class="diamond-count">{{ displayPoints }}</span>
        <span class="separator">|</span>
        <span class="diamond-text" :style="memberTextStyle">{{
          memberText
        }}</span>
      </template>
    </div>

    <!-- 会员套餐弹窗 -->
    <PricingDialog
      v-model="showPricingDialog"
      :current-level="memberInfo.memberPackage?.level || 0"
    />
  </div>
</template>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.custom-item {
  background: rgba(255, 255, 255, 0.05);
}

.icon {
  font-size: 16px;
}

.diamond-item {
  display: flex;
  align-items: center;
  background: rgba(33, 63, 133, 0.3);
  border-radius: 20px;
  padding: 6px 12px;
}

.free-member {
  gap: 6px;
}

.diamond-icon {
  width: 26px;
  height: 26px;
  object-fit: contain;
  margin-right: 4px;
}

.diamond-count {
  color: #00e5ff;
  font-weight: bold;
  font-size: 16px;
}

.separator {
  color: rgba(113, 142, 191, 0.25);
  margin: 0 11 px;
  font-size: 14px;
}

.diamond-text {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  line-height: 23.17px;
  color: rgba(255, 255, 255, 1);
}

@media (max-width: 768px) {
  .diamond-text,
  .separator {
    display: none;
  }

  .nav-item {
    padding: 6px 8px;
  }
}

.custom-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
</style>
