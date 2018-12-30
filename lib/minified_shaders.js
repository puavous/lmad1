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
   "mediump mat3 f=mat3(3,17,13,19,5,23,11,29,7);" +
   "mediump vec3 g=vec3(.25)+.25*sin(v*f);" +
   "g-=vec3(.000976563);" +
   "mediump vec3 t=fract(16.*g);" +
   "return vec3(-1.)+2.*t;" +
 "}" +
 "mediump float t(mediump vec3 f)" +
 "{" +
   "mediump float g=64.;" +
   "mediump vec3 d=mod(f,g),b=floor(d),t=b+vec3(0,0,1),e=b+vec3(0,1,0),o=b+vec3(0,1,1),p=b+vec3(1,0,0),u=b+vec3(1,0,1),s=b+vec3(1,1,0),z=b+vec3(1,1,1),h=d-b,x=d-t,F=d-e,C=d-o,y=d-p,w=d-u,Z=d-s,Y=d-z;" +
   "mediump float X=dot(h,normalize(v(mod(b,g)))),W=dot(x,normalize(v(mod(t,g)))),V=dot(F,normalize(v(mod(e,g)))),U=dot(C,normalize(v(mod(o,g)))),T=dot(y,normalize(v(mod(p,g)))),S=dot(w,normalize(v(mod(u,g)))),R=dot(Z,normalize(v(mod(s,g)))),Q=dot(Y,normalize(v(mod(z,g))));" +
   "mediump vec3 P=h;" +
   "mediump float O=X+smoothstep(0.,1.,P.r)*(T-X),N=V+smoothstep(0.,1.,P.r)*(R-V),M=W+smoothstep(0.,1.,P.r)*(S-W),L=U+smoothstep(0.,1.,P.r)*(Q-U),K=O+smoothstep(0.,1.,P.g)*(N-O),J=M+smoothstep(0.,1.,P.g)*(L-M),I=K+smoothstep(0.,1.,P.b)*(J-K);" +
   "return I;" +
 "}" +
 "mediump vec3 t(mediump vec3 v,mediump vec3 d,mediump vec3 f,mediump vec3 g,mediump vec3 b,mediump vec3 t,mediump vec3 e,mediump float P)" +
 "{" +
   "mediump vec3 X=d-v,o=normalize(X);" +
   "mediump float O=length(X),p=1.+.1*O+.01*O*O;" +
   "mediump vec3 u=t*max(0.,dot(o,g)),s=e*pow(max(0.,dot(f,reflect(-o,g))),P);" +
   "return b/p*(u+s);" +
 "}" +
 "void main()" +
 "{" +
   "mediump vec3 v=normalize(r.rgb),g=normalize(n.rgb),b=m.rgb;" +
   "mediump float f=.5+t(2.*b+vec3(10))+t(4.*b+vec3(.1))/2.+t(8.*b+vec3(.3))/4.+t(16.*b+vec3(.4))/6.;" +
   "gl_FragColor=vec4(max(i[0].rgb*f,t(a.rgb,l.rgb,v,g,vec3(1),f*i[1].rgb,i[2].rgb,16.*(1.+f))),1);" +
 "}"

/* File generated with Shader Minifier 1.1.5
 * http://www.ctrl-alt-test.fr
 */

var noisz_frag =
 "uniform mediump mat4 i;" +
 "uniform mediump vec4 l;" +
 "varying mediump vec4 c,n,r,a,m;" +
 "mediump vec3 v(mediump vec3 v)" +
 "{" +
   "mediump mat3 f=mat3(3,17,11,7,5,13,0,0,0);" +
   "mediump vec2 b=64.*sin(vec2(v*f)),d=sin(b),p=cos(b);" +
   "return vec3(d.r*p.g,d.r*d.g,p.r);" +
 "}" +
 "mediump float f(mediump vec3 b)" +
 "{" +
   "mediump float f=64.,d[8];" +
   "mediump vec3 p=mod(b,f),u[8],g[8],s=vec3(1,0,0);" +
   "u[0]=floor(p);" +
   "u[1]=u[0]+s.ggr;" +
   "u[2]=u[0]+s.grg;" +
   "u[3]=u[0]+s.grr;" +
   "for(int e=0;e<4;e++)" +
     "u[4+e]=u[e]+s.rgg;" +
   "for(int e=0;e<8;e++)" +
     "g[e]=p-u[e];" +
   "for(int e=0;e<8;e++)" +
     "u[e]=mod(u[e],f);" +
   "u[0]=v(u[0]);" +
   "u[1]=v(u[1]);" +
   "u[2]=v(u[2]);" +
   "u[3]=v(u[3]);" +
   "u[4]=v(u[4]);" +
   "u[5]=v(u[5]);" +
   "u[6]=v(u[6]);" +
   "u[7]=v(u[7]);" +
   "for(int e=0;e<8;e++)" +
     "d[e]=dot(g[e],u[e]);" +
   "for(int e=0;e<4;e++)" +
     "d[e]=d[e]+smoothstep(0.,1.,g[0].r)*(d[4+e]-d[e]);" +
   "g[0]=g[0].gbr;" +
   "for(int e=0;e<2;e++)" +
     "d[e]=d[e]+smoothstep(0.,1.,g[0].r)*(d[2+e]-d[e]);" +
   "g[0]=g[0].gbr;" +
   "for(int e=0;e<2;e++)" +
     "return d[e]=d[e]+smoothstep(0.,1.,g[0].r)*(d[1+e]-d[e]);" +
 "}" +
 "mediump vec3 f(mediump vec3 v,mediump vec3 f,mediump vec3 b,mediump vec3 e,mediump vec3 g,mediump vec3 d,mediump vec3 u,mediump float p)" +
 "{" +
   "mediump vec3 s=f-v,o=normalize(s);" +
   "mediump float t=length(s),h=1.+.1*t+.01*t*t;" +
   "mediump vec3 z=d*max(0.,dot(o,e)),x=u*pow(max(0.,dot(b,reflect(-o,e))),p);" +
   "return g/h*(z+x);" +
 "}" +
 "void main()" +
 "{" +
   "mediump vec3 v=normalize(r.rgb),e=normalize(n.rgb),d=m.rgb;" +
   "mediump float b=.5+f(2.*d+vec3(10))+f(4.*d+vec3(.1))/2.+f(8.*d+vec3(.3))/4.+f(16.*d+vec3(.4))/6.;" +
   "gl_FragColor=vec4(max(i[0].rgb*b,f(a.rgb,l.rgb,v,e,vec3(1),b*i[1].rgb,i[2].rgb,16.*(1.+b))),1);" +
 "}"

