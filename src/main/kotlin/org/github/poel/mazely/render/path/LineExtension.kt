package org.github.poel.mazely.render.path

import org.github.poel.mazely.common.Size
import org.github.poel.mazely.entity.Cell
import org.github.poel.mazely.entity.plus
import kotlin.random.Random

fun Cell.getLines(): List<Line> {
    val links = mapOf(
        this.north to Direction.NORTH,
        this.east to Direction.EAST,
        this.south to Direction.SOUTH,
        this.west to Direction.WEST
    )

    return links
        .filter { !linked(it.key) }
        .map {
            Line(
                lineStart = coordinates + it.value.start,
                lineEnd = coordinates + it.value.end
            )
        }
}

fun List<Line>.merge(random: Random): List<Line> {
    val linePool = this.distinct().toMutableList()
    val mergedLines = mutableListOf<Line>()

    while (linePool.isNotEmpty()) {
        var candidate = linePool.random(random)
        var contiguousLine = linePool.findContiguousLine(candidate)

        linePool.remove(candidate)

        while (contiguousLine != null) {
            linePool.remove(contiguousLine)

            candidate = candidate.merge(contiguousLine)
            contiguousLine = linePool.findContiguousLine(candidate)
        }

        mergedLines.add(candidate)
    }

    return mergedLines
}

fun List<Line>.findContiguousLine(other: Line): Line? {
    this.forEach { if (it.contiguous(other)) return it }
    return null
}

fun List<Line>.trimOuterEdges(size: Size): List<Line> {
    return this.filter { !isTopEdge(it) && !isBottomEdge(it, size.height) && !isRightEdge(it) && !isLeftEdge(it, size.width) }
}

private fun isTopEdge(line: Line): Boolean {
    return line.horizontalLine() && line.lineStart.y == 0
}

private fun isBottomEdge(line: Line, maxY: Int): Boolean {
    return line.horizontalLine() && line.lineStart.y == maxY
}

private fun isRightEdge(line: Line): Boolean {
    return line.verticalLine() && line.lineStart.x == 0
}

private fun isLeftEdge(line: Line, maxX: Int): Boolean {
    return line.verticalLine() && line.lineStart.x == maxX
}
