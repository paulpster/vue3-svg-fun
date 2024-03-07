<template>
  <div class="cont">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="incont">
      <div>
        <slot></slot>
      </div>
      <div class="side noprint">
        <slot name="side"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.incont {
  display: flex;
}
.title {
  text-align: center;
}
.side {
  padding: 0.5rem;
}
</style>
