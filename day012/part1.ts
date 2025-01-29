import fs from "fs";

interface Summary {
    area: number;
    perimeter: number;
    letter: string;
}

interface LetterQueue {
    letter: string;
    coordinate: number;
}

class Solution {
    private map: string[][] = [];
    private maxRow: number = 0;
    private maxCol: number = 0;
    private letterCoordinates: Record<string, number[]> = {};
    private visited: number[] = [];
    private summary: Record<string, Summary> = {};
    private perimeter: number = 0;
    private explored: number[] = [];


    private fileToArray(filename: string) {
        return fs
            .readFileSync(filename, "utf8")
            .split("\n")
            .map((line) => {
                return line.split("");
            });
    }

    private convertCoordinateToNumber(row: number, col: number) {
        return row * 1000 + col;
    }

    private convertNumberToCoordinate(num: number) {
        return [Math.floor(num / 1000), num % 1000];
    }

    public IsOnNewIsland(row: number, col: number): boolean {
        const coordinateUnderInvestigation = this.map[row][col];
        const up = row > 0 ? this.map[row - 1][col] : null;
        const right = col < this.maxCol - 1 ? this.map[row][col + 1] : null;
        const down = row < this.maxRow - 1 ? this.map[row + 1][col] : null;
        const left = col > 0 ? this.map[row][col - 1] : null;

        return coordinateUnderInvestigation !== up && coordinateUnderInvestigation !== left;
    }

    public getAreaAndPerimeter(row: number, col: number): number {
        const current = this.map[row][col];
        this.visited.push(this.convertCoordinateToNumber(row, col));
        const up = row > 0 ? this.map[row - 1][col] : null;
        const right = col < this.maxCol ? this.map[row][col + 1] : null;
        const down = row < this.maxRow ? this.map[row + 1][col] : null;
        const left = col > 0 ? this.map[row][col - 1] : null;
        const perimeterHelper = [current !== up, current !== right, current !== down, current !== left];
        this.perimeter += perimeterHelper.filter((item) => item === true).length;

        if (
            (this.visited.includes(this.convertCoordinateToNumber(row - 1, col)) || current !== up) &&
            (this.visited.includes(this.convertCoordinateToNumber(row, col + 1)) || current !== right) &&
            (this.visited.includes(this.convertCoordinateToNumber(row + 1, col)) || current !== down) &&
            (this.visited.includes(this.convertCoordinateToNumber(row, col - 1)) || current !== left)
        ) {
            return 1;
        }
        // surrounding config:
        let ma = 0;
        let mi = 0;
        let mo = 0;
        let mu = 0;
        if (current === up && !this.visited.includes(this.convertCoordinateToNumber(row - 1, col))) {
            ma = this.getAreaAndPerimeter(row - 1, col);
        }

        if (current === right && !this.visited.includes(this.convertCoordinateToNumber(row, col + 1))) {
            mi = this.getAreaAndPerimeter(row, col + 1);
        }

        if (current === down && !this.visited.includes(this.convertCoordinateToNumber(row + 1, col))) {
            mo = this.getAreaAndPerimeter(row + 1, col);
        }

        if (current === left && !this.visited.includes(this.convertCoordinateToNumber(row, col - 1))) {
            mu = this.getAreaAndPerimeter(row, col - 1);
        }
        return ma + mi + mo + mu + 1;
    }

    /* Collection of each letter coordinate first appearing in the loop from left to right, top to bottom  */
    private collectLetterCoordinates(areaMap: string[][]) {
        for (let row = 0; row < areaMap.length; row++) {
            for (let col = 0; col < areaMap[row].length; col++) {
                if (!this.letterCoordinates[areaMap[row][col]]) {
                    this.letterCoordinates[areaMap[row][col]] = [];
                }
                let isConnected = false;
                for (let coord of this.letterCoordinates[areaMap[row][col]]) {
                    if(this.twoAreConnected(coord, this.convertCoordinateToNumber(row, col))) {
                        isConnected = true;
                        break;
                    }
                    this.visited = [];
                }

                this.visited = [];

                if (this.letterCoordinates[areaMap[row][col]] && this.letterCoordinates[areaMap[row][col]].length > 0 && isConnected) {
                    continue;
                } 

                this.letterCoordinates[areaMap[row][col]].push(this.convertCoordinateToNumber(row, col));
            }
        }
    }

    private twoAreConnected(coordinate: number, target: number): boolean {
        this.getAreaAndPerimeter(this.convertNumberToCoordinate(coordinate)[0], this.convertNumberToCoordinate(coordinate)[1])
        this.perimeter = 0;
        return this.visited.includes(target);
    }

    /* list of coordinates that form an island */

    public solve() {
        this.map = this.fileToArray("input.txt");
        this.maxRow = this.map.length - 1;
        this.maxCol = this.map[0].length - 1;
        this.collectLetterCoordinates(this.map);
        console.log(this.letterCoordinates);
        // const area = this.getAreaAndPerimeter(0, 0);

        // console.log(area);
        // console.log(this.perimeter)

        // below is the plan to execute
        let sum = 0
        for (const coords of Object.values(this.letterCoordinates)) {
            let area = 0;
            let perimeter = 0;
            for (const coordinate of coords) {
                const row = this.convertNumberToCoordinate(coordinate)[0];
                const col = this.convertNumberToCoordinate(coordinate)[1];
                area = this.getAreaAndPerimeter(row, col)
                perimeter = this.perimeter
                console.log(this.map[row][col], ': area -> ', area, '; perimeter ->', perimeter);
                sum += area * perimeter;
                this.perimeter = 0;
            }
            this.perimeter = 0;
        }

        console.log(sum)
        // console.log(this.map);
    }
}

const sol = new Solution();
sol.solve();
