<template>
  <TresCanvas window-size v-bind="gl">
    <TresPerspectiveCamera :position="[9, 9, 9] as any" />
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
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'

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

onMounted(() => {
  const mtlLoader = new MTLLoader()
  mtlLoader.setPath('http://localhost:3000/objs/jeep/')
  mtlLoader.setMaterialOptions({ invertTrProperty: true })
  mtlLoader.load(
    'jeep.mtl',
    (materials) => {
      console.log('-- onLoad', materials)

      materials.preload()

      const objLoader = new OBJLoader()
      objLoader.setPath('http://localhost:3000/objs/jeep/')
      objLoader.setMaterials(materials)
      objLoader.load(
        'jeep.obj',
        (object: any) => {
          console.log('-------- onLoad', object)
          const mesh = object
          mesh.scale.set(0.5, 0.5, 0.5)
          // mesh.position.y = -1
          // mesh.rotateX(-Math.PI / 2)
          scene.add(mesh)
        },
        (xhr) => {
          console.log('-------- onProgress ' + (xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error: any) => {
          console.log('-------- onError', error)
        }
      )
      objLoader.setMaterials(materials)
    },
    (xhr) => {
      console.log('-- onProgress ' + (xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error: any) => {
      console.log('-- onError', error)
    }
  )
})
</script>
