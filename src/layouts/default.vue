<!-- https://nuxt.com.cn/docs/guide/directory-structure/layouts -->
<template>
  <!-- 与其他组件不同，布局必须具有单个根元素，以允许 Nuxt 在布局更改时应用过渡效果 - 而且此根元素不能是  -->
  <div>
    <p>一些在所有页面之间共享的默认布局内容 - DEFAULT</p>
    <slot/>
  </div>
</template>
