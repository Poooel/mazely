package org.github.poel.mazely.entity

data class Grid(
    val height: Int,
    val width: Int,
    var cells: List<List<Cell>> = emptyList()
) {
    private val chunkSize = 64

    init {
        prepareGrid()
        configureCells()
    }

    private fun prepareGrid() {
        cells = List(height) { y ->
            List(width) { x ->
                Cell(Coordinates(x, y))
            }
        }
    }

    private fun configureCells() {
        cells.forEach { row ->
            row.forEach { cell ->
                val x = cell.coordinates.x
                val y = cell.coordinates.y

                cell.north = this.cells.getOrNull(y - 1)?.getOrNull(x)
                cell.south = this.cells.getOrNull(y + 1)?.getOrNull(x)
                cell.west = this.cells.getOrNull(y)?.getOrNull(x - 1)
                cell.east = this.cells.getOrNull(y)?.getOrNull(x + 1)
            }
        }
    }

    private fun get(x: Int, y: Int): Cell? {
        return cells.getOrNull(x)?.getOrNull(y)
    }

    private fun randomCell(): Cell {
        return cells.random().random()
    }

    private fun size(): Int {
        return height * width
    }

    override fun toString(): String {
        var output = "+" + "---+".repeat(width) + "\n"

        cells.forEach { row ->
            var top = "|"
            var bottom = "+"

            row.forEach { cell ->
                val body = "   "
                val eastBoundary = if (cell.linked(cell.east)) " " else "|"
                top += body + eastBoundary

                val southBoundary = if (cell.linked(cell.south)) "   " else "---"
                val corner = "+"
                bottom += southBoundary + corner
            }

            output += top + "\n"
            output += bottom + "\n"
        }

        return output
    }

    @ExperimentalUnsignedTypes
    fun compress(): String {
        val binaryRepresentation = cells.map { row ->
            row.map { cell ->
                listOf(
                    if (cell.linked(cell.north)) "1" else "0",
                    if (cell.linked(cell.east)) "1" else "0"
                )
            }.flatten()
        }.flatten()
            .joinToString("")

        return binaryRepresentation
            .chunked(chunkSize)
            .map { it.padEnd(chunkSize, '0') }
            .map { it.toULong(2) }
            .joinToString(",")
    }

    @ExperimentalUnsignedTypes
    fun uncompress(compressedForm: String) {
        val binaryRepresentation = compressedForm
            .split(",")
            .joinToString("") { it.toULong().toString(2).padStart(Long.SIZE_BITS, '0') }

        var i = 0

        cells.forEach { row ->
            row.forEach { cell ->
                if (binaryRepresentation[i++] != '0') cell.north?.let { cell.link(it) }
                if (binaryRepresentation[i++] != '0') cell.east?.let { cell.link(it) }
            }
        }
    }
}
