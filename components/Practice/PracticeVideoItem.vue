<template>
  <div class="w-full h-[138px] border-b-[1px] pt-[14px] pb-[14px] border-b-[#ebebeb1f] flex">
    <img src="~/assets/play-item.png" alt="" class="w-[172px] h-[104px]" />
    <div class="flex flex-col ml-[26px]">
      <div class="text-wrap mt-[11px] video-info">零基础入门AI动画系统教程！ Stable Diffusion 使用安装+ 实战案例！</div>
      <div class="flex justify-between h-[17px] mt-[29px]">
        <span class="duration">05:20</span>
        <span class="play-status">播放中</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.video-info {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 15px;
}

.duration {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #FFFFFF;
}

.play-status {
  font-family: Microsoft YaHei;
  font-weight: 400;
  font-size: 12px;
  color: #FFFFFF;
}
</style>