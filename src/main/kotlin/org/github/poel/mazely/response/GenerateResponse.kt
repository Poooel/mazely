package org.github.poel.mazely.response

import org.github.poel.mazely.entity.Coordinates
import org.github.poel.mazely.request.GenerateRequest

data class GenerateResponse(
    val maze: String,
    val start: Coordinates,
    val end: Coordinates,
    val generateRequest: GenerateRequest,
    val seed: String,
)
