import fs from 'fs'

class Solution {
    private stoneList: string[] = [];
    
    private readFile(filename: string) {
        return fs.readFileSync(`./${filename}`, 'utf8').split(' ');
    }

    private magicalStoneUpdate() {
        let newStoneList = []
        for (let stone of this.stoneList) {
            if (Number(stone) === 0) {
                newStoneList.push('1')
            } else if (stone.length % 2 === 0) {
                newStoneList.push(stone.substring(0, stone.length / 2))
                newStoneList.push(Number(stone.substring(stone.length / 2, stone.length)).toString())
            } else {
                newStoneList.push((Number(stone) * 2024).toString()); 
            }
        }
        this.stoneList = newStoneList;
    }

    private blink(times: number) {
        for (let i = 0; i < times; i++) {
            this.magicalStoneUpdate()
        }
    }

    private getSum(stringList: string[]) {
        return stringList.reduce((a, b) => Number(a) + Number(b), 0);
    }

    public solve() {
        // convert file to num matrix;s
        this.stoneList = this.readFile('input.txt');
        
        this.blink(25);
        
        console.log(this.stoneList.length)
    }
}

const sol = new Solution();
sol.solve();