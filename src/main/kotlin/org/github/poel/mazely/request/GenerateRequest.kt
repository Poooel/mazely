package org.github.poel.mazely.request

import org.github.poel.mazely.common.GeneratorAlgorithm
import org.github.poel.mazely.common.PathAlgorithm
import org.github.poel.mazely.common.Size

data class GenerateRequest(
    val size: Size,
    val generatorAlgorithm: GeneratorAlgorithm,
    val pathAlgorithm: PathAlgorithm,
    val seed: String?,
)
