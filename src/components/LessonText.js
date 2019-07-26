import React from 'react'
import { connect } from 'react-redux'
import katex from 'katex'

function getSubstitutedSpan(key, substitutionObj, num) {
  if (key && key.charAt(0) === '\\') {
    // implicit katex
    const renderedStr = katex.renderToString(key, { throwOnError: false })
    return <span key={`implicit_katex_${key}_${num}`} dangerouslySetInnerHTML={{ __html: renderedStr }} />
  }

  const keysplit = key.split('.')
  const [textOrKatex] = keysplit

  let currentObj = substitutionObj
  keysplit.forEach((innerKey) => {
    currentObj = currentObj[innerKey]
  })

  if (textOrKatex === 'k') {
    const renderedStr = katex.renderToString(currentObj, { throwOnError: false })
    return <span key={`explicit_katex_${currentObj}_${num}`} dangerouslySetInnerHTML={{ __html: renderedStr }} />
  }

  // otherwise treat it as text
  return <span key={`text_${currentObj}_${num}`}>{currentObj}</span>
}

function getSubstitutedElement(s, subMap) {
  // if string contains substitutions, replace
  // them with the appropriate contents,
  // otherwise return a span tag that wraps the string

  let str = s
  const captureRegex = /\$(.*?)\$/
  // captures everything between $ and $
  let match = captureRegex.exec(str)

  let counter = 0
  // use a counter to get numbers for the
  // react key used in the substitution span.

  const outputList = []
  while (match && str.length) {
    // as long as we have a match, and the string
    // still has more characters in it
    const [totalMatch, innerContents] = match
    const { index } = match

    const lastCharIndex = innerContents.length - 1
    const firstChar = innerContents && innerContents.charAt(0)
    const lastChar = innerContents && innerContents.charAt(lastCharIndex)
    if (innerContents && firstChar === '{' && lastChar === '}') {
      // found a substitution
      const key = innerContents.substr(1, lastCharIndex - 1)
      // add everything before the key as a span element.
      const beforeKey = str.substr(0, index)
      outputList.push(<span key={`${beforeKey.substr(0, 10)}_${counter}`}>{beforeKey}</span>)
      counter += 1
      if (key) {
        // in case key is empty string, avoid calling this function
        outputList.push(getSubstitutedSpan(key, subMap, counter))
        counter += 1
      }

      // strip everything from string up to the last $ in the match.
      str = str.substr(index + totalMatch.length)
      match = captureRegex.exec(str)
    } else {
      // in this case we matched a string like this:
      // 'this item costs $5.00. Thanks, ${{employee.name}}'
      // and the match produced: '$5.00. Thanks, $'
      // so we want to add this text to the output
      // and then strip everything up until the last dollar sign
      // from str for the next iteration.
      const beforeKey = str.substr(0, index + totalMatch.length - 1)
      outputList.push(<span key={`${beforeKey.substr(0, 10)}_${counter}`}>{beforeKey}</span>)
      str = str.substr(index + totalMatch.length - 1)
      match = captureRegex.exec(str)
      counter += 1
    }
  }
  outputList.push(<span key={`${str.substr(0, 10)}_${counter}`}>{str}</span>)

  return outputList
}

export function LessonText(props) {
  const {
    substitutions,
    text,
  } = props

  // text may contain substitutions. parse the string
  // find any substitution keys eg: ${t.some.sub}$
  // and replace with the substitution that maps to that key, ie:
  // substitutions = {
  //  t: {
  //    some: { sub: 'hello' },
  //  },
  // }
  // so the whole string: ${t.some.sub}$ gets replaced with 'hello'
  // if it was ${k.some.sub}$ then it is assumed that some.sub points
  // to a katex string, which will be rendered as such.
  const spanList = getSubstitutedElement(text, substitutions)
  return <p>{spanList}</p>
}

export default connect()(LessonText)
