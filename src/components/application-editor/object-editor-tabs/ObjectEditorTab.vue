<template>
  <div
    class="ObjectEditorTab"
    :class="{ active, isPreview }"
  >
    <font-awesome-icon
      class="type-icon"
      :icon="editableObjectTypeInfo.icon"
      :style="{
        color: editableObjectTypeInfo.color,
      }"
    />
    <span class="name">{{ objectName }}</span>
    <font-awesome-icon
      class="close-icon"
      title="关闭（ALT + f4）"
      :icon="['fas', 'times']"
      @click.stop="handleCloseBtnClick"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { getEditableObjectTypeInfo } from "@/components/common/util/editableObjectUtil";
import TabInfo from "./TabInfo";

@Component({
  components: { FontAwesomeIcon }
})
export default class ObjectEditorTab extends Vue {
  @Prop()
  private tabInfo!: TabInfo;

  @Prop()
  private active!: boolean;

  private get object() {
    return this.tabInfo.object;
  }

  private get isPreview() {
    return this.tabInfo.isPreview;
  }

  private get objectName() {
    return this.object.name;
  }

  private get editableObjectTypeInfo() {
    return getEditableObjectTypeInfo(this.object);
  }

  private handleCloseBtnClick () {
    this.$emit('close')
  }
}
</script>
<style scoped lang="scss">
@import "~@/style/variables.scss";

.ObjectEditorTab {
  display: inline-block;
  position: relative;
  min-width: 80px;
  height: $panel-header-height;
  line-height: $panel-header-height;
  padding: 0 20px 0 5px;
  background: transparent;
  // border-top: solid 1px transparent;
  border-right: solid 1px transparentize($border-color, 0.75);
  font-size: 12px;
  color: $text-color;
  cursor: pointer;

  .type-icon {
    position: relative;
    width: 10px;
    height: 10px;
    margin-right: 5px;
    vertical-align: baseline;
  }

  &.isPreview .name {
    font-style: italic;
  }

  &.active {
    // border-top: solid 1px $border-color;
    background: $panel-background-color;
    border-right: solid 1px $border-color;
    box-shadow: 0 0px 1px 0px $border-color;
  }

  .close-icon {
    position: absolute;
    top: 50%;
    right: 5px;
    margin-top: -6px;
    height: 12px;
  }
}
</style>
