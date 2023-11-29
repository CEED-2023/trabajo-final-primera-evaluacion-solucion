import Jumper from './jumper.js'
import Firemen from './firemen.js'
import { start, stop } from './lib/loop.js'
import { randomJumper, JUMPER_UP, JUMPER_DOWN } from './lib/jumpers_randomizer.js'
import { beep, mec } from './lib/beeper.js'

class Game {

  #display
  #jumpers
  #firemen
  #running
  #counter
  #score
  #crashedPosition

  constructor(display) {
    this.#display = display
    this.#cleanGame()
  }

  startButton() {
    if(this.#running) this.#stop()
    else this.#start()
  }

  left() {
    if(!this.#running) return
    this.#firemen.left()
    this.#movedFiremen()
  }

  right() {
    if(!this.#running) return
    this.#firemen.right()
    this.#movedFiremen()
  }

  #cleanGame() {
    this.#jumpers = new Set()
    this.#firemen = new Firemen()

    this.#running = false
    this.#counter = 0
    this.#score = 0
    this.#crashedPosition = 0
  }

  #start() {
    this.#cleanGame()
    this.#redraw()
    this.#running = true
    this.#display.setScore(this.#score)

    start(this.#tick.bind(this))
  }

  #stop() {
    stop()
    this.#running = false
  }

  #newJumper(position = Jumper.UP) {
    const jumper = new Jumper(position)
    if(jumper) {
      this.#jumpers.add(jumper)
      this.#redraw()
    }
  }

  #moveJumpers() {
    for(let jumper of this.#jumpers) {
      if(jumper.inAmbulance) {
        this.#display.setScore(this.#score++)
        this.#jumpers.delete(jumper)
        continue
      }
      jumper.tick()
      if(jumper.crashedPosition) {
        mec()
        this.#crashedPosition = jumper.crashedPosition
        this.#jumpers.delete(jumper)
        this.#stop()
        this.#redraw()
        return
      }
      jumper.bounce(this.#firemen.position)
    }

    this.#display.setScore(this.#score)
    this.#redraw()
  }

  #randomNewJumper() {
    const newJumper = randomJumper(this.#counter)
    if (newJumper == JUMPER_UP) {
      this.#newJumper(Jumper.UP)
    } else if (newJumper == JUMPER_DOWN) {
      this.#newJumper(Jumper.DOWN)
    }
  }

  #bounceJumpers(){
    for(let jumper of this.#jumpers) {
      jumper.bounce(this.#firemen.position)
    }
  }

  #tick() {
    this.#counter++

    beep()
    this.#moveJumpers()
    this.#randomNewJumper()
    this.#bounceJumpers()
  }



  #movedFiremen() {
    this.#bounceJumpers()
    this.#display.drawFiremen(this.#firemen.position)
  }


  get #jumperPositions() {
    const jumperPositions = []
    for(let jumper of this.#jumpers) {
      jumperPositions.push(jumper.position)
    }
    return jumperPositions
  }

  #redraw() {
    this.#display.draw(
      this.#jumperPositions,
      this.#firemen.position,
      this.#crashedPosition
      )
  }
}

export default Game
