import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import katex from 'katex'

import nodeData from '../data/nodeData.json'
import { lessonClosed } from '../actions/lessonActions'

function getSubstitutedSpan(key, substitutionObj) {
  if (key && key.charAt(0) === '\\') {
    // implicit katex
    const renderedStr = katex.renderToString(key, { throwOnError: false })
    return <span dangerouslySetInnerHTML={{ __html: renderedStr }} />
  }

  const keysplit = key.split('.')
  const [textOrKatex] = keysplit

  let currentObj = substitutionObj
  keysplit.forEach((innerKey) => {
    currentObj = currentObj[innerKey]
  })

  if (textOrKatex === 'k') {
    const renderedStr = katex.renderToString(currentObj, { throwOnError: false })
    return <span dangerouslySetInnerHTML={{ __html: renderedStr }} />
  }

  // otherwise treat it as text
  return <span>{currentObj}</span>
}

function getSubstitutedElement(s, subMap) {
  // if string contains substitutions, replace
  // them with the appropriate contents,
  // otherwise return a span tag that wraps the string

  let str = s
  const captureRegex = /\$(.*?)\$/
  // captures everything between $ and $
  let match = captureRegex.exec(str)

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
      outputList.push(<span>{beforeKey}</span>)
      outputList.push(getSubstitutedSpan(key, subMap))

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
      outputList.push(<span>{beforeKey}</span>)
      str = str.substr(index + totalMatch.length - 1)
      match = captureRegex.exec(str)
    }
  }
  outputList.push(<span>{str}</span>)

  return outputList
}

export function Lesson(props) {
  const { isOpen, lessonClosed: toggle, lessonName } = props

  const lessonList = []
  const lessonObj = nodeData[lessonName]

  if (lessonObj && lessonObj.lesson) {
    lessonObj.lesson.forEach((obj) => {
      const [key] = Object.keys(obj)
      // each object should only have one key

      if (key === 'formula') {
        const renderedString = katex.renderToString(obj[key], {
          throwOnError: false,
        })
        lessonList.push(
          <div style={{ textAlign: 'center', margin: '1em' }} dangerouslySetInnerHTML={{ __html: renderedString }} />,
        )
      } else if (key === 'text') {
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
        const out = getSubstitutedElement(obj[key], lessonObj.substitutions)
        lessonList.push(<p>{out}</p>)
      } else {
        // treat it as a normal text element, but dont do any special parsing
        // or substitution
        lessonList.push(
          <p>{obj[key]}</p>,
        )
      }
    })
  }

  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={toggle}>{lessonName}</ModalHeader>
        <ModalBody>
          {lessonList}
        </ModalBody>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => state.lesson
const mapActionsToProps = {
  lessonClosed,
}

export default connect(mapStateToProps, mapActionsToProps)(Lesson)
