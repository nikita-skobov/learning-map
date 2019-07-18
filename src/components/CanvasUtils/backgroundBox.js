import * as PIXI from 'pixi.js'

const alpha = 0.45
const tint = 0x000029
const backgroundSizeMultiplier = 3000

export function resetBackgroundBox(box, viewport) {
  // eslint-disable-next-line
  box.x = -(viewport.worldWidth * backgroundSizeMultiplier)
  // eslint-disable-next-line
  box.y = -(viewport.worldHeight * backgroundSizeMultiplier)
  // eslint-disable-next-line
  box.width = viewport.worldWidth * backgroundSizeMultiplier * 2
  // eslint-disable-next-line
  box.height = viewport.worldHeight * backgroundSizeMultiplier * 2
}

export function makeBackgroundBox(that) {
  const backgroundBox = new PIXI.Sprite(PIXI.Texture.WHITE)
  backgroundBox.interactive = true
  backgroundBox.x = -(that.viewport.worldWidth * backgroundSizeMultiplier)
  backgroundBox.y = -(that.viewport.worldHeight * backgroundSizeMultiplier)
  backgroundBox.width = that.viewport.worldWidth * backgroundSizeMultiplier * 2
  backgroundBox.height = that.viewport.worldHeight * backgroundSizeMultiplier * 2

  backgroundBox.alpha = alpha
  backgroundBox.tint = tint

  backgroundBox.addListener('pointerdown', () => {
    that.edgeContainer.children.forEach((child) => {
      // eslint-disable-next-line
      child.alpha = that.edgeAlphaMin
    })

    that.verticeList.forEach((vertice) => {
      const lastChild = vertice.children.length - 1
      if (lastChild > -1) {
        // eslint-disable-next-line
        vertice.getChildAt(0).tint = 0xffffff
        // reset to untinted

        // eslint-disable-next-line
        vertice.clicks = 0
      }
    })
  })

  return backgroundBox
}
