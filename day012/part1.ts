import fs from 'fs'

class Solution {
    private map: string[][] = []
    private letterCoordinates: Record<string, number> = {}
    private fileToArray(filename: string) {
       return fs.readFileSync(filename, 'utf8').split('\n').map((line) => {
            return line.split('')
        });
    }

    private convertCoordinateToNumber(coordinate: number[]) {
        return coordinate[0] * 1000 + coordinate[1];
    }

    private convertNumberToCoordinate(num: number) {
        return [Math.floor(num/1000), num % 1000]
    }

    /* Collection of each letter coordinate first appearing in the loop from left to right, top to bottom  */
    private collectLetterCoordinates() {
        
    }

    private getArea(startingCoordinate: number) {

    }

    public solve() {

    }
}

const sol = new Solution()
console.log(sol.solve())