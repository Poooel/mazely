package org.github.poel.mazely.generator.algorithm

import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Generator
import kotlin.random.Random

class RecursiveDivision: Generator {
    override fun on(grid: Grid, random: Random): Grid {
        grid.cells.flatten().forEach { cell ->
            cell.neighbors().forEach { neighbor ->
                cell.link(neighbor, false)
            }
        }

        divide(0, 0, grid.height, grid.width, grid, random)

        return grid
    }

    private fun divide(row: Int, column: Int, height: Int, width: Int, grid: Grid, random: Random) {
        if (height <= 1 || width <= 1) {
            return
        }

        if (height > width) {
            divideHorizontally(row, column, height, width, grid, random)
        } else {
            divideVertically(row, column, height, width, grid, random)
        }
    }

    private fun divideHorizontally(row: Int, column: Int, height: Int, width: Int, grid: Grid, random: Random) {
        val divideSouthOf = random.nextInt(height - 1)
        val passageAt = random.nextInt(width)

        for (x in 0 until width) {
            if (passageAt == x) continue

            val cell = grid.get(column + x, row + divideSouthOf)
            cell.south?.let { south -> cell.unlink(south) }
        }

        divide(row, column, divideSouthOf + 1, width, grid, random)
        divide(row + divideSouthOf + 1, column, height - divideSouthOf - 1, width, grid, random)
    }

    private fun divideVertically(row: Int, column: Int, height: Int, width: Int, grid: Grid, random: Random) {
        val divideEastOf = random.nextInt(width - 1)
        val passageAt = random.nextInt(height)

        for (y in 0 until height) {
            if (passageAt == y) continue

            val cell = grid.get(column + divideEastOf, row + y)
            cell.east?.let { east -> cell.unlink(east) }
        }

        divide(row, column, height, divideEastOf + 1, grid, random)
        divide(row, column + divideEastOf + 1, height, width - divideEastOf - 1, grid, random)
    }
}
