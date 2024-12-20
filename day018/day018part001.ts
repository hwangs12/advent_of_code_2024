import { promises as fs } from "fs";

class Solution {
    tiles: string[][] = [];

    public async createRobotMap() {
        for (let i = 0; i <= 70; i++) {
            this.tiles.push(Array<string>(71).fill('.'))
        }
        await this.readCoordinates('day018input001.txt', this.tiles);
        let strView = this.changeArrayToStringView(this.tiles);
        console.log(strView);
    }

    private changeArrayToStringView(board: string[][]) {
        let bigstr = "";
        for (let row of board) {
            bigstr = bigstr.concat(row.join(" "), "\n");
        }
        return bigstr;
    }

    private async readCoordinates(filename: string, tiles: string[][]) {
        const file = await fs.open(filename);
        for await (const line of file.readLines()) {
            const lineToArray = line.split(',');
            const x = Number(lineToArray[0]);
            const y = Number(lineToArray[1]);
            tiles[x][y] = '#'
        }        
    }
}

const sol = new Solution();
sol.createRobotMap();