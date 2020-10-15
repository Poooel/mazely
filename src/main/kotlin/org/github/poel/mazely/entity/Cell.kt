package org.github.poel.mazely.entity

data class Cell(
    val coordinates: Coordinates,
    var north: Cell? = null,
    var south: Cell? = null,
    var east: Cell? = null,
    var west: Cell? = null,
    val links: MutableList<Cell> = mutableListOf(),
) {
    fun link(cell: Cell, bidirectional: Boolean = true) {
        links.add(cell)
        if (bidirectional) cell.link(this, false)
    }

    fun unlink(cell: Cell, bidirectional: Boolean = true) {
        links.remove(cell)
        if (bidirectional) cell.unlink(this, false)
    }

    fun linked(cell: Cell?): Boolean {
        return links.contains(cell)
    }

    fun neighbors(): List<Cell> {
        val neighbors = mutableListOf<Cell>()

        north?.let { neighbors.add(it) }
        south?.let { neighbors.add(it) }
        east?.let { neighbors.add(it) }
        west?.let { neighbors.add(it) }

        return neighbors
    }
}
