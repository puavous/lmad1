/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */

/**
 * Rezykled
 *
 * This was, and still is, course material for our course "TIEA311
 * Principles of Computer graphics" (based on "6.837 Computer
 * Graphics" as published in MIT OCW). Am I a rogue teacher leaking
 * example answers here? No. I'm quite certain that a student who
 * manages to translate this convoluted Javascript snippet to
 * grade-worthy C++ exercise answers has earned the credit, probably
 * the "hard way", too.
 *
 * This code does dirty tricks to fit the final script in very small
 * storage space as if it was an entry of a demoscene "4k intro"
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
 * Browser support: This seems to load and run in desktop Chrome,
 * Edge, and Firefox, but not on IE. Mobile browsers unknown. On
 * Firefox the framerate seems to be low, and sometimes the output
 * skips many frames. The skips might have to do with garbage
 * collection (this code does leave a ton of rubbish behind every
 * frame) or some unusual interaction with the graphics card. To be
 * examined further...
 *
 **/

// TODOs inherited from last year:
// TODO: Separate shaders for easier modification, and include source
// after GLSL minification (... in some later production,
// perhaps.. the shaders in this one are so limited that they can be
// managed as inline strings).

// TODO: In debug mode, should probably adhere to this:
// https://www.khronos.org/webgl/wiki/FAQ

/*
The visuals of this production are synced to the following song
created using the great SoundBox minisynth:

http://sb.bitsnbites.eu/?data=U0JveAwC7dmxSsNAHMfx3_XSOCiifQApdBBHH8A3cNPJDjo4WyiIhWopQQmNEihBBxed-gIuvoKLT-BTSHe91ha1TcVBIdHvB-7-l2sPfvkTAqXPy1JJZU_VtrTbXpDmVZFjVehL5S0beJqW6Fq94ao3cX2jPHjPm095zw8AAAAAAAAAAJA5T4dGLwcy8vzK205hUWZ1syiZaYH7fMYIgmC4zLRByFHiQdrgw_VwK_P5eWABAAAAAAAAAAB-lN1vyz60C27pr7vp3DN25f6on_jbfsrfZQ013JcaSq_HJ1m_3VpNtaYb6bUZhFKojmI3h4qTcHzuIiP563XVW26k19ZZJEUubNfNkbpX0fhcnJG7-Gb_Xe9d2DhROHE-of-_3f9PPe-M6iVvSgAAAAD4V9zvxOZXgw4BAIC_xj6eGnsbyFS9ubXBhmfs3U5pb6O4ZEz6kXB2DWkoAAAAAAAAAAAA8uQV

http://sb.bitsnbites.eu/?data=U0JveAwC7ds_a1NRGMfx37nn5mRIKFZnJdBB3OwLcHbpUKiTHXRwNhBqWwzWy6ElNC2BcNGhi6LQF6CLs04uOrkVfA_S3T65MTaVq5PF3Pr9HJ7znD8Ezn1uuJDA_TYvNdUKWs2ke1lTamhBxis5llorPqaalutAh8Xo8Jf5C1XB6XmrqernBwAAAAAAAAAAmDlHj5y-P5RTGhbGK8mc3PWlmuSmJNF2fhMxxmI402LF71PkqwoAAAAAAAAAAPBX-QeZ_McssWFYtG4vdf7au43jPNwJLjlt2rSmoi_LT57O-oWuWxv3Zflxd9bP3-mos2VRnrd2-lJf-xpa39fweX_yuUHR7__z87fbanctynM39qSedi0GdthBboOzcup_3vU_U_PdH_kZz0gAAAAA-K_Y78Tun4IKAQCAi8Z_2nb-ZZRbTes3Rgup82_vXr5_q3apeJNstDTJP_9IL8k9SgkAAAAAAAAAAIAqce8zua9ZkGq3X9v8VeqS1lq9dTM5CMX-5J2yzYpf6Dr3GgAAAAAAAAAAAFMSZfIW-tAIyza_msp__jK8koc36WjfFWGtTa0AAAAAAAAAAABwgZwA

*/


