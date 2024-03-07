<script setup lang="ts">
import { ref, computed, onBeforeMount, onMounted } from 'vue';
import SVGComponent from '@/components/SVG.vue';
import ContentLayout from '@/components/ContentLayout.vue';
import LinearGrid from '@/components/LinearGrid.vue';

import { gridList } from '@/helpers/GridBasics';
import type { SVGConfig } from '@/components/SVG.vue';
import type { Line, Grid, Extent } from '@/helpers/GridBasics';

const vwTop = ref<number>(-2);
const vwLft = ref<number>(-2);
let vwHgt = ref<number>(12);
let vwWid = ref<number>(12);
let svgWid = 700;
let svgHgt = 700;

const currentGrid = ref<Grid>(gridList['Hex']);
// need to have some smarts with each cell definition so that
//    each cell def knows something about how to draw itself

function onPrint(): void {
  return;
}
function onChgGrid(grid: Grid): void {
  currentGrid.value = grid;
}

function onZoom(data: { x: number; y: number; bIn: boolean }): void {
  //console.log(`onZoom ${data.x},${data.y} ${data.bIn}`);
  let zm = 1.1;
  if (data.bIn) {
    zm = 0.9;
  }
  // this zooms in centered on data.x, data.y
  vwTop.value = data.y - (data.y - vwTop.value) * zm;
  vwLft.value = data.x - (data.x - vwLft.value) * zm;

  vwHgt.value = vwHgt.value * zm;
  vwWid.value = vwWid.value * zm;
  return;
}
function onPan(dx: number, dy: number): void {
  //console.log(`Grids::onPan ${dx} ${dy}`);
  vwTop.value += dy;
  vwLft.value += dx;
  return;
}
function btnSVG(grid: Grid): SVGConfig {
  return {
    svgHgt: 100,
    svgWid: 100,
    vwTop: 0,
    vwLeft: 0,
    vwWidth: grid.cellLen() * 2,
    vwHeight: grid.cellLen() * 2
  };
}

