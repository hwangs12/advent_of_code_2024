import fs from 'fs'

class Solution {
    private map: string[][] = []
    private letterCoordinates: Record<string, number[]> = {}
    private fileToArray(filename: string) {
       return fs.readFileSync(filename, 'utf8').split('\n').map((line) => {
            return line.split('')
        });
    }

    private convertCoordinateToNumber(row: number, col: number) {
        return row * 1000 + col;
    }

    private convertNumberToCoordinate(num: number) {
        return [Math.floor(num/1000), num % 1000]
    }

    private neighborIsSame(row: number, col: number): boolean {
        const coordinateUnderInvestigation = this.map[row][col]
        const up = this.map[row-1][col]
        const right = this.map[row][col+1]
        const down
        const left
    }

    /* Collection of each letter coordinate first appearing in the loop from left to right, top to bottom  */
    private collectLetterCoordinates(areaMap: string[][]) {
        for (let row=0; row < areaMap.length; row++) {
            for (let col=0; col < areaMap[row].length; col++) {
                if (this.letterCoordinates[areaMap[row][col]]) {
                    if (this.neighborIsSame(row, col)) {

                    }
                    continue;
                } 
                this.letterCoordinates[areaMap[row][col]] = this.convertCoordinateToNumber(row, col);
            }
        }
    }

    private getArea(startingCoordinate: number) {

    }

    private getPerimeter(startingCoordinate: number) {

    }

    public solve() {
        this.map = this.fileToArray('sample.txt');
        this.collectLetterCoordinates(this.map);
        console.log(this.letterCoordinates)
    }
}

const sol = new Solution()
console.log(sol.solve())