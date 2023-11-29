import JUMPERS_DATA from "./lib/jumpers_data"

const parser = new DOMParser()

function createJumper(index, data) {
  const imageNumber = (index+1).toString().padStart(2, '0')
  const backgroundImage = `url('sprites/rescued_man-${imageNumber}.png')`

  const style = `top: ${data.top}%; left: ${data.left}%; background-image: ${backgroundImage}`
  const jumper = `
    <div class="jumper"
         style="${style}"
    />
  `
  let doc = parser.parseFromString(jumper, "text/html")
  return doc.body.firstChild
}

function insertJumper(jumper) {
  const firefighter = document.getElementById('firefighters-1')
  firefighter.parentElement.insertBefore(jumper, firefighter)
}

function createJumperElements() {
  const jumpers = []

  for(let i=0; i<JUMPERS_DATA.length; i++) {
    const jumper = createJumper(i, JUMPERS_DATA[i])
    insertJumper(jumper)
    jumpers.push(jumper)
  }
  return jumpers
}

export {
  createJumperElements
}
