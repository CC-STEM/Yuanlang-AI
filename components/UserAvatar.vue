<template>
  <div class="flex items-center">
    <div
      class="relative cursor-pointer user-avatar-container flex items-center"
      @click="handleClickHeadIcon"
    >
      <div class="relative avatar-wrapper">
        <!-- 专业会员渐变边框 -->
        <div v-if="memberInfo.memberPackage?.level >= 3" class="pro-gradient">
          <img class="avatar-img" :src="userAvatar" alt="" />
        </div>
        <!-- 高级会员渐变边框 -->
        <div
          v-else-if="memberInfo.memberPackage?.level > 0"
          class="advanced-gradient"
        >
          <img class="avatar-img" :src="userAvatar" alt="" />
        </div>
        <!-- 普通用户无边框 -->
        <img v-else class="avatar-img no-gradient" :src="userAvatar" alt="" />
        <!-- 会员等级图标 -->
        <img
          v-if="memberInfo.memberPackage?.level >= 3"
          :src="ProMemberIcon"
          class="member-icon"
          alt="pro"
        />
        <img
          v-else-if="memberInfo.memberPackage?.level > 0"
          :src="AdvancedMemberIcon"
          class="member-icon"
          alt="advanced"
        />
      </div>
      <span class="ml-2 text-white text-sm">{{
        userInfo?.name || userInfo?.username || "未登录"
      }}</span>

      <!-- 用户配置面板 -->
      <div
        v-show="showUserConfigPanel && authStore.isLogin"
        class="w-[120px] bg-[#3413FF] rounded-[10px] flex flex-col absolute right-0 top-[50px] z-[1001] py-2 shadow-lg"
      >
        <div
          class="text-center config-panel-item py-2 hover:bg-[#4424FF] transition-colors"
          @click.stop="clickShowOrderDialog"
        >
          订单
        </div>
        <div
          class="text-center config-panel-item py-2 hover:bg-[#4424FF] transition-colors"
        >
          资产
        </div>
        <div
          class="text-center config-panel-item py-2 hover:bg-[#4424FF] transition-colors"
          @click.stop="clickShowSettingDialog"
        >
          设置
        </div>
        <div
          class="text-center config-panel-item py-2 hover:bg-[#4424FF] transition-colors"
          @click.stop="handleLogout"
        >
          退出
        </div>
      </div>
    </div>

    <ClientOnly>
      <UserSettingDialog ref="settingDialogRef" />
      <UserOrderDialog ref="orderDialogRef" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useAuthStore } from "~/composables/auth";
import { useRoute, useRouter } from "vue-router";
import DefaultAvatar from "~/assets/cclogo.png";
import ProMemberIcon from "~/assets/topNavBar/member1.png";
import AdvancedMemberIcon from "~/assets/topNavBar/member.png";
import { ElMessage } from "element-plus";

const route = useRoute();
const router = useRouter();
const showUserConfigPanel = ref(false);
const authStore = useAuthStore();
console.log("authStore state:", {
  token: authStore.token,
  isLogin: authStore.isLogin,
  userInfo: authStore.userInfo,
});
const userInfo = computed(() => authStore.userInfo || {});
console.log(userInfo.value, "value");
const userAvatar = computed(() => userInfo.value?.avatar || DefaultAvatar);

interface MemberInfo {
  type: string;
  memberPackage: {
    level: number;
  };
}

// 获取会员信息
const memberInfo = ref<MemberInfo>({
  type: "", // 会员类型
  memberPackage: {
    level: 0, // 会员等级
  },
});

// 获取会员信息
const getMemberInfo = async () => {
  try {
    const res = await findByUserId();
    if (res?.data) {
      memberInfo.value = res.data;
      memberInfo.value.memberPackage.level = 3;
    }
  } catch (error) {
    console.error("获取会员信息失败:", error);
  }
};

// 监听登录状态
watch(
  () => authStore.isLogin,
  async (newVal) => {
    if (newVal) {
      await getMemberInfo();
    }
  },
  { immediate: true }
);

const settingDialogRef = ref();
const orderDialogRef = ref();

const clickShowSettingDialog = () => {
  if (!settingDialogRef.value?.userSettingRef) return;
  settingDialogRef.value.userSettingRef.dialogVisible = true;
  showUserConfigPanel.value = false;
};

const clickShowOrderDialog = () => {
  if (!orderDialogRef.value?.userOrderRef) return;
  orderDialogRef.value.userOrderRef.dialogVisible = true;
  showUserConfigPanel.value = false;
};

const handleClickHeadIcon = (e: Event) => {
  e.stopPropagation();
  if (!authStore.isLogin) {
    authStore.setLoginDialog(true);
    return;
  }
  showUserConfigPanel.value = !showUserConfigPanel.value;
};

const handleLogout = () => {
  authStore.logOut();
  if (route.path !== "/explore") {
    router.push("/explore");
  }
  showUserConfigPanel.value = false;
};

// 点击外部关闭配置面板
const closePanel = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const container = document.querySelector(".user-avatar-container");
  if (container && !container.contains(target)) {
    showUserConfigPanel.value = false;
  }
};

// 监听支付成功事件
const handlePaymentSuccess = async () => {
  // 延迟1秒后重新获取会员信息，确保后端数据已更新
  setTimeout(async () => {
    await getMemberInfo();
  }, 1000);
};

// 监听支付失败事件
const handlePaymentFailure = () => {
  ElMessage.error("支付失败，请稍后重试");
};

// 监听会员信息更新事件
const handleUpdateMemberInfo = async () => {
  await getMemberInfo();
};

onMounted(async () => {
  document.addEventListener("click", closePanel);

  if (authStore.isLogin && !authStore.userInfo?.id) {
    console.log("Fetching user info...");
    try {
      await authStore.getUserInfo();
      console.log("User info fetched:", authStore.userInfo);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  // 添加事件监听
  window.addEventListener("payment-success", handlePaymentSuccess);
  window.addEventListener("payment-failure", handlePaymentFailure);
  window.addEventListener("update-member-info", handleUpdateMemberInfo);
});

onUnmounted(() => {
  document.removeEventListener("click", closePanel);
  window.removeEventListener("payment-success", handlePaymentSuccess);
  window.removeEventListener("payment-failure", handlePaymentFailure);
  window.removeEventListener("update-member-info", handleUpdateMemberInfo);
});
</script>

<style scoped>
.config-panel-item {
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.user-avatar-container {
  padding: 4px 8px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.user-avatar-container:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.avatar-wrapper {
  position: relative;
  width: 36px;
  height: 36px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: #000;
}

.pro-gradient {
  width: 36px;
  height: 36px;
  padding: 2px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    rgba(30, 74, 246, 1) 0%,
    rgba(121, 72, 234, 1) 100%
  );
}

.advanced-gradient {
  width: 36px;
  height: 36px;
  padding: 2px;
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    rgba(21, 193, 209, 1) 0%,
    rgba(30, 74, 246, 1) 100%
  );
}

.no-gradient {
  width: 36px;
  height: 36px;
}

.member-icon {
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  z-index: 3;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}
</style>
