/**
 * Game flow -- The game continues until either a player wins or all cells are filled (draw)
 * Steps in the game
 * 1. Display the board: Render the board to the screen after every move
 * 2. Player's move: Allow the current player to select an empty cell (via click)
 * 3. Update the board: Place the player's marker (X or O) in the chosen cell if it's empty
 * 5. Click for Win or Draw: After each move check if the current player is win or the board is full
 * 6. Switch players: If no win/draw, switch turn to the other player
 * 7. End the game: if a players wins or there is a game, declare the result
 * 8. Reset the game
 * */
// Elements
const players = document.querySelectorAll("#player");
const resetBtn = document.querySelector(".reset-btn");
const gameStatusMsg = document.querySelector(".game-status-msg");
const buttons = document.querySelectorAll(".btn-tic-tac-toe");
const soundMove = new Audio("./sounds/move.wav");
const soundWin = new Audio("./sounds/win.wav");
const soundDraw = new Audio("./sounds/draw.wav");
const soundReset = new Audio("./sounds/reset.wav");

// audio volume
const soundVolume = 0.2;
soundMove.volume = soundVolume;
soundDraw.volume = soundVolume;
soundWin.volume = soundVolume;
soundReset.volume = soundVolume;

// Each cell is empty at the start
let board = ["", "", "", "", "", "", "", "", ""];

// Track players
let currentPlayer = "X"; // X starts first

// Winning Combinations
const winCombinations = [
  [0, 1, 2], // row 1
  [3, 4, 5], // row 2
  [6, 7, 8], // row 3
  [0, 3, 6], // column 1
  [1, 4, 7], // column 2
  [2, 5, 8], // column 3
  [2, 4, 6], // corner left
  [0, 4, 8], // Corner right
];

// Initialize the board's player move with empty string
function initGame() {
  // Remove disabled attribute from all buttons
  buttons.forEach((button) => button.removeAttribute("disabled"));
  // Show "" string to all the player
  players.forEach((player, i) => {
    player.innerText = board[i];
  });
  // Update the game status message
  gameStatusMsg.style.color = "black";
}
// Initialize the init function at the beginning
initGame();

const makeMove = function (player, i) {
  if (board[i] === "") {
    // Display current player when clicked
    player.textContent = currentPlayer;
    // Store the current player value to the board array index
    board[i] = currentPlayer;
    console.log(board);

    if (checkWin()) {
      // if checkWin() === true
      // Play winning sound
      soundWin.play();
      // Change the game status message
      gameStatusMsg.style.color = "green";
      // Change the text content
      gameStatusMsg.textContent = `${currentPlayer} won!`;

      // Disabled the or make the button not clickable
      buttons.forEach((button) => button.setAttribute("disabled", true));
    } else if (checkDraw()) {
      // If the match is draw
      // Play draw sound track
      soundDraw.play();
      // Update the game status
      gameStatusMsg.textContent = "Match is draw";
      gameStatusMsg.style.color = "orange";
    } else {
      // Switch the current player each time
      switchPlayer();
    }
  }
};

// 1. Display every player move when click event occurs
players.forEach((player, i) => {
  player.addEventListener("click", function () {
    // play sound
    soundMove.play();
    // Make move function
    makeMove(player, i); // passed the (player and i) parameters
  });
});

// Checking the winner by checkWin function
function checkWin() {
  return winCombinations.some((combination) =>
    combination.every((i) => board[i] === currentPlayer)
  );
}

// Switching the current player by switchPlayer
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Checking if the match is draw using checkDraw function
function checkDraw() {
  return board.every((cell) => cell !== "");
}

// Reset the game using resetGame function
function resetGame() {
  // Reset sound track
  soundReset.play();

  // Reassigned the board array index with empty string
  board = ["", "", "", "", "", "", "", "", ""];
  // Reassigned the current player to "X"
  currentPlayer = "X";

  // Update the game status message
  gameStatusMsg.textContent = "New Game";

  // Calling the initGame() function again
  initGame();
}

// Event listener with handler function for the reset button
resetBtn.addEventListener("click", resetGame);
