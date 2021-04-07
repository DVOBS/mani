import { JsonObject, JsonProperty } from '@/core/json2typescript'
import EditableObject from './EditableObject';
import generateId from '../generateId';

/** 页面配置 */
@JsonObject('PageConfig')
export default class PageConfig extends EditableObject {
  @JsonProperty('id', String, true)
  public id: string = generateId('PageConfig');

  /** 页面名称 */
  @JsonProperty('name', String, true)
  public name = '页面';
}
