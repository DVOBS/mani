<template>
  <div class="VerticalContainer">
    <div class="child" v-for="(child, index) in children" :key="index">
      <component :info="child" :is="getContainerComponent(child.type)"></component>
    </div>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import DragContainer from './DragComponent.vue'

@Component
export default class VerticalContainer extends DragContainer {
}
</script>
<style lang="scss">
.VerticalContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  .child {
    flex-grow: 1;
  }
}
</style>
