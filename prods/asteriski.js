/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */
// TODO: Old product likely out of sync with current library. Update worthwhile?

/**
 * One hour entry.
 *
 **/

/*
The visuals of this production are synced to the following song
created using the great SoundBox minisynth:

https://sb.bitsnbites.eu/?data=U0JveA4C7d0_ThtBFMfx38wsxpaIoACJEnfpYglFoaBIwQU4AY2FVpaRG4NSBMndSAgl4V8wNHAHSkRFExcRNTU34ALOjHcjbJALurX8_YzfvHkzW8x6t1ut9nFZqmil5OoduV6nsiGzujgjqe1kvUxVqhpjY3POJKmirH8ZvdRFN3b_aarGNzWLv_92vDZZTvcaWZ3mrbE3Gf8_AAAAAAAAAABAkRxmsZm4hS9heDsj8_xXzaaUmMAG8bBWaMNe18W2vx9-YyP0AAAAAAAAAAAAmCq23pF6ITRbmosT9yVjvVSTdq2Uv0-my7h0mUfoRuoLdQt_nt088q12Y47D8xC_J-A6nYU4jYOTfOJYOgrpV4if3MYAAAAAAAAAAADv1m_fhNAfJa5zkE3ZT9ta_78e3yeTfF75OPBZGtQjqbj8q8KPXQQAAAAAAAAAAMBUuP5udL2jH0-m_Hkr1OWSsf0PriZVTHaEGWQ_HP5tDQAAAAAAAAAAAEwO-_Hw6-DbZP1k_mo3m3MPd2ZJWht6TDb6JbLWmxoAAAAAAAAAAACYJP8A

*/

// --------------------------------------------------------------------------------
// Variables used in this production, specifically:
var songBeatsPerMinute = 104;

// You can change/add whatever you want here:
var objBox;
var randomXYZ = [];

// FIXME: Find a proper place for these:
var clearColor=[.1,.1,.4,1];
var defaultLightDirection=[1,1,1,0];

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
    objBox = new Box(1);

    for (var i=0; i<1000; i++){
        randomXYZ.push([Math.random(),Math.random(),Math.random()]);
    }

}


function asteriski(){
    var stuff = {
        f: [],
        o: [],
        c: []
    };
    for (var i=0; i<3; i++){
        stuff.c.push(
        {
            f: [rotZ_wi(i*6.28/3),scaleXYZ_wi(.2,1,.2)],
            o: [objBox],
            c: []
        }        
        );
    }
    return stuff;
}

function dancers(t){
    var stuff={f:[],o:[],c:[]};
    for (var i=0; i<10; i++){
        stuff.c.push(
        {
            f: [translate_wi(i*2,Math.sin(i+t),0), rotX_wi(i+t)],
            o: [],
            c: [asteriski()]
        }        
        );
    }

    return stuff;
}

function dancers2(t){
    var stuff={f:[],o:[],c:[]};
    for (var i=0; i<10; i++){
        stuff.c.push(
        {
            f: [translate_wi(i*2, Math.sin(i%2+Math.sin(t)),0)],
            o: [],
            c: [asteriski()]
        }        
        );
    }

    return stuff;
}


function sade(t,N){
    var stuff={f:[],o:[],c:[]};
    for (var i=0; i<N; i++){
        stuff.c.push(
            {
                f: [translate_wi( -5 + 10 *   randomXYZ[i][0],
                                  -5 + 10 * ( 1 -( (randomXYZ[i][1] + t ) % 1)),
                                  -5 + 10 *   randomXYZ[i][2] ), 
                    scaleXYZ_wi(.1,.1,.1),
                    rotY_wi(i + 3*t),
                    rotX_wi(3*i + 2*t)
                ],
                o: [],
                c: [asteriski()]
            }        
        );
    }
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
    // Blank after time is up:
    if (t>72) return {f:[],o:[],c:[],r:[new Camera()]};

    // Initialize empty scenegraph. Root node with nothing inside:
    var sceneroot={f:[],o:[],c:[]};

    // Animation parameters
        var mater1=
            [.1, .2, .3, 1,
             .1, .2, .7, 1,
              1,  1,  1, 1,
              4,  1,  0, 0];

              var mater2=
              [.1, .2, .3, 1,
               .2, .4, .7, 1,
                1,  1,  1, 1,
                11,  1,  0, 0];

        // Camera
        sceneroot.c.push(
            {f:[translate_wi(0,2,10), rotX_wi(-0)],
             o:[],
             c:[],
             r:[new Camera()]
            }
           );

        // Ground
        sceneroot.c.push(
            {f:[scaleXYZ_wi(100,.01,100)],
             o:[new Material(mater1),objBox],
             c:[],
             }
           );

    // Asterisk wanders from right to left:
    sceneroot.c.push({f:[translate_wi(8-t,0,0)],
                          o:[],
                          c:[
                              {f:[translate_wi(0,1,0), rotY_wi(6.28*t/4)],
                               o:[new Material(mater1)],
                               c:[asteriski()]},
                          ]
                         }
                        );

    // Many asterisks wander from right to left, in line...:
    if (t>16 && t<48){
        var tt = t-16;
      sceneroot.c.push({
        f:[translate_wi(8-tt,2,-3)],
        o:[],
        c:[dancers(t)]
      })
    }

    if (t>48 && t<64){
        var tt = t-48;
        sceneroot.c.push({
            f:[translate_wi(-10,2,-3)],
            o:[],
            c:[dancers2(tt + Math.floor(tt))]
          })
        }

    // Many asterisks wander from right to left, in line... again:
    if (t>48){
        var tt = t-48;
      sceneroot.c.push({
        f:[translate_wi(8-2*tt,2,-1)],
        o:[],
        c:[dancers(t)]
      })
    }

    // Snowing asterisks:
    sceneroot.c.push({
        f: [translate_wi(0,1,0)],
        o: [new Material(mater2)],
        c: [sade(t/(16-t/10),t*3)]
    }
    );
  
  
        // Many
//        sceneroot.c.push(sade(t));

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