// Everything will be inside one function eventually. I'll make the
// wrapper function in the Makefile, so it is commented out here:
// (function (){
// A redundant block to cheat automatic code formatting:
{ //DEBUG

// DONE (in Makefile): gl.CONSTANT names -> actual values -> Closure can minify those too


// Constants
    var PI=Math.PI;
//    var PI=3.141593

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
    // Observe: Everything looks transposed compared to the theory
    // slides and C++ codes. This is just because of column major
    // ordering used by Javascript arrays and the WebGL interface. The
    // mathematical meaning is the same, and you should remember that
    // what looks like a row here is actually a column if written as
    // actual math.

    // zero-matrix
    function zeros(){
        return [ 0, 0, 0, 0,
                 0, 0, 0, 0,
                 0, 0, 0, 0,
                 0, 0, 0, 0 ];
    };

    function translate(tx,ty,tz){
        return [ 1, 0, 0, 0,
                 0, 1, 0, 0,
                 0, 0, 1, 0,
                 tx, ty, tz, 1 ];
    };

    function scaleXYZ(sx,sy,sz){
        return [ sx, 0, 0, 0,
                 0, sy, 0, 0,
                 0, 0, sz, 0,
                 0, 0, 0, 1 ];
    };

    function scale(s){
        return scaleXYZ(s,s,s);
    };

    function rotZ(theta){
        var s = Math.sin(theta);
        var c = Math.cos(theta);
        return [ c, -s, 0, 0,
                 s,  c, 0, 0,
                 0,  0, 1, 0,
                 0,  0, 0, 1];
    };

    function rotY(theta){
        var s = Math.sin(theta);
        var c = Math.cos(theta);
        return [ c,  0, -s, 0,
                 0,  1, 0, 0,
                 s,  0, c, 0,
                 0,  0, 0, 1];
    };

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


    // "Re-inventing the cylinder" ------------------------------

    /**
     * Create an evaluator that can return a local frame for circle in
     * the xy plane. As in the MIT course assignment, but transposed.
     */
    function funCircle(radius,n){
        var r = radius;
        this.n = n; // Fidelity hint for the plane evaluator
        this.c = function(t){
            var s = Math.sin(t * 2 * PI);
            var c = Math.cos(t * 2 * PI);
            return [-c,  -s,   0, 0,  // normal
                     0,   0,   1, 0,  // binormal
                    -s,   c,   0, 0,  // tangent
                     c*r, s*r, 0, 1   // position
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
     * cross product trick from lecture notes, and then evaluate a
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
     * off.. ended up cheating for the first version, and this
     * function was unused..
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

    /*Trying one with transformed control points..*/
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
     * TODO: Think about another parameter for transforming control
     * points. Could be a size-aware way to get skewed shapes with
     * correct normals.. no need for inverse matrices anywhere if done
     * on the control point level!
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


    // Vertex shader: Just interpolate color (g) and position (v)
    // projected by perspective (p) and modelview (mv) transforms. We
    // transform normals by the modelview (not its inverse transpose)
    // so free scale / skew cannot be done with correct normals, Note:
    // Could use animation parameters such as time for some weird
    // geometry stuff here?.. but perhaps not necessary for basic
    // impact?

    var v =
        //"precision mediump float;"+ //Vertex shader has default prec.
        "uniform mat4 mv,p;" +
        "attribute vec4 g,v,N;" +
        "varying vec4 c,n,r;" +
        "void main(){" +
            "gl_Position=p*mv*v;" +
            "n=mv*N;" +     // Normal (assuming mv is orthonormal)
            "c=g;" +        // Color (in this case, graph coloring:))
            "r=-mv*v;" +    // View diRection
        "}";

    // Fragment shader: Only one unidirectional light is used.

    var f =
        //"precision mediump float;"+ // one-by-one definitions are shorter
        // Inputs:
        // a: ambient color  - now coming in as i[0]
        // d: diffuse color  - now coming in as i[1]
        // s: specular color - now coming in as i[2]
        // q: additional params [shininess, "par2", mesh_brightn]
        //     - now coming in as i[3]
        // l: light direction in camera space, pre-normalized
        // r: view direction, assume already normalized
        //
        // u: [time, window w, window h] - not used in this production
        'uniform highp mat4 i;' +
        'uniform highp vec4 l;' +
	    'varying highp vec4 c,n,r;' +
        'void main(){' +
            // win 10 bytes in packed space by re-normalizing n twice.
            // As always, time we can spend, but space not so much.
    	    'gl_FragColor=' +
                 // Locate triangle boundaries from "vertex coloring":
                'i[3].bbbb*max(0.,1.-4.*min(c.b,min(c.g,c.r)))' +
                 // Clamp output at ambient color (incl. alpha):
                '+max(i[0],'+
                     // Diffuse reflection
                     'i[1]*max(0.,dot(l,normalize(n)))' +
                     // Specular reflection
                     '+i[2]*pow(max(0.,dot(normalize(r),'+
                                          'reflect(-l,normalize(n))' +
                                  ')),' +
                               'i[3].r' +
                               ')' +
                     ')' +
	            ';' +
        '}';

    // Tentative material object..
    // colors==[a,d,s,q] could be a 4x4 matrix?
    // Yep, quite short code when colors are in a matrix:
    function Material(colors){
        var myc=colors.slice();
        this.c = function(gl){
            gl.uniformMatrix4fv(
                gl.getUniformLocation(prg,"i"), false, myc);
        }
    }


    // --------------------------------------------------------------------------------

    // control points for our cylinders
    var cur =
        [
            // 0: A roundish, squarish, symmetrical profile curve:
            [
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
            ],
            // 1: Rim of "E", like a sharp-angled C
            [
                3,4-.4,0,1,
                1,4-.4,0,1,
               -1,4-.4,0,1,
               -1,4-.4,0,1,
               -1, 0.4,0,1,
               -1, 0.4,0,1,
                1, 0.4,0,1,
                3, 0.4,0,1,
            ],
            //2: Horizontal middle bar, usable in "E" and "A", maybe "-" and "+"
            [
                -3  ,2,0,1,
                -1  ,2,0,1,
                 1  ,2,0,1,
                 3  ,2,0,1,
            ],

            //3: bendy
            [
             -0 ,  30.11   ,0,1,
              -1 ,  30   ,0,1,
              -4  ,  15  ,0,1,
              -4  ,  0   ,0,1,
              -4  , -15  ,0,1,
              -1  , -30.11,0,1,
             -0 , -30.11,0,1,
            ],

            //4: Vertical line of length 4 as in "I" or "1"
            [
                0,-10,0,1,
                0,2,0,1,
                0,2,0,1,
                0,14,0,1,
            ],
            //5: Yet another shape, for "surroundings"
            [
                -16, 32,0,1,
                  4, -9,0,1,
                  0,  4,0,1,
                 -4, 32,0,1,
            ],

        ];


    // "Globals needed in many routines":
    // Note that in unstrict mode some of these could be left
    // as document object properties for rude size optimization.
    var gl, C, Cw, Ch;
    var audio, prg, persmat;

    var os;

    var s;

    var loopfunc = function()
    {
        try                                                  //DEBUG
        {                                                    //DEBUG
		    // Time from the audio object. Interpret as beat (bpm 144)
            var t = audio.currentTime * 2.4;
            // Update canvas size
            //var w = window.innerWidth, h = window.innerHeight;
            var w = innerWidth, h = innerHeight;  //window object is implicit
            if (w != Cw || h != Ch) {
                gl.viewport(0, 0, Cw=C.width=w, Ch=C.height=h);
                dbg_show_aspect.nodeValue="Size: "+w+"x"+h+" "+w/h;  //DEBUG
            }
            dbg_show_time.nodeValue=" time=" + (audio.currentTime|0) //DEBUG
                                             + "(beat " +(t|0)+ ")"; //DEBUG

            persmat = perspectiveFhc(5,w/h);

            // Could do funky perspective modulation:
            //persmat = perspectiveF(5-4*Math.sin(t),w/h,.1,100.);

            function traverse(node,ms){
                ms=node.f.reduce(matmul4,ms);
                gl.uniformMatrix4fv(
                    gl.getUniformLocation(prg,"mv"), false, ms);
                node.o.map(function(o){o.c(gl);}); // map < forEach :)
                node.c.map(function(c){traverse(c,ms);});
            }

		    // Could switch the shader based on time / object properties:
            gl.useProgram(prg);

            // "Camera":
            var sceneroot={f:[],o:[],c:[]};

            // Animation parameters
            var camtrans=[translate(0,-2,-8),rotX(-.6)];
            var stufftrans=[rotX(-.3),translate(0,-2,-8),rotY(t*.2)];

            // take this somewhere?
            var colors=
                [.1,0,0,1,
                 .1,.6,.8,2,
                 2,2,1,1,
                 8,1,0,0];

            // Clear buffer
            gl.clearColor(.3, .3, .3, 1);
            gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

            // Transfer perspective matrix to shader:
            gl.uniformMatrix4fv(gl.getUniformLocation(prg,"p"), false, persmat);

            // Set light direction (quite naive as of yet):
            // Hmm... correct normalization not so important here?
            gl.uniform4fv(gl.getUniformLocation(prg, "l"),
                          nmld([1,1,1,0]));

            // Re-build the scenegraph for every frame (can animate):
            var tt =0;

            function makeStuff(t,ydist,disperse){
                var stuff = {
                    f: [],
                    o: [],
                    c: []
                };


                for(var i=0;i<10;i++){
                    for(var j=0; j<10; j++){
                        var c=(i%2+j%2);
                        var clr=
                            [.1,0,0,1,
                             c,.1,.1,1,
                             .8,.8,.8,2,
                             12,1,0,0];

                        stuff.c.push({f: [rotX(0),
                                          translate((1+disperse)*(i-5),
                                                    ydist,
                                                    (1+disperse)*(j-5)),
                                          rotZ(i+j+t)],
                                      o: [new Material(clr),os[6]],
                                      c: []
                                     });
                    }
                }

                return stuff;
            }

            var modder = 0;
            if (t<32){
                modder = 16;
            } else if (t<48 ) {
                modder = 8;
            } else if (t<64 ) {
                modder = 4;
            } else if (t<80 ) {
                modder = 4;
            } else if (t<96 ) {
                modder = 8;
            } else if (t<128 ) {
                modder = 4;
            } else if (t<160 ) {
                modder = 16;
            } else {
                modder = 1;
            }

            fadeout=(t<170)?1:((174-t)/4); // njaa..

            var stuff = makeStuff((t/modder)%2<1?t:t/modder,
                                  2,
                                  2-1-(Math.sin(PI*t)|1)
                                 );
/*
            for(var i=(t%4)|0;i<17-(t%4);i++){
                for(var j=16-(t%16); j<18; j++){
                    var c=(i+j)%4;
                    var clr=
                        [.1,0,0,1,
                         .1,.1,c,1,
                         .8,.8,.8,2,
                         8,1,0,0];

                    stuff.c.push({f: [rotX(j/2),rotZ(i/2),translate(i-9,2,j-9)],
                                  o: [new Material(clr),os[6]],
                                  c: []
                                 });
                }
            }
*/
            var tsyk=1-(t%2);

            var ctausta=
                [.1,.1,.1,1,
                 .6,.6,.6,1,
                 .8,.8,.6,2,
                 2,1,0.01,0];

            var tausta = {
                f:[translate(0,0,0),rotZ(t*.02),rotY(t*.02),rotX(Math.PI/2)],
                o:[new Material(ctausta),os[7]],
                c:[]
            };



            sceneroot.c.push({f:camtrans,
                              o:[new Material(colors)],
                              c:[
                                  {f:stufftrans,
                                   o:[],
                                   c:[{f:[translate(0,-3,-tt),rotY(t*.02)],
                                       o:[],
                                       c:[stuff]
                                      },
                                     {f:[translate(0,-3,-tt),rotZ(t*.02)],
                                       o:[],
                                       c:[stuff]
                                     },
                                     {f:[translate(0,-3,-tt),rotX(t*.02)],
                                       o:[],
                                       c:[stuff]
                                      }]
                                  },
                                  {f:[],
                                   o:[],
                                   c:[tausta]
                                  }
                              ]
                             }
                            );

            // Then we display it (unless at end):
            if (t<170)
                traverse(sceneroot,rotX(0));

        }                                                    //DEBUG
        catch (err)                                          //DEBUG
        {                                                    //DEBUG
            alert("Error: " + err.message);                  //DEBUG
        }                                                    //DEBUG
    };

    // Start here
    try                                                  //DEBUG
    {                                                    //DEBUG
        var _document=document; // minify "document" name too
        _document.body.appendChild(C = _document.createElement("canvas"));
        s = C.style; s.position = "fixed"; s.left = s.top = 0;
        gl = C.getContext('experimental-webgl');
        //gl = C.getContext('webgl');
        if (!gl){                                        //DEBUG
            alert("This demo requires WebGL");           //DEBUG
            return;                                      //DEBUG
        }                                                //DEBUG

        // Debug print of location and aspect
        var dbg_show_aspect=document.createTextNode(""); //DEBUG
        var dbgInfoDiv=document.createElement("div");    //DEBUG
        document.body.appendChild(dbgInfoDiv);           //DEBUG
        dbgInfoDiv.style.position = "fixed";             //DEBUG
        dbgInfoDiv.style.right = 10;                     //DEBUG
        dbgInfoDiv.style.bottom = 10;                    //DEBUG
        dbgInfoDiv.style.color = "#fff";                 //DEBUG
        dbgInfoDiv.appendChild(dbg_show_aspect);         //DEBUG
        var dbg_show_time=document.createTextNode("");   //DEBUG
        dbgInfoDiv.appendChild(dbg_show_time);           //DEBUG

        // Debug version seek, play and pause
        C.addEventListener("click", function(e){         //DEBUG
            audio.currentTime =                          //DEBUG
                e.pageX/C.width*audio.duration;          //DEBUG
            if (e.pageY<(C.height/2))audio.pause();      //DEBUG
            else audio.play();                           //DEBUG
            for(var t=(audio.currentTime*2.75)|0;t>=0;t--){  //DEBUG
            }                                            //DEBUG
        });                                              //DEBUG


        // Apply p01's trick for grabbing short names from GL obj
        // (http://slides.com/pdesch/js-demoscene-techniques#/5/6)
        // This didn't help me earlier when trying to make a 1k..
        // is OK now for 4k. saves something like 30 bytes / 4kb.
        // Not much.. The trick itself costs some 45 bytes compressed.

        for(s in gl){
            //For creating a sed script to change original names:
            //var shortname = k.match(/^..|[A-Z]|\d\D+$/g).join('');
            //console.log("s/gl\\."+k+"(/gl."+shortname+"(/g");
            gl[s.match(/^..|[A-Z]|\d\D+$/g).join('')]=gl[s];

            //The following is bloaty, but works with "use strict":
            //gl[k.match(/^[a-z].|[A-Z](?=[a-z])|\d\D+$/g).join('')]=gl[k];
        }

        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE); // Performance opt., costs 6 bytes.

        // Initializations seem to pack a bit better inlined.
        // prg = gl.createProgram();

        // Reuse the variable name "s"
        s = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(s, v);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))                 //DEBUG
            alert("Vertex shader: "+ gl.getShaderInfoLog(s));             //DEBUG
        gl.attachShader(prg = gl.createProgram(), s);

        s = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(s, f);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))                 //DEBUG
            alert("Fragment shader: "+ gl.getShaderInfoLog(s));           //DEBUG
        gl.attachShader(prg, s);

        gl.linkProgram(prg);
        if (!gl.getProgramParameter(prg, gl.LINK_STATUS))                //DEBUG
            alert("Link program: "+ gl.getProgramInfoLog(prg));          //DEBUG


        // Create primitive building blocks by different profile sweeps:
        var prof=cur[0];
