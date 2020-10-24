package org.github.poel.mazely.generator.algorithm

import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Generator

class AldousBroder: Generator {
    override fun on(grid: Grid): Grid {
        var cell = grid.randomCell()
        var unvisited = grid.size() - 1

        while (unvisited > 0) {
            val neighbor = cell.neighbors().random()

            if (neighbor.links.isEmpty()) {
                cell.link(neighbor)
                unvisited--
            }

            cell = neighbor
        }

        return grid
    }
}
