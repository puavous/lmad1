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

var objTile;

function initAssets(){
    objTile = new Box(1);
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

function teeTauhkaa(t,rota=1){
    var root = {f:[],o:[],c:[]};
    var ram = t/40*rota;

    for(var i = 0; i<t ; i++){
      root.c.push({
        f:[translate_wi(0,i,-i), rotZ_wi(rota), scaleXYZ_wi(1000,.1,.1)],
        o:[new Material(basic_color(1,1,1)), objTile],
        c:[]})

        root.c.push({
            f:[translate_wi(0,-i,-i), rotZ_wi(rota), scaleXYZ_wi(1000,.1,.1)],
            o:[new Material(basic_color(1,1,1)), objTile],
            c:[]})
        }
    
    return root;
}

/**
 *
 */
function buildSceneAtTime(t){

    // Initialize empty scenegraph. Root node with nothing inside:
    var sceneroot = {f:[],o:[],c:[]};
    if (t>72) {clearColor=[1,1,1,1]; return sceneroot;}

    // Generating colors can be put into functions just like anything - for convenience and brevity
    var cpohja = basic_color(.1, .2, .6);

    // Colors can be animated, as can anything. Use "t" for sync and innovate...
    var cloota = basic_color(.2, .5 + Math.sin(t), .4);

    var lootakorkeus = Math.min(-7 + t/4, 3);
    var lootaYrot = Math.sin(t/20);

    if (t>64) {lootakorkeus -= 64-t; }

    var lootaXrot = 0, lootaZrot = 0;
    var a=0;
    if (t>16){


        a = Math.max(0,(1-(t-16)/16));
        clearColor=[a,a,a,1];
    }
    if (t>32){
       lootaXrot = (t-32)/5;
       lootaZrot = (t-32)/4;
    }

    tauhka = teeTauhkaa(t,t/20);

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
                                rotX_wi(lootaXrot), rotZ_wi(lootaZrot), scale_wi(2+5*a)],
                               o:[new Material(cloota), objTile],
                               c:[]},

                               {f:[translate_wi(0,0,-5)],
                                o:[],
                                c:[tauhka]},

                                
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
var viestit=["","Hello, Instanssi 2024","Great intros coming up","from scene veterans","and workshop first-timers",
"Thanks for participating","Good luck in the compo!!","Remember to vote, too!","","",""]
var scrolltextdiv,messageHTML = "";
var kukkuu = 0;
function initDocument(){
    // A crude scrolltext: one HTML element containing an unwrapped line
    _document.body.appendChild(s = scrolltextdiv = _document.createElement("div"));
    s.innerHTML = messageHTML;
    s = s.style;
    s.position = "fixed"; s.left = s.top = 10;
    s.color = "#fff";
    s.fontSize = "10vh";
    s.whiteSpace = "nowrap";
    s.fontFamily = "monospace";    
}

/**
 * (Optionally) update the HTML and CSS parts of the document. This
 * can be used for scrolling or flashing text shown as usual HTML. Not
 * often used in actual demoscene productions.
 */
function updateDocument(t){
    if (!kukkuu) {initDocument(); kukkuu=1;}
    var vnumero=((t/8)|0);
    scrolltextdiv.innerHTML=viestit[vnumero]
}
