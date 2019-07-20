/* global window document */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

import { makeGraphFromData } from '../data/makeGraphFromData'
import data from '../data/index'
import { makeArrowSprite } from './CanvasUtils/arrow'
import fillNodeMap from './CanvasUtils/fillNodeMap'
import { makeCircleSprite, makeCircleText } from './CanvasUtils/circle'
import { makeBackgroundBox, resetBackgroundBox } from './CanvasUtils/backgroundBox'
import { lessonClosed, lessonSelected } from '../actions/lessonActions'

export class Canvas extends Component {
  constructor(props) {
    super(props)

    // dispatch functions:
    this.lessonClosed = props.lessonClosed
    this.lessonSelected = props.lessonSelected

    this.app = undefined
    this.viewport = undefined
    this.edgeContainer = undefined
    this.verticeContainer = undefined
    this.edgeAlphaMin = 0.1
    this.edgeAlphaMax = 0.5
    this.tillingAlpha = 0.3
    this.tillingOffsetX = 0.1
    this.tillingOffsetY = 0.3
    this.verticeList = []
    this.edgeList = []
    this.nodeMap = {}
    this.oldBound = 1000
    // the graph making module uses 1000 as a default width/height.
    // TODO: make this dynamic based on the graph data.

    this.initializeSprites = this.initializeSprites.bind(this)
    this.alignSprites = this.alignSprites.bind(this)
    this.resetViewport = this.resetViewport.bind(this)
  }

  componentDidMount() {
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

    // add tiling sprite as background
    const bTexture = PIXI.Texture.from(document.getElementById('my-img'))
    const tillingSprite = new PIXI.TilingSprite(
      bTexture,
      window.innerWidth,
      window.innerHeight,
    )
    tillingSprite.alpha = this.tillingAlpha
    this.app.ticker.add(() => {
      tillingSprite.tilePosition.x += this.tillingOffsetX
      tillingSprite.tilePosition.y += this.tillingOffsetY
    })

    this.app.stage.addChild(tillingSprite)
    this.app.stage.addChild(this.viewport)
    this.edgeContainer = new PIXI.Container()
    this.verticeContainer = new PIXI.Container()

    this.viewport
      .drag()
      .pinch()
      .wheel({ percent: 0.05, smooth: 10 })
      .decelerate()

    const backgroundBox = makeBackgroundBox(this)

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

    window.addEventListener('resize', () => {
      this.viewport.resize(
        this.app.view.width,
        this.app.view.height,
        this.app.view.width,
        this.app.view.height,
      )

      resetBackgroundBox(tillingSprite, this.viewport)
      resetBackgroundBox(backgroundBox, this.viewport)

      this.alignSprites()
      this.resetViewport()
    })
  }

  shouldComponentUpdate() {
    // we never want to update a canvas.
    return false
  }

  resetViewport() {
    this.viewport.fitWorld()
    this.viewport.setZoom(0.9)
    this.viewport.moveCenter(this.viewport.worldWidth / 2, this.viewport.worldHeight / 2)
  }

  initializeSprites(nodeObject) {
    const nodesAndEdges = Object.keys(nodeObject)

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
        const spr = makeCircleSprite(node, nodeName, this)
        // create a sprite with a circle graphic representing
        // the vertice. fills in position and the name is the id.

        const text = makeCircleText(nodeName, spr)
        // calculate text position based on sprite position

        this.verticeList.push(this.verticeContainer.addChild(spr))
        this.verticeList.push(this.verticeContainer.addChild(text))
      }
    })

    this.viewport.setZoom(0.9)
    this.alignSprites()
  }

  alignSprites() {
    this.viewport.moveCenter(this.viewport.worldWidth / 2, this.viewport.worldHeight / 2)
    const newBound = this.app.view.width >= this.app.view.height
      ? this.app.view.height : this.app.view.width

    const ratio = newBound / this.oldBound
    this.edgeList.forEach((spr) => {
      // eslint-disable-next-line
      spr.scale.x *= ratio; spr.scale.y *= ratio; spr.x *= ratio; spr.y *= ratio
    })
    this.verticeList.forEach((spr) => {
      // eslint-disable-next-line
      spr.scale.x *= ratio; spr.scale.y *= ratio; spr.x *= ratio; spr.y *= ratio
    })
    this.oldBound = newBound
  }

  render() {
    return <canvas id="map-canvas" />
  }
}

const mapActionsToProps = {
  lessonClosed,
  lessonSelected,
}

export default connect(undefined, mapActionsToProps)(Canvas)
