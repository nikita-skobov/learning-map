import { combineReducers } from 'redux'
import { sampleReducer, initialState as sampleReducerState } from './sample'
import { lessonReducer, initialState as lessonReducerState } from './lesson'

export const reducers = combineReducers({
  sample: sampleReducer,
  lesson: lessonReducer,
})

export const initialStates = {
  sample: sampleReducerState,
  lesson: lessonReducerState,
}
