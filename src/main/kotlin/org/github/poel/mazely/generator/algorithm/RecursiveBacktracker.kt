package org.github.poel.mazely.generator.algorithm

import org.github.poel.mazely.entity.Cell
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Generator
import kotlin.random.Random

class RecursiveBacktracker: Generator {
    override fun on(grid: Grid, random: Random): Grid {
        val stack = mutableListOf<Cell>()
        stack.add(grid.randomCell(random))

        while (stack.any()) {
            val current = stack.last()
            val neighbors = current.neighbors().filter { it.links.isEmpty() }

            if (neighbors.isEmpty()) {
                stack.removeLast()
            } else {
                val neighbor = neighbors.random(random)
                current.link(neighbor)
                stack.add(neighbor)
            }
        }

        return grid
    }
}
