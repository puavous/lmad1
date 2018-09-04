/**
 * A vertex shader that uses normal matrix. It should be a 4x4 matrix
 * whose upper left 3x3 part contains the inverse transpose of
 * modelview. Otherwise as simple as the previous one. This allows
 * free scale/skew of geometries with the expense of requiring you to
 * compute and transfer the normal matrix. It is some heavy code, so
 * you should really go and scale your sH* to make it look awesome, if
 * you decide to compute inverses.
 */
uniform mat4 mv,nm,p;
attribute vec4 g,v,N;
varying vec4 c,n,r;
void main(){
    gl_Position=p*mv*v;
    n=nm*N;     // Normal
    c=g;        // "Color" (whatever in the fragment shader)
    r=-mv*v;    // View diRection
}
