package org.github.poel.mazely.render.path

import org.github.poel.mazely.entity.Coordinates

enum class Direction(val start: Coordinates, val end: Coordinates) {
    NORTH(start = Coordinates(x = 0, y = 0), end = Coordinates(x = 1, y = 0)),
    EAST(start = Coordinates(x = 1, y = 0), end = Coordinates(x = 1, y = 1)),
    SOUTH(start = Coordinates(x = 0, y = 1), end = Coordinates(x = 1, y = 1)),
    WEST(start = Coordinates(x = 0, y = 0), end = Coordinates(x = 0, y = 1)),
}
