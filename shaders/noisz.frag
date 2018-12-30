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
 * vector.
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
/*

mediump vec3 random3(mediump vec3 a){
    // matrix of small primes (larger ones start to make differences
    // between Intel and AMD sine function results).
    mediump mat3 b=mat3(3,  17, 13,
                        19, 5,  23,
                        11, 29, 7);

    // hash to [0,.5] with sine
    mediump vec3 j = vec3(.25) + .25*sin(a*b);

    // subtract 1/1024 to stabilise fract() in bit patterns 0.111 vs 1.000
    j -= vec3(0.0009765625);

    // discard 4 front bits
    mediump vec3 r = fract(16.*j);

    // Return in range [-1,-1]
    return vec3(-1.)+2.*r;
}
*/

// This version is based on spherical coordinates. My Intel and AMD
// agree on the pattern to produce from this. Not super sure if this
// is mathematically OK.
mediump vec3 random3b(mediump vec3 a){
    // matrix of small primes
    mediump mat3 b=mat3(3, 17, 11,
                        7, 5, 13,
                        0, 0, 0);

    // hash to approx [0,20pi] with sine
    //mediump vec2 j = vec2(32.) + 32.*vec2(sin(a*b));
    mediump vec2 j = 64.*sin(vec2(a*b));
    mediump vec2 s = sin(j);
    mediump vec2 c = cos(j);
    return vec3(s.x*c.y, s.x*s.y, c.x);
}

/**
 * 3D noise-like function. If I understand correctly, this is the
 * classic Perlin noise in cubic 3D lattice. This is manually
 * size-optimized winning 100 bytes compared to my original vesion in
 * noisy.frag. Probably could do even more.
 */
mediump float noise3(mediump vec3 v){

    mediump float W=64.;         // Window size
    mediump float n[8];          // Space for 8 intermediates (dot products & interp.)

    mediump vec3 vv = mod(v,W);  // Operate modulo a W-by-W-by-W grid

    mediump vec3 gp[8],d[8];     // grid points, difference vectors

    mediump vec3 q = vec3(1,0,0); // Helper for compact notation of binary vectors below.
    // Make the 8 corners of the surrounding grid cube:
    gp[0] = floor(vv);
    gp[1] = gp[0]+q.ggr;
    gp[2] = gp[0]+q.grg;
    gp[3] = gp[0]+q.grr;
    for (int i=0; i<4; i++){
        gp[4+i] = gp[i] + q.rgg;
    }

    // difference vectors and their dot products with random grid gradients:
    for (int ii=0; ii<8; ii++){
        d[ii] = vv-gp[ii];
    }

    // Redo modulo before noise computation to combine window edges.
    for (int ii=0; ii<8; ii++){
        gp[ii] = mod(gp[ii],W);
    }

    // My current Radeon driver (on Fedora 29) coughs blood and dies if I
    // try to call my random() inside a loop. So I won't... a bit strange,
    // because it looks quite all right to me.. but it isn't..
    // for (int ii=0; ii<8; ii++) {gp[ii] = random3b(gp[ii]);}

    // The same thing unrolled is no problem for the same
    // system.. looks like a driver problem, should see if the problem
    // exists on the Windows driver, too.

    gp[0]=random3b(gp[0]);
    gp[1]=random3b(gp[1]);
    gp[2]=random3b(gp[2]);
    gp[3]=random3b(gp[3]);
    gp[4]=random3b(gp[4]);
    gp[5]=random3b(gp[5]);
    gp[6]=random3b(gp[6]);
    gp[7]=random3b(gp[7]);

    for (int ii=0; ii<8; ii++){
        n[ii] = dot(d[ii],gp[ii]);
    }

    /*
    n[0] = dot(d[0] = vv-gp[0], normalize(random3(mod(gp[0],W))));
    n[1] = dot(d[1] = vv-gp[1], normalize(random3(mod(gp[1],W))));
    n[2] = dot(d[2] = vv-gp[2], normalize(random3(mod(gp[2],W))));
    n[3] = dot(d[3] = vv-gp[3], normalize(random3(mod(gp[3],W))));
    n[4] = dot(d[4] = vv-gp[4], normalize(random3(mod(gp[4],W))));
    n[5] = dot(d[5] = vv-gp[5], normalize(random3(mod(gp[5],W))));
    n[6] = dot(d[6] = vv-gp[6], normalize(random3(mod(gp[6],W))));
    n[7] = dot(d[7] = vv-gp[7], normalize(random3(mod(gp[7],W))));
    */

    // Interpolate with Hermite, like most people seem to do.
    // Compute "in place" into array members not used after each step:
    // Use repetitive code pattern with hopes about compression.

    for (int i=0; i<4; i++){
        n[i] = n[i] + smoothstep(0.,1.,d[0].x)*(n[4+i]-n[i]);
    }
    d[0]=d[0].yzx;
    for (int i=0; i<2; i++){
        n[i] = n[i] + smoothstep(0.,1.,d[0].x)*(n[2+i]-n[i]);
    }
    d[0]=d[0].yzx;
    for (int i=0; i<2; i++){ // Funny stuff; compression better with return amidst loop..
        return n[i] = n[i] + smoothstep(0.,1.,d[0].x)*(n[1+i]-n[i]);
    }
    //return n[0];
}


mediump vec3 pointlight(mediump vec3 a,
                        mediump vec3 l,
                        mediump vec3 viewdir,
                        mediump vec3 normal,
                        mediump vec3 lightEmission,
                        mediump vec3 diffuseReflectance,
                        mediump vec3 specularReflectance,
                        mediump float shininess)
{
    mediump  vec3 toLight = l-a; // light position - fragment position
    mediump  vec3 ldir    = normalize(toLight);
    mediump float ldist   = length(toLight);
    mediump float distAttenuationDivisor = 1. + .1*ldist + .01*ldist*ldist;

    mediump vec3 diffuse = diffuseReflectance *  max(0.,dot(ldir,normal));
    mediump vec3 specular = specularReflectance * pow(max(0.,dot(viewdir,reflect(-ldir,normal))),shininess);
    return (lightEmission / distAttenuationDivisor) * (diffuse + specular);
}

void main(){
    mediump  vec3 viewdir = normalize(r.xyz);
    mediump  vec3 normal  = normalize(n.xyz);

    mediump vec3 p = m.xyz;
    mediump float noispat=.5
        + noise3(2.*p+vec3(10))
        + noise3(4.*p+vec3(.1))/2.
        + noise3(8.*p+vec3(.3))/4.
        + noise3(16.*p+vec3(.4))/6.
        ;

    gl_FragColor=vec4(
                      // Locate triangle boundaries from "vertex coloring":
                      //i[3].bbb*max(0.,1.-4.*min(c.b,min(c.g,c.r))) +
                      // Clamp output at ambient color (incl. alpha):
                      1.*max(  i[0].rgb * noispat,
                               pointlight(a.xyz, l.xyz, viewdir, normal,
                                          vec3(1),
                                          noispat * i[1].rgb,
                                          i[2].rgb,
                                          16.*(1.+noispat) /*i[3].r*/)
                               )
                      , 1); // alpha==1
}
