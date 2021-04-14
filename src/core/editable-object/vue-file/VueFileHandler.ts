import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { ASTElement, compile } from 'vue-template-compiler'

import File from '@/core/model/File'
import PageConfig from './PageContainer'

@Component
export default class VueFileHandler extends Vue {
  @Prop()
  public file!: File

  public get content() {
    return this.file.content
  }

  public set content(content: string) {
    this.file.content = content
  }

  public get ast() {
    const ast = compile(this.content, {
      outputSourceRange: true
    }).ast
    return ast
  }

  public get astElements() {
    const astElements: ASTElement[] = []
    const traverse = (el: ASTElement ) => {
      if(el.tag) {
        astElements.push(el)
      }
      for (const child of el.children) {
        if( child.type === 1) {
          traverse(child)
        }
      }
    }
    this.ast && traverse(this.ast)
    return astElements
  }

  public get pageContainerASTElement() {
    return this.astElements.find((d) => d.tag === 'PageContainer')
  }

  public get pageConfig() {
    const pageConfig = new PageConfig()
    const attrs = this.pageContainerASTElement?.attrs || []
    for (const {name, value} of attrs) {
      if (Object.prototype.hasOwnProperty.call(pageConfig, name)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (pageConfig as any)[name] = value
      }
    }
    return Vue.observable(pageConfig)
  }

  @Watch('content', { deep: true })
  private handleContentChange() {
    // this.locked = true
  }

  @Watch('pageConfig', { deep: true })
  private handlePageConfigChange() {
    const pageContainerASTElement = this.pageContainerASTElement
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const start = (pageContainerASTElement as any).start || -1
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const end = (pageContainerASTElement?.children[0] as any)?.start || -1

    const stratStr = this.content.slice(0, start)
    const endStr = this.content.slice(end)
    const newStr = `<PageContainer :width="${this.pageConfig.width}" :height="${this.pageConfig.height}" :bgColor="${this.pageConfig.bgColor}">`
    this.content = `${stratStr}${newStr}${endStr}`
  }
} 