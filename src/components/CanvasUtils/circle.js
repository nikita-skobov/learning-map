import * as PIXI from 'pixi.js'

const radius = 25
const textScale = 0.3
const textColor = 0xffffff
const textFontSize = 80
const verticeColor = 0x007d8c
const selectedTint = 0x00aa88
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
  spr.clicks = 0
  spr.interactive = true


  spr.addListener('pointerdown', (a) => {
    const { id, clicks } = a.currentTarget
    const highlightIds = []
    if (clicks === 0) {
      // eslint-disable-next-line
      a.currentTarget.clicks += 1
    } else {
      console.log(`you double clicked on ${id}`)
      // eslint-disable-next-line
      a.currentTarget.clicks = 0
    }

    that.verticeList.forEach((v) => {
      const lastChild = v.children.length - 1
      if (lastChild > -1) {
        // eslint-disable-next-line
        v.getChildAt(0).tint = 0xffffff
        // reset to untinted

        if (v.id !== id) {
          // eslint-disable-next-line
          v.clicks = 0
          // set clicks to 0 on all other vertices
        }
      }
    })


    // eslint-disable-next-line
    a.currentTarget.getChildAt(0).tint = selectedTint
    // tint current vertice

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
