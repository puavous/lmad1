/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */
/**
 * @fileOverview Main executable script; this should be appended to the very
 * end of the executable code (preferrably using automatic tools).
 *
 * This uses variables defined in {@link library.js} which should be
 * automatically added <strong>before</strong> the place where your
 * own creative code goes.
 */

var SAMPLE_RATE = 44100;
var startTimeInMillis = null;

var dbg_ms_at_last_seek = null; //DEBUG
var dbg_ms_offset = 0;          //DEBUG
var dbg_paused = false;         //DEBUG

/**
 * This is the event loop that happens on every frame.
 *
 * Assumes prior initialization of C (canvas).
 *
 * Assumes prior initialization of gl and prg.
 *
 * Debug mode needs initialization of dbg_xxx
 * 
 * Delegates actual update to user-selected draw function. Could change the intro type easily.
 *
 */
var loopfunc = function(curTimeInMillis)
{
    try                                                          //DEBUG
    {                                                            //DEBUG
        // Time of this frame; fix beginning upon first entry.
 	    if (!startTimeInMillis) startTimeInMillis = curTimeInMillis;
        // In compo mode, compute t as the music beat since start of show:
        var t = (curTimeInMillis - startTimeInMillis) * songBeatsPerMinute / 60000;

        // In debug mode, time is a bit more elaborate, because we want to
        // be able to seek back and forth.
        if (!dbg_ms_at_last_seek) dbg_ms_at_last_seek = startTimeInMillis; //DEBUG
        var dbg_ms_since_last_seek = curTimeInMillis - dbg_ms_at_last_seek; //DEBUG
        if (dbg_paused) dbg_ms_since_last_seek = 0; //DEBUG
        t = (dbg_ms_offset + dbg_ms_since_last_seek) * songBeatsPerMinute / 60000; //DEBUG

        // Update canvas size (window object is implicit; need no "window.X")
        var w = innerWidth, h = innerHeight;
        if (w != Cw || h != Ch) {
            gl.viewport(0, 0, Cw=C.width=w, Ch=C.height=h);
        }

        /* In debug mode, show window size, aspect ratio, and time.       */
        /* Omit info if the URL ends in '#'. Use for tidy screenshots...  */
        dbg_url=window.location.href;                                //DEBUG
        if (dbg_url.substring(dbg_url.length -1)!='#'){              //DEBUG
            dbg_show_aspect.nodeValue="Size: "+w+"x"+h+" "+w/h;      //DEBUG
            dbg_show_time.nodeValue=" time=" + Math.floor(audio_time / SAMPLE_RATE) +"s" /*(audio.currentTime|0)*/ //DEBUG
                                         + "(beat " +(t|0)+ ")";     //DEBUG
        }                                                            //DEBUG

        frameProducerFunction(t, w, h);
	    requestAnimationFrame(loopfunc);

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

    // This is the tiniest way I can do to hint at clicking to play...
    _document.body.innerHTML="Click!";
    _document.body.appendChild(C = _document.createElement("canvas"));
    s = C.style; s.position = "fixed"; s.left = s.top = 0;
    // TODO: Actually use the features of WebGL2.
    // Like.. https://webgl2fundamentals.org/webgl/lessons/webgl1-to-webgl2.html
    // Today, my library still uses only webgl1. But now I'm rid
    // of the long string 'experimental-webgl' that hung around for Edge.
    gl = C.getContext('webgl2');
    if (!gl){                                        //DEBUG
        alert("This demo requires WebGL2");          //DEBUG
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
    dbgInfoDiv.style.color = "#cde";                 //DEBUG
    dbgInfoDiv.appendChild(dbg_show_aspect);         //DEBUG
    var dbg_show_time=document.createTextNode("");   //DEBUG
    dbgInfoDiv.appendChild(dbg_show_time);           //DEBUG
                                                     //DEBUG

    // Apply p01's trick for grabbing short names from GL obj
    // (http://slides.com/pdesch/js-demoscene-techniques#/5/6)
    // This didn't help me earlier when trying to make a 1k..
    // is OK now for 4k. saves something like 30 bytes / 4kb.
    // Not much.. The trick itself costs some 45 bytes compressed.
    // In 2023 I'm safeguarding against name clashes, so the regex
    // changes a bit from earlier versions.
    var dbgNameLists = {}; //DEBUG
    for(s in gl){
        // Instanssi 2023 still had: gl[s.match(/^..|[A-Z]|\d\D+$/g).join('')]=gl[s];
        // Contemplation at some point.. some alternatives with few clashes:
        // gl[s.match(/^.|[A-Zhol]|\d|[ruiv]+$/g).join('')]=gl[s];
        //gl[s.match(/^.|[A-Zlp]|\d.|[fv]+$/g).join('')]=gl[s];
        //gl[s.match(/^.|[A-Zlp]|\d.*$/g).join('')]=gl[s];
        //gl[s.match(/^.|[A-Zlp\d]|[fuiv]+$/g).join('')]=gl[s];

        // The trick itself:
        const trick_regex = /^.|[A-Zlp1-4]|[fuiv]*$/g;
        gl[s.match(trick_regex).join('')] = gl[s];
        // Gather names for clash inspection and creating a minifier:    //DEBUG
        var shortname = s.match(trick_regex).join('');                   //DEBUG
        if (shortname in dbgNameLists) {dbgNameLists[shortname].push(s); //DEBUG
        } else { dbgNameLists[shortname]=[s]; }                          //DEBUG
    }
    // Inspect all names and clashing ones //DEBUG
    var dbgClashing = {};               //DEBUG
    for(s in dbgNameLists)              //DEBUG
        if ((dbgNameLists[s].length>1)  //DEBUG 
            && (!dbgNameLists[s][0].match(/^[A-Z]/g))) //DEBUG
                dbgClashing[s]=dbgNameLists[s]; //DEBUG
    console.log(dbgNameLists);          //DEBUG
    console.log(dbgClashing);           //DEBUG
    // Output a sed script to change original names that don't clash:   //DEBUG
    // Then we should be safe... Can use any name; minified if possible //DEBUG
    var dbgSedStrings=[];               //DEBUG
    for (s in dbgNameLists) {           //DEBUG
        if ((dbgNameLists[s].length==1) //DEBUG
            && (!dbgNameLists[s][0].match(/^[A-Z]/g)) //DEBUG
            ) {dbgSedStrings.push("s/gl\\."+dbgNameLists[s][0]+"(/gl."+s+"(/g"); //DEBUG
        }                               //DEBUG
    }                                   //DEBUG
    // console.log(dbgSedStrings.join('\n')); //DEBUG

    // Initializations seem to pack a bit better inlined.
    // prg = gl.createProgram();
    // TODO: Multiple, switchable shaders!

    // Reuse the variable name "s"
    s = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(s, shaders[0]);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))                 //DEBUG
        alert("Vertex shader: "+ gl.getShaderInfoLog(s));             //DEBUG
    gl.attachShader(prg = gl.createProgram(), s);

    s = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(s, shaders[1]);
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
    var player = new CPlayer();
    player.init(song);
    while (player.generate() < 1){};

    var audio_time = 0;

    /**
     * The onaudioprocess handler that gets called for audio output. 
     * This will add to audio_time which is much coarser than animation frame
     * rate.
     * 
     * Debug mode enables seeking and pausing with clicks by means of updating
     * audio_time and aligning actual animation time to it.
     * Debug mode outputs silence here when paused.
     */
    function audioHandler(event){
        if (dbg_paused) event.outputBuffer.getChannelData(0).fill(0); else { //DEBUG
         
        player.cpy(audio_time, 4096, event.outputBuffer.getChannelData(0));
        audio_time += 4096;

        } //DEBUG
    };


    /* Nowadays, browsers allow media only upon user event, so click pls: */
    // I used to have _document.onclick here, but Timo taught me that the
    // window itself has an onclick property, so let's use that one...
    onclick=()=>
        {
            // Accidental double clicks make it a mess; prevent that:
            onclick = null;
        /* In debug mode I want to control the fullscreen myself, so iffalse..*/
        if (false)                                     //DEBUG
            C.style.cursor='none';
        if (false)                                     //DEBUG
            C.requestFullscreen();

 	    var audioctx = new AudioContext({sampleRate:SAMPLE_RATE});
 	    var sp = audioctx.createScriptProcessor(4096, 0, 1);
 	    sp.connect(audioctx.destination);
 	    sp.onaudioprocess = audioHandler;
 	    requestAnimationFrame(loopfunc);

        /* In debug mode I want to be able to seek, so wire a callback : */
        C.addEventListener("click", function(e){             //DEBUG
            // Audio seek by just setting sample index:      //DEBUG
            audio_time =                                     //DEBUG
                e.pageX/C.width*player.ns() | 0;             //DEBUG
            // Handle seek and pausing in debug mode:        //DEBUG
            dbg_ms_offset = audio_time / SAMPLE_RATE * 1000; //DEBUG
            dbg_ms_at_last_seek = performance.now();         //DEBUG
            if (e.pageY<(C.height/2)) dbg_paused = true;     //DEBUG
            else dbg_paused = false;                         //DEBUG
        });                                                  //DEBUG

    };
}                                                    //DEBUG
catch (err)                                          //DEBUG
{                                                    //DEBUG
    alert("Error initializing: " + err.message);     //DEBUG
}                                                    //DEBUG
