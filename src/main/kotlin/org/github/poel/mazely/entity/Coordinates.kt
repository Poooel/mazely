package org.github.poel.mazely.entity

import org.github.poel.mazely.render.path.Line

data class Coordinates(
    val x: Int,
    val y: Int
) {
    fun contiguous(line: Line): Boolean {
        return this == line.lineStart || this == line.lineEnd
    }

    override fun toString(): String {
        return "($x,$y)"
    }
}

operator fun Coordinates.plus(other: Coordinates) = Coordinates(x = x + other.x, y = y + other.y)

operator fun Coordinates.compareTo(other: Coordinates): Int {
    return if (x == other.x && y == other.y) {
        0
    } else if (x >= other.x && y >= other.y) {
        1
    } else {
        -1
    }
}

fun List<Coordinates>.max(): Coordinates {
    if (this.isEmpty()) {
        throw Exception("List is empty.")
    } else {
        var max = Coordinates(Int.MIN_VALUE, Int.MIN_VALUE)
        this.forEach { if (it > max) max = it}
        return max
    }
}

fun List<Coordinates>.min(): Coordinates {
    if (this.isEmpty()) {
        throw Exception("List is empty.")
    } else {
        var min = Coordinates(Int.MAX_VALUE, Int.MAX_VALUE)
        this.forEach { if (it < min) min = it}
        return min
    }
}
