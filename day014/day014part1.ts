import { promises as fs } from "fs";

class Solution {
    private tiles: string[][] = [];

    private async createRobotMap() {
        let tiles: string[][] = [];
        for (let i = 0; i < 103; i++) {
            tiles.push(Array<string>(101).fill('.'))
        }
        this.tiles = tiles;
        await this.readCoordinates('day014input001.txt');
    }

    private putRobotOnTiles(position: number[]) {
        const [col, row] = position;
        if (this.tiles[row][col] !== '.') {
            this.tiles[row][col] = (Number(this.tiles[row][col]) + 1).toString();
        } else {
            this.tiles[row][col] = '1';
        }
    }

    private newLocation(initialPosition: number[], velocity: number[], seconds: number): number[] {
        let newPosition = [(initialPosition[0] + (velocity[0] * seconds)) % 101, (initialPosition[1] + (velocity[1] * seconds)) % 103]
        if (newPosition[0] < 0) {
            newPosition[0] = 101 + newPosition[0];
        } else if (newPosition[0] === 0) {
            newPosition[0] = 0;
        }

        if (newPosition[1] < 0) {
            newPosition[1] = 103 + newPosition[1];
        } else if (newPosition[1] === 0) {
            newPosition[1] = 0;
        }

        return newPosition;
    }

    private async readCoordinates(filename: string) {
        const file = await fs.open(filename);
        for await (const line of file.readLines()) {
            let position: number[] = [];
            let velocity: number[] = [];
            let lineValues = line.split('|');
            let positionInString = lineValues[0].split(',');
            let velocityInString = lineValues[1].split(',');
            for (const posStrVal of positionInString) {
                position.push(Number(posStrVal));
            }
            for (const velStrVal of velocityInString) {
                velocity.push(Number(velStrVal));
            }

            let newLocale = this.newLocation(position, velocity, 100);
            console.log(newLocale);
            this.putRobotOnTiles(position);
        }        
    }

    public async solve() {
        await this.createRobotMap();
    }
}

const sol = new Solution();
sol.solve();
