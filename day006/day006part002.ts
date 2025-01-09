// the rule is that i cannot put this only on top of dot or the carrot.
import fs from "fs";

const maxRow = 130;
const maxCol = 130;
const debugMode = false;
const dirname = 'day006';
const filename = 'day006input000.txt';
const testfile = debugMode ? `${dirname}/${filename}` : filename
enum Direction {
    RIGHT = 'right',
    LEFT = 'left',
    UP = 'up',
    DOWN = 'down'
}

// requirement to find a loop
// 1. find a horse location to start
// 2. once started build a wall in way the horse goed
// 3. if there's a loop go to original location it started and keep going to original route
// 4. 

class Solution {
    private horseLocation: number[] = [0, 0];
    private horseShape: string = '';
    private corners: number[] = [];
    private loops: number = 0;
    private wallLocation: number[] = [];
    private wallCount: number = 0;
    private isAtCorner: boolean = false;
    private loopWalls: number[][] = [];
    private visited: number[] = [];

    private readTxtFileAndChangeTo2DArray(): string[][] {
        const file = fs.readFileSync(`./${testfile}`, 'utf8');
        const array = file.split('\n').map((row) => row.split(''));
        return array
    }

    private putWall(matrix: string[][]): string[][] {
        const [row, col] = this.horseLocation;
        if (this.horseShape === '^' && matrix[row-1][col] !== '#') {
            matrix[row-1][col] = '#';
            this.wallLocation = [row-1, col]
            this.wallCount++
        } else if (this.horseShape === '>' && matrix[row][col+1] !== '#') {
            matrix[row][col+1] = '#';
            this.wallLocation = [row, col+1]
            this.wallCount++
        } else if (this.horseShape === '<' && matrix[row][col-1] !== '#') {
            matrix[row][col-1] = '#';
            this.wallLocation = [row, col-1]
            this.wallCount++
        } else if (this.horseShape === 'v' && matrix[row+1][col] !== '#') {
            matrix[row+1][col] = '#'
            this.wallLocation = [row+1, col]
            this.wallCount++
        }
        return matrix;
    }

    private saveHorseLocationAndShape(matrix: string[][]) {
        for (let row=0; row < matrix.length; row++) {
            for (let col=0; col < matrix[row].length; col++) {
                if (this.isHorseAt(matrix, row, col)) {
                    this.horseLocation = [row, col];
                    this.horseShape = matrix[row][col];
                }
            }
        }
    }

    private isWithinRange(coordinate: number[]) {
        const [row, col] = coordinate;
        if ((row === maxRow - 1 && this.horseShape === 'v') || (col === maxCol - 1 && this.horseShape === '>') || (row === 0 && this.horseShape === '^') || (col === 0 && this.horseShape === '<')) {
            return false;
        }
        return row >= 0 && row < maxRow && col >= 0 && col < maxCol;
    }

    private wallIsPlaceable(coordinate: number[]) {
        const [row, col] = coordinate;
        if (row === 0 && this.horseShape === 'v') {
            return true;
        } else if (row === maxRow - 1 && this.horseShape === '^') {
            return true;
        } else if (col === 0 && this.horseShape === '>') {
            return true;
        } else if (col === maxCol-1 && this.horseShape === '<') {
            return true;
        } else {
            return row > 0 && row < maxRow - 1 && col > 0 && col < maxCol - 1;
        }
    }

    private isHorseAt(matrix: string[][], row: number, col: number): boolean {
        return matrix[row][col] === '^' || matrix[row][col] === '>' || matrix[row][col] === 'v' || matrix[row][col] === '<';
    }

    private recordCorner(row: number, col: number, horseShape: string) {
        let multiplier = 0;
        if (horseShape === '^') {
            multiplier = 1;
        } else if (horseShape === '>') {
            multiplier = 2;
        } else if (horseShape === 'v') {
            multiplier = 3;
        } else if (horseShape === '<') {
            multiplier = 4;
        }
        this.corners.push((row*1000 + col)*multiplier);
    }

