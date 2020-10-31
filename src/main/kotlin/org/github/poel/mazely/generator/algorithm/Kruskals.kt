package org.github.poel.mazely.generator.algorithm

import org.github.poel.mazely.entity.Cell
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Generator
import kotlin.random.Random

class Kruskals: Generator {
    override fun on(grid: Grid, random: Random): Grid {
        val state = State(grid)

        state.neighbors.shuffle(random)

        while (state.neighbors.any()) {
            val (left, right) = state.neighbors.removeLast()

            if (state.canMerge(left, right)) {
                state.merge(left, right)
            }
        }

        return grid
    }

    class State(grid: Grid) {
        val neighbors = mutableListOf<Pair<Cell, Cell>>()

        private val setForCell = mutableMapOf<Cell, Int>()
        private val cellsInSet = mutableMapOf<Int, MutableList<Cell>>()

        init {
            grid.cells.flatten().forEach { cell ->
                val set = setForCell.size

                setForCell[cell] = set
                cellsInSet.computeIfAbsent(set) { mutableListOf() }.add(cell)

                cell.south?.let { neighbors.add(Pair(cell, it)) }
                cell.east?.let { neighbors.add(Pair(cell, it)) }
            }
        }

        fun canMerge(left: Cell, right: Cell): Boolean {
            return setForCell[left] != setForCell[right]
        }

        fun merge(left: Cell, right: Cell) {
            left.link(right)

            val winner = setForCell[left]!!
            val loser = setForCell[right]!!
            val losers = cellsInSet[loser] ?: cellsInSet[right]!!

            losers.forEach { cell ->
                cellsInSet.getValue(winner).add(cell)
                setForCell[cell] = winner
            }

            cellsInSet.remove(loser)
        }
    }
}
