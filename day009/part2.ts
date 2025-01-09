import fs from 'fs';
import path from 'path';

// index 0 is file 
// index 1 is free space
// even index is file
// odd index is free space
// if length is even, last index is length - 1 odd, hence free space
// if length is odd, last index is length - 1 even hence file;

class Solution {
    private readFileConvertToString() {
        return fs.readFileSync(path.resolve('./input.txt'), 'utf8');
    }

    public solve () {
        let fileString = this.readFileConvertToString();
        let fileArray: (string|number)[]
        // convert to disc space and free space with id.
        fileArray = fileString.split('').map((numChr, index) => {
            if (index % 2 === 0) {
                return Array(Number(numChr)).fill(Math.floor(index/2));
            } else {
                return Array(Number(numChr)).fill('.');
            }
        }).reduce((prev, cur, curIndex) => {
            let newArr = prev.concat(cur);
            return newArr;
        }, []);

        // fill the dots from left to right from the rightmost item
        while (fileArray[fileArray.length - 1] === '.') {
            fileArray.pop();
        }
        for (let i = 0; i < fileArray.length; i++) {
            if (fileArray[i] === '.') {
                fileArray[i] = fileArray[fileArray.length - 1];
                fileArray.pop()
                while (fileArray[fileArray.length - 1] === '.') {
                    fileArray.pop();
                }
            }
        }

        // provide sum
        const heysum = fileArray.reduce((prev, cur, index) => {
            let sum = Number(cur) * index + Number(prev)
            return sum
        }, 0)

        console.log(heysum);
    }
}

const sol = new Solution();

sol.solve();

