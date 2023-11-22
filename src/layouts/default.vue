<!-- https://nuxt.com.cn/docs/guide/directory-structure/layouts -->
<!-- 与其他组件不同，布局必须具有单个根元素，以允许 Nuxt 在布局更改时应用过渡效果 - 而且此根元素不能是  -->
<template>
  <div class="layout-container">
    <slot />
  </div>
</template>
<script setup></script>
<style scoped>
.layout-container {
  padding: 10px;
  background: deeppink;
}
</style>