onBeforeMount(() => {
  console.log(`GridsView::onBeforeMount`);
});
onMounted(() => {
  console.log(`GridsView::onBeforeMount`);
});
///////////////////////////////////////////////////////////////
// cell definitions, they should go into another file
//    this file is large with them in it.
const cellSH: Array<Line> = [
  { x1: -0.5, y1: 0.0, x2: 1, y2: 0 },
  { x1: -0.5, y1: 0.866, x2: 0.5, y2: 0.866 },
  { x1: -1.0, y1: 0, x2: -0.25, y2: 1.2991 },
  { x1: 0.75, y1: 0.433, x2: 0, y2: 1.7321 },
  { x1: 0.0, y1: 0, x2: -0.5, y2: 0.866 },
  { x1: 0.0, y1: 0, x2: 0.5, y2: 0.866 }
];
const cellSSq: Array<Line> = [
  { x1: 0, y1: -0.5, x2: 0, y2: 0.5 },
  { x1: -1, y1: 0.5, x2: -1.0, y2: 0 },
  { x1: 1, y1: -0.5, x2: 1.0, y2: 0 },
  { x1: -1.0, y1: -0.5, x2: 1.0, y2: -0.5 },
  { x1: -1.0, y1: 0.5, x2: 1.0, y2: 0.5 },
  { x1: -1.0, y1: 0.5, x2: -0.5, y2: 1.3661 },
  { x1: 1, y1: 0.5, x2: 0.5, y2: 1.3661 },
  { x1: 0, y1: 1.3661, x2: 0.5, y2: 1.3661 },
  { x1: 0, y1: 0.5, x2: 0.5, y2: 1.3661 },
  { x1: 0, y1: 0.5, x2: -0.5, y2: 1.3661 },
  { x1: -1.0, y1: -0.5, x2: -0.5, y2: -1.3661 },
  { x1: 1, y1: -0.5, x2: 0.5, y2: -1.3661 },
  { x1: -0.5, y1: -1.3661, x2: 0, y2: -1.3661 },
  { x1: 0, y1: -0.5, x2: 0.5, y2: -1.3661 },
  { x1: 0, y1: -0.5, x2: -0.5, y2: -1.3661 }
];
const cellSS: Array<Line> = [
  { x1: 0, y1: 0.5, x2: 0, y2: -0.5 },
  { x1: 0.866, y1: 0, x2: 0, y2: -0.5 },
  { x1: 0.866, y1: 0, x2: 0, y2: 0.5 },
  { x1: -0.866, y1: 0, x2: 0, y2: -0.5 },
  { x1: -0.866, y1: 0, x2: 0, y2: 0.5 }
];
const cellES: Array<Line> = [
  { x1: -0.5, y1: 0, x2: 0.5, y2: 0 },
  { x1: -0.5, y1: 1, x2: 0.5, y2: 1 },
  { x1: 0, y1: 0, x2: 0, y2: 1 },
  { x1: 0, y1: 1.0, x2: -0.5, y2: 1.866 },
  { x1: 0, y1: 1.0, x2: 0.5, y2: 1.866 }
];
const cellDodecSq2: Array<Line> = [
  { x1: 0.5, y1: 0.5, x2: -0.5, y2: 0.5 },
  { x1: -0.5, y1: 0.5, x2: -0.5, y2: -0.5 },
  { x1: -0.5, y1: -0.5, x2: 0.5, y2: -0.5 },
  { x1: 0.5, y1: -0.5, x2: 0.5, y2: 0.5 },
  { x1: 0.5, y1: 0.5, x2: 0, y2: 1.3661 },
  { x1: -0.5, y1: 0.5, x2: 0, y2: 1.3661 },
  { x1: 0.5, y1: -0.5, x2: 0, y2: -1.3661 },
  { x1: -0.5, y1: -0.5, x2: 0, y2: -1.3661 },
  { x1: 0.5, y1: 0.5, x2: 1.3661, y2: 1.0 },
  { x1: 0, y1: 1.3661, x2: 0.8661, y2: 1.8661 },
  { x1: 1.3661, y1: 1.0, x2: 0.8661, y2: 1.8661 },
  { x1: -0.5, y1: 0.5, x2: -1.3661, y2: 1.0 },
  { x1: 0, y1: 1.3661, x2: -0.8661, y2: 1.8661 },
  { x1: -1.3661, y1: 1.0, x2: -0.8661, y2: 1.8661 },
  { x1: 0.5, y1: -0.5, x2: 1.3661, y2: -1.0 },
  { x1: 0, y1: -1.3661, x2: 0.8661, y2: -1.8661 },
  { x1: 1.3661, y1: -1.0, x2: 0.8661, y2: -1.8661 },
  { x1: -0.5, y1: -0.5, x2: -1.3661, y2: -1.0 },
  { x1: 0.0, y1: -1.3661, x2: -0.8661, y2: -1.8661 },
  { x1: -1.3661, y1: -1.0, x2: -0.8661, y2: -1.8661 },
  { x1: 0.8661, y1: 1.8661, x2: 0.8661, y2: 2.3661 },
  { x1: -0.8661, y1: 1.8661, x2: -0.8661, y2: 2.3661 },
  { x1: 0.8661, y1: -1.8661, x2: 0.8661, y2: -2.3661 },
  { x1: -0.8661, y1: -1.8661, x2: -0.8661, y2: -2.3661 },
  { x1: 1.3661, y1: 1.0, x2: 2.2322, y2: 0.5 },
  { x1: 1.3661, y1: -1.0, x2: 2.2322, y2: -0.5 },
  { x1: 2.2322, y1: 0.5, x2: 2.2322, y2: -0.5 },
  { x1: -1.3661, y1: 1.0, x2: -2.2322, y2: 0.5 },
  { x1: -1.3661, y1: -1.0, x2: -2.2322, y2: -0.5 },
  { x1: -2.2322, y1: 0.5, x2: -2.2322, y2: -0.5 },
  { x1: 2.2322, y1: 0.5, x2: 2.7322, y2: 0.5 },
  { x1: 2.2322, y1: -0.5, x2: 2.7322, y2: -0.5 },
  { x1: -2.2322, y1: 0.5, x2: -2.7322, y2: 0.5 },
  { x1: -2.2322, y1: -0.5, x2: -2.7322, y2: -0.5 }
];
const cellDodecSq: Array<Line> = [
  { x1: 0.5, y1: 0.5, x2: -0.5, y2: 0.5 },
  { x1: -0.5, y1: 0.5, x2: -0.5, y2: -0.5 },
  { x1: -0.5, y1: -0.5, x2: 0.5, y2: -0.5 },
  { x1: 0.5, y1: -0.5, x2: 0.5, y2: 0.5 },
  { x1: 0.5, y1: 0.5, x2: 0, y2: 1.3661 },
  { x1: -0.5, y1: 0.5, x2: 0, y2: 1.3661 },
  { x1: 0.5, y1: -0.5, x2: 0, y2: -1.3661 },
  { x1: -0.5, y1: -0.5, x2: 0, y2: -1.3661 },
  { x1: 0.5, y1: 0.5, x2: 1.3661, y2: 0 },
  { x1: 0.5, y1: -0.5, x2: 1.3661, y2: 0 },
  { x1: -0.5, y1: 0.5, x2: -1.3661, y2: 0 },
  { x1: -0.5, y1: -0.5, x2: -1.3661, y2: 0 },
  { x1: 0.5, y1: 0.5, x2: 1.3661, y2: 1.0 },
  { x1: 0.0, y1: 1.3661, x2: 0.8661, y2: 1.8661 },
  { x1: 1.3661, y1: 1.0, x2: 0.8661, y2: 1.8661 },
  { x1: -0.5, y1: 0.5, x2: -1.0, y2: 1.3661 },
  { x1: -1.3661, y1: 0, x2: -1.8661, y2: 0.8661 },
  { x1: -1.0, y1: 1.3661, x2: -1.8661, y2: 0.8661 },
  { x1: -0.5, y1: -0.5, x2: -1.3661, y2: -1.0 },
  { x1: 0, y1: -1.3661, x2: -0.8661, y2: -1.8661 },
  { x1: -1.3661, y1: -1.0, x2: -0.8661, y2: -1.8661 },
  { x1: 0.5, y1: -0.5, x2: 1.0, y2: -1.3661 },
  { x1: 1.3661, y1: -0, x2: 1.8661, y2: -0.8661 },
  { x1: 1.0, y1: -1.3661, x2: 1.8661, y2: -0.8661 },
  { x1: 1.3661, y1: 0, x2: 1.3661, y2: 1 },
  { x1: 0, y1: 1.3661, x2: -1, y2: 1.3661 },
  { x1: -1.3661, y1: 0, x2: -1.3661, y2: -1 },
  { x1: 0, y1: -1.3661, x2: 1, y2: -1.3661 },
  { x1: 1.3661, y1: 1.0, x2: 1.8661, y2: 1.8661 },
  { x1: 0.8661, y1: 1.8661, x2: 1.8661, y2: 1.8661 },
  { x1: -1.0, y1: 1.3661, x2: -1.8661, y2: 1.8661 },
  { x1: -1.8661, y1: 0.8661, x2: -1.8661, y2: 1.8661 },
  { x1: -1.3661, y1: -1.0, x2: -1.8661, y2: -1.8661 },
  { x1: 1.0, y1: -1.3661, x2: 1.8661, y2: -1.8661 }
  // causes overlap
  //{x1:-.8661, y1:-1.8661, x2:-1.8661, y2:-1.8661},
  //{x1:1.8661, y1:-.8661, x2:1.8661, y2:-1.8661}
];
const cellBaseHexTriSq: Array<Line> = [
  { x1: 0, y1: 0, x2: 0, y2: 0.5 },
  { x1: 1.0, y1: 0, x2: 1.0, y2: 0.5 },
  { x1: -1.0, y1: 0, x2: -1.0, y2: 0.5 },
  { x1: -1.0, y1: 0.5, x2: 1.0, y2: 0.5 },
  { x1: 1.0, y1: 0.5, x2: 1.8661, y2: 1 },
  { x1: -1.0, y1: 0.5, x2: -1.8661, y2: 1 },
  { x1: -1.0, y1: 0.5, x2: -0.5, y2: 1.3661 },
  { x1: 1.0, y1: 0.5, x2: 0.5, y2: 1.3661 },
  { x1: 0, y1: 0.5, x2: 0.5, y2: 1.3661 },
  { x1: 0, y1: 0.5, x2: -0.5, y2: 1.3661 },
  { x1: -0.5, y1: 1.3661, x2: 0.5, y2: 1.3661 },
  { x1: -0.5, y1: 1.3661, x2: -0.5, y2: 2.3661 },
  { x1: 0.5, y1: 1.3661, x2: 0.5, y2: 2.3661 },
  { x1: -0.5, y1: 2.3661, x2: 0.5, y2: 2.3661 },
  { x1: -0.5, y1: 1.3661, x2: -1.3661, y2: 1.8661 },
  { x1: -0.5, y1: 2.3661, x2: -1.3661, y2: 1.8661 },
  { x1: 0.5, y1: 1.3661, x2: 1.3661, y2: 1.8661 },
  { x1: 0.5, y1: 2.3661, x2: 1.3661, y2: 1.8661 },
  { x1: -1.8661, y1: 1.0, x2: -1.3661, y2: 1.8661 },
  { x1: 1.8661, y1: 1.0, x2: 1.3661, y2: 1.8661 },
  { x1: -1.3661, y1: 1.8661, x2: -1.8661, y2: 1.8661 },
  { x1: -1.3661, y1: 1.8661, x2: -1.3661, y2: 2.8661 },
  { x1: -1.3661, y1: 2.8661, x2: -1.8661, y2: 2.8661 },
  { x1: 1.3661, y1: 1.8661, x2: 1.8661, y2: 1.8661 },
  { x1: 1.3661, y1: 1.8661, x2: 1.3661, y2: 2.8661 },
  { x1: 1.3661, y1: 2.8661, x2: 1.8661, y2: 2.8661 },
  { x1: -0.5, y1: 2.3661, x2: -1.3661, y2: 2.8661 },
  { x1: -0.5, y1: 2.3661, x2: 0, y2: 3.2322 },
  { x1: 0.5, y1: 2.3661, x2: 1.3661, y2: 2.8661 },
  { x1: 0.5, y1: 2.3661, x2: 0, y2: 3.2322 },
  { x1: 0, y1: 3.2322, x2: 0, y2: 3.7322 },
  { x1: 0, y1: 3.2322, x2: 0.8661, y2: 3.7322 },
  { x1: 0, y1: 3.2322, x2: -0.8661, y2: 3.7322 },
  { x1: 1.3661, y1: 2.8661, x2: 0.8661, y2: 3.7322 },
  { x1: -1.3661, y1: 2.8661, x2: -0.8661, y2: 3.7322 }
];
//<use xlink:href:#cellBaseHexTriSq"/>
//<use xlink:href:#cellBaseHexTriSq, transform:rotate(180)"/>
const cellDoDec4: Array<Line> = [
  { x1: 0.5, y1: 0.5, x2: -0.5, y2: 0.5 },
  { x1: -0.5, y1: 0.5, x2: -0.5, y2: -0.5 },
  { x1: -0.5, y1: -0.5, x2: 0.5, y2: -0.5 },
  { x1: 0.5, y1: -0.5, x2: 0.5, y2: 0.5 },
  { x1: 0.5, y1: 0.5, x2: 0.0, y2: 1.3661 },
  { x1: 0.0, y1: 1.3661, x2: -0.5, y2: 0.5 },
  { x1: -0.5, y1: 0.5, x2: -1.3661, y2: 0.0 },
  { x1: -1.3661, y1: 0, x2: -0.5, y2: -0.5 },
  { x1: -0.5, y1: -0.5, x2: 0.0, y2: -1.3661 },
  { x1: 0.0, y1: -1.3661, x2: 0.5, y2: -0.5 },
  { x1: 0.5, y1: -0.5, x2: 1.3661, y2: 0.0 },
  { x1: 1.3661, y1: 0.0, x2: 0.5, y2: 0.5 },
  { x1: 0.0, y1: 1.8661, x2: 0.0, y2: 1.3661 },
  { x1: 1.8661, y1: 0.0, x2: 1.3661, y2: 0.0 },
  { x1: 0.0, y1: -1.8661, x2: 0.0, y2: -1.3661 },
  { x1: -1.8661, y1: 0.0, x2: -1.3661, y2: 0.0 }
];

