import React, { Component } from 'react'
import {
  AbstractEditor,
  MapField,
  ListField,
  KeyValueField,
  Label,
  AddKeyValueField,
} from 'abstract-editor'
import {
  Input,
  Col,
  Button,
  ButtonGroup,
} from 'reactstrap'

import './Editor.css'
import FormulaEditor from './FormulaEditor'

const noop = () => null
const mySep = () => <span className="editor-sep" />
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
  <Button {...props} className="mt-1" color="secondary" outline block size="sm" type="button">Remove {props.deleteType}</Button>
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
    valueComponent={myVal}
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
      <div className="editor-root">
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
            valueComponent={myVal}
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
      </div>
    )
  }
}
