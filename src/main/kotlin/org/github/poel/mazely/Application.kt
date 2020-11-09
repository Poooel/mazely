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
import kotlin.random.Random

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

val Application.envKind get() = environment.config.property("ktor.deployment.environment").getString()
val Application.isProd get() = envKind != "dev"

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
        val baseAppPath = "app/build"
        if (isProd) {
            static {
                resource("/", "index.html", "$baseAppPath")
                resource("*", "index.html", "$baseAppPath")
            }

            static("/assets") {
                resources("$baseAppPath/public/css")
                resources("$baseAppPath/public/img")
            }

            static("/dist") {
                resources("$baseAppPath/src")
            }
        }

        get<Available.Generator> {
            call.respond(Generators.values())
        }

        get<Available.Solver> {
            call.respond(Solvers.values())
        }

        get<RandomLong> {
            call.respond(Random.nextLong())
        }

        post<Generate> {
            call.respond(GeneratorService.generateMaze(call.receive()))
        }

        post<Solve> {
            call.respond(SolverService.solveMaze(call.receive()))
        }

        post<GenerateAndSolve> {
            call.respond(GenerateAndSolveService.generateAndSolve(call.receive()))
        }
    }
}

@Suppress("unused")
@KtorExperimentalLocationsAPI
@Location("/api/available")
class Available {
    @Location("/generator")
    class Generator(val available: Available)

    @Location("/solver")
    class Solver(val available: Available)
}

@KtorExperimentalLocationsAPI
@Location("/api/generate")
class Generate

@KtorExperimentalLocationsAPI
@Location("/api/solve")
class Solve

@KtorExperimentalLocationsAPI
@Location("/api/generate/solve")
class GenerateAndSolve

@KtorExperimentalLocationsAPI
@Location("/api/random/long")
class RandomLong