    private moveHorse(matrix: string[][]) {
        const [row, col] = this.horseLocation;
        const horse = matrix[row][col];
        const up = matrix[row-1][col];
        const right = matrix[row][col+1];
        const down = matrix[row+1][col];
        const left = matrix[row][col-1];

        if (up === '#' && horse === '^') {
            matrix[row][col] = '>';
            this.horseLocation = [row, col]
            this.horseShape = '>'
            this.recordCorner(row, col, this.horseShape)
            
        } else if (right === '#' && horse === '>') {
            matrix[row][col] = 'v';
            this.horseLocation = [row, col]
            this.horseShape = 'v'
            this.recordCorner(row, col, this.horseShape)
            
        } else if (down === '#' && horse === 'v') {
            matrix[row][col] = '<';
            this.horseLocation = [row, col]
            this.horseShape = '<'
            this.recordCorner(row, col, this.horseShape)
            
        } else if (left === '#' && horse === '<') {
            matrix[row][col] = '^';
            this.horseLocation = [row, col]
            this.horseShape = '^'
            this.recordCorner(row, col,this.horseShape)
            
        } else if (up === '.' && horse === '^') {
            matrix[row][col] = '.';
            matrix[row-1][col] = '^';
            this.horseLocation = [row-1, col]
            this.horseShape = '^'
            
        } else if (right === '.' && horse === '>') {
            matrix[row][col] = '.';
            matrix[row][col+1] = '>';
            this.horseLocation = [row, col+1]
            this.horseShape = '>'
            
        } else if (down === '.' && horse === 'v') {
            matrix[row][col] = '.';
            matrix[row+1][col] = 'v';
            this.horseLocation = [row+1, col]
            this.horseShape = 'v'
            
        } else if (left === '.' && horse === '<') {
            matrix[row][col] = '.';
            matrix[row][col-1] = '<';
            this.horseLocation = [row, col-1]
            this.horseShape = '<'
            
        }

        return matrix;
    }

    private removeWallAndResetHorse(matrix: string[][], originalShape: string, originalLocation: number[]) {
        const [currentRow, currentCol] = this.horseLocation;
        matrix[currentRow][currentCol] = '.'
        const [originalRow, originalCol] = originalLocation;
        matrix[originalRow][originalCol] = originalShape;
        const [wallRow, wallCol] = this.wallLocation;
        matrix[wallRow][wallCol] = '.';
        this.horseLocation = [originalRow, originalCol];
        this.horseShape = originalShape;
        this.wallCount = 0;
        return matrix;
    }
    
    public countLoops() {
        let iteratorParent = 0;
        let iteratorChild = 0;
        let puzzleMap = this.readTxtFileAndChangeTo2DArray();
        this.saveHorseLocationAndShape(puzzleMap);
        while (this.isWithinRange(this.horseLocation) && this.wallIsPlaceable(this.horseLocation)) {
            iteratorParent++;
            // put a wall if it's not placed already
            let originalLocation = this.horseLocation;
            if (this.visited[this.visited.length - 1] !== this.horseLocation[0]*1000+originalLocation[1]) {
                this.visited.push(originalLocation[0]*1000+originalLocation[1]);
            }
            let originalHorseShape = this.horseShape;
            while (this.wallCount === 0) {
                puzzleMap = this.putWall(puzzleMap);
                originalHorseShape = this.horseShape;
                puzzleMap = this.moveHorse(puzzleMap);
            }
            if (this.wallCount !== 0 && this.visited.includes(this.wallLocation[0]*1000 + this.wallLocation[1])) {
                puzzleMap = this.removeWallAndResetHorse(puzzleMap, originalHorseShape, originalLocation);
                puzzleMap = this.moveHorse(puzzleMap);
                continue;
            }
            // move the horse
            while (this.isWithinRange(this.horseLocation) && this.wallIsPlaceable(this.horseLocation)) {
                puzzleMap = this.moveHorse(puzzleMap);
                iteratorChild++;
                // console.log(this.wallLocation, ' --- ', originalLocation, ' --- ', this.horseLocation, ' --- ', this.loops);
                let loopCandidateIndex1 = this.corners.slice(0, -4).indexOf(this.corners[this.corners.length - 1])
                let loopCandidateIndex2 = this.corners.slice(0, -4).indexOf(this.corners[this.corners.length - 2])
                let loopCandidateIndex3 = this.corners.slice(0, -4).indexOf(this.corners[this.corners.length - 3])
                let loopCandidateIndex4 = this.corners.slice(0, -4).indexOf(this.corners[this.corners.length - 4])
                
                if ((loopCandidateIndex1 - loopCandidateIndex2) === 1 && (loopCandidateIndex2 - loopCandidateIndex3) === 1 && (loopCandidateIndex3 - loopCandidateIndex4) === 1) {
                    this.loopWalls.push(this.wallLocation);
                    this.loops++;
                    break;
                }
            }
            console.log('=================================>', this.loops);
            iteratorChild = 0;
            this.corners = [];
            // remove wall and move back horse to its original location
            puzzleMap = this.removeWallAndResetHorse(puzzleMap, originalHorseShape, originalLocation);
            puzzleMap = this.moveHorse(puzzleMap);
        }
        console.log(this.loops);
    }
}

const sol = new Solution()
sol.countLoops()