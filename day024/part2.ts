import fs from "fs";

class Solution {
    private input: Record<string, number> = {};
    private gateMap: (string | number)[][] = [];

    private inputFile(filename: string) {
        const input = fs.readFileSync(filename, "utf8");
        const pin = input.split("\n");
        const pinMap = pin.map((item) => item.split(": "));
        pinMap.forEach((item) => {
            this.input[item[0]] = Number(item[1]);
        });
    }
    private mapFile(filename: string) {
        const logic = fs.readFileSync(filename, "utf8");
        const gates = logic.split("\n");
        const gateToken = gates.map((gate) => {
            return gate.split(" ");
        });
        this.gateMap = gateToken;
    }

    andThem(num1: number, num2: number) {
        return num1 * num2;
    }

    xorThem(num1: number, num2: number) {
        return +(num1 !== num2);
    }

    orThem(num1: number, num2: number) {
        return +(num1 === 1 || num2 === 1);
    }

    public solve() {
        this.mapFile("map.txt");
        this.inputFile("input.txt");
        let carryOver = 0;
        for (let i = 0; i < 46; i++) {
            if (i < 10) {
                this.input[`z0${i}`] = this.input[`x0${i}`] + this.input[`y0${i}`] + carryOver;
                if (this.input[`z0${i}`] >= 2) {
                    this.input[`z0${i}`] = this.input[`z0${i}`] % 2;
                    carryOver = 1;
                } else {
                    carryOver = 0;
                }
            } else {
                this.input[`z${i}`] = this.input[`x${i}`] + this.input[`y${i}`] + carryOver;
                if (this.input[`z${i}`] >= 2) {
                    this.input[`z${i}`] = this.input[`z${i}`] % 2;
                    carryOver = 1;
                } else {
                    carryOver = 0;
                }
            }
        }

        console.log(this.input);

        const zMap = {
            z00: 0,
            z01: 1,
            z02: 1,
            z03: 1,
            z04: 0,
            z05: 0,
            z06: 1,
            z07: 1,
            z08: 0,
            z09: 1,
            z10: 0,
            z11: 0,
            z12: 0,
            z13: 1,
            z14: 0,
            z15: 0,
            z16: 0,
            z17: 1,
            z18: 0,
            z19: 0,
            z20: 0,
            z21: 1,
            z22: 0,
            z23: 0,
            z24: 0,
            z25: 1,
            z26: 0,
            z27: 1,
            z28: 1,
            z29: 1,
            z30: 1,
            z31: 1,
            z32: 1,
            z33: 1,
            z34: 1,
            z35: 1,
            z36: 0,
            z37: 1,
            z38: 1,
            z39: 0,
            z40: 0,
            z41: 0,
            z42: 0,
            z43: 0,
            z44: 1,
            z45: 1,
        };

        // below was for part1
        for (let i = 0; i < 1000; i++) {
            this.gateMap.map((gate) => {
                if (Number.isInteger(this.input[gate[0]])) {
                    gate[0] = this.input[gate[0]];
                }
                if (Number.isInteger(this.input[gate[2]])) {
                    gate[2] = this.input[gate[2]];
                }
                return gate;
            });

            // gateMap is updated, now you need to use connectives to figure out unknowns
            this.gateMap.map((gate) => {
                if (typeof gate[0] === "number" && typeof gate[2] === "number") {
                    if (gate[1] === "XOR") {
                        this.input[gate[4]] = this.xorThem(gate[0], gate[2]);
                    } else if (gate[1] === "OR") {
                        this.input[gate[4]] = this.orThem(gate[0], gate[2]);
                    } else if (gate[1] === "AND") {
                        this.input[gate[4]] = this.andThem(gate[0], gate[2]);
                    }
                }
            });
        }

        // this.gateMap.map((gate) => {
        //     console.log(gate);
        // })
        let binArr = Array(46).fill(0);
        Object.keys(this.input).forEach((key) => {
            if (key.startsWith("z")) {
                let index = Number(key.slice(1));
                binArr[index] = this.input[key];
            }
        });
        let sum = 0;
        binArr.forEach((item, index) => {
            sum += item * 2 ** index;
        });

        // console.log(sum);

    }

