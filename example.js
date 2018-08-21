/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */

/**
 * Rezykled
 *
 * Now using the dirty small library.
 *
 * How-to: catenate the library, the soft-synth, and this file.
 * Surround with function{...} and feed into a JavaScript minifier
 * like Closure.
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

http://sb.bitsnbites.eu/?data=U0JveAwC7d0xaxRBFADg93bPixyIRYQjBDQgIiGFYi1YC2nSSArLq440op4HGrKeoNhcZRGsrCzyC_IXUon-AW38B_bn3u1xZ5rUnn7f7pudN8w0w3YDb36sR3Riay0mxxF3j9citm90Y6aYRKzfKR-3YmkQo3gf7-JtHMbLGM7GqgAAAAAAAIAVNXmWMRlGHrXaN5uRovO6szXtZGbktM0YjyPqdxnj830AAAAAAABYKZ-qrCPyW-vSTp3eb0X59Ens7pQbOTsom5nNHM1XnPuOljkAAAAAAACsiuxVkWfV9CBsc6NuemUU905f_NprX8miWByT9edPRH_QX2SDGA4P4mBehPFv1r8w7_sPAAAAAAAA_jtVE4dRPmwG8uf3uHU79-d3kzVFFyMuDAAAAAAAAFglZa-K8qwq6m63WzcnVzOvf_n65vPlk_bybrL8OI7xB7sFAAAAAADAP2JadLFoii4-2I5p0cUsHp1ei73281zMyRjUn8Efy5r8Vd0e2UMAAAAAAABWzm8

*/

// A redundant block to cheat automatic code formatting:
{ //DEBUG

// DONE (in Makefile): gl.CONSTANT names -> actual values -> Closure can minify those too

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
    // Could have like a "library of nice preset curves"
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

    // --------------------------------------------------------------------------------

    // "Globals needed in many routines":
    // Note that in unstrict mode some of these could be left
    // as document object properties for rude size optimization.
    var gl, C, Cw, Ch;
    var audio, prg, persmat;

    var objTile, objBackground;

    var s;

    var loopfunc = function()
    {
        try                                                  //DEBUG
        {                                                    //DEBUG
		    // Time from the audio object. Interpret as beat.
            var t = audio.currentTime * (130/60);
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

            // Re-build the scenegraph for every frame (can animate):
            // Animation parameters
            var camtrans=[translate(0,-1,-4),rotX(-.6)];
            var stufftrans=[rotX(-.3),translate(0,-2,-5),rotY(t*.2)];
            var tt = Math.sin(t/8);


            // Clear buffer
            gl.clearColor(.3, .3, .3, 1);
            gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

            // Transfer perspective matrix to shader:
            gl.uniformMatrix4fv(gl.getUniformLocation(prg,"p"), false, persmat);

            // Set light direction (quite naive as of yet):
            // Hmm... correct normalization not so important here?
            gl.uniform4fv(gl.getUniformLocation(prg, "l"),
                          nmld([1,1,1,0]));

            function makeStuff(t,ydist,disperse){
                var stuff = {
                    f: [],
                    o: [],
                    c: []
                };

                var clr=
                    [.1,0,0,1,
                     1,.1,.1,1,
                     .8,.8,.8,2,
                     12,1,0,0];

                stuff.c.push({f: [translate(Math.sin(ydist),disperse,0), rotX(ydist)],
                              o: [new Material(clr),objTile],
                              c: []
                             });
                return stuff;
            }

            var stuff = makeStuff(t,
                                  t+2-(t%2),
                                  Math.sin(t/20)
                                 );

            var ctausta=
                [.1,.1,.1,1,
                 .6,.6,.6,1,
                 .8,.8,.6,2,
                 2,1,0.4,0];

            var tausta = {
                f:[translate(0,0,0),rotZ(t*.02),rotY(t*.02),rotX(Math.PI/2)],
                o:[new Material(ctausta),objBackground],
                c:[]
            };

            sceneroot.c.push({f:camtrans,
                              o:[],
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

            // Then we display it
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
            for(var t=(audio.currentTime*(130/60))|0;t>=0;t--){  //DEBUG
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
        // TODO: Multiple, switchable shaders!

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
/*
        var prof=cptsHuge;
        objTile = new GenCyl(new funBSplineTransformed(prof,scaleXYZ(.04,.45,0)),13,
                             new funBSplineTransformed(prof,scaleXYZ(.45,.001,0)));
*/
        // Now we can make a ball by half-a-ball and zero-radius-ball
        objTile = new GenCyl(new funCircle(1,12,.5), 12,
                             new funCircle(0,12));

        // Can make the radius negative to make an interior of a ball:
        objBackground = new GenCyl(new funCircle(-30,10,.5), 32,
                                   new funCircle(0,32));


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
