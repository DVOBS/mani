<template>
  <div class="PageConfigEditor">
    <AxisSpace></AxisSpace>
    <CrossRender :name="tabInfoKey">{{name}}</CrossRender>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import ObjectEditor from './ObjectEditor.vue';
import CrossRender from '@/components/common/cross-render/CrossRender.vue'
import AxisSpace from '@/components/common/axis-space/AxisSpace.vue'

@Component({
  components: {
    CrossRender,
    AxisSpace
  }
})
export default class PageConfigEditor extends ObjectEditor {
  private name = "123"
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';
.PageConfigEditor {
  font-size: 12px;
  height: 100%;
}
</style>
