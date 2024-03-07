<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import SVGComponent from '@/components/SVG.vue';
import ContentLayout from '@/components/ContentLayout.vue';
import SVGDrag from '@/components/SVGDrag.vue';

import { getMoreWork, getOffAxisCircle, newCircles } from '@/helpers/apollonius';
import type { SVGConfig } from '@/components/SVG.vue';
import type { Work, Circle } from '@/helpers/apollonius';

const MAX_SLOPE = 10;
const MAX_RADIUS = 0.9;
const MIN_RADIUS = 0.1;

// I like things square (at least for now)
let svgWid = 700;
let svgHgt = 700;
let upLeft = -1.01;
let sqSize = -2 * upLeft;
let amConfiguring = true;
let bAnimate = false;

//const fmt = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 5 });

// classic circle packing start
const appClassic: Array<Circle> = [
  { x: 0, y: 0, b: -1 },
  { x: 0.5, y: 0, b: 2 },
  { x: -0.5, y: 0, b: 2 },
  { x: 0, y: 2 / 3, b: 3 },
  { x: 0, y: -2 / 3, b: 3 }
];
let classWork: Array<Work> = [
  { cir: 3, depth: 1, parents: [0, 1, 2] },
  { cir: 4, depth: 1, parents: [0, 1, 2] }
];

// i need to generate coordinates and radii to place circles...
// cx, cy, r, fill, stroke, stroke-width
// this is a bootstrapped array
let arrCir = ref<Array<Circle>>([
  { x: 0, y: 0, b: -1 },
  { x: 0.5, y: 0, b: 2 },
  { x: -0.5, y: 0, b: 2 },
  { x: 0, y: 2 / 3, b: 3 },
  { x: 0, y: -2 / 3, b: 3 }
]);

let work: Array<Work> = [
  { cir: 3, depth: 1, parents: [0, 1, 2] },
  { cir: 4, depth: 1, parents: [0, 1, 2] }
];
let buffCir: Array<Circle> = [];

///////////////////////////////////
// drag and drop control things
let hndX = ref<number>(0);
let hndY = ref<number>(0);

//
///////////////////////////////////

//////////////////////////////////////////
// Control
function onStep() {
  amConfiguring = false;
  work = getMoreWork(work, arrCir.value, maxBend.value);
  console.log(`new work: ${work.length}`);
}
function onReset() {
  console.log('Circles::onReset');
  bAnimate = false;
  amConfiguring = true;
  arrCir.value = [];
  appClassic.forEach((ele) => {
    arrCir.value.push(ele);
  });
  work = [];
  classWork.forEach((ele) => {
    work.push(ele);
  });
  hndX.value = 0;
  hndY.value = 0;
}
function onPrint() {
  // some day I would like to alter things so that I take advantage of the printer resolution...
  amConfiguring = false;
  window.print();
  return;
}
function animNext(): void {
  setTimeout(() => {
    if (buffCir.length > 0 && bAnimate) {
      const tmp = buffCir.shift();
      if (tmp) {
        arrCir.value.push(tmp);
        animNext();
      }
    }
  }, 300);
}
function onAnimate() {
  //onReset();
  amConfiguring = false;
  bAnimate = true;

  // need to do this with the current configurations
  buffCir = [];
  arrCir.value.forEach((ele) => {
    buffCir.push(ele);
  });
  arrCir.value = [];
  while (work.length > 0) {
    console.log('getWork');
    work = getMoreWork(work, buffCir, maxBend.value);
  }
  // buffCir is loaded, could sort according to size or position or....
  animNext();
  return;
}
function onAll() {
  amConfiguring = false;
  while (work.length > 0) {
    work = getMoreWork(work, arrCir.value, maxBend.value);
  }
}
//
///////////////////////////////////////////////

