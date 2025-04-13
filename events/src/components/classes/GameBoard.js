export class GameBoard {
    constructor(board, scoreBoard, image) {
        if (typeof board === 'string' && typeof scoreBoard == 'string') {
            this.board = document.querySelector(board)
            this.scoreBoard = document.querySelector(scoreBoard)
        } else {
            this.board = board;
            this.scoreBoard = scoreBoard;
        }
        this.image = image;
        this.goblin;
        this.interval;
        this.count;
        this.missed;
        this.onClickCharacter = this.onClickCharacter.bind(this)
    }

    renderBoard() {
        this.board.innerHTML = ''
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const cell = document.createElement('div')
                this.board.appendChild(cell)
            }
        }
        this.count = 0;
        this.missed = 0;
        this.scoreBoard.textContent = 'Score: ' + this.count + ', ' + 'Missed: ' + this.missed;
        this.spawnGoblin(this.randomPoint())
    }

    randomPoint() {
        const cells = Array.from(this.board.children).filter(cell => !cell.contains(document.querySelector('.character')))
        return cells[Math.floor(Math.random() * cells.length)];
    }

    spawnGoblin(newCell) {
        if (!newCell) return

        const oldCharacter = document.querySelector('.character')
        if (oldCharacter) {
            oldCharacter.remove()
        }

        this.goblin = document.createElement('img')
        this.goblin.src = this.image;
        this.goblin.classList.add('character')
        newCell.appendChild(this.goblin)

        this.goblin.addEventListener('click', this.onClickCharacter)
        this.interval = setTimeout(() => this.Interval(), 1000) // Таймаут на 1 секунду
    }

    onClickCharacter() {
        clearInterval(this.interval)
        this.count++
        const newCell = this.randomPoint()
        if(this.goblin.parentNode !== newCell) this.spawnGoblin(newCell)
        this.scoreBoard.textContent = 'Score: ' + this.count + ', ' + 'Missed: ' + this.missed;
    }

    Interval() {
        this.goblin.remove()
        this.missed++
        if (this.missed == 5) {
            alert('Вы проиграли')
            this.renderBoard()
            return;
        }
        this.scoreBoard.textContent = 'Score: ' + this.count + ', ' + 'Missed: ' + this.missed;
        this.spawnGoblin(this.randomPoint())
    }
}