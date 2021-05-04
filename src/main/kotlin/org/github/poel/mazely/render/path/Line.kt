package org.github.poel.mazely.render.path

import org.github.poel.mazely.entity.Coordinates
import org.github.poel.mazely.entity.max
import org.github.poel.mazely.entity.min

data class Line(
    val lineStart: Coordinates,
    val lineEnd: Coordinates
) {
    fun contiguous(other: Line, shouldBeStraight: Boolean = true): Boolean {
        val initialPredicate = (lineStart == other.lineStart || lineStart == other.lineEnd || lineEnd == other.lineStart || lineEnd == other.lineEnd)
        val equalityPredicate = this != other
        val basicPredicate = initialPredicate && equalityPredicate

        return if (shouldBeStraight) {
            basicPredicate && (horizontalLine(other) || verticalLine(other))
        } else {
            basicPredicate
        }
    }

    fun horizontalLine(): Boolean {
        return lineStart.y == lineEnd.y
    }

    private fun horizontalLine(other: Line): Boolean {
        return horizontalLine() && other.horizontalLine()
    }

    fun verticalLine(): Boolean {
        return lineStart.x == lineEnd.x
    }

    private fun verticalLine(other: Line): Boolean {
        return verticalLine() && other.verticalLine()
    }

    fun merge(other: Line): Line {
        return if (contiguous(other)) {
            Line(lineStart = listOf(lineStart, lineEnd, other.lineStart, other.lineEnd).min(), lineEnd = listOf(lineStart, lineEnd, other.lineStart, other.lineEnd).max())
        } else {
            throw Exception("Lines aren't contiguous.")
        }
    }

    fun reverse(): Line {
        return Line(lineStart = lineEnd, lineEnd = lineStart)
    }

    override fun equals(other: Any?): Boolean {
        return if (other is Line) {
            val startEquality = lineStart == other.lineStart || lineStart == other.lineEnd
            val endEquality = lineEnd == other.lineEnd || lineEnd == other.lineStart
            startEquality && endEquality
        } else {
            false
        }
    }

    override fun hashCode(): Int {
        var result = lineStart.hashCode()
        result = 31 * result + lineEnd.hashCode()
        return result
    }
}
