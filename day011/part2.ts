import fs from 'fs'

class Solution {
    private stoneList: string[] = [];
    private numTo40: Record<string, number> = {'0': 10174278, '1': 15458147,'2': 14777945,'3': 14761601,'4': 14316637,'5': 12678459,'6': 13464170,'7': 13273744,'8': 12835708, '9': 13675794};
    private stoneMagic: string[] = [];
    private stoneDict: Record<string, number> = {};
    
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

    private findSum(stone: string, times: number): number {
        if (times === 0) {
            return 1;
        }

        if (stone === '0') {
            return this.findSum('1', times - 1)
        } else if (stone.length % 2 === 0) {
            return this.findSum(stone.substring(0, stone.length / 2), times - 1) + this.findSum(Number(stone.substring(stone.length / 2, stone.length)).toString(), times - 1);
        } else {
            return this.findSum((Number(stone) * 2024).toString(), times - 1)
        }
    }

    private blink(times: number) {
        for (let i = 0; i < times; i++) {
            this.magicalStoneUpdate()
        }
    }

    private blinkStone(stone: string, times: number): number {
        let stoneMagicList = [stone]
        let newMagic = []
        for (let i = 0; i < times; i++) {
            newMagic = [];
            for (let pebble of stoneMagicList) {
                if (Number(pebble) === 0) {
                    newMagic.push('1')
                } else if (pebble.length % 2 === 0) {
                    newMagic.push(pebble.substring(0, pebble.length / 2))
                    newMagic.push(Number(pebble.substring(pebble.length / 2, pebble.length)).toString())
                } else {
                    newMagic.push((Number(pebble) * 2024).toString()); 
                }
            }
            stoneMagicList = newMagic;
        }
        if (!this.stoneDict[stone]) {
            this.stoneDict[stone] = newMagic.length;
        }
        return newMagic.length;
    }

    private getSum(stringList: string[]) {
        return stringList.reduce((a, b) => Number(a) + Number(b), 0);
    }

    public solve() {
        this.stoneList = this.readFile('input.txt');
        this.blink(25);

        
        var file = fs.createWriteStream('array.txt');
        file.on('error', function(err) { /* error handling */ });
        this.stoneList.forEach(function(v) { file.write(v + '\n'); });
        file.end();
        console.log(this.stoneList)

        // iterate 25 blink for each stone and summarize 
        // for (const stone of this.stoneList) {
        //     this.blinkStone(stone, 25);
        // }

        // console.log(this.stoneDict)
        // the stone list has reached 35 remaining is to add them by their 40 aged number of stones
        // for (let stone of this.stoneList) {
        //     console.log(this.findSum(stone, 50));
        // }
    }
}

const sol = new Solution();
sol.solve();