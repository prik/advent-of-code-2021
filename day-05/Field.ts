import { Line } from './Line';

export class Field {
  field: number[][];
  lines: Line[];

  constructor(field: number[][], lines: Line[]) {
    this.field = field;
    this.lines = lines;
  }

  drawLines(): void {
    this.lines.forEach((line) => line.coordinates.forEach((coord) => {
      this.field[coord.y][coord.x]++;
    }));
  }

  getHighOverlapPoints(): number {
    return this.field
      .flat()
      .filter((overlapCount) => overlapCount > 1)
      .length;
  }
}
