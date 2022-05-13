import { writable } from "svelte/store";

function createGameStore() {
  const { subscribe, set, update } = writable();
  return {
    subscribe,
    set,
    update,
    moves: [],
    board: [],
    symbols: ["", "X", "O"],
    colors: ["", "var(--g-red)", "var(--g-blue)"],
    winner: 0,
    winLine: [],
    turn: () => (moves.length % 2) + 1,
    gameOver: () => winner || moves.length >= 9,
  };
}

export const gameStore = createGameStore();

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
