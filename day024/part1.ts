import fs from 'fs'

class Solution {
    private input: Record<string, number> = {}; 
    private map = []

    private inputFile(filename: string) {
        const input = fs.readFileSync(filename, 'utf8')
        const pin = input.split('\n');
        const pinMap = pin.map((item) => item.split(': '));
        pinMap.forEach((item) => {
            this.input[item[0]] = Number(item[1])
        })
    }
    private mapFile(filename: string) {
        const logic = fs.readFileSync(filename, 'utf8')
        const gates = logic.split('\n');
        const gateToken = gates.map((gate) => {
            return gate.split(' ')
        })
        
    }

    public solve() {
        this.mapFile('map.txt')
    }
}

const sol = new Solution();
sol.solve();