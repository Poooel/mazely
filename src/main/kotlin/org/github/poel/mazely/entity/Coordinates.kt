package org.github.poel.mazely.entity

data class Coordinates(
    val x: Int,
    val y: Int
) {
    override fun toString(): String {
        return mapOf(
            "x" to x,
            "y" to y
        ).toString()
    }
}
