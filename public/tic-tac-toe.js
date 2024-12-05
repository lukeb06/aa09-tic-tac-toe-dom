const squares = document.querySelectorAll(".square");
const newGame = document.getElementById('newGame');
const giveUp = document.getElementById('giveUp');

let turn = 'X';
let gameIsRunning = true;

const root = document.documentElement;

squares.forEach((square) => {
    square.addEventListener("click", () => {
        if (!gameIsRunning) return;
        if (square.textContent) return;
        square.textContent = turn;

        if (turn == 'X') {
            turn = 'O';
            changeSquareText('O');
        } else {
            turn = 'X';
            changeSquareText('X');
        }

        checkForWinner();
    });
});

function changeSquareText(text) {
    root.style.setProperty('--square-text', `"${text}"`);
}

const winningPositions = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
];

function makePlayerWin(player) {
    document.getElementById("winner").textContent = `Winner: ${player}`;
    gameIsRunning = false;
    newGame.disabled = false;
    giveUp.disabled = true;
}

function checkForWinner() {
    const xWon = checkPositions('X');
    if (xWon) return;

    const oWon = checkPositions('O');
    if (oWon) return;

    const boardState = Array.from(squares).map(square => square.textContent);
    const boardFilled = boardState.every(square => square == 'X' || square == 'O');

    if (boardFilled) {
        makePlayerWin('None');
    }

    function checkPositions(checkPlayer) {
        // ['', 'O', 'O', '', '', '', 'X', 'X', 'X']
        const boardState = Array.from(squares).map(square => square.textContent);

        let didWeWin = false;

        winningPositions.forEach(position => {
            let matches = 0;

            boardState.forEach((square, squareIndex) => {
                if (position[squareIndex] == 1 && square == checkPlayer) {
                    matches++;
                }
            });

            if (matches == 3) {
                makePlayerWin(checkPlayer);
                didWeWin = true;
            }
        });

        return didWeWin;
    }
}

newGame.addEventListener('click', () => {
    squares.forEach(square => {
        square.textContent = '';
    });

    turn = 'X';
    changeSquareText('X');
    gameIsRunning = true;
    newGame.disabled = true;
    giveUp.disabled = false;

    document.getElementById("winner").textContent = '';
});


giveUp.addEventListener('click', () => {
    if (turn == 'X') {
        makePlayerWin('O');
    } else {
        makePlayerWin('X');
    }
});
