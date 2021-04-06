<template>
  <ApplicationContext class="ApplicationEditor" :applicationConfig="applicationConfig" @wheel.native.prevent.stop>
    <ApplicationEditorHeader></ApplicationEditorHeader>
    <div class="body">
      <!-- <ApplicationEditorSidebar class="sidebar"></ApplicationEditorSidebar> -->
      <div class="main-view">
        <DragLayoutContext :layoutNode="layoutRootNode">
          <ObjectEditorTabs
            name="main"
            ref="objectEditorTabs"
            :currentTabInfoKey.sync="currentTabInfoKey"
          ></ObjectEditorTabs>
          <EditableObjectExplorer name="test-1"></EditableObjectExplorer>
          <div name="test-2">test-2</div>
          <div name="test-3">test-3</div>
          <div name="test-4">test-4</div>
          <div name="test-5">test-5</div>
        </DragLayoutContext>
      </div>
    </div>
  </ApplicationContext>
</template>
<script lang="ts">
import { VueConstructor } from 'vue/types/vue'
import { Component, Prop, Provide, Ref, Vue } from 'vue-property-decorator'
import { LayoutNode } from '@/components/common/drag-layout/DragLayoutInterface'
import ApplicationConfig from '@/core/model/ApplicationConfig'
import EditableObject from '@/core/model/EditableObject'
import defaultLayout from './default-layout'

import ApplicationContext from '@/components/application-context/ApplicationContext.vue'
import ApplicationEditorHeader from './ApplicationEditorHeader.vue'
import DragLayoutContext from '@/components/common/drag-layout/DragLayoutContext.vue'
import ObjectEditorTabs from './object-editor-tabs/ObjectEditorTabs.vue'
import EditableObjectExplorer from '@/components/application-panel/editable-object-explorer/EditableObjectExplorer.vue'

@Component({
  name: 'ApplicationEditor',
  components: {
    ApplicationContext,
    ApplicationEditorHeader,
    EditableObjectExplorer,
    DragLayoutContext,
    ObjectEditorTabs,
  }
})
export default class ApplicationEditor extends Vue {
  @Provide('app-editor')
  public get appEditor (): ApplicationEditor { return this }

  @Ref()
  public objectEditorTabs!: ObjectEditorTabs

  /** 应用配置(只用于初始化) */
  @Prop()
  public config !: object

  /** 应用配置(实体) */
  public applicationConfig: ApplicationConfig = new ApplicationConfig()

  /** 当前激活的对象编辑器的KEY */
  public currentTabInfoKey = ''

  private layoutRootNode: LayoutNode = defaultLayout

  public openObjectEditor(
    object: EditableObject,
    editor?: VueConstructor | undefined | null,
    isPreview = false
  ) {
    return this.objectEditorTabs.openObjectEditor(object, editor, isPreview)
  }

  private mounted () {
    const pageConfigs = this.applicationConfig.pageConfigs
    window.setTimeout(() => {
      if (pageConfigs.length) {
        this.openObjectEditor(pageConfigs[0])
      }
    })
  }
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';

$interval: 0px;

.ApplicationEditor {
  color: $text-color;
  font-size: 12px;
  background: $background-color;

  .body {
    display: flex;
    margin-top: 0px;
    width: 100%;
    height: calc(100% - #{$header-height + 1px});
    border-top: solid 1px $border-color;
    padding: $interval;
  }

  .sidebar {
    width: 175px;
    flex-shrink: 0;
    margin-right: $interval;
    border-right: solid 1px $border-color;
  }
 
  .main-view {
    flex-grow: 1;
    overflow: hidden;
  }
}
</style>

<style lang="scss">
@import '~@/style/global.scss';
</style>
