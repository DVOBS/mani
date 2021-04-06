import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagic, faFolder, faFolderOpen, faChevronRight, faChevronDown, faTimes, faPlus, faArchway, faMehBlank } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-regular-svg-icons'

library.add(faMagic)
library.add(faFile)
library.add(faFolder)
library.add(faFolderOpen)
library.add(faChevronRight)
library.add(faChevronDown)
library.add(faTimes)
library.add(faPlus)
library.add(faArchway)
library.add(faMehBlank)

export { default as ApplicationEditor } from '@/components/application-editor/ApplicationEditor.vue'