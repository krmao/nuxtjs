<template>
  <TresCanvas window-size v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3] as any" />
    <OrbitControls />
    <Suspense>
      <!--suppress HtmlUnknownTag -->
      <primitive :object="meshWithMaterial" />
    </Suspense>
  </TresCanvas>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from '@tresjs/cientos';

const { BasicShadowMap, BoxGeometry, Mesh, MeshBasicMaterial, NoToneMapping, SRGBColorSpace } = THREE;

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping
};
const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshBasicMaterial({ color: '#fefefe' });
const meshWithMaterial = new Mesh(geometry, material);
</script>
