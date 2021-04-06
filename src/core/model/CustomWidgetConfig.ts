import { JsonObject, JsonProperty } from '@/core/json2typescript'
import EditableObject from './EditableObject';
import generateId from './generateId';

/** 自定义组件配置 */
@JsonObject('CustomWidgetConfig')
export default class CustomWidgetConfig extends EditableObject{
  @JsonProperty('id', String, true)
  public id: string = generateId('CustomWidgetConfig');

  /** 自定义组件配置 */
  @JsonProperty('name', String, true)
  public name = '自定义组件';
}
