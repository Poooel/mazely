package org.github.poel.mazely.common

import com.fasterxml.jackson.annotation.JsonValue

enum class PathAlgorithm(@JsonValue val algorithmName: String) {
    RANDOM("Random"),
    FARTHEST("Farthest")
}
