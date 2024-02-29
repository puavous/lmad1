/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */
/**
 *
 * @fileOverview Let's Make a Demo Workshop 1.x base library
 *
 * <h3>A Dirty Small Library for Graphics</h3>
 *
 * <p>This was, and basically still is, course material for our course
 * "TIEA311 Principles of Computer graphics" (based on "6.837 Computer
 * Graphics" as published in MIT OCW). Am I a rogue teacher leaking
 * example answers here? No. I'm quite certain that a student who
 * manages to translate this convoluted Javascript snippet to
 * grade-worthy C++ exercise answers has earned the credit, probably
 * the "hard way", too.
 * </p>
 *
 * <p>This code does dirty tricks to fit in very small storage space as
 * if it was part of an entry in a demoscene "4k intro"
 * competition. That means at most 4096 bytes for everything. Also,
 * this is written by a total Javascript newbie - proper practices of
 * any language can only be learned by lots and lots of programming
 * and reading codes by more experienced programmers. So far, I've
 * only gone through some tutorial examples, parts of specifications,
 * and demoscene intro codes that necessarily minimize code size with
 * the expense of *everything* else.
 * </p>
 *
 * <p>Do not try these programming practices at home (until you know what
 * you do and which parts of the specification are beautifully
 * misused).
 * </p>
 *
 * <p>If you're less experienced, try to keep on learning good
 * programming practices (in Javascript and other languages) from nice
 * tutorials. Listen to your teachers and coaches. They know what is
 * best for you. That said, some of this code may show you some
 * features that are less common in basic tutorials.
 * </p>
 *
 * <p>Browser support: Productions made using this code seem to load and
 * run in desktop Chrome, Edge, and Firefox, but not on IE. Mobile
 * browsers unknown.
 * </p>
 *
 * <p>Original goal: use at least spline curves, generalized cylinder,
 * surface of revolution, hierarchical model, perspective projection,
 * and simple fragment shading with directed light. (some 50% of
 * course content)
 * </p>
 *
 * <p>Outcome: yep, I got all that stuffed in an example production
 * (along with shaders, vector math, softsynth, soundtrack, and an
 * English message.. all in 4k "executable" after some serious
 * minification).
 * </p>
 *
 *
 **/

// Variables used all over the library. Must have as globals:
var gl, prg;

// TODO: Should these gl and prg be included as method parameters or
// object properties?

// --------------------------------------------------------------------------------
// "Globals needed in many routines", these are used by the main starter code:
var C, Cw, Ch;          // Canvas object and previous width and height
var audio;              // Audio object needed for song playback
var s;                  // Temporary variable for "style" but also other things
var _document=document; // automatically minified name for the "document" object

// Global for camera inside scenegraph.
var cameraTransformation;

// Global for current light implementation (TODO: nicer system for lights)
var lightMat;

// Constants
    var PI=Math.PI;
//    var PI=3.141593

