<template>
  <div
    class="TabsContainer"
  >
    <div class="tabs" ref="tabs">
      <div
        v-for="(child, index) in children"
        :key="index"
        class="tab"
        draggable="true"
        @dragstart="handleDragstart(child)"
      >{{child.displayName}}</div>
    </div>
    <div class="panel">
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
import { Component, Inject } from 'vue-property-decorator'
import App from './App.vue'
import DragContainer from './DragComponent.vue'
import VerticalContainer from './VerticalContainer.vue'

type DragPositionValues = 'left' | 'right' | 'top' | 'bottom' | 'center' |''

@Component
export default class TabsContainer extends DragContainer {
  @Inject('dragContext')
  public dragContext!: App

  private dragPosition: DragPositionValues = ''

  private get isDraging() {
    return this.dragContext.isDraging
  }

  private set isDraging(value: boolean) {
    this.dragContext.isDraging = value
  }

  private get dragItem() {
    return this.dragContext.dragItem
  }

  private set dragItem(value: object | null) {
    this.dragContext.dragItem = value
  }

  private get dropCallback() {
    return this.dragContext.dropCallback
  }

  private set dropCallback(value: (() => void) | null) {
    this.dragContext.dropCallback = value
  }

  private async handleDragstart(dragItem: object) {
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
      const isVerticall = this.$parent instanceof VerticalContainer
      const object = this.info as object
      const index = parent.children.indexOf(object)
      const newTabsContainer = {
        type: 'TabsContainer',
        children: [this.dragItem]
      }
      
      if (isVerticall) {
        switch (this.dragPosition) {
          case 'bottom':
            parent.children.splice(index + 1, 0, newTabsContainer)
            break
          case 'top':
            parent.children.splice(index, 0, newTabsContainer)
            break
          case 'left':
            parent.children.splice(index, 1, {
              type: 'HorizontalContainer',
              children: [newTabsContainer, this.info]
            })
            break
          case 'right':
            parent.children.splice(index, 1, {
              type: 'HorizontalContainer',
              children: [this.info, newTabsContainer]
            })
            break
          case 'center':
          default:
            this.children.push(this.dragItem)
            break
        }
      } else {
        switch (this.dragPosition) {
          case 'right':
            parent.children.splice(index + 1, 0, newTabsContainer)
            break
          case 'left':
            parent.children.splice(index, 0, newTabsContainer)
            break
          case 'top':
            parent.children.splice(index, 1, {
              type: 'VerticalContainer',
              children: [newTabsContainer, this.info]
            })
            break
          case 'bottom':
            parent.children.splice(index, 1, {
              type: 'VerticalContainer',
              children: [this.info, newTabsContainer]
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
}
</script>
<style lang="scss">
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
    padding: 10px;
    height: 62px;
  }

  .tab {
    float: left;
    margin: 10px;
  }

  .panel {
    width: 80%;
    height: 50%;
    margin: 10%;
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
    bottom: 50%;
  }

  .drag-hint.bottom {
    top: 50%;
  }
}
</style>
