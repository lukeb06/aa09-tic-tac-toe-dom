const squares = document.querySelectorAll(".square");

let turn = 'X';
let gameIsRunning = true;

squares.forEach((square) => {
    square.addEventListener("click", () => {
        if (!gameIsRunning) return;
        square.textContent = turn;

        if (turn == 'X') {
            turn = 'O';
        } else {
            turn = 'X';
        }

        checkForWinner();
    });
});

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
    document.getElementById("winner").textContent = player;
    gameIsRunning = false;
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

        winningPositions.forEach(position => {
            let matches = 0;

            boardState.forEach((square, squareIndex) => {
                if (position[squareIndex] == 1 && square == checkPlayer) {
                    matches++;
                }
            });

            if (matches == 3) {
                makePlayerWin(checkPlayer);
                return true;
            }
        });

        return false;
    }
}

document.getElementById('newGame').addEventListener('click', () => {
    squares.forEach(square => {
        square.textContent = '';
    });

    turn = 'X';
    gameIsRunning = true;
    document.getElementById("winner").textContent = '';
});


document.getElementById('giveUp').addEventListener('click', () => {
    if (turn == 'X') {
        makePlayerWin('O');
    } else {
        makePlayerWin('X');
    }
});
