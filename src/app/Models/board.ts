import { Box } from './box';

export class ValueSum {
  value;
  sum;
}

export class Board {
  private repeatVal = 3;
  private width = 9;
  private height = 9;
  private boxValues = [0, 1, 2, 3];
  table: Box[][] = [];
  rows: ValueSum[][] = [];
  columns: ValueSum[][] = [];

  constructor() {
    this.initTable();
  }

  getRand() {
    const range = this.boxValues.length - 1;
    return this.boxValues[Math.round(Math.random() * range)];
  }

  fillTable() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.table[i][j].value === null) {
          this.setValue(i, j, this.getRand());
        }
      }
    }
  }

  setValue(row: number, col: number, val) {
    const box = this.table[row][col];
    this.rows[row].find(x => x.value === box.value).sum--;
    this.columns[col].find(x => x.value === box.value).sum--;
    this.rows[row].find(x => x.value === val).sum++;
    this.columns[col].find(x => x.value === val).sum++;
    box.value = val;
  }

  initTable() {
    const s: ValueSum[] = this.boxValues.map(x => ({ value: x, sum: 0 }));
    const rowS = s.slice();
    rowS.push({ value: null, sum: this.width });
    const colS = s.slice();
    colS.push({ value: null, sum: this.height});

    for (let i = 0; i < this.height; i++) {
      const row: Box[] = [];
      for (let j = 0; j < this.width; j++) {
        row.push(new Box());
      }
      this.table.push(row);
    }
    // totals
    for (let i = 0; i < this.height; i++) {
      this.rows[i] = rowS.map(x => Object.assign(new ValueSum(), x));
    }
    for (let i = 0; i < this.width; i++) {
      this.columns[i] = colS.map(x => Object.assign(new ValueSum(), x));
    }
  }

  checkTable() {
    //rows
    this.rows.forEach((x, i) => {
      const selVals = x.filter(s => s.sum >= this.repeatVal);
      if (selVals.length) {
        this.table[i].forEach(b => {
          if (selVals.find(sv => sv.value === b.value)) {
            b.selected = true;
          }
        });
      }
    });
    //columns
    this.columns.forEach((x, i) => {
      const selVals = x.filter(s => s.sum >= this.repeatVal);
      if (selVals.length) {
        this.table.map(r => r[i]).forEach(b => {
          if (selVals.find(sv => sv.value === b.value)) {
            b.selected = true;
          }
        });
      }
    });

  }

  clearTable() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.table[i][j].selected) {
          this.table[i][j].selected = false;
          this.setValue(i, j, null);
        }
      }
    }
  }

  fallDown() {
    for (let i = 0; i < this.width; i++) {
      const col = this.table.map(x => x[i]);
      const emptyStack = [];
      for (let j = 0; j < this.height; j++) {
        const curIdx = this.height - j - 1;
        if (col[curIdx].value === null) {
          emptyStack.push({row: curIdx});
        } else if (emptyStack.length) {
          const emptyBox = emptyStack.shift();
          this.setValue(emptyBox.row, i, col[curIdx].value);
          this.setValue(curIdx, i, null);
          emptyStack.push({row: curIdx});
        }
      }
    }

  }
}
