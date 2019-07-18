/* global window document */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

import { has, dotProduct } from '../utilities'
import { makeGraphFromData } from '../data/makeGraphFromData'
import data from '../data/index'


export class Canvas extends Component {
  constructor(props) {
    super(props)

    this.app = undefined
    this.viewport = undefined

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

    this.viewport
      .drag()
      .pinch()
      .wheel({ percent: 0.05, smooth: 10 })
      .decelerate()

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
    console.log(nodeObject)
  }

  render() {
    return <canvas id="map-canvas" />
  }
}

export default connect()(Canvas)
