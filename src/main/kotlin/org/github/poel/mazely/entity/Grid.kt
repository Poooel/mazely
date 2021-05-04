package org.github.poel.mazely.entity

import java.math.BigInteger
import kotlin.random.Random

data class Grid(
    val height: Int,
    val width: Int,
    var cells: List<List<Cell>> = emptyList()
) {
    lateinit var start: Cell
    lateinit var goal: Cell

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

    fun get(x: Int, y: Int): Cell {
        return cells.get(y).get(x)
    }

    fun randomCell(random: Random? = null): Cell {
        return if (random != null) {
            cells.random(random).random(random)
        } else {
            cells.random().random()
        }
    }

    fun size(): Int {
        return height * width
    }

    fun setStartAndGoal(start: Coordinates, goal: Coordinates) {
        setStart(start)
        setGoal(goal)
    }

    private fun setStart(coordinates: Coordinates) {
        start = get(coordinates.x, coordinates.y)
    }

    private fun setGoal(coordinates: Coordinates) {
        goal = get(coordinates.x, coordinates.y)
    }

    override fun toString(): String {
        val binaryRepresentation = cells.map { row ->
            row.map { cell ->
                listOf(
                    if (cell.linked(cell.north)) "1" else "0",
                    if (cell.linked(cell.east)) "1" else "0"
                )
            }.flatten()
        }.flatten()
            .joinToString("")

        return BigInteger(binaryRepresentation, 2).toString()
    }

    fun from(stringRep: String) {
        val binaryRep = BigInteger(stringRep).toString(2)
        val paddedBinaryRep = padMissingZeroes(binaryRep)

        var i = 0

        cells.forEach { row ->
            row.forEach { cell ->
                if (paddedBinaryRep[i++] != '0') cell.north?.let { cell.link(it) }
                if (paddedBinaryRep[i++] != '0') cell.east?.let { cell.link(it) }
            }
        }
    }

    private fun padMissingZeroes(binaryRep: String): String {
        return binaryRep.padStart(size() * 2, '0')
    }
}
