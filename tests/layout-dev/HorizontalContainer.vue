<template>
  <div class="HorizontalContainer">
    <div class="child" v-for="(child, index) in children" :key="index">
      <component :info="child" :is="getContainerComponent(child.type)"></component>
    </div>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import DragContainer from './DragComponent.vue'

@Component
export default class HorizontalContainer extends DragContainer {
}
</script>
<style lang="scss">
.HorizontalContainer {
  height: 100%;
  display: flex;
  .child {
    flex-grow: 1;
  }
}
</style>
