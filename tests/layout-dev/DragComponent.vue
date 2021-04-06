<template>
  <div class="DragComponent">DragComponent</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import getContainerComponent from './getContainerComponent'
import TabsContainer from './TabsContainer.vue'

@Component
export default class DragContainer extends Vue {
  @Prop()
  public info!: {
    type: string;
    children: object[];
  }

  public get children () {
    return this.info.children
  }

  public get childrenLength () {
    return this.children?.length || 0
  }

  public getContainerComponent(type: string) {
    return getContainerComponent(type)
  }

  @Watch('childrenLength', { immediate: true })
  private handleChildrenLengthChange(childrenLength: number) {
    if (childrenLength === 0 && this.$parent instanceof DragContainer) {
      const list = this.$parent.children
      const index = list.indexOf(this.info)
      list.splice(index, 1)
    }
    if (childrenLength === 1 && this.$parent instanceof DragContainer && !(this instanceof TabsContainer)) {
      const list = this.$parent.children
      const index = list.indexOf(this.info)
      const child = this.children[0]
      this.$set(list, index, child)
    }
  }
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';
.DragComponent {
  background: red;
}
</style>
