<template>
  <div class="SiteMapCollapsePanel"></div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CollapseItem } from 'element-ui'

@Component({
  name: 'ApplicationEditorSidebar',
  components: { 
    [CollapseItem.name]: CollapseItem,
  }
})
export default class SiteMapCollapsePanel extends Vue {
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';
.SiteMapCollapsePanel {
  background: red;
}
</style>
