import React, { Component } from 'react'
import {
  AbstractEditor,
  MapField,
  ListField,
  KeyValueField,
  Label,
} from 'abstract-editor'
import {
  Input,
  Col,
  Button,
  ButtonGroup,
  Row,
  Container,
} from 'reactstrap'
import Textarea from 'react-textarea-autosize'
import yaml from 'js-yaml'

import './Editor.css'
import { Lesson } from './Lesson'
import { arraysEqual, downloadFile } from '../utilities'

const noop = () => null
const mySep = () => <span style={{ width: '100%' }} />
const myValAuto = ({ onUpdate }) => <Col><Textarea minRows={2} className="form-control" onChange={onUpdate} /></Col>
const myValAutoFormula = ({ onUpdate }) => <Col><Textarea minRows={2} className="form-control" defaultValue="\LARGE \mu = \frac{\sum\limits_{\small i=1}^{\small N} x_i}{N}" onChange={onUpdate} /></Col>
const myVal = ({ onUpdate }) => <Col><Input type="text" onChange={onUpdate} /></Col>
const mySelect = ({ onUpdate }) => (
  <Col xs="auto">
    <Input onChange={onUpdate} type="select" name="select">
      <option />
      <option>A</option>
      <option>B</option>
    </Input>
  </Col>
)
const myDel = props => (
  <Button {...props} color="secondary" outline size="sm" type="button">X</Button>
)
const myDel2 = ({ onClick, onMove }) => (
  <ButtonGroup className="w-100 mt-1">
    <Button onClick={onClick} color="secondary" outline size="sm" type="button">Remove</Button>
    <Button color="secondary" outline size="sm" type="button" onClick={() => { onMove(1) }}>Move up</Button>
    <Button color="secondary" outline size="sm" type="button" onClick={() => { onMove(-1) }}>Move down</Button>
  </ButtonGroup>
)
const CustomAdd = p => (
  <Button className="editor-kvf-margin-small" outline block color="secondary" type="button" onClick={p.onUpdate}>Add {p.addType}</Button>
)
const myMap = props => (
  <Col>
    <MapField
      {...props}
      addKeyValueComponent={<CustomAdd fieldType="add-key-value" addType="Prerequisite" />}
      keyValueComponent={<KeyValueField keyComponent={myVal} valueComponent={mySelect} deleteComponent={myDel} className="no-gutters row editor-kvf-small" />}
    />
  </Col>
)

const kvForTextItem = (
  <KeyValueField
    keyComponent={noop}
    className="no-gutters row editor-kvf-small"
    valueComponent={myValAuto}
    seperatorComponent={noop}
  />
)
const kvForFormulaItem = (
  <KeyValueField
    keyComponent={noop}
    className="no-gutters row editor-kvf-small"
    valueComponent={myValAutoFormula}
    seperatorComponent={noop}
  />
)

const mapForTextItem = (
  <MapField
    addKeyValueComponent={noop}
    renderOutputTemplate
    keyValueComponent={kvForTextItem}
  />
)

const mapForFormulaItem = (
  <MapField
    addKeyValueComponent={noop}
    renderOutputTemplate
    keyValueComponent={kvForFormulaItem}
  />
)

const myAdd1 = props => (
  <ButtonGroup className="w-100 mt-2">
    <Button outline onClick={() => { props.onUpdate({ text: '' }, mapForTextItem) }}>Add Text</Button>
    <Button outline onClick={() => { props.onUpdate({ formula: '\\LARGE \\mu = \\frac{\\sum\\limits_{\\small i=1}^{\\small N} x_i}{N}' }, mapForFormulaItem) }}>Add Formula</Button>
  </ButtonGroup>
)
const myList = props => (
  <ListField {...props} deleteItemComponent={myDel2} addItemComponent={myAdd1} wrapListComponent={<Col />} valueComponent={mapForTextItem} listItemClass="no-gutters row editor-kvf-small" currentValue={[]} />
)

export default class Editor extends Component {
  constructor(props) {
    super(props)

    this.data = {
      name: '',
      description: '',
      prerequisites: {},
      lesson: [],
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.submit = this.submit.bind(this)

    this.state = this.data
  }

  onUpdate(newData) {
    if (newData.name !== this.data.name) {
      // name was updated, so rerender
      this.setState(() => newData)
    } else if (!arraysEqual(this.data.lesson, newData.lesson)) {
      // the lesson was changed, so rerender
      this.setState(() => newData)
    }
    // otherwise dont rerender
    this.data = newData
  }

  submit() {
    const { name } = this.data
    const lowerName = name.toLowerCase()
    const dashed = lowerName.replace(/\s+/g, '-')
    downloadFile(`${dashed}.yml`, yaml.safeDump(this.data), 'text/yaml')
  }

  render() {
    const { name } = this.state

    return (
      <Container fluid className="mb-5">
        <Row noGutters>
          <Col style={{ minWidth: '50%' }}>
            <AbstractEditor
              onUpdate={this.onUpdate}
              currentValue={this.data}
              renderOutputTemplate
            >
              <KeyValueField
                name="name"
                className="no-gutters row editor-kvf"
                valueComponent={myVal}
                seperatorComponent={mySep}
              />
              <KeyValueField
                name="description"
                className="no-gutters row editor-kvf"
                seperatorComponent={mySep}
                valueComponent={myValAuto}
              />
              <KeyValueField
                name="prerequisites"
                className="no-gutters row editor-kvf"
                seperatorComponent={mySep}
                valueComponent={myMap}
              />
              <KeyValueField
                name="lesson"
                className="no-gutters row editor-kvf"
                seperatorComponent={mySep}
                valueComponent={myList}
              />
            </AbstractEditor>
          </Col>
          <div className="col-xs-6 col-md-6">
            <div className="editor-preview">
              <p>Preview: </p>
              <hr />
              <Lesson name={name} renderName lessonObj={this.state} />
              <hr />
              <Button onClick={this.submit} color="primary" disabled={name === ''}>Submit</Button>
            </div>
          </div>
        </Row>
      </Container>
    )
  }
}
