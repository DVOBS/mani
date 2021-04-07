import { v4 as uuidv4 } from 'uuid'
export default function generateId (type = 'unspecified') {
  return `${type}:${uuidv4()}`
}
