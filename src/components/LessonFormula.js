import React from 'react'
import { connect } from 'react-redux'
import katex from 'katex'

export function LessonFormula(props) {
  const {
    formula,
  } = props

  const renderedString = katex.renderToString(formula, {
    throwOnError: false,
  })

  return (
    <div
      style={{ textAlign: 'center', margin: '1em' }}
      dangerouslySetInnerHTML={{ __html: renderedString }}
    />
  )
}

export default connect()(LessonFormula)
