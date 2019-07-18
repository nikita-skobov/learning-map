import * as PIXI from 'pixi.js'

const radius = 25
const textScale = 0.3
const textColor = 0xffffff
const textFontSize = 80
const verticeColor = 0x007d8c
const textMarginMultiplier = 30

const g = new PIXI.Graphics()
g.lineStyle(0)
g.beginFill(verticeColor, 1)
g.drawCircle(0, 0, radius)
g.endFill()

export function getCircle() {
  return g.clone()
}

export function makeCircleSprite(vertice, name, that) {
  const circle = getCircle()
  const spr = new PIXI.Sprite()
  spr.addChild(circle)
  spr.x = vertice.x
  spr.y = vertice.y
  spr.id = name
  spr.interactive = true


  spr.addListener('pointerdown', (a) => {
    const { id } = a.currentTarget
    const highlightIds = []
    that.nodeMap[id].forEach((edgeSprite) => {
      highlightIds.push(edgeSprite.id)
    })
    that.edgeContainer.children.forEach((child) => {
      if (highlightIds.indexOf(child.id) === -1) {
        // current child is one we DO NOT want to highlight
        // eslint-disable-next-line
        child.alpha = that.edgeAlphaMin
      } else {
        // eslint-disable-next-line
        child.alpha = that.edgeAlphaMax
      }
    })
  })

  return spr
}

export function makeCircleText(name, spr) {
  const t = new PIXI.Text(name, {
    align: 'center',
    fontSize: textFontSize,
    fill: textColor,
  })
  t.scale.x = textScale
  t.scale.y = textScale
  t.x = spr.x - (t.width / 2)
  t.y = spr.y + (spr.height * textMarginMultiplier)

  return t
}
