<template>
  <section class="test">
    <p class="text-red-500 ml-[100px]">此页面将显示在 /about 路由。</p>
  </section>
  <el-button @click="() => { console.log(111); ElMessage.success('hello') }">button</el-button>
  <ElButton @click="() => { console.log(222) }" :icon="ElIconEditPen" type="success">button</ElButton>
  <LazyElButton type="warning">lazy button</LazyElButton>
</template>
<style lang="scss" scoped>
.test {
  .a {
    color: red
  }
}
</style>
