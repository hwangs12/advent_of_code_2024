// the rule is that i cannot put this only on top of dot or the carrot.
import { promises as fs } from "fs";

export enum ParsingTypes {
    Matrix = "matrix",
    Array = "array",
}

async function readFileAndParseTo(filename: string, parseTo: ParsingTypes) {
    if (parseTo === ParsingTypes.Matrix) {
        const matrix: string[][] = [];
        const row: string[] = [];
        const file = await fs.open(filename);

        for await (const line of file.readLines()) {
            let newRow = row.concat(line.split(""));
            matrix.push(newRow);
        }

        return matrix;
    }
}

function exited(matrix: string[][], horseLocation: number[], direction: string) {
    let row = horseLocation[0];
    let column = horseLocation[1];
    return (direction === "left" && column === 0) || (direction === "right" && column === matrix[0].length - 1) || (direction === "up" && row === 0) || (direction === "down" && row === matrix.length);
}

function moveUp(matrix: string[][], horseLocation: number[]): void {
    const row = horseLocation[0];
    const column = horseLocation[1];
    matrix[row][column] = '.';
    matrix[row - 1][column] = '^';
}

function moveDown(matrix: string[][], horseLocation: number[]): void {
    const row = horseLocation[0];
    const column = horseLocation[1];
    matrix[row][column] = '.';
    matrix[row + 1][column] = '^';
}

function moveLeft(matrix: string[][], horseLocation: number[]): void {
    const row = horseLocation[0];
    const column = horseLocation[1];
    matrix[row][column] = '.';
    matrix[row][column - 1] = '^';
}

function moveRight(matrix: string[][], horseLocation: number[]): void {
    const row = horseLocation[0];
    const column = horseLocation[1];
    matrix[row][column] = '.';
    matrix[row][column + 1] = '^';
}

function hitWallAndMove(matrix: string[][], horseLocation: number[]): void{
    const row = horseLocation[0];
    const column = horseLocation[1];
    const left = matrix[row][column - 1];
    const right = matrix[row][column + 1];
    const up = matrix[row - 1][column];
    const down = matrix[row + 1][column];
    if (up === '#' && matrix[down[0]][down]) {

    }
}

function horseLooped(matrix: string[][], startingPoint: number[]): boolean {
    let cornerVisited: number[][] = [[0, 0]];
    while (cornerVisited) {}
    return false;
}

async function analyzeMatrix() {
    const playBoard = await readFileAndParseTo("./day006/day006input000.txt", ParsingTypes.Matrix);
    let initialLocation = [0, 0]; // row and column;
    if (playBoard) {
        for (let i = 0; i < playBoard.length; i++) {
            if (playBoard[i].indexOf("^") !== -1) {
                initialLocation[0] = i;
                initialLocation[1] = playBoard[i].indexOf("^");
            }
        }
    }
}

analyzeMatrix();
