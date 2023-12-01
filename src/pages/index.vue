<template>
  <div class="content-container">
    <h1>{{ (data as any).length }}</h1>
    <div>WELCOME TO NUXTJS</div>
    <van-button type="primary" @click="showToast('toast')"> button</van-button>
    <VanButton type="success" @click="showNotify('notify')">button</VanButton>
    <LazyVanButton type="default">lazy button</LazyVanButton>
    <!--<three-test />-->
    <!--<three-loader />-->
    <!--    <three-fbx />-->
    <!--    <three-glb />-->
    <three-glb-custom />
  </div>
</template>
<script setup lang="ts">
const res = await useAsyncData('post', () => $fetch('http://api.tvmaze.com/search/shows?q=marvel'))
const data = await res.data
</script>
<style scoped>
.content-container {
  padding: 10px;
  background: orange;
}
</style>
