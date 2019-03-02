/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */
/**
 * @file Main executable script; automatically add this to the very end of production.
 *
 * This uses variables defined in {@link library.js} which should be
 * automatically added <strong>before</strong> the place where your own creative code
 * goes.
 */

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
        // Update canvas size (window object is implicit; need no "window.X")
        var w = innerWidth, h = innerHeight;
        if (w != Cw || h != Ch) {
            gl.viewport(0, 0, Cw=C.width=w, Ch=C.height=h);
        }

        dbg_show_aspect.nodeValue="Size: "+w+"x"+h+" "+w/h;      //DEBUG
        dbg_show_time.nodeValue=" time=" + (audio.currentTime|0) //DEBUG
                                         + "(beat " +(t|0)+ ")"; //DEBUG

        // Update the HTML and CSS parts, if you wanna have something like text..
        updateDocument(t);

        // Re-build the scenegraph for every frame (can animate):
        var sceneroot = buildSceneAtTime(t);

        // Scene is built. Then we actually draw it.
        // Clear buffer
        gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

        // Transfer perspective matrix to shader:
        var persmat = perspectiveFhc(5,w/h);
        gl.uniformMatrix4fv(gl.getUniformLocation(prg,"p"), false, persmat);

        // TODO: Could switch the shader based on time / object properties:
        gl.useProgram(prg);

        // Then we display the scenegraph
        findcam_wi(sceneroot,rotX_wi(0));

        // Set light position (very naive as of yet):
        // TODO: Multiple lights, included in the scenegraph as "Light objects".
        // As of now, we have to hardcode light position separately from the scene transforms:
	/* FIXME: 
        gl.uniform4fv(gl.getUniformLocation(prg, "l"),
                      matmul4(cameraTransformation,[1,.1,1.5,1]));
        */
        gl.uniform4fv(gl.getUniformLocation(prg, "l"),
		      defaultLightDirection);

        traverse_wi(sceneroot,cameraTransformation);

    }                                                    //DEBUG
    catch (err)                                          //DEBUG
    {                                                    //DEBUG
        alert("Error: " + err.message);                  //DEBUG
    }                                                    //DEBUG
};



/*-----------------------------------------------------------------
  This is what actually gets executed on loading the page!
-------------------------------------------------------------------*/

try                                                  //DEBUG
{                                                    //DEBUG
    // NOTE: In debug mode, should probably adhere to
    // https://www.khronos.org/webgl/wiki/FAQ ...
    _document.body.appendChild(C = _document.createElement("canvas"));
    s = C.style; s.position = "fixed"; s.left = s.top = 0;
    gl = C.getContext('experimental-webgl');
    if (!gl){                                        //DEBUG
        alert("This demo requires WebGL");           //DEBUG
        return;                                      //DEBUG
    }                                                //DEBUG
                                                     //DEBUG
    // Debug print of location and aspect            //DEBUG
    var dbg_show_aspect=document.createTextNode(""); //DEBUG
    var dbgInfoDiv=document.createElement("div");    //DEBUG
    document.body.appendChild(dbgInfoDiv);           //DEBUG
    dbgInfoDiv.style.position = "fixed";             //DEBUG
    dbgInfoDiv.style.right = 10;                     //DEBUG
    dbgInfoDiv.style.bottom = 10;                    //DEBUG
    dbgInfoDiv.style.color = "#eee";                 //DEBUG
    dbgInfoDiv.appendChild(dbg_show_aspect);         //DEBUG
    var dbg_show_time=document.createTextNode("");   //DEBUG
    dbgInfoDiv.appendChild(dbg_show_time);           //DEBUG
                                                     //DEBUG
    // Debug version seek, play and pause            //DEBUG
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
    gl.shaderSource(s, vertex_shader_minimal_with_normalmatrix);
    //gl.shaderSource(s, test_vert);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))                 //DEBUG
        alert("Vertex shader: "+ gl.getShaderInfoLog(s));             //DEBUG
    gl.attachShader(prg = gl.createProgram(), s);

    s = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(s, fragment_shader_camspace_directed_with_white_fog);
    //gl.shaderSource(s, fragment_shader_camspace_directed);
    //gl.shaderSource(s, fragment_shader_pointlight_cameraspace);
    //gl.shaderSource(s, noisz_frag);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))                 //DEBUG
        alert("Fragment shader: "+ gl.getShaderInfoLog(s));           //DEBUG
    gl.attachShader(prg, s);

    gl.linkProgram(prg);
    if (!gl.getProgramParameter(prg, gl.LINK_STATUS))                 //DEBUG
        alert("Link program: "+ gl.getProgramInfoLog(prg));           //DEBUG

    // Initialization code is now separated production-wise. Easier to find for editing.
    initAssets();
    // Things like scolltext could initialized in this call, also on product side:
    initDocument();


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
