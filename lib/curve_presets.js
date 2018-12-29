/**
 * In this file, maybe...
 * There could be like a "library of nice preset curves"
 * Hmm.. why not also parametric shapes as functions?
 *
 */
    // --------------------------------------------------------------------------------
    // 0: A roundish, squarish, symmetrical profile curve:
    var cptsProfile = [
                  1, -1,0,1,
                  1, .0,0,1,
                  1,  1,0,1,
                  0,  1,0,1,
                 -1,  1,0,1,
                 -1, .0,0,1,
                 -1, -1,0,1,
                  0, -1,0,1,
                  1, -1,0,1,
                  1, .0,0,1,
                  1,  1,0,1,
    ];
    // 1: Rim of "E", like a sharp-angled C
    var cptsC = [
                3,4-.4,0,1,
                1,4-.4,0,1,
               -1,4-.4,0,1,
               -1,4-.4,0,1,
               -1, 0.4,0,1,
               -1, 0.4,0,1,
                1, 0.4,0,1,
                3, 0.4,0,1,
    ];
    // ... and so on.. some examples in the early "courselogo.js"
