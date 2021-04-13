<template>
  <div class="PageConfigEditor">
    <AxisSpace class="axis-space"></AxisSpace>
    <CodeEditor
      class="code-editor"
      ref="codeEditor"
      v-model="content"
    ></CodeEditor>
  </div>
</template>
<script lang="ts">
import { Component, Ref } from 'vue-property-decorator'
import ObjectEditor from './ObjectEditor.vue';
import AxisSpace from '@/components/common/axis-space/AxisSpace.vue'
import CodeEditor from '@/components/common/code-editor/CodeEditor.vue'
import VueFileEO from '@/core/editable-object/vue-file/VueFileEO';

@Component({
  components: {
    AxisSpace,
    CodeEditor
  }
})
export default class PageConfigEditor extends ObjectEditor {
  @Ref()
  private codeEditor!: CodeEditor;

  private get vueFileEO() {
    return this.tabInfo.object as VueFileEO
  }

  private get content() {
    return this.vueFileEO.file.content
  }

  private set content(content: string) {
    this.vueFileEO.file.content = content
  }
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';
.PageConfigEditor {
  font-size: 12px;
  height: 100%;
  .axis-space {
    height: 50%;
  }
}
</style>
