<template>
  <div class="ApplicationEditorHeader">
    <span class="brand">
      <font-awesome-icon
        class="brand-icon"
        :icon="['fas', 'meh-blank']"
      />
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
}
</style>
