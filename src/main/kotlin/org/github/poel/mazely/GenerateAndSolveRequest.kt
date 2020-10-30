package org.github.poel.mazely

data class GenerateAndSolveRequest(
    val generatorToUse: String,
    val width: Int,
    val height: Int,
    val startAndGoalToUse: String,
    val solverToUse: String
)
