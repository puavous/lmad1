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

http://sb.bitsnbites.eu/?data=U0JveAwC7dm9SsNQGMbx56RpBoeqizgGexWCuzeiWIoSxBIIRcwSQmiQlCKIeCdOjl6Nl6AnX5Dix5zo_5e-73vaLCfhTH1OD6SJfNc5izV6i2Ud7tp27BnnVc5040V2NXI9W3Z6jqNAS6Wdnm31lfouCL7f_6qat7rv-f6vFCnp9HSrZ71__7PZQrEWzYyrab9pHobzKEmivu__Qje66_RrndtT0_ZwwOd_qVyPX85_0cy1rY0AAAAAAAAAAPibulHZvtqoTH4ZlUmmuhrPT3oY8qPW-y__-C-qWKBYK1cZ8WVEAQAAAAAAAAAAAP_Sx8LYkpHrTetfnInkt7dNqV6m9vNb8S4BAAAAAAAAAAAwLHldJ-7OkV29jGXeU_mX4z23vGuarKxqZRr2Q6UkZQAAAAAAAAAAABiWTw

http://sb.bitsnbites.eu/?data=U0JveAwC7dk9SgNBGAbgd2MS0MKfSsvFnELwOJZCGhsRJN0SEiQhCCLexMrS03gE3c0aiKLWRp9n-L4ZdqaY2fa9Pky2U3Y7Z6NsPY9SO9qr20m_6DylM1j0L-tVO5JhrlKt9fGHPslvNxx-ff9J3ae5y82n87P3eV7XIgAAAAAAAPw16ynZQVYpWcomJUuK5Uge7nO7ya9s799kXrNlIjabZ5om3RtLwQAAAAAAAP6l14uirhTp9gftl85uUq62i0aqpPqp_EYAAAAAAAA2y7St0-7Ocb167KV4qVKe9_a7zW7RxmTLIOybqoRkAAAAAAAAbJY3

http://sb.bitsnbites.eu/?data=U0JveAwC7dsxSgNBGAXgN0lcBUGbCJYL3kO8iY1HsLFLt4ghiEsgbJPz2NrbeY842WCZ3sD3wT_vzTA3GGZyk0zTTvO0SD7rPJ7NL5L8XJZJl7R989KUaplV3vORt7ymq22V5diHbNLXdbvNaBgOuV4fsu8DAAAAAAAA_8_uudRJyay5O5xMrpJ2X_bvY13NI9N1YwMAAAAAAIAT8r0o-Vqk7GbNfd0-nJfp7jrtPLfj_7H9lb9XsGMJAAAAAAAAp-IX

http://sb.bitsnbites.eu/?data=U0JveAwC7dwxSgQxFADQn9kxLgjarGAjDHgDDyAewt5mb6AgdtMNi-X2u9ewt7K1t_MI9uNkZ1EbtXXhveT__B9yg5BUxxHTaOqYtxHPQ1zvzaYR8XaQqi6iWeb7nAZRPGznt3VR5mLbr9fl1JiXY70aUolYbXoAAAAAAAD4R_rbNESkqPPZuFMdRjSl-Lwk636OrttUAAAAAAAAsENe2xQvbaS-zhdDe7mfJv1RNLM4-XpJVnR_rAAAAAAAALArqnkbk_LdYkQ-HdJTnSbnj3fvy3yVx7dkg5v4fQAAAAAAAMAu-QA

*/

// --------------------------------------------------------------------------------
// Variables used in this production, specifically:
var songBeatsPerMinute = 116;

// You can change/add whatever you want here:
var objTile, objBackground, objBall;

// FIXME: Find a proper place for these:
clearColor=[0,0,0,0];
defaultLightDirection=[1,1,1,0];

// --------------------------------------------------------------------------------

/**
 * Initialize the constant and pre-computed "assets" used in your own
 * production; this function is called once before entering the main
 * loop.
 *
 * Things like graphics primitives / building blocks can be generated
 * here.
 */
function initAssets(){
    // Create primitive building blocks by different profile sweeps:

    // Now I have a box in the library.
    objTile = new Box(1);

    // Ball can be built from circle curves:
    objBall = new GenCyl(new funCircle(1,10,.5), 32,
                         new funCircle(0,32));

    // Can make the radius negative to make an interior of a ball:
    objBackground = new GenCyl(new funCircle(-10,10,.5), 32,
                               new funCircle(0,32));

}


function snowman(t){
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
    var black=
        [.01,.02,.05,1,
         .02,.04,.05,1,
         .6,.3,.1,2, // specular
         10,1,0,0];
    stuff.c.push({f: [translate_wi(0,1,0)],
                  o: [new Material(clr),objBall],
                  c: []
                 });
    stuff.c.push({f: [translate_wi(0,2,0), scale_wi(.7)],
                  o: [new Material(clr),objBall],
                  c: [
                      {f: [rotY_wi(.2), rotZ_wi(.4*Math.sin(.8*t)), translate_wi(1,0,0), scaleXYZ_wi(.8,.3,.3)],
                       o: [objBall],
                       c: []},
                      {f: [rotY_wi(-.2), rotX_wi(.4*Math.sin(.06*t)),rotZ_wi(3.14-.4*Math.sin(.1*t)), translate_wi(1,0,0), scaleXYZ_wi(.8,.3,.3)],
                       o: [objBall],
                       c: []}
                             ]
                 });
    stuff.c.push({f: [translate_wi(0,3,0), scale_wi(.4), rotX_wi(-.3)],
                  o: [new Material(clr),objBall],
                  c: [{f: [translate_wi(0,.5,0), scaleXYZ_wi(1.5,.2,1.5)],
                       o: [new Material(black),objBall],
                       c: []
                      },
                      {f: [translate_wi(0,.2,0), scaleXYZ_wi(.9,1,.9)],
                       o: [new Material(black),objBall],
                       c: []
                      }
                     ]
                 });
    return stuff;
}

/**
 * Your own creative input goes here - this function will be called on every screen update.
 *
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
    var stufftrans=[translate_wi(0,-3.3,0)];


        var stuff = snowman(2*t);

        var cpohja=
            [.3,.2,.1,1,
             .9,.6,.4,1,
             0, 0, 0,1,
             2,1, 0,0];

        var ctausta=
            [.1,.1,.2,1,
             .3,.3,.8,1,
              .1, .1, .1,2,
             2,1,0.4,0];

        var tausta = {
            f:[], //[rotZ_wi(t*.16)],
            o:[new Material(ctausta),objBackground],
            c:[]
        };

        sceneroot.c.push({f:[],
                          o:[],
                          c:[
                              {f:[translate_wi(0,-3,0),scaleXYZ_wi(2,2,2)],
                               o:[new Material(cpohja),objTile],
                               c:[]},
/*
                              {f:[translate_wi(0,-3,0),scaleXYZ_wi(30,.1,30)],
                               o:[new Material(cpohja),objTile],
                               c:[]},
                              {f:stufftrans,
                               o:[],
                               c:[stuff]},
                              {f:[scaleXYZ_wi(2,1,3)],
                               o:[],
                               c:[tausta]
                              },
*/
                              {f:[translate_wi(0,3,0), rotY_wi(t*.16), translate_wi(0,0,20-10*Math.sin(t*.01)), rotX_wi(.2)],
                               o:[],
                               c:[],
                               r:[new Camera()]
                              }
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
