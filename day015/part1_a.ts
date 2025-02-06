import fs from "fs";

const instruction = `<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`;

let map: string[][] = [
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", ".", ".", "O", ".", ".", "O", ".", "O", "#"],
    ["#", ".", ".", ".", ".", ".", ".", "O", ".", "#"],
    ["#", ".", "O", "O", ".", ".", "O", ".", "O", "#"],
    ["#", ".", ".", "O", "@", ".", ".", "O", ".", "#"],
    ["#", "O", "#", ".", ".", "O", ".", ".", ".", "#"],
    ["#", "O", ".", ".", "O", ".", ".", "O", ".", "#"],
    ["#", ".", "O", "O", ".", "O", ".", "O", "O", "#"],
    ["#", ".", ".", ".", ".", "O", ".", ".", ".", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

enum Direction {
    UP = "^",
    RIGHT = ">",
    DOWN = "v",
    LEFT = "<",
}

enum MapObject {
    WALL = "#",
    ROBOT = "@",
    ROAD = ".",
    BOX = "O",
}

class Solution {
    currentCol = 0;
    currentRow = 0;
    private getRobotCoordinate(map: string[][]): number[] {
        for (const [row, rowVal] of map.entries()) {
            for (const [col, colVal] of rowVal.entries()) {
                if (colVal === MapObject.ROBOT) {
                    return [row, col];
                }
            }
        }
        return [0, 0];
    }

    private fileToArray(filename: string) {
        return fs
            .readFileSync(filename, "utf8")
            .split("\n")
            .map((line) => {
                return line.split("");
            });
    }

    private moveRobot(coord: number[], instruction: Direction) {
        const [row, col] = coord;
        const up = row - 1 >= 0 ? map[row - 1][col] : null;
        const right = map[0].length - 1 > col ? map[row][col + 1] : null;
        const down = map.length - 1 > row ? map[row + 1][col] : null;
        const left = col - 1 >= 0 ? map[row][col - 1] : null;

        if (instruction === Direction.UP && up === MapObject.ROAD) {
            map[row][col] = MapObject.ROAD;
            map[row - 1][col] = MapObject.ROBOT;
        } else if (instruction === Direction.RIGHT && right === MapObject.ROAD) {
            map[row][col] = MapObject.ROAD;
            map[row][col + 1] = MapObject.ROBOT;
        } else if (instruction === Direction.DOWN && down === MapObject.ROAD) {
            map[row][col] = MapObject.ROAD;
            map[row + 1][col] = MapObject.ROBOT;
        } else if (instruction === Direction.LEFT && left === MapObject.ROAD) {
            map[row][col] = MapObject.ROAD;
            map[row][col - 1] = MapObject.ROBOT;
        }
    }

    private searchRoad(coord: number[], instruction: Direction) {
        const [rowInd, colInd] = coord;
        let row = rowInd;
        let col = colInd;
        while (map[row][col] !== MapObject.WALL) {
            if (instruction === Direction.UP) {
                if (map[row][col] === MapObject.ROAD) {
                    // move all the box and robot
                    this.moveRobotAndBoxes(rowInd, colInd, row, col, Direction.UP);
                    break;
                } else {
                    row--;
                }
            } else if (instruction === Direction.RIGHT) {
                if (map[row][col] === MapObject.ROAD) {
                    // move all the box and robot
                    this.moveRobotAndBoxes(rowInd, colInd, row, col, Direction.RIGHT);
                    break;
                } else {
                    col++;
                }
            } else if (instruction === Direction.DOWN) {
                if (map[row][col] === MapObject.ROAD) {
                    // move all the box and robot down
                    this.moveRobotAndBoxes(rowInd, colInd, row, col, Direction.DOWN);
                    break;
                } else {
                    row++;
                }
            } else if (instruction === Direction.LEFT) {
                if (map[row][col] === MapObject.ROAD) {
                    // move all the box and robot to the left
                    this.moveRobotAndBoxes(rowInd, colInd, row, col, Direction.LEFT);
                    break;
                } else {
                    col--;
                }
            }
        }
    }

    private moveRobotAndBoxes(startRow: number, startCol: number, goalRow: number, goalCol: number, instruction: Direction) {
        if (instruction === Direction.UP) {
            while (goalRow < startRow) {
                this.currentRow = goalRow;
                this.currentCol = goalCol;
                map[goalRow][goalCol] = map[++goalRow][goalCol];
            }
        } else if (instruction === Direction.RIGHT) {
            while (goalCol > startCol) {
                this.currentRow = goalRow;
                this.currentCol = goalCol;
                map[goalRow][goalCol] = map[goalRow][--goalCol];
            }
        } else if (instruction === Direction.DOWN) {
            while (goalRow > startRow) {
                this.currentRow = goalRow;
                this.currentCol = goalCol;
                map[goalRow][goalCol] = map[--goalRow][goalCol];
            }
        } else if (instruction === Direction.LEFT) {
            while (goalCol < startCol) {
                this.currentRow = goalRow;
                this.currentCol = goalCol;
                map[goalRow][goalCol] = map[goalRow][++goalCol];
            }
        }
        map[startRow][startCol] = MapObject.ROAD;
    }

    public solve() {
        const [row, col] = this.getRobotCoordinate(map);
        this.currentRow = row;
        this.currentCol = col;
        for (const inst of instruction) {
            this.searchRoad([this.currentRow, this.currentCol], inst as Direction);
        }
        console.log(map)
        let sum = 0;
        for (let row = 0; row < map.length; row++) {
            for (let col = 0; col < map[row].length; col++) {
                if (map[row][col] === 'O') {
                    sum += 100 * row + col
                }
            }
        }
        console.log(sum)
    }
}

const sol = new Solution();
sol.solve();
