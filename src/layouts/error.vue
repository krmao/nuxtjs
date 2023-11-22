<template>
  <div style="display: flex; flex-direction: column">
    ERROR {{ layoutCustomProps.title }}
    <slot />
  </div>
</template>
<script setup lang="ts">
const layoutCustomProps = useAttrs()
</script>
