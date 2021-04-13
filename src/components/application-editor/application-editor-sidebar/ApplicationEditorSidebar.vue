<template>
  <div class="ApplicationEditorSidebar">
    <div class="header">
      MANI-EDITOR
    </div>
    <el-collapse accordion>
      <el-collapse-item title="可编辑对象" name="1">
        <EditableObjectFolder
          v-for="(typeInfo, i) in editableObjectTypeInfos" :key="i" :typeInfo="typeInfo"
        ></EditableObjectFolder>
      </el-collapse-item>
      <el-collapse-item title="层级" name="2">
        <span>当前不存在层级关系</span>
      </el-collapse-item>
      <el-collapse-item title="组件" name="3">
        <span>当前不存在可用的组件</span>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Collapse, CollapseItem } from "element-ui";
import { editableObjectTypeInfos } from "@/components/common/util/editableObjectUtil";
import ApplicationEditor from "../ApplicationEditor.vue";
import EditableObjectFolder from "./EditableObjectFolder.vue";
import CrossRenderView from "@/components/common/cross-render/CrossRenderView.vue"

@Component({
  name: "ApplicationEditorSidebar",
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    EditableObjectFolder,
    CrossRenderView
  },
})
export default class ApplicationEditorSidebar extends Vue {
  @Inject('app-editor')
  public appEditor!: ApplicationEditor

  private get editableObjectTypeInfos() {
    return editableObjectTypeInfos
  }
}
</script>
<style scoped lang="scss">
@import "~@/style/variables.scss";
.ApplicationEditorSidebar {
  background: $panel-background-color-darken;
  height: 100%;
  .header {
    height: $header-height;
    line-height: $header-height;
    padding-left: 15px;
    background: $panel-background-color-darken;
    font-weight: bold;
  }
  .body {
    height: calc(100% - $header-height);
    overflow-y: scroll;
    padding-left: 15px;
    background: $panel-background-color-darken;
  }
  h1 {
    letter-spacing: 2px;
    margin: 0;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
  }
}
</style>
