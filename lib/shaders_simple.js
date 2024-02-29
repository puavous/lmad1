/**
 * @fileOverview Handcrafted minimal shaders.
 * 
 * Very simple shaders as strings. Catenate these in front of your
 * WebGL code, use what you need, and minimize the result using
 * Closure. Non-used shader versions will vanish from final output.
 *
 * The strategy is, of course, to select the smallest shader that
 * suffices for what you want to do. If you have time to tinker, you
 * can always remove or simplify features from these, as well, if you
 * run out of space for artwork :). Shaders are now selected from the
 * production, so you could just copy-paste-modify one of these into
 * your own one.
 * 
 */

/** A very basic vertex shader: Just interpolate color (g) and
 * position (v) projected by perspective (p) and modelview (mv)
 * transforms. We transform normals (N) by the modelview (not its
 * inverse transpose) so free scale / skew cannot be done with
 * correct normals. Orthonormal transformations should be OK.
 */

var vertex_shader_basic =
        //"precision mediump float;"+ //Vertex shader has default prec.
        "uniform mat4 mv,p;" +
        "attribute vec4 g,v,N;" +
        "varying vec4 c,n,r;" +
        "void main(){" +
            "gl_Position=p*mv*v;" +
            "n=mv*N;" +     // Normal (assuming mv is orthonormal)
            "c=g;" +        // "Color" (whatever in the fragment shader)
            "r=-mv*v;" +    // View diRection
        "}";

/** A vertex shader that uses normal matrix. It should be a 4x4 matrix
 * whose upper left 3x3 part contains the inverse transpose of
 * modelview. Otherwise as simple as the previous one. This allows
 * free scale/skew of geometries with the expense of requiring you to
 * compute and transfer the normal matrix. It is some heavy code, so
 * you should really go and scale your sH* to make it look awesome, if
 * you decide to compute inverses.
 */
var vertex_shader_minimal_with_normalmatrix =
        //"precision mediump float;"+ //Vertex shader has default prec.
        "uniform mat4 mv,nm,p;" +
        "attribute vec4 g,v,N;" +
        "varying vec4 c,n,r;" +
        "void main(){" +
            "gl_Position=p*mv*v;" +
            "n=nm*N;" +     // Normal
            "c=g;" +        // "Color" (whatever in the fragment shader)
            "r=-mv*v;" +    // View diRection
        "}";


// Fragment shader: Only one unidirectional light is used.

var fragment_shader_camspace_directed =
        //"precision mediump float;"+ // one-by-one definitions are shorter
        // Inputs:
        // a: ambient color  - now coming in as i[0]
        // d: diffuse color  - now coming in as i[1]
        // s: specular color - now coming in as i[2]
        // q: additional params [shininess, "par2", mesh_brightn]
        //     - now coming in as i[3]
        // l: light direction in camera space, pre-normalized
        // r: view direction, assume already normalized
        //
        // u: [time, window w, window h] - not used in this production
        'uniform highp mat4 i;' +
        'uniform highp vec4 l;' +
        'varying highp vec4 c,n,r;' +
        'void main(){' +
            // win 10 bytes in packed space by re-normalizing n twice.
            // As always, time we can spend, but space not so much.
    	    'gl_FragColor=' +
                 // Locate triangle boundaries from "vertex coloring":
                'i[3].bbbb*max(0.,1.-4.*min(c.b,min(c.g,c.r)))' +
                 // Clamp output at ambient color (incl. alpha):
                '+max(i[0],'+
                     // Diffuse reflection
                     'i[1]*max(0.,dot(normalize(l),normalize(n)))' +
                     // Specular reflection
                     '+i[2]*pow(max(0.,dot(normalize(r),'+
                                          'reflect(-normalize(l),normalize(n))' +
                                  ')),' +
                               'i[3].r' +
                               ')' +
                     ')' +
	            ';' +
        '}';

var fragment_shader_camspace_directed_with_white_fog =
        //"precision mediump float;"+ // one-by-one definitions are shorter
        // Inputs:
        // a: ambient color  - now coming in as i[0]
        // d: diffuse color  - now coming in as i[1]
        // s: specular color - now coming in as i[2]
        // q: additional params [shininess, "par2", mesh_brightn]
        //     - now coming in as i[3]
        // l: light direction in camera space, pre-normalized
        // r: view direction, assume already normalized
        //
        // u: [time, window w, window h] - not used in this production
        'uniform highp mat4 i;' +
        'uniform highp vec4 l;' +
        'varying highp vec4 c,n,r;' +
        'void main(){' +
            // win 10 bytes in packed space by re-normalizing n twice.
            // As always, time we can spend, but space not so much.
    	    'gl_FragColor= vec4(1.-clamp(exp(-.02*r.z), 0., 1.))+' +
                 // Locate triangle boundaries from "vertex coloring":
                'i[3].bbbb*max(0.,1.-4.*min(c.b,min(c.g,c.r)))' +
                 // Clamp output at ambient color (incl. alpha):
                '+max(i[0],'+
                     // Diffuse reflection
                     'i[1]*max(0.,dot(normalize(l),normalize(n)))' +
                     // Specular reflection
                     '+i[2]*pow(max(0.,dot(normalize(r),'+
                                          'reflect(-normalize(l),normalize(n))' +
                                  ')),' +
                               'i[3].r' +
                               ')' +
                     ')' +
	            ';' +
        '}';