// Utility functions
function clamp01(parameter){
    if (parameter < 0) return 0;
    if (parameter > 1) return 1;
    return parameter;
}

    // Observe: Everything looks transposed compared to the theory
    // slides and C++ codes of the course. This is because of column
    // major ordering used by Javascript arrays and the WebGL
    // interface. The mathematical meaning is the same as on the
    // course, but you should remember that what looks like a row here
    // is actually a column if written as actual math. Pen and paper
    // and your own brains are very powerful tools, as I keep
    // repeating on my lectures.

    // Bezier basis matrix
    var bezB = [  1,  0,  0, 0,
                 -3,  3,  0, 0,
                  3, -6,  3, 0,
                 -1,  3, -3, 1];

    // B-spline basis matrix
    var bspB = [ 1./6,  4./6,  1./6, 0./6,
                -3./6,  0./6,  3./6, 0./6,
                 3./6, -6./6,  3./6, 0./6,
                -1./6,  3./6, -3./6, 1./6 ];

    // "Re-implementing the wheel" ------------------------------

    /** Returns a 4x4 matrix of zeros */
    function zeros(){
        return [ 0, 0, 0, 0,
                 0, 0, 0, 0,
                 0, 0, 0, 0,
                 0, 0, 0, 0 ];
    };

    /** Returns a translation matrix of homogeneous coordinates. */
    function translate(tx,ty,tz){
        return [ 1, 0, 0, 0,
                 0, 1, 0, 0,
                 0, 0, 1, 0,
                 tx, ty, tz, 1 ];
    };

    /** Returns a scale matrix. */
    function scaleXYZ(sx,sy,sz){
        return [ sx, 0, 0, 0,
                 0, sy, 0, 0,
                 0, 0, sz, 0,
                 0, 0, 0, 1 ];
    };

    /** Returns an isotropic scale matrix. */
    function scale(s){
        return scaleXYZ(s,s,s);
    };

    /** Counter-clockwise rotation around the Z-axis */
    function rotZ(theta){
        var s = Math.sin(theta);
        var c = Math.cos(theta);
        return [ c, -s, 0, 0,
                 s,  c, 0, 0,
                 0,  0, 1, 0,
                 0,  0, 0, 1];
    };

    /** Counter-clockwise rotation around the Y-axis */
    function rotY(theta){
        var s = Math.sin(theta);
        var c = Math.cos(theta);
        return [ c,  0, -s, 0,
                 0,  1, 0, 0,
                 s,  0, c, 0,
                 0,  0, 0, 1];
    };

    /** Counter-clockwise rotation around the X-axis */
    function rotX(theta){
        var s = Math.sin(theta);
        var c = Math.cos(theta);
        return [ 1,  0, 0, 0,
                 0,  c, -s, 0,
                 0,  s, c, 0,
                 0,  0, 0, 1];
    };

    /** Perspective projection, imitates gluPerspective() */
    function perspective(fov, ar, near, far) {
        var f = 1/Math.tan(fov/2);
        var div = near - far;
        return [f/ar, 0,  0,               0,
                0,    f,  0,               0,
                0,    0,  (far+near)/div, -1,
                0,    0,  2*far*near/div,  0 ];
    };

    /**
     * Perspective projection as in gluPerspective() but assumes a
     * precomputed f==1/Math.tan(fov/2)
     */
    function perspectiveF(f, ar, near, far) {
        var div = near - far;
        return [f/ar, 0,   0,               0,
                0,    f,   0,               0,
                0,    0,   (far+near)/div, -1,
                0,    0,   2*far*near/div,  0 ];
    };

    /**
     * Perspective with hardcoded near plane "quite near". Far plane
     * is "far away". Might have issues with Z stability. Assumes
     * precomputed f==1/Math.tan(fov/2).
     */
    function perspectiveFhc(f, ar) {
        return [f/ar, 0,   0,  0,
                0,    f,   0,  0,
                0,    0,  -1, -1,
                0,    0,  -1,  0 ];
    };


    /**
     * Orthographic projection with fixed width
     */
    function orthographic(top, ar, near, far) {
        var bottom=-top,right=top*ar, left=-top*ar;
        return [2/(right-left), 0,                0,             0,
                0,              2/(top-bottom),   0,             0,
                0,              0,                -2/(far-near), 0,
                -(right+left)/(right-left),
                                -(top+bottom)/(top-bottom),
                                                  -(far+near)/(far-near),
                                                                 1 ];
    };

    // "Matrices with inverses" ------------------------------
    function translate_wi(tx,ty,tz){
        var res=translate(tx,ty,tz);
        res.n=translate(-tx,-ty,-tz);
        return res;
    };
    /** Returns a scale matrix. */
    function scaleXYZ_wi(sx,sy,sz){
        var res=scaleXYZ(sx,sy,sz);
        res.n=scaleXYZ(1/sx,1/sy,1/sz);
        return res;
    };
    /** Returns an isotropic scale matrix. */
    function scale_wi(s){
        return scaleXYZ_wi(s,s,s);
    };
    function rotZ_wi(theta){
        var res=rotZ(theta);
        res.n=rotZ(-theta);
        return res;
    }
    function rotY_wi(theta){
        var res=rotY(theta);
        res.n=rotY(-theta);
        return res;
    }
    function rotX_wi(theta){
        var res=rotX(theta);
        res.n=rotX(-theta);
        return res;
    }





    /** 4x4 Matrix multiplication */
    function matmul(a,b){
        var i,j,k,m = zeros();
        for (i=0;i<4;i++){
            for (j=0;j<4;j++){
                for(k=0;k<4;k++){
                    m[j*4+i] += a[k*4+i]*b[j*4+k];
                }
            }
        }
        return m;
    }

    /** 4x4 Matrix times 4x1 vector multiplication */
    function matvec(a,b){
        var i,j,res = [0,0,0,0];
        for (i=0;i<4;i++){
            for(j=0;j<4;j++){
                res[i] += a[j*4+i]*b[j];
            }
        }
        return res;
    }

    /**
     * 4x4 matrix times 4xN matrix multiplication. Does a bit of extra
     * work but allows the same routine to multiply both matrices and
     * vectors. The end result seems to be 15 bytes shorter when using
     * this instead of separate matmul and matvec routines.
     */
    function matmul4(a,b){
        var i,j,k,m=[];
        for (i=0;i<b.length;i++){
            m[i]=0;
        }
        for (i=0;i<4;i++){
            for (j=0;j<(b.length/4);j++){
                for(k=0;k<4;k++){
                    m[j*4+i] += a[k*4+i]*b[j*4+k];
                }
            }
        }
        return m;
    }

    /**
     * For 4x4 matrices, multiplies both a*b and b^{-1} * a^{-1}. 
     */
    function matmul_wi(a,b){
        var res = matmul4(a,b);
        res.n = matmul4(b.n,a.n);
        return res;
    }

    /**
     * Transpose the upper 3x3 part and zero the rest. For building
     * the normal matrix from the inverse of model matrix.
     */
    function transposed3x3(a){
        return [a[0],a[4],a[8], 0,
                a[1],a[5],a[9], 0,
                a[2],a[6],a[10],0,
                0,   0,   0,   1];
    }

    /** Cross product for homogeneous directions. "[(axb)^t,0]^t" */
    function cross(a,b){
        return [a[1]*b[2]-a[2]*b[1],
                a[2]*b[0]-a[0]*b[2],
                a[0]*b[1]-a[1]*b[0],
                0];
    }

    /** Normalize x,y,z disregarding and untouching w */
    function nmld(v){
        var length3d=Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
        return [v[0]/length3d,v[1]/length3d,v[2]/length3d,v[3]];
    }

    /** Homogenize by x/w,y/w,z/w  */
    function homogenized(v){
        if (v[3]==0) return v;
        return [v[0]/v[3],v[1]/v[3],v[2]/v[3],1];
    }


