package org.github.poel.mazely.generator.algorithm

import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Generator
import kotlin.random.Random

class RecursiveDivision: Generator {
    override fun on(grid: Grid): Grid {
        grid.cells.flatten().forEach { cell ->
            cell.neighbors().forEach { neighbor ->
                cell.link(neighbor, false)
            }
        }

        divide(0, 0, grid.height, grid.width, grid)

        return grid
    }

    private fun divide(row: Int, column: Int, height: Int, width: Int, grid: Grid) {
        if (height <= 1 || width <= 1) {
            return
        }

        if (height > width) {
            divideHorizontally(row, column, height, width, grid)
        } else {
            divideVertically(row, column, height, width, grid)
        }
    }

    private fun divideHorizontally(row: Int, column: Int, height: Int, width: Int, grid: Grid) {
        val divideSouthOf = Random.nextInt(height - 1)
        val passageAt = Random.nextInt(width)

        for (x in 0 until width) {
            if (passageAt == x) continue

            val cell = grid.get(column + x, row + divideSouthOf)
            cell.south?.let { south -> cell.unlink(south) }
        }

        divide(row, column, divideSouthOf + 1, width, grid)
        divide(row + divideSouthOf + 1, column, height - divideSouthOf - 1, width, grid)
    }

    private fun divideVertically(row: Int, column: Int, height: Int, width: Int, grid: Grid) {
        val divideEastOf = Random.nextInt(width - 1)
        val passageAt = Random.nextInt(height)

        for (y in 0 until height) {
            if (passageAt == y) continue

            val cell = grid.get(column + divideEastOf, row + y)
            cell.east?.let { east -> cell.unlink(east) }
        }

        divide(row, column, height, divideEastOf + 1, grid)
        divide(row, column + divideEastOf + 1, height, width - divideEastOf - 1, grid)
    }
}
