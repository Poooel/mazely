package org.github.poel.mazely.generator.algorithm

import org.github.poel.mazely.entity.Cell
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Generator
import kotlin.random.Random

class TruePrims: Generator {
    override fun on(grid: Grid): Grid {
        val active = mutableListOf<Cell>()
        active.add(grid.randomCell())

        val costs = mutableMapOf<Cell, Int>()
        grid.cells.flatten().forEach { costs[it] = Random.nextInt(100) }

        while (active.any()) {
            val cell = active.minByOrNull { costs[it]!! }
            val availableNeighbors = cell!!.neighbors().filter { it.links.isEmpty() }

            if (availableNeighbors.any()) {
                val neighbor = availableNeighbors.minByOrNull { costs[it]!! }
                cell.link(neighbor!!)
                active.add(neighbor!!)
            } else {
                active.remove(cell)
            }
        }

        return grid
    }
}