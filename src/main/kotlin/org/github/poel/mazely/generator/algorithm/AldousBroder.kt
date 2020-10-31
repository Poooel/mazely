package org.github.poel.mazely.generator.algorithm

import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Generator
import kotlin.random.Random

class AldousBroder: Generator {
    override fun on(grid: Grid, random: Random): Grid {
        var cell = grid.randomCell(random)
        var unvisited = grid.size() - 1

        while (unvisited > 0) {
            val neighbor = cell.neighbors().random(random)

            if (neighbor.links.isEmpty()) {
                cell.link(neighbor)
                unvisited--
            }

            cell = neighbor
        }

        return grid
    }
}
