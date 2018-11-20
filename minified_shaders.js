/* File generated with Shader Minifier 1.1.5
 * http://www.ctrl-alt-test.fr
 */

var test_frag =
 "uniform mediump mat4 i;" +
 "uniform mediump vec4 l;" +
 "varying mediump vec4 c,n,r,a;" +
 "void main()" +
 "{" +
   "mediump vec4 m=l-a,d=normalize(m),g=normalize(r),e=normalize(n);" +
   "mediump float v=length(m),o=1.+.1*v+.01*v*v;" +
   "gl_FragColor=i[3].bbbb*max(0.,1.-4.*min(c.b,min(c.g,c.r)))+max(i[0],(i[1]*max(0.,dot(d,e))+i[2]*pow(max(0.,dot(g,reflect(-d,e))),i[3].r))/o);" +
 "}"

/* File generated with Shader Minifier 1.1.5
 * http://www.ctrl-alt-test.fr
 */

var test_vert =
 "uniform mat4 mv,nm,p;" +
 "attribute vec4 g,v,N;" +
 "varying vec4 c,n,r,a,m;" +
 "void main()" +
 "{" +
   "m=v,a=mv*v,gl_Position=p*a,n=nm*N,c=g,r=-mv*v,r.a=0.;" +
 "}"

/* File generated with Shader Minifier 1.1.5
 * http://www.ctrl-alt-test.fr
 */

var noisy_frag =
 "uniform mediump mat4 i;" +
 "uniform mediump vec4 l;" +
 "varying mediump vec4 c,n,r,a,m;" +
 "mediump vec3 v(mediump vec3 v)" +
 "{" +
   "const highp mat3 f=mat3(3,17,13,19,5,23,11,29,7);" +
   "highp vec3 h=vec3(.25)+.25*sin(v*f);" +
   "h-=vec3(.000976563);" +
   "highp vec3 t=fract(16.*h);" +
   "return vec3(-.1)+2.*t;" +
 "}" +
 "mediump float t(mediump vec3 f)" +
 "{" +
   "const mediump float h=64.;" +
   "mediump vec3 d=mod(f,h),g=floor(d),t=g+vec3(0,0,1),u=g+vec3(0,1,0),b=g+vec3(0,1,1),e=g+vec3(1,0,0),o=g+vec3(1,0,1),p=g+vec3(1,1,0),z=g+vec3(1,1,1),x=d-g,s=d-t,F=d-u,C=d-b,y=d-e,w=d-o,Z=d-p,Y=d-z;" +
   "g=mod(g,h);" +
   "t=mod(t,h);" +
   "u=mod(u,h);" +
   "b=mod(b,h);" +
   "e=mod(e,h);" +
   "o=mod(o,h);" +
   "p=mod(p,h);" +
   "z=mod(z,h);" +
   "mediump float X=dot(x,normalize(v(g))),W=dot(s,normalize(v(t))),V=dot(F,normalize(v(u))),U=dot(C,normalize(v(b))),T=dot(y,normalize(v(e))),S=dot(w,normalize(v(o))),R=dot(Z,normalize(v(p))),Q=dot(Y,normalize(v(z)));" +
   "mediump vec3 P=vec3(1)-x,O=x;" +
   "return P.b*(P.g*(P.r*X+O.r*T)+O.g*(P.r*V+O.r*R))+O.b*(P.g*(P.r*W+O.r*S)+O.g*(P.r*U+O.r*Q));" +
 "}" +
 "void main()" +
 "{" +
   "mediump vec4 v=l-a,h=normalize(v),g=normalize(r),e=normalize(n);" +
   "mediump float f=length(v),o=1.+.1*f+.01*f*f;" +
   "mediump vec3 P=m.rgb;" +
   "mediump float b=.5+t(P)+t(4.*P+vec3(.1))/2.+t(8.*P+vec3(.3))/3.+t(16.*P+vec3(.4))/4.;" +
   "gl_FragColor=vec4(0,0,0,1)+i[3].bbbb*max(0.,1.-4.*min(c.b,min(c.g,c.r)))+max(i[0]*3.*b,(i[1]*3.*b*max(0.,dot(h,e))+i[2]*pow(max(0.,dot(g,reflect(-h,e))),i[3].r))/o);" +
 "}"

