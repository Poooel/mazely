package org.github.poel.mazely

import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.Sidewinder

@ExperimentalUnsignedTypes
fun main(args: Array<String>) {
    val grid = Grid(50, 50)
    val generator = Sidewinder()

    println(generator.on(grid))
    println(grid.compress())

//    val grid = Grid(5, 5)
//    val compressedGrid = "6131416810947706880"
//    grid.uncompress(compressedGrid)
//
//    println(grid)
}
