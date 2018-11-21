/**
  Inputs:
  i: matrix containing material parameters as follows:
  i[0]: ambient color
  i[1]: diffuse color
  i[2]: specular color
  i[3]: additional params: [shininess, "par2", mesh_brightn, "par4"]

  l: light position in camera space
  n: normal vector in camera space
  a: "actual" fragment coordinate in camera space
  m: original coordinate in model space
*/

//  "precision mediump float;"+ // one-by-one definitions are shorter

uniform mediump mat4 i;
uniform mediump vec4 l;
varying mediump vec4 c,n,r,a,m;


/** Noise-like hash-kind function vec3->vec3.
 *
 * Assumed input is small-ish integers like those needed for Perlin
 * noise gradients at indexed hypercube corners; output is vec3
 * vector that could be (0,0,0) in an unlikely situation.
 *
 * I looked at https://www.shadertoy.com/view/XsX3zB for inspiration.
 * That one seemed a bit funny about accuracy accross hardware,
 * though.. values depend on minute details of output from
 * sin()... Yep.. Different results on different GPU. I tried to come
 * up with something more stable.. This one seems to give *almost* the
 * same results on Intel HD5500 and AMD R7 M260X. Unfortunately, the
 * stability comes with the cost of not so random hash.. Precomputed
 * look-up table would solve all these problems, I guess.
 */
mediump vec3 random3(mediump vec3 a){
    // matrix of small primes (larger ones start to make differences
    // between Intel and AMD sine function results).
    const highp mat3 b=mat3(3,  17, 13,
                            19, 5,  23,
                            11, 29, 7);
    highp vec3 j = vec3(.25) + .25*sin(a*b);    // hash to [0,.5] with sine
    j -= vec3(0.0009765625);                    // subtract 1/1024
    highp vec3 r = fract(16.*j);                // discard 4 bits
    return vec3(-1.)+2.*r; // Return in range [-1,-1]
}


/**
 * 3D noise-like function. My first; not very nice or "correct". But I
 * like it... first ones are nice.
 */
mediump float noise3(mediump vec3 v){

    const mediump float W=64.; // Window size

    mediump vec3 vv=mod(v,W);  // Operate modulo a W-by-W-by-W grid

    mediump vec3 aa=floor(vv); // The first corner in containing cube
    mediump vec3 bb=aa+vec3(0,0,1); // Others for computing inner diffs
    mediump vec3 cc=aa+vec3(0,1,0);
    mediump vec3 dd=aa+vec3(0,1,1);
    mediump vec3 ee=aa+vec3(1,0,0);
    mediump vec3 ff=aa+vec3(1,0,1);
    mediump vec3 gg=aa+vec3(1,1,0);
    mediump vec3 hh=aa+vec3(1,1,1);

    // difference vectors
    mediump vec3 daa=vv-aa;
    mediump vec3 dbb=vv-bb;
    mediump vec3 dcc=vv-cc;
    mediump vec3 ddd=vv-dd;
    mediump vec3 dee=vv-ee;
    mediump vec3 dff=vv-ff;
    mediump vec3 dgg=vv-gg;
    mediump vec3 dhh=vv-hh;

    aa=mod(aa,W); // Redo modulo before noise computation
    bb=mod(bb,W);
    cc=mod(cc,W);
    dd=mod(dd,W);
    ee=mod(ee,W);
    ff=mod(ff,W);
    gg=mod(gg,W);
    hh=mod(hh,W);

    mediump float naa=dot(daa,normalize(random3(aa)));
    mediump float nbb=dot(dbb,normalize(random3(bb)));
    mediump float ncc=dot(dcc,normalize(random3(cc)));
    mediump float ndd=dot(ddd,normalize(random3(dd)));
    mediump float nee=dot(dee,normalize(random3(ee)));
    mediump float nff=dot(dff,normalize(random3(ff)));
    mediump float ngg=dot(dgg,normalize(random3(gg)));
    mediump float nhh=dot(dhh,normalize(random3(hh)));

    /*
    // As of now, just linear interpolation; don't know about scaling..
    mediump vec3 s=vec3(1)-daa;
    mediump vec3 t=daa;
    return
        s.z * (s.y*(s.x*naa + t.x*nee) + t.y*(s.x*ncc + t.x*ngg)) +
        t.z * (s.y*(s.x*nbb + t.x*nff) + t.y*(s.x*ndd + t.x*nhh)) ;
    */

    //Interpolate with Hermite, like most people seem to do. Much nicer..
    mediump vec3 t=daa;
    mediump float stp1=(naa + smoothstep(0.,1.,t.x)*(nee-naa));
    mediump float stp2=(ncc + smoothstep(0.,1.,t.x)*(ngg-ncc));

    mediump float stp3=(nbb + smoothstep(0.,1.,t.x)*(nff-nbb));
    mediump float stp4=(ndd + smoothstep(0.,1.,t.x)*(nhh-ndd));

    mediump float stp5=(stp1 + smoothstep(0.,1.,t.y)*(stp2-stp1));
    mediump float stp6=(stp3 + smoothstep(0.,1.,t.y)*(stp4-stp3));

    mediump float stp7=(stp5 + smoothstep(0.,1.,t.z)*(stp6-stp5));

    return stp7;

    // For debugging (would be vec3):
	//return random3(aa);
}

void main(){
    mediump  vec4 toLight = l-a; // light position - fragment position
    mediump  vec4 ldir    = normalize(toLight);
    mediump  vec4 viewdir = normalize(r);
    mediump  vec4 normal  = normalize(n);
    mediump float ldist   = length(toLight);
    mediump float distAttenuationDivisor = 1. + .1*ldist + .01*ldist*ldist;

    mediump vec3 p = m.xyz;
    mediump float noispat=.5
        + noise3(2.*p+vec3(10))
        + noise3(4.*p+vec3(.1))/2.
        + noise3(8.*p+vec3(.3))/3.
        + noise3(16.*p+vec3(.4))/4.
        ;

    //gl_FragColor=vec4(noispat,noispat,noispat,1.);

    gl_FragColor=vec4(0,0,0,1) +
        // Locate triangle boundaries from "vertex coloring":
        i[3].bbbb*max(0.,1.-4.*min(c.b,min(c.g,c.r)))
        // Clamp output at ambient color (incl. alpha):
        + 1.*max(  i[0] * noispat,
                // Diffuse reflection
                (  i[1] * 2. * noispat * max(0.,dot(ldir,normal))
                // Specular reflection
                 + i[2] * noispat * pow(max(0.,dot(viewdir,reflect(-ldir,normal))),
                                        i[3].r)
                ) / distAttenuationDivisor
             )
        ;
}
