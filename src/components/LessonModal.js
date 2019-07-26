import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'

import nodeData from '../data/nodeData.json'
import { lessonClosed } from '../actions/lessonActions'
import { Lesson } from './Lesson'


export function LessonModal(props) {
  const { isOpen, lessonClosed: toggle, lessonName } = props
  const lessonObj = nodeData[lessonName]

  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={toggle}>{lessonName}</ModalHeader>
        <ModalBody>
          <Lesson renderName name={lessonName} lessonObj={lessonObj} />
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