// "Prelude to re-inventions" ------------------------------

// Tentative material object..
// colors==[a,d,s,q] could be a 4x4 matrix?
// Yep, quite short code when colors are in a matrix.
// TODO: I think need to learn the object model of javascript, to know
// if this is proper.
function Material(colors){
    var myc=colors.slice();
    this.c = function(gl){
        gl.uniformMatrix4fv(
            gl.getUniformLocation(prg,"i"), false, myc);
    }
}

// Tentative camera object.. just put inverse of current transf in the
// global cameraTransformation var.
function Camera(){
    this.c = function(nodetrans){
        //alert("Positioning camera" + nodetrans);
        cameraTransformation = nodetrans.n;
        cameraTransformation.n = nodetrans;

    }
}

// Tentative light object.. just store the current transf in global light var;
// deal with it later to get location or direction.. As a future idea, Could
// push to a list of lights, why not...
function Light(){
    this.c = function(nodetrans){
        lightMat = nodetrans;
    }
}



// Traversal without inverse matrices and thus normal matrices. Use
// this if you know you don't need normals or camera as scenegraph node.
function traverse(node,ms){
    ms=node.f.reduce(matmul4,ms);
    gl.uniformMatrix4fv(
        gl.getUniformLocation(prg,"mv"), false, ms);
    node.o.map(function(o){o.c(gl);}); // map < forEach :)
    node.c.map(function(c){traverse(c,ms);});
}

/**
 * Traverse a scene graph, and output to the WebGL pipeline.
 *
 * Algorithm:
 *
 *  This is a very basic recursive tree traversal.
 *
 * Size optimizations:
 *
 *   - The 'functional' operations provided by Javascript allow a very
 *     compact way of writing this.
 *
 *   - Call map() without using its output. It is wasteful, but it is
 *     4 characters shorter to write than forEach().
 *
 *   - Always send two uniform matrices, regardless of whether
 *     anything is drawn using them. Wasted effort when not drawing.
 **/
