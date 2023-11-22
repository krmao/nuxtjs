<!-- https://nuxt.com.cn/docs/getting-started/views#%E9%A1%B5%E9%9D%A2 -->
<template>
  <div class="root-container">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
<script setup>
const config = useRuntimeConfig()
console.log("-- config", config)
</script>
<style scoped>
.root-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  width: 100%;
  height: 100%;
  background: cornflowerblue;
}
</style>
