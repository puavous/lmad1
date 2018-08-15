/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */

/**
 * A Dirty Small Library for Graphics
 *
 * This was, and basically still is, course material for our course
 * "TIEA311 Principles of Computer graphics" (based on "6.837 Computer
 * Graphics" as published in MIT OCW). Am I a rogue teacher leaking
 * example answers here? No. I'm quite certain that a student who
 * manages to translate this convoluted Javascript snippet to
 * grade-worthy C++ exercise answers has earned the credit, probably
 * the "hard way", too.
 *
 * This code does dirty tricks to fit in very small storage space as
 * if it was part of an entry in a demoscene "4k intro"
 * competition. That means at most 4096 bytes for everything. Also,
 * this is written by a total Javascript newbie - proper practices of
 * any language can only be learned by lots and lots of programming
 * and reading codes by more experienced programmers. So far, I've
 * only gone through some tutorial examples, parts of specifications,
 * and demoscene intro codes that necessarily minimize code size with
 * the expense of *everything* else.
 *
 * Do not try these programming practices at home (until you know what
 * you do and which parts of the specification are beautifully
 * misused).
 *
 * If you're less experienced, try to keep on learning good
 * programming practices (in Javascript and other languages) from nice
 * tutorials. That said, some of this code may show you some features
 * that are less common in basic tutorials.
 *
 * Browser support: Productions made using this code seems to load and
 * run in desktop Chrome, Edge, and Firefox, but not on IE. Mobile
 * browsers unknown.
 *
 * Original goal: use at least spline curves, generalized cylinder,
 * surface of revolution, hierarchical model, perspective projection,
 * and simple fragment shading with directed light. (some 50% of
 * course content)
 *
 * Outcome: yep, I got all that stuffed in an example production
 * (along with shaders, vector math, softsynth, soundtrack, and an
 * English message.. all in 4k "executable" after some serious
 * minification).
 *
 **/