function traverse_wi(node,ms){
    ms=node.f.reduce(matmul_wi,ms);
    gl.uniformMatrix4fv(
        gl.getUniformLocation(prg,"mv"), false, ms);
    gl.uniformMatrix4fv(
        gl.getUniformLocation(prg,"nm"), false, transposed3x3(ms.n));
    node.o.map(function(o){o.c(gl);}); // map < forEach :)
    node.c.map(function(c){traverse_wi(c,ms);});
}

/** Dry traversal to find camera (TODO: lights?) 
 *
 * This traverses the scene graph but doesn't draw anything. Look for
 * property 'r' (for cameRa or dRy or Rehearsal or whatever
 * mnemonic..) and apply the functions found in the property.
 */
function findcam_wi(node,ms){
    ms = node.f.reduce(matmul_wi,ms);
    if (node.r){
        node.r.map(function(o){o.c(ms);});
    }
    node.c.map(function(c){findcam_wi(c,ms);});
}






    // "Re-inventing the cylinder" ------------------------------

    /**
     * Create an evaluator that can return a local frame for circle in
     * the xy plane. As in the MIT course assignment, but transposed.
     */
    function funCircleBasic(radius,n){
        var r = radius;
        this.n = n; // Fidelity hint for the surface evaluator
        this.c = function(t){
            var s = Math.sin(t * 2 * PI);
            var c = Math.cos(t * 2 * PI);
            return [-c,  -s,   0,  0,  // normal
                     0,   0,   1,  0,  // binormal
                    -s,   c,   0,  0,  // tangent
                     c*r, s*r, 0,  1   // position
                   ];
        };
    }

    /**
     * Create an evaluator that can return a local frame for a part or
     * whole circle on the xy plane. The starting point of the arc is
     * at the highest y point "top", and direction is counterclockwise
     * in right-handed coordinates, z towards viewer. Assumes
     * 0<arclen<=1. Arclen is optional.
     */
    function funCircle(radius,swpfidel,arclen){
        var r = radius;
        var a = arclen?arclen:1;
        // Fidelity hint for the sweep surface evaluator
        this.n = swpfidel?swpfidel:10;
        this.c = function(t){
            var s = Math.sin(t * 2 * PI * a);
            var c = Math.cos(t * 2 * PI * a);
            return [    s,  -c,  0,  0,  // normal
                        0,   0,  1,  0,  // binormal
                       -c,  -s,  0,  0,  // tangent
                     -s*r, c*r,  0,  1   // position
                   ];
        };
    }


    // Line from zero to length, along y axis
    // Some bugs here? Haven't actually used this at all...
    function funLine(length,n){
        var l = length;
        this.n = n;
        this.c = function(t){
            return [ 1,   0,   0, 0,   // "normal"/orientation
                     0,   0,   1, 0,   // binormal
                     0,   1,   0, 0,   // tangent
                     0,   t*l, 0, 1    // position
                   ];
        };
    }


    /**
     * Simple uniform B-spline evaluator.
     *
     * Hmm.. position and tangent could be evaluated for any t... But
     * how to maintain correct normal and bi-normal for surface
     * creation? Initial idea: pre-compute at some intervals using the
     * cross product trick from our lecture notes, and then evaluate a
     * normalized interpolant upon call to eval(). NOTE: Only need to
     * store binormal (?), because normal can be computed via cross
     * product. The binormal rotations could be corrected while
     * precomputing. (not yet done).
     *
     * Note that analytic tangent doesn't exist for all possible
     * inputs - we don't handle curves with vanishing derivatives,
     * so keep this in mind when defining control points.
     *
     * TODO: Maybe could be sloppy and not even interpolate, if result
     * is OK visually? Hmm... we do have storage, so why not just
     * precompute like a *lot* of values when creating the spline
     * object, and then return the closest one in compute(t)? Nasty, but
     * without redundance...
     *
     * Back-of-the-envelope: 100 control pts * 100 intermediates * 16
     * * 8 byte float is 1280000 bytes... well.. that's a megabyte for
     * one spline..  admittedly, it sounds like a lot..
     *
     * TODO (cheating a bit, though): Use only xy-curves with no
     * change of curvature, and delete all the code about flipping
     * gradients.  Would be so much smaller and leaner! Well.. if we
     * don't cheat that much, then at least the production should USE
     * the feature and have some twisty curve(s) to show it
     * off.. Closure will omit unused functions, so we can have many
     * versions here in the library. This is the bloaty, most general
     * version. Depending on what you need, you can "cheat" more by
     * using the restricted versions below.
     */

    function funBSpline(pts) {
        // Let us declare all vars here to shorten the code.
        var i;
        var g,Tt,dTt,v,T,N;
        var t,ifirst,npts = this.n = pts.length/4;
        var nsteps = (npts-3)*300; // internal points (actually +1 because we go to t=1.0)
        var b = [];           // the internal storage
        var B = [0,0,1,0];    // "arbitrary binormal at beginning"
        //this.n=npts;

        for (i=0;i<nsteps+1;i++){
            t = i/nsteps; // scale t to [0,1] within curve
            if (i<nsteps) {
                ifirst = t*(npts-3) | 0; // 1st point is... (funny "|0" makes a floor())
                t = t*(npts-3) - ifirst; // reset t to [0,1] within segm.
            } else {
                ifirst = npts-4;
                t = 1;
            }

            g = pts.slice(ifirst*4,ifirst*4+16); // pick cps to G.
            Tt = [1, t, t*t, t*t*t];
            dTt = [0, 1, 2*t, 3*t*t];
            v = matmul4(matmul4(g, bspB),Tt);
            T = nmld(matmul4(matmul4(g, bspB),dTt));
            N = nmld(cross(B,T));
            B = nmld(cross(T,N));
            b.push([].concat(N, // "normal"/orientation
                             B, // binormal
                             T, // tangent
                             v)); // pos.
        }

        // as of now, we don't care to interpolate:
        this.c = function(t){
            return b[0 | t*(nsteps)];
        }
    }

    /**
     * Simple uniform B-spline with transformed control points.. This
     * was "new" in Instanssi 2018 - allows scaled and/or skewed
     * geometries but needs to be done during instantiation.
     */
    function funBSplineTransformed(pts,tfm) {
        // Let us declare all vars here to shorten the code.
        var i;
        var g,Tt,dTt,v,T,N;
        var t,ifirst,npts = this.n = pts.length/4;
        var nsteps = (npts-3)*300; // internal points (actually +1 because we go to t=1.0)
        var b = [];           // the internal storage
        var B = [0,0,1,0];    // "arbitrary binormal at beginning"
        //this.n=npts;
        pts = matmul4(tfm,pts); // transform!


        for (i=0;i<nsteps+1;i++){
            t = i/nsteps; // scale t to [0,1] within curve
            if (i<nsteps) {
                ifirst = t*(npts-3) | 0; // 1st point is... (funny "|0" makes a floor())
                t = t*(npts-3) - ifirst; // reset t to [0,1] within segm.
            } else {
                ifirst = npts-4;
                t = 1;
            }

            g = pts.slice(ifirst*4,ifirst*4+16); // pick cps to G.
            Tt = [1, t, t*t, t*t*t];
            dTt = [0, 1, 2*t, 3*t*t];
            v = matmul4(matmul4(g, bspB),Tt);
            T = nmld(matmul4(matmul4(g, bspB),dTt));
            N = nmld(cross(B,T));
            B = nmld(cross(T,N));
            b.push([].concat(N, // "normal"/orientation
                             B, // binormal
                             T, // tangent
                             v)); // pos.
        }

        // as of now, we don't care to interpolate:
        this.c = function(t){
            return b[0 | t*(nsteps)];
        }
    }



    /**
     * XY-plane curves with no inflection points (B==(0,0,1)).
     *
     * Some 58 bytes smaller than the more general version.
     *
     */
    function funBSplineXYnoInf(ipts) {
        // Let us declare all vars here to shorten the code.
        var npts = this.n = ipts.length/4;
        var pts=ipts;

        this.c = function(t){
            var ifirst;
            // t arrives as [0,1] within curve
            if (t<1) {
                ifirst = t*(npts-3) | 0;
                t = t*(npts-3) - ifirst;
            } else {
                ifirst = npts-4;
                //t = 1;
            }

            var g = pts.slice(ifirst*4,ifirst*4+16), // pick cps to G.
                B = [0,0,1,0],    // Constant binormal
                Tt = [1, t, t*t, t*t*t],
                dTt = [0, 1, 2*t, 3*t*t],
                T = nmld(matmul4(matmul4(g, bspB),dTt));
            return [].concat(nmld(cross(B,T)), // "normal"/orientation
                             B, // binormal
                             T, // tangent
                             matmul4(matmul4(g, bspB),Tt)); // pos.
        }
    }


    /**
     * Simple rational Bezier evaluator.
     *
     */

    function funBezierCurve(pts) {
        // Let us declare all vars here to shorten the code.
        var i;
        var g,Tt,dTt,v,T,N;
        var t,ifirst,npts = pts.length/4;
        this.n = pts.length*4; // Fidelity hint for surface eval
        var nsteps = ((npts-1)/3)*10; // internal points (actually +1 because we go to t=1.0)
        var b = [];           // the internal storage
        var B = [0,0,1,0];    // "arbitrary binormal at beginning"
        //this.n=npts;

        for (i=0;i<nsteps+1;i++){
            t = i/nsteps; // scale t to [0,1] within curve
            if (i<nsteps) {
                ifirst = (t*((npts-1)/3) | 0)*3; // 1st point is... (funny "|0" makes a floor())
                t = t*((npts-1)/3) - (ifirst/3); // reset t to [0,1] within segm.
            } else {
                ifirst = npts-4;
                t = 1;
            }

            g = pts.slice(ifirst*4,ifirst*4+16); // pick cps to G.
            Tt = [1, t, t*t, t*t*t];
            dTt = [0, 1, 2*t, 3*t*t];
            //v = matmul4(matmul4(g, bezB),Tt);
            v = homogenized(matmul4(matmul4(g, bezB),Tt));
            T = nmld(matmul4(matmul4(g, bezB),dTt));
            N = nmld(cross(B,T));
            B = nmld(cross(T,N));
            b.push([].concat(N, // "normal"/orientation
                             B, // binormal
                             T, // tangent
                             v)); // pos.
            //console.log("ja tuota " + npts + " " + ifirst + " " + t);
        }

        // as of now, we don't care to interpolate:
        this.c = function(t){
            return b[0 | t*(nsteps)];
        }
    }



    /**
     * Convert packed 2d-vectors to (x,y,0,1) homogenous 3d
     * coordinates. (Abandoned idea - didn't gain anything)
     */
    function xyToHomog(ptsxy){
        var res=[];
        for(var i=0;i<ptsxy.length;){
            res.push(ptsxy[i++],ptsxy[i++],0,1);
        }
        return res;
    }

    /**
     * Push values of the matrix column icol to array, optionally
     * multiply by mul!=0
     */
    function pushCol4(array,mat,icol,mul){
        mul=mul?mul:1;
        for(var i=0;i<4;i++){
            array.push(mul*mat[4*icol+i]);
        }
    }

    /** Helper function. More bloaty than the few inlined calls: */
    function createAndFillArrayBuffer32(data){
        var buf=gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER,
                      new Float32Array(data),
                      gl.STATIC_DRAW);
        return buf;
    }

    /**
     * Prepare a drawable WebGL buffer that represents a box. Under
     * construction; size parameter is not yet hooked up.
     *
     * It's a bit funny that even though the box is a very simple shape, the
     * data and code required for making one is actually quite bloaty when
     * compared to generalized cylinders. Hmm, technically it could be possible
     * to make a box with a 4-point circle, but then there should be some clever
     * way to make non-smooth normals. Think about this..
     *
     */
    function Box(size){
        // GL buffer objects
        var vertexColorBuf = gl.createBuffer(),
            vertexBuf = gl.createBuffer(),
            vertexNormalBuf = gl.createBuffer(),
            faceBuf = gl.createBuffer();

        var vertices=[];
        var normals=[];
        var vind=[];

        vertices = [
            // Front
            -1, -1,  1, 1,
             1, -1,  1, 1,
             1,  1,  1, 1,
            -1,  1,  1, 1,
            // Back
            -1, -1, -1, 1,
            -1,  1, -1, 1,
             1,  1, -1, 1,
             1, -1, -1, 1,
            // Top
            -1,  1, -1, 1,
            -1,  1,  1, 1,
             1,  1,  1, 1,
             1,  1, -1, 1,
            // Bottom
            -1, -1, -1, 1,
             1, -1, -1, 1,
             1, -1,  1, 1,
            -1, -1,  1, 1,
            // Right
             1, -1, -1, 1,
             1,  1, -1, 1,
             1,  1,  1, 1,
             1, -1,  1, 1,
            // Left
            -1, -1, -1, 1,
            -1, -1,  1, 1,
            -1,  1,  1, 1,
            -1,  1, -1, 1,
        ];

        normals = [
            // Front
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            // Back
            0, 0,-1, 0,
            0, 0,-1, 0,
            0, 0,-1, 0,
            0, 0,-1, 0,
            // Top
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 0, 0,
            // Bottom
            0,-1, 0, 0,
            0,-1, 0, 0,
            0,-1, 0, 0,
            0,-1, 0, 0,
            // Right face
            1, 0, 0, 0,
            1, 0, 0, 0,
            1, 0, 0, 0,
            1, 0, 0, 0,
            // Left face
            -1, 0, 0, 0,
            -1, 0, 0, 0,
            -1, 0, 0, 0,
            -1, 0, 0, 0,
        ]

        /*
        // Colors.. nah..
        gcolors = [
            // Front
             1,  0,  0, 1,
             0,  1,  0, 1,
             0,  0,  1, 1,
             0,  1,  0, 1,
            // Back
            -1, -1, -1, 1,
            -1,  1, -1, 1,
             1,  1, -1, 1,
             1, -1, -1, 1,
            // Top
            -1,  1, -1, 1,
            -1,  1,  1, 1,
             1,  1,  1, 1,
             1,  1, -1, 1,
            // Bottom
            -1, -1, -1, 1,
             1, -1, -1, 1,
             1, -1,  1, 1,
            -1, -1,  1, 1,
            // Right
             1, -1, -1, 1,
             1,  1, -1, 1,
             1,  1,  1, 1,
             1, -1,  1, 1,
            // Left
            -1, -1, -1, 1,
            -1, -1,  1, 1,
            -1,  1,  1, 1,
            -1,  1, -1, 1,
        ];
        */

        vind = [
            0,  1,  2,      0,  2,  3,    // front
            4,  5,  6,      4,  6,  7,    // back
            8,  9,  10,     8,  10, 11,   // top
            12, 13, 14,     12, 14, 15,   // bottom
            16, 17, 18,     16, 18, 19,   // right
            20, 21, 22,     20, 22, 23,   // left
        ];

        // Fill in buffers (non-animated shapes)

        //hmm?
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, faceBuf);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vind), gl.STATIC_DRAW);

        // "Compute", i.e., Bind and draw to pipeline
        this.c = function(gl){
            var i;
            // This quite unnecessary, actually (TODO:)
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuf);
            gl.enableVertexAttribArray(i=gl.getAttribLocation(prg,"g"));
            gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
            gl.enableVertexAttribArray(i=gl.getAttribLocation(prg,"v"));
            gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuf);
            gl.enableVertexAttribArray(i=gl.getAttribLocation(prg,"N"));
            gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, faceBuf);
            gl.drawElements(gl.TRIANGLES, 6*2*3, gl.UNSIGNED_SHORT,0);
        };


    }


    /**
     * A square [-1,1]^2 on xy-plane, z==0. This may not be very useful..
     */
    function Square(size){
        // GL buffer objects
        var vertexColorBuf = gl.createBuffer(),
            vertexBuf = gl.createBuffer(),
            vertexNormalBuf = gl.createBuffer(),
            faceBuf = gl.createBuffer();

        var vertices=[];
        var normals=[];
        var vind=[];

        vertices = [
            // Front
            -1, -1,  0, 1,
             1, -1,  0, 1,
             1,  1,  0, 1,
            -1,  1,  0, 1,
        ];

        normals = [
            // Front
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
            0, 0, 1, 0,
        ]

        vind = [
            0,  1,  2,      0,  2,  3,
        ];

        // Fill in buffers (non-animated shapes)

        //hmm?
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, faceBuf);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vind), gl.STATIC_DRAW);

        // "Compute", i.e., Bind and draw to pipeline
        this.c = function(gl){
            var i;
            // This quite unnecessary, actually (TODO:)
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuf);
            gl.enableVertexAttribArray(i=gl.getAttribLocation(prg,"g"));
            gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
            gl.enableVertexAttribArray(i=gl.getAttribLocation(prg,"v"));
            gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuf);
            gl.enableVertexAttribArray(i=gl.getAttribLocation(prg,"N"));
            gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, faceBuf);
            gl.drawElements(gl.TRIANGLES, 1*2*3, gl.UNSIGNED_SHORT,0);
        };
    }





    /**
     * Prepare a drawable WebGL buffer of a generalized cylinder
     * (swept profile + caps)
     */
    function GenCyl(prof, profilesz, swp) {
        var j,i,t,fp,lf,fs,ts;
        var vertices = [];
        var normals = [];
        var vind = [];
        var colors = [];
        //var numfaces = (profilesz-1)*(sweepsz-1)*2+2*profilesz;
        var sweepsz = (swp.n*1.5)|0; // heuristic for sweep size.

        //var numfaces = 2*(sweepsz)*(profilesz-1)+2;
        var numfaces = 2*(sweepsz-1)*(profilesz-1);


        // GL buffer objects, to be filled as the last stage of init
        var vertexColorBuf = gl.createBuffer(),
            vertexNormalBuf = gl.createBuffer(),
            vertexBuf = gl.createBuffer(),
            faceBuf = gl.createBuffer();


        // location, normal, and color of each vertex
        for (j=0; j<sweepsz; j++){
            ts = j/(sweepsz-1);
            fs = swp.c(ts);
            for (i=0;i<profilesz;i++){
                t = i/(profilesz-1);
                fp = prof.c(t);
                lf = matmul4(fs,fp);
                //vertices.push(lf[12],lf[13],lf[14],1);
                //normals.push(lf[0],lf[1],lf[2],0);
                pushCol4(vertices,lf,3);
                pushCol4(normals,lf,0,-1); // invert!
                colors.push((2*j+i+0)%3?0:1,
                            (2*j+i+1)%3?0:1,
                            (2*j+i+2)%3?0:1,
                            1);
            }
        }

        // triangles as indices
        for (j=0; j<sweepsz-1; j++){
            for (i=0; i<profilesz-1; i++){
                vind.push(j*profilesz+i,   j*profilesz+i+1,     (j+1)*profilesz+i);
                vind.push(j*profilesz+i+1, (j+1)*profilesz+i+1, (j+1)*profilesz+i);
            }
        }


        // Add end caps (quite naive, assume convex profile curve
        // containing origin and curving to the left on xy-plane)
        // TODO: Separate, optional, function for making caps if needed.

/*
        // start cap (normal opposite of sweep tangent)
        fs = swp.c(0); // center point
        pushCol4(vertices,fs,3);
        pushCol4(normals,fs,2,-1);
        colors.push(1,0,0,1);
        for (i=0;i<profilesz;i++){
            t = i/(profilesz-1);
            fp = prof.c(t);
            lf = matmul4(fs,fp);
            colors.push(0,i%2,(i+1)%2,1);
            pushCol4(vertices,lf,3);
            pushCol4(normals,fs,2,-1);
        }

        // end cap (normal same as sweep tangent)
        fs = swp.c(1); // center point
        pushCol4(vertices,fs,3);
        pushCol4(normals,fs,2);
        colors.push(1,0,0,1);
        for (i=0;i<profilesz;i++){
            t = i/(profilesz-1);
            fp = prof.c(t);
            lf = matmul4(fs,fp);
            colors.push(0,i%2,(i+1)%2,1);
            pushCol4(vertices,lf,3);
            pushCol4(normals,fs,2);

            // Add faces here to avoid having another loop
            vind.push(sweepsz*profilesz,
                      1+sweepsz*profilesz+((i+1)%profilesz),
                      1+sweepsz*profilesz+i,
                      1+sweepsz*profilesz+profilesz,
                      1+sweepsz*profilesz+i+profilesz+1,
                      1+sweepsz*profilesz+((i+1)%profilesz)+profilesz+1
                     );

        }
*/

        // Fill in buffers (non-animated shapes)

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, faceBuf);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vind), gl.STATIC_DRAW);

        // "Compute", i.e., Bind and draw to pipeline
        this.c = function(gl){
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuf);
            gl.enableVertexAttribArray(i=gl.getAttribLocation(prg,"g"));
            gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuf);
            gl.enableVertexAttribArray(i=gl.getAttribLocation(prg,"v"));
            gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuf);
            gl.enableVertexAttribArray(i=gl.getAttribLocation(prg,"N"));
            gl.vertexAttribPointer(i, 4, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, faceBuf);
            gl.drawElements(gl.TRIANGLES, numfaces*3, gl.UNSIGNED_SHORT,0);
        };
    };




