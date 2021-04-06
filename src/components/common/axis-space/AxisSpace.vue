<template>
  <div
    class="AxisSpace"
    :class="{ draging }"
    @wheel.passive="handleWhell"
    @mousedown.stop="startDrag($event)"
    @dragover="handleDragover"
    @drop="handleDrop"
  >
    <div class="x-axis">
      <canvas ref="xcanvas" :width="width" :height="axisWidth"></canvas>
    </div>
    <div class="y-axis">
      <canvas ref="ycanvas" :width="axisWidth" :height="height"></canvas>
    </div>
    <div class="content" :style="contentStyle" ref="content">
      <div class="default-solt" :style="defaultSoltStyle"><slot></slot></div>
    </div>
    <div class="unscale-layer" :style="unscaleLayerStyle">
      <slot name="unscale"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import { addListener, removeListener } from 'resize-detector'

const max = 14999

@Component
export default class AxisSpace extends Vue {
  @Prop({ default: true })
  public dragable !: boolean

  @Prop({ required: false, default: false })
  public inCombinationEditor!: boolean

  public scale = 1
  public width = 0
  public height = 0
  public axisWidth = 25
  public offsetX = 50
  public offsetY = 50
  private draging = false

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private initialState: any = null;

  @Provide('axis')
  get axis (): AxisSpace {
    return this
  }

  public get defaultSoltStyle () {
    return {
      transform: `translate(${this.offsetX * this.scale}px, ${this.offsetY * this.scale}px) scale(${this.scale})`,
      transformOrigin: 'left top'
    }
  }

  get unscaleLayerStyle () {
    const offsetX = this.offsetX * this.scale + this.axisWidth
    const offsetY = this.offsetY * this.scale + this.axisWidth
    return {
      top: offsetY + 'px',
      left: offsetX + 'px'
    }
  }

  get contentStyle () {
    let scaleDivision = 100

    if (this.scale < 0.5) {
      scaleDivision = 1000
    }

    if (this.scale > 2) {
      scaleDivision = 50
    }

    if (this.scale > 3) {
      scaleDivision = 20
    }

    if (this.scale >= 5) {
      scaleDivision = 10
    }

    const scale = this.scale
    const canvas = document.createElement('canvas')
    const size = ~~(scaleDivision * scale)
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d')
    if (context) {
      context.strokeStyle = 'rgba(255,255,255,0.25)'
      context.lineWidth = 1
      context.moveTo(0, 0)
      context.lineTo(size, 0)
      context.lineTo(size, size)
      context.stroke()
      context.strokeStyle = 'rgba(255,255,255,0.05)'
      for (let i = 0; i <= 9; i++) {
        context.moveTo(i * size / 10, 0)
        context.lineTo(i * size / 10, size)

        context.moveTo(0, i * size / 10)
        context.lineTo(size, i * size / 10)
      }
      context.stroke()
    }
    const base64 = canvas.toDataURL()
    return {
      'background-image': `url(${base64})`,
      'background-position-x': this.offsetX * scale + 0.5 + 'px',
      'background-position-y': this.offsetY * scale + 0.5 + 'px',
      'background-size': size + 'px'
    }
  }

  private handleWhell (event: WheelEvent) {
    if (event.ctrlKey) {
      let scale = this.scale + -event.deltaY / 1000

      if (scale > 8) {
        scale = 8
      }
      if (scale < 0.125) {
        scale = 0.125
      }
      this.scale = Number(scale.toFixed(2))
    }
  }

  private startDrag (event: MouseEvent) {
    if (!this.dragable) {
      return
    }
    this.draging = true
    this.initialState = {
      offsetX: this.offsetX,
      offsetY: this.offsetY,
      clientX: event.clientX,
      clientY: event.clientY
    }

    document.addEventListener('mousemove', this.onMoving)
    document.addEventListener('mouseup', this.endDrag)
  }

  @Watch('scale')
  private checkOffset () {
    if (this.offsetX > max) {
      this.offsetX = max
    }

    if (this.offsetX < -max + this.width / this.scale) {
      this.offsetX = -max + this.width / this.scale
    }

    if (this.offsetY > max) {
      this.offsetY = max
    }

    if (this.offsetY < -max + this.height / this.scale) {
      this.offsetY = -max + this.height / this.scale
    }
  }

  private onMoving (event: MouseEvent) {
    const initialState = this.initialState
    const dx = event.clientX - initialState.clientX
    const dy = event.clientY - initialState.clientY

    this.offsetX = Math.round(initialState.offsetX + dx / this.scale)
    this.offsetY = Math.round(initialState.offsetY + dy / this.scale)

    this.checkOffset()
  }

  private endDrag (event: MouseEvent) {
    this.onMoving(event)

    delete this.initialState
    this.draging = false

    document.removeEventListener('mousemove', this.onMoving)
    document.removeEventListener('mouseup', this.endDrag)
  }

