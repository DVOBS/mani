<template>
  <div class="TestSuper2">TestSuper2: {{name1}} - {{name2}}</div>
</template>
<script lang="ts">
import { Constructor, PropOptions } from 'vue/types/options'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { createDecorator } from 'vue-class-component'

function MyProp (options?: PropOptions | Constructor[] | Constructor) {
  const r =  Prop(options)
  return (target: Vue, key: string) => {
    r(target, key)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createDecorator(function (componentOptions: any, k: string) {
      if (!componentOptions.__mani__attrs) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        componentOptions.__mani__attrs = {}
      }
      componentOptions.__mani__attrs[k] = 'test'
    })(target, key);
  }
}

@Component
export default class TestSuper2 extends Vue {
  @MyProp()
  protected name02!: string
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';
.Test {
  background: red;
}
</style>
