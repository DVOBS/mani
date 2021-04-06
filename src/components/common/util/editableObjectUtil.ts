import ObjectEditor from '@/components/object-editor/ObjectEditor.vue'
import EditableObject from '@/core/model/EditableObject'
import PageConfig from '@/core/model/PageConfig'

import { VueConstructor } from 'vue'
import PageConfigEditor from '@/components/object-editor/PageConfigEditor.vue'
import ApplicationConfig from '@/core/model/ApplicationConfig'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new(...args: any[]) => T;

interface EditableObjectTypeInfo {
  name: string;
  constructor: Constructor<EditableObject>;
  editors: VueConstructor[];
  icon: string[];
  color: string;
  getChildren: (applicationConfig: ApplicationConfig) => EditableObject[];
}

export const editableObjectTypeInfos: EditableObjectTypeInfo[] = [
  {
    name: '页面（pages）',
    constructor: PageConfig,
    editors: [PageConfigEditor],
    icon: ['far', 'file'],
    color: '#cd853f',
    getChildren: applicationConfig => applicationConfig.pageConfigs
  }, {
    name: '自定义组件',
    constructor: PageConfig,
    editors: [PageConfigEditor],
    icon: ['far', 'file'],
    color: '#00ffff',
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
