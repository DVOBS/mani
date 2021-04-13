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
import VueFileData from '@/core/editable-object/VueFileData';

@Component({
  components: {
    AxisSpace,
    CodeEditor
  }
})
export default class PageConfigEditor extends ObjectEditor {
  @Ref()
  private codeEditor!: CodeEditor;

  private get vueFileData() {
    return this.tabInfo.object as VueFileData
  }

  private get content() {
    return this.vueFileData.file.content
  }

  private set content(content: string) {
    this.vueFileData.file.content = content
  }

  private mounted() {
    // this.codeEditor.setContent(this.vueFileData.file.content)
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
