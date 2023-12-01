<template>
  <div class="root-container">
    <!--<three-test />-->
    <!--<three-loader />-->
    <!--    <three-fbx />-->
    <!--    <three-glb />-->
    <div class="content-3d">
      <three-glb-custom />
    </div>
    <div class="content-container">
      <div class="head-container">
        <h1>{{ (data as any).length }}</h1>
        <div>WELCOME TO NUXTJS</div>
        <van-button type="primary" @click="showToast('toast')"> button</van-button>
        <VanButton type="success" @click="showNotify('notify')">button</VanButton>
        <LazyVanButton type="default">lazy button</LazyVanButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const res = await useAsyncData('post', () => $fetch('http://api.tvmaze.com/search/shows?q=marvel'))
const data = await res.data
</script>
<style scoped>
.root-container {
  position: relative;
  background: #fefefe;
}

.content-container {
  padding: 10px;
  background: transparent;
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  .head-container {
    padding: 15px;
    background: #fff9;
  }
}

.content-3d {
  position: absolute;
  inset: 0;
  z-index: 0;
}
</style>
