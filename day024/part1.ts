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
            if (key.startsWith('z')) {
                let index = Number(key.slice(1))
                binArr[index] = this.input[key];
            }
        })
        let sum = 0;
        binArr.forEach((item, index) => {
            sum += item * (2 ** index);
        })

        console.log(sum);

    }
}

const sol = new Solution();
sol.solve();
