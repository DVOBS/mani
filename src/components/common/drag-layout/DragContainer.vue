<template>
  <div class="DragComponent">DragComponent</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Inject } from 'vue-property-decorator'
import { LayoutNode } from './DragLayoutInterface'
import { addListener, removeListener } from 'resize-detector'

import getContainerComponent from './getContainerComponent'
import DragLayoutContext from './DragLayoutContext.vue'

@Component
export default class DragContainer extends Vue {
  @Inject('drag-layout-context')
  public dragLayoutContext!: DragLayoutContext

  @Prop()
  public layoutNode!: LayoutNode

  public w = 0

  public h = 0

  public get children () {
    const layoutNode = this.layoutNode
    if (
      layoutNode.type === 'horizontal' ||
      layoutNode.type === 'vertical' ||
      layoutNode.type === 'tabs'
    ) {
      return layoutNode.children as LayoutNode[]
    }
    return []
  }

  public get childrenLength () {
    return this.children?.length || 0
  }

  @Watch('childrenLength', { immediate: true })
  private handleChildrenLengthChange(childrenLength: number) {
    if (childrenLength === 0 && this.$parent instanceof DragContainer && !(this.$options.name === 'MainContainer')) {
      const list = this.$parent.children
      const index = list.indexOf(this.layoutNode)
      list.splice(index, 1)
    }
    if (childrenLength === 1 && this.$parent instanceof DragContainer &&  !(this.$options.name === 'TabsContainer') && !(this.$options.name === 'MainContainer')) {
      if (
        (
          this.layoutNode.type === 'horizontal' ||
          this.layoutNode.type === 'vertical' ||
          this.layoutNode.type === 'tabs'
        )
      ) {
        if (this.layoutNode.fixed) {
          return
        }
        const list = this.$parent.children
        const index = list.indexOf(this.layoutNode)
        const child = this.children[0]
        this.$set(child, 'basis', this.layoutNode.basis)
        this.$set(list, index, child)
      } 
    }
  }

  public getContainerComponent(type: string) {
    return getContainerComponent(type)
  }

  protected canSetBasis(layoutNode: LayoutNode) {
    return (
      layoutNode.type === 'horizontal' ||
      layoutNode.type === 'vertical' ||
      layoutNode.type === 'tabs'
    ) && (
      !layoutNode.fluid
    )
  }

  private setSizeInf() {
    const elDomRect = this.$el.getBoundingClientRect()
    this.w = elDomRect.width
    this.h = elDomRect.height
  }

  private mounted() {
    this.setSizeInf()
    addListener(this.$el as HTMLDivElement, this.setSizeInf)
  }

  private destroyed() {
    removeListener(this.$el as HTMLDivElement, this.setSizeInf)
  }
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';
.DragComponent {
  background: red;
}
</style>
