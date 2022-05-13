<script>
  export let winnerColor;
  let width;
  let height;
  $: cellHeight = height / 3;
  $: cellWidth = width / 3;

  export let winLine;

  // Draw path from start cell to end cell
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  $: drawWinLine(winLine);

  function drawWinLine(winLine) {
    if (winLine.length === 3) {
      x1 = ((winLine[0] % 3) + 1) * cellHeight - cellHeight / 2;
      x2 = ((winLine[2] % 3) + 1) * cellHeight - cellHeight / 2;
      y1 = Math.ceil((winLine[0] + 1) / 3) * cellWidth - cellWidth / 2;
      y2 = Math.ceil((winLine[2] + 1) / 3) * cellWidth - cellWidth / 2;
    }
  }

  $: winPath = `M ${x1} ${y1} L ${x2} ${y2}`;
</script>

<div class="win-line" bind:clientWidth={width} bind:clientHeight={height}>
  <svg height="100%" width="100%">
    <!-- <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" /> -->
    <path class="path" d={winPath} style:--winner-color={winnerColor} />
    <!-- <path class="path" d={path} /> -->
  </svg>
</div>

<style lang="scss">
  .win-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .path {
    stroke-width: 20px;
    opacity: 0.5;
    fill: transparent;
    stroke: var(--winner-color);
    stroke-linecap: round;
  }
</style>
