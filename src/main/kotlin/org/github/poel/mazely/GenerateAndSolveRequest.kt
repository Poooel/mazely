package org.github.poel.mazely

data class GenerateAndSolveRequest(
    val width: Int,
    val height: Int,
    val seed: String?,
    val generatorToUse: String,
    val startAndGoalToUse: String,
    val solverToUse: String
)
