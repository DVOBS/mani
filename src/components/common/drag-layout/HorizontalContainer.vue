<template>
  <div class="HorizontalContainer" :class="{ 'has-fluid': hasFluid }">
    <div
      class="child"
      v-for="(child, index) in children"
      :key="index"
      :class="{ fluid: child.fluid}"
      :style="{
        'flex-basis': (child.basis || 0) + 'px',
        'width': (child.basis || 0) + 'px'
      }"
    >
      <component
        :is="getContainerComponent(child.type)"
        :inHorizontal="true"
        :layoutNode="child"
      ></component>
      <div
        class="drag-handler"
        v-if="index < children.length - 1"
        @mousedown="startDrag($event, child, children[index + 1])"
      ></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { BasisNode, HorizontalNode, LayoutNode } from './DragLayoutInterface'
import DragContainer from './DragContainer.vue'


@Component
export default class HorizontalContainer extends DragContainer {
  @Prop()
  public layoutNode!: HorizontalNode

  private $initialState: {
    clientX: number;
    clientY: number;
    basis: number;
    nextBasis: number;
    layoutNode: LayoutNode | null;
    nextLayoutNode: LayoutNode | null;
  } = {
    clientX: 0,
    clientY: 0,
    basis: 0,
    nextBasis: 0,
    layoutNode: null,
    nextLayoutNode: null,
  };

  private get basisSummation() {
    let summation = 100
    this.children.forEach((layoutNode: LayoutNode) => {
      if (
        layoutNode.type === 'horizontal' ||
        layoutNode.type === 'vertical' ||
        layoutNode.type === 'tabs'
      ) {
        summation += layoutNode.fluid ? 0 : (layoutNode.basis || 0)
      }
    })
    return summation
  }

  private get hasFluid() {
    const children = this.children as BasisNode[]
    const findIndex = children.findIndex((layoutNode) => {
      return layoutNode.fluid
    })
    return findIndex > -1 
  }

  @Watch('w', { immediate: true })
  private childrenChange() {
    if (this.layoutNode.basis != this.w) {
      this.$set(this.layoutNode, 'basis', this.w)
    }
  }

  private startDrag (event: MouseEvent, layoutNode: LayoutNode, nextLayoutNode: LayoutNode) {
    this.$initialState = {
      basis: 0,
      nextBasis: 0,
      clientX: event.clientX,
      clientY: event.clientY,
      layoutNode,
      nextLayoutNode,
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$initialState.basis = (layoutNode as any)?.basis || 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.$initialState.nextBasis = (nextLayoutNode as any)?.basis || 0
    document.addEventListener('mousemove', this.onMoving)
    document.addEventListener('mouseup', this.endDrag) 
  }

  private onMoving (event: MouseEvent) {
    const initialState = this.$initialState
    const layoutNode = initialState.layoutNode as BasisNode
    const nextLayoutNode = initialState.nextLayoutNode as BasisNode
    const dx = event.clientX - initialState.clientX
    if (
      layoutNode && (
        layoutNode.type === 'horizontal' ||
        layoutNode.type === 'vertical' ||
        layoutNode.type === 'tabs'
      ) && (
        !layoutNode.fluid
      ) 
    ) {
      this.$set(layoutNode, 'basis', initialState.basis + dx)
    }
    if (
      nextLayoutNode && (
        nextLayoutNode.type === 'horizontal' ||
        nextLayoutNode.type === 'vertical' ||
        nextLayoutNode.type === 'tabs'
      ) && (
        !nextLayoutNode.fluid
      )  ) {
      this.$set(nextLayoutNode, 'basis', initialState.nextBasis - dx)
    }
  }

  private endDrag () {
    this.$initialState = {
      clientX: 0,
      clientY: 0,
      basis: 0,
      nextBasis: 0,
      layoutNode: null,
      nextLayoutNode: null
    }
    document.removeEventListener('mousemove', this.onMoving)
    document.removeEventListener('mouseup', this.endDrag)
  }
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';
.HorizontalContainer {
  height: 100%;
  display: flex;
  .child {
    position: relative;
    min-width: 150px;
    flex-grow: 1;
    flex-shrink: 1;
    margin-right: 1px;
  }
  .child:last-child {
    margin-right: 0;
  }
  .child.fluid {
    flex-grow: 1;
    flex-shrink: 1;
  }
  .drag-handler {
    position: absolute;
    top: 0px;
    right: -3px;
    width: 5px;
    height: 100%;
    cursor: e-resize;
    z-index: 1;
  }
  .drag-handler::after {
    content: '';
    display: block;
    position: absolute;
    left: 1px;
    width: 3px;
    height: 100%;

  }
  .drag-handler:hover::after {
    background: $primary-color;
  }
}

.HorizontalContainer.has-fluid {
  &>.child {
    flex-grow: 0;
  }
  &>.child.fluid {
    flex-grow: 1;
  }
}
</style>
