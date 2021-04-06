<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator'
import { LayoutNode, TabNode } from './DragLayoutInterface';
import CrossRender from '@/components/common/cross-render/CrossRender.vue'
import getContainerComponent from './getContainerComponent'

@Component
export default class DragLayoutContext extends Vue {
  @Provide('drag-layout-context')
  public get dragLayoutContext (): DragLayoutContext { return this }

  @Prop()
  public layoutNode!: LayoutNode

  public isDraging = false;

  public dragItem: TabNode | null = null

  public dropCallback: (() => void) | null = null

  private render(h: Vue.CreateElement) {
    const slots = this.$slots.default || []
    return h(
      'div',
      { class: 'DragLayoutContext' },
      [
        h(
          getContainerComponent(this.layoutNode?.type || ''), 
          { 
            props: {
              layoutNode: this.layoutNode
            }
          }
        ),
        ...slots.map((vnode) => {
          return h(
            CrossRender,
            { props: {
              name: vnode.data?.attrs?.name
            }},
            [vnode]
          )
        })
      ]
    )
  }
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';
.DragLayoutContext {
  height: 100%;

  ::v-deep {
    .drag-hint {
      border: solid 1px $primary-color;
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
}
</style>
