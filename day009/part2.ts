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
        return fs.readFileSync(path.resolve('./sample.txt'), 'utf8');
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
        console.log(fileArray)
        // create summary array where dot is summarized by the count and location
        // ex {count: 3, index: 0}
        let dotSummary: {count: number, index: number}[] = [];
        let dotElement = {index: 0, count: 0}
        for (let [index, val] of fileArray.entries()) {
            if (val === '.' && dotElement.count === 0) {
                dotElement.count++;
                dotElement.index = index;
            } else if (val === '.' && dotElement.count !== 0) {
                dotElement.count++;
            } else if (val !== '.' && dotElement.count === 0) {
                continue;
            } else {
                const elementCopy = {...dotElement};
                dotSummary.push(elementCopy);
                dotElement.count = 0;
                dotElement.index = 0;
            }
        }

        // last element push to dotSummary
        dotSummary.push({...dotElement})

        console.log(dotSummary)
        // number summary
        let numSummary: {number: number, count: number}[] = []
        let numElement = {number: -1, count: 0}
        for (let [index, val] of fileArray.entries()) {
            if (val !== '.' && numElement.number === -1) {
                numElement.number = val as number;
                numElement.count++
            } else if (val !== '.' && numElement.number === fileArray[index]) {
                numElement.count++
            } else if (val === '.') {
                continue;
            } else {
                const numElCopy = {...numElement}
                numSummary.push(numElCopy);
                numElement.count = 1;
                numElement.number = val as number;
            }
        }
        numSummary.push(numElement);

        numSummary.reverse();

        for (let i = 0; i < numSummary.length; i++) {
            console.log(fileArray);
            for (let j = 0; j < dotSummary.length; j++) {
                if (fileArray.indexOf(numSummary[i].number) < dotSummary[j].index) {
                    break;
                }

                if (numSummary[i].count <= dotSummary[j].count) {
                    // move file to the space available
                    fileArray.fill('.', fileArray.indexOf(numSummary[i].number), fileArray.indexOf(numSummary[i].number) + numSummary[i].count)
                    fileArray.fill(numSummary[i].number, dotSummary[j].index, dotSummary[j].index + numSummary[i].count)

                    // update space left
                    dotSummary[j].count = dotSummary[j].count - numSummary[i].count

                    // update dot location after space has been filled
                    dotSummary[j].index = dotSummary[j].index + numSummary[i].count

                    // update count for number that's moved.
                    numSummary[i].count = 0;

                    break;
                }
            }
        }

        /* for (let i = 0; i < dotSummary.length; i++) {
            for (let j = 0; j < numSummary.length; j++) {
                if (fileArray.indexOf(numSummary[j].number) < dotSummary[i].index) {
                    break;
                }

                if (numSummary[j].count === 0) {
                    continue;
                }

                if (numSummary[j].count <= dotSummary[i].count) {
                    // move file to the space available
                    fileArray.fill('.', fileArray.indexOf(numSummary[j].number), fileArray.indexOf(numSummary[j].number) + numSummary[j].count)
                    fileArray.fill(numSummary[j].number, dotSummary[i].index, dotSummary[i].index + numSummary[j].count)

                    // update space left
                    dotSummary[i].count = dotSummary[i].count - numSummary[j].count

                    // update dot location after space has been filled
                    dotSummary[i].index = dotSummary[i].index + numSummary[j].count

                    // update count for number that's moved.
                    numSummary[j].count = 0;
                } else {
                    continue;
                }
            }
        } */

        console.log(fileArray)


        
    }
}

const sol = new Solution();

sol.solve();

