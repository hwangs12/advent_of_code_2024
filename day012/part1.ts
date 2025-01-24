import fs from "fs";

class Solution {
    private map: string[][] = [];
    private maxRow: number = 0;
    private maxCol: number = 0;
    private letterCoordinates: Record<string, number[]> = {};
    private visited: number[] = [];
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

    public getArea(row: number, col: number): number {
        const current = this.map[row][col];
        this.visited.push(this.convertCoordinateToNumber(row, col));
        const up = row > 0 ? this.map[row - 1][col] : null;
        const right = col < this.maxCol - 1 ? this.map[row][col + 1] : null;
        const down = row < this.maxRow - 1 ? this.map[row + 1][col] : null;
        const left = col > 0 ? this.map[row][col - 1] : null;
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
            ma = 1 + this.getArea(row - 1, col);
        } 
        
        if (current === right && !this.visited.includes(this.convertCoordinateToNumber(row, col + 1))) {
            mi = 1 + this.getArea(row, col + 1);
        } 
        
        if (current === down && !this.visited.includes(this.convertCoordinateToNumber(row + 1, col))) {
            mo = 1 + this.getArea(row + 1, col);
        } 
        
        if (current === left && !this.visited.includes(this.convertCoordinateToNumber(row, col - 1))) {
            mu = 1 + this.getArea(row, col - 1);
        } 
        return ma + mi + mo + mu - 1;
    }

    /* Collection of each letter coordinate first appearing in the loop from left to right, top to bottom  */
    private collectLetterCoordinates(areaMap: string[][]) {
        for (let row = 0; row < areaMap.length; row++) {
            for (let col = 0; col < areaMap[row].length; col++) {
                if (this.letterCoordinates[areaMap[row][col]] && this.letterCoordinates[areaMap[row][col]].length > 0) {
                    continue;
                }
                this.letterCoordinates[areaMap[row][col]] = [this.convertCoordinateToNumber(row, col)];
            }
        }
    }

    private getPerimeter(startingCoordinate: number) {}

    public solve() {
        this.map = this.fileToArray("sample.txt");
        this.maxRow = this.map.length - 1;
        this.maxCol = this.map[0].length - 1;
        this.collectLetterCoordinates(this.map);
        const area = this.getArea(0, 0);
        console.log(area);
    }
}

const sol = new Solution();
sol.solve();
