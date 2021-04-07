import { JsonObject, JsonProperty } from '@/core/json2typescript'

@JsonObject('Directory')
export default class File {
  /** 应用名称 */
  @JsonProperty('name', String, true)
  public fileName = 'ComponentName.Vue';
  public content = ''
}
