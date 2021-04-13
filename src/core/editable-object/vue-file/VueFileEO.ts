import EditableObject from '@/core/editable-object/EditableObject';
import File from '@/core/model/File'
import VueFileHandler from './VueFileHandler';

import generateId from '@/core/generateId';

/** 应用配置 */
export default class VueFileEO extends EditableObject {
  public id = generateId('VueFileEO');

  public path!: string;

  public name!: string;

  public file!: File;

  public VueFileHandler!: VueFileHandler

  constructor (file: File, directoryPath: string) {
    super()
    this.name = file.fileName
    this.file = file
    this.path = directoryPath + file.fileName
    this.VueFileHandler = new VueFileHandler({ propsData: { file: this.file }})
  }
}
