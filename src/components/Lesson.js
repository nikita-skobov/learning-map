import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

import { lessonClosed } from '../actions/lessonActions'

export function Lesson(props) {
  const { isOpen, lessonClosed: toggle, lessonName } = props
  console.log(`rendering lesson with isOpen: ${isOpen}`)

  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={toggle}>{lessonName}</ModalHeader>
        <ModalBody>
          ayyyy
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
