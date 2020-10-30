package org.github.poel.mazely

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.locations.*
import io.ktor.features.*
import io.ktor.http.content.*
import io.ktor.jackson.*
import io.ktor.request.*
import org.github.poel.mazely.generator.GeneratorService
import org.github.poel.mazely.generator.Generators
import org.github.poel.mazely.solver.SolverService
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

    install(Compression) {
        gzip()
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

        post<Generate> {
            call.respond(GeneratorService.generateMaze(call.receive()))
        }

        post<Solve> {
            call.respond(SolverService.solveMaze(call.receive()))
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
@Location("/generate")
class Generate

@KtorExperimentalLocationsAPI
@Location("/solve")
class Solve
