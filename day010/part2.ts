import fs from 'fs'

class Solution {
    private fullmap: number[][] = [];
    private trailheads: number[][] = [];
    private summits: number[][] = [];
    private trailCandidates: Record<string, number[][]> = {};
    private hikingTrails: string[] = [];
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

    private listOfHikingTrails(trailhead: number[]) {
        const [row, col] = trailhead;
        const uphill = this.fullmap[row][col] + 1;
        const down = row < this.rowMax ? this.fullmap[row+1][col] : null
        const up = row > 0 ? this.fullmap[row-1][col] : null
        const right = col < this.colMax ? this.fullmap[row][col+1] : null;
        const left = col > 0 ? this.fullmap[row][col-1] : null;
        
        if (up !== uphill && right !== uphill && down !== uphill && left !== uphill) {
            return;
        }

        if (down && down === uphill) {
            if (down === 9) {
                this.hikingTrails.push(JSON.stringify([row+1, col]))
            } else {
                this.listOfHikingTrails([row+1, col])
            }
        }

        if (up && up === uphill) {
            if (up === 9) {
                this.hikingTrails.push(JSON.stringify([row-1, col]))
            } else {
                this.listOfHikingTrails([row-1, col])
            }
        }

        if (right && right === uphill) {
            if (right === 9) {
                this.hikingTrails.push(JSON.stringify([row, col+1]))
            } else {
                this.listOfHikingTrails([row, col+1])
            }
        }

        if (left && left === uphill) {
            if (left === 9) {
                this.hikingTrails.push(JSON.stringify([row, col-1]))
            } else {
                this.listOfHikingTrails([row, col-1])
            }
        }

        return;
    }

    public solve() {
        // convert file to num matrix;s
        this.fullmap = this.fileToNumArray('input.txt');
        
        // update coordinates 
        this.getTrailheadsAndSummits(this.fullmap);

        this.mapHikingCandidates(this.trailheads, this.summits)

        let total = 0;

        for (const trailhead of this.trailheads) {
            this.listOfHikingTrails(trailhead);
            console.log(trailhead, ': ', this.hikingTrails, ' ==> total: ', this.hikingTrails.length)
            total += this.hikingTrails.length
            this.hikingTrails = [];
        }

        console.log(total);
        
    }
}

const sol = new Solution();
sol.solve();