package org.github.poel.mazely.common

import com.fasterxml.jackson.annotation.JsonValue
import org.github.poel.mazely.solver.Solver
import org.github.poel.mazely.solver.algorithm.Dijkstra

enum class SolverAlgorithm(val solver: Solver, @JsonValue val algorithmName: String) {
    DIJKSTRA(Dijkstra(), "Dijkstra")
}
