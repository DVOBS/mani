import { Component, Prop, Vue } from 'vue-property-decorator'
import File from '@/core/file-model/File'
import { compile } from 'vue-template-compiler'

@Component
export default class VueFileHandler extends Vue {
  @Prop()
  public file!: File

  public get content() {
    return this.file.content
  }

  public get ast() {
    return compile(this.content).ast
  }
} 