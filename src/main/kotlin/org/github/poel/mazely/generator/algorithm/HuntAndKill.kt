package org.github.poel.mazely.generator.algorithm

import org.github.poel.mazely.entity.Cell
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Generator
import kotlin.random.Random

class HuntAndKill: Generator {
    override fun on(grid: Grid, random: Random): Grid {
        var current: Cell? = grid.randomCell(random)

        while (current != null) {
            val unvisitedNeighbors = current.neighbors().filter { it.links.isEmpty() }

            if (unvisitedNeighbors.any()) {
                val neighbor = unvisitedNeighbors.random(random)
                current.link(neighbor)
                current = neighbor
            } else {
                current = null

                for (cell in grid.cells.flatten()) {
                    val visitedNeighbors = cell.neighbors().filter { it.links.any() }

                    if (cell.links.isEmpty() && visitedNeighbors.any()) {
                        current = cell

                        val neighbor = visitedNeighbors.random(random)
                        current.link(neighbor)

                        break
                    }
                }
            }
        }

        return grid
    }
}
