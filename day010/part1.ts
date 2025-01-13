import fs from 'fs'

class Solution {
    private fullmap: number[][] = [];
    private trailheads: number[][] = [];
    private summits: number[][] = [];
    private trailCandidates: Record<string, number[][]> = {};
    private hikingTrails: number[][] = [];
    private rowMax = 0;
    private colMax = 0;
    
    private fileToArray(filename: string) {
        return fs.readFileSync(`./${filename}`, 'utf8').split('\n').map(line => {
            return line.split('');
        });
    }

    private convertStrNumToNumber(fileArr: string[][]) {
        this.rowMax = fileArr.length - 1;
        return fileArr.map((row) => {
            if (!this.colMax) this.colMax = row.length - 1;
            return row.map((str) => {
                return Number(str);
            })
        })
    }

    private fileToNumArray(filename: string) {
        const fileArr = this.fileToArray(filename);
        const fileArrNum = this.convertStrNumToNumber(fileArr);
        return fileArrNum;
    }

    private getTrailheadsAndSummits(fileArr: number[][]) {
        for (const [rowIndex, rowValue] of fileArr.entries()) {
            for (const [colIndex, colValue] of rowValue.entries()) {
                if (colValue === 0) {
                    this.trailheads.push([rowIndex, colIndex]);
                }
                
                if (colValue === 9) {
                    this.summits.push([rowIndex, colIndex]);
                }
            }
        }
    }

    private mapHikingCandidates(trailheadMap: number[][], summitMap: number[][]) {
        for (const trailhead of trailheadMap) {
            const [row, col] = trailhead;
            this.trailCandidates[JSON.stringify(trailhead)] = [];
            for (const summit of summitMap) {
                if (Math.abs(row - summit[0]) + Math.abs(col - summit[1]) <= 9) {
                    this.trailCandidates[JSON.stringify(trailhead)].push(summit)
                } 
            }
        }
        return this.trailCandidates;
    }

    private isHikingTrail(trailhead: number[]) {
        const [row, col] = trailhead;
        const uphill = this.fullmap[row][col] + 1;
        const down = row < this.rowMax ? this.fullmap[row+1][col] : null
        const up = row > 0 ? this.fullmap[row-1][col] : null
        const right = col < this.colMax ? this.fullmap[row][col+1] : null;
        const left = col > 0 ? this.fullmap[row][col-1] : null;
        if (down && down === uphill) {
            if (uphill === 9) {
                this.hikingTrails.push([row+1, col])
            } else {
                this.isHikingTrail([row+1, col])
            }
        } else if (up && up === uphill) {
            if (uphill === 9) {
                this.hikingTrails.push([row-1, col])
            } else {
                this.isHikingTrail([row-1, col])
            }
        } else if (right && right === uphill) {
            if (uphill === 9) {
                this.hikingTrails.push([row, col+1])
            } else {
                this.isHikingTrail([row, col+1])
            }
        } else if (left && left === uphill) {
            if (uphill === 9) {
                this.hikingTrails.push([row, col-1])
            } else {
                this.isHikingTrail([row, col-1])
            }
        } else {
            return false;
        }
    }

    public solve() {
        // convert file to num matrix;s
        this.fullmap = this.fileToNumArray('sample.txt');
        
        // update coordinates 
        this.getTrailheadsAndSummits(this.fullmap);

        this.mapHikingCandidates(this.trailheads, this.summits)

        this.isHikingTrail([0, 2]);
    }
}

const sol = new Solution();
sol.solve();