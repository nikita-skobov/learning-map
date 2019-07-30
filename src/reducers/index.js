import { combineReducers } from 'redux'
import { sampleReducer, initialState as sampleReducerState } from './sample'
import { lessonReducer, initialState as lessonReducerState } from './lesson'
import { nodeReducer, initialState as nodeReducerState } from './nodes'

export const reducers = combineReducers({
  sample: sampleReducer,
  lesson: lessonReducer,
  nodes: nodeReducer,
})

export const initialStates = {
  sample: sampleReducerState,
  lesson: lessonReducerState,
  nodes: nodeReducerState,
}
