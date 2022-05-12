<script>
  import GameOverMessage from "./GameOverMessage.svelte";

  import { socket } from "./socket.js";
  import GameBoard from "./GameBoard.svelte";

  // Player Symbols and Colors
  const symbols = ["", "X", "O"];
  const colors = ["", "var(--g-red)", "var(--g-blue)"];

  let moves = [];
  $: turn = (moves.length % 2) + 1;
  let board = Array(9).fill(0);

  let winner = 0;
  let winLine = [];
  $: moves, (winner = checkForWin());

  $: gameOver = winner || moves.length >= 9;

  function checkForWin() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winLine = lines[i];
        return board[a];
      }
    }
    return 0;
  }

  socket.on("new move", (move) => {
    board[move.index] = move.turn;
    moves = [...moves, move];
  });
</script>

<!-- <p>{JSON.stringify(moves)}</p> -->
<!-- <p>{JSON.stringify(turn)}</p> -->
<!-- <p>{JSON.stringify(board)}</p> -->
<div>
  <h1>Tic-Tac-Toe</h1>
  <GameOverMessage {winner} {symbols} {colors} {gameOver} />
  <GameBoard {moves} {board} {turn} {symbols} {colors} {gameOver} {winLine} {winner} />
</div>

<style>
  h1 {
    text-align: center;
  }
</style>
