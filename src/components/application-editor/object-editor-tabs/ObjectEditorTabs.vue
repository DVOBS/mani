<template>
  <div class="object-editor-tabs">
    <div class="tabs" ref="tabs" @wheel.passive="handleWhell">
      <vue-drag v-model="tabInfos">
        <ObjectEditorTab
          class="tab"
          v-for="(tabInfo, index) in tabInfos"
          :key="index"
          :ref="getTabInfoKey(tabInfo)"
          :tabInfo="tabInfo"
          :active="currentTabInfo && tabInfoEqual(tabInfo, currentTabInfo)"
          @close="handleClose(tabInfo)"
          @click.native="handleClick(tabInfo)"
          @dblclick.native="handleDbClick(tabInfo)"
        ></ObjectEditorTab>
      </vue-drag>
    </div>
    <div
      v-for="tabInfo in tabInfos"
      v-show="tabInfo === currentTabInfo"
      :key="getTabInfoKey(tabInfo)"
      class="editor-container"
    >
      <component :is="tabInfo.editor" :tabInfo="tabInfo"></component>
    </div>
    <div
      v-show="tabInfos.length === 0"
      class="tips"
    >
      <div class="tips-box">
        <dl>
          <dt>显示所有命令</dt>
          <dd>
              <span class="key">Ctrl</span>
              <span class="key-separator">+</span>
              <span class="key">Shift</span>
              <span class="key-separator">+</span>
              <span class="key">P</span>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Ref, Vue, Watch } from "vue-property-decorator"
import { VueConstructor } from "vue/types/vue"
import EditableObject from "@/core/editable-object/EditableObject"
import ObjectEditorTab from './ObjectEditorTab.vue'
import draggable from "vuedraggable"
import TabInfo from "./TabInfo"
import { getDefaultEditor } from "@/components/common/util/editableObjectUtil"

/** 对象编辑器标签页 */
@Component({
  components: {
    "vue-drag": draggable,
    ObjectEditorTab,
  },
})
export default class ObjectEditorTabs extends Vue {
  @Ref()
  private tabs!: HTMLDivElement

  private tabInfos: TabInfo[] = [];

  private currentTabInfo: TabInfo | null = null;

  private get currentTabInfoKey() {
    return this.currentTabInfo ? this.getTabInfoKey(this.currentTabInfo) : ''
  }

  public openObjectEditor(
    object: EditableObject,
    editor: VueConstructor | undefined | null,
    isPreview = false
  ) {
    editor = editor || getDefaultEditor(object)

    const newTabInfo = {
      object,
      editor,
      isPreview,
    };

    const repetition = this.tabInfos.find((tabInfo) => {
      return this.tabInfoEqual(tabInfo, newTabInfo);
    });

    if (isPreview) {
      if (!repetition) {
        const previewTabIndex = this.tabInfos.findIndex(function (tabInfo) {
          return tabInfo.isPreview;
        });
        if (previewTabIndex > -1) {
          this.tabInfos.splice(previewTabIndex, 1);
        }
        this.tabInfos.push(newTabInfo);
      }

      this.currentTabInfo = repetition || newTabInfo;
    } else {
      const repetition = this.tabInfos.find((tabInfo) => {
        return this.tabInfoEqual(tabInfo, newTabInfo);
      })

      if (repetition) {
        repetition.isPreview = false;
      } else {
        this.tabInfos.push(newTabInfo);
      }

      this.currentTabInfo = repetition || newTabInfo;
    }

    this.scrollTo(newTabInfo)
  }

  public closeTabInfo(tabInfo: TabInfo) {
    const findIndex = this.tabInfos.findIndex((d) => {
      return this.tabInfoEqual(d, tabInfo)
    })

    if (findIndex > -1) {
      this.tabInfos.splice(findIndex, 1)
    }

    if (this.currentTabInfo && this.tabInfoEqual(this.currentTabInfo, tabInfo)) {
      this.currentTabInfo = this.tabInfos[findIndex - 1] || this.tabInfos[findIndex] || this.tabInfos[0] || null
    }
  }

  public scrollTo (tabInfo: TabInfo) {
    // const tabs = this.tabs
    const refId = this.getTabInfoKey(tabInfo)
    const tabArray = this.$refs[refId] as ObjectEditorTab[] | null
    const tabs = this.tabs

    if (tabArray?.length) {
      const tab = tabArray[0]?.$el
      const tabBCR = tab.getBoundingClientRect()
      const tabsBCR = tabs.getBoundingClientRect()
      const scrollLeft = tabs.scrollLeft
      tabs.scrollTo({
        left: scrollLeft + tabBCR.x - tabsBCR.x
      })
    }
    // tabs.scrollTo({})
  }

  @Watch('currentTabInfoKey')
  private handleCurrentTabInfoKeyChange() {
    this.$emit('update:currentTabInfoKey', this.currentTabInfoKey)
  }

  private handleClose(tabInfo: TabInfo) {
    this.closeTabInfo(tabInfo)
  }

  private handleClick(tabInfo: TabInfo) {
    this.openObjectEditor(tabInfo.object, tabInfo.editor, true)
  }

  private handleDbClick(tabInfo: TabInfo) {
    this.openObjectEditor(tabInfo.object, tabInfo.editor)
  }

  private getTabInfoKey(tabInfo: TabInfo) {
    return `${tabInfo.editor.name}:${tabInfo.object.id}`
  }

  private tabInfoEqual(a: TabInfo, b: TabInfo) {
    return a.object === b.object && a.editor === b.editor;
    // return a.object === b.object;
  }

  private handleWhell (event: WheelEvent) {
    const dy = event.deltaY / 5
    const tabs = this.tabs
    const scrollLeft = tabs.scrollLeft
    tabs.scrollTo({
      left: scrollLeft + dy
    })
  }
}
</script>
<style scoped lang="scss">
@import "~@/style/variables.scss";
.object-editor-tabs {
  background: transparent;
  height: 100%;
  .tabs {
    width: 100%;
    height: $panel-header-height;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
    border-left: solid 1px $border-color;
    border-right: solid 1px $border-color;
  }
  .editor-container {
    height: calc(100% - #{$panel-header-height + 1px});
    background: $panel-background-color;
    border-left: solid 1px $border-color;
    border-right: solid 1px $border-color;
    border-bottom: solid 1px $border-color;
    box-shadow: 0px -1px 0px 0px $border-color;
  }
  .tips {
    text-align: center;
  }
  .tips-box {
    display: inline-block;
  }
  .tips dl {
    display: table-row;
  }
  .tips dt,
  .tips dd {
    display: table-cell;
  }
  .tips dt {
    padding-right: 15px;
  }
  .tips .key {
    background-color: rgba(128, 128, 128, 0.17);
    padding: 3px 5px;
    color: #ccc;
    border-radius: 3px;
  }
  .tips .key-separator {
    margin: 0 3px;
  }
}
</style>
