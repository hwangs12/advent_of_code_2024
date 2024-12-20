// the rule is that i cannot put this only on top of dot or the carrot.
import { promises as fs } from "fs";

export enum ParsingTypes {
    Matrix = "matrix",
    Array = "array",
}

enum Direction {
    RIGHT = 'right',
    LEFT = 'left',
    UP = 'up',
    DOWN = 'down'
}

class Solution {
    private matrix: string[][] = [];
    private horseLocation: number[] = [0, 0]; // track horse location for moving within board
    private horseDirection: Direction = Direction.UP;
    private searchLocation: number[] = [0, 0]; // added member to search loops
    private searchDirection: Direction = Direction.UP;

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

    private withinBoundary(location: number[]): boolean {
        const [row, col] = location;
        return row >= 0 && row < 129 && col >= 0 && col < 129;
    }

    private addWall() {
        if (this.horseDirection === Direction.UP) {
            
        }
    }

    private turnCornerOrMoveForward() {
        const [row, col] = this.horseLocation;
        const up = this.matrix[row-1][col];
        const down = this.matrix[row+1][col];
        const left = this.matrix[row][col-1];
        const right = this.matrix[row][col+1];
        if (this.horseDirection === Direction.UP && up === '#') {

        } else if (this.horseDirection === Direction.LEFT && left === '#') {

        } else if (this.horseDirection === Direction.RIGHT && right === '#') {

        } else if (this.horseDirection === Direction.DOWN && down === '#') {

        }
    }


    public countLoops(matrix: string[][]) {
        let count = 0;
        let passedCorners: number[][] = [];
        this.readFileAndParseTo('./day006input000.txt', ParsingTypes.Matrix)    // updates initial horse location and files into matrix map
        while (this.withinBoundary(this.horseLocation)) {
            this.addWall();
            
        }

        
    }
}