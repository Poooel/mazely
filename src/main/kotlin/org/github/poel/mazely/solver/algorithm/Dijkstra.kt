package org.github.poel.mazely.solver.algorithm

import org.github.poel.mazely.entity.Cell
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.solver.Solver

class Dijkstra: Solver {
    override fun solve(grid: Grid): List<Cell> {
        val distances = grid.start.distances()
        val pathToGoal = distances.pathTo(grid.goal)
        return pathToGoal.cells()
    }
}
