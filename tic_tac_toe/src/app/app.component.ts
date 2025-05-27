import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TictactoeComponent } from './tictactoe.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TictactoeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TicTacToe';
}
