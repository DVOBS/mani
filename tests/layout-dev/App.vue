<template>
  <div class="App">
    <component :info="layoutInfo" :is="component"></component>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import getContainerComponent from './getContainerComponent'

@Component
export default class App extends Vue {
  @Provide('dragContext')
  public get dragContext (): App { return this }

  public isDraging = false;

  public dragItem: object | null = null

  public dropCallback: (() => void) | null = null

  private get layoutInfo() {
    return Vue.observable({
      type: 'HorizontalContainer',
      children: [
        {
          type: 'TabsContainer',
          children: [
            {
              type: 'panel',
              displayName: 'Tab-1',
              componentId: 'Tab-1'
            },
            {
              type: 'panel',
              displayName: 'Tab-2',
              componentId: 'Tab-2'
            }
          ]
        }, {
          type: 'TabsContainer',
          children: [
            {
              type: 'panel',
              displayName: 'Tab-3',
              componentId: 'Tab-3'
            },
            {
              type: 'panel',
              displayName: 'Tab-4',
              componentId: 'Tab-4'
            }
          ]
        }, {
          type: 'VerticalContainer',
          children: [
            {
              type: 'TabsContainer',
              children: [
                {
                  type: 'panel',
                  displayName: 'Tab-5',
                  componentId: 'Tab-5'
                },
                {
                  type: 'panel',
                  displayName: 'Tab-6',
                  componentId: 'Tab-6'
                }
              ]
            }, {
              type: 'TabsContainer',
              children: [
                {
                  type: 'panel',
                  displayName: 'Tab-3',
                  componentId: 'Tab-3'
                },
                {
                  type: 'panel',
                  displayName: 'Tab-4',
                  componentId: 'Tab-4'
                }
              ]
            }
          ]
        }
      ]
    })
  }

  private get component() {
    return getContainerComponent(this.layoutInfo.type)
  }

  private getContainerComponent(type: string) {
    return getContainerComponent(type)
  }
}
</script>
<style lang="scss">
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}
.App {
  background: beige;
  height: 100%;
}
* {
  box-sizing: border-box;
}
</style>