  @Watch('scale')
  @Watch('width')
  @Watch('height')
  @Watch('offsetX')
  @Watch('offsetY')
  private renderAxis () {
    this.$nextTick(() => {
      const scale = this.scale
      const xcanvas = this.$refs.xcanvas as HTMLCanvasElement
      const xcontext = xcanvas.getContext('2d')
      const ycanvas = this.$refs.ycanvas as HTMLCanvasElement
      const ycontext = ycanvas.getContext('2d')
      if (xcontext && ycontext) {
        xcontext.clearRect(0, 0, this.width, this.axisWidth)
        xcontext.font = '12px Arial'
        xcontext.lineWidth = 1
        xcontext.strokeStyle = '#ffffff'
        xcontext.fillStyle = '#ffffff'
        xcontext.textAlign = 'center'

        ycontext.clearRect(0, 0, this.height, this.axisWidth)
        ycontext.font = '12px Arial'
        ycontext.lineWidth = 1
        ycontext.strokeStyle = '#ffffff'
        ycontext.fillStyle = '#ffffff'
        ycontext.textAlign = 'center'

        ycontext.setTransform()
        ycontext.translate(this.axisWidth, 0)
        ycontext.rotate(90 * Math.PI / 180)

        let scaleDivision = 100

        if (this.scale < 0.5) {
          scaleDivision = 1000
        }

        if (this.scale > 2) {
          scaleDivision = 50
        }

        if (this.scale > 3) {
          scaleDivision = 20
        }

        if (this.scale >= 5) {
          scaleDivision = 10
        }

        const xStart = -this.offsetX
        const xStartTicket = Math.floor(xStart / scaleDivision) * scaleDivision

        let x = 0
        for (let index = xStartTicket; x <= this.width + scaleDivision; index += scaleDivision) {
          x = (-xStart + index) * scale + this.axisWidth
          xcontext.beginPath()
          xcontext.moveTo(x, 20)
          xcontext.lineTo(x, 25)

          if (Math.abs(index) < max) {
            xcontext.fillText(String(index), x, 15)
          }

          for (let i = 1; i < 10; i++) {
            xcontext.moveTo(x + i * scale * scaleDivision / 10, 23)
            xcontext.lineTo(x + i * scale * scaleDivision / 10, 25)
          }
          xcontext.stroke()
        }

        let y = 0
        const yStart = -this.offsetY
        const yStartTicket = Math.floor(yStart / scaleDivision) * scaleDivision
        for (let index = yStartTicket; y <= this.height + scaleDivision; index += scaleDivision) {
          y = (-yStart + index) * scale + this.axisWidth
          ycontext.beginPath()
          ycontext.moveTo(y, 0)
          ycontext.lineTo(y, 5)

          if (Math.abs(index) < max) {
            ycontext.fillText(String(index), y, 20)
          }

          for (let i = 1; i < 10; i++) {
            ycontext.moveTo(y + i * scale * scaleDivision / 10, 0)
            ycontext.lineTo(y + i * scale * scaleDivision / 10, 2)
          }
          ycontext.stroke()
        }

        xcontext.clearRect(0, 0, this.axisWidth, this.axisWidth)
        ycontext.clearRect(0, 0, this.axisWidth, this.axisWidth)
      }
    })
  }

  private handleDragover (event: DragEvent) {
    if (event.dataTransfer) {
      const hasWidgetDefinitionId = event.dataTransfer.types.indexOf('widgetdefinitionid') !== -1
      const isBaseWidgetdefinition = event.dataTransfer.types.indexOf('isbasewidgetdefinition') !== -1

      if (this.inCombinationEditor && !isBaseWidgetdefinition) {
        return
      }
      if (hasWidgetDefinitionId) {
        event.preventDefault()
      }
    }
  }

  private handleDrop (event: DragEvent) {
    if (event.dataTransfer) {
      const widgetDefinitionId = event.dataTransfer.getData('widgetdefinitionid')
      const isBaseWidgetdefinition = event.dataTransfer.getData('isbasewidgetdefinition') === 'true'
      if (this.inCombinationEditor && !isBaseWidgetdefinition) {
        return
      }
      if (widgetDefinitionId) {
        event.preventDefault()
        const content = this.$refs.content as HTMLDivElement
        const bc = content.getBoundingClientRect()
        const x = (event.clientX - bc.x) / this.scale - this.offsetX
        const y = (event.clientY - bc.y) / this.scale - this.offsetY
        this.$emit('dropWidgetdefinition', {
          id: widgetDefinitionId,
          x: Math.round(x),
          y: Math.round(y),
          isBaseWidgetdefinition
        })
      }
    }
  }

  private onResize (event: HTMLElement) {
    this.width = event.clientWidth
    this.height = event.clientHeight
  }

  private mounted () {
    this.onResize(this.$el as HTMLDivElement)
    addListener(this.$el as HTMLDivElement, this.onResize)
  }

  private beforeDestroy () {
    removeListener(this.$el as HTMLDivElement, this.onResize)
  }
}
</script>
<style scoped lang="scss">
@import "~@/style/variables.scss";
$axisWidth: 25px;

.AxisSpace {
  position: relative;
  overflow: hidden;
  height: 100%;

  &.draging {
    cursor: move;
  }

  .x-axis {
    position: absolute;
    top: 0;
    left: 0;
    right: 5px;
    height: $axisWidth;
    overflow: hidden;
    color: white;
    font-size: 10px;
    z-index: 20;
    background: transparent;
  }

  .y-axis {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 5px;
    width: $axisWidth;
    overflow: hidden;
    color: white;
    font-size: 10px;
    z-index: 20;
    background: transparent;
  }

  .content {
    position: absolute;
    top: $axisWidth;
    left: $axisWidth;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: $panel-background-color-darken;
    border-right: solid 5px $panel-background-color;
    border-bottom: solid 5px $panel-background-color;
  }

  .unscale-layer {
    position: absolute;
    z-index: 1;
  }
}
</style>
