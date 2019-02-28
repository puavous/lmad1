/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */

/**
 * "Scrolling text" as presented in Vortex III, but with cleaned-up source.
 *
 * Now using the dirty small library.
 *
 * This will be re-cycled into the library examples.
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

http://sb.bitsnbites.eu/?data=U0JveAwC7d2xahRRFADQ-2bWjQQkRYQlCBoQkZBCsRashTRpxMJyqyGNqOuChowrKDZTWQQrK4t8QX4hlegPaOMf2K8zO7vGDWLt6DnDfXPv400zTPeY-76uR6zF5kpMDyNuHq5EbF0ZxEw2jVi_kT_oxRmjmMSbeB2vYj-exXg2VwYAAAAAAAB01PRxiuk40kGvf7WdyVZfrG7OspRSpGZsRFRVHfFLVMs5AAAAAAAAdMr7MtUR6XPv3HZd3u5F_uhh7GznGylisU-Wmmy2fDJ_bOk-Oa0BAAAAAACgK9KwjHRSNhthlzbqYZhHduv46ffd_oUUWbbYK2uyKOZXRDEqflajGI_3Ym_ek_FvVvyxLnwMAAAAAAAA_52yjf3I77YT6duXuHY93V-cV9b-VxZn-i_-JgAAAAAAAKBL8mEZ-UmZ1elgUA9Hayld_vjp5YfzR_20fF5ZeldF9dYrAwAAAAAA4B_R9GDM2h6Md7ai6cGYsnvHF2O3_ySdLmrT0TwW2vp5PR54kQAAAAAAAHTODw

*/

// --------------------------------------------------------------------------------



// --------------------------------------------------------------------------------
// Variables used in this production, specifically:
var songBeatsPerMinute = 130;
// You can change/add whatever you want here:
var objTile, objBackground, objBall;



// --------------------------------------------------------------------------------
// Variables and functions for a scrolling text using plain HTML..
var scrolltextnode, scrolltextdiv;
var spaces="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var messageHTML = ". . . "    +spaces    +". . . "    +spaces
    +"Hi, Vortex!" + spaces    +spaces
    + "qma here (and there, with you, too)" + spaces
    + "Welcome to a compo-filler... short one, don't worry!" + spaces    + spaces
    + "My first scolltext!" + spaces
    + "I always wanted to make a scrolltext. . . It took some 25 years, but here it is now."
    + spaces    + spaces
    + "Fuckings to all... (not really, but a scrolltext has to have this?) "
    + "In fact, I just love being here. Thank you, spiikki, Freon, Terwiz, visy, and other organizers of Vortex III! You keep the scene alive! Beautiful!"
    + spaces
    + "Nothing special in this entry.. one more &quot;snapshot&quot; of the work-in-progress of a wannabe demo coder. . . "
    + spaces
    + "Today my first noise function, like Perlin (1985), but with a crappy hash. "
    + "Anyway, I'm making this beginner-friendly javascript library for 4k intros with the hope of getting youngsters interested in demoscene. . . I really want to organize a 4k intro coding workshop in <a href='https://instanssi.org/2019/'> Instanssi 2019</a>. The organizers don't know about my cunning plan yet, but I hope they'll accept. . . Veterans of demoscene want to help? Please do! :)"
    + spaces
    + "and that's about all I wanted to say here at Vortex III. . . Party on!!!"
    + spaces
    + "See you in the sauna soon!"
    + spaces    + spaces    + spaces  ;

/**
 * (Optionally) initialize additional HTML and CSS parts of the
 * document. This can be used, for example, for scrolling or flashing
 * text shown as usual HTML or hypertext. Not often used in actual
 * demoscene productions.
 */
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

        // Scrolltext.. loop through all contents during the show:
        var sw = scrolltextdiv.offsetWidth;
        var endbeat = 128;
        scrolltextdiv.style.left = innerWidth - (t/endbeat)*sw;

}

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

    // Now I have a box in the library.
    objTile = new Box(1);

    // Ball can be built from circle curves:
    objBall = new GenCyl(new funCircle(1,10,.5), 32,
                               new funCircle(0,32));

    // Can make the radius negative to make an interior of a ball:
    objBackground = new GenCyl(new funCircle(-30,10,.5), 32,
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
        var camtrans=[rotZ_wi(Math.sin(.1*t)), translate_wi(0,-1+Math.sin(.2*t),-10+3.*Math.sin(.12*t)),rotY_wi(.1*t)];
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

            stuff.c.push({f: [translate_wi(-2,0,0),rotX_wi(.5*t)],
                          o: [new Material(clr),objBall],
                          c: []
                         });

            stuff.c.push({f: [translate_wi(0,2,0), rotY_wi(.4*t + Math.sin(t))],
                          o: [new Material(clr),objBall],
                          c: []
                         });

            stuff.c.push({f: [translate_wi(0,-2,0), rotY_wi(-.4*t + Math.sin(t))],
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
            f:[], //[rotZ_wi(t*.16)],
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
                              },
                          ],
                         }
                        );
    // Simulate older code without Camera..
    sceneroot.c.push({f:[],
                      o:[],
                      c:[],
                      r:[new Camera()]});

    return sceneroot;
}

