import * as game from 'game'
import * as vec2 from 'vector2'
import * as soundmanager from 'soundmanager'
import Thing from 'thing'
import { BLUE_LOCKED, PINK_LOCKED } from './colors.js'

export default class LockParticle extends Thing {
  position = [0, 0]
  velocity = [0, 0]

  constructor(position, isSpecial) {
    super()

    this.position = [...position]
    this.velocity = [
      (Math.random() - 0.5) * 10,
      -7 - (Math.random() * 4),
      this.isSpecial = isSpecial
    ]
  }

  update() {
    this.velocity[1] += 0.5

    this.position = vec2.add(this.position, this.velocity)

    if (this.position[2] > game.getHeight() + 128) {
      this.isDead = true
    }
  }

  draw() {
    const { ctx } = game
    
    ctx.save()
    
    ctx.translate(...this.position)

    ctx.filter = this.isSpecial ? PINK_LOCKED : BLUE_LOCKED;
    const img = game.assets.images["ui_lock_particle"]
    ctx.drawImage(img, 0, 0)

    ctx.restore()
  }
}
