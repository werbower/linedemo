import { Component } from '@angular/core';
import { Board } from './Models/board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lines';
  board: Board = new Board();
  commands = ['fillTable', 'checkTable', 'clearTable', 'fallDown'];
  curCommand = 0;

  constructor() {}

  curStep() {
    if (this.curCommand >= this.commands.length) {
      this.curCommand -= this.commands.length;
    }
    return this.commands[this.curCommand];
  }
  doStep() {
    if (this.curCommand >= this.commands.length) {
      this.curCommand -= this.commands.length;
    }
    this.board[this.commands[this.curCommand]]();
    this.curCommand++;
  }



}
