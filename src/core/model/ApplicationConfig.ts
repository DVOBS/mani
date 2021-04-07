import { JsonObject, JsonProperty } from '@/core/json2typescript'
import EditableObject from './EditableObject';
import generateId from '../generateId';
import PageConfig from './PageConfig';

/** 应用配置 */
@JsonObject('ApplicationConfig')
export default class ApplicationConfig extends EditableObject {
  @JsonProperty('id', String, true)
  public id: string = generateId('ApplicationConfig');

  /** 应用名称 */
  @JsonProperty('name', String, true)
  public name = '应用';

  /** 页面组件 */
  @JsonProperty('pageConfigs', [PageConfig], true)
  public pageConfigs: PageConfig[] = [new PageConfig()];
}
