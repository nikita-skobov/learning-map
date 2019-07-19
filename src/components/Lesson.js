import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

import nodeData from '../data/nodeData.json'
import { lessonClosed } from '../actions/lessonActions'
import { LessonText } from './LessonText'
import { LessonFormula } from './LessonFormula'

export function Lesson(props) {
  const { isOpen, lessonClosed: toggle, lessonName } = props

  const lessonList = []
  const lessonObj = nodeData[lessonName]

  if (lessonObj && lessonObj.lesson) {
    lessonObj.lesson.forEach((obj) => {
      const [key] = Object.keys(obj)
      // each object should only have one key

      if (key === 'formula') {
        lessonList.push(<LessonFormula formula={obj[key]} />)
      } else if (key === 'text') {
        lessonList.push(<LessonText text={obj[key]} substitutions={lessonObj.substitutions} />)
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
