package org.github.poel.mazely.render.path

import kotlin.random.Random

fun List<Line>.mergeInPaths(random: Random): List<Path> {
    val linePool = this.distinct().toMutableList()
    val mergedPaths = mutableListOf<Path>()

    while (linePool.isNotEmpty()) {
        var candidate = Path(mutableSetOf(linePool.random(random)))
        linePool.remove(candidate.lines.first())

        var contiguousLine = linePool.findContiguousLine(candidate)

        while (contiguousLine != null) {
            linePool.remove(contiguousLine)
            candidate = candidate.merge(contiguousLine)
            contiguousLine = linePool.findContiguousLine(candidate)
        }

        mergedPaths.add(candidate)
    }

    return mergedPaths
}

fun List<Line>.findContiguousLine(other: Path): Line? {
    this.forEach { if (other.contiguous(it)) return it }
    return null
}

fun Line.plus(set: Set<Line>): Set<Line> {
    return hashSetOf(this).plus(set)
}
