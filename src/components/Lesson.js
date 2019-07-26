import React from 'react'
import { connect } from 'react-redux'


import { LessonText } from './LessonText'
import { LessonFormula } from './LessonFormula'

export function Lesson(props) {
  const { lessonObj, name, renderName } = props

  const lessonList = []

  if (renderName) {
    lessonList.push(<h2>{name}</h2>)
  }

  if (lessonObj && lessonObj.lesson) {
    lessonObj.lesson.forEach((obj) => {
      const [key] = Object.keys(obj)
      // each object should only have one key

      const unique = obj[key] && obj[key].substr(0, 10)
      // some unique identifier to be used for the react key
      // since we are returning an array.

      if (key === 'formula') {
        lessonList.push(<LessonFormula key={`formula_${unique}`} formula={obj[key]} />)
      } else if (key === 'text') {
        lessonList.push(<LessonText key={`text_${unique}`} text={obj[key]} substitutions={lessonObj.substitutions} />)
      } else {
        // treat it as a normal text element, but dont do any special parsing
        // or substitution
        lessonList.push(
          <p key={`unknown_${unique}`}>{obj[key]}</p>,
        )
      }
    })
  }

  return lessonList
}

export default connect()(Lesson)
