import {
  NODES_ADDED,
} from '../constants'
import data from '../data/index'

export const initialState = { data }

export function nodeReducer(state = initialState, action) {
  switch (action.type) {
    case NODES_ADDED: {
      const newState = { ...state }
      newState.data.data = { ...newState.data.data, ...action.payload }
      return newState
    }
    default:
      return state
  }
}
