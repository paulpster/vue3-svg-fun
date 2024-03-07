<script setup lang="ts"></script>

<template>
  <div style="text-align: left">
    <h3>Apollonian Circle Packing</h3>
    This is a little app to make an
    <a
      href="https://en.wikipedia.org/wiki/Apollonian_gasket"
      rel="noopener noreferrer"
      target="_blank"
      >Apollonian gasket</a
    >
    or
    <a
      href="https://mathworld.wolfram.com/SoddyCircles.html"
      rel="noopener noreferrer"
      target="_blank"
      >Soddy Circles</a
    >.<br />
    <div style="margin-top: 1rem"><b>The math:</b></div>
    For four mutually tangent circles the
    <a
      href="https://mathworld.wolfram.com/DescartesCircleTheorem.html"
      rel="noopener noreferrer"
      target="_blank"
      >Descarte Circle Theorem</a
    >
    gives a relation for the circle curvatures or "bends" (or 1/radius) of the circles:<br /><span
      class="equ"
      >(b<sub>1</sub>&nbsp;+&nbsp;b<sub>2</sub>&nbsp;+&nbsp;b<sub>3</sub>&nbsp;+&nbsp;b<sub>4</sub>)<sup>2</sup>&nbsp;
      =&nbsp;2(b<sub>1</sub><sup>2</sup>&nbsp;+&nbsp;b<sub>2</sub><sup>2</sup>&nbsp;+&nbsp;b<sub
        >3</sub
      ><sup>2</sup>&nbsp;+&nbsp;b<sub>4</sub><sup>2</sup>)</span
    ><br />
    Solving this will give two answers. The relationship between answers:<br /><span class="equ">
      b<sub>4</sub>&nbsp;+&nbsp;b<sub>4</sub>'&nbsp;=&nbsp;2(b<sub>1</sub>&nbsp;+&nbsp;b<sub>2</sub>&nbsp;+&nbsp;b<sub>3</sub>)</span
    ><br />
    This is used when there are four known circles and the fifth one needs to be found.<br />
    Calculating the radii is now done. To find the centers for the next circle(s) can be done with
    this relation:<br />
    <span class="equ"
      >(b<sub>1</sub>z<sub>1</sub>&nbsp;+&nbsp;b<sub>2</sub>z<sub>2</sub>+b<sub>3</sub>z<sub>3</sub>&nbsp;+&nbsp;
      b<sub>4</sub>z<sub>4</sub>)<sup>2</sup>&nbsp;=&nbsp;
      2((b<sub>1</sub>z<sub>1</sub>)<sup>2</sup>&nbsp;+&nbsp;(b<sub>2</sub>z<sub>2</sub>)<sup>2</sup>&nbsp;+&nbsp;
      (b<sub>3</sub>z<sub>3</sub>)<sup>2</sup>&nbsp;+&nbsp;(b<sub>4</sub>z<sub>4</sub>)<sup>2</sup>)</span
    ><br />
    Where curvatures are b and the centers are on the complex plane z = x + iy. This relation also
    yields two answers.<br />
    If the centers of four of the circles are known, the fifth can be calculated using:<br /><span
      class="equ"
    >
      b<sub>4</sub>z<sub>4</sub>&nbsp;+&nbsp;b<sub>4</sub>'z<sub>4</sub>'&nbsp;=&nbsp;
      2(b<sub>1</sub>z<sub>1</sub>&nbsp;+&nbsp;b<sub>2</sub>z<sub>2</sub>&nbsp;+&nbsp;b<sub>3</sub>z<sub>3</sub>)</span
    ><br />
    This relation is very nice because the amount of complex arithmetic is less.<br />
    This paper was most helpful:
    <a href="https://arxiv.org/abs/math/0101066" rel="noopener noreferrer" target="_blank"
      >Beyond the Descartes Circle Theorem</a
    >
  </div>
</template>

<style scoped>
span.equ {
  font-size: 1.1rem;
  padding: 30px;
}
</style>
