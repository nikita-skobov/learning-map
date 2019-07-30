import React from 'react'
import { connect } from 'react-redux'
import { Col } from 'reactstrap'
import Creatable from 'react-select/creatable'

export function EditorPrereqSelect(props) {
  const { onUpdate, nodeKeys } = props

  const opts = []
  nodeKeys.forEach((key) => {
    if (key.charAt(0) !== '[') {
      opts.push({ value: key, label: key })
    }
  })

  return (
    <Col>
      <Creatable options={opts} onChange={(e) => { onUpdate({ target: { value: e.label } }) }} />
    </Col>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    nodeKeys: Object.keys(state.nodes.data.data),
    ...ownProps,
  }
}

export default connect(mapStateToProps)(EditorPrereqSelect)
