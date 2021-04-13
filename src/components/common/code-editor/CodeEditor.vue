<template>
  <div class="CodeEditor">
    <div class="vue-codemirror">
      <textarea ref="textarea"></textarea>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { addListener, removeListener } from 'resize-detector'
import codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'
import 'codemirror/mode/vue/vue.js'

@Component
export default class CodeEditor extends Vue {
  @Prop()
  private value!: string

  private cminstance!: codemirror.EditorFromTextArea;
  private locked = false

  public setContent(content: string) {
    this.locked = true
    this.cminstance.setValue(content)
    this.locked = false
  }

  private initialize() {
    this.cminstance  = codemirror.fromTextArea(this.$refs.textarea as HTMLTextAreaElement, {
      theme: 'material-darker',
      lineNumbers: true,
      mode: 'vue'
    })
    this.cminstance.setValue(this.value)
    this.cminstance.on('change', () => {
      if (this.locked) { return }
      const value = this.cminstance.getValue()
      this.$emit('input', value)
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
