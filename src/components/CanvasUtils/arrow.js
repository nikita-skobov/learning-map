import * as PIXI from 'pixi.js'

import { dotProduct } from '../../utilities'

// constants for edges
const arrowLength = 100
const arrowBase = 10
const arrowTipLength = 0.6
const halfArrowBase = arrowBase / 2
const halfArrowTip = arrowTipLength / 2
const edgeColor = 0x59edff

// arrow archetype
const arrowG = new PIXI.Graphics()
arrowG.beginFill(edgeColor)
arrowG.lineStyle(0)
arrowG.moveTo(0, -halfArrowBase)
arrowG.lineTo(arrowLength, -halfArrowTip)
arrowG.lineTo(arrowLength, halfArrowTip)
arrowG.lineTo(0, halfArrowBase)
arrowG.lineTo(0, -halfArrowBase)
arrowG.closePath()
arrowG.endFill()

export function getArrow() {
  return arrowG.clone()
}

export function makeArrowSprite(edge, alpha, id) {
  const arrowClone = getArrow()
  const spr = new PIXI.Sprite()
  spr.addChild(arrowClone)
  spr.x = edge.startX
  spr.y = edge.startY
  spr.width = edge.distance / arrowLength
  spr.anchor.set(0, 0.5)
  spr.alpha = alpha
  spr.id = id
  const vecU = [edge.distance, 0]
  const vecV = [edge.endX - edge.startX, edge.endY - edge.startY]
  const dotProd = dotProduct(vecU, vecV)
  const cosTheta = dotProd / (edge.distance * edge.distance)
  const theta = Math.acos(cosTheta)
  const rotationDirection = edge.endY < edge.startY ? -1 : 1
  spr.rotation = theta * rotationDirection

  return spr
}
