<script setup>
import { ref, watchEffect, onBeforeMount } from 'vue';
import PDF from 'pdf-vue3';

const isMobile = ref(false);

const resize = () => {
  isMobile.value = window.innerWidth < 750;
};

onBeforeMount(() => {
  watchEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  });
});
</script>

<template>
  <div style="width: 100%" class="bg-blue-400">
    <PDF
      :showPageTooltip="false"
      :showBackToTopBtn="false"
      :showProgress="false"
      :stopAtErrors="false"
      :disableFontFace="false"
      :useSystemFonts="true"
      :pdfWidth="isMobile ? '100%' : '750'"
      :rowGap="isMobile ? 4 : 8"
      src="/files/pdf.pdf"
    />
  </div>
</template>

<style scoped>
@media (min-width: 750px) {
  :deep(.pdf-vue3-backToTopBtn) {
    right: 32px !important;
  }
}
</style>
