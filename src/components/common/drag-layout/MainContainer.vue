<template>
  <div class="MainContainer">
    <CrossRenderView class="cross-render-view" :name="layoutNode.name"></CrossRenderView>
    <div class="mask"
      v-show="isDraging"
      @dragover="handleMaskDragover"
      @dragleave="handleMaskDragleave"
      @drop="handleMaskDrop"
    ></div>
    <div
      class="drag-hint"
      v-if="dragPosition"
      :class="dragPosition"
    ></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { MainNode, TabNode, TabsNode } from './DragLayoutInterface'

import DragContainer from './DragContainer.vue'
import CrossRenderView from '@/components/common/cross-render/CrossRenderView.vue'
import VerticalContainer from './VerticalContainer.vue'

type DragPositionValues = 'left' | 'right' | 'top' | 'bottom' | 'center' |''

@Component({
  name: 'MainContainer',
  components: { CrossRenderView }
})
export default class MainContainer extends DragContainer {
  private dragPosition: DragPositionValues = ''

  @Prop()
  public layoutNode!: MainNode

  private get isDraging() {
    return this.dragLayoutContext.isDraging
  }

  private set isDraging(value: boolean) {
    this.dragLayoutContext.isDraging = value
  }

  private get dragItem() {
    return this.dragLayoutContext.dragItem
  }

  private set dragItem(value: TabNode | null) {
    this.dragLayoutContext.dragItem = value
  }

  private get dropCallback() {
    return this.dragLayoutContext.dropCallback
  }

  private set dropCallback(value: (() => void) | null) {
    this.dragLayoutContext.dropCallback = value
  }

  private handleMaskDragover(event: DragEvent) {
    event.preventDefault()
    const $el = this.$el
    const bcr = $el.getBoundingClientRect()
    const xp = (event.clientX - bcr.x) / bcr.width
    const yp = (event.clientY - bcr.y) / bcr.height

    if (xp <= 0.5 && xp < yp) {
      this.dragPosition = 'left'
    }

    if (xp > 0.5 && xp > yp) {
      this.dragPosition = 'right'
    }

    if (yp <= 0.5 && xp > yp) {
      this.dragPosition = 'top'
    }

    if (yp > 0.5 && xp < yp) {
      this.dragPosition = 'bottom'
    }
  }

  private handleMaskDrop(event: DragEvent) {
    event.preventDefault()

    if (this.dropCallback) {
      this.dropCallback()
    }

    if(this.dragItem && this.$parent instanceof DragContainer) {
      const parent = this.$parent
      const isInVerticall = this.$parent instanceof VerticalContainer
      const layoutNode = this.layoutNode
      const index = parent.children.indexOf(layoutNode)

      const newTabsContainer = {
        type: 'tabs',
        children: [this.dragItem],
        basis: 125,
      } as TabsNode

      if (isInVerticall) {
        switch (this.dragPosition) {
          case 'bottom':
            parent.children.splice(index + 1, 0, newTabsContainer)
            break
          case 'top':
            parent.children.splice(index, 0, newTabsContainer)
            break
          case 'left':
          case 'right':
            (parent as VerticalContainer).handleMaskDrop(this.dragPosition, newTabsContainer)
            break
          case 'center':
          default:
            break
        }
      } else {
        // MainContainer 必然在一个 垂直容器 中
      }
    }

    this.dragPosition = ''
    this.isDraging = false
    this.dragItem = null
    this.dropCallback = null
  }

  private handleMaskDragleave() {
    this.dragPosition = ''
  }
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';
.MainContainer {
  height: 100%;
  position: relative;
  .cross-render-view {
    height: 100%;
  }
  .mask {
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  .drag-hint {
    border: solid 1px #000000;
    background: rgba(0,0,0,0.125);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 0;
  }
  .drag-hint.left {
    right: 50%;
  }
  .drag-hint.right {
    left: 50%;
  }
  .drag-hint.top {
    bottom: 50% !important;
  }
  .drag-hint.bottom {
    top: 50% !important;
  }
}
</style>
