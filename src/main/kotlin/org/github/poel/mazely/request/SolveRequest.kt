package org.github.poel.mazely.request

import org.github.poel.mazely.common.SolverAlgorithm
import org.github.poel.mazely.response.GenerateResponse

data class SolveRequest(
    val generateResponse: GenerateResponse,
    val solverAlgorithm: SolverAlgorithm,
)
