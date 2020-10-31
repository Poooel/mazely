package org.github.poel.mazely.generator

import org.github.poel.mazely.entity.Coordinates

data class GeneratedMazeResponse (
    val width: Int,
    val height: Int,
    val maze: String,
    val start: Coordinates,
    val goal: Coordinates,
    val xray: List<List<Int>>,
    val seed: String
)
