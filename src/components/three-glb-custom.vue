<template>
  <div id="demo" />
  <load-progress v-model="percentage" :text="loadingText" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import LoadProgress from '@components/LoadProgress.vue'

// const timer = ref(null)
// 加载相关
const percentage = ref(0)
const loadingText = ref('加载中...')
const objRootPath = 'http://localhost:3000/3D/'

const init = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = false
  document.getElementById('demo').appendChild(renderer.domElement)
  const fov = 20 // 视野范围
  const aspect = 2 // 相机默认值 画布的宽高比
  const near = 0.1 // 近平面
  const far = 80 // 远平面
  // 透视投影相机
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(5.338, 6.985, 14.76)
  // 控制相机
  const arr = [0.25, 0.03, -0.2]
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(...arr)
  controls.update()
  // 场景
  const scene = new THREE.Scene()

  {
    const rgbeLoader = new RGBELoader()
    rgbeLoader.setPath(objRootPath)
    rgbeLoader.loadAsync('model/time_hdr.hdr').then((texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping
      scene.environment = texture
    })
  }

  // 点坐标
  const pointsGeometry = new THREE.BufferGeometry()
  pointsGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(arr), 3))
  const pointsMaterial = new THREE.PointsMaterial({
    color: '#FF00FF',
    transparent: true, // 开启透明度
    depthWrite: false, // 禁用深度写入
    size: 0.03, // 点大小
    sizeAttenuation: true // 大小是否随相机深度衰减
  })
  scene.add(new THREE.Points(pointsGeometry, pointsMaterial))

  // 坐标轴 辅助
  const axes = new THREE.AxesHelper(7)
  scene.add(axes)

  {
    // 环境光
    const light = new THREE.AmbientLight(0xdad5b7, 2)
    scene.add(light)
  }

  {
    const directionalLight = new THREE.DirectionalLight(0xdad5b7, 1)
    directionalLight.position.set(0, 6, 0)
    scene.add(directionalLight)
  }

  {
    const light = new THREE.PointLight(0xdad5b7, 1, 40)
    light.position.set(5, 3, 5)
    scene.add(light)
  }

  const textLoader = new THREE.TextureLoader()
  textLoader.setPath(objRootPath)

  // const texture = textLoader.load("model/z1.png");
  // texture.rotation = Math.PI / 2;
  // texture.repeat.set(1, 1);

  const glbLoader = new GLTFLoader()
  glbLoader.setPath(objRootPath)
  glbLoader.load('model/mesh.glb', (obj) => {
    // console.log(obj.scene);
    obj.scene.position.set(0, 0.02, 0)
    // obj.scene.traverse(child => {
    //   if (/^立方体0/g.test(child.name)) {
    //     // console.log(child);
    //     child.material = new THREE.MeshBasicMaterial({
    //       color: 0xa2caf3,
    //       map: texture
    //     });
    //   }
    // });
    scene.add(obj.scene)
  })

  glbLoader.load('model/pcs.glb', (obj) => {
    scene.add(obj.scene)
  })

  glbLoader.load('model/cabinet.glb', (obj) => {
    const g230 = obj.scene.clone()
    scene.add(g230)
  })

  glbLoader.load('model/car.glb', (obj) => {
    for (let i = 1; i <= 19; i += 1) {
      const car = obj.scene.clone()
      car.position.x = 0.125 * (i - 7)
      car.position.y = 0.02
      scene.add(car)
    }
  })

  {
    const loader = new FontLoader()
    loader.setPath(objRootPath)
    loader.load('model/font.json', (font) => {
      const group = new THREE.Group()
      group.position.y = 0.25
      const textGeo = new TextGeometry('逆变器', {
        font,
        size: 0.048,
        height: 0.0012,
        curveSegments: 12,
        bevelThickness: 0.00048,
        bevelSize: 0.0012,
        bevelEnabled: true
      })

      textGeo.computeBoundingBox()
      const boundingBox = textGeo.boundingBox
      const centerOffset = boundingBox?.max && boundingBox.min ? -0.5 * (boundingBox.max.x - boundingBox.min.x) : 0
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
      const mesh = new THREE.Mesh(textGeo, textMaterial)
      mesh.position.x = centerOffset
      mesh.position.y = 0.04
      group.add(mesh)

      const geometry = new THREE.BoxGeometry(0.33, 0.24, 0.01, 1, 1, 1)
      const material = new THREE.MeshBasicMaterial({
        map: textLoader.load('model/sprite_icon.png'),
        transparent: true
      })
      const icon = new THREE.Mesh(geometry, material)
      group.add(icon)
      scene.add(group)
    })
  }

  THREE.DefaultLoadingManager.onProgress = (_url, loaded, total) => {
    percentage.value = +((loaded / total) * 100).toFixed(2)
    loadingText.value = '加载模型中'
    if (percentage.value >= 100) {
      setTimeout(() => {
        translateCamera({ x: 3.75, y: 2.46, z: 5.63 }, { x: 0.25, y: 0.03, z: -0.2 }, 0)
        translateCamera({ x: 2.689, y: 0.6096, z: -1.173 }, { x: 1.15, y: 0.03, z: 0.2 }, 2)
        translateCamera({ x: 1.15, y: 0.2317, z: 0.863 }, { x: 1.15, y: 0.03, z: 0.2 }, 2)
        translateCamera({ x: 0.65, y: 0.2317, z: 0.863 }, { x: 0.65, y: 0.03, z: 0.2 }, 2)
        translateCamera({ x: -1.49, y: 0.8345, z: 2.351 }, { x: -0.35, y: 0.03, z: 0.2 }, 2)
      }, 1000)
    }
  }

  const timeLine1 = gsap.timeline()
  const timeline2 = gsap.timeline()

  function translateCamera(position, target, delay) {
    timeLine1.to(camera.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration: 2,
      delay,
      ease: 'power2.inOut'
    })
    timeline2.to(controls.target, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 2,
      delay,
      ease: 'power2.inOut'
    })
  }

  // setTimeout(() => {
  //   gsap.to(texture.offset, {
  //     x: -1,
  //     duration: 4,
  //     repeat: -1,
  //     ease: "none"
  //   });
  // }, 5000);

  // timer.value = setInterval(() => {
  //   console.log(camera.position);
  // }, 5000);

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  function render() {
    renderer.render(scene, camera)
    controls.update()
    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  // timer.value && clearInterval(timer.value)
  window.removeEventListener('resize', null)
})
</script>

<style lang="scss" scoped>
#demo {
  width: 100vw;
  height: 100vh;
}
</style>
