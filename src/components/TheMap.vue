<script setup lang="ts">
import { initMap } from "@/utils/mapUtils";
import { tilesLoaded } from "@/utils/mapUtils";

const map = await initMap("map-mount");
await tilesLoaded(map);
</script>

<template><div></div></template>
