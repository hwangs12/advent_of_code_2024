import fs from 'fs'

class Solution {
    private keyGrid: string[][][] = [];
    private keyLockPinMap: Record<string, number[][]> = {
        key: [],
        lock: [],
    };

    private fitCount = 0;


    public keyLock(chunk: string[][]) {
        return chunk[0].every((item) => item === '.');
    }

    public fileMap(filename: string) {
        const file = fs.readFileSync(filename, 'utf8')
        const row = file.split('\n')
        const joined = row.filter((item) => item !== '');
        let chuck: string[][][] = []
        let chunk: string[][] = [];
        let smallChunk: string[] = []
        joined.forEach((row, index) => {
            smallChunk.push(row);
            if (index % 7 == 6) {
                chunk.push(smallChunk);
                smallChunk = [];
            }
        })
        chuck = chunk.map((smallchunk) => {
            return smallchunk.map((row) => {
                return row.split('');
            })
        })

        return chuck;
        // chuck sample consists of chunks like this;
        /**
         * [ '.', '.', '.', '.', '.' ],
         * [ '.', '.', '#', '.', '.' ],
         * [ '#', '.', '#', '.', '.' ],
         * [ '#', '.', '#', '.', '.' ],
         * [ '#', '#', '#', '#', '.' ],
         * [ '#', '#', '#', '#', '.' ],
         * [ '#', '#', '#', '#', '#' ]
         */

    }

    private countPin(chunk: string[][]): number[] {
        let pinCountArray = Array(chunk[0].length).fill(0);
        chunk.forEach((row, ind) => {
            row.forEach((mem, jnd) => {
                if (mem === '#') {
                    pinCountArray[jnd] += 1;
                }
            })
        })
        return pinCountArray;
    }

    private keyLockFit(key: number[], lock: number[]) {
        for (let i = 0; i < key.length; i++) {
            if (key[i] + lock[i] > 7) {
                return false;
            }
        }
        return true;
    }

    public solve() {
        this.keyGrid = this.fileMap('input.txt');

        this.keyGrid.forEach((item, index) => {
            if (this.keyLock(item)) {
                this.keyLockPinMap.key.push(this.countPin(item))
            } else {
                this.keyLockPinMap.lock.push(this.countPin(item))
            };
        })

        this.keyLockPinMap.key.forEach((key) => {
            this.keyLockPinMap.lock.forEach((lock) => {
                if (this.keyLockFit(key, lock)) {
                    this.fitCount++;
                }
            })
        })

        console.log(this.fitCount);
    }
}

const sol = new Solution()
sol.solve();