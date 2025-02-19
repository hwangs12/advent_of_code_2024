import fs from 'fs'

class Solution {
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

        // chuck sample
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
}

const sol = new Solution()
sol.fileMap('input.txt');