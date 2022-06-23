interface BingoNumber {
  value: number,
  marked: boolean,
}

export class BingoCard {
  rows: BingoNumber[][] = [];

  constructor(rawCardRows: string[]) {
    this.setRows(rawCardRows);
  }

  private setRows(rawCardRows: string[]) {
    rawCardRows.forEach((row: string) => this.rows.push(
      row
        .trim()
        .split(/\s+/)
        .map((number): BingoNumber => (
          { value: Number(number), marked: false }
        )),
    ));
  }

  markNumber(value: number): void {
    this.rows.forEach((row) => row.forEach((number) => {
      if (number.value === value) number.marked = true;
    }));
  }

  hasBingo(): boolean {
    return this.hasBingoRow() || this.hasBingoColumn();
  }

  getSumOfUnmarkedNumbers(): number {
    return this.rows
      .flat()
      .filter((bingoNumber) => !bingoNumber.marked)
      .reduce((prevSum, currentBingoNumber) => prevSum + currentBingoNumber.value, 0);
  }

  private hasBingoRow(): boolean {
    return this.rows.some((row) => row.every((number) => number.marked));
  }

  private hasBingoColumn(): boolean {
    const columns: BingoNumber[][] = [];

    for (let column = 0; column < this.rows.length; column++) {
      columns.push(this.rows.map((row) => row[column]));
    }

    return columns.some((column) => column.every((number) => number.marked));
  }
}
