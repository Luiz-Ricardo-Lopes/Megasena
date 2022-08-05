let state = { board: [], currentGame: [], saveGames: [] }

function start() {
  readLocalStorage()
  createBoard()
  newGame()
}

function readLocalStorage() {
  if (!window.localStorage) {
    return
  }

  let savedGamesFromLocalStorage = window.localStorage.getItem('savedGames')

  if (savedGamesFromLocalStorage) {
    state.saveGames = JSON.parse(savedGamesFromLocalStorage)
  }
}

function writeLocalStorage() {
  window.localStorage.setItem('savedGames', JSON.stringify(state.saveGames))
}

function createBoard() {
  state.board = []

  for (let i = 1; i <= 60; i++) {
    state.board.push(i)
  }
}

function newGame() {
  resetGame()
  render()

  console.log(state.currentGame)
}

function render() {
  renderBoard()
  renderButton()
  renderSavedGames()
}

function renderBoard() {
  let divBoard = document.querySelector('#megaSenaBoard')

  divBoard.innerHTML = ''
  let ulNumbers = document.createElement('ul')

  ulNumbers.classList.add('numbers')

  for (let i = 0; i < state.board.length; i++) {
    let currentNumber = state.board[i]

    let liNumber = document.createElement('li')
    liNumber.textContent = currentNumber
    liNumber.classList.add('number')

    liNumber.addEventListener('click', handleNumberClick)

    if (isNumberInGame(currentNumber)) {
      liNumber.classList.add('selected-number')
    }

    ulNumbers.appendChild(liNumber)
  }
  divBoard.appendChild(ulNumbers)
}

function handleNumberClick(event) {
  let value = Number(event.currentTarget.textContent)

  if (isNumberInGame(value)) {
    removeNumberFromGame(value)
  } else {
    addNumberToGame(value)
  }
  render()
}

function renderButton() {
  let divButton = document.querySelector('#megaSenaButtons')
  divButton.innerHTML = ''

  let buttonNewGame = createNewGameButton()
  let buttonRandomGame = createRandomGameButton()
  let buttonSaveGame = createSaveGameButton()
  divButton.appendChild(buttonNewGame)
  divButton.appendChild(buttonRandomGame)
  divButton.appendChild(buttonSaveGame)
}

function createRandomGameButton() {
  let button = document.createElement('button')

  button.textContent = 'Jogo Aleatório'
  button.addEventListener('click', randomGame)
  return button
}

function createNewGameButton() {
  let button = document.createElement('button')

  button.textContent = 'Novo Jogo'
  button.addEventListener('click', newGame)

  return button
}

function createSaveGameButton() {
  let button = document.createElement('button')
  button.disabled = !isGameComplete()

  button.textContent = 'Salvar jogo'
  button.addEventListener('click', saveGames)
  return button
}

function renderSavedGames() {
  let divSavedGames = document.querySelector('#megaSenaSave')
  divSavedGames.innerHTML = ''

  if (state.saveGames.length === 0) {
    divSavedGames.innerHTML = '<p>Nenhum jogo salvo!</p>'
  } else {
    let ulSavedGames = document.createElement('ul')
    for (let i = 0; i < state.saveGames.length; i++) {
      let currentGame = state.saveGames[i]

      let liGames = document.createElement('li')
      liGames.textContent = currentGame.join(', ')

      ulSavedGames.appendChild(liGames)
    }
    divSavedGames.appendChild(ulSavedGames)
  }
}

function addNumberToGame(numberToAdd) {
  if (numberToAdd < 1 || numberToAdd > 60) {
    alert('Número inválido.', numberToAdd)
    return
  }
  if (state.currentGame.length >= 6) {
    alert('O jogo já está completo.')
    return
  }

  state.currentGame.push(numberToAdd)
}

function removeNumberFromGame(numberToRemove) {
  let newGame = []

  if (numberToRemove < 1 || numberToRemove > 60) {
    alert('Número inválido.', numberToRemove)
    return
  }

  for (let i = 0; i < state.currentGame.length; i++) {
    let currentNumber = state.currentGame[i]
    if (currentNumber === numberToRemove) {
      continue
    }
    newGame.push(currentNumber)
  }
  state.currentGame = newGame
}

function isNumberInGame(numberToCheck) {
  /*if (state.currentGame.includes(numberToCheck)) {
    return true
  }
  return false */

  return state.currentGame.includes(numberToCheck)
}

function isGameComplete() {
  return state.currentGame.length === 6
}
function saveGames() {
  if (!isGameComplete()) {
    alert('O jogo não está completo!')
    return
  }
  state.saveGames.push(state.currentGame)
  writeLocalStorage()
  newGame()
}

function resetGame() {
  state.currentGame = []
}

function randomGame() {
  resetGame()

  while (!isGameComplete()) {
    let randomNumber = Math.ceil(Math.random() * 60)
    addNumberToGame(randomNumber)
    console.log(randomNumber)
  }
  render()
}
start()
