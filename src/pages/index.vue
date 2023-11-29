<template>
  <div class="content-container">
    <h1>{{ title }}</h1>
    <div>WELCOME TO NUXTJS</div>
    <van-button type="primary" @click="showToast('toast')"> button</van-button>
    <VanButton type="success" @click="showNotify('notify')">button</VanButton>
    <LazyVanButton type="default">lazy button</LazyVanButton>
    <!--    <three-test />-->
    <!--    <three-loader />-->
    <three-fbx />
  </div>
</template>
<script>
import axios from 'axios'

export default {
  async asyncData({ params }) {
    const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
</script>
<style scoped>
.content-container {
  padding: 10px;
  background: orange;
}
</style>
