let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function makeMove(cell) {
    const cellIndex = Array.from(cell.parentElement.children).indexOf(cell);

    if (gameBoard[cellIndex] === "" && !gameOver) {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        
        if (checkWin()) {
            const winner = currentPlayer === "X" ? "Red" : "Blue";
            document.getElementById("message").textContent = `${currentPlayer} wins!`;
            document.getElementById("message").style.color = winner.toLowerCase();
            document.querySelectorAll(".cell").forEach(cell => {
                if (gameBoard[cellIndex] === "X") {
                    cell.style.color = "red";
                } else if (gameBoard[cellIndex] === "O") {
                    cell.style.color = "blue";
                }
            });
            gameOver = true;
        } else if (!gameBoard.includes("")) {
            document.getElementById("message").textContent = "It's a draw!";
            document.getElementById("message").style.color = "black";
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function resetBoard() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    document.getElementById("message").textContent = "";
    document.getElementById("message").style.color = "black";
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.style.color = "black";
    });
}

resetBoard();
