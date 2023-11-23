<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import {
  BasicShadowMap,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  NoToneMapping,
  ObjectLoader,
  Scene,
  SRGBColorSpace
} from 'three'
import { Vector3 } from 'three/src/math/Vector3'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
}
const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({ color: '#fefefe' })
// noinspection JSUnusedGlobalSymbols
// eslint-disable-next-line
const meshWithMaterial = new Mesh(geometry, material)
const scene = new Scene()
//
onMounted(() => {
  new ObjectLoader().load(
    'objs/P911GT/Porsche_911_GT2.obj',
    (object: any) => {
      console.log('---- ')
      scene.add(object.scene)
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error: any) => {
      console.log('An error happened', error)
    }
  )
})
</script>

<template>
  <TresCanvas window-size v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3] as Vector3" />
    <OrbitControls />
    <Suspense>
      <!--suppress HtmlUnknownTag -->
      <!--      <primitive :object="meshWithMaterial" />-->
      <primitive :object="scene" />
    </Suspense>
  </TresCanvas>
</template>
