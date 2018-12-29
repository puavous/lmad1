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
*/

//  "precision mediump float;"+ // one-by-one definitions are shorter

uniform mediump mat4 i;
uniform mediump vec4 l;
varying mediump vec4 c,n,r,a;
void main(){
    mediump  vec4 toLight = l-a; // light position - fragment position
    mediump  vec4 ldir    = normalize(toLight);
    mediump  vec4 viewdir = normalize(r);
    mediump  vec4 normal  = normalize(n);
    mediump float ldist   = length(toLight);
    mediump float distAttenuationDivisor = 1. + .1*ldist + .01*ldist*ldist;
    gl_FragColor=
        // Locate triangle boundaries from "vertex coloring":
        i[3].bbbb*max(0.,1.-4.*min(c.b,min(c.g,c.r)))
        // Clamp output at ambient color (incl. alpha):
        + max(  i[0],
                // Diffuse reflection
                (  i[1] * max(0.,dot(ldir,normal))
                // Specular reflection
                 + i[2] * pow(max(0.,dot(viewdir,reflect(-ldir,normal))),
                             i[3].r)
                ) / distAttenuationDivisor
             )
        ;
}
