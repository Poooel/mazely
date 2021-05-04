package org.github.poel.mazely.generator

import org.github.poel.mazely.common.PathAlgorithm
import org.github.poel.mazely.entity.Coordinates
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.request.GenerateRequest
import org.github.poel.mazely.response.GenerateResponse
import kotlin.random.Random

class GeneratorService {
    fun generate(generateRequest: GenerateRequest): GenerateResponse {
        val grid = Grid(generateRequest.size.height, generateRequest.size.width)
        val seed = getSeed(generateRequest)
        val random = Random(seed)
        val maze = generateRequest.generatorAlgorithm.generator.on(grid, random)
        val (start, end) = getPathEnds(generateRequest, maze, random)

        return GenerateResponse(
            maze = maze.toString(),
            start = start,
            end = end,
            generateRequest = generateRequest,
            seed = seed.toString()
        )
    }

    private fun getSeed(generateRequest: GenerateRequest): Long {
        return if (generateRequest.seed == null) {
            Random.nextLong()
        } else {
            generateRequest.seed.toLong()
        }
    }

    private fun getPathEnds(generateRequest: GenerateRequest, maze: Grid, random: Random): Pair<Coordinates, Coordinates> {
        val pathEnds = when(generateRequest.pathAlgorithm) {
            PathAlgorithm.RANDOM -> maze.randomCell(random) to maze.randomCell(random)
            PathAlgorithm.FARTHEST -> LongestPath.of(maze)
        }
        return pathEnds.first.coordinates to pathEnds.second.coordinates
    }
}
