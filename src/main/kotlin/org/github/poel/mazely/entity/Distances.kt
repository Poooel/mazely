package org.github.poel.mazely.entity

data class Distances(
    private val root: Cell
) {
    private val cells: MutableMap<Cell, Int> = mutableMapOf()

    init {
        cells[root] = 0
    }

    fun getDistance(cell: Cell): Int? {
        return cells[cell]
    }

    fun setDistance(cell: Cell, distance: Int) {
        cells[cell] = distance
    }

    fun cells(): List<Cell> {
        return cells.keys.toList()
    }

    fun pathTo(goal: Cell): Distances {
        var current = goal

        val breadcrumbs = Distances(root)
        breadcrumbs.setDistance(current, cells[current]!!)

        while (current != root) {
            current.links.forEach { neighbor ->
                val neighborDistance = cells[neighbor]!!
                if (neighborDistance < cells[current]!!) {
                    breadcrumbs.setDistance(neighbor, neighborDistance)
                    current = neighbor
                }
            }
        }

        return breadcrumbs
    }

    fun max(): Pair<Cell, Int> {
        var maxDistanceCell = cells.keys.first()
        var maxDistance = cells.values.first()

        cells.entries.forEach {
            if (it.value > maxDistance) {
                maxDistanceCell = it.key
                maxDistance = it.value
            }
        }

        return Pair(maxDistanceCell, maxDistance)
    }
}
