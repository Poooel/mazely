package org.github.poel.mazely

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.http.*
import io.ktor.locations.*
import io.ktor.features.*
import com.fasterxml.jackson.databind.*
import io.ktor.jackson.*
import org.github.poel.mazely.entity.Grid
import org.github.poel.mazely.generator.BinaryTree
import org.github.poel.mazely.generator.Generators
import org.github.poel.mazely.generator.Sidewinder
import org.github.poel.mazely.solver.Solvers

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

fun Application.module() {
    install(Locations)

    install(CORS) {
        method(HttpMethod.Get)
        anyHost()
    }

    install(DataConversion)

    install(ContentNegotiation) {
        jackson {}
    }

    routing {
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

            call.respond(
                mapOf(
                    "width" to it.width,
                    "height" to it.height,
                    "maze" to generator.on(grid).compress()
                )
            )
        }

        get<Solve> {

        }
    }
}

@Location("/available")
class Available {
    @Location("/generator")
    class Generator(val available: Available)

    @Location("/solver")
    class Solver(val available: Available)
}

@Location("/generate/{generator}")
class Generate(val generator: String, val width: Int, val height: Int)

@Location("/solve/{solver}")
class Solve(val solver: String, val maze: String)
