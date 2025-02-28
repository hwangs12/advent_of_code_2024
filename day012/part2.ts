import fs from "fs";

class Solution {
    private map: string[][] = [];
    private letterCoordinates: Record<string, number[]> = {};
    private visited: number[] = [];
    private traversed: number[] = [];
    private queue: number[] = [];

    private fileToArray(filename: string) {
        return fs
            .readFileSync(filename, "utf8")
            .split("\n")
            .map((line) => {
                return line.split("");
            });
    }

    private getArea(coordinate: [number, number]): void {
        const [row, col] = coordinate;
        const current = this.map[row][col]
        const up = this.map[row-1] ? this.map[row-1][col] : undefined
        const right = this.map[row][col+1]
        const down = this.map[row+1] ? this.map[row+1][col] : undefined
        const left = this.map[row][col-1]
        

        
    }

    

    

    public solve() {
        this.map = this.fileToArray("sample.txt");
        console.log('getArea should give all areas starting from 0 0 ')
    }
}

const sol = new Solution();
sol.solve();
