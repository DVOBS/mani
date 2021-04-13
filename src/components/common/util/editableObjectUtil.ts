import ObjectEditor from '@/components/object-editor/ObjectEditor.vue'
import EditableObject from '@/core/editable-object/EditableObject'
import VueFileEO from '@/core/editable-object/vue-file/VueFileEO'

import { VueConstructor } from 'vue'
import PageConfigEditor from '@/components/object-editor/PageConfigEditor.vue'

// eslint-disable-next-line
type Constructor<T> = new(...args: any[]) => T;
interface EditableObjectTypeInfo {
  name: string;
  constructor: Constructor<EditableObject>;
  editors: VueConstructor[];
  icon: string[];
  color: string;
  // eslint-disable-next-line
  getChildren: (applicationConfig: any) => EditableObject[];
}

export const editableObjectTypeInfos: EditableObjectTypeInfo[] = [
  {
    name: '页面（pages）',
    constructor: VueFileEO,
    editors: [PageConfigEditor],
    icon: ['far', 'file'],
    color: '#cd853f',
    getChildren: applicationConfig => applicationConfig.pageConfigs
  }
]

export function getEditableObjectTypeInfo (editableObject: EditableObject) {
  const find = editableObjectTypeInfos.find((editableObjectTypeInfo) => {
    return editableObject instanceof editableObjectTypeInfo.constructor
  })
  return find;
}

export function getDefaultEditor (editableObject: EditableObject) {
  const find = editableObjectTypeInfos.find((editableObjectTypeInfo) => {
    return editableObject instanceof editableObjectTypeInfo.constructor
  })
  return find?.editors[0] || ObjectEditor;
}
