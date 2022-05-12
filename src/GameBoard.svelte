<script>
  import { socket } from "./socket.js";
  import WinLine from "./WinLine.svelte";

  export let moves, turn, board, symbols, gameOver, colors, winLine, winner;

  function handleClick(index) {
    if (!board[index] && !gameOver) {
      socket.emit("new move", { index, turn });
    }
  }
</script>

<!-- <p>{JSON.stringify(moves)}</p> -->
<!-- <p>{JSON.stringify(turn)}</p> -->
<!-- <p>{JSON.stringify(board)}</p> -->

<div class="board" class:gameOver>
  <!-- <WinLine {board} winLine={[0, 1, 2]} /> -->
  {#each board as cell, i}
    <div class="cell" on:click={() => handleClick(i)}>
      <span class="cell-inner" class:move-preview={!symbols[cell]} style:color={colors[cell] || colors[turn]}>
        {symbols[cell] || symbols[turn]}
      </span>
    </div>
  {/each}
  <WinLine {board} {winLine} winnerColor={colors[winner]} />
</div>

<style lang="scss">
  .board {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    max-width: 300px;
    position: relative;
  }

  .cell {
    display: flex;
    flex: 1 1 calc(100% / 3 - 20px);
    aspect-ratio: 1;
    border: 1px solid #ccc;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      .move-preview {
        opacity: 0.5;
      }
    }
  }

  .move-preview {
    opacity: 0;
    transition: opacity 0.2s;
  }

  .move-preview,
  .cell-inner {
    font-size: 4rem;
    font-weight: bold;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .gameOver .move-preview {
    display: none;
  }
</style>
