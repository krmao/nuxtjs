<template>
  <div style="display: flex; flex-direction: column">
    <NuxtLayout name="error" title="From Error">
      <h1 v-if="error.statusCode === 404">人在旅途，难免迷途~</h1>
      <h1 v-else>An error occurred</h1>
    </NuxtLayout>
  </div>
</template>
<script setup>
const { error } = defineProps(['error'])
</script>
