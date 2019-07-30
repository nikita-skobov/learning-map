import { NODES_ADDED } from '../constants'

export function addNodes(nodes) {
  return {
    type: NODES_ADDED,
    payload: nodes,
  }
}

export default addNodes
