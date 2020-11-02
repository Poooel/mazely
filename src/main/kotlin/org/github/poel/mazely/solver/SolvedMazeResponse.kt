package org.github.poel.mazely.solver

import org.github.poel.mazely.entity.Coordinates

data class SolvedMazeResponse(
    val pathToGoal: List<Coordinates>
)
