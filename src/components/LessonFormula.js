import React from 'react'
import { connect } from 'react-redux'
import katex from 'katex'

import './LessonFormula.css'

export function LessonFormula(props) {
  const {
    formula,
    className,
  } = props

  const renderedString = katex.renderToString(formula, {
    throwOnError: false,
  })

  return (
    <div
      className={className || 'lesson-formula'}
      dangerouslySetInnerHTML={{ __html: renderedString }}
    />
  )
}

export default connect()(LessonFormula)
