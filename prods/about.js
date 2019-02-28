/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */

/**
 * Example thingy
 *
 * Now using the dirty small library.
 *
 * How-to:
 *
 * 1. Create a JavaScript file containing "(function(){BULK})();"
 *    where BULK is a catenation of the library, the soft-synth, this
 *    file, and *last of all* the main "on-load code".
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

http://sb.bitsnbites.eu/?data=U0JveAwC7ds9SsRQFAbQ7yXxYWVnH7DQHQi241LcgTaCRbowYCGEQZjFTGPlFtyMJshMpQsInAPf--NWr73c7WVynr5tHoa0n0OSs3o3rx-1NGPST_W5lqPp7TXZZtrNBfsl-_fdFAAAAAAAAFip76cyJyVdvfp9aS6SfjmcmmTjfPk_o08EAAAAAABgVdoMae-HlK-uu0nKbVeazePLYVOvy6lLthQeJ8f-2A2VAQAAAAAAsCo_

*/

// --------------------------------------------------------------------------------
// Variables used in this production, specifically:
var songBeatsPerMinute = 120;

// You can change/add whatever you want here:
var objTile, objBackground, objBall;


// --------------------------------------------------------------------------------

/**
 * Initialize the constant and pre-computed "assets" used in this
 * production; this function is called once before entering the main
 * loop.
 *
 * Things like graphics primitives / building blocks can be generated
 * here.
 */
function initAssets(){
    // Create primitive building blocks by different profile sweeps:

    // Now I have a box in the library.
    objBox = new Box(1);

    // Ball can be built from circle curves:
    objBall = new GenCyl(new funCircle(1,10,.5), 32,
                         new funCircle(0,32));

    // Can make the radius negative to make an interior of a ball:
    objBackground = new GenCyl(new funCircle(-10,10,.5), 32,
                               new funCircle(0,32));

}


/**
 * Return a scene graph for a specific time. Time given as 'beats' according to song tempo.
 *
 * This is an important function to re-write creatively to make your own entry.
 *
 */
function buildSceneAtTime(t){

    // Initialize empty scenegraph. Root node with nothing inside:
    var sceneroot={f:[],o:[],c:[]};

    // Animation parameters
    //var stufftrans=[translate_wi(0,0,0),rotY_wi(-t*.8),rotX_wi(t*.02)];
    var stufftrans=[];

    var some_color=
        [.1,.12,.05,1,
         .2,.4,.5,1,
         .6,.3,.1,2, // specular
         10,1,0,0];

    var cpohja=
        [.3,.2,.1,1,
         .9,.6,.4,1,
         0, 0, 0,1,
         0,1, 0,0];

    var ctausta=
        [.1, .1, .2, 1,
         .3, .0, .0, 1,
         .0, .0, .0, 1,
         .0, .1, .4, 0];

    var tausta = {
        f:[], //[rotZ_wi(t*.16)],
        o:[new Material(ctausta),objBackground],
        c:[]
    };

    sceneroot.c.push({f:[],
                      o:[],
                      c:[

                          {f:[rotY_wi(t*.16)],
                           o:[new Material(some_color),objBox],
                           c:[]},

                          {f:[rotX_wi(t*.02), rotY_wi(t*.02), translate_wi(3,0,0), rotY_wi(-t*.16)],
                           o:[new Material(some_color),objBox],
                           c:[]},

                          {f:[rotX_wi(.1),translate_wi(0,0,20)],
                           o:[],
                           c:[],
                           r:[new Camera()]
                          },
/*
                          {f:[rotY_wi(t*.02), scaleXYZ_wi(2,2,2)],
                           o:[],
                           c:[tausta]
                          },
*/
                      ]
                     }
                    );

    return sceneroot;
}




// --------------------------------------------------------------------------------

/**
 * (Optionally) initialize additional HTML and CSS parts of the
 * document. This can be used, for example, for scrolling or flashing
 * text shown as usual HTML or hypertext. Not often used in actual
 * demoscene productions.
 */
function initDocument(){
}

/**
 * (Optionally) update the HTML and CSS parts of the document. This
 * can be used for scrolling or flashing text shown as usual HTML. Not
 * often used in actual demoscene productions.
 */
function updateDocument(t){
}
