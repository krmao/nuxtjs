<template>
  <TresCanvas window-size clear-color="#82dbc5">
    <OrbitControls />
    <TresMesh ref="boxRef">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>
