import TabsContainer from './TabsContainer.vue'
import HorizontalContainer from './HorizontalContainer.vue'
import VerticalContainer from './VerticalContainer.vue'
import MainContainer from './MainContainer.vue'

export default function getContainerComponent (type: string): Vue.VueConstructor {
  switch (type) {
    case 'tabs':
      return TabsContainer
    case 'horizontal':
      return HorizontalContainer
    case 'vertical':
        return VerticalContainer
    case 'main':
        return MainContainer
    default:
      return TabsContainer
  }
}