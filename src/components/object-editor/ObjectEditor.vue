<template>
  <div class="ObjectEditor">ObjectEditor</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TabInfo from '@/components/application-editor/object-editor-tabs/TabInfo';

@Component
export default class ObjectEditor extends Vue {
  @Prop({ required: true })
  private tabInfo!: TabInfo;

  public get tabInfoKey() {
    const tabInfo = this.tabInfo
    return `${tabInfo.editor.name}:${tabInfo.object.id}`
  }
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';
.ObjectEditor {
  font-size: 12px;
}
</style>
