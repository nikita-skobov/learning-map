import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

import { lessonClosed } from '../actions/lessonActions'
import { Lesson } from './Lesson'


export function LessonModal(props) {
  const { isOpen, lessonClosed: toggle, lessonName } = props

  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={toggle}>{lessonName}</ModalHeader>
        <ModalBody>
          <Lesson name={lessonName} />
        </ModalBody>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => state.lesson
const mapActionsToProps = {
  lessonClosed,
}

export default connect(mapStateToProps, mapActionsToProps)(LessonModal)
