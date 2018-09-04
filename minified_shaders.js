/* File generated with Shader Minifier 1.1.5
 * http://www.ctrl-alt-test.fr
 */

var test_frag =
 "uniform highp mat4 i;" +
 "uniform highp vec4 l;" +
 "varying highp vec4 c,n,r;" +
 "void main()" +
 "{" +
   "gl_FragColor=i[3].bbbb*max(0.,1.-4.*min(c.b,min(c.g,c.r)))+max(i[0],i[1]*max(0.,dot(l,normalize(n)))+i[2]*pow(max(0.,dot(normalize(r),reflect(-l,normalize(n)))),i[3].r));" +
 "}"

/* File generated with Shader Minifier 1.1.5
 * http://www.ctrl-alt-test.fr
 */

var test_vert =
 "uniform mat4 mv,nm,p;" +
 "attribute vec4 g,v,N;" +
 "varying vec4 c,n,r;" +
 "void main()" +
 "{" +
   "gl_Position=p*mv*v,n=nm*N,c=g,r=-mv*v;" +
 "}"

