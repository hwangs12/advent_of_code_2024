import fs from "fs";

interface Summary {
    area: number;
    perimeter: number;
    letter: string;
}

interface LetterQueue {
    letter: string;
    coordinate: number;
}

enum Direction {
    UP = 'UP',
    RIGHT = 'RIGHT',
    DOWN = 'DOWN',
    LEFT = 'LEFT'
}

class Solution {
    private map: string[][] = [];
    private maxRow: number = 0;
    private maxCol: number = 0;
    private letterCoordinates: Record<string, number[]> = {};
    private visited: number[] = [];
    private summary: Record<string, Summary> = {};
    private perimeter: number = 0;
    private explored: number[] = [];


    private fileToArray(filename: string) {
        return fs
            .readFileSync(filename, "utf8")
            .split("\n")
            .map((line) => {
                return line.split("");
            });
    }

    

    /* list of coordinates that form an island */

    public solve() {
        this.map = this.fileToArray("sample2.txt");
        this.maxRow = this.map.length - 1;
        this.maxCol = this.map[0].length - 1;
        

    }
}

const sol = new Solution();
sol.solve();
