import { combineReducers } from 'redux'
import { sampleReducer, initialState as sampleReducerState } from './sample'

export const reducers = combineReducers({
  sample: sampleReducer,
})

export const initialStates = {
  sample: sampleReducerState,
}
