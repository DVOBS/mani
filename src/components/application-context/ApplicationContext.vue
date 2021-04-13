<template>
  <div class="ApplicationContext">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Provide, Vue } from 'vue-property-decorator'

@Component({ name: 'ApplicationContext' })
export default class ApplicationContext extends Vue {
  @Provide('app-context')
  public get context (): ApplicationContext { return this }
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';
.index {
  background: red;
}
</style>
<style lang="scss">
.ApplicationContext {
  @import '~@/style/index.scss';
}
</style>
