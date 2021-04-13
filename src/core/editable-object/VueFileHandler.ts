import { Component, Prop, Vue } from 'vue-property-decorator'
import { compile } from 'vue-template-compiler'

import File from '@/core/model/File'

@Component
export default class VueFileHandler extends Vue {
  @Prop()
  public file!: File

  public get content() {
    return this.file.content
  }

  public get ast() {
    const ast = compile(this.content, {
      outputSourceRange: true
    }).ast
    return ast
  }
} 