/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */

/**
 * Example thingy
 *
 * Now using the dirty small library.
 *
 * How-to:
 *
 * 1. Create a JavaScript file containing "(function(){BULK})();"
 *    where BULK is a catenation of the library, the soft-synth, and this
 *    file.
 *
 * 2. <!-- To run in "debug mode", create an HTML file containing
 *    "<html><head /><body><script>JS</script></body></html>" where JS
 *    is the JavaScript produced in step 1. Open in a browser that
 *    happens to accept the beast. -->
 *
 * 3. To produce a minified "intro competition" version, use the
 *    provided GNU Makefile or other means (automatic, to keep sane)
 *    to do the following: Remove debugging code and other redundant
 *    functionality (lines that end with "DEBUG". Feed into a
 *    JavaScript minifier like Closure. Then pack with PNGinator or
 *    JSExe or similar.
 *
 *    TODO: Write some "batch file" for Windows users who don't want
 *    to install MinGW or similar GNU toolset.
 *
 **/

/*
The visuals of this production are synced to the following song
created using the great SoundBox minisynth:

http://sb.bitsnbites.eu/?data=U0JveAwC7d0xaxRBFADg93bPixyIRYQjBDQgIiGFYi1YC2nSSArLq440op4HGrKeoNhcZRGsrCzyC_IXUon-AW38B_bn3u1xZ5rUnn7f7pudN8w0w3YDb36sR3Riay0mxxF3j9citm90Y6aYRKzfKR-3YmkQo3gf7-JtHMbLGM7GqgAAAAAAAIAVNXmWMRlGHrXaN5uRovO6szXtZGbktM0YjyPqdxnj830AAAAAAABYKZ-qrCPyW-vSTp3eb0X59Ens7pQbOTsom5nNHM1XnPuOljkAAAAAAACsiuxVkWfV9CBsc6NuemUU905f_NprX8miWByT9edPRH_QX2SDGA4P4mBehPFv1r8w7_sPAAAAAAAA_jtVE4dRPmwG8uf3uHU79-d3kzVFFyMuDAAAAAAAAFglZa-K8qwq6m63WzcnVzOvf_n65vPlk_bybrL8OI7xB7sFAAAAAADAP2JadLFoii4-2I5p0cUsHp1ei73281zMyRjUn8Efy5r8Vd0e2UMAAAAAAABWzm8

*/

// TODO: In debug mode, should probably adhere to https://www.khronos.org/webgl/wiki/FAQ

// --------------------------------------------------------------------------------

// "Globals needed in many routines":
// Note that in unstrict mode some of these could be left
// as document object properties for rude size optimization.
var C, Cw, Ch;      // Canvas object and previous width and height
var audio;          // Audio object needed for song playback
var persmat;        // Perspective matrix TODO: No need to be global!?
var s;              // Temporary variable for "style" but also other things

// Variables used in this production, specifically:
var songBeatsPerMinute = 130;
var objTile, objBackground, objBall;

/**
 * This is the event loop that happens on every frame. 
 *
 * Assumes prior initialization of C (canvas), audio.
 *
 * Assumes prior initialization of gl and prg.
 *
 * Debug mode needs initialization of dbg_xxx
 *
 */
