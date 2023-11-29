class Display {

  #jumperElements = []
  #firemenElements = []
  #crashElements = []
  #scoreElement = null

  constructor(jumperElements, firemenElements, crashElements, scoreElement) {
    this.#jumperElements = jumperElements
    this.#firemenElements = firemenElements
    this.#crashElements = crashElements
    this.#scoreElement = scoreElement
  }

  drawFiremen(firemenPosition) {
    for(let i=0; i<this.#firemenElements.length; i++) {
      const firemenElement = this.#firemenElements[i]
      if(i === firemenPosition-1) {
        firemenElement.classList.add('active')
      } else
        firemenElement.classList.remove('active')
    }
  }

  drawJumpers(jumperPositions) {
    for(let i=0; i<this.#jumperElements.length; i++) {
      const jumperElement = this.#jumperElements[i]
      if(jumperPositions.includes(i)) {
        jumperElement.classList.add('active')
      } else
        jumperElement.classList.remove('active')
    }
  }

  drawCrashed(crashedPosition) {
    for(let i=0; i<this.#crashElements.length; i++) {
      const crashElement = this.#crashElements[i]
      if(i === crashedPosition-1) {
        crashElement.classList.add('active')
      } else
        crashElement.classList.remove('active')
    }
  }

  setScore(score) {
    this.#scoreElement.innerText = score
  }

  draw(jumperPositions, firemenPosition, crashedPosition) {
    this.drawJumpers(jumperPositions)
    this.drawFiremen(firemenPosition)
    this.drawCrashed(crashedPosition)
  }
}

export default Display
