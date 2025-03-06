import fs from 'fs';

class Solution {
    public fileToArray(filename: string) {
        return fs
            .readFileSync(`./${filename}`, "utf8")
            .split("\n")
            .map((line) => {
                return line.split("");
            });
    }
}

const sol = new Solution();
const sn = sol.fileToArray('sample.txt')
console.log(sn);
