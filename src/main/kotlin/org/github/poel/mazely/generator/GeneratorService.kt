package org.github.poel.mazely.generator

import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.entity.LongestPath
import org.github.poel.mazely.generator.algorithm.*

object GeneratorService {
    fun generateMaze(generateMazeRequest: GenerateMazeRequest): GeneratedMazeResponse {
        val grid = Grid(generateMazeRequest.height, generateMazeRequest.width)

        val generator = findGenerator(generateMazeRequest.generatorToUse)

        val generatedGrid = generator.on(grid)

        val (start, goal) = LongestPath.of(generatedGrid)

        val xrayDistances = start.distances()

        return GeneratedMazeResponse(
            width = grid.width,
            height = grid.height,
            maze = generatedGrid.compress(),
            start = start.coordinates,
            goal = goal.coordinates,
            xray = xrayDistances.compress()
        )
    }

    fun findGenerator(generatorToUse: String): Generator {
        return when(Generators.valueOf(generatorToUse.toUpperCase())) {
            Generators.BINARY_TREE -> BinaryTree()
            Generators.SIDEWINDER -> Sidewinder()
            Generators.ALDOUS_BRODER -> AldousBroder()
            Generators.HUNT_AND_KILL -> HuntAndKill()
            Generators.RECURSIVE_BACKTRACKER -> RecursiveBacktracker()
            Generators.SIMPLIFIED_PRIMS -> SimplifiedPrims()
            Generators.TRUE_PRIMS -> TruePrims()
            Generators.GROWING_TREE_LAST -> GrowingTreeLast()
            Generators.GROWING_TREE_RANDOM -> GrowingTreeRandom()
            Generators.GROWING_TREE_MIXED -> GrowingTreeMixed()
            Generators.KRUSKALS -> Kruskals()
            Generators.RECURSIVE_DIVISION -> RecursiveDivision()
        }
    }
}
