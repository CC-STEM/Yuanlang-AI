const checkOrderStatus = async () => { try { const res = await
(paymentMethod.value === "wechat" ? queryOrder(orderNo.value) :
queryAliOrder(orderNo.value)); console.log(res, "res"); if (res?.data ===
"支付成功") { stopPolling(); stopExpirationTimer(); stopCountdown();
ElMessage.success("支付成功！"); emit("payment-success");
emit("close-package-dialog"); // 关闭套餐弹窗 emit("update-member-info"); //
更新会员信息 dialogVisible.value = false; // 关闭支付弹窗 } else if (res?.data
=== "支付失败") { stopPolling(); stopExpirationTimer(); stopCountdown();
emit("payment-failure"); dialogVisible.value = false; } } catch (error) {
console.error("查询订单状态失败:", error); stopPolling(); stopExpirationTimer();
stopCountdown(); emit("payment-failure"); dialogVisible.value = false; } };
