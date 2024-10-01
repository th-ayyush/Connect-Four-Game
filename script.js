document.addEventListener("DOMContentLoaded", () => {
    const rows = 6;
    const cols = 7;
    const board = [];
    const gameBoard = document.getElementById("game-board");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset-button");
    let currentPlayer = "red";

    // Initialize board
    for (let row = 0; row < rows; row++) {
        board[row] = [];
        for (let col = 0; col < cols; col++) {
            board[row][col] = null;
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", handleCellClick);
            gameBoard.appendChild(cell);
        }
    }

    // Handle cell click
    function handleCellClick(event) {
        const col = event.target.dataset.col;
        for (let row = rows - 1; row >= 0; row--) {
            if (!board[row][col]) {
                board[row][col] = currentPlayer;
                const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
                cell.classList.add(currentPlayer);
                if (checkWinner(row, col)) {
                    message.textContent = `${currentPlayer.toUpperCase()} wins!`;
                    gameBoard.classList.add("disabled");
                } else {
                    currentPlayer = currentPlayer === "red" ? "yellow" : "red";
                    message.textContent = `Current Player: ${currentPlayer.toUpperCase()}`;
                }
                return;
            }
        }
    }

    // Check for winner
    function checkWinner(row, col) {
        return (
            checkDirection(row, col, 1, 0) ||
            checkDirection(row, col, 0, 1) ||
            checkDirection(row, col, 1, 1) ||
            checkDirection(row, col, 1, -1)
        );
    }

    // Check direction
    function checkDirection(row, col, rowDir, colDir) {
        let count = 0;
        let r = row;
        let c = col;
        while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
            count++;
            r += rowDir;
            c += colDir;
        }
        r = row - rowDir;
        c = col - colDir;
        while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
            count++;
            r -= rowDir;
            c -= colDir;
        }
        return count >= 4;
    }

    // Reset game
    resetButton.addEventListener("click", () => {
        board.forEach(row => row.fill(null));
        document.querySelectorAll(".cell").forEach(cell => cell.className = "cell");
        currentPlayer = "red";
        message.textContent = `Current Player: ${currentPlayer.toUpperCase()}`;
        gameBoard.classList.remove("disabled");
    });

   
    message.textContent = `Current Player: ${currentPlayer.toUpperCase()}`;
});
