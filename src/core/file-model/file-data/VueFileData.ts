import EditableObject from '@/core//model/EditableObject';
import generateId from '@/core/generateId';
import File from '@/core/file-model/File'
import VueFileHandler from './VueFileHandler';

/** 应用配置 */
export default class VueFileData extends EditableObject {
  public id = generateId('VueFileData');

  public path!: string;

  public name!: string;

  public file!: File;

  public VueFileHandler!: VueFileHandler

  constructor (file: File, directoryPath: string) {
    super()
    this.file = file
    this.path = directoryPath + file.fileName
    this.VueFileHandler = new VueFileHandler({ propsData: { file: this.file }})
  }
}
