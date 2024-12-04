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
interface Props {
  size: string
}
const props = defineProps<Props>()
const curPx = (num: number) => {
  return px2vw(props.size === 'large' ? num : Math.floor(num / 2))
}
</script>

<style lang="scss" scoped>
.base {
  box-sizing: content-box;
  height: v-bind(curPx(108));
  left: 50%;
  margin: v-bind(curPx(-90));
  padding: v-bind(curPx(36));
  position: absolute;
  top: 50%;
  width: v-bind(curPx(108));
  transform: rotateX(45deg) rotateZ(45deg);
  transform-style: preserve-3d;
}

.cube,
.cube:after,
.cube:before {
  content: '';
  float: left;
  height: v-bind(curPx(36));
  position: absolute;
  width: v-bind(curPx(36));
}

/* Top */
.cube {
  background-color: #05afd1;
  position: relative;
  transform: translateZ(v-bind(curPx(36)));
  transform-style: preserve-3d;
  transition: .25s;
  box-shadow: v-bind(curPx(156)) v-bind(curPx(156)) v-bind(curPx(18)) rgba(0, 0, 0, 0.1);
  animation: anim 1s infinite;
}

.cube:after {
  background-color: #049dbc;
  transform: rotateX(-90deg) translateY(v-bind(curPx(36)));
  transform-origin: 100% 100%;
}

.cube:before {
  background-color: #048ca7;
  transform: rotateY(90deg) translateX(v-bind(curPx(36)));
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
    transform: translateZ(v-bind(curPx(6)));
  }
}
</style>