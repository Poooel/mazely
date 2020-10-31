package org.github.poel.mazely

import org.github.poel.mazely.entity.Coordinates

data class GenerateAndSolveResponse(
    val width: Int,
    val height: Int,
    val maze: String,
    val start: Coordinates,
    val goal: Coordinates,
    val xray: List<List<Int>>,
    val pathToGoal: List<Coordinates>,
    val seed: String
)
