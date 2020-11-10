import { Cell } from './cell'

export class Grid {
    constructor(height, width) {
        this.height = height
        this.width = width
        this.cells = []

        this.prepareGrid()
        this.configureCells()
    }

    prepareGrid() {
        for (let i = 0; i < this.height; i++) {
            let row = [];
            for (let j = 0; j < this.width; j++) {
                row.push(new Cell(j, i))
            }
            this.cells.push(row)
        }
    }

    configureCells() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const cell = this.cells[i][j]

                if (this.cells[i - 1]) {
                    cell.north = this.cells[i - 1][j]
                }

                if (this.cells[i + 1]) {
                    cell.south = this.cells[i + 1][j]
                }

                if (this.cells[i][j - 1]) {
                    cell.west = this.cells[i][j - 1]
                }

                if (this.cells[i][j + 1]) {
                    cell.east = this.cells[i][j + 1]
                }
            }
        }
    }

    uncompress(compressedMaze) {
        let splitCompressedMaze = compressedMaze.split(",")
        let binaryRepresentation = ""

        for (let i = 0; i < splitCompressedMaze.length; i++) {
            const element = splitCompressedMaze[i]
            const bigInt = BigInt(element)
            const binaryBigInt = bigInt.toString(2)
            const paddedBinaryBigInt = binaryBigInt.padStart(64, '0')

            binaryRepresentation += paddedBinaryBigInt
        }

        let k = 0;

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const cell = this.cells[i][j]

                if (binaryRepresentation.charAt(k++) != '0') {
                    if (cell.north) {
                        cell.link(cell.north)
                    }
                }

                if (binaryRepresentation.charAt(k++) != '0') {
                    if (cell.east) {
                        cell.link(cell.east)
                    }
                }
            }
        }
    }
}