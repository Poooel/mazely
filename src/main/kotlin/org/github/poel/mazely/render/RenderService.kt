package org.github.poel.mazely.render

import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.render.path.*
import org.github.poel.mazely.request.RenderRequest
import org.github.poel.mazely.response.RenderResponse
import org.redundent.kotlin.xml.xml
import java.io.File
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import kotlin.random.Random

class RenderService {
    fun renderSvg(renderRequest: RenderRequest): RenderResponse {
        val size = renderRequest.generateResponse.generateRequest.size
        val grid = Grid(size.height, size.width)

        grid.from(renderRequest.generateResponse.maze)
        grid.setStartAndGoal(renderRequest.generateResponse.start, renderRequest.generateResponse.end)

        val random = Random(renderRequest.generateResponse.seed.toLong())

        val lines = grid.cells.flatten().map { it.getLines() }.flatten().distinct()
        val trimmedWalls = lines.trimOuterEdges(renderRequest.generateResponse.generateRequest.size)
        val paths = trimmedWalls.mergeInPaths(random)

        val cellSize = 10

        val viewBoxMinX = 0
        val viewBoxMinY = 0
        val width = size.width * cellSize
        val height = size.height * cellSize

        val svg = xml("svg") {
            attribute("viewBox", "$viewBoxMinX, $viewBoxMinY, $width, $height")
            xmlns = "http://www.w3.org/2000/svg"
            attribute("fill", "none")
            attribute("stroke", "black")
            attribute("stroke-linejoin", "round")
            attribute("stroke-linecap", "round")
            attribute("stroke-width", "3")

            paths.forEach {
                "polyline" {
                    attribute("points", it.toString(cellSize))
                }
            }
        }

        val svgString = svg.toString()

        File("/Users/paulq/Downloads/${DateTimeFormatter.ISO_DATE_TIME.format(LocalDateTime.now())}.svg").writeText(svgString)

        return RenderResponse(svg = svgString)
    }
}
