package org.github.poel.mazely.solver

import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.solver.algorithm.Dijkstra

object SolverService {
    fun solveMaze(solveMazeRequest: SolveMazeRequest): SolvedMazeResponse {
        val grid = Grid(solveMazeRequest.height, solveMazeRequest.width)

        grid.uncompress(solveMazeRequest.compressedMaze)
        grid.setStartAndGoal(solveMazeRequest.start, solveMazeRequest.goal)

        val solver = findSolver(solveMazeRequest.solverToUse)

        val path = solver.solve(grid).map { it.coordinates }

        return SolvedMazeResponse(
            pathToGoal = path
        )
    }

    fun findSolver(solverToUse: String): Solver {
        return when(Solvers.valueOf(solverToUse.toUpperCase())) {
            Solvers.DIJKSTRA -> Dijkstra()
        }
    }
}
