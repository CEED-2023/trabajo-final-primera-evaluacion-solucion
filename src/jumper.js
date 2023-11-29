const LAST_POSITION = 23
const FIREMEN_POSITIONS = [5,13,19]

class Jumper {

  static get UP() { return 0 }
  static get DOWN() { return 1 }

  #position
  #bounced = false
  #crashedPosition = 0

  constructor(initialPosition = 0) {
    this.#position = initialPosition
  }

  #inBouncePosition() {
    return FIREMEN_POSITIONS.includes(this.#position)
  }

  #checkCrashed() {
    if(this.#inBouncePosition() && !this.#bounced) {
      this.#crashedPosition = FIREMEN_POSITIONS.indexOf(this.#position)+1
      return true
    }
    return false
  }

  tick() {
    this.#checkCrashed()
    if(this.#crashedPosition) return

    if(this.#position === 0 || this.#position ===1 ) this.#position+= 2
    else this.#position++

    this.#bounced = false
  }

  bounce(firefightersPos) {
    if(this.#position === FIREMEN_POSITIONS[firefightersPos-1]) {
      this.#bounced = true
    }
  }

  get inAmbulance() {
    return this.#position === LAST_POSITION -1
  }

  get crashedPosition() {
    return this.#crashedPosition
  }

  get position() {
    return this.#position
  }
}

export default Jumper
