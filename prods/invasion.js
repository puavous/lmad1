/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */

/**
 * My own entry to Instanssi 2019 compo.. I hope..
 *
 **/

/*
The visuals of this production are synced to the following song
created using the great SoundBox minisynth:

http://sb.bitsnbites.eu/?data=U0JveAwC7d2xSsNAHMfx3921tWKpiIKLQxeHDr6G-AiCg6uDggVHi8ElhgSRCuJW8BU6uvoMzr5JvCZpCaIWQWki3w-53P0vN_wuZLshkw2pq15T6YXxTUaNdl8Z25V6KjFT1oZ--F0DAAAAAAAAAAAA6sSMA7n0rCGtNHfyKZtK230nkz2fkQYaDgb-yvvh1bz2LQiC62VvZZFl57cLnp_UPP-45vlf_joAAAAAAAAAAACoHDdKZN8CJ7U3V3w5ccZehmu9B7vnZmuKo7JkKlYcKYqiUGFY1HHkZxSFd8Xy26JPij5e9h4BAAAAAAAAAACAzxwF0nHQkTo6yGdsqv2bc_fcaqmlpmesa_j5_ChslN2nx2D5Edh9abbaPuavm3L-_K0_zsd1eP9JKXmeN1p2pB_5H9-PSrtQbfcCAAAAAAAAAMDvSfKWPq3u-tG6Mbb9upUemtOWL431smXuy_-R1eU_ZeGCuurqlhcAAAAAAAAAAKDq3gE

*/


// --------------------------------------------------------------------------------
// Variables used in this production, specifically:
var songBeatsPerMinute = 146;

// --------------------------------------------------------------------------------
var defaultLightDirection = [0,.2,1.5,1];
var clearColor = [1,1,1,1];

// You can change/add whatever you want here:
var objTunnel, objBall;


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
    testpoints = [
        0,1,0,1, // node
       -1,1,0,1,
       -1,1,0,1,
       -1,0,0,1, // node
       -1,-1,0,1,
       -1,-1,0,1,
        0,-1,0,1, // node
        1,-1,0,1,
        1,-1,0,1,
        1, 0,0,1, // node
        1, 1,0,1,
        1, 1,0,1,
        0, 1,0,1, // node
    ];

    objTunnel = new GenCyl(new funBezierCurve(matmul4(scaleXYZ_wi(.1,100,.1),testpoints)),
                        32,
                        new funBezierCurve(matmul4(scaleXYZ_wi(16,4,1),testpoints))
                       );

    // Ball can be built from circle curves:
    objBall = new GenCyl(new funCircle(1,10,.5), 32,
                         new funCircle(0,32));

/*
    // Can make the radius negative to make an interior of a ball:
    objBackground = new GenCyl(new funCircle(-10,10,.5), 32,
                               new funCircle(0,32));
*/
/*
    // Create primitive building blocks by different profile sweeps:
    // Now I have a box in the library.
    objBox = new Box(1);
*/

}

function buildParpuuppari(){
    var r ={f:[],o:[],c:[]};
    //Wings
    r.c.push({f:[translate_wi(2,0,0),scaleXYZ_wi(.15,1,2)],
              o:[objBall],
              c:[]});
    r.c.push({f:[translate_wi(-2,0,0),scaleXYZ_wi(.15,1,2)],
              o:[objBall],
              c:[]});
    //Cockpit
    r.c.push({f:[scaleXYZ_wi(.2,.2,.4)],
              o:[objBall],
              c:[]});
    //Truss
    r.c.push({f:[scaleXYZ_wi(2,.05,.05)],
              o:[objBall],
              c:[]});

    return r;
}

