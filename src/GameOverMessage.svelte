<script>
  import { fade, slide } from "svelte/transition";

  export let winner;
  export let symbols;
  export let gameOver;
  export let colors;
</script>

<!-- <p>winner = {winner}</p> -->
<!-- <div>GameOverMessage</div> -->

{#if gameOver}
  <div class="message-container">
    {#if winner}
      <p class="winner message" transition:slide>
        <strong style="color: {colors[winner]}">{symbols[winner]}</strong> Wins!
      </p>
    {:else}
      <p class="draw message" transition:slide>It's a <strong>Draw</strong>!</p>
    {/if}
  </div>
{/if}

<style>
  .message {
    font-size: 2em;
    margin: 0;
  }

  .message-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
