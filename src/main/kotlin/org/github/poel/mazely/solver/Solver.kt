package org.github.poel.mazely.solver

import org.github.poel.mazely.entity.Cell
import org.github.poel.mazely.entity.Grid

interface Solver {
    fun solve(grid: Grid): List<Cell>
}
