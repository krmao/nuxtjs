<template>
  <div style="display: flex; flex-direction: column">CUSTOM</div>
</template>
<script setup lang="ts">
const layoutCustomProps = useAttrs();

console.log(layoutCustomProps.title); // I am a custom layout
</script>
