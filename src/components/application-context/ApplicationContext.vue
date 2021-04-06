<template>
  <div class="ApplicationContext">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Provide, Vue } from 'vue-property-decorator'
import ApplicationConfig from '@/core/model/ApplicationConfig'

@Component({ name: 'ApplicationContext' })
export default class ApplicationContext extends Vue {
  @Provide('app-context')
  public get context (): ApplicationContext { return this }

  @Prop({ type: Object, required: false, default () { return new ApplicationConfig() } })
  public readonly applicationConfig !: ApplicationConfig;
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
