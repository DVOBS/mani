<template>
  <div
    class="VueFilePreviewer"
    :style="{
      width: pageConfig.width + 'px',
      height: pageConfig.height + 'px',
      backgroundColor: pageConfig.bgColor,
    }"
  >{{pageConfig}}</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import PageConfig from '@/core/editable-object/vue-file/PageContainer';
@Component
export default class VueFilePreviewer extends Vue {
  @Prop()
  private pageConfig!: PageConfig;
}
</script>
<style scoped lang="scss">
@import '~@/style/variables';
.VueFilePreviewer {
  background: red;
}
</style>
