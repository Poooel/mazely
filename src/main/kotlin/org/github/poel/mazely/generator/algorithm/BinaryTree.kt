package org.github.poel.mazely.generator.algorithm

import org.github.poel.mazely.entity.Cell
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Generator

class BinaryTree: Generator {
    override fun on(grid: Grid): Grid {
        grid.cells.forEach { row ->
            row.forEach { cell ->
                val neighbors = mutableListOf<Cell>()
                cell.north?.let { neighbors.add(it) }
                cell.east?.let { neighbors.add(it) }

                val neighbor = neighbors.randomOrNull()

                neighbor?.let { cell.link(it) }
            }
        }

        return grid
    }
}
