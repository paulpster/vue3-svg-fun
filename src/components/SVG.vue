<script setup lang="ts">
/*
    // the keydown events do not seem to fire on the SVG element
    v-on:keydown.ctrl="onCtrl"
    v-on:keydown.shift="onShift"
    v-on:keydown.alt="onAlt"
    v-on:keyup.ctrl="onCtrlUp"
    v-on:keyup.shift="onShiftUp"
    v-on:keyup.alt="onAltUp"

    v-on:wheel="onWheel"
    v-on:mousedown="onPanStart"
    v-on:mouseup="onPanEnd"
    v-on:mousemove="onPan"
*/
export type SVGConfig = {
  svgWid: number;
  svgHgt: number;
  vwLeft: number;
  vwTop: number;
  vwWidth: number;
  vwHeight: number;
};

import { withDefaults, computed, onUnmounted, onBeforeMount, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    svgid: string;
    param: SVGConfig;
    bZoom?: boolean;
    bPan?: boolean;
  }>(),
  { bZoom: false, bPan: false }
);

const emit = defineEmits<{
  'on-pan': [dx: number, dy: number];
  'on-zoom': [{ x: number; y: number; bIn: boolean }];
}>();

const mainsvg = ref<SVGSVGElement | null>(null);
let panStartX = 0;
let panStartY = 0;
let bPanning = false;
let bCtrl = false;
let bShift = false;
let bAlt = false;

// use wheel event for zooming, I will want to know what the cursor position is.
function onWheel(evt: WheelEvent): void {
  // my event coordinate evt.clientX, evt.clientY.
  // evt.deltaY is the only thing that changes push the wheel up is negative, pull down is positive
  // pull will be shrink, push will be grow (this is how it works on a chrome web page)
  evt.preventDefault();
  if (bShift) {
    // go up-down
    emit('on-pan', 0, evt.deltaY > 0 ? -0.05 * props.param.vwHeight : 0.05 * props.param.vwHeight);
  }
  if (bCtrl) {
    // go left-right
    emit('on-pan', evt.deltaY > 0 ? -0.05 * props.param.vwWidth : 0.05 * props.param.vwWidth, 0);
  }
  //console.log(`Wheel: ${evt.clientX}, ${evt.clientY} ${evt.deltaY}`);
  // testing has determined that c is the <svg> element
  if (!mainsvg.value) {
    return;
  }
  const ctm = mainsvg.value.getScreenCTM();
  if (!ctm) {
    return;
  }
  //console.log(`CTM ${ctm.a} ${ctm.d} ${ctm.e} ${ctm.f}`);
  // i think i need to take into account the current location of the element....
  const offsX = (evt.clientX - ctm.e) / ctm.a;
  const offsY = (evt.clientY - ctm.f) / ctm.d;

  // this is the 'no key pressed' version of things
  emit('on-zoom', { x: offsX, y: offsY, bIn: evt.deltaY < 0 });
  return;
}

function onPanStart(evt: MouseEvent): void {
  evt.preventDefault();
  if (!mainsvg.value) {
    return;
  }
  const ctm = mainsvg.value.getScreenCTM();
  if (!ctm) {
    return;
  }
  //console.log('onPanStart');
  panStartX = (evt.clientX - ctm.e) / ctm.a;
  panStartY = (evt.clientY - ctm.f) / ctm.d;
  bPanning = true;
  return;
}
function onPan(evt: MouseEvent): void {
  if (!bPanning) {
    return;
  }
  evt.preventDefault();

  if (!mainsvg.value) {
    return;
  }
  const ctm = mainsvg.value.getScreenCTM();
  if (!ctm) {
    return;
  }
  const locX = (evt.clientX - ctm.e) / ctm.a;
  const locY = (evt.clientY - ctm.f) / ctm.d;
  emit('on-pan', panStartX - locX, panStartY - locY);
  return;
}
function onPanEnd(evt: MouseEvent): void {
  //console.log('onPanEnd');
  evt.preventDefault();
  bPanning = false;
  return;
}

function onKeyDown(evt: KeyboardEvent): void {
  console.log(`onKeyDown: ${evt.code}`);
  if (evt.code == 'alt' || evt.altKey) {
    onAlt();
  } else if (evt.code == 'shift' || evt.shiftKey) {
    onShift();
  } else if (evt.code == 'ctrl' || evt.ctrlKey) {
    onCtrl();
  }
  return;
}
function onKeyUp(evt: KeyboardEvent): void {
  console.log(`onKeyUp: ${evt.code}`);
  if (evt.code == 'keyCode.alt' || evt.altKey) {
    onAltUp();
  } else if (evt.code == 'keyCode.shift' || evt.shiftKey) {
    onShiftUp();
  } else if (evt.code == 'keyCode.ctrl' || evt.ctrlKey) {
    onCtrlUp();
  }
  return;
}

// these could be inlined some time, if they do not grow...
function onCtrl(): void {
  console.log('onCtrl');
  bCtrl = true;
  return;
}
function onShift(): void {
  bShift = true;
  return;
}
function onAlt(): void {
  bAlt = true;
  return;
}
function onCtrlUp(): void {
  console.log('onCtrlUp');
  bCtrl = false;
  return;
}
function onShiftUp(): void {
  bShift = false;
  return;
}
function onAltUp(): void {
  bAlt = false;
  return;
}
//////////////////////////////////////////
// lifecycle things....
onBeforeMount(() => {
  //console.log(`SVGComponent::beforeMount ${props.svgid} ${props.bZoom} ${props.bPan}`);
});
onMounted(() => {
  console.log(`SVGComponent::mounted ${props.svgid} ${props.bPan} ${props.bZoom}`);
  if (props.svgid.length > 0 && (props.bPan || props.bZoom)) {
    if (mainsvg.value && props.bZoom) {
      mainsvg.value.addEventListener('wheel', onWheel);
    }
    if (mainsvg.value && props.bPan) {
      mainsvg.value.addEventListener('mousedown', onPanStart);
      mainsvg.value.addEventListener('mouseup', onPanEnd);
      mainsvg.value.addEventListener('mousemove', onPan);
    }
  }
});
onUnmounted(() => {
  if (props.svgid.length > 0 && (props.bPan || props.bZoom)) {
    if (mainsvg.value && props.bZoom) {
      mainsvg.value.removeEventListener('wheel', onWheel);
    }
    if (mainsvg.value && props.bPan) {
      mainsvg.value.removeEventListener('mousedown', onPanStart);
      mainsvg.value.removeEventListener('mouseup', onPanEnd);
      mainsvg.value.removeEventListener('mousemove', onPan);
    }
  }
});

/////////////////////////////
// computed
const vwBox = computed((): string => {
  return `${props.param.vwLeft} ${props.param.vwTop} ${props.param.vwWidth} ${props.param.vwHeight}`;
});
</script>

<template>
  <svg
    v-bind:id="svgid"
    ref="mainsvg"
    xmlns="http://www.w3.org/2000/svg"
    v-bind:width="param.svgWid"
    v-bind:height="param.svgHgt"
    v-bind:viewBox="vwBox"
    v-on:keydown="onKeyDown"
    v-on:keyup="onKeyUp"
  >
    <slot></slot>
  </svg>
</template>
