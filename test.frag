/*
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
*/

uniform highp mat4 i;
uniform highp vec4 l;
varying highp vec4 c,n,r;
void main(){
    // win 10 bytes in packed space by re-normalizing n twice.
    // As always, time we can spend, but space not so much.
    gl_FragColor=
        // Locate triangle boundaries from "vertex coloring":
        i[3].bbbb*max(0.,1.-4.*min(c.b,min(c.g,c.r)))
        // Clamp output at ambient color (incl. alpha):
        +max(i[0],
             // Diffuse reflection
             i[1]*max(0.,dot(l,normalize(n)))
             // Specular reflection
             +i[2]*pow(max(0.,dot(normalize(r),
                                  reflect(-l,normalize(n))
                                  )),
                       i[3].r
                       )
             )
        ;
}
