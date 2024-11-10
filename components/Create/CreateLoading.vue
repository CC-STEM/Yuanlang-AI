<template>
  <div class='base'>
    <div class='cube'></div>
    <div class='cube'></div>
    <div class='cube'></div>
    <div class='cube'></div>
    <div class='cube'></div>
    <div class='cube'></div>
    <div class='cube'></div>
    <div class='cube'></div>
    <div class='cube'></div>
  </div>
</template>

<script lang="ts" setup>
import '@/assets/js/prefixfree.min.js'
</script>

<style lang="scss" scoped>
.base {
  box-sizing: content-box;
  height: 108px;
  left: 50%;
  margin: -90px;
  padding: 36px;
  position: absolute;
  top: 50%;
  width: 108px;
  transform: rotateX(45deg) rotateZ(45deg);
  transform-style: preserve-3d;
}

.cube,
.cube:after,
.cube:before {
  content: '';
  float: left;
  height: 36px;
  position: absolute;
  width: 36px;
}

/* Top */
.cube {
  background-color: #05afd1;
  position: relative;
  transform: translateZ(36px);
  transform-style: preserve-3d;
  transition: .25s;
  box-shadow: 156px 156px 18px rgba(0, 0, 0, 0.1);
  animation: anim 1s infinite;
}

.cube:after {
  background-color: #049dbc;
  transform: rotateX(-90deg) translateY(36px);
  transform-origin: 100% 100%;
}

.cube:before {
  background-color: #048ca7;
  transform: rotateY(90deg) translateX(36px);
  transform-origin: 100% 0;
}

.cube:nth-child(1) {
  animation-delay: 0.05s;
}

.cube:nth-child(2) {
  animation-delay: 0.1s;
}

.cube:nth-child(3) {
  animation-delay: 0.15s;
}

.cube:nth-child(4) {
  animation-delay: 0.2s;
}

.cube:nth-child(5) {
  animation-delay: 0.25s;
}

.cube:nth-child(6) {
  animation-delay: 0.3s;
}

.cube:nth-child(7) {
  animation-delay: 0.35s;
}

.cube:nth-child(8) {
  animation-delay: 0.4s;
}

.cube:nth-child(9) {
  animation-delay: 0.45s;
}

@keyframes anim {
  50% {
    transform: translateZ(6px);
  }
}
</style>