///////////////////////////////////////////////
// geometry
function onStart(): void {
  console.log('CirclesView::onStart');
  work = [];
  // why am i popping? These should be the top and bottom circles.
  //  not really needed to the dragging business
  arrCir.value.pop();
  arrCir.value.pop();
}
function onDrop(): void {
  console.log('CirclesView::onDrop');
  // the end of all dragging
  const ret = newCircles(arrCir.value[0], arrCir.value[1], arrCir.value[2]);
  // there is probably a 'clean code' way of doing
  // this puts back the circles we popped of at the beginning.
  arrCir.value.push(ret[0]);
  arrCir.value.push(ret[1]);
  work = [
    { cir: 3, depth: 1, parents: [0, 1, 2] },
    { cir: 4, depth: 1, parents: [0, 1, 2] }
  ];

  return;
}
function onSzDrag(curX: number, curY: number): void {
  // this seems redundant since it is recalculated in onAngleDrag,
  //    but the drag is much smoother with it.
  hndX.value = curX;
  hndY.value = curY;
  // the distance from curX, curY to arrCir[2] center
  // is equal to arrCir[2] center to -1, 0
  let xi = (curX * curX + curY * curY - 1) / (2 + 2 * curX);
  if (xi + 1 < MIN_RADIUS) {
    xi = MIN_RADIUS - 1;
  }
  if (xi + 1 > MAX_RADIUS) {
    xi = MAX_RADIUS - 1;
  }
  arrCir.value[2] = { x: xi, y: 0, b: 1 / (xi + 1) };

  // TEMP until i figure out where the onDrop is...
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

  // examine the math on this for simplifications (bend vs radius)
  // TODO: these should probably be get type functions
  //    This method seems better when dragging
  hndX.value =
    arrCir.value[2].x +
    ((1 / arrCir.value[2].b) * (arrCir.value[1].x - arrCir.value[2].x)) /
      (1 / arrCir.value[2].b + 1 / arrCir.value[1].b);
  hndY.value =
    arrCir.value[2].y +
    ((1 / arrCir.value[2].b) * (arrCir.value[1].y - arrCir.value[2].y)) /
      (1 / arrCir.value[2].b + 1 / arrCir.value[1].b);
}
//
///////////////////////////////////////////////

onBeforeMount(() => {
  console.log(`CirclesView::onBeforeMount`);
});

// in chrome the viewBox is an SVGAnimatedRect. That can be altered
// want a way to adjust the starting circle setup.
// the starting circles need to include lines
// sometime want to embed packing inside some arbitrary circle (think fractal like)
// animated progression? printing?

const showGeomCtrl = computed((): boolean => {
  return amConfiguring;
});
/*  get hndX(): number {
    return (
      arrCir[2].x +
      ((1 / arrCir[2].b) * (arrCir[1].x - arrCir[2].x)) /
        (1 / arrCir[2].b + 1 / arrCir[1].b)
    );
  }
  get hndY(): number {
    return (
      arrCir[2].y +
      ((1 / arrCir[2].b) * (arrCir[1].y - arrCir[2].y)) /
        (1 / arrCir[2].b + 1 / arrCir[1].b)
    );
  }*/
const maxBend = computed((): number => {
  return 1 / (strokeWid.value * 2);
});
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
  <ContentLayout>
    <template v-slot:title>
      <h2>Apollonian Circle Packing</h2>
    </template>
    <SVGComponent v-bind:param="SVGParam" svgid="apoll">
      <circle
        v-for="(c, idx) in arrCir"
        v-bind:key="idx"
        v-bind:cx="c.x"
        v-bind:cy="c.y"
        v-bind:r="Math.abs(1 / c.b)"
        v-bind:stroke-width="strokeWid"
      />
      <g v-if="showGeomCtrl">
        <!-- stuff to help DND configs visually, needs to disappear when not adjustment time -->
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
      </g>
    </SVGComponent>
    <template v-slot:side>
      <button v-on:click="onStep">Step</button><br />
      <button v-on:click="onAnimate">Animate</button><br />
      <button v-on:click="onAll">All</button><br />
      <button v-on:click="onReset">Reset</button><br />
      <button v-on:click="onPrint">Print</button><br />
    </template>
  </ContentLayout>
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
