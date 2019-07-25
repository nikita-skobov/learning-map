import React, { Component } from 'react'
import { Input, Col, Row, Button, ButtonGroup } from 'reactstrap'


import { LessonFormula } from './LessonFormula'
import './FormulaEditor.css'

export default class FormulaEditor extends Component {
  constructor(props) {
    super(props)
    console.log('constructing formula ediotr')

    this.state = {
      formula: props.startingFormula || '\\LARGE \\mu = \\frac{\\sum\\limits_{\\small i=1}^{\\small N} x_i}{N}',
    }

    this.updateFormula = this.updateFormula.bind(this)
  }

  updateFormula(e) {
    const { value: newFormula } = e.target
    this.setState(prevState => ({ ...prevState, formula: newFormula }))

    const { onUpdate } = this.props
    onUpdate(e)
  }

  render() {
    const {
      formula,
    } = this.state

    return (
      <Col>
        <Row noGutters>
          <Input type="text" defaultValue={formula} onChange={this.updateFormula} />
        </Row>
        <Row noGutters>
          <LessonFormula className="formula-editor" formula={formula} />
        </Row>
      </Col>
    )
  }
}