    public drawMapper() {
        this.mapFile("map.txt");
        let zLove = [];
        for (const eqn of this.gateMap) {
            let firstString = eqn[eqn.length -1]
            if (typeof firstString === 'string') {
                if (firstString.slice(0, 1) === 'z') {
                    zLove.push(eqn);
                }
            }
        }
        
        zLove.sort((a, b) => {
            let zVal1 = a[a.length - 1]
            let zVal2 = b[b.length - 1]
            if (typeof zVal1 === 'string' && typeof zVal2 === 'string') {
                if (Number(zVal1.slice(1)) > Number(zVal2.slice(1))) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                return 0;
            }

        })
        // ultimately this is the puzzle i need to figure out maybe?
        let gatePuzzle = [
            [ 'x00', 'XOR', 'y00', '->', 'z00' ],
            [ 'vsn', 'XOR', 'rhk', '->', 'z01' ],
            [ 'mbr', 'XOR', 'pwg', '->', 'z02' ],
            [ 'rsm', 'XOR', 'jdt', '->', 'z03' ],
            [ 'hfw', 'XOR', 'ggh', '->', 'z04' ],
            [ 'pvb', 'XOR', 'jbd', '->', 'z05' ],
            [ 'qrb', 'XOR', 'dck', '->', 'z06' ],
            [ 'hqs', 'XOR', 'jmb', '->', 'z07' ],
            [ 'vqp', 'AND', 'frr', '->', 'z08' ],
            [ 'dnc', 'XOR', 'pjb', '->', 'z09' ],
            [ 'qnq', 'XOR', 'ftn', '->', 'z10' ],
            [ 'gtv', 'XOR', 'gst', '->', 'z11' ],
            [ 'vmv', 'XOR', 'rmm', '->', 'z12' ],
            [ 'cqb', 'XOR', 'pbd', '->', 'z13' ],
            [ 'hgw', 'XOR', 'wss', '->', 'z14' ],
            [ 'mjj', 'XOR', 'gtc', '->', 'z15' ],
            [ 'djg', 'XOR', 'kpw', '->', 'z16' ],
            [ 'ppk', 'XOR', 'dgk', '->', 'z17' ],
            [ 'stq', 'XOR', 'dgj', '->', 'z18' ],
            [ 'wfs', 'XOR', 'grf', '->', 'z19' ],
            [ 'qgg', 'XOR', 'pbq', '->', 'z20' ],
            [ 'bnv', 'XOR', 'nhj', '->', 'z21' ],
            [ 'y22', 'AND', 'x22', '->', 'z22' ],
            [ 'fhs', 'XOR', 'fjs', '->', 'z23' ],
            [ 'qbr', 'XOR', 'qsr', '->', 'z24' ],
            [ 'dwm', 'XOR', 'cnn', '->', 'z25' ],
            [ 'fcn', 'XOR', 'pmf', '->', 'z26' ],
            [ 'rbr', 'XOR', 'frj', '->', 'z27' ],
            [ 'bst', 'XOR', 'stp', '->', 'z28' ],
            [ 'grd', 'OR', 'rpq', '->', 'z29' ],
            [ 'gbs', 'XOR', 'rrg', '->', 'z30' ],
            [ 'hvf', 'XOR', 'pfk', '->', 'z31' ],
            [ 'qvq', 'XOR', 'cdn', '->', 'z32' ],
            [ 'tsp', 'XOR', 'vng', '->', 'z33' ],
            [ 'vkv', 'XOR', 'bbc', '->', 'z34' ],
            [ 'jrp', 'XOR', 'mpj', '->', 'z35' ],
            [ 'qvh', 'XOR', 'fpc', '->', 'z36' ],
            [ 'tdm', 'XOR', 'pvc', '->', 'z37' ],
            [ 'vvm', 'XOR', 'dnk', '->', 'z38' ],
            [ 'pmq', 'XOR', 'ggj', '->', 'z39' ],
            [ 'qbn', 'XOR', 'dhr', '->', 'z40' ],
            [ 'jhf', 'XOR', 'pgs', '->', 'z41' ],
            [ 'cpr', 'XOR', 'vjq', '->', 'z42' ],
            [ 'ktr', 'XOR', 'qkd', '->', 'z43' ],
            [ 'rrq', 'XOR', 'gjw', '->', 'z44' ],
            [ 'fpg', 'OR', 'dqg', '->', 'z45' ]
        ]

        for (const zaq of gatePuzzle) {
            console.log(zaq);
        }
    }
}

const sol = new Solution();
sol.drawMapper();
