import { JsonObject, JsonProperty } from '@/core/json2typescript'
import generateId from '@/core/generateId';
import Directory from './Directory';

@JsonObject('ProjectData')
export default class Project {
  @JsonProperty('id', String, true)
  public id: string = generateId('ApplicationConfig');

  /** 应用名称 */
  @JsonProperty('name', String, true)
  public name = '应用';

  public rootDirectory: Directory = new Directory()
}
