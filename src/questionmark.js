import * as game from 'game'
import * as vec2 from 'vector2'
import * as soundmanager from 'soundmanager'
import Thing from 'thing'
import { RED_ERROR, YELLOW_SELECTED } from './colors.js'

export default class QuestionMark extends Thing {
  position = [0, 0]
  originalPosition = [0, 0]
  selectedPosition = [0, 0]

  constructor(position) {
    super()

    this.position = [...position]
    this.originalPosition = [...position]
    game.setThingName(this, 'questionMark')
  }

  getSize() {
    return [32, 32]
  }

  getAabb() {
    const size = this.getSize();
    return [
      this.position[0] - size[0] / 2,
      this.position[1] - size[1] / 2,
      this.position[0] + size[0] / 2,
      this.position[1] + size[1] / 2,
    ]
  }

  update() {
    if (this.isSelected) {
      this.position = vec2.lerp(this.position, this.selectedPosition, 0.1)
    }
    else {
      this.position = vec2.lerp(this.position, this.originalPosition, 0.1)
    }
  }

  draw() {
    const { ctx } = game
    
    ctx.save()
    
    ctx.translate(...this.position)
    ctx.translate(...vec2.scale(this.getSize(), -0.5))
    ctx.translate(-20, 0)

    ctx.filter = YELLOW_SELECTED;
    if (this.isSelected) {
      if (game.getThing('ui').errorTime > 0) {
        ctx.filter = RED_ERROR;
      }

      if (game.getThing('ui').blockTime) {
        const shake = game.getThing('ui').getBlockShake();
        ctx.translate(shake, 0)
      }
    }

    const img = game.assets.images["symbol_question_mark"]
    ctx.drawImage(img, 0, 0)

    ctx.restore()
  }
}
