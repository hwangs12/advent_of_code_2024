import fs from 'fs'

class Solution {
    private trailheads: number[][] = [];
    private summits: number[][] = [];
    private trailCandidates: Record<string, number[][]> = {};
    
    private fileToArray(filename: string) {
        return fs.readFileSync(`./${filename}`, 'utf8').split('\n').map(line => {
            return line.split('');
        });
    }

    private convertStrNumToNumber(fileArr: string[][]) {
        return fileArr.map((row) => {
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

    private hikingCandidateMap(trailheadMap: number[][], summitMap: number[][]) {
        for (const trailhead of trailheadMap) {
            const [row, col] = trailhead;
            for (const summit of summitMap) {
                if (Math.abs(row - summit[0]) < 9 && Math.abs(col - summit[1])) {

                }
            }
        }
    }

    public solve() {
        // convert file to num matrix;s
        const numArr = this.fileToNumArray('sample.txt');
        
        // update coordinates 
        this.getTrailheadsAndSummits(numArr);
        console.log(this.trailheads);
        console.log(this.summits);
    }
}

const sol = new Solution();
sol.solve();