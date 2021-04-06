import { VueConstructor } from "vue/types/vue";
import EditableObject from "@/core/model/EditableObject";

export default interface TabInfo {
  object: EditableObject;
  editor: VueConstructor;
  isPreview: boolean;
}