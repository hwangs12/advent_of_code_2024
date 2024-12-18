// the rule is that i cannot put this only on top of dot or the carrot.
import { promises as fs } from "fs";

export enum ParsingTypes {
    Matrix = "matrix",
    Array = "array",
}

class Solution {
    private matrix: string[][] = [];
    private horseLocation: number[] = [0, 0];

    async readFileAndParseTo(filename: string, parseTo: ParsingTypes) {
        if (parseTo === ParsingTypes.Matrix) {
            const matrix: string[][] = [];
            const row: string[] = [];
            const file = await fs.open(filename);
    
            for await (const line of file.readLines()) {
                let newRow = row.concat(line.split(""));
                matrix.push(newRow);
            }
    
            this.matrix = matrix;
            this.findHorseLocation(matrix);
        }
    }

    private findHorseLocation(matrix: string[][]) {
        let initialLocation = [0, 0];
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i].indexOf("^") !== -1) {
                initialLocation[0] = i;
                initialLocation[1] = matrix[i].indexOf("^");
            }
        }
        this.horseLocation = initialLocation;
    }

    private exited(matrix: string[][], horseLocation: number[]) {
        const row = horseLocation[0];
        const column = horseLocation[1];
        const cur = matrix[row][column];
        return (cur === '<' && column === 0) || (cur === '>' && column === matrix[0].length - 1) || (cur === "^" && row === 0) || (cur === "v" && row === matrix.length - 1);
    }

    countLoops(matrix: string[][]) {
        while (!exited(matrix, this.horseLocation)) {

        }
    }
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

function keepMoving(matrix: string[][], horseLocation: number[]): string[][] {
    const row = horseLocation[0];
    const column = horseLocation[1];
    const cur = matrix[row][column];
    const left = matrix[row][column - 1];
    const right = matrix[row][column + 1];
    const up = matrix[row - 1][column];
    const down = matrix[row + 1][column];
    if (cur === '>' && right !== '#') {
        matrix[row][column] = 'O'
        matrix[row][column+1] = '>'
    } else if (cur === '^' && up !== '#') {
        matrix[row][column] = 'O'
        matrix[row-1][column] = '^'
    } else if (cur === '<' && left !== '#') {
        matrix[row][column] = 'O'
        matrix[row][column-1] = '<'
    } else if (cur === 'v' && down !== '#') {
        matrix[row][column] = 'O'
        matrix[row+1][column] = 'v'
    }
    return matrix;
}

function moveUp(matrix: string[][], horseLocation: number[]): string[][] {
    const row = horseLocation[0];
    const column = horseLocation[1];
    matrix[row][column] = '+';
    matrix[row - 1][column] = '^';
    return matrix;
}

function moveDown(matrix: string[][], horseLocation: number[]): string[][] {
    const row = horseLocation[0];
    const column = horseLocation[1];
    matrix[row][column] = '+';
    matrix[row + 1][column] = 'v';
    return matrix;
}

function moveLeft(matrix: string[][], horseLocation: number[]): string[][] {
    const row = horseLocation[0];
    const column = horseLocation[1];
    matrix[row][column] = '+';
    matrix[row][column - 1] = '<';
    return matrix;
}

function moveRight(matrix: string[][], horseLocation: number[]): string[][] {
    const row = horseLocation[0];
    const column = horseLocation[1];
    matrix[row][column] = '+';
    matrix[row][column + 1] = '>';
    return matrix;
}

function hitWallOrMove(matrix: string[][], horseLocation: number[]): string[][]{
    const row = horseLocation[0];
    const column = horseLocation[1];
    const cur = matrix[row][column];
    const left = matrix[row][column - 1];
    const right = matrix[row][column + 1];
    const up = matrix[row - 1][column];
    const down = matrix[row + 1][column];
    if (up === '#' && cur === '^') {
        return moveRight(matrix, horseLocation);
    } else if (left === '#' && cur === '<') {
        return moveUp(matrix, horseLocation);
    } else if (right === '#' && cur === '>') {
        return moveDown(matrix, horseLocation);
    } else if (down === '#' && cur === 'v') {
        return moveLeft(matrix, horseLocation);
    } else {
        return keepMoving(matrix, horseLocation);
    }
}

function horseLooped(matrix: string[][], horseLocation: number[]): boolean {
    const row = horseLocation[0];
    const column = horseLocation[1];
    const cur = matrix[row][column];
    const left = matrix[row][column - 1];
    const right = matrix[row][column + 1];
    const up = matrix[row - 1][column];
    const down = matrix[row + 1][column];
    if (up === '+' && cur === '^') {
        return true;
    } else if (left === '+' && cur === '<') {
        return true;
    } else if (right === '+' && cur === '>') {
        return true;
    } else if (down === '+' && cur === 'v') {
        return true;
    } else {
        return false;
    }
}

function addWall(matrix: string[][], horseLocation: number[]): string[][] {
    const row = horseLocation[0];
    const column = horseLocation[1];
    const cur = matrix[row][column];
    if (cur === '^') {
        matrix[row - 1][column] = '#';
    } else if (cur === '<') {
        matrix[row][column-1] = '#';
    } else if (cur === '>') {
        matrix[row][column+1] = '#';
    } else if (cur === 'v') {
        matrix[row+1][column] = '#';
    } 
    return matrix;
}

function runTheGame(matrix: string[][], horseLocation: number[]) {
    
    matrix = addWall(matrix, horseLocation);    // added a wall but do not want to add another wall. 
    while (!exited(matrix, horseLocation)) {
        matrix = hitWallOrMove(matrix, horseLocation);
        const oldrow = horseLocation[0];
        const oldcol = horseLocation[1];
        const left = matrix[oldrow][oldcol - 1];
        const right = matrix[oldrow][oldcol + 1];
        const up = matrix[oldrow - 1][oldcol];
        const down = matrix[oldrow + 1][oldcol];
        if (left === '<') {
            horseLocation = [oldrow, oldcol-1];
        } else if (right === '>') {
            horseLocation = [oldrow, oldcol+1];
        } else if (up === '^') {
            horseLocation = [oldrow-1, oldcol];
        } else {
            horseLocation = [oldrow+1, oldcol];
        }
    }
    let numOs = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 'O') {
                numOs++;
            }
        }
    }
    // consider edge case
    numOs++;
    console.log(numOs);
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
        runTheGame(playBoard, initialLocation)
    }

;}

analyzeMatrix();
