import TabsContainer from './TabsContainer.vue'
import HorizontalContainer from './HorizontalContainer.vue'
import VerticalContainer from './VerticalContainer.vue'
import Vue from './TabsContainer.vue'

export default function getContainerComponent (type: string): Vue.VueConstructor {
  switch (type) {
    case 'TabsContainer':
      return TabsContainer
    case 'HorizontalContainer':
      return HorizontalContainer
    case 'VerticalContainer':
        return VerticalContainer
    default:
      return TabsContainer
  }
}