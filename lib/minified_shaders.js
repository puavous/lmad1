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
   "mediump mat3 f=mat3(3,17,13,19,5,23,11,29,7);" +
   "mediump vec3 b=vec3(.25)+.25*sin(v*f);" +
   "b-=vec3(.000976563);" +
   "mediump vec3 g=fract(16.*b);" +
   "return vec3(-1.)+2.*g;" +
 "}" +
 "mediump float t(mediump vec3 b)" +
 "{" +
   "mediump float f=64.,d[8];" +
   "mediump vec3 g=mod(b,f),u[8],t[8],s=vec3(1,0,0);" +
   "u[0]=floor(g);" +
   "u[1]=u[0]+s.ggr;" +
   "u[2]=u[0]+s.grg;" +
   "u[3]=u[0]+s.grr;" +
   "for(int e=0;e<4;e++)" +
     "u[4+e]=u[e]+s.rgg;" +
   "for(int e=0;e<8;e++)" +
     "d[e]=dot(t[e]=g-u[e],normalize(v(mod(u[e],f))));" +
   "for(int e=0;e<4;e++)" +
     "d[e]=d[e]+smoothstep(0.,1.,t[0].r)*(d[4+e]-d[e]);" +
   "t[0]=t[0].gbr;" +
   "for(int e=0;e<2;e++)" +
     "d[e]=d[e]+smoothstep(0.,1.,t[0].r)*(d[2+e]-d[e]);" +
   "t[0]=t[0].gbr;" +
   "for(int e=0;e<2;e++)" +
     "return d[e]=d[e]+smoothstep(0.,1.,t[0].r)*(d[1+e]-d[e]);" +
 "}" +
 "mediump vec3 t(mediump vec3 v,mediump vec3 f,mediump vec3 b,mediump vec3 t,mediump vec3 e,mediump vec3 d,mediump vec3 u,mediump float g)" +
 "{" +
   "mediump vec3 s=f-v,o=normalize(s);" +
   "mediump float p=length(s),z=1.+.1*p+.01*p*p;" +
   "mediump vec3 h=d*max(0.,dot(o,t)),x=u*pow(max(0.,dot(b,reflect(-o,t))),g);" +
   "return e/z*(h+x);" +
 "}" +
 "void main()" +
 "{" +
   "mediump vec3 v=normalize(r.rgb),b=normalize(n.rgb),e=m.rgb;" +
   "mediump float f=.5+t(2.*e+vec3(10))+t(4.*e+vec3(.1))/2.+t(8.*e+vec3(.3))/4.+t(16.*e+vec3(.4))/6.;" +
   "gl_FragColor=vec4(max(i[0].rgb*f,t(a.rgb,l.rgb,v,b,vec3(1),f*i[1].rgb,i[2].rgb,16.*(1.+f))),1);" +
 "}"

