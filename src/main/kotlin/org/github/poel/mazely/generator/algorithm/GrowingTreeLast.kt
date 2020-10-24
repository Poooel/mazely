package org.github.poel.mazely.generator.algorithm

import org.github.poel.mazely.entity.Cell
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Generator

class GrowingTreeLast: Generator {
    override fun on(grid: Grid): Grid {
        val active = mutableListOf<Cell>()
        active.add(grid.randomCell())

        while (active.any()) {
            val cell = active.last()
            val availableNeighbors = cell.neighbors().filter { it.links.isEmpty() }

            if (availableNeighbors.any()) {
                val neighbor = availableNeighbors.random()
                cell.link(neighbor)
                active.add(neighbor)
            } else {
                active.remove(cell)
            }
        }

        return grid
    }
}
