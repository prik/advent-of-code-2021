interface IBingoNumber {
  value: number,
  marked: boolean,
}

export class BingoCard {
  id: number;
  rows: IBingoNumber[][] = [];
  columns: IBingoNumber[][] = [];

  constructor(id: number, rawCardRows: string[]) {
    this.id = id;
    this.setRows(rawCardRows);
    this.setColumns();
  }

  private setRows(rawCardRows: string[]) {
    rawCardRows.forEach((row: string) => this.rows.push(
      row
        .trim()
        .split(/\s+/)
        .map((number): IBingoNumber => (
          { value: Number(number), marked: false }
        )),
    ));
  }

  private setColumns() {
    for (let column = 0; column < this.rows.length; column++) {
      this.columns.push(this.rows.map((row) => row[column]));
    }
  }

  markNumber(value: number): void {
    this.rows.forEach((row) => row.forEach((number) => {
      if (number.value === value) number.marked = true;
    }));
  }

  hasBingo(): boolean {
    return this.hasBingoRow() || this.hasBingoColumn();
  }

  private hasBingoRow(): boolean {
    return this.rows.some((row) => BingoCard.checkBingo(row));
  }

  private hasBingoColumn(): boolean {
    return this.columns.some((row) => BingoCard.checkBingo(row));
  }

  private static checkBingo(numbers: IBingoNumber[]) {
    return numbers.every((number) => number.marked);
  }

  getSumOfUnmarkedNumbers(): number {
    return this.rows
      .flat()
      .filter((bingoNumber) => !bingoNumber.marked)
      .reduce((prevSum, currentBingoNumber) => prevSum + currentBingoNumber.value, 0);
  }
}
