package org.github.poel.mazely.generator.algorithm

import org.github.poel.mazely.entity.Cell
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Generator

class Wilsons: Generator {
    override fun on(grid: Grid): Grid {
        val unvisited = mutableListOf<Cell>()
        unvisited.addAll(grid.cells.flatten())

        val first = unvisited.random()
        unvisited.remove(first)

        while (unvisited.any()) {
            var cell = unvisited.random()
            var path = mutableListOf(cell)

            while (unvisited.contains(cell)) {
                cell = cell.neighbors().random()
                val position = path.indexOf(cell)

                if (position != -1) {
                    path = path.slice(0 until position).toMutableList()
                } else {
                    path.add(cell)
                }
            }

            for (i in 0 until path.size - 1) {
                path[i].link(path[i + 1])
                unvisited.remove(path[i])
            }
        }

        return grid
    }
}
