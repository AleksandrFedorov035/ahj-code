import { GameBoard } from '../components/classes/GameBoard'
import goblin from '../img/goblin.png'

// const gameBoard = new GameBoard(document.querySelector('.game-container'), document.querySelector('#scoreboard'));
const gameBoard = new GameBoard('.game-container', '#scoreboard', goblin);
gameBoard.renderBoard()