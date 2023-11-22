<template>
  <div class="content-container">
    <div>WELCOME TO NUXTJS</div>
    <van-button type="primary" @click="showToast('toast')"> button</van-button>
    <VanButton type="success" @click="showNotify('notify')">button</VanButton>
    <LazyVanButton type="default">lazy button</LazyVanButton>
    <three-test />
  </div>
</template>
<script setup></script>
<style scoped>
.content-container {
  padding: 10px;
  background: orange;
}
</style>
