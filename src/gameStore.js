import { writable } from "svelte/store";

export const createGameStore = () => {
  const gameObj = {
    moves: [],
    board: Array(9).fill(0),
    symbols: ["", "X", "O"],
    colors: ["", "var(--g-red)", "var(--g-blue)"],
    winLine: [],
    get turn() { return (this.moves.length % 2) + 1; },
    get gameOver() { return this.winner || this.moves.length >= 9; },
    get winner() {
      const board = this.board;
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          this.winLine = lines[i];
          return board[a];
        }
      }
      return 0;
    }
  };

  const { subscribe, set, update } = writable(gameObj);

  return {
    subscribe,
    set,
    update,
    addMove: (move) => {
      update((game) => {
        game.moves.push(move);
        return game;
      });
    },
    restartGame: () => {
      update((game) => {
        game.moves = [];
        game.board = Array(9).fill(0);
        return game;
      });
    },
  };
};

export const gameStore = createGameStore();

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
