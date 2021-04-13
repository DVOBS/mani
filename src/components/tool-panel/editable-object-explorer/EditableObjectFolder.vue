<template>
  <div class="EditableObjectFolder" @click="expanded = !expanded">
    <div class="folder">
      <font-awesome-icon
        v-if="expanded"
        class="arrow-icon"
        :icon="['fas', 'chevron-down']"
      />
      <font-awesome-icon
        v-else
        class="arrow-icon"
        :icon="['fas', 'chevron-right']"
      />
      <font-awesome-icon
        v-if="expanded"
        class="icon expanded"
        :icon="['fas', 'folder-open']"
      />
      <font-awesome-icon v-else class="icon" :icon="['fas', 'folder']" />
      <font-awesome-icon
        class="type-icon"
        :icon="typeInfo.icon"
        :style="{
          color: typeInfo.color,
        }"
      />
      <span class="name">{{ typeInfo.name }}</span>
      <el-button
        type="text"
        class="add-icon"
        size="mini"
      >
        <font-awesome-icon
          :icon="['fas', 'plus']"
          @click.stop="handleAddBtnclick"
        />
      </el-button>
    </div>
    <div class="children" v-if="expanded" @click.stop>
      <div
        class="object-item"
        v-for="(child, i) in children"
        :key="i"
        @click="handleClick(child)"
        @dblclick="handleDbClick(child)"
      >
        <font-awesome-icon
          class="object-type-icon"
          :icon="typeInfo.icon"
          :style="{
            color: typeInfo.color,
          }"
        />
        <span class="name">{{ child.name }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ApplicationEditor from '@/components/application-editor/ApplicationEditor.vue'
import EditableObject from '@/core/editable-object/EditableObject'
import { Button } from 'element-ui'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new(...args: any[]) => T

interface TypeInfo {
  name: string;
  constructor: Constructor<EditableObject>;
  icon: string[];
  color: string;
}

@Component({
  components: {
    FontAwesomeIcon,
    [Button.name]: Button
  },
})
export default class EditableObjectFolder extends Vue {
  @Inject('app-editor')
  public appEditor!: ApplicationEditor

  @Prop()
  public typeInfo!: TypeInfo;
  public expanded = false;

  private get children() {
    return [] as EditableObject[]
  }

  private createNewObj() {
    const Constructor = this.typeInfo.constructor
    const newObj = new Constructor()
    newObj.name += this.children.length + 1
    this.children.push(newObj)
    this.appEditor.openObjectEditor(newObj)
  }

  private handleClick(obj: EditableObject) {
    this.appEditor.openObjectEditor(obj, null, true)
  }

  private handleDbClick(obj: EditableObject) {
    this.appEditor.openObjectEditor(obj)
  }

  private handleAddBtnclick() {
    this.createNewObj()
    this.expanded = true
  }
}
</script>
<style scoped lang="scss">
@import "~@/style/variables.scss";
$folderColor: #536a7c;
.EditableObjectFolder {
  .folder {
    position: relative;
    height: 26px;
    line-height: 26px;
    color: #babaca;
    cursor: pointer;
  }
  .arrow-icon {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 7px;
    color: rgba(255,255,255,0.5);
    vertical-align: middle;
  }
  .icon {
    display: inline-block;
    position: relative;
    top: 0px;
    width: 16px;
    height: 16px;
    margin-right: 4px;
    color: $folderColor;
    vertical-align: middle;
  }
  // .icon.expanded {
  //   color: #5e40d3;
  // }
  .name {
    vertical-align: middle;
    display: inline-block;
    width: calc(100% - 60px);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 13px;
    color: $text-color-gray;
  }
  .type-icon {
    width: 9px;
    height: 9px;
    position: absolute;
    top: 12px;
    left: 26px;
    opacity: 0.75;
  }
  .add-icon {
    position: absolute;
    width: 30px;
    right: -5px;
  }
  .object-item {
    height: 26px;
    line-height: 26px;
    cursor: pointer;
  }
  .object-type-icon {
    position: relative;
    top: 0px;
    margin-left: 38px;
    margin-right: 5px;
    width: 12px;
    height: 12px;
  }
  .object-item:hover {
    color: teal;
  }
}
</style>
