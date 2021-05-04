package org.github.poel.mazely.solver

import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.request.SolveRequest
import org.github.poel.mazely.response.SolveResponse

class SolverService {
    fun solve(solveRequest: SolveRequest): SolveResponse {
        val size = solveRequest.generateResponse.generateRequest.size
        val grid = Grid(size.height, size.width)

        grid.from(solveRequest.generateResponse.maze)
        grid.setStartAndGoal(solveRequest.generateResponse.start, solveRequest.generateResponse.end)

        val path = solveRequest.solverAlgorithm.solver.solve(grid).joinToString(",") { it.coordinates.toString() }

        return SolveResponse(
            path = path,
            solveRequest = solveRequest
        )
    }
}
