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

import './Editor.css'
import FormulaEditor from './FormulaEditor'

const noop = () => null
const mySep = () => <span style={{ width: '100%' }} />
const myValAuto = ({ onUpdate }) => <Col><Textarea minRows={2} className="form-control" onChange={onUpdate} /></Col>
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
const myLabel = props => (
  <Col className="editor-label" xs="3">
    <Label {...props} />
  </Col>
)
const myDel = props => (
  <Button {...props} color="secondary" outline size="sm" type="button">X</Button>
)
const myDel2 = props => (
  <Button {...props} className="mt-1" color="secondary" outline block size="sm" type="button">Remove</Button>
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
    valueComponent={FormulaEditor}
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
    <Button outline onClick={() => { props.onUpdate({ formula: '' }, mapForFormulaItem) }}>Add Formula</Button>
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
  }

  onUpdate(newData) {
    this.data = newData

    console.log('new data: ')
    console.log(this.data)
  }


  render() {
    return (
      <Container fluid>
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
                keyComponent={myLabel}
                valueComponent={myVal}
                seperatorComponent={mySep}
              />
              <KeyValueField
                name="description"
                className="no-gutters row editor-kvf"
                seperatorComponent={mySep}
                keyComponent={myLabel}
                valueComponent={myValAuto}
              />
              <KeyValueField
                name="prerequisites"
                className="no-gutters row editor-kvf"
                seperatorComponent={mySep}
                keyComponent={myLabel}
                valueComponent={myMap}
              />
              <KeyValueField
                name="lesson"
                className="no-gutters row editor-kvf"
                seperatorComponent={mySep}
                keyComponent={myLabel}
                valueComponent={myList}
              />
            </AbstractEditor>
          </Col>
          <Col sm={{ size: 'auto' }} style={{ minWidth: '50%' }}>
            some other content lulw
          </Col>
        </Row>
      </Container>
    )
  }
}
