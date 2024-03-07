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

// i would like to have a resizeable SVG component
//  zoom and panning would be nice
</script>

<style scoped></style>

<template>
  <div>
    <h2>Drawing machine</h2>
  </div>
</template>
