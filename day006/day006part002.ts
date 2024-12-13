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

function exited(matrix: string[][], horseLocation: number[]) {
    const row = horseLocation[0];
    const column = horseLocation[1];
    const cur = matrix[row][column];
    return (cur === '<' && column === 0) || (cur === '>' && column === matrix[0].length - 1) || (cur === "^" && row === 0) || (cur === "v" && row === matrix.length - 1);
}

function keepMoving(matrix: string[][], horseLocation: number[]) {
    const row = horseLocation[0];
    const column = horseLocation[1];
    const cur = matrix[row][column];
    const left = matrix[row][column - 1];
    const right = matrix[row][column + 1];
    const up = matrix[row - 1][column];
    const down = matrix[row + 1][column];
    if (cur === '>' && right !== '#') {
        matrix[row][column] = '.'
        matrix[row][column+1] = '>'
    } else if (cur === '^' && up !== '#') {
        matrix[row][column] = '.'
        matrix[row-1][column] = '^'
    } else if (cur === '<' && left !== '#') {
        matrix[row][column] = '.'
        matrix[row][column-1] = '<'
    } else if (cur === 'v' && down !== '#') {
        matrix[row][column] = '.'
        matrix[row+1][column] = 'v'
    }
}

function moveUp(matrix: string[][], horseLocation: number[]): void {
    const row = horseLocation[0];
    const column = horseLocation[1];
    matrix[row][column] = '+';
    matrix[row - 1][column] = '^';
}

function moveDown(matrix: string[][], horseLocation: number[]): void {
    const row = horseLocation[0];
    const column = horseLocation[1];
    matrix[row][column] = '+';
    matrix[row + 1][column] = 'v';
}

function moveLeft(matrix: string[][], horseLocation: number[]): void {
    const row = horseLocation[0];
    const column = horseLocation[1];
    matrix[row][column] = '+';
    matrix[row][column - 1] = '<';
}

function moveRight(matrix: string[][], horseLocation: number[]): void {
    const row = horseLocation[0];
    const column = horseLocation[1];
    matrix[row][column] = '+';
    matrix[row][column + 1] = '>';
}

function hitWallOrMove(matrix: string[][], horseLocation: number[]): void{
    const row = horseLocation[0];
    const column = horseLocation[1];
    const cur = matrix[row][column];
    const left = matrix[row][column - 1];
    const right = matrix[row][column + 1];
    const up = matrix[row - 1][column];
    const down = matrix[row + 1][column];
    if (up === '#' && cur === '^') {
        moveRight(matrix, horseLocation);
    } else if (left === '#' && cur === '<') {
        moveUp(matrix, horseLocation);
    } else if (right === '#' && cur === '>') {
        moveDown(matrix, horseLocation);
    } else if (down === '#' && cur === 'v') {
        moveLeft(matrix, horseLocation);
    } else {
        keepMoving(matrix, horseLocation);
    }
}

function horseLooped(matrix: string[][], startingPoint: number[]): boolean {
    let cornerVisited: number[][] = [[0, 0]];
    while (cornerVisited) {}
    return false;
}

function runTheGame(matrix: string[][], horseLocation: number[]) {
    let move = 1;
    while (!exited(matrix, horseLocation)) {
        hitWallOrMove(matrix, horseLocation);
        move++;
    }
    console.log(move);
}

async function analyzeMatrix() {
    const playBoard = await readFileAndParseTo("./day006input000.txt", ParsingTypes.Matrix);
    let initialLocation = [0, 0]; // row and column;
    if (playBoard) {
        for (let i = 0; i < playBoard.length; i++) {
            if (playBoard[i].indexOf("^") !== -1) {
                initialLocation[0] = i;
                initialLocation[1] = playBoard[i].indexOf("^");
            }
        }
        runTheGame(playBoard, initialLocation)
    }

;}

analyzeMatrix();