var loopfunc = function()
{
    try                                                          //DEBUG
    {                                                            //DEBUG
        // Time from the audio object. Interpret as beat.
        var t = audio.currentTime * (songBeatsPerMinute/60);
        // Update canvas size
        var w = innerWidth, h = innerHeight;  //window object is implicit
        if (w != Cw || h != Ch) {
            gl.viewport(0, 0, Cw=C.width=w, Ch=C.height=h);
            dbg_show_aspect.nodeValue="Size: "+w+"x"+h+" "+w/h;  //DEBUG
        }
        dbg_show_time.nodeValue=" time=" + (audio.currentTime|0) //DEBUG
                                         + "(beat " +(t|0)+ ")"; //DEBUG

        persmat = perspectiveFhc(5,w/h);

        // Could switch the shader based on time / object properties:
        gl.useProgram(prg);

        // Re-build the scenegraph for every frame (can animate):

        // Initialize empty scenegraph. Root node with nothing inside:
        var sceneroot={f:[],o:[],c:[]};

        // Animation parameters
        var camtrans=[translate_wi(0,0,-10)];
        var stufftrans=[translate_wi(0,0,0),rotY_wi(-t*.8),rotX_wi(t*.02)];

        // TODO: Neater place for these.. perhaps call createScene(t) here;
        function makeStuff(t,ydist,disperse){
            var stuff = {
                f: [],
                o: [],
                c: []
            };

            var clr=
                [.1,.12,.05,1,
                 .2,.4,.5,1,
                 .6,.3,.1,2, // specular
                 10,1,0,0];

            stuff.c.push({f: [translate_wi(0,0,0)],
                          o: [new Material(clr),objTile],
                          c: []
                         });

            stuff.c.push({f: [translate_wi(2,0,0)],
                          o: [new Material(clr),objBall],
                          c: []
                         });

            stuff.c.push({f: [translate_wi(-2,0,0),rotX_wi(t),scaleXYZ_wi(1.1,.2,3+.1*Math.sin(PI*t))],
                          o: [new Material(clr),objBall],
                          c: []
                         });

            stuff.c.push({f: [translate_wi(-3,0,0),rotX_wi(t*1.05),scaleXYZ_wi(1.1,.2,3+.1*Math.sin(PI*t))],
                          o: [new Material(clr),objBall],
                          c: []
                         });

            stuff.c.push({f: [translate_wi(-4,0,0),rotX_wi(t*1.1),scaleXYZ_wi(1.1,.2,3+.1*Math.sin(PI*t))],
                          o: [new Material(clr),objBall],
                          c: []
                         });

            return stuff;
        }

        var stuff = makeStuff(2*t,0,0);

        var cpohja=
            [.3,.2,.1,1,
             .9,.4,.2,1,
             1, 1, 1,2,
             2,1, 0,0];

        var ctausta=
            [.1,.1,.2,1,
             .3,.3,.8,1,
              1, 1, 1,2,
             2,1,0.4,0];

        var tausta = {
            f:[rotZ_wi(t*.16)],
            o:[new Material(ctausta),objBackground],
            c:[]
        };

        sceneroot.c.push({f:camtrans,
                          o:[],
                          c:[
                              {f:[translate_wi(0,-2,0),scaleXYZ_wi(30,.1,30)],
                               o:[new Material(cpohja),objTile],
                               c:[]},
                              {f:stufftrans,
                               o:[],
                               c:[stuff]},
                              {f:[],
                               o:[],
                               c:[tausta]
                              }
                          ]
                         }
                        );

        // Scene is built. Then we actually draw it.
        // Clear buffer
        gl.clearColor(.3, .3, .3, 1);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

        // Transfer perspective matrix to shader:
        gl.uniformMatrix4fv(gl.getUniformLocation(prg,"p"), false, persmat);

        // Set light position (very naive as of yet):
        // TODO: Multiple lights, included in the scenegraph as "Light objects".
        // As of now, we have to hardcode light position separately from the scene transforms:
        gl.uniform4fv(gl.getUniformLocation(prg, "l"),
                      [-3,2,-6,1]);

        // Then we display the scenegraph
        traverse_wi(sceneroot,rotX_wi(0));

    }                                                    //DEBUG
    catch (err)                                          //DEBUG
    {                                                    //DEBUG
        alert("Error: " + err.message);                  //DEBUG
    }                                                    //DEBUG
};

// Execution starts here.
try                                                  //DEBUG
{                                                    //DEBUG
    var _document=document; // minify "document" name too
    _document.body.appendChild(C = _document.createElement("canvas"));
    s = C.style; s.position = "fixed"; s.left = s.top = 0;
    gl = C.getContext('experimental-webgl');
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
        for(var t=(audio.currentTime*(               //DEBUG
            songBeatsPerMinute/60))|0;t>=0;t--){     //DEBUG
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
    //gl.shaderSource(s, vertex_shader_minimal_with_normalmatrix);
    gl.shaderSource(s, test_vert);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))                 //DEBUG
        alert("Vertex shader: "+ gl.getShaderInfoLog(s));             //DEBUG
    gl.attachShader(prg = gl.createProgram(), s);

    s = gl.createShader(gl.FRAGMENT_SHADER);
    //gl.shaderSource(s, fragment_shader_pointlight_cameraspace);
    gl.shaderSource(s, noisy_frag);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))                 //DEBUG
        alert("Fragment shader: "+ gl.getShaderInfoLog(s));           //DEBUG
    gl.attachShader(prg, s);

    gl.linkProgram(prg);
    if (!gl.getProgramParameter(prg, gl.LINK_STATUS))                 //DEBUG
        alert("Link program: "+ gl.getProgramInfoLog(prg));           //DEBUG


    // Create primitive building blocks by different profile sweeps:
    // TODO: Neater place for these? Call some init_primitives() here?
/*
    var prof=cptsHuge;
    objTile = new GenCyl(new funBSplineTransformed(prof,scaleXYZ(.04,.45,0)),13,
                         new funBSplineTransformed(prof,scaleXYZ(.45,.001,0)));

    // Now we can make a ball by half-a-ball and zero-radius-ball
    objTile = new GenCyl(new funCircle(1,12,.5), 12,
                         new funCircle(0,12));
*/

    // Now I have a box in the library.
    objTile = new Box(1);

    // Ball can be built from circle curves:
    objBall = new GenCyl(new funCircle(1,10,.5), 32,
                               new funCircle(0,32));

    // Can make the radius negative to make an interior of a ball:
    objBackground = new GenCyl(new funCircle(-30,10,.5), 32,
                               new funCircle(0,32));


    /* Initialize song. */
    var audio,player = new CPlayer();
    player.init(song);
    while (player.generate() < 1){};
    audio = _document.createElement("audio");
    audio.src = URL.createObjectURL(new Blob([player.createWave()],
                                             {type: "audio/wav"}));
    /* Start audio and graphics */
    audio.play();
    setInterval(loopfunc, 20);

}                                                    //DEBUG
catch (err)                                          //DEBUG
{                                                    //DEBUG
    alert("Error initializing: " + err.message);     //DEBUG
}                                                    //DEBUG