/** Phong model with one point light given in camera space. */
var fragment_shader_pointlight_cameraspace =
        //"precision mediump float;"+ // one-by-one definitions are shorter
        // Inputs:
        // a: ambient color  - now coming in as i[0]
        // d: diffuse color  - now coming in as i[1]
        // s: specular color - now coming in as i[2]
        // q: additional params [shininess, "par2", mesh_brightn]
        //     - now coming in as i[3]
        // l: point light position in camera space
        // r: view direction, assume already normalized
        //
        // u: [time, window w, window h] - not used in this production
        'uniform highp mat4 i;' +
        'uniform highp vec4 l;' +
	    'varying highp vec4 c,n,r;' +
        'void main(){' +
            // win 10 bytes in packed space by re-normalizing n twice.
            // As always, time we can spend, but space not so much.
    	    'gl_FragColor=' +
                 // Locate triangle boundaries from "vertex coloring":
                'i[3].bbbb*max(0.,1.-4.*min(c.b,min(c.g,c.r)))' +
                 // Clamp output at ambient color (incl. alpha):
                '+max(i[0],'+
                     // Diffuse reflection
                     'i[1]*max(0.,dot(normalize(l),normalize(n)))' +
                     // Specular reflection
                     '+i[2]*pow(max(0.,dot(normalize(r),'+
                                          'reflect(-l,normalize(n))' +
                                  ')),' +
                               'i[3].r' +
                               ')' +
                     ')' +
	            ';' +
        '}';


/**
 * Default for lmad1 version 1.4 starter example: A vertex shader
 * that uses normal matrix.
 * 
 * Inputs:
 *   p - projection
 *  mv - modelview
 *  nm - normal matrix
 */
var vert_shader_vanilla14 =
        //"precision mediump float;"+ //Vertex shader has default prec.
        "uniform mat4 mv,nm,p;" +
        "attribute vec4 g,v,N;" +
        "varying vec4 c,n,f;" +
        "void main(){" +
            "gl_Position=p*mv*v;" +
            "n=nm*N;" +     // Normal
            "c=g;" +        // "Color" (whatever in the fragment shader)
            "f=mv*v;" +     // Fragment position in view space
        "}";

/**
 * Default for lmad1 version 1.4 starter example: A fragment shader
 * that can simulate earlier workshop examples and productions but with
 * more control and documentation. White fog has gone away, too.
 * 
 * Uniforms to be input:
 * 
 * mat4 i - "Illumination/irradiance":
 *           i[0].rgb   ambient color
 *           i[1].rgb   diffuse color
 *           i[2].rgb   specular color    i[2].a  shininess
 *           i[3].rgb   (unused)          i[3].a  mesh brightness
 * 
 * vec4 f - fragment position in camera space
 * vec4 l - "Light position" in camera space(!) compute before sending it.
 * 
 */
var frag_shader_vanilla14 =
        'uniform highp mat4 i;' +
        'uniform highp vec4 l;' +
        'varying highp vec4 c,n,f;' +
        'void main(){' +
            // win 10 bytes in packed space by re-normalizing n twice.
            // As always, time we can spend, but space not so much.
            // "Fog is still there, if needed: means a mix of "
    	    'gl_FragColor=vec4(' +
                 // Locate triangle boundaries from "vertex coloring":
                'i[3].aaa*max(0.,1.-4.*min(c.b,min(c.g,c.r)))' +
                 // Clamp output at ambient color (incl. alpha):
                '+max(i[0].rgb,' +
                     // Diffuse reflection
                     'i[1].rgb*max(0.,dot(normalize(l-f),normalize(n)))' +
                        // Specular reflection
                        '+i[2].rgb*pow(max(0.,dot(normalize(-f),' +
                                                 'reflect(-normalize(l-f),normalize(n))' +
                                                 ')' +
                                          '),' +
                                       'i[2].a' +
                               ')' +
                     ')' +
	        ',1.);' +
        '}';
