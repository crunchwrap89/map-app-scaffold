<script setup lang="ts">
import TheMap from "./components/TheMap.vue";
import LoadingScreen from "./components/LoadingScreen.vue";
</script>

<template>
  <div id="map-mount"></div>
  <Suspense>
    <template #default>
      <TheMap />
    </template>
    <template #fallback>
      <LoadingScreen />
    </template>
  </Suspense>
</template>

<style src="./assets/base.css"></style>
<style scoped>
#map-mount,
#map-loading-screen {
  position: absolute;
  height: auto;
  width: 100%;
  top: 0;
  bottom: 0;
  border: none;
  min-height: 100%;
  text-rendering: optimizeLegibility;
  user-select: none;
  touch-action: none;
  overflow: hidden;
}

#map-mount {
  z-index: 10;
}

#map-loading-screen {
  z-index: 30;
}
</style>
