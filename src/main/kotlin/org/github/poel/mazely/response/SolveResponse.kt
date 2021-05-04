package org.github.poel.mazely.response

import org.github.poel.mazely.request.SolveRequest

data class SolveResponse(
    val path: String,
    val solveRequest: SolveRequest,
)
