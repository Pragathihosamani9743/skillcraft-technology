const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const twoPlayerModeButton = document.getElementById('twoPlayerMode');
const computerModeButton = document.getElementById('computerMode');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameMode = 'twoPlayer';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkWin();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;

        if (gameMode === 'computer' && currentPlayer === 'O') {
            board.classList.add('disabled');
            setTimeout(computerMove, 800);
        }
    }
}

function checkWin() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            break;
        }
    }

    if (roundWon) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        status.textContent = "It's a draw!";
        gameActive = false;
        return;
    }
}

function computerMove() {
    const emptyCells = gameState.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerChoice = emptyCells[randomIndex];
        gameState[computerChoice] = 'O';
        cells[computerChoice].textContent = 'O';
        cells[computerChoice].classList.add('o');
        checkWin();
        if (gameActive) {
            currentPlayer = 'X';
            status.textContent = "Player X's turn";
        }
    }
    board.classList.remove('disabled');
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });
    board.classList.remove('disabled');
}

function setGameMode(mode) {
    gameMode = mode;
    resetGame();
    if (mode === 'twoPlayer') {
        status.textContent = "Two Player Mode: Player X's turn";
        twoPlayerModeButton.classList.add('active');
        computerModeButton.classList.remove('active');
    } else {
        status.textContent = "Computer Mode: Player X's turn";
        computerModeButton.classList.add('active');
        twoPlayerModeButton.classList.remove('active');
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
twoPlayerModeButton.addEventListener('click', () => setGameMode('twoPlayer'));
computerModeButton.addEventListener('click', () => setGameMode('computer'));

// Initialize the game
resetGame();
setGameMode('twoPlayer');
