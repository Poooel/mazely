package org.github.poel.mazely

import com.fasterxml.jackson.annotation.JsonInclude
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.content.*
import io.ktor.jackson.*
import io.ktor.locations.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import org.github.poel.mazely.common.GeneratorAlgorithm
import org.github.poel.mazely.common.PathAlgorithm
import org.github.poel.mazely.common.SolverAlgorithm
import org.github.poel.mazely.generator.GeneratorService
import org.github.poel.mazely.render.RenderService
import org.github.poel.mazely.request.GenerateRequest
import org.github.poel.mazely.request.SolveRequest
import org.github.poel.mazely.solver.SolverService

fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@ExperimentalUnsignedTypes
@KtorExperimentalLocationsAPI
@Suppress("unused")
fun Application.module() {
    val generatorService = GeneratorService()
    val solverService = SolverService()
    val renderService = RenderService()

    install(Locations)

    install(ContentNegotiation) {
        jackson {
            setSerializationInclusion(JsonInclude.Include.NON_EMPTY)
        }
    }

    routing {
        get<Available.Generator> {
            call.respond(GeneratorAlgorithm.values())
        }

        get<Available.Solver> {
            call.respond(SolverAlgorithm.values())
        }

        get<Available.Path> {
            call.respond(PathAlgorithm.values())
        }

        post<Generate> {
            call.respond(generatorService.generate(call.receive()))
        }

        post<Solve> {
            call.respond(solverService.solve(call.receive()))
        }

        post<Render.Svg> {
            call.respond(renderService.renderSvg(call.receive()))
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

    @Location("/path")
    class Path(val available: Available)
}

@KtorExperimentalLocationsAPI
@Location("/generate")
class Generate

@KtorExperimentalLocationsAPI
@Location("/solve")
class Solve

@KtorExperimentalLocationsAPI
@Location("/render")
class Render {
    @Location("/svg")
    class Svg(val render: Render)
}
