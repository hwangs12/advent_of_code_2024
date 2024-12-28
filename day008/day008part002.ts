let map = [
    "...O.....0...............................p..k.....",
    "O.........o....w..T.........................p.....",
    "..................w..........oM...................",
    ".............................................Y....",
    "o.............T...........................z.....pk",
    ".....................................z..Y....t.F..",
    "...........T..........................F.......Y...",
    "...................A............z...k..M..........",
    "....O.........j....w.....................M........",
    "..........w....T..................M..k............",
    ".............5.............................F.....t",
    "......................A.............F....E........",
    ".....................S.........A..................",
    ".P................................................",
    "........................A...E.............x...t...",
    "............j.........................t.........x.",
    ".......................j.........................x",
    "....................................E........c....",
    ".............P.......E............................",
    "...............j..5...............q...............",
    "..............P..............................Qc...",
    "..........C..........s................c........x..",
    ".............C...r................................",
    ".....C......V..........q...................Q......",
    "...........yX.........q...................Q.......",
    ".....X....................e.............m.........",
    ".2.................e..7....m.......c..............",
    "......i..........e...K..............f....U...WQ...",
    "...X....................e....................V...Y",
    "...............5..X.....0.........................",
    "..C..i......5..3...sK......J.........f..B.........",
    "2............3.............0I...a.........BNb.....",
    ".........................K............m...........",
    ".r........3...............s....7...m.v...f.......b",
    "........3........7.....Iy..........q...b.N........",
    ".....R.1.......................n.....a.B.......VN.",
    "......R.........9...................a...W.........",
    "..........7.6................S....................",
    "..............r.......s...0........nb....W..f..B..",
    "...2...........I......K...........................",
    "..............................u...n............U..",
    "............r......y.............O............W...",
    ".......R..........v..u................N...V.......",
    "..........R.8..4.9..y........u....................",
    "...8...............v................J.............",
    ".....8..............4.........Z.........n.....J.U.",
    "...........4i....................Z..S.............",
    "..............9...........1.u.S................J..",
    "8...6....9..4......a........Z.1...................",
    "....................v..i.............Z............",
]

class Solution {
    private rowMax = 50
    private colMax = 50
    private antMap = map;
    private mapToArr: string[][] = [];
    private memberList: string[] = [];
    private memberToCoords: Record<string, number[][]> = {};
    private antinodes: number[][] = [];
    private antinodeCount = 0;
    
    public countAntinodes() {
        this.collectListOfMembers();
        for (const member of this.memberList) {
            this.memberToCoords[member] = this.saveCoordinates(member);
        }

        for (const [key, coordinates] of Object.entries(this.memberToCoords)) {
            for (let i = 0; i < coordinates.length; i++) {
                for (let j = i + 1; j < coordinates.length; j++) {
                    this.antinodeCoordinate(coordinates[i], coordinates[j], key);
                }
            }
        }
        // ISSUE: where antenaes are can be the same letter location. In this case, we don't place antenaes
        // convert map to array
        this.convertMapToArr();

        // map antinodes
        this.mapAntinodes();
        // console.log(this.antinodes.length);
        // override with the coordinates
        // for (const [key, coordinates] of Object.entries(this.memberToCoords)) {
        //     for (const [row, col] of coordinates) {
        //         this.mapToArr[row][col] = key;
        //     }
        // }
        
        // count antinodes
        for (const row of this.mapToArr) {
            for (const col of row) {
                if (col === '#') {
                    this.antinodeCount++;
                }
            }
        }
        console.log(this.antinodes);
        console.log(this.arrayToString(this.mapToArr));
        console.log(this.antinodeCount)
        // console.log(this.antinodeCount);
    }

    private convertMapToArr() {
        this.mapToArr = this.antMap.map((row) => {
            return row.split('');
        })
    }

    private mapAntinodes() {
        for (const coord of this.antinodes) {
            const [row, col] = coord;
            this.mapToArr[row][col] = '#';
        }
    }

    private arrayToString(array: string[][]): string {
        let bigstr = ''
        for (const row of array) {
            bigstr = bigstr.concat(row.join(''));
            bigstr = bigstr.concat('\n');
        }
        return bigstr;
    }

    private antinodeCoordinate(coordA: number[], coordB: number[], key: string): void {
        const [row1, col1] = coordA;
        const [row2, col2] = coordB;
        
        const rowDiff = row2 - row1;
        const colDiff = col2 - col1;
        let jump = 1;
        
        
        let antinodeA = [row1 - jump * rowDiff, col1 - jump * colDiff];
        let antinodeB = [row2 + jump * rowDiff, col2 + jump * colDiff];
        while (this.coordinateWithinRange(antinodeA[0], antinodeA[1]) || this.coordinateWithinRange(antinodeB[0], antinodeB[1])) {
            const [rowA, colA] = antinodeA;
            const [rowB, colB] = antinodeB;
            if (this.coordinateWithinRange(rowA, colA) && (this.antMap[rowA][colA] === '.' || this.antMap[rowA][colA] !== key)) {
                this.antinodes.push(antinodeA);
            }
            
            if (this.coordinateWithinRange(rowB, colB) && (this.antMap[rowB][colB] === '.' || this.antMap[rowB][colB] !== key)) {
                this.antinodes.push(antinodeB);
            }
            jump++;
            antinodeA = [row1 - jump * rowDiff, col1 - jump * colDiff];
            antinodeB = [row2 + jump * rowDiff, col2 + jump * colDiff];

        }
    }

    private coordinateWithinRange(row: number, col: number): boolean {
        return row < this.rowMax && row >= 0 && col < this.colMax && col >= 0;
    }

    private saveCoordinates(member: string): number[][] {
        let coordinates = [];
        for (let [row, str] of this.antMap.entries()) {
            for (let col=0; col < str.length; col++) {
                if (str[col] === member) {
                    coordinates.push([row, col]);
                }
            }
        }
        return coordinates;
    }

    private collectListOfMembers() {
        const memberList: string[] = [];
        for (let [row, str] of this.antMap.entries()) {
            for (let col=0; col < str.length; col++) {
                if (!memberList.includes(str[col]) && str[col] !== '.') {
                    memberList.push(str[col]);
                }
            }
        }
        this.memberList = memberList
    }
}

const sol = new Solution()
sol.countAntinodes();
// sol.convertMapToArr();
