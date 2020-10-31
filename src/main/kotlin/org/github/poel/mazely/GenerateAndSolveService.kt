package org.github.poel.mazely

import org.github.poel.mazely.entity.Cell
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.entity.LongestPath
import org.github.poel.mazely.generator.GeneratorService
import org.github.poel.mazely.solver.SolverService

object GenerateAndSolveService {
    fun generateAndSolve(generateAndSolveRequest: GenerateAndSolveRequest): GenerateAndSolveResponse {
        val grid = Grid(generateAndSolveRequest.height, generateAndSolveRequest.width)

        val generator = GeneratorService.findGenerator(generateAndSolveRequest.generatorToUse)

        val generatedGrid = generator.on(grid)

        val (start, goal) = getStartAndGoal(generatedGrid, generateAndSolveRequest.startAndGoalToUse)

        val xrayDistances = start.distances()

        generatedGrid.setStartAndGoal(start.coordinates, goal.coordinates)

        val solver = SolverService.findSolver(generateAndSolveRequest.solverToUse)

        val path = solver.solve(generatedGrid).map { it.coordinates }

        return GenerateAndSolveResponse(
            width = generatedGrid.width,
            height = generatedGrid.height,
            maze = generatedGrid.compress(),
            start = start.coordinates,
            goal = goal.coordinates,
            xray = xrayDistances.compress(),
            pathToGoal = path
        )
    }

    private fun getStartAndGoal(grid: Grid, startAndGoalToUse: String): Pair<Cell, Cell> {
        return when(StartAndGoal.valueOf(startAndGoalToUse.toUpperCase())) {
            StartAndGoal.RANDOM -> Pair(grid.randomCell(), grid.randomCell())
            StartAndGoal.FARTHEST -> LongestPath.of(grid)
        }
    }
}
