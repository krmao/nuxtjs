<template>
  <div class="content-container">
    <h1>{{ title }}</h1>
    <div>WELCOME TO NUXTJS</div>
    <van-button type="primary" @click="showToast('toast')"> button</van-button>
    <VanButton type="success" @click="showNotify('notify')">button</VanButton>
    <LazyVanButton type="default">lazy button</LazyVanButton>
    <!--<three-test />-->
    <!--<three-loader />-->
    <!--    <three-fbx />-->
    <three-glb />
  </div>
</template>
<script>
export default {
  async asyncData({ _params }) {
    // nuxt3 不再推荐使用 axios https://nuxt.com/docs/migration/component-options#isomorphic-fetch
    // https://nuxt.com/docs/getting-started/data-fetching#usefetch
    // https://stackoverflow.com/a/74679190/4348530
    const { data } = await $fetch('/api/hello')
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
