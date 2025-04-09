const gameField = document.querySelector('.game-field');

function getRandomEmptyCell() {
    const cells = Array.from(gameField.children).filter(cell => !cell.contains(document.querySelector('.character')));
    return cells[Math.floor(Math.random() * cells.length)];
}

function moveCharacter(newCell) {
    if (!newCell) return;

    const oldCharacter = document.querySelector('.character');
    if (oldCharacter) {
        oldCharacter.remove();
    }

    const newCharacter = document.createElement('img');
    newCharacter.src = 'img/goblin.png';
    newCharacter.classList.add('character')

    newCell.appendChild(newCharacter);
}

setInterval(() => {
    const currentCell = document.querySelector('.character').parentNode;
    const newCell = getRandomEmptyCell();
    if (currentCell !== newCell) {
        moveCharacter(newCell);
    }
}, 2000);

document.addEventListener('DOMContentLoaded', () => {
    const initialCell = getRandomEmptyCell();
    moveCharacter(initialCell);
});