/*
        os=cur.map(function(cps){
            return new GenCyl(new funBSplineXYnoInf(prof),17,
                              new funBSplineXYnoInf(cps));});
        os.push(new GenCyl(new funBSplineXYnoInf(cur[3]),17,
                           new funCircle(5, 5)));
*/
        os=cur.map(function(cps){
            return new GenCyl(new funBSpline(prof),17,
                              new funBSpline(cps));});
/*
        os.push(new GenCyl(new funBSplineTransformed(cur[0],scaleXYZ(.1,10,0)),17,
                           new funCircle(15,  9)));
*/
        os.push(new GenCyl(new funBSplineTransformed(cur[0],scaleXYZ(.04,.45,0)),13,
                           new funBSplineTransformed(cur[0],scaleXYZ(.45,.001,0))));

        os.push(new GenCyl(new funBSplineTransformed(cur[0],scaleXYZ(.1,30,0)),27,
                           new funCircle(25,  9)));



        var audio,player=new CPlayer();
        player.init(song);
        while (player.generate() < 1){};
        audio = _document.createElement("audio");
        audio.src = URL.createObjectURL(new Blob([player.createWave()],
                                                 {type: "audio/wav"}));
        audio.play();

        // Start the main loop
        setInterval(loopfunc, 20);

    }                                                    //DEBUG
    catch (err)                                          //DEBUG
    {                                                    //DEBUG
        alert("Error initializing: " + err.message);     //DEBUG
    }                                                    //DEBUG

} //DEBUG

//})();
