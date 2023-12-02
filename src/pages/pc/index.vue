<template>
  <div class="root-container">
    <div class="content-3d">
      <!-- <three-glb-custom />-->
    </div>
    <div class="content-container">
      <div class="head-container">
        <div class="m-5 flex flex-auto justify-center bg-pink-400 p-5">
          <h1>WELCOME TO NUXTJS</h1>
        </div>
        <div class="m-5 flex flex-auto justify-center bg-orange-300 p-5">
          <h1>{{ (data as any).length }}</h1>
        </div>
        <div class="m-5 flex flex-auto justify-evenly bg-blue-400 p-5">
          <van-button type="primary" @click="showToast('toast')"> button</van-button>
          <VanButton type="success" @click="showNotify('notify')">button</VanButton>
          <LazyVanButton type="default">lazy button</LazyVanButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ title: '首页' })
const res = await useAsyncData('post', () => $fetch('http://api.tvmaze.com/search/shows?q=marvel'))
const data = await res.data
const route = useRoute()
console.log(route.meta.title)
</script>
<style scoped>
.root-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: cornflowerblue;
}

.content-container {
  width: 100%;
  height: 100%;
  background: transparent;
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  .head-container {
    width: 375px;
    background: #fff9;
  }
}

.content-3d {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: 0;
}
</style>
