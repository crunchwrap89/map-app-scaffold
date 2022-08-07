<script setup lang="ts">
import { useInitMap } from "@/composables/useInitMap";
import { tilesLoaded } from "@/utils/miscUtils";

const { initMap } = useInitMap();
const map = await initMap();
await tilesLoaded(map);
</script>

<template><div></div></template>
