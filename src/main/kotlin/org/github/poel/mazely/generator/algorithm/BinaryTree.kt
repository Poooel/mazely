package org.github.poel.mazely.generator.algorithm

import org.github.poel.mazely.entity.Cell
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Generator
import kotlin.random.Random

class BinaryTree: Generator {
    override fun on(grid: Grid, random: Random): Grid {
        grid.cells.forEach { row ->
            row.forEach { cell ->
                val neighbors = mutableListOf<Cell>()
                cell.north?.let { neighbors.add(it) }
                cell.east?.let { neighbors.add(it) }

                val neighbor = neighbors.randomOrNull(random)

                neighbor?.let { cell.link(it) }
            }
        }

        return grid
    }
}
