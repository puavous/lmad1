/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */

/**
 * @fileOverview This file "prod.js" is the graphical content of the intro.
 *
 * My own entry - started from the lmad1 example 71 minutes before final
 * deadline. Empty placeholder zip is in the compo system. We'll see what
 * happens...
 *
 **/

/*
The visuals of this production are synced to the following song
created using the great SoundBox minisynth:

https://sb.bitsnbites.eu/?data=U0JveA4C7d0xS8NAGMbx5y45BKXioGhBUBA3RUQcxUVwEAdBcXEUqnO6ibSTWbpJUUT8AkUUV7-Fzq6O9SPUhLNUW0umYoP_X3iTu_eO5DiyvZC8T0ljmnc6rkoHNSOZcG0iOUuyLS0U5Y5CY6wNAmtdGIaRIlUU6bdrpHMNu6z130m30o10LV2p_r2j-qVqmQ8o_WiXuvrDsP6H9D73arf0lMSjbzfaa-5__HO9-w4AAAAAAAAAAHKvVb7QWVmLkmtO-5Qdl1bb4yZhk2v8FV7c0x-0Qsb4TsZ4_Mf7XMjIv_YZb_KKAgAAAAAAAAAADEjNx144urKfNJ-dzEeseTlfJDPGT4szAgAAAAAAAAAAAMiT4K2yHLycaKlh3PZh0k9z67tuS3YmTCd0SmVed1GMIhkAAAAAAAAAAADyKNisKtioph9XPB2Z9Tk7V9RkZ4ovlHX_pKrE3gEAAAAAAAAAACDHPgE

https://sb.bitsnbites.eu/?data=U0JveA4C7d0xaxRBFAfw_87uEkghFooGhATEThERy5BGsEkKQUljKUTrSyeSq7zmOglKkHyBIErafAt7W1s_QtzLekZPQ9qc_H7L23lvZtid_hXz7WqymJU2z4fJ03GVVM39y907STnOzaW0z5qqKqWuS2maZpBBdjLIv8ZBXueiO-_8-8mHZC95n7zL7u9Fdt9mfO4Ptv7It2bqi3D-T5PvfMw0y2EXn_v8YHrmsx8AAAAAAID_zfH2m7zazq2kXb_WT5VLyb3petXphtHP6I3-qgEAAAAAAGC-jPt43CzefdKlR22q76OspO17ZCddstM-2VkBAAAAAAAA86T-unOn_vIitw-q9tFmV0_mHmy0D1OuN5MNvzplvdmemB4ZAAAAAAAA86heG6ZeHZYufblwo58ry0u5crrlpE82e0GVC6sAAAAAAACYZz8A
*/

// ----------------------------------------------------------------------------
// Global variables that you MUST define - they are used by the library code:

/** Song tempo; the library computes time in beats for easy sync. */
var songBeatsPerMinute = 118;
var frameProducerFunction = frameProducerVanilla14;
var shaders = [vert_shader_vanilla14, frag_shader_vanilla14];
var clearColor = [0,0,0,1];

// ----------------------------------------------------------------------------
// Global variables that belong to your own production - the library does not
// use these, so you can change or add whatever you want here. They need to be
// global so they are available in your draw function below:

var objTile, objBall;

function initAssets(){
    objTile = new Box(1);

    // Ball can be built from circle curves:
    objBall = new GenCyl(new funCircle(1,10,.5), 32,
                         new funCircle(0,32));
}

/** 
 * Example of a function that returns a diffuse non-shiny basic coloring
 * compatible with the Vanilla 1.4 shader
 */
function basic_color(r,g,b){
    return [r/3, g/3, b/3, 0,
            r,   g,   b,   0,
            0,   0,   0,   1,
            0,   0,   0,   0]
}

/**
 *
 */
function buildSceneAtTime(t){

    // Initialize empty scenegraph. Root node with nothing inside:
    var sceneroot = {f:[],o:[],c:[]};
    if (t>75) {clearColor=[1,1,1,1]; return sceneroot;}

    // Generating colors can be put into functions just like anything - for convenience and brevity
    var cpohja = basic_color(.1, .2, .6);

    // Colors can be animated, as can anything. Use "t" for sync and innovate...
    var cloota = basic_color(.2, .5 + Math.sin(t), .4);

    // Names can be given to any nuts or bolts, to help you animate and manage your scene:
    var parivaljakon_sijainti = [translate_wi(0,-3,0)];

    var lootakorkeus = Math.min(-7 + t/4, 3);
    var lootaYrot = Math.sin(t/20);

    var lootaXrot = 0, lootaZrot = 0;
    if (t>32){
       lootaXrot = (t-32)/5;
       lootaZrot = (t-32)/4;
    }

    sceneroot.c.push({f:[],
                      o:[],
                      c:[
                        /*
                              {f:[translate_wi(0,-10,0), scaleXYZ_wi(60,.2,60)],
                               o:[new Material(cpohja), objTile],
                               c:[]},
                               {f:[translate_wi(0,10,0), scaleXYZ_wi(60,.2,60)],
                                o:[new Material(cpohja), objTile],
                                c:[]},
                                */
 
                              {f:[translate_wi(0,lootakorkeus,0), rotY_wi(lootaYrot), 
                                rotX_wi(lootaXrot), rotZ_wi(lootaZrot), scaleXYZ_wi(2,2,2)],
                               o:[new Material(cloota), objTile],
                               c:[]},
                                
                              // The scene must have exactly one Camera. It doesn't work without.
                              {f:[translate_wi(0,0,30)], ///*translate_wi(0,3,0), rotY_wi(t/3), translate_wi(0,0,30), rotX_wi(.2)*/
                               o:[],
                               c:[],
                               r:[new Camera()]
                              },

                              // With "Vanilla 1.4" intro, the scene must have exactly one Light.
                              // It doesn't work without.
                              {f:[translate_wi(9*Math.sin(t/9), 4, 9*Math.cos(t/9), 0)],
                                o:[], //[new Material(basic_color(9,9,9)), objTile],
                                c:[],
                                r:[new Light()]
                              }
                        ]
                    }
                    );

    return sceneroot;
}




// -----------------------------------------------------------------------------

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