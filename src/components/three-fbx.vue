<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { FBXLoader } from 'three-stdlib'

import * as THREE from 'three'
// https://threejs.org/docs/#examples/en/loaders/OBJLoader

const { BasicShadowMap, NoToneMapping, Scene, HemisphereLight, DirectionalLight, PointLight, SRGBColorSpace } = THREE

// 画布
const gl = {
  clearColor: 'lightblue',
  shadows: false,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
}

// 场景
const scene = new Scene()

// region 光源
// https://stackoverflow.com/a/46005647/4348530
const hemiLight = new HemisphereLight('#ffffff', '#ffffff', 1)
const directionalLight = new DirectionalLight('#ffffff', 1)
const pointLight = new PointLight('#ffffff', 7)
pointLight.position.set(5, 5, 5)
directionalLight.position.set(5, 5, 5)
scene.add(hemiLight)
scene.add(directionalLight)
scene.add(pointLight)
// endregion
//
const objRootPath = 'http://localhost:3000/3d/'
const loader = new FBXLoader(undefined)
loader.setPath(objRootPath)
loader.load(
  'ship/ship.fbx',
  (object) => {
    console.log('-- onLoad', object)
    const mesh = object
    mesh.scale.set(0.005, 0.005, 0.005)
    mesh.position.x = 0
    mesh.position.y = 2
    mesh.position.z = 0
    mesh.rotateX(0)
    mesh.rotateY(0)
    mesh.rotateZ(0)
    scene.add(mesh)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.error('Error loading FBX model', error)
  }
)
loader.load(
  'plane/E 45 Aircraft_fbx.7.4_binary.fbx',
  (object) => {
    console.log('-- onLoad', object)
    const mesh = object
    mesh.scale.set(1, 1, 1)
    mesh.position.x = 0
    mesh.position.y = -2
    mesh.position.z = 0
    mesh.rotateX(0)
    mesh.rotateY(0)
    mesh.rotateZ(0)
    scene.add(mesh)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.error('Error loading FBX model', error)
  }
)
loader.load(
  'building/building.fbx',
  (object) => {
    console.log('-- onLoad', object)
    const mesh = object
    mesh.scale.set(0.005, 0.005, 0.005)
    mesh.position.x = 0
    mesh.position.y = 4
    mesh.position.z = 0
    mesh.rotateX(0)
    mesh.rotateY(0)
    mesh.rotateZ(0)
    scene.add(mesh)
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
  },
  (error) => {
    console.error('Error loading FBX model', error)
  }
)
</script>
<template>
  <TresCanvas window-size v-bind="gl">
    <TresPerspectiveCamera :position="[9, 9, 9] as any" />
    <OrbitControls />
    <Suspense>
      <!--suppress HtmlUnknownTag-->
      <primitive :object="scene" />
    </Suspense>
  </TresCanvas>
</template>
