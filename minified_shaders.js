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
 "mediump vec3 t(mediump vec3 v)" +
 "{" +
   "const highp mat3 f=mat3(3,17,13,19,5,23,11,29,7);" +
   "highp vec3 h=vec3(.25)+.25*sin(v*f);" +
   "h-=vec3(.000976563);" +
   "highp vec3 t=fract(16.*h);" +
   "return vec3(-1.)+2.*t;" +
 "}" +
 "mediump float v(mediump vec3 v)" +
 "{" +
   "const mediump float f=64.;" +
   "mediump vec3 d=mod(v,f),h=floor(d),g=h+vec3(0,0,1),b=h+vec3(0,1,0),u=h+vec3(0,1,1),e=h+vec3(1,0,0),o=h+vec3(1,0,1),p=h+vec3(1,1,0),s=h+vec3(1,1,1),z=d-h,x=d-g,F=d-b,C=d-u,y=d-e,w=d-o,Z=d-p,Y=d-s;" +
   "h=mod(h,f);" +
   "g=mod(g,f);" +
   "b=mod(b,f);" +
   "u=mod(u,f);" +
   "e=mod(e,f);" +
   "o=mod(o,f);" +
   "p=mod(p,f);" +
   "s=mod(s,f);" +
   "mediump float X=dot(z,normalize(t(h))),W=dot(x,normalize(t(g))),V=dot(F,normalize(t(b))),U=dot(C,normalize(t(u))),T=dot(y,normalize(t(e))),S=dot(w,normalize(t(o))),R=dot(Z,normalize(t(p))),Q=dot(Y,normalize(t(s)));" +
   "mediump vec3 P=z;" +
   "mediump float O=X+smoothstep(0.,1.,P.r)*(T-X),N=V+smoothstep(0.,1.,P.r)*(R-V),M=W+smoothstep(0.,1.,P.r)*(S-W),L=U+smoothstep(0.,1.,P.r)*(Q-U),K=O+smoothstep(0.,1.,P.g)*(N-O),J=M+smoothstep(0.,1.,P.g)*(L-M),I=K+smoothstep(0.,1.,P.b)*(J-K);" +
   "return I;" +
 "}" +
 "void main()" +
 "{" +
   "mediump vec4 f=l-a,t=normalize(f),h=normalize(r),P=normalize(n);" +
   "mediump float s=length(f),g=1.+.1*s+.01*s*s;" +
   "mediump vec3 p=m.rgb;" +
   "mediump float b=.5+v(2.*p+vec3(10))+v(4.*p+vec3(.1))/2.+v(8.*p+vec3(.3))/3.+v(16.*p+vec3(.4))/4.;" +
   "gl_FragColor=vec4(0,0,0,1)+i[3].bbbb*max(0.,1.-4.*min(c.b,min(c.g,c.r)))+max(i[0]*b,(i[1]*2.*b*max(0.,dot(t,P))+i[2]*b*pow(max(0.,dot(h,reflect(-t,P))),i[3].r))/g);" +
 "}"