/** Armada at time t */
function buildArmaada(t){
    var r ={f:[],o:[],c:[]};
    var parpuuppari = buildParpuuppari();

    //First scouts at z=0 and z=-200
    r.c.push({f:[translate_wi(-1,1,0), rotZ_wi(.2)],
              o:[],
              c:[parpuuppari]});
    r.c.push({f:[translate_wi(-4,1,-70), rotZ_wi(-.08)],
              o:[],
              c:[parpuuppari]});
    r.c.push({f:[translate_wi(3,-.5,-80), rotZ_wi(.12)],
              o:[],
              c:[parpuuppari]});

    //Multiple ships are coming in after that, beware...
    var nships = 100;
    for (var i = 0; i < nships ; i++){
        // Disperse the ships to full width and height of tunnel; each has its own roll
        // Make more ships appear in the end than in front
        zloc = Math.sqrt((i+1)/nships) * nships*3;
        r.c.push({f:[translate_wi(1+12*Math.sin(i), .5+1.5*Math.sin(i*5), -100 - zloc),
                     rotZ_wi(Math.sin(i)*t*.4 + i)],
                  o:[],
                  c:[parpuuppari]});
    }

    return r;
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

    var some_color=
        [.1, .12, .05,  1,  // ambient rgba
         .1, .40, .20,  1,  // diffuse rgba
         .2, .80, .20,  1,  // specular rgba
         20,  1,  .00,  0]; // shininess, "unused", mesh, "unused"

    var other_color=
        [.1, .12, .05,  1,  // ambient rgba
         .5, .20, .20,  1,  // diffuse rgba
         .9, .9, .9,  1,  // specular rgba
         20,  1,  .00,  0]; // shininess, "unused", mesh, "unused"


    var ctausta=
        [.1, .1, .2, 1,
         .3, .0, .0, 1,
         .0, .0, .0, 1,
         .0, .1, .4, 0];

    //var parpuuppari = buildParpuuppari();
    var armaada = buildArmaada(t);

    var tunnel_length = 60.0;
    var beat_at_tunnel_exit = 80;
    var beat_at_roll_end = 32;
    var linear_time_to_exit = 1 - (beat_at_tunnel_exit - t)/beat_at_tunnel_exit;
    var scaled_time_to_exit = linear_time_to_exit * linear_time_to_exit;
    var travelled_in_tunnel_now = (scaled_time_to_exit * tunnel_length);
    var t_rot = clamp01((beat_at_roll_end - t)/beat_at_roll_end);
    t_rot = t_rot*t_rot; // rotate in the start
    var t_rot2 = 0; // later, just to de-stabilize the visual.. have something happening..

    // Slowly move camera towards end of the tube
    var camera_pos = translate_wi(0,0,-travelled_in_tunnel_now);

    //var camerashake;
    var camera_transformations;
    if (t<32){
        camera_transformations = [camera_pos,rotZ_wi(PI*t_rot/6),rotX_wi(PI*t_rot/6)];
    } else {
        var tt;
        if (t<96){
            tt = (t-32)/(beat_at_tunnel_exit-32);
        } else {
            tt = (96-32)/(beat_at_tunnel_exit-32);
        }
        camera_transformations = [camera_pos,
                                  rotZ_wi(.2*Math.sin(2*PI*tt*tt)),
                                  rotY_wi(.1*Math.sin(2*PI*tt*tt)),
                                  rotX_wi(.07*Math.sin(2*PI*tt*tt)),
                                 ];
    }

    // Just some shake-ish minor movement:



    sceneroot.c.push({f:[],
                      o:[],
                      c:[

                          {f:[],
                           o:[new Material(some_color),objTunnel],
                           c:[]},

                          {f:[translate_wi(0,0,-260+t*9)],
                           o:[new Material(some_color)],
                           c:[armaada]},

                          {f:[translate_wi(-.7,.5,-660+t*9)],
                           o:[new Material(other_color)],
                           c:[armaada]},

                          {f:[translate_wi(.5,-.7,-683+t*9)],
                           o:[new Material(other_color)],
                           c:[armaada]},


                          {f:camera_transformations,
                           o:[],
                           c:[],
                           r:[new Camera()]
                          },
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
