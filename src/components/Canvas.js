/* global window document */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

import { has } from '../utilities'
import { makeGraphFromData } from '../data/makeGraphFromData'
import data from '../data/index'
import { makeArrowSprite } from './CanvasUtils/arrow'
import fillNodeMap from './CanvasUtils/fillNodeMap'


export class Canvas extends Component {
  constructor(props) {
    super(props)

    this.app = undefined
    this.viewport = undefined
    this.edgeContainer = undefined
    this.verticeContainer = undefined
    this.edgeAlphaMin = 0.1
    this.edgeAlphaMax = 0.5
    this.edgeColor = 0x59edff
    this.verticeColor = 0x007d8c
    this.backgroundSizeMultiplier = 3000
    this.verticeList = []
    this.edgeList = []
    this.nodeMap = {}

    this.initializeSprites = this.initializeSprites.bind(this)
  }

  componentDidMount() {
    //
    const canvas = document.getElementById('map-canvas')
    this.app = new PIXI.Application({
      view: canvas,
      resizeTo: window,
      antialias: true,
    })
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: window.innerWidth,
      worldHeight: window.innerHeight,
      interaction: this.app.renderer.plugins.interaction,
    })
    this.app.stage.addChild(this.viewport)

    this.edgeContainer = new PIXI.Container()
    this.verticeContainer = new PIXI.Container()

    this.viewport
      .drag()
      .pinch()
      .wheel({ percent: 0.05, smooth: 10 })
      .decelerate()

    const backgroundBox = new PIXI.Sprite(PIXI.Texture.WHITE)
    backgroundBox.interactive = true
    backgroundBox.x = -(this.viewport.worldWidth * this.backgroundSizeMultiplier)
    backgroundBox.y = -(this.viewport.worldHeight * this.backgroundSizeMultiplier)
    backgroundBox.alpha = 0.45
    backgroundBox.tint = 0x000029
    backgroundBox.width = this.viewport.worldWidth * this.backgroundSizeMultiplier * 2
    backgroundBox.height = this.viewport.worldHeight * this.backgroundSizeMultiplier * 2
    backgroundBox.addListener('pointerdown', () => {
      this.edgeContainer.children.forEach((child) => {
        // eslint-disable-next-line
        child.alpha = this.edgeAlphaMin
      })
    })

    this.viewport.addChild(backgroundBox)
    this.viewport.addChild(this.edgeContainer)
    this.viewport.addChild(this.verticeContainer)

    if (data.formatted) {
      this.initializeSprites(data.data)
    } else {
      makeGraphFromData({
        data: data.data,
      }, this.initializeSprites)
    }
  }

  shouldComponentUpdate() {
    // we never want to update a canvas.
    return false
  }

  initializeSprites(nodeObject) {
    const nodesAndEdges = Object.keys(nodeObject)

    // constants for vertices
    const radius = 25
    const textScale = 0.3
    const textMarginMultiplier = 30

    nodesAndEdges.forEach((nodeOrEdge) => {
      if (nodeOrEdge.charAt(0) === '[') {
        // this indicates it is an edge
        const edgeName = nodeOrEdge
        const edge = nodeObject[edgeName]
        const spr = makeArrowSprite(edge, this.edgeAlphaMin, edgeName)
        // create a sprite with an arrow graphic representing the edge.
        // fills in positions, and calculates rotation.

        this.edgeList.push(this.edgeContainer.addChild(spr))
        // add to the edge container, and the output of addChild
        // returns the child, so edgeList will contain the sprite as well.

        fillNodeMap(this.nodeMap, edgeName, spr)
        // for each edge, add an entry to a map such that every vertice
        // contains a list of vertices it is connected to. used for
        // selection highlighting
      } else {
        // otherwise it is a node
        const nodeName = nodeOrEdge
        const node = nodeObject[nodeName]
        const g = new PIXI.Graphics()
        g.lineStyle(0)
        g.beginFill(this.verticeColor, 1)
        g.drawCircle(0, 0, radius)
        g.endFill()
        const spr = new PIXI.Sprite()
        spr.addChild(g)
        spr.x = node.x
        spr.y = node.y
        this.verticeList.push(this.verticeContainer.addChild(spr))
        const t = new PIXI.Text(nodeName, {
          align: 'center',
          fontSize: 80,
          fill: '#ffffff',
          stroke: '#ffffff',
        })
        t.scale.x = textScale
        t.scale.y = textScale
        t.x = spr.x - (t.width / 2)
        t.y = spr.y + (spr.height * textMarginMultiplier)
        this.verticeList.push(this.verticeContainer.addChild(t))

        spr.interactive = true
        spr.id = nodeName
        spr.addListener('pointerdown', (a) => {
          const { id } = a.currentTarget
          const highlightIds = []
          this.nodeMap[id].forEach((edgeSprite) => {
            highlightIds.push(edgeSprite.id)
          })
          this.edgeContainer.children.forEach((child) => {
            if (highlightIds.indexOf(child.id) === -1) {
              // current child is one we DO NOT want to highlight
              // eslint-disable-next-line
              child.alpha = this.edgeAlphaMin
            } else {
              // eslint-disable-next-line
              child.alpha = this.edgeAlphaMax
            }
          })
        })
      }
    })
  }

  render() {
    return <canvas id="map-canvas" />
  }
}

export default connect()(Canvas)
