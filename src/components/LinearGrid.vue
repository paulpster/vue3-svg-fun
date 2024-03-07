<script setup lang="ts">
import { computed, withDefaults, onMounted } from 'vue';
import SVGComponent from '@/components/SVG.vue';
import type { SVGConfig } from '@/components/SVG.vue';

import type { Grid, tGridNames, Extent } from '@/helpers/GridBasics';
import { gridList } from '@/helpers/GridBasics';
//import { type Base, oList, type Extent } from '@/helpers/testing';

const props = withDefaults(
  defineProps<{
    svgparam: SVGConfig;
    bZoom?: boolean;
    bPan?: boolean;
    gridname: tGridNames;
  }>(),
  { bZoom: false, bPan: false }
);

onMounted((): void => {
  //console.log(`LinearGrid::onMounted ${props.bZoom} ${props.bPan} ${props.gridname}`);
});

const currentGrid = computed<Grid>((): Grid => {
  return gridList[props.gridname];
});
const strokeWid = computed<number>((): number => {
  return props.svgparam.vwWidth / props.svgparam.svgWid;
});
const SVGExtent = computed<Extent>((): Extent => {
  return {
    left: props.svgparam.vwLeft,
    right: props.svgparam.vwLeft + props.svgparam.vwWidth,
    top: props.svgparam.vwTop + props.svgparam.vwHeight,
    bottom: props.svgparam.vwTop
  };
});
</script>

<template>
  <div class="svgcont">
    <SVGComponent v-bind:param="svgparam" v-bind:svgid="'svg' + currentGrid.name()">
      <defs>
        <g v-bind:id="currentGrid.name()">
          <line
            v-for="(l, idx) in currentGrid.base()"
            v-bind:key="idx"
            v-bind:x1="l.x1"
            v-bind:y1="l.y1"
            v-bind:x2="l.x2"
            v-bind:y2="l.y2"
            v-bind:stroke-width="strokeWid"
          />
        </g>
      </defs>
      <use
        v-for="(l, idx) in currentGrid.plot(SVGExtent)"
        v-bind:key="idx"
        v-bind:x="l.x"
        v-bind:y="l.y"
        v-bind:transform="l.trans"
        v-bind:href="l.href"
      />
      <!--<circle x="0" y="0" r=".2" v-bind:stroke-width="strokeWid" />-->
    </SVGComponent>
  </div>
</template>

<style scoped>
line {
  stroke: black;
  fill: none;
}
use {
  stroke: black;
}
</style>
