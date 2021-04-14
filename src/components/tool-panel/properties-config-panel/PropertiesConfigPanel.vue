<template>
  <div class="PropertiesConfigPanel">
    <div>{{pageConfig}}</div>
    <div v-if="pageConfig">
      <div>
        <span>width</span>
        <input type="number" v-model="pageConfig.width">
      </div>
      <div>
        <span>height</span>
        <input type="number" v-model="pageConfig.height">
      </div>
      <div>
        <span>bgColor</span>
        <input type="color" v-model="pageConfig.bgColor">
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator'
import ApplicationEditor from '@/components/application-editor/ApplicationEditor.vue'
import VueFileEO from '@/core/editable-object/vue-file/VueFileEO'

@Component
export default class PropertiesConfigPanel extends Vue {
  @Inject('app-editor')
  public appEditor!: ApplicationEditor

  private get vueFileEO() {
    const currentEditableObject = this.appEditor.currentEditableObject
    if (currentEditableObject instanceof VueFileEO) {
      return currentEditableObject
    }
    return null
  }

  private get pageConfig() {
    return this.vueFileEO?.VueFileHandler.pageConfig
  }
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';
.PropertiesConfigPanel {
  height: 100%;
}
</style>
