<script setup lang="ts">
import { Pane } from 'tweakpane'

const pane = new Pane()
const gl = reactive({
  clearColor: '#82dbc5'
})

pane.addBinding(gl, 'clearColor', { label: 'Background' })
</script>

<template>
  <TresCanvas window-size v-bind="gl">
    <OrbitControls />
    <TresMesh ref="boxRef">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
