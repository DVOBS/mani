<template>
  <div
    class="TabsContainer"
  >
    <div class="tabs" ref="tabs" @wheel.passive="handleWhell">
      <div
        v-for="(child, index) in children"
        :key="index"
        class="tab"
        :class="{
          active: activeIndex === index
        }"
        draggable="true"
        @dragstart="handleDragstart(child)"
        @click="activeIndex = index"
      >{{child.label}}</div>
    </div>
    <div class="body">
      <CrossRenderView
        v-for="(child, index) in children"
        v-show="activeIndex === index"
        :key="index"
        :name="child.name"
      ></CrossRenderView>
    </div>
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
import { Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { TabNode, TabsNode } from './DragLayoutInterface'
import DragContainer from './DragContainer.vue'
import VerticalContainer from './VerticalContainer.vue'
import CrossRenderView from '@/components/common/cross-render/CrossRenderView.vue'

type DragPositionValues = 'left' | 'right' | 'top' | 'bottom' | 'center' |''

@Component({
  name: 'TabsContainer',
  components: { CrossRenderView }
})
export default class TabsContainer extends DragContainer {
  @Ref()
  private tabs!: HTMLDivElement

  @Prop()
  public layoutNode!: TabsNode

  @Prop({ default: false })
  public inHorizontal!: boolean

  private activeIndex = 0

  private dragPosition: DragPositionValues = ''

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

  @Watch('h')
  @Watch('w', { immediate: true })
  private childrenChange() {
    if (this.inHorizontal) {
      if (this.layoutNode.basis != this.w) {
        this.$set(this.layoutNode, 'basis', this.w)
      }
    } else {
      if (this.layoutNode.basis != this.h) {
        this.$set(this.layoutNode, 'basis', this.h)
      }
    }
  }

  private async handleDragstart(dragItem: TabNode) {
    await this.$nextTick()

    const dragend = () => {
      this.isDraging = false
      this.dragItem = null
      this.dropCallback = null
      document.removeEventListener('dragend', dragend)
    }

    document.addEventListener("dragend", dragend)

    window.setTimeout(() => {
      this.isDraging = true
      this.dragItem = dragItem
      this.dropCallback = () => {
        const index = this.children.indexOf(dragItem)
        this.children.splice(index, 1)
      }
    })
  }

  private handleMaskDragover(event: DragEvent) {
    event.preventDefault()
    const $el = this.$el
    const bcr = $el.getBoundingClientRect()
    const xp = (event.clientX - bcr.x) / bcr.width
    const yp = (event.clientY - bcr.y) / bcr.height

    this.dragPosition = 'center'

    if (xp < 0.125) {
      this.dragPosition = 'left'
    }

    if (xp > 0.875) {
      this.dragPosition = 'right'
    }

    if (yp < 0.125) {
      this.dragPosition = 'top'
    }

    if (yp > 0.875) {
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
      const layoutNode = this.layoutNode as TabsNode
      const index = parent.children.indexOf(layoutNode)

      const newTabsContainer = {
        type: 'tabs',
        children: [this.dragItem],
        basis: 0,
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
            this.layoutNode.basis = newTabsContainer.basis = (this.layoutNode.basis || 0) / 2
            parent.children.splice(index, 1, {
              type: 'horizontal',
              children: [newTabsContainer, this.layoutNode]
            })
            break
          case 'right':
            this.layoutNode.basis = newTabsContainer.basis = (this.layoutNode.basis || 0) / 2
            parent.children.splice(index, 1, {
              type: 'horizontal',
              children: [this.layoutNode, newTabsContainer]
            })
            break
          case 'center':
          default:
            this.children.push(this.dragItem)
            break
        }
      } else {
        newTabsContainer.basis = 275
        switch (this.dragPosition) {
          case 'right':
            this.layoutNode.basis = newTabsContainer.basis = (this.layoutNode.basis || 0) / 2
            parent.children.splice(index + 1, 0, newTabsContainer)
            break
          case 'left':
            this.layoutNode.basis = newTabsContainer.basis = (this.layoutNode.basis || 0) / 2
            parent.children.splice(index, 0, newTabsContainer)
            break
          case 'top':
            parent.children.splice(index, 1, {
              type: 'vertical',
              children: [newTabsContainer, this.layoutNode],
              basis: this.layoutNode.basis
            })
            break
          case 'bottom':
            parent.children.splice(index, 1, {
              type: 'vertical',
              children: [this.layoutNode, newTabsContainer],
              basis: this.layoutNode.basis
            })
            break
          case 'center':
          default:
            this.children.push(this.dragItem)
            break
        }
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

  private handleWhell (event: WheelEvent) {
    const dy = event.deltaY / 5
    const tabs = this.tabs
    const scrollLeft = tabs.scrollLeft
    tabs.scrollTo({
      left: scrollLeft + dy
    })
  }
}
</script>
<style lang="scss">
@import '~@/style/variables.scss';
.TabsContainer {
  background: transparent;
  height: 100%;
  position: relative;

  .mask {
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .tabs {
    width: 100%;
    height: $panel-header-height;
    border-left: solid 1px $border-color;
    border-right: solid 1px $border-color;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
  }

  .tab {
    display: inline-block;
    position: relative;
    height: $panel-header-height;
    line-height: $panel-header-height;
    padding: 0 10px 0 10px;
    background: transparent;
    // border-top: solid 1px transparent;
    border-right: solid 1px $border-color;
    font-size: 12px;
    color: $text-color;
    cursor: pointer;
  }

  .tab:last-child {
    margin-right: 75px;
  }

  .tab.active {
    // border-top: solid 1px $border-color;
    background: $panel-background-color;
    box-shadow: 0 -1px 1px 0px $border-color;
  }

  .body {
    height: calc(100% - #{$panel-header-height + 12px});
    border-left: solid 1px $border-color;
    border-right: solid 1px $border-color;
    border-bottom: solid 1px $border-color;
    background: $panel-background-color;
    box-shadow: 0px -1px 0px 0px $border-color;
    padding: 5px;
  }
}
</style>
