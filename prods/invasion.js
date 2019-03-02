/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */

/**
 * My own entry to Instanssi 2019 compo.. I hope..
 *
 **/

/*
The visuals of this production are synced to the following song
created using the great SoundBox minisynth:

http://sb.bitsnbites.eu/?data=U0JveAwC7d2xSsNAHMfx3921tWKpiIKLQxeHDr6G-AiCg6uDggVHi8ElhgSRCuJW8BU6uvoMzr5JvCZpCaIWQWki3w-53P0vN_wuZLshkw2pq15T6YXxTUaNdl8Z25V6KjFT1oZ--F0DAAAAAAAAAAAA6sSMA7n0rCGtNHfyKZtK230nkz2fkQYaDgb-yvvh1bz2LQiC62VvZZFl57cLnp_UPP-45vlf_joAAAAAAAAAAACoHDdKZN8CJ7U3V3w5ccZehmu9B7vnZmuKo7JkKlYcKYqiUGFY1HHkZxSFd8Xy26JPij5e9h4BAAAAAAAAAACAzxwF0nHQkTo6yGdsqv2bc_fcaqmlpmesa_j5_ChslN2nx2D5Edh9abbaPuavm3L-_K0_zsd1eP9JKXmeN1p2pB_5H9-PSrtQbfcCAAAAAAAAAMDvSfKWPq3u-tG6Mbb9upUemtOWL431smXuy_-R1eU_ZeGCuurqlhcAAAAAAAAAAKDq3gE



http://sb.bitsnbites.eu/?data=U0JveAwC7d2xSsNAHMfx3921acVSEQUXhy4OHXwN8REEB1cHBQuOFoNLDAkiFcSt4Ct0dPUZnH2TeE1iKRZ1Uezh90Mud_fPDf87LlluyGRd6qrXVHFufJFRo91XyXalnuaYkk1886sCAAAAAAAAAAAAhMSMY7nitCG1mttVyBbSVt_JlM9nNNBwMPBXVQ8vZ31f4ji-Wvap_nX-9pvnx4HnPw48_2e-BgAAAAAAAAAA_DtulMu-xk5qb7R8d-KMvUhWe_d2172PqY_K8qlMWao0TRMlSd3PUh9RmtzWw2_qOq_rjFUGAAAAAAAAAADAMjqMpaO4I3W0X0Vsob3rM_cURYrU9Ix1DR-vjsJG5X16DFYdgd3NRZfbx_xDM59_teoPs3YI658v7Jc02PUPd_9o4X0NcS4AAAAAAAAAAPycvCrF48qOb60ZY9svm8WBOYl811ivHvjZ_8hC-U9ZEmjeAAAAAAAAAAAA-B1v


http://sb.bitsnbites.eu/?data=U0JveAwC7dtPSsNAFMfx38y0acWiiIKbLrpx0YXXEI8guPACChZcWgxuYkgQaUG8R8GN93DtTeLkjyW00pWLDn4_yWTmPWYgeSSrIYsDaahRV8Wd8U1Gnf5YFbsnjdRiGu2xTXywqQEAAAAAAAAAAAAhMe-xXHHTkXrdYZ2yhXQ8djLLOb_QRNPJxJ91P31Yxr7FcfxIaQEAAAAAAAAAABASN8tlv2In9Q97Plw4Y--T3dGrPXXteat_nCkvZcpSpWmaKEmaOEt9Rmny0ix8bvq86TNqDgAAAAAAAAAAgG10GUtX8UAa6LzO2EJnT7fuI4oUqeuPH-XYWNepgnpjbFZdy02xekNs3sput9X7D037_uuqvy3HIdQ_X3tf0mDrH-77o7XvNcRnAQAAAAAAAADg7-R1K2Y7J360b4ztfx4VF-Y68qEpT7tp-TzQx06qYz0LAAAAAAAAAACA_-kb

http://sb.bitsnbites.eu/?data=U0JveAwC7dzBSsMwHMfxX5LNTR2CePCyw647ePIdxKs3wYMvoODAo8PgpZYWkQ3E9xh48WH0DXyE2jV1lDEGDtwsfD_tv8k_JJCE3kI72Ze66jWV3Zo8ZNRo91Wwe1JPFaZUrdsoT5YFAAAAAAAAAAAAUCfmzctl1w2p1eyGJptJh30nM-uzgAYaDgb5Hcrh_SzPw3v_sKkFAQAAAAAAAAAAAKtwo1T20zupfdDK04kz9i7a7b3YI1ftN__FmdKpREmsOI4jRVGZJ3Heojh6Lgc-lWValsmaFgYAAAAAAAAAAAD8yoWXLn1H6ug0tNhMJ4837n2rqXD9mNaNdY0iCQdjo-I5PRQLB2LjSuv_Nj__uqnOP-z666xeh_0Pe159X-KNzWUVdX9_AAAAAAAAAADAImmIzG-f5bVjY-zOlz7OzdWWir81muXDx2uYIgAAAAAAAAAAAPDXvgE

http://sb.bitsnbites.eu/?data=U0JveAwC7dxPSsNAFMfx38z0H1oEUXDTRbdduPIO4tad4MILKFhwaXFwE0OCSAviDTxAwY2X8QYeIU4zsYQqXTfl-0leZt4wA-ERshmS-b400LCt4s6EkFGrN1LJ7klD1ZhKvW-TkKwLAAAAAAAAAAAAoEnMh5crblpStz2IQ7aQjkZOZjnnHxprMh6HM7aTh2Uewnv_SGkBAAAAAAAAAADQJG6ay355J_UOuiGdO2Pvk93hqz129XmrX5wpX8iUpUrTNFGSVHmWhhGlyUu18Llq86rNqDkAAAAAAAAAAAA20aWXrnxf6ussjthCp0-37rPTVjx-LfrGulaZxI2xaXldbIrFDbFZbXSzrd5_09TvP1b9bdlvQv3zP89L2tj657xGAAAAAAAAAADYEnmMojg8D70TY-zOt94vzHVH5d8azfrlMyoIAAAAAAAAAACALfAD

http://sb.bitsnbites.eu/?data=U0JveAwC7dsxSsRAFMbxLzOJu-AiiIUWFmm38BriHSw8gWDA0sXBJg4JIiuI91iw8TLeJE4yMcQVrDfy_5HJzHtMYHiENI9sDqUT5ama2yQMJUrnS3XMgZSrl_TGa1OG4K8BAAAAAAAAAAAATEny7mSb61SaZacxZRrpeGn1o1E2pkKroghXnFf3QxyGc-6BsgIAAAAAAAAAAGBK7LqW-XRWmh_NQrixibkr9_NXc2a_92z_aaa6Vany8t6XKss-rnzIyJfP_YNP_Vz3c0W9AQAAAAAAAAAAsIsunXTlFtJCFzFjGp0_3tiPvUzZsK1dJ8amXRCbYuvu3jbEYjPsZZTdbdvnn5rx-WPV34b1FOpf_3pf_GTrX_MJAQAAAAAAAADgX_gC

http://sb.bitsnbites.eu/?data=U0JveAwC7dtBSsNAFMbxb2ZSW7AIIuLGRbZdeA3xDi48gWDBpcXBTRwSRCqI9yi48TLeJE4yMYYKrhv5_5LJ5D2GMDxCNo9sDqVj5ZnqWxOHjLLZQi17IOXNjfk2DGwRg78GAAAAAAAAAAAAMCbm3cvV15k0nZymlK2lk4WT-WmZDWip1XIZzzSv7vs4Du_9AzUFAAAAAAAAAADAmLh1JfvpnTQ7msZw44y9K_bzV3vm2gXb_5ipapQqg0IIhYqii8sQMwrFc_fkp26uurmk2AAAAAAAAAAAANhFl1668nNprouUsbXOH2_cx16_ZhIPY13WBqkjtm6vTTcsdcJeBtndtr3_sRnuP1X9rb8fQ_2rX-9LGG39K74fAAAAAAAAAAD8C18

http://sb.bitsnbites.eu/?data=U0JveAwC7dtBSsNAFMbxb2ZSW7AIIuLGRbZdeA3xDi48gWDBpcXBTRwSRCqI9yi48TLeJE4yMYYKrhv5_5LJ5D2GMDxCNo9sDqVj5ZnqWxOHjLLZQi17IOXNjfk2DGwRg78GAAAAAAAAAAAAMCbm3cvV15k0nZymlK2lk4WT-WmZDWip1XIZzzSv7vs4Du_9AzUFAAAAAAAAAADAmLh1JfvpnTQ7msZw44y9K_bzV3vm2gXb_5ipapQqg0IIhYqii8sQMwrFc_fkp26uurmk2AAAAAAAAAAAANhFl1668nNprouUsbXOH2_cx16_ZhIPY13WBqkjtm6vTTcsdcJeBtndtr3_sRnuP1X9rb8fQ_2rX-9LGG39K74fAAAAAAAAAAD8C18

http://sb.bitsnbites.eu/?data=U0JveAwC7dlBSsNAFMbxb2aiLViE4sKNi2y78BriHVx4AsGCS4uDm3FIEKkg3qPgxst4kzjJhFBacN3I_0deZt4jgeERsnmbuTRXWah5MClkVEwX6thTqWw3ZpcNqfpXAAAAAAAAAAAAAGNivrxcc1dIk6OLXLKNdL5wMnvjMi21Wi7TldfV05Cn8N4_008AAAAAAAAAAACMiVvXsj_eSdOzSUo3ztjHcFJ-2Es3PDRMy-pWpSoqxhgUQp9XMVUUw1v_wmu_1v1a0WgAAAAAAAAAAAAcohsv3fqZNNN1rthGVy_37vu4y4x1RRtdkqdh6-7eTsLyFOx9q3rYds8_Ntvnz13_HPZj6H-9973EUfW_5n8BAAAAAAAAAMC_8ws


http://sb.bitsnbites.eu/?data=U0JveAwC7dlBSsNAFMbxLzOJLViE4sKNi2xdiLcQ7-DCEwgGXFocuhmHBJEK4j269DKCB4mTTiglBdeN_H_k5c28QBgeIZu3nktzlbnaxyyGMuXTC22YE6nsFtmAMT5W_woAAAAAAAAAAABgTLIfJ9veF9KkOE8l00pnV1ZmOC2TKi2qKl4pL563-xjOuSX9BAAAAAAAAAAAwJjYVSPz7aw0PZ3E7dpm5skflx_m0u5Py5pOrToohODlfb-vQ6wo-Lf-ra99bvpc02gAAAAAAAAAAAAcolsn3bmZNNNNqphW1y8P9uuoUKHM2LyL9ChNw1abezcJS1Ow953qYRuef2x2z5-6_rldj6H_zd73EkbV_4b_BQAAAAAAAAAA_84v


http://sb.bitsnbites.eu/?data=U0JveAwC7dkxSgQxFMbxL8muu7CLzbYW01qItxDvYOEJBAcsXQw2MWQQccGLWHoZwYOMGZOVKcTawf-Peby8RxgmYbqnjbRSM1N_Y3LIaLY81hd7KDXDwoyEXP8WAAAAAAAAAAAAwJSYDy_XX82lxfyotGwvNadOdjwna7Vt2_yUvL37rnN47--5SQAAAAAAAAAAAEyJe-5k372TlptFLl-dsbdh1bzYEzeek3WDpBQVYwwKodYp5o5ieKrve6y5qzlxxQAAAAAAAAAAAPiLLrx06dfSWuelY3udPVy7twNjjd1vK3OwMgUbZmCp5qGzm8Axf_r-vR1_AQAAAAAAAAAAwL_zCQ

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
