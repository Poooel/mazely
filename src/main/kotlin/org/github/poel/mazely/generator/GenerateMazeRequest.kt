package org.github.poel.mazely.generator

data class GenerateMazeRequest(
    val generatorToUse: String,
    val width: Int,
    val height: Int
)
