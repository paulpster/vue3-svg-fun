<script setup lang="ts">
// want a generic SVG dragger.
// I will need to hook into the parent SVG element to add and remove some event listeners
// perhaps wish to add a drag over concept at some point.
//
// events:
//    on-begin-drag: element offset (svg coord)
//    on-drop
//    on-dragging: svg location
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{ name: string }>();
const myself = ref<SVGElement | null>(null);
const emit = defineEmits<{
  'on-begin-drag': [x: number, y: number];
  'on-drop': [];
  'on-dragging': [x: number, y: number];
}>();

let amDragging = false;
let offsX = 0;
let offsY = 0;

/**
 * This is only working when the curson stays with in our little 'handle'
 * I need to change things so that I cam listening to the whole canvas maybe.
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onDragStart(ev: MouseEvent): void {
  if (ev.target) {
    ev.preventDefault();
    const c: SVGGElement = ev.currentTarget as SVGGElement;
    if (c.classList.contains('svgdrag')) {
      amDragging = true;

      // https://www.w3.org/TR/SVGTiny12/coords.html#TransformMatrixDefined
      //  x_screen = a*x_svg + c*y_svg + e
      //  y_screen = b*x_svg + d*y_svg + f
      const ctm = c.getScreenCTM();
      if (ctm) {
        //console.log(`CTM ${ctm.a} ${ctm.d} ${ctm.e} ${ctm.f}`);
        // i think i need to take into account the current location of the element....
        offsX = (ev.clientX - ctm.e) / ctm.a;
        offsY = (ev.clientY - ctm.f) / ctm.d;
      }
      console.log(
        `SVGDrag::onDragStart ${props.name} ${offsX}, ${offsY} evt:${ev.clientX}, ${ev.clientY}`
      );
      // drag begin stuff
      // this is the offset on the clicked element, what is the position on the canvas?
      emit('on-begin-drag', offsX, offsY);
    }
  }
  return;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onDragEnd(ev: MouseEvent): void {
  if (amDragging && ev.target) {
    console.log(`SVGDrag::onDragEnd ${props.name}`);
    ev.preventDefault();
    amDragging = false;
    emit('on-drop');
  }
  return;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onDrag(ev: MouseEvent): void {
  if (amDragging && ev.target) {
    ev.preventDefault;
    console.log(`SVGDrag::onDrag ${props.name}`);
    const c: SVGGElement = ev.currentTarget as SVGGElement;
    const ctm = c.getScreenCTM();
    if (ctm) {
      // really want a call back of some kind where i give it where the pointer is
      //    and i get returned where i want the resulting SVG coord to be.
      //    This will allow me to constrain movements to a line or box or arc or...

      // this only appears to work well with small objects, with big objects there
      //    is a big jump to align things. need to fix that sometime TODO
      emit(
        'on-dragging',
        (ev.clientX - ctm.e) / ctm.a /*- offsX*/,
        (ev.clientY - ctm.f) / ctm.d //- offsY
      );
    }
  }
  return;
}
// these parental could possibly go away, but I don't know yet if there
//    might be a good use for them to be separate
function onParentMouseMove(ev: MouseEvent): void {
  if (amDragging) {
    console.log(`SVGDrag::onParentMouseMove ${props.name}`);
    onDrag(ev);
  }
  return;
}
function onParentMouseUp(ev: MouseEvent): void {
  if (amDragging) {
    console.log(`SVGDrag::onParentMouseUp ${props.name}`);
    onDragEnd(ev);
  }
  return;
}
function onParentMouseLeave(ev: MouseEvent): void {
  if (amDragging) {
    console.log(`SVGDrag::onParentMouseLeave ${props.name}`);
    onDragEnd(ev);
  }
  return;
}

//////////////////////////////////////////
// lifecycle things....
onMounted(() => {
  if (myself.value && myself.value.ownerSVGElement) {
    console.log(`SVGDrag::mounted ${props.name} adding event listeners`);
    myself.value.ownerSVGElement.addEventListener('mousemove', onParentMouseMove);
    myself.value.ownerSVGElement.addEventListener('mouseup', onParentMouseUp);
    myself.value.ownerSVGElement.addEventListener('mouseleave', onParentMouseLeave);
  }
  console.log(`SVGDrag::mounted ${props.name}`);
});
onUnmounted(() => {
  if (myself.value && myself.value.ownerSVGElement) {
    myself.value.ownerSVGElement.removeEventListener('mousemove', onParentMouseMove);
    myself.value.ownerSVGElement.removeEventListener('mouseup', onParentMouseUp);
    myself.value.ownerSVGElement.removeEventListener('mouseleave', onParentMouseLeave);
  }
  console.log(`SVGDrag::beforeDestroy ${props.name}`);
});
</script>

<template>
  <g
    v-bind:id="name"
    ref="myself"
    class="svgdrag"
    v-on:mousedown="onDragStart"
    v-on:mouseup="onDragEnd"
    v-on:mousemove="onDrag"
  >
    <slot></slot>
  </g>
</template>

<style scoped>
.svgdrag {
  cursor: move;
}
</style>
