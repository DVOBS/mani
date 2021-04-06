import { JsonObject, JsonProperty } from '@/core/json2typescript'

/** 可编辑对象 */
@JsonObject('EditableObject')
export default class EditableObject {
  /** 组件唯一标识符(UUID) */
  @JsonProperty('id', String, true)
  public id = ''

  @JsonProperty('name', String, true)
  public name = '';
}
