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
   "mediump vec3 d=mod(f,g),b=floor(d),t=b+vec3(0,0,1),u=b+vec3(0,1,0),e=b+vec3(0,1,1),o=b+vec3(1,0,0),p=b+vec3(1,0,1),s=b+vec3(1,1,0),z=b+vec3(1,1,1),h=d-b,x=d-t,F=d-u,C=d-e,y=d-o,w=d-p,Z=d-s,Y=d-z;" +
   "b=mod(b,g);" +
   "t=mod(t,g);" +
   "u=mod(u,g);" +
   "e=mod(e,g);" +
   "o=mod(o,g);" +
   "p=mod(p,g);" +
   "s=mod(s,g);" +
   "z=mod(z,g);" +
   "mediump float X=dot(h,normalize(v(b))),W=dot(x,normalize(v(t))),V=dot(F,normalize(v(u))),U=dot(C,normalize(v(e))),T=dot(y,normalize(v(o))),S=dot(w,normalize(v(p))),R=dot(Z,normalize(v(s))),Q=dot(Y,normalize(v(z)));" +
   "mediump vec3 P=h;" +
   "mediump float O=X+smoothstep(0.,1.,P.r)*(T-X),N=V+smoothstep(0.,1.,P.r)*(R-V),M=W+smoothstep(0.,1.,P.r)*(S-W),L=U+smoothstep(0.,1.,P.r)*(Q-U),K=O+smoothstep(0.,1.,P.g)*(N-O),J=M+smoothstep(0.,1.,P.g)*(L-M),I=K+smoothstep(0.,1.,P.b)*(J-K);" +
   "return I;" +
 "}" +
 "mediump vec3 t(mediump vec3 v,mediump vec3 d,mediump vec3 f,mediump vec3 g,mediump vec3 b,mediump vec3 t,mediump vec3 e,mediump float P)" +
 "{" +
   "mediump vec3 o=d-v,p=normalize(o);" +
   "mediump float s=length(o),u=1.+.1*s+.01*s*s;" +
   "mediump vec3 z=t*max(0.,dot(p,g)),W=e*pow(max(0.,dot(f,reflect(-p,g))),P);" +
   "return b/u*(z+W);" +
 "}" +
 "void main()" +
 "{" +
   "mediump vec3 v=normalize(r.rgb),g=normalize(n.rgb),b=m.rgb;" +
   "mediump float s=.5+t(2.*b+vec3(10))+t(4.*b+vec3(.1))/2.+t(8.*b+vec3(.3))/4.+t(16.*b+vec3(.4))/6.;" +
   "gl_FragColor=vec4(max(i[0].rgb*s,t(a.rgb,l.rgb,v,g,vec3(1),s*i[1].rgb,i[2].rgb,16.*(1.+s))),1);" +
 "}"

