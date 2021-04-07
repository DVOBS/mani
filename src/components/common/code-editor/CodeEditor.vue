<template>
  <div class="CodeEditor">
    <div class="vue-codemirror">
      <textarea ref="textarea"></textarea>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { addListener, removeListener } from 'resize-detector'
import codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'
import 'codemirror/mode/vue/vue.js'

@Component
export default class CodeEditor extends Vue {
  private cminstance!: codemirror.EditorFromTextArea;

  public setContent(content: string) {
    this.cminstance.setValue(content)
  }

  private initialize() {
     this.cminstance  = codemirror.fromTextArea(this.$refs.textarea as HTMLTextAreaElement, {
       theme: 'material-darker',
       lineNumbers: true,
       mode: 'vue'
     })
  }

  private setSize() {
    const $el = this.$el as HTMLDivElement
    const w = $el.clientWidth
    const h = $el.clientHeight
    this.cminstance.setSize(w, h)
  }

  private mounted() {
    this.initialize()
    addListener(this.$el as HTMLElement, this.setSize)
    this.setSize()
  }

  private beforeDestroy () {
    removeListener(this.$el as HTMLElement, this.setSize)
  }
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';
.CodeEditor {
  height: 100%;
}
</style>
