<script>
  import { socket } from "./socket.js";
  let messages = [];
  let input = "";

  // Listen for Chat Messages
  socket.on("chat message", function (msg) {
    messages = [...messages, msg];
  });

  function handleSubmit(e) {
    socket.emit("chat message", input);
  }
</script>

<div class="container">
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" bind:value={input} />
  </form>
  {#each messages as message}
    <p>{message}</p>
  {/each}
</div>
