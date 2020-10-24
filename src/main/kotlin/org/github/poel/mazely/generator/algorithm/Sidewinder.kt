package org.github.poel.mazely.generator.algorithm

import org.github.poel.mazely.entity.Cell
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Generator
import kotlin.random.Random

class Sidewinder: Generator {
    override fun on(grid: Grid): Grid {
        grid.cells.forEach { row ->
            val run = mutableListOf<Cell>()

            row.forEach { cell ->
                run.add(cell)

                val atEasternBoundary = cell.east == null
                val atNorthernBoundary = cell.north == null

                val shouldCloseOut = atEasternBoundary || (!atNorthernBoundary && Random.nextBoolean())

                if (shouldCloseOut) {
                    val member = run.random()
                    member.north?.let { member.link(it) }
                    run.clear()
                } else {
                    cell.east?.let { cell.link(it) }
                }
            }
        }

        return grid
    }
}
