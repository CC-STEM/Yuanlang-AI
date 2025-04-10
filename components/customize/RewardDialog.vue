<template>
  <el-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    title="设计奖励说明"
    width="500px"
    class="reward-dialog"
    :show-close="true"
  >
    <div class="dialog-content">
      <p>
        1. 每次有顾客成功购买您设计的实物商品，您将获得设计奖励，计算方法如下：
      </p>

      <table class="reward-table">
        <thead>
          <tr>
            <th>实物类型示例</th>
            <th>设计奖励示例</th>
            <th>举例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>马克杯</td>
            <td>10% × 商品售价</td>
            <td>
              当您设置某马克杯售价为100元，每次卖出一只，您将获得设计奖励10元
            </td>
          </tr>
          <tr>
            <td>抱枕</td>
            <td>12% × 商品售价</td>
            <td>
              当您设置某抱枕售价为100元，每次卖出一只，您将获得设计奖励12元
            </td>
          </tr>
        </tbody>
      </table>

      <p class="note">通过努力的商品链接推广，您将获得更多的奖励！</p>
      <p class="note">请多多参加我们将发推荐位设计的商品～</p>
      <p class="note">
        2. 订单完成后，设计奖励自动到账您的微信红包。未提现一律定期自动提现。
      </p>
      <p class="note">
        3.
        当您创作了某商品，下单此商品您会获得设计奖励；客户B、C、D下单此商品，您会获得这三人下单后的设计奖励；且获得奖励比例一致。
      </p>
      <p class="note">4. 最终解释权归本公司所有。</p>

      <button class="confirm-btn" @click="$emit('update:modelValue', false)">
        我知道了
      </button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { InfoFilled } from "@element-plus/icons-vue";
import { ref } from "vue";

defineOptions({
  name: "RewardDialog",
});

const isPromoteChecked = ref(false);
const isNotifyChecked = ref(false);

defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>

<style>
.el-overlay-dialog .el-dialog.reward-dialog {
  background: linear-gradient(
    90deg,
    rgba(194, 249, 255, 0.88) 0%,
    rgba(227, 251, 255, 0.88) 30.78%,
    rgba(235, 235, 255, 0.88) 64.09%,
    rgba(181, 207, 255, 0.88) 100%
  );
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  margin-top: 15vh !important;
}

.el-dialog.reward-dialog .el-dialog__header {
  margin: 0;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.el-dialog.reward-dialog .el-dialog__title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
}

.el-dialog.reward-dialog .el-dialog__body {
  padding: 0;
}

.el-dialog.reward-dialog .el-dialog__headerbtn {
  top: 18px;
}
</style>

<style scoped>
.reward-dialog {
  color: #333;
}

.reward-dialog :deep(.el-dialog) {
  background: linear-gradient(
    90deg,
    rgba(194, 249, 255, 0.88) 0%,
    rgba(227, 251, 255, 0.88) 30.78%,
    rgba(235, 235, 255, 0.88) 64.09%,
    rgba(181, 207, 255, 0.88) 100%
  );
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.reward-dialog :deep(.el-dialog__header) {
  margin: 0;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.reward-dialog :deep(.el-dialog__title) {
  font-size: 18px;
  font-weight: 500;
}

.reward-dialog :deep(.el-dialog__headerbtn) {
  top: 18px;
}

.dialog-content {
  padding: 24px;
}

.dialog-content p {
  font-size: 14px;
  color: #333;
  margin-bottom: 16px;
}

.reward-table {
  width: 100%;
  border-collapse: collapse;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
}

.reward-table th,
.reward-table td {
  padding: 12px;
  text-align: left;
  border: none;
  min-width: 140px;
}

.reward-table th {
  background: rgba(0, 0, 0, 0.1);
  font-weight: 500;
  font-size: 14px;
  color: #000;
}

.reward-table td {
  font-size: 14px;
}

.note {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 8px;
}

.confirm-btn {
  display: block;
  width: 120px;
  height: 40px;
  margin: 24px auto 0;
  background: #3468fe;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-btn:hover {
  background: #2857e0;
}

.el-dialog.reward-dialog .el-icon {
  font-size: 16px;
  margin-left: 4px;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: color 0.3s;
}

.el-dialog.reward-dialog .el-icon:hover {
  color: rgba(0, 0, 0, 0.8);
}

.checkbox-group {
  display: flex;
  align-items: center;
  margin-top: 24px;
  padding: 0 12px;
  background: rgba(0, 0, 0, 0.03);
  height: 48px;
  border-radius: 8px;
}
</style>
