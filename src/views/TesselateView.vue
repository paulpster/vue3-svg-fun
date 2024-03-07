<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue';
//import SVGComponent from '@/components/SVG.vue';
import ContentLayout from '@/components/ContentLayout.vue';

onBeforeMount(() => {
  console.log(`GridsView::onBeforeMount`);
});
onMounted(() => {
  console.log(`GridsView::onBeforeMount`);
});
</script>

<template>
  <ContentLayout>
    <template v-slot:title>
      <h2>Tesselations</h2>
    </template>
    <div>Super cool stuff</div>
    <template v-slot:side> Joy </template>
  </ContentLayout>
</template>

<style scoped>
.gridcont {
  padding: 0.5rem;
  border: black 1px solid;
}
line {
  stroke: black;
  fill: none;
}
use {
  stroke: black;
}
/*.gridbtn {
    width: 7rem;
    height: 7rem;
  }*/
</style>
