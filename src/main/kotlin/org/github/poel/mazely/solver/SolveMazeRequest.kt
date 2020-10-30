package org.github.poel.mazely.solver

import org.github.poel.mazely.entity.Coordinates

data class SolveMazeRequest(
    val solverToUse: String,
    val height: Int,
    val width: Int,
    val start: Coordinates,
    val goal: Coordinates,
    val compressedMaze: String
)
