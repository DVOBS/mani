<template>
  <div class="VerticalContainer" :class="{ 'has-fluid': hasFluid }">
    <div
      class="child"
      :class="{ fluid: child.fluid }"
      v-for="(child, index) in children"
      :key="index"
      :style="{
        'flex-basis': (child.basis || 0) + 'px',
        'height': (child.basis || 0) + 'px'
      }"
    >
      <component :layoutNode="child" :is="getContainerComponent(child.type)"></component>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { BasisNode, TabsNode, VerticalNode } from './DragLayoutInterface'
import DragContainer from './DragContainer.vue'
import HorizontalContainer from './HorizontalContainer.vue'

@Component
export default class VerticalContainer extends DragContainer {
  @Prop()
  public layoutNode!: VerticalNode

  private get hasFluid() {
    const children = this.children as BasisNode[]
    const findIndex = children.findIndex((layoutNode) => {
      return layoutNode.fluid
    })
    return findIndex > -1 
  }

  public handleMaskDrop(dragPosition: string, newTabsContainer: TabsNode) {
    const parent = this.$parent as HorizontalContainer
    const layoutNode = this.layoutNode
    const index = parent.children.indexOf(layoutNode)
    switch (dragPosition) {
      case 'right':
        this.layoutNode.basis = newTabsContainer.basis = (this.layoutNode.basis || 0) / 2
        parent.children.splice(index + 1, 0, newTabsContainer)
        break
      case 'left':
        this.layoutNode.basis = newTabsContainer.basis = (this.layoutNode.basis || 0) / 2
        parent.children.splice(index, 0, newTabsContainer)
        break
      default:
        break
    }
  }
}
</script>
<style scoped lang="scss">
.VerticalContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  .child {
    flex-grow: 1;
    flex-shrink: 1;
  }
  .child.fluid {
    flex-grow: 1;
    flex-shrink: 1;
  }
}

.VerticalContainer.has-fluid {
  &>.child {
    flex-grow: 0;
  }
  &>.child.fluid {
    flex-grow: 1;
  }
}
</style>
