<template>
  <div class="PageConfigEditor">
    <AxisSpace class="axis-space">
      <PagePreviewer :pageConfig="pageConfig"></PagePreviewer>
    </AxisSpace>
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
import PagePreviewer from '@/components/common/previewer/PagePreviewer.vue'

@Component({
  components: {
    AxisSpace,
    CodeEditor,
    PagePreviewer
  }
})
export default class PageConfigEditor extends ObjectEditor {
  @Ref()
  private codeEditor!: CodeEditor;

  private get vueFileEO() {
    return this.tabInfo.object as VueFileEO
  }

  private get pageConfig() {
    return this.vueFileEO.VueFileHandler.pageConfig
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
