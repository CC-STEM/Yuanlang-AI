<script lang="ts">
import { defineComponent } from "vue";
import { Close } from "@element-plus/icons-vue";

interface LogisticsStep {
  status: string;
  time: string;
  desc?: string;
  isCompleted?: boolean;
}

export default defineComponent({
  name: "LogisticsDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const logisticsSteps: LogisticsStep[] = [
      {
        status: "已签收",
        time: "今天11:00:00",
        desc: "包裹已送出",
        isCompleted: true,
      },
      {
        status: "待取件",
        time: "今天10:00:00",
        desc: "取件出站取件码A-2323，快递已电话联系站长收件，电话12345",
      },
      {
        status: "派送中",
        time: "今天9:00:00",
        desc: "派送员黄某正在为您派送，电话12345，感谢您的耐心等候",
      },
      {
        status: "运输中",
        time: "今天8:00:00",
        desc: "您的快递已到达汉口站",
      },
      {
        status: "今天8:00:00",
        time: "今天8:00:00",
        desc: "您的快递已到达湖北省",
      },
      {
        status: "已揽件",
        time: "2-10 10:00:00",
        desc: "「湖北省」您的包裹已由物流公司揽收",
      },
      {
        status: "已发货",
        time: "2-10 9:00:00",
        desc: "您的包裹正在等待揽收",
      },
      {
        status: "已下单",
        time: "2-10 8:00:00",
        desc: "商品已经下单",
      },
    ];

    const handleClose = () => {
      emit("update:modelValue", false);
    };

    return {
      logisticsSteps,
      handleClose,
    };
  },
});
</script>

<template>
  <el-dialog
    v-model="modelValue"
    :show-close="false"
    :modal="true"
    custom-class="logistics-dialog"
    width="360px"
    top="10vh"
    @close="handleClose"
  >
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="header-content">
          <span class="title">查看物流</span>
          <div class="tracking-number">
            <span class="label">中通快递 ZT2288288</span>
            <span class="copy">复制</span>
          </div>
        </div>
        <el-icon class="close-icon" @click="handleClose">
          <Close />
        </el-icon>
      </div>

      <div class="dialog-body">
        <div class="logistics-timeline">
          <div
            v-for="(step, index) in logisticsSteps"
            :key="index"
            class="timeline-item"
            :class="{ completed: step.isCompleted }"
          >
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="status-time">
                <span class="status">{{ step.status }}</span>
                <span class="time">{{ step.time }}</span>
              </div>
              <div class="desc" v-if="step.desc">{{ step.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
.logistics-dialog :deep(.el-dialog) {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.85) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
}

.dialog-content {
  padding: 0;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.tracking-number {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  font-size: 14px;
  color: #666;
}

.copy {
  font-size: 14px;
  color: #1677ff;
  cursor: pointer;
}

.close-icon {
  font-size: 20px;
  color: #999;
  cursor: pointer;
  padding: 4px;
}

.close-icon:hover {
  color: #666;
}

.dialog-body {
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;
}

.logistics-timeline {
  position: relative;
}

.timeline-item {
  position: relative;
  padding-left: 20px;
  padding-bottom: 24px;
}

.timeline-item::before {
  content: "";
  position: absolute;
  left: 6px;
  top: 24px;
  bottom: 0;
  width: 1px;
  background: #e8e8e8;
}

.timeline-item:last-child::before {
  display: none;
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 8px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #e8e8e8;
  background: #fff;
}

.timeline-item.completed .timeline-dot {
  background: #52c41a;
  border-color: #52c41a;
}

.timeline-content {
  min-height: 28px;
}

.status-time {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.status {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.time {
  font-size: 14px;
  color: #999;
}

.desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.timeline-item.completed .status {
  color: #52c41a;
}
</style>
