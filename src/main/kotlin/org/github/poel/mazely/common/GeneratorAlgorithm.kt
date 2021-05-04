package org.github.poel.mazely.common

import com.fasterxml.jackson.annotation.JsonValue
import org.github.poel.mazely.generator.Generator
import org.github.poel.mazely.generator.algorithm.*

enum class GeneratorAlgorithm(val generator: Generator, @JsonValue val algorithmName: String) {
    BINARY_TREE(BinaryTree(), "Binary Tree"),
    SIDEWINDER(Sidewinder(), "Sidewinder"),
    ALDOUS_BRODER(AldousBroder(), "Aldous Broder"),
    HUNT_AND_KILL(HuntAndKill(), "Hunt & Kill"),
    RECURSIVE_BACKTRACKER(RecursiveBacktracker(), "Recursive Backtracker"),
    SIMPLIFIED_PRIMS(SimplifiedPrims(), "Simplified Prim's"),
    TRUE_PRIMS(TruePrims(), "True Prim's"),
    GROWING_TREE_LAST(GrowingTreeLast(), "Growing Tree (Last)"),
    GROWING_TREE_RANDOM(GrowingTreeRandom(), "Growing Tree (Random)"),
    GROWING_TREE_MIXED(GrowingTreeMixed(), "Growing Tree (Mixed)"),
    KRUSKALS(Kruskals(), "Kruskal's"),
    RECURSIVE_DIVISION(RecursiveDivision(), "Recursive Division")
}
