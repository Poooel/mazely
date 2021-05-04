package org.github.poel.mazely.render.path

import org.github.poel.mazely.common.Size
import org.github.poel.mazely.entity.Coordinates

data class Path(
    val lines: Set<Line>
) {
    private val pathStart: Coordinates = lines.first().lineStart
    private val pathEnd: Coordinates = lines.last().lineEnd

    fun contiguous(line: Line): Boolean {
        return pathStart.contiguous(line) || pathEnd.contiguous(line)
    }

    fun merge(line: Line): Path {
        return when {
            pathStart.contiguous(line)  -> {
                val lineToAdd = if (pathStart == line.lineStart) {
                    line.reverse()
                } else {
                    line
                }

                Path(lines = lineToAdd.plus(lines))
            }
            pathEnd.contiguous(line) -> {
                val lineToAdd = if (pathEnd == line.lineEnd) {
                    line.reverse()
                } else {
                    line
                }

                Path(lines = lines.plus(lineToAdd))
            }
            else -> {
                throw Exception("Unable to merge line.")
            }
        }
    }

    fun toString(cellSize: Int): String {
        val coordinates = mutableSetOf<Coordinates>()

        lines.forEach {
            coordinates.add(it.lineStart)
            coordinates.add(it.lineEnd)
        }

        return coordinates.joinToString(" ") { "${it.x * cellSize},${it.y * cellSize}" }
    }

    override fun toString(): String {
        throw NotImplementedError("Use the toString() method with cellSize parameter.")
    }
}
