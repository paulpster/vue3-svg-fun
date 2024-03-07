<script setup lang="ts">
////////////////////////////////////////////////
// HTML5 drag and drop does not work with SVG //
////////////////////////////////////////////////
//  looking at:
// https://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/
// (x,y) , then it will have coordinates on screen of (ax+e,dy+f)
// screen to SVG (Sx-e)/a,(Sy-f)/d
//
// https://vuejsexamples.com/
//
import { computed, ref } from 'vue';
import SVGComponent from '@/components/SVG.vue';
import type { SVGConfig } from '@/components/SVG.vue';
import SVGDrag from '@/components/SVGDrag.vue';
import { getOffAxisCircle, newCircles } from '@/helpers/apollonius';
import type { Circle } from '@/helpers/apollonius';

// i would like to have a resizeable SVG component
//  zoom and panning would be nice
const MAX_SLOPE = 10;
const MAX_RADIUS = 0.9;
const MIN_RADIUS = 0.1;

let svgWid = 700;
let svgHgt = 700;
let upLeft = -1.01;
let sqSize = -2 * upLeft;

let hndX = ref<number>(0);
let hndY = ref<number>(0);
//let angX = 0;
//let angY = 0;

// this is a bootstrapped array
const arrCir = ref<Array<Circle>>([
  { x: 0, y: 0, b: -1 },
  { x: 0.5, y: 0, b: 2 },
  { x: -0.5, y: 0, b: 2 },
  { x: 0, y: 2 / 3, b: 3 },
  { x: 0, y: -2 / 3, b: 3 }
]);

//let work: Array<Work> = [
//  { cir: 3, depth: 1, parents: [0, 1, 2] },
//  { cir: 4, depth: 1, parents: [0, 1, 2] }
//];

function onStart(): void {
  //work = [];
  arrCir.value.pop();
  arrCir.value.pop();
}
function onDrop(): void {
  console.log('onDrop');
  // the end of all dragging
  const ret = newCircles(arrCir.value[0], arrCir.value[1], arrCir.value[2]);
  // there is probably a 'clean code' way of doing
  arrCir.value.push(ret[0]);
  arrCir.value.push(ret[1]);
  //work = [
  //  { cir: 3, depth: 1, parents: [0, 1, 2] },
  //  { cir: 4, depth: 1, parents: [0, 1, 2] }
  //];

  return;
}
/*function onDragOver(): void {
  console.log('onDragOver');
  // prevent default
  return;
}*/
function onSzDrag(curX: number, curY: number): void {
  //console.log(`TestBed::onSzDrag ${curX},${curY}`);
  hndX.value = curX;
  hndY.value = curY;
  let xi = (curX * curX + curY * curY - 1) / (2 + 2 * curX);
  //console.log(`dist: ${xi} ${curX} ${curY}`);
  if (xi + 1 < MIN_RADIUS) {
    xi = MIN_RADIUS - 1;
  }
  if (xi + 1 > MAX_RADIUS) {
    xi = MAX_RADIUS - 1;
  }
  arrCir.value[2] = { x: xi, y: 0, b: 1 / (xi + 1) };

  //console.log(
  //  `onSzDrag: ${arrCir[2].x} ${arrCir[2].y} ${arrCir[2].b}`
  //);
  onAngleDrag(arrCir.value[1].x, arrCir.value[1].y);
}
function onAngleDrag(curX: number, curY: number): void {
  const slope = (arrCir.value[2].y - curY) / (arrCir.value[2].x - curX);

  // limit the angle....
  if (Math.abs(slope) > MAX_SLOPE) {
    curX = arrCir.value[2].x - (arrCir.value[2].y - curY) / (Math.sign(slope) * MAX_SLOPE);
  }
  arrCir.value[1] = getOffAxisCircle(arrCir.value[2], {
    x: curX,
    y: curY,
    b: 0
  });
  //angX = curX;
  //angY = curY;
  // examine the math on this for simplifications (bend vs radius)
  // TODO: these should probably be get type functions
  hndX.value =
    arrCir.value[2].x +
    ((1 / arrCir.value[2].b) * (arrCir.value[1].x - arrCir.value[2].x)) /
      (1 / arrCir.value[2].b + 1 / arrCir.value[1].b);
  hndY.value =
    arrCir.value[2].y +
    ((1 / arrCir.value[2].b) * (arrCir.value[1].y - arrCir.value[2].y)) /
      (1 / arrCir.value[2].b + 1 / arrCir.value[1].b);
  //console.log(`onAngleDrag ${hndX} ${hndY}`);
}

// computed
const strokeWid = computed((): number => {
  return sqSize / svgWid;
});
const SVGParam = computed((): SVGConfig => {
  return {
    svgHgt: svgHgt,
    svgWid: svgWid,
    vwTop: upLeft,
    vwLeft: upLeft,
    vwWidth: sqSize,
    vwHeight: sqSize
  };
});
</script>

<template>
  <div>
    <h2>Test Bed</h2>
    <div style="display: flex">
      <div>
        <SVGComponent v-bind:param="SVGParam" svgid="svgtest">
          <circle
            v-for="(c, idx) in arrCir"
            v-bind:key="idx"
            v-bind:cx="c.x"
            v-bind:cy="c.y"
            v-bind:r="Math.abs(1 / c.b)"
            v-bind:stroke-width="strokeWid"
          />

          <!-- stuff to help DND configs visually, needs to disappear when not adjustment time -->
          <circle
            class="mark"
            cx="0.9"
            cy="0.9"
            v-bind:r="2 * strokeWid"
            v-bind:stroke-width="strokeWid"
          />
          <circle
            class="mark"
            v-bind:cx="arrCir[2].x"
            v-bind:cy="arrCir[2].y"
            v-bind:r="2 * strokeWid"
            v-bind:stroke-width="strokeWid"
          />
          <circle
            class="mark"
            v-bind:cx="arrCir[1].x"
            v-bind:cy="arrCir[1].y"
            v-bind:r="2 * strokeWid"
            v-bind:stroke-width="strokeWid"
          />
          <line
            v-bind:x1="arrCir[2].x"
            v-bind:y1="arrCir[2].y"
            v-bind:x2="arrCir[1].x"
            v-bind:y2="arrCir[1].y"
            v-bind:stroke-width="strokeWid"
          />

          <SVGDrag
            name="size"
            v-on:on-begin-drag="onStart"
            v-on:on-drop="onDrop"
            v-on:on-dragging="onSzDrag"
          >
            <circle
              class="handle"
              v-bind:cx="hndX"
              v-bind:cy="hndY"
              v-bind:r="5 * strokeWid"
              v-bind:stroke-width="strokeWid"
            />
          </SVGDrag>
          <SVGDrag
            name="angle"
            v-on:on-begin-drag="onStart"
            v-on:on-drop="onDrop"
            v-on:on-dragging="onAngleDrag"
          >
            <circle
              class="handle"
              v-bind:cx="arrCir[1].x"
              v-bind:cy="arrCir[1].y"
              v-bind:r="5 * strokeWid"
              v-bind:stroke-width="strokeWid"
            />
          </SVGDrag>
        </SVGComponent>
      </div>
    </div>
  </div>
</template>

<style scoped>
svg circle {
  fill: none;
  stroke: #000;
}
svg line {
  stroke: #000;
}
svg .handle {
  fill: red;
  stroke: red;
}
svg .mark {
  fill: black;
  stroke: black;
}
.svgdrag {
  cursor: move;
}
</style>
