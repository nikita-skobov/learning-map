import {
  LESSON_CLOSED,
  LESSON_SELECTED,
} from '../constants'

export const initialState = { isOpen: false }

export function lessonReducer(state = initialState, action) {
  switch (action.type) {
    case LESSON_CLOSED: {
      const newState = { ...state }
      newState.isOpen = false
      return newState
    }
    case LESSON_SELECTED: {
      const { lessonName } = action.payload
      const newState = { ...state }
      newState.isOpen = true
      newState.lessonName = lessonName
      return newState
    }
    default:
      return state
  }
}
