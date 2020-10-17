package org.github.poel.mazely.entity

object LongestPath {
    fun of(grid: Grid): Pair<Cell, Cell> {
        val start = grid.get(0, 0)
        val distances = start.distances()
        val (newStart, _) = distances.max()
        val newDistances = newStart.distances()
        val (goal, _) = newDistances.max()
        return Pair(newStart, goal)
    }
}
