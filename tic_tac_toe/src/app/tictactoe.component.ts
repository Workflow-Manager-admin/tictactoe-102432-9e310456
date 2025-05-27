import { Component } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-tictactoe',
  templateUrl: './tictactoe.component.html',
  styleUrls: ['./tictactoe.component.css'],
  standalone: true
})
export class TictactoeComponent {
  /** The 3x3 game board, flattened as an array of 9 elements. */
  board: (null | 'X' | 'O')[] = Array(9).fill(null);
  /** Is 'X' the current player? */
  xIsNext: boolean = true;
  /** Winner mark, or null if no winner yet. */
  winner: null | 'X' | 'O' = null;
  /** True if the game ended in a draw */
  draw: boolean = false;

  // PUBLIC_INTERFACE
  /** Returns the mark ('X'/'O') for the square at position i. */
  getMark(i: number): null | 'X' | 'O' {
    return this.board[i];
  }

  // PUBLIC_INTERFACE
  /** Returns the player whose turn it is ("X" or "O") */
  get currentPlayer(): 'X' | 'O' {
    return this.xIsNext ? 'X' : 'O';
  }

  // PUBLIC_INTERFACE
  /** Handles click event on grid cell at position i. */
  handleClick(i: number): void {
    // If winner already decided or the cell is not empty, ignore
    if (this.winner || this.board[i] !== null) {
      return;
    }
    this.board[i] = this.currentPlayer;
    this.winner = this.calculateWinner(this.board);
    if (!this.winner && this.board.every(cell => cell !== null)) {
      this.draw = true;
    }
    this.xIsNext = !this.xIsNext;
  }

  // PUBLIC_INTERFACE
  /** Resets the game to its initial state. */
  resetGame(): void {
    this.board = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = null;
    this.draw = false;
  }

  // PUBLIC_INTERFACE
  /**
   * Determines the winner on the board: returns 'X', 'O', or null.
   * @param board The current game board
   */
  calculateWinner(board: (null | 'X' | 'O')[]): null | 'X' | 'O' {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6]          // diags
    ];
    for (const [a, b, c] of lines) {
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a];
      }
    }
    return null;
  }
}
