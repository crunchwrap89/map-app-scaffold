<script setup lang="ts">
import { useLoadingStore } from "@/stores/loading.store";
const store = useLoadingStore();
</script>
<template>
  <div class="map-loading-screen" id="map-loading-screen">
    <div class="map-loading-screen__middle">
      <div class="map-loading-screen__content-wrapper">
        <span class="map-loading-screen__text">
          {{ store.statusText }}
        </span>
        <progress id="objectLoad" :value="store.progress" max="100">
          {{ store.progress }}
        </progress>
      </div>
    </div>
  </div>
</template>
<style scoped>
.map-loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  background: var(--gradient-2);
  &__middle {
    width: 200px;
  }
  &__content-wrapper {
    display: flex;
    flex-direction: column;
  }
  &__text {
    text-align: center;
    padding: 4px;
  }
}
progress {
  width: 200px;
  border-radius: 4px;
  height: 22px;
  box-shadow: var(--box-shadow-1);
}
progress::-webkit-progress-bar {
  background-color: var(--cta-green);
  border-radius: 4px;
}
progress::-webkit-progress-value {
  background-color: var(--blue);
  border-radius: 4px;
  box-shadow: var(--box-shadow-2);
}
progress::-moz-progress-bar {
  background-color: var(--cta-green);
  border-radius: 4px;
}
progress::-moz-progress-value {
  background-color: var(--blue);
  border-radius: 4px;
  box-shadow: var(--box-shadow-2);
}
</style>
