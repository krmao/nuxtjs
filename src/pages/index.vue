<template>
  <div class="content-container">
    <div>WELCOME TO NUXTJS</div>
    <UCard :ui="ui"/>
  </div>
</template>
<script setup>
const ui = /*ui*/ {
  background: 'bg-white dark:bg-slate-900'
}
</script>
<style scoped>
.content-container {
  padding: 10px;
  background: orange;
}

</style>
