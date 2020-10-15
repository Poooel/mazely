package org.github.poel.mazely.generator

import org.github.poel.mazely.entity.Grid

interface Generator {
    fun on(grid: Grid): Grid
}
