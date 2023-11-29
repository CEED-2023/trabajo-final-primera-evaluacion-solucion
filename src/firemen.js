class Firemen {

  #position

  constructor(position = 1) {
    this.#position = position
  }

  left() {
    this.#position = Math.max(this.#position-1,1)
  }

  right() {
    this.#position = Math.min(this.#position+1,3)
  }

  get position() {
    return this.#position
  }
}

export default Firemen
