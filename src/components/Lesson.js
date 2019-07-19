import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import katex from 'katex'

import nodeData from '../data/nodeData.json'
import { lessonClosed } from '../actions/lessonActions'

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
      } else {
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
