import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

import { lessonClosed } from '../actions/lessonActions'
import { Lesson } from './Lesson'


export function LessonModal(props) {
  const {
    isOpen,
    lessonClosed: toggle,
    lessonName,
    nodeData,
  } = props

  const lessonObj = nodeData[lessonName]

  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={toggle}>{lessonName}</ModalHeader>
        <ModalBody>
          <Lesson name={lessonName} lessonObj={lessonObj} />
        </ModalBody>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ...state.lesson,
    nodeData: state.nodes.data.data,
  }
}
const mapActionsToProps = {
  lessonClosed,
}

export default connect(mapStateToProps, mapActionsToProps)(LessonModal)
