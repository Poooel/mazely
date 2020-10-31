package org.github.poel.mazely.generator

import org.github.poel.mazely.entity.Grid
import kotlin.random.Random

interface Generator {
    fun on(grid: Grid, random: Random): Grid
}