const SVGParam = computed((): SVGConfig => {
  return {
    svgHgt: svgHgt,
    svgWid: svgWid,
    vwTop: vwTop.value,
    vwLeft: vwLft.value,
    vwWidth: vwWid.value,
    vwHeight: vwHgt.value
  };
});
const strokeWid = computed(() => {
  return vwWid.value / svgWid;
});
const SVGExtent = computed((): Extent => {
  return {
    left: vwLft.value,
    right: vwLft.value + vwWid.value,
    top: vwTop.value + vwHgt.value,
    bottom: vwTop.value
  };
});
</script>

<template>
  <ContentLayout>
    <template v-slot:title>
      <h1>Regular Grids</h1>
    </template>
    <span>Scroll Wheel to zoom. Drag to pan.</span>
    <div class="gridcont">
      <!-- I could use a LinearGrid here. I chose not to so i would not need to 
            relay events to this level. -->
      <SVGComponent
        v-bind:param="SVGParam"
        v-bind:bZoom="true"
        v-bind:bPan="true"
        svgid="gridsvg"
        v-on:on-zoom="onZoom"
        v-on:on-pan="onPan"
      >
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
        <!--<circle x="0" y="0" r=".1" v-bind:stroke-width="strokeWid" />-->
      </SVGComponent>
    </div>
    <template v-slot:side>
      <!--<button v-on:click="onPrint">Print</button><br />-->
      <button
        v-for="grid in gridList"
        v-bind:key="grid.name()"
        v-on:click="onChgGrid(grid)"
        class="gridbtn"
      >
        <LinearGrid v-bind:svgparam="btnSVG(grid)" v-bind:gridname="grid.name()" />
      </button>
    </template>
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
.gridbtn {
  width: 7rem;
  height: 7rem;
  margin: 0.25rem;
  background-color: white;
}
</style>
