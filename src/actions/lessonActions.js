import {
  LESSON_CLOSED,
  LESSON_SELECTED,
} from '../constants'

export function lessonSelected(name) {
  return {
    type: LESSON_SELECTED,
    payload: {
      lessonName: name,
    },
  }
}

export function lessonClosed() {
  console.log('closed!!!')
  return {
    type: LESSON_CLOSED,
  }
}
