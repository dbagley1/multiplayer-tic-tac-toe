<script>
  import { gameStore } from "./gameStore.js";
  import GameBoard from "./GameBoard.svelte";
  import GameOverMessage from "./GameOverMessage.svelte";

  import { socket } from "./socket.js";

  socket.on("move:add", (move) => {
    gameStore.update((gameObj) => {
      gameObj.board[move.index] = move.turn;
      gameObj.moves.push(move);
      return gameObj;
    });
  });
</script>

<div>
  <h1>Tic-Tac-Toe</h1>
  <GameOverMessage />
  <GameBoard />
</div>

<style>
  h1 {
    text-align: center;
    margin: 0.25em 0;
    line-height: 1.3em;
  }
</style>
