<script>
  import { fade, slide } from "svelte/transition";
  import { gameStore } from "./gameStore";

  $: ({ winner, gameOver, colors, symbols } = $gameStore);
</script>

<!-- <p>winner = {winner}</p> -->

{#if gameOver}
  <div class="message-container">
    <p class="message" transition:slide>
      {#if winner}
        <span><strong style="color: {colors[winner]}">{symbols[winner]}</strong> Wins!</span>
      {:else}
        <span>It's a <strong>Draw</strong>!</span>
      {/if}
    </p>
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
