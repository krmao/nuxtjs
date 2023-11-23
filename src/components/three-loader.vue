<template>
  <TresCanvas window-size v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3] as any" />
    <OrbitControls />
    <Suspense>
      <!--suppress HtmlUnknownTag -->
      <primitive :object="scene" />
    </Suspense>
  </TresCanvas>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from '@tresjs/cientos'
// https://threejs.org/docs/#examples/en/loaders/OBJLoader
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

const { BasicShadowMap, NoToneMapping, Scene, SRGBColorSpace } = THREE

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
}
const scene = new Scene()
//
onMounted(() => {
  const manager = new THREE.LoadingManager()
  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
  }

  manager.onLoad = function () {
    console.log('Loading complete!')
  }

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
  }

  manager.onError = function (url) {
    console.log('There was an error loading ' + url)
  }
  new OBJLoader(manager).load(
    'objs/P911GT/Porsche_911_GT2.obj',
    (object: any) => {
      console.log('-- onLoad', object)
      scene.add(object)
    },
    (xhr) => {
      console.log('-- onProgress' + (xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error: any) => {
      console.log('-- onError', error)
    }
  )
})
</script>
