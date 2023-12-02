<!--suppress CssUnusedSymbol -->
<template>
  <transition name="fade">
    <div v-if="isShow" class="progress-container">
      <div class="progress-info">
        <progress class="nes-progress is-primary" :value="props.modelValue" max="100" />
        <p v-if="props.modelValue < 100" class="text">
          {{ props.text }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: number;
    text: string;
  }>(),
  {
    modelValue: 0,
    text: '加载中...'
  }
);

const isShow = ref(true);

watch(
  () => props.modelValue,
  (val) => {
    if (val >= 100) {
      setTimeout(() => {
        isShow.value = false;
      }, 100);
    }
  }
);
</script>

<style scoped>
.progress-container {
  position: absolute;
  padding: 40px;
  inset: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
}

.progress-info {
  width: 100%;
  height: 158px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}

.progress-info .nes-progress {
  width: 400px;
}

.progress-info .text {
  color: #fff;
  margin-top: 20px;
  font-size: 18px;
}

.progress-info .nes-btn {
  margin-top: 20px;
}

.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
