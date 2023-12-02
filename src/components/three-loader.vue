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

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from '@tresjs/cientos'
// https://threejs.org/docs/#examples/en/loaders/OBJLoader
// import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
// import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'

const {
  BasicShadowMap,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  NoToneMapping,
  Scene,
  HemisphereLight,
  DirectionalLight,
  SRGBColorSpace
} = THREE

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
const directionalLight = new DirectionalLight('#ffffff', 7)
directionalLight.position.set(5, 5, 5)
scene.add(hemiLight)
scene.add(directionalLight)
// endregion

const objRootPath = 'http://localhost:3000/3d/'
const objLoader = new OBJLoader(undefined)

const loadCube = () => {
  const geometry = new BoxGeometry()
  const material = new MeshStandardMaterial({ color: '#0000ff' })
  const cube = new Mesh(geometry, material)
  cube.position.x = 0
  cube.position.y = 4
  cube.position.z = 0
  scene.add(cube)
}

const loadAir = () => {
  const mtlLoader = new MTLLoader(undefined)
  const meshDirPath = objRootPath + 'plane/'
  mtlLoader.setPath(meshDirPath)
  mtlLoader.setMaterialOptions({ invertTrProperty: true })
  mtlLoader.load(
    'E 45 Aircraft_obj.mtl',
    (materials) => {
      console.log('-- onLoad', materials)
      materials.preload()
      objLoader.setPath(meshDirPath)
      objLoader.setMaterials(materials)
      objLoader.load(
        'E 45 Aircraft_obj.obj',
        (object: any) => {
          console.log('-------- onLoad', object)
          const mesh = object
          mesh.scale.set(0.9, 0.9, 0.9)
          mesh.position.x = 0
          mesh.position.y = 0
          mesh.position.z = 0
          mesh.rotateX(0)
          mesh.rotateY(0)
          mesh.rotateZ(0)
          scene.add(mesh)
        },
        (xhr) => {
          console.log('-------- onProgress ' + (xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error: any) => {
          console.log('-------- onError', error)
        }
      )
    },
    (xhr) => {
      console.log('-- onProgress ' + (xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error: any) => {
      console.log('-- onError', error)
    }
  )
}

const loadCar = () => {
  const meshDirPath = objRootPath + 'car/'
  objLoader.setPath(meshDirPath)
  objLoader.load(
    'car.obj',
    (object: any) => {
      console.log('-------- onLoad', object)
      const mesh = object
      mesh.scale.set(0.9, 0.9, 0.9)
      mesh.position.x = 0
      mesh.position.y = -3
      mesh.position.z = 0
      mesh.rotateX(0)
      mesh.rotateY(0)
      mesh.rotateZ(0)

      // region 加载额外的皮肤或者纹理
      for (let i = 0; i < object.children.length; i++) {
        const carMesh = object.children[i]
        // 该皮肤文件夹路径
        const skinFolder = meshDirPath + 'skin01/'
        // 该皮肤文件夹下所有的纹理名称
        const skins = ['0000', '0000-a']
        // 加载该皮肤文件夹下所有的纹理
        const skinMaterials = skins.map((skin) => {
          const texture = new THREE.TextureLoader().load(`${skinFolder}${skin}.BMP`)
          return new THREE.MeshStandardMaterial({ map: texture })
        })
        // 设置使用该皮肤文件夹下第一个纹理
        carMesh.material = skinMaterials[0]
      }
      // endregion

      scene.add(mesh)
    },
    (xhr) => {
      console.log('-------- onProgress ' + (xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error: any) => {
      console.log('-------- onError', error)
    }
  )
}

loadCube()
loadAir()
loadCar()
</script>
