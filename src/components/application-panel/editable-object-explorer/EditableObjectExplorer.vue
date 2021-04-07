<template>
  <div class="EditableObjectExplorer">
    <div class="form">
      <div class="form-item">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          size="mini"
        >
        </el-input>
      </div>
    </div>
    <div class="editable-object-folders">
      <EditableObjectFolder
        v-for="(typeInfo, i) in editableObjectTypeInfos"
        :key="i"
        :typeInfo="typeInfo"
      ></EditableObjectFolder>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Vue } from "vue-property-decorator";
import { Collapse, CollapseItem, Input } from "element-ui";
import { editableObjectTypeInfos } from "@/components/common/util/editableObjectUtil";
import ApplicationEditor from '@/components/application-editor/ApplicationEditor.vue'
import CrossRenderView from "@/components/common/cross-render/CrossRenderView.vue"
import EditableObjectFolder from "./EditableObjectFolder.vue";

@Component({
  name: "EditableObjectExplorer",
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Input.name]: Input,
    EditableObjectFolder,
    CrossRenderView
  },
})
export default class EditableObjectExplorer extends Vue {
  @Inject('app-editor')
  public appEditor!: ApplicationEditor

  private get currentTabInfoKey() {
    return this.appEditor.currentTabInfoKey
  }

  private get editableObjectTypeInfos() {
    return editableObjectTypeInfos
  }
}
</script>
<style scoped lang="scss">
@import "~@/style/variables.scss";
.EditableObjectExplorer {
  background: $panel-background-color-darken;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
  .editable-object-folders {
    margin-top: 4px;
  }
}
</style>
