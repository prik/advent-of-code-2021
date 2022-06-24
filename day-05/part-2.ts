import { readFileSync } from 'fs';
import path from 'path';
import { Field } from './Field';
import { Coordinate, Line } from './Line';

interface FieldSize {
  width: number,
  height: number,
}

const ventLines: Line[] = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
  .split('\n')
  .map((line) => line
    .split(' -> ')
    .map((coordinate): Coordinate => ({
      x: Number(coordinate.split(',')[0]),
      y: Number(coordinate.split(',')[1]),
    })))
  .map(([start, end]) => new Line(start, end));

const fieldSize: FieldSize = ventLines.reduce((prevFieldSize, line) => ({
  width: Math.max(prevFieldSize.width, line.start.x + 1, line.end.x + 1),
  height: Math.max(prevFieldSize.height, line.start.y + 1, line.end.y + 1),
}), { width: 0, height: 0 });

const fieldGrid = new Array(fieldSize.height)
  .fill(null)
  .map(() => new Array(fieldSize.width).fill(0));

const field = new Field(fieldGrid, ventLines);

field.drawLines();

console.log(`More than 1 overlapping points: ${field.getHighOverlapPoints()}`);
