import { createJumperElements } from './jumper_elements_creator.js'
import Display from './display.js'
import Game from './game.js'

const jumperElements = createJumperElements()
const firemenElements = document.querySelectorAll('.firemen')
const crashElements = document.querySelectorAll('.crash')
const score = document.getElementById('score')

const display = new Display(jumperElements, firemenElements, crashElements, score)
const game = new Game(display)

const leftButton = document.getElementById('left')
const rightButton = document.getElementById('right')
const startButton = document.getElementById('start')

function setButtonMousedownHandlers() {
  const buttons = [
    leftButton, rightButton, startButton
  ]

  function toggleDownClass(event) {
    event.target.classList.add('down')
  }

  for(const button of buttons) {
    button.addEventListener('mousedown', toggleDownClass)
  }
  document.addEventListener('mouseup', function () {
    for(const button of buttons) {
      button.classList.remove('down')
    }
  })
}

function handleLeft() {
  game.left()
}
function handleRight() {
  game.right()
}

function setControldHandlers() {
  leftButton.addEventListener('click', handleLeft)
  rightButton.addEventListener('click', handleRight)

  document.addEventListener('keydown', (event) => {
    if (event.key === '1') game.startButton()
    if (event.key === 'ArrowRight') handleRight()
    if (event.key === 'ArrowLeft') handleLeft()
  });
}

function setStartHandler() {
  startButton.addEventListener('click', () => {
    game.startButton()
  })
}


setButtonMousedownHandlers()
setControldHandlers()
setStartHandler()
