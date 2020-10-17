package org.github.poel.mazely

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.locations.*
import io.ktor.features.*
import io.ktor.http.content.*
import io.ktor.jackson.*
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.entity.LongestPath
import org.github.poel.mazely.generator.BinaryTree
import org.github.poel.mazely.generator.Generators
import org.github.poel.mazely.generator.Sidewinder
import org.github.poel.mazely.solver.Solvers

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@ExperimentalUnsignedTypes
@KtorExperimentalLocationsAPI
@Suppress("unused")
fun Application.module() {
    install(Locations)

    install(ContentNegotiation) {
        jackson {}
    }

    routing {
        static {
            resource("/", "index.html")
            resource("*", "index.html")
        }

        static("/static") {
            resources("files")
        }

        get<Available.Generator> {
            call.respond(Generators.values())
        }

        get<Available.Solver> {
            call.respond(Solvers.values())
        }

        get<Generate> {
            val grid = Grid(it.height, it.width)

            val generator = when(Generators.valueOf(it.generator.toUpperCase())) {
                Generators.BINARY_TREE -> BinaryTree()
                Generators.SIDEWINDER -> Sidewinder()
            }

            val generatedGrid = generator.on(grid)
            val (start, goal) = LongestPath.of(generatedGrid)

            call.respond(
                mapOf(
                    "width" to it.width,
                    "height" to it.height,
                    "maze" to generatedGrid.compress(),
                    "start" to mapOf(
                        "x" to start.coordinates.x,
                        "y" to start.coordinates.y
                    ),
                    "goal" to mapOf(
                        "x" to goal.coordinates.x,
                        "y" to goal.coordinates.y
                    )
                )
            )
        }

        get<Solve> {

        }
    }
}

@Suppress("unused")
@KtorExperimentalLocationsAPI
@Location("/available")
class Available {
    @Location("/generator")
    class Generator(val available: Available)

    @Location("/solver")
    class Solver(val available: Available)
}

@KtorExperimentalLocationsAPI
@Location("/generate/{generator}")
class Generate(val generator: String, val width: Int, val height: Int)

@KtorExperimentalLocationsAPI
@Location("/solve/{solver}")
class Solve(val solver: String, val maze: String)
