<script setup lang="ts">
import { ref } from 'vue'
import { ObjectLoader, Scene } from 'three'

const renderer = ref(null)

const SScene = new Scene()
const loader = new ObjectLoader()
// load a resource
loader.load(
  // resource URL
  'objs/龙山大屏-导出.obj',
  // called when resource is loaded
  (object) => {
    SScene.add(object)
  },
  // called when loading is in progresses
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  // called when loading has errors
  (error: any) => {
    console.log('An error happened', error)
  }
)

// renderer.render( scene, camera );
</script>

<template>
  <Renderer ref="renderer">
    <Camera :position="{ z: 10 }" />
    <SScene />
  </Renderer>
</template>
