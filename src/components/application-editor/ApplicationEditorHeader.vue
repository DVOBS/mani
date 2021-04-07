<template>
  <div class="ApplicationEditorHeader">
    <span class="brand">
      <font-awesome-icon
        class="brand-icon"
        :icon="['fas', 'meh-blank']"
      />
    </span>
    <span class="menubar">
      <span>项目(P)</span>
      <span>查看(V)</span>
      <span>运行(R)</span>
      <span>设置(R)</span>
      <span>帮助(H)</span>
    </span>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

@Component({
  name: 'ApplicationEditorHeader',
  components: { FontAwesomeIcon }
})
export default class ApplicationEditorHeader extends Vue {
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';

.ApplicationEditorHeader {
  background: $panel-background-color;
  height: $header-height;
  line-height: $header-height;
  padding: 0 10px;
  .brand {
    display: inline-block;
    margin-top: 3px;
    height: 25px;
    width: 25px;
    line-height: 25px;
    border-radius: 3px;
    text-align: center;
    font-size: 18px;
    background: #001e36;
    color: #2c9aeb;
  }
  .menubar {
    display: inline-block;
    vertical-align: top;
    span {
      margin: 0 15px;
      cursor: pointer;
    }
  }
}
</style>
