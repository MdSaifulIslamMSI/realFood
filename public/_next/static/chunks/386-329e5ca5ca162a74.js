"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[386],{1059:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var i in t)Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}(t,{formatUrl:function(){return n},formatWithValidation:function(){return s},urlObjectKeys:function(){return o}});let a=i(304)._(i(8057)),r=/https?|ftp|gopher|file/;function n(e){let{auth:t,hostname:i}=e,n=e.protocol||"",o=e.pathname||"",s=e.hash||"",l=e.query||"",d=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?d=t+e.host:i&&(d=t+(~i.indexOf(":")?"["+i+"]":i),e.port&&(d+=":"+e.port)),l&&"object"==typeof l&&(l=String(a.urlQueryToSearchParams(l)));let u=e.search||l&&"?"+l||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||r.test(n))&&!1!==d?(d="//"+(d||""),o&&"/"!==o[0]&&(o="/"+o)):d||(d=""),s&&"#"!==s[0]&&(s="#"+s),u&&"?"!==u[0]&&(u="?"+u),""+n+d+(o=o.replace(/[?#]/g,encodeURIComponent))+(u=u.replace("#","%23"))+s}let o=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function s(e){return n(e)}},1126:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isLocalURL",{enumerable:!0,get:function(){return n}});let a=i(8481),r=i(8696);function n(e){if(!(0,a.isAbsoluteUrl)(e))return!0;try{let t=(0,a.getLocationOrigin)(),i=new URL(e,t);return i.origin===t&&(0,r.hasBasePath)(i.pathname)}catch(e){return!1}}},1289:(e,t,i)=>{i.d(t,{G:()=>function e(t,i,l,d){if("function"==typeof t){o.bt.current=[],t();let e=(0,n.j)(o.bt.current,t);return o.bt.current=void 0,e}if(void 0!==l&&!Array.isArray(l)&&"function"!=typeof i){var u=t,h=i,c=l,m=d;let a=(0,r.M)(()=>Object.keys(c)),n=(0,r.M)(()=>({}));for(let t of a)n[t]=e(u,h,c[t],m);return n}let p="function"==typeof i?i:function(...e){let t=!Array.isArray(e[0]),i=t?0:-1,r=e[0+i],n=e[1+i],o=e[2+i],s=e[3+i],l=(0,a.G)(n,o,s);return t?l(r):l}(i,l,d);return Array.isArray(t)?s(t,p):s([t],e=>{let[t]=e;return p(t)})}});var a=i(9720),r=i(5802),n=i(2472),o=i(7477);function s(e,t){let i=(0,r.M)(()=>[]);return(0,n.j)(e,()=>{i.length=0;let a=e.length;for(let t=0;t<a;t++)i[t]=e[t].get();return t(i)})}},1719:(e,t,i)=>{i.d(t,{A:()=>a});let a=(0,i(7835).A)("minimize-2",[["path",{d:"m14 10 7-7",key:"oa77jy"}],["path",{d:"M20 10h-6V4",key:"mjg0md"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M4 14h6v6",key:"rmj7iw"}]])},1815:(e,t,i)=>{i.d(t,{L:()=>r});var a=i(9856);function r(e,t,i){(0,a.useInsertionEffect)(()=>e.on(t,i),[e,t,i])}},2342:(e,t,i)=>{i.d(t,{A:()=>a});let a=function(){for(var e,t,i=0,a="",r=arguments.length;i<r;i++)(e=arguments[i])&&(t=function e(t){var i,a,r="";if("string"==typeof t||"number"==typeof t)r+=t;else if("object"==typeof t)if(Array.isArray(t)){var n=t.length;for(i=0;i<n;i++)t[i]&&(a=e(t[i]))&&(r&&(r+=" "),r+=a)}else for(a in t)t[a]&&(r&&(r+=" "),r+=a);return r}(e))&&(a&&(a+=" "),a+=t);return a}},2472:(e,t,i)=>{i.d(t,{j:()=>o});var a=i(2916),r=i(6051),n=i(3068);function o(e,t){let i=(0,n.d)(t()),o=()=>i.set(t());return o(),(0,r.E)(()=>{let t=()=>a.Gt.preRender(o,!1,!0),i=e.map(e=>e.on("change",t));return()=>{i.forEach(e=>e()),(0,a.WG)(o)}}),i}},2506:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"errorOnce",{enumerable:!0,get:function(){return i}});let i=e=>{}},2568:(e,t,i)=>{i.d(t,{i:()=>F});class a{constructor(e){this.stop=()=>this.runAll("stop"),this.animations=e.filter(Boolean)}get finished(){return Promise.all(this.animations.map(e=>e.finished))}getAll(e){return this.animations[0][e]}setAll(e,t){for(let i=0;i<this.animations.length;i++)this.animations[i][e]=t}attachTimeline(e){let t=this.animations.map(t=>t.attachTimeline(e));return()=>{t.forEach((e,t)=>{e&&e(),this.animations[t].stop()})}}get time(){return this.getAll("time")}set time(e){this.setAll("time",e)}get speed(){return this.getAll("speed")}set speed(e){this.setAll("speed",e)}get state(){return this.getAll("state")}get startTime(){return this.getAll("startTime")}get duration(){return r(this.animations,"duration")}get iterationDuration(){return r(this.animations,"iterationDuration")}runAll(e){this.animations.forEach(t=>t[e]())}play(){this.runAll("play")}pause(){this.runAll("pause")}cancel(){this.runAll("cancel")}complete(){this.runAll("complete")}}function r(e,t){let i=0;for(let a=0;a<e.length;a++){let r=e[a][t];null!==r&&r>i&&(i=r)}return i}class n extends a{then(e,t){return this.finished.finally(e).then(()=>{})}}var o=i(3832),s=i(5596),l=i(4604),d=i(8987),u=i(8493),h=i(6280),c=i(7364),m=i(619),p=i(6242),E=i(8645);function v(e,t){return(0,E.h)(e)?e[((e,t,i)=>{let a=t-e;return((i-e)%a+a)%a+e})(0,e.length,t)]:e}var g=i(38),b=i(4191);function f(e){return"object"==typeof e&&!Array.isArray(e)}function A(e,t,i,a){return null==e?[]:"string"==typeof e&&f(t)?(0,b.K)(e,i,a):e instanceof NodeList?Array.from(e):Array.isArray(e)?e.filter(e=>null!=e):[e]}function y(e,t,i,a){return"number"==typeof t?t:t.startsWith("-")||t.startsWith("+")?Math.max(0,e+parseFloat(t)):"<"===t?i:t.startsWith("<")?Math.max(0,i+parseFloat(t.slice(1))):a.get(t)??e}var _=i(3199);function T(e,t){return e.at!==t.at?e.at-t.at:null===e.value?1:null===t.value?-1:0}function I(e,t){return t.has(e)||t.set(e,{}),t.get(e)}function w(e,t){return t[e]||(t[e]=[]),t[e]}let S=e=>"number"==typeof e,k=e=>e.every(S);var L=i(3238),M=i(3845),R=i(8505),C=i(9411),D=i(7402),O=i(2910),N=i(5755),x=i(5056),P=i(2771);class U extends P.BX{constructor(){super(...arguments),this.type="object"}readValueFromInstance(e,t){if(t in e){let i=e[t];if("string"==typeof i||"number"==typeof i)return i}}getBaseTargetFromProps(){}removeValueFromRenderState(e,t){delete t.output[e]}measureInstanceViewportBox(){return(0,x.ge)()}build(e,t){Object.assign(e.output,t)}renderInstance(e,{output:t}){Object.assign(e,t)}sortInstanceNodePosition(){return 0}}function H(e){let t={presenceContext:null,props:{},visualState:{renderState:{transform:{},transformOrigin:{},style:{},vars:{},attrs:{}},latestValues:{}}},i=(0,C.x)(e)&&!(0,D.h)(e)?new O.l(t):new N.M(t);i.mount(e),M.C.set(e,i)}function W(e){let t=new U({presenceContext:null,props:{},visualState:{renderState:{output:{}},latestValues:{}}});t.mount(e),M.C.set(e,t)}function V(e,t,i,a){let r=[];if((0,c.S)(e)||"number"==typeof e||"string"==typeof e&&!f(t))r.push((0,L.z)(e,f(t)&&t.default||t,i&&i.default||i));else{if(null==e)return r;let n=A(e,t,a),o=n.length;(0,p.V)(!!o,"No valid elements provided.","no-valid-elements");for(let e=0;e<o;e++){let a=n[e],s=a instanceof Element?H:W;M.C.has(a)||s(a);let l=M.C.get(a),d={...i};"delay"in d&&"function"==typeof d.delay&&(d.delay=d.delay(e,o)),r.push(...(0,R.$)(l,{...t,transition:d},{}))}}return r}let F=function(e={}){let{scope:t,reduceMotion:i}=e;return function(e,a,r){let E,b=[];if(Array.isArray(e)&&e.some(Array.isArray))b=function(e,t,i){let a=[];return(function(e,{defaultTransition:t={},...i}={},a,r){let n=t.duration||.3,s=new Map,E=new Map,b={},f=new Map,S=0,L=0,M=0;for(let i=0;i<e.length;i++){let s=e[i];if("string"==typeof s){f.set(s,L);continue}if(!Array.isArray(s)){f.set(s.name,y(L,s.at,S,f));continue}let[g,T,D={}]=s;void 0!==D.at&&(L=y(L,D.at,S,f));let O=0,N=(e,i,a,s=0,c=0)=>{var E;let g=Array.isArray(E=e)?E:[E],{delay:b=0,times:f=(0,l.Z)(g),type:A=t.type||"keyframes",repeat:y,repeatType:T,repeatDelay:I=0,...w}=i,{ease:S=t.ease||"easeOut",duration:R}=i,C="function"==typeof b?b(s,c):b,D=g.length,N=(0,d.W)(A)?A:r?.[A||"keyframes"];if(D<=2&&N){let e=100;2===D&&k(g)&&(e=Math.abs(g[1]-g[0]));let i={...t,...w};void 0!==R&&(i.duration=(0,m.f)(R));let a=(0,u.X)(i,e,N);S=a.ease,R=a.duration}R??(R=n);let x=L+C;1===f.length&&0===f[0]&&(f[1]=1);let P=f.length-g.length;if(P>0&&(0,h.f)(f,P),1===g.length&&g.unshift(null),y){(0,p.V)(y<20,"Repeat count too high, must be less than 20","repeat-count-high");R*=y+1;let e=[...g],t=[...f],i=[...S=Array.isArray(S)?[...S]:[S]];for(let a=0;a<y;a++){g.push(...e);for(let r=0;r<e.length;r++)f.push(t[r]+(a+1)),S.push(0===r?"linear":v(i,r-1))}for(let e=0;e<f.length;e++)f[e]=f[e]/(y+1)}let U=x+R;!function(e,t,i,a,r,n){for(let t=0;t<e.length;t++){let i=e[t];i.at>r&&i.at<n&&((0,o.Ai)(e,i),t--)}for(let o=0;o<t.length;o++)e.push({value:t[o],at:(0,_.k)(r,n,a[o]),easing:v(i,o)})}(a,g,S,f,x,U),O=Math.max(C+R,O),M=Math.max(U,M)};if((0,c.S)(g))N(T,D,w("default",I(g,E)));else{let e=A(g,T,a,b),t=e.length;for(let i=0;i<t;i++){let a=I(e[i],E);for(let e in T){var R,C;N(T[e],(R=D,C=e,R&&R[C]?{...R,...R[C]}:{...R}),w(e,a),i,t)}}}S=L,L+=O}return E.forEach((e,a)=>{for(let r in e){let n=e[r];n.sort(T);let o=[],l=[],d=[];for(let e=0;e<n.length;e++){let{at:t,value:i,easing:a}=n[e];o.push(i),l.push((0,g.q)(0,M,t)),d.push(a||"easeOut")}0!==l[0]&&(l.unshift(0),o.unshift(o[0]),d.unshift("easeInOut")),1!==l[l.length-1]&&(l.push(1),o.push(null)),s.has(a)||s.set(a,{keyframes:{},transition:{}});let u=s.get(a);u.keyframes[r]=o;let{type:h,...c}=t;u.transition[r]={...c,duration:M,ease:d,times:l,...i}}}),s})(e,t,i,{spring:s.o}).forEach(({keyframes:e,transition:t},i)=>{a.push(...V(i,e,t))}),a}(e,void 0!==i?{reduceMotion:i,...a}:a,t);else{let{onComplete:n,...o}=r||{};"function"==typeof n&&(E=n),b=V(e,a,void 0!==i?{reduceMotion:i,...o}:o,t)}let f=new n(b);return E&&f.finished.then(E),t&&(t.animations.push(f),f.finished.then(()=>{(0,o.Ai)(t.animations,f)})),f}}()},3068:(e,t,i)=>{i.d(t,{d:()=>s});var a=i(7477),r=i(9856),n=i(1257),o=i(5802);function s(e){let t=(0,o.M)(()=>(0,a.OQ)(e)),{isStatic:i}=(0,r.useContext)(n.Q);if(i){let[,i]=(0,r.useState)(e);(0,r.useEffect)(()=>t.on("change",i),[])}return t}},4080:(e,t,i)=>{let a,r;i.d(t,{L:()=>Q});var n=i(7477),o=i(6242),s=i(9856),l=i(4399),d=i(2916);function u(e,t){let i,a=()=>{let{currentTime:a}=t,r=(null===a?0:a.value)/100;i!==r&&e(r),i=r};return d.Gt.preUpdate(a,!0),()=>(0,d.WG)(a)}var h=i(7577),c=i(9411),m=i(4191);let p=new WeakMap,E=(e,t,i)=>(a,r)=>r&&r[0]?r[0][e+"Size"]:(0,c.x)(a)&&"getBBox"in a?a.getBBox()[t]:a[i],v=E("inline","width","offsetWidth"),g=E("block","height","offsetHeight");function b({target:e,borderBoxSize:t}){p.get(e)?.forEach(i=>{i(e,{get width(){return v(e,t)},get height(){return g(e,t)}})})}function f(e){e.forEach(b)}let A=new Set;var y=i(38),_=i(1847);let T=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),I={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function w(e,t,i,a){let r=i[t],{length:n,position:o}=I[t],s=r.current,l=i.time;r.current=e[`scroll${o}`],r.scrollLength=e[`scroll${n}`]-e[`client${n}`],r.offset.length=0,r.offset[0]=0,r.offset[1]=r.scrollLength,r.progress=(0,y.q)(0,r.scrollLength,r.current);let d=a-l;r.velocity=d>50?0:(0,_.f)(r.current-s,d)}var S=i(9720),k=i(4604),L=i(9098),M=i(4476);let R={start:0,center:.5,end:1};function C(e,t,i=0){let a=0;if(e in R&&(e=R[e]),"string"==typeof e){let t=parseFloat(e);e.endsWith("px")?a=t:e.endsWith("%")?e=t/100:e.endsWith("vw")?a=t/100*document.documentElement.clientWidth:e.endsWith("vh")?a=t/100*document.documentElement.clientHeight:e=t}return"number"==typeof e&&(a=t*e),i+a}let D=[0,0],O={All:[[0,0],[1,1]]},N={x:0,y:0},x=new WeakMap,P=new WeakMap,U=new WeakMap,H=new WeakMap,W=new WeakMap,V=e=>e===document.scrollingElement?window:e;function F(e,{container:t=document.scrollingElement,trackContentSize:i=!1,...n}={}){if(!t)return l.l;let o=U.get(t);o||(o=new Set,U.set(t,o));let s=function(e,t,i,a={}){return{measure:t=>{!function(e,t=e,i){if(i.x.targetOffset=0,i.y.targetOffset=0,t!==e){let a=t;for(;a&&a!==e;)i.x.targetOffset+=a.offsetLeft,i.y.targetOffset+=a.offsetTop,a=a.offsetParent}i.x.targetLength=t===e?t.scrollWidth:t.clientWidth,i.y.targetLength=t===e?t.scrollHeight:t.clientHeight,i.x.containerLength=e.clientWidth,i.y.containerLength=e.clientHeight}(e,a.target,i),w(e,"x",i,t),w(e,"y",i,t),i.time=t,(a.offset||a.target)&&function(e,t,i){let{offset:a=O.All}=i,{target:r=e,axis:n="y"}=i,o="y"===n?"height":"width",s=r!==e?function(e,t){let i={x:0,y:0},a=e;for(;a&&a!==t;)if((0,M.s)(a))i.x+=a.offsetLeft,i.y+=a.offsetTop,a=a.offsetParent;else if("svg"===a.tagName){let e=a.getBoundingClientRect(),t=(a=a.parentElement).getBoundingClientRect();i.x+=e.left-t.left,i.y+=e.top-t.top}else if(a instanceof SVGGraphicsElement){let{x:e,y:t}=a.getBBox();i.x+=e,i.y+=t;let r=null,n=a.parentNode;for(;!r;)"svg"===n.tagName&&(r=n),n=a.parentNode;a=r}else break;return i}(r,e):N,l=r===e?{width:e.scrollWidth,height:e.scrollHeight}:"getBBox"in r&&"svg"!==r.tagName?r.getBBox():{width:r.clientWidth,height:r.clientHeight},d={width:e.clientWidth,height:e.clientHeight};t[n].offset.length=0;let u=!t[n].interpolate,h=a.length;for(let e=0;e<h;e++){let i=function(e,t,i,a){let r=Array.isArray(e)?e:D,n=0;return"number"==typeof e?r=[e,e]:"string"==typeof e&&(r=(e=e.trim()).includes(" ")?e.split(" "):[e,R[e]?e:"0"]),(n=C(r[0],i,a))-C(r[1],t)}(a[e],d[o],l[o],s[n]);u||i===t[n].interpolatorOffsets[e]||(u=!0),t[n].offset[e]=i}u&&(t[n].interpolate=(0,S.G)(t[n].offset,(0,k.Z)(a),{clamp:!1}),t[n].interpolatorOffsets=[...t[n].offset]),t[n].progress=(0,L.q)(0,1,t[n].interpolate(t[n].current))}(e,i,a)},notify:()=>t(i)}}(t,e,{time:0,x:T(),y:T()},n);if(o.add(s),!x.has(t)){let e=()=>{for(let e of o)e.measure(d.uv.timestamp);d.Gt.preUpdate(i)},i=()=>{for(let e of o)e.notify()},n=()=>d.Gt.read(e);x.set(t,n);let s=V(t);window.addEventListener("resize",n,{passive:!0}),t!==document.documentElement&&P.set(t,"function"==typeof t?(A.add(t),r||(r=()=>{let e={get width(){return window.innerWidth},get height(){return window.innerHeight}};A.forEach(t=>t(e))},window.addEventListener("resize",r)),()=>{A.delete(t),A.size||"function"!=typeof r||(window.removeEventListener("resize",r),r=void 0)}):function(e,t){a||"undefined"!=typeof ResizeObserver&&(a=new ResizeObserver(f));let i=(0,m.K)(e);return i.forEach(e=>{let i=p.get(e);i||(i=new Set,p.set(e,i)),i.add(t),a?.observe(e)}),()=>{i.forEach(e=>{let i=p.get(e);i?.delete(t),i?.size||a?.unobserve(e)})}}(t,n)),s.addEventListener("scroll",n,{passive:!0}),n()}if(i&&!W.has(t)){let e=x.get(t),i={width:t.scrollWidth,height:t.scrollHeight};H.set(t,i);let a=d.Gt.read(()=>{let a=t.scrollWidth,r=t.scrollHeight;(i.width!==a||i.height!==r)&&(e(),i.width=a,i.height=r)},!0);W.set(t,a)}let u=x.get(t);return d.Gt.read(u,!1,!0),()=>{(0,d.WG)(u);let e=U.get(t);if(!e||(e.delete(s),e.size))return;let i=x.get(t);x.delete(t),i&&(V(t).removeEventListener("scroll",i),P.get(t)?.(),window.removeEventListener("resize",i));let a=W.get(t);a&&((0,d.WG)(a),W.delete(t)),H.delete(t)}}let $=new Map;function B({source:e,container:t,...i}){let{axis:a}=i;e&&(t=e);let r=$.get(t)??new Map;$.set(t,r);let n=i.target??"self",o=r.get(n)??{},s=a+(i.offset??[]).join(",");return o[s]||(o[s]=!i.target&&(0,h.J)()?new ScrollTimeline({source:t,axis:a}):function(e){let t={value:0},i=F(i=>{t.value=100*i[e.axis].progress},e);return{currentTime:t,cancel:i}}({container:t,...i})),o[s]}var G=i(5802),K=i(6051);let j=()=>({scrollX:(0,n.OQ)(0),scrollY:(0,n.OQ)(0),scrollXProgress:(0,n.OQ)(0),scrollYProgress:(0,n.OQ)(0)}),q=e=>!!e&&!e.current;function Q(){let{container:e,target:t,...i}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=(0,G.M)(j),r=(0,s.useRef)(null),n=(0,s.useRef)(!1),d=(0,s.useCallback)(()=>(r.current=function(e,{axis:t="y",container:i=document.scrollingElement,...a}={}){var r,n;if(!i)return l.l;let o={axis:t,container:i,...a};return"function"==typeof e?(r=e,n=o,2===r.length?F(e=>{r(e[n.axis].progress,e)},n):u(r,B(n))):function(e,t){let i=B(t);return e.attachTimeline({timeline:t.target?void 0:i,observe:e=>(e.pause(),u(t=>{e.time=e.iterationDuration*t},i))})}(e,o)}((e,t)=>{let{x:i,y:r}=t;a.scrollX.set(i.current),a.scrollXProgress.set(i.progress),a.scrollY.set(r.current),a.scrollYProgress.set(r.progress)},{...i,container:(null==e?void 0:e.current)||void 0,target:(null==t?void 0:t.current)||void 0}),()=>{var e;null==(e=r.current)||e.call(r)}),[e,t,JSON.stringify(i.offset)]);return(0,K.E)(()=>{if(n.current=!1,!(q(e)||q(t)))return d();n.current=!0},[d]),(0,s.useEffect)(()=>n.current?((0,o.V)(!q(e),"Container ref is defined but not hydrated","use-scroll-ref"),(0,o.V)(!q(t),"Target ref is defined but not hydrated","use-scroll-ref"),d()):void 0,[d]),a}},5516:(e,t,i)=>{i.d(t,{z:()=>h});var a=i(7364),r=i(1904),n=i(2916);function o(e){return"number"==typeof e?e:parseFloat(e)}var s=i(9856),l=i(1257),d=i(3068),u=i(1289);function h(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},{isStatic:i}=(0,s.useContext)(l.Q),h=()=>(0,a.S)(e)?e.get():e;if(i)return(0,u.G)(h);let c=(0,d.d)(h());return(0,s.useInsertionEffect)(()=>(function(e,t,i={}){let s,l=e.get(),d=null,u=l,h="string"==typeof l?l.replace(/[\d.-]/g,""):void 0,c=()=>{d&&(d.stop(),d=null)};if(e.attach((t,a)=>{u=t,s=e=>{var t,i;return a((t=e,(i=h)?t+i:t))},n.Gt.postRender(()=>{c();let t=o(e.get()),a=o(u);t!==a&&(d=new r.s({keyframes:[t,a],velocity:e.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...i,onUpdate:s})),e.events.animationStart?.notify(),d?.then(()=>{e.events.animationComplete?.notify()})})},c),(0,a.S)(t)){let i=t.on("change",t=>{var i,a;return e.set((i=t,(a=h)?i+a:i))}),a=e.on("destroy",i);return()=>{i(),a()}}return c})(c,e,t),[c,JSON.stringify(t)]),c}(e,{type:"spring",...t})}},5599:(e,t,i)=>{i.d(t,{_:()=>a});function a(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}},5914:(e,t,i)=>{let a=["abort","canplay","canplaythrough","durationchange","emptied","encrypted","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting","waitingforkey","resize","enterpictureinpicture","leavepictureinpicture","stream-adstart","stream-adend","stream-adtimeout"],r=/(?:cloudflarestream\.com|videodelivery\.net)\/([\w-.]+)/i;function n(e){let t={src:function(e){if(!e.src)return;let t=e.src.match(r),i=t&&t[1],a={controls:""===e.controls?null:0,autoplay:e.autoplay,loop:e.loop,muted:e.muted,preload:e.preload,poster:e.poster,defaultTextTrack:e.defaulttexttrack,primaryColor:e.primarycolor,letterboxColor:e.letterboxcolor,startTime:e.starttime,"ad-url":e.adurl};return`https://iframe.videodelivery.net/${i}?${String(new URLSearchParams(function(e){let t={};for(let i in e){let a=e[i];!0===a||""===a?t[i]=1:!1===a?t[i]=0:null!=a&&(t[i]=a)}return t}(a)))}`}(e),frameborder:0,width:"100%",height:"100%",allow:"accelerometer; fullscreen; autoplay; encrypted-media; gyroscope; picture-in-picture"};return`
    <style>
      :host {
        display: inline-block;
        min-width: 300px;
        min-height: 150px;
        position: relative;
      }
      iframe {
        position: absolute;
        top: 0;
        left: 0;
      }
      :host(:not([controls])) {
        pointer-events: none;
      }
    </style>
    <iframe${function(e){let t="";for(let i in e){let a=e[i];""===a?t+=` ${i}`:t+=` ${i}="${a}"`}return t}(t)}></iframe>
  `}class o extends(globalThis.HTMLElement??class{}){static getTemplateHTML=n;static shadowRootOptions={mode:"open"};static observedAttributes=["autoplay","controls","crossorigin","loop","muted","playsinline","poster","preload","src"];loadComplete=new u;#e;#t;#i;#a=0;async load(){if(this.#e)return;this.#t&&(this.loadComplete=new u),this.#t=!0,await (this.#e=Promise.resolve()),this.#e=null,this.#a=0,this.dispatchEvent(new Event("emptied"));let e=this.api;if(this.api=null,!this.src)return;let t=this.src.match(r),i=t&&t[1];if(this.#i)this.api=e,this.api.src=i;else{this.#i=!0;let e=this.shadowRoot;this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=n(function(e){let t={};for(let i of e)t[i.name]=i.value;return t}(this.attributes)));let t=this.shadowRoot.querySelector("iframe"),i=await l("https://embed.videodelivery.net/embed/sdk.latest.js","Stream");for(let r of(e&&(t.src=`${t.src}`),this.api=i(t),this.api.addEventListener("loadedmetadata",()=>{this.#a=1}),this.api.addEventListener("loadeddata",()=>{this.#a=2}),this.api.addEventListener("playing",()=>{this.#a=3}),a))this.api.addEventListener(r,e=>{this.dispatchEvent(new Event(e.type))})}Promise.resolve().then(()=>{this.dispatchEvent(new Event("loadcomplete")),this.loadComplete.resolve()}),await this.loadComplete}async attributeChangedCallback(e,t,i){if(t!==i){if("src"===e)return void this.load();switch(await this.loadComplete,e){case"autoplay":case"controls":case"loop":this.api[e]=this.hasAttribute(e);break;case"poster":case"preload":this.api[e]=this.getAttribute(e)}}}async play(){var e;return await this.loadComplete,null==(e=this.api)?void 0:e.play()}async pause(){var e;return await this.loadComplete,null==(e=this.api)?void 0:e.pause()}get ended(){var e;return(null==(e=this.api)?void 0:e.ended)??!1}get seeking(){var e;return null==(e=this.api)?void 0:e.seeking}get readyState(){return this.#a}get videoWidth(){var e;return null==(e=this.api)?void 0:e.videoWidth}get videoHeight(){var e;return null==(e=this.api)?void 0:e.videoHeight}get preload(){return this.getAttribute("preload")}set preload(e){this.preload!=e&&this.setAttribute("preload",`${e}`)}get src(){return this.getAttribute("src")}set src(e){this.src!=e&&this.setAttribute("src",`${e}`)}get paused(){var e;return(null==(e=this.api)?void 0:e.paused)??!0}get duration(){var e,t;return(null==(e=this.api)?void 0:e.duration)>0?null==(t=this.api)?void 0:t.duration:NaN}get autoplay(){return this.hasAttribute("autoplay")}set autoplay(e){this.autoplay!=e&&this.toggleAttribute("autoplay",!!e)}get buffered(){var e;return null==(e=this.api)?void 0:e.buffered}get played(){var e;return null==(e=this.api)?void 0:e.played}get controls(){return this.hasAttribute("controls")}set controls(e){this.controls!=e&&this.toggleAttribute("controls",!!e)}get currentTime(){var e;return(null==(e=this.api)?void 0:e.currentTime)??0}set currentTime(e){this.currentTime!=e&&this.loadComplete.then(()=>{this.api.currentTime=e})}get defaultMuted(){return this.hasAttribute("muted")}set defaultMuted(e){this.defaultMuted!=e&&this.toggleAttribute("muted",!!e)}get loop(){return this.hasAttribute("loop")}set loop(e){this.loop!=e&&this.toggleAttribute("loop",!!e)}get muted(){var e;return(null==(e=this.api)?void 0:e.muted)??this.defaultMuted}set muted(e){this.muted!=e&&this.loadComplete.then(()=>{this.api.muted=e})}get playbackRate(){var e;return(null==(e=this.api)?void 0:e.playbackRate)??1}set playbackRate(e){this.playbackRate!=e&&this.loadComplete.then(()=>{this.api.playbackRate=e})}get playsInline(){return this.hasAttribute("playsinline")}set playsInline(e){this.playsInline!=e&&this.toggleAttribute("playsinline",!!e)}get poster(){return this.getAttribute("poster")}set poster(e){this.poster!=e&&this.setAttribute("poster",`${e}`)}get volume(){var e;return(null==(e=this.api)?void 0:e.volume)??1}set volume(e){this.volume!=e&&this.loadComplete.then(()=>{this.api.volume=e})}}let s={};async function l(e,t){return s[e]?s[e]:t&&self[t]?(await d(0),self[t]):s[e]=new Promise(function(i,a){let r=document.createElement("script");r.src=e,r.onload=()=>i(self[t]),r.onerror=a,document.head.append(r)})}let d=e=>new Promise(t=>setTimeout(t,e));class u extends Promise{constructor(e=()=>{}){let t,i;super((a,r)=>{e(a,r),t=a,i=r}),this.resolve=t,this.reject=i}}globalThis.customElements&&!globalThis.customElements.get("cloudflare-video")&&globalThis.customElements.define("cloudflare-video",o)},7439:(e,t,i)=>{i.d(t,{A:()=>a});let a=(0,i(7835).A)("captions-off",[["path",{d:"M10.5 5H19a2 2 0 0 1 2 2v8.5",key:"jqtk4d"}],["path",{d:"M17 11h-.5",key:"1961ue"}],["path",{d:"M19 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2",key:"1keqsi"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M7 11h4",key:"1o1z6v"}],["path",{d:"M7 15h2.5",key:"1ina1g"}]])},7769:(e,t,i)=>{i.d(t,{E:()=>n});var a=i(7364),r=i(2472);function n(e){for(var t=arguments.length,i=Array(t>1?t-1:0),n=1;n<t;n++)i[n-1]=arguments[n];let o=e.length;return(0,r.j)(i.filter(a.S),function(){let t="";for(let r=0;r<o;r++){t+=e[r];let n=i[r];n&&(t+=(0,a.S)(n)?n.get():n)}return t})}},7975:(e,t,i)=>{i.d(t,{A:()=>a});let a=(0,i(7835).A)("captions",[["rect",{width:"18",height:"14",x:"3",y:"5",rx:"2",ry:"2",key:"12ruh7"}],["path",{d:"M7 15h4M15 15h2M7 11h2M13 11h4",key:"1ueiar"}]])},8054:(e,t,i)=>{let a,r;i.d(t,{Ph:()=>nM,xX:()=>nL,OB:()=>nR,aH:()=>nC,nN:()=>nD,WW:()=>nO,td:()=>nN,qD:()=>nx});var n,o,s,l,d,u,h,c,m,p,E,v,g,b,f,A,y,_,T,I,w,S,k,L,M,R,C,D,O,N,x,P,U,H,W,V,F,$,B,G,K,j,q,Q,Y,z,Z,X,J,ee,et,ei,ea,er,en,eo,es,el,ed,eu,eh,ec,em,ep,eE,ev,eg,eb,ef,eA,ey,e_,eT,eI,ew,eS,ek,eL,eM,eR,eC,eD,eO,eN,ex,eP,eU,eH,eW,eV,eF,e$,eB,eG,eK,ej,eq,eQ,eY,ez,eZ,eX,eJ,e0,e1,e2,e5,e3,e4,e7,e8,e9,e6,te,tt,ti,ta,tr,tn,to,ts,tl,td,tu,th,tc,tm,tp,tE,tv,tg,tb,tf,tA,ty,t_,tT,tI,tw,tS,tk,tL=i(9856);let tM=new Set(["style","children","ref","key","suppressContentEditableWarning","suppressHydrationWarning","dangerouslySetInnerHTML"]),tR={className:"class",htmlFor:"for"};function tC(e){return e.toLowerCase()}function tD(e){return"boolean"==typeof e?e?"":void 0:"function"==typeof e?void 0:"object"!=typeof e||null===e?e:void 0}function tO({react:e,tagName:t,elementClass:i,events:a,displayName:r,defaultProps:n,toAttributeName:o=tC,toAttributeValue:s=tD}){let l=Number.parseInt(e.version)>=19,d=e.forwardRef((r,d)=>{let u=e.useRef(null),h=e.useRef(new Map),c={},m={},p={},E={};for(let[e,t]of Object.entries(r)){if(tM.has(e)){p[e]=t;continue}let a=o(tR[e]??e);if(i.prototype&&e in i.prototype&&!(e in(globalThis.HTMLElement?.prototype??{}))&&!i.observedAttributes?.some(e=>e===a)){E[e]=t;continue}if(e.startsWith("on")){c[e]=t;continue}let r=s(t);a&&null!=r&&(m[a]=String(r),l||(p[a]=r)),a&&l&&(r!==tD(t)?p[a]=r:p[a]=t)}if("undefined"!=typeof window){for(let t in c){let i=c[t],r=t.endsWith("Capture"),n=(a?.[t]??t.slice(2).toLowerCase()).slice(0,r?-7:void 0);e.useLayoutEffect(()=>{let e=u?.current;if(e&&"function"==typeof i)return e.addEventListener(n,i,r),()=>{e.removeEventListener(n,i,r)}},[u?.current,i])}e.useLayoutEffect(()=>{if(null===u.current)return;let e=new Map;for(let t in E)tN(u.current,t,E[t]),h.current.delete(t),e.set(t,E[t]);for(let[e,t]of h.current)tN(u.current,e,void 0);h.current=e})}if("undefined"==typeof window&&i?.getTemplateHTML&&i?.shadowRootOptions){let{mode:t,delegatesFocus:a}=i.shadowRootOptions;p.children=[e.createElement("template",{shadowrootmode:t,shadowrootdelegatesfocus:a,dangerouslySetInnerHTML:{__html:i.getTemplateHTML(m,r)},key:"ce-la-react-ssr-template-shadow-root"}),p.children]}return e.createElement(t,{...n,...p,ref:e.useCallback(e=>{u.current=e,"function"==typeof d?d(e):null!==d&&(d.current=e)},[d])},p.children)});return d.displayName=r??i.name,d}function tN(e,t,i){e[t]=i,null==i&&t in(globalThis.HTMLElement?.prototype??{})&&e.removeAttribute(t)}let tx={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_LOOP_REQUEST:"medialooprequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},tP={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},tU={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},tH=Object.entries(tU),tW=tH.reduce((e,[t,i])=>(e[t]=i.toLowerCase(),e),{}),tV=tH.reduce((e,[t,i])=>(e[t]=i.toLowerCase(),e),{USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"});Object.entries(tV).reduce((e,[t,i])=>{let a=tW[t];return a&&(e[i]=a),e},{userinactivechange:"userinactive"});let tF=Object.entries(tW).reduce((e,[t,i])=>{let a=tV[t];return a&&(e[i]=a),e},{userinactive:"userinactivechange"}),t$={SUBTITLES:"subtitles",CAPTIONS:"captions",CHAPTERS:"chapters",METADATA:"metadata"},tB={DISABLED:"disabled",SHOWING:"showing"},tG={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},tK={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},tj={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"},tq={FULLSCREEN:"fullscreen"};function tQ(e){if(e){let{id:t,width:i,height:a}=e;return[t,i,a].filter(e=>null!=e).join(":")}}function tY(e){if(e){let{id:t,kind:i,language:a,label:r}=e;return[t,i,a,r].filter(e=>null!=e).join(":")}}function tz(e){return"number"==typeof e&&!Number.isNaN(e)&&Number.isFinite(e)}let tZ=e=>new Promise(t=>setTimeout(t,e)),tX=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],tJ=e=>{if(!tz(e))return"";let t=Math.abs(e),i=t!==e,a=new Date(0,0,0,0,0,t,0),r=[a.getHours(),a.getMinutes(),a.getSeconds()].map((e,t)=>e&&((e,t)=>{let i=1===e?tX[t].singular:tX[t].plural;return`${e} ${i}`})(e,t)).filter(e=>e).join(", ");return`${r}${i?" remaining":""}`};function t0(e,t){let i=!1;e<0&&(i=!0,e=0-e);let a=Math.floor((e=e<0?0:e)%60),r=Math.floor(e/60%60),n=Math.floor(e/3600),o=Math.floor(t/60%60),s=Math.floor(t/3600);return(isNaN(e)||e===1/0)&&(n=r=a="0"),r=(((n=n>0||s>0?n+":":"")||o>=10)&&r<10?"0"+r:r)+":",(i?"-":"")+n+r+(a=a<10?"0"+a:a)}Object.freeze({length:0,start(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(e){let t=e>>>0;if(t>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${t}) is greater than or equal to the maximum bound (${this.length}).`);return 0}});let t1={en:{"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute",Loop:"Loop","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute","chapter: {chapterName}":"chapter: {chapterName}",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it."}},t2=(null==(n=globalThis.navigator)?void 0:n.language)||"en",t5=(e,t={})=>(e=>{var t,i,a;let[r]=t2.split("-");return(null==(t=t1[t2])?void 0:t[e])||(null==(i=t1[r])?void 0:i[e])||(null==(a=t1.en)?void 0:a[e])||e})(e).replace(/\{(\w+)\}/g,(e,i)=>i in t?String(t[i]):`{${i}}`);class t3{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}}class t4 extends t3{}class t7 extends t4{constructor(){super(...arguments),this.role=null}}class t8{observe(){}unobserve(){}disconnect(){}}let t9={createElement:function(){return new t6.HTMLElement},createElementNS:function(){return new t6.HTMLElement},addEventListener(){},removeEventListener(){},dispatchEvent:e=>!1},t6={ResizeObserver:t8,document:t9,Node:t4,Element:t7,HTMLElement:class extends t7{constructor(){super(...arguments),this.innerHTML=""}get content(){return new t6.DocumentFragment}},DocumentFragment:class extends t3{},customElements:{get:function(){},define:function(){},whenDefined:function(){}},localStorage:{getItem:e=>null,setItem(e,t){},removeItem(e){}},CustomEvent:function(){},getComputedStyle:function(){},navigator:{languages:[],get userAgent(){return""}},matchMedia:e=>({matches:!1,media:e}),DOMParser:class{parseFromString(e,t){return{body:{textContent:e}}}}},ie="global"in globalThis&&(null==globalThis?void 0:globalThis.global)===globalThis||"undefined"==typeof window||void 0===window.customElements,it=Object.keys(t6).every(e=>e in globalThis),ii=ie&&!it?t6:globalThis,ia=ie&&!it?t9:globalThis.document,ir=new WeakMap,io=e=>{let t=ir.get(e);return t||ir.set(e,t=new Set),t},is=new ii.ResizeObserver(e=>{for(let t of e)for(let e of io(t.target))e(t)});function il(e,t){io(e).add(t),is.observe(e)}function id(e,t){let i=io(e);i.delete(t),i.size||is.unobserve(e)}function iu(e){let t={};for(let i of e)t[i.name]=i.value;return t}let ih=(e,t,i=".value")=>{let a=e.querySelector(i);a&&(a.textContent=t)},ic=(e,t)=>((e,t)=>{let i=`slot[name="${t}"]`,a=e.shadowRoot.querySelector(i);return a?a.children:[]})(e,t)[0],im=(e,t)=>!!e&&!!t&&(null!=e&&!!e.contains(t)||im(e,t.getRootNode().host)),ip=(e,t)=>{if(!e)return null;let i=e.closest(t);return i||ip(e.getRootNode().host,t)};function iE(e,{depth:t=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(e.checkVisibility)return e.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let r=e;for(;r&&t>0;){let e=getComputedStyle(r);if(i&&"0"===e.opacity||a&&"hidden"===e.visibility||"none"===e.display)return!1;r=r.parentElement,t--}return!0}function iv(e,t){let i=function(e,t){var i,a;let r;for(r of null!=(i=e.querySelectorAll("style:not([media])"))?i:[]){let e;try{e=null==(a=r.sheet)?void 0:a.cssRules}catch{continue}for(let i of null!=e?e:[])if(t(i.selectorText))return i}}(e,e=>e===t);return i||ig(e,t)}function ig(e,t){var i,a;let r=null!=(i=e.querySelectorAll("style:not([media])"))?i:[],n=null==r?void 0:r[r.length-1];return(null==n?void 0:n.sheet)?(null==n||n.sheet.insertRule(`${t}{}`,n.sheet.cssRules.length),null==(a=n.sheet.cssRules)?void 0:a[n.sheet.cssRules.length-1]):(console.warn("Media Chrome: No style sheet found on style tag of",e),{style:{setProperty:()=>{},removeProperty:()=>"",getPropertyValue:()=>""}})}function ib(e,t,i=NaN){let a=e.getAttribute(t);return null!=a?+a:i}function iA(e,t,i){let a=+i;if(null==i||Number.isNaN(a)){e.hasAttribute(t)&&e.removeAttribute(t);return}ib(e,t,void 0)!==a&&e.setAttribute(t,`${a}`)}function iy(e,t){return e.hasAttribute(t)}function i_(e,t,i){if(null==i){e.hasAttribute(t)&&e.removeAttribute(t);return}iy(e,t)!=i&&e.toggleAttribute(t,i)}function iT(e,t,i=null){var a;return null!=(a=e.getAttribute(t))?a:i}function iI(e,t,i){if(null==i){e.hasAttribute(t)&&e.removeAttribute(t);return}let a=`${i}`;iT(e,t,void 0)!==a&&e.setAttribute(t,a)}var iw=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},iS=(e,t,i)=>(iw(e,t,"read from private field"),i?i.call(e):t.get(e)),ik=(e,t,i,a)=>(iw(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);class iL extends ii.HTMLElement{constructor(){if(super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,o,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=iu(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[tP.MEDIA_CONTROLLER,tW.MEDIA_PAUSED]}attributeChangedCallback(e,t,i){var a,r,n,s,l;e===tP.MEDIA_CONTROLLER&&(t&&(null==(r=null==(a=iS(this,o))?void 0:a.unassociateElement)||r.call(a,this),ik(this,o,null)),i&&this.isConnected&&(ik(this,o,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(l=null==(s=iS(this,o))?void 0:s.associateElement)||l.call(s,this)))}connectedCallback(){var e,t,i,a;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),ik(this,o,function(e){var t;let i=e.getAttribute(tP.MEDIA_CONTROLLER);return i?null==(t=e.getRootNode())?void 0:t.getElementById(i):ip(e,"media-controller")}(this)),this.getAttribute(tP.MEDIA_CONTROLLER)&&(null==(t=null==(e=iS(this,o))?void 0:e.associateElement)||t.call(e,this)),null==(i=iS(this,o))||i.addEventListener("pointerdown",this),null==(a=iS(this,o))||a.addEventListener("click",this)}disconnectedCallback(){var e,t,i,a;this.getAttribute(tP.MEDIA_CONTROLLER)&&(null==(t=null==(e=iS(this,o))?void 0:e.unassociateElement)||t.call(e,this)),null==(i=iS(this,o))||i.removeEventListener("pointerdown",this),null==(a=iS(this,o))||a.removeEventListener("click",this),ik(this,o,null)}handleEvent(e){var t;let i=null==(t=e.composedPath())?void 0:t[0];if(["video","media-controller"].includes(null==i?void 0:i.localName)){if("pointerdown"===e.type)this._pointerType=e.pointerType;else if("click"===e.type){let{clientX:t,clientY:i}=e,{left:a,top:r,width:n,height:o}=this.getBoundingClientRect(),s=t-a,l=i-r;if(s<0||l<0||s>n||l>o||0===n&&0===o)return;let d=this._pointerType||"mouse";if(this._pointerType=void 0,d===tG.TOUCH)return void this.handleTap(e);if(d===tG.MOUSE||d===tG.PEN)return void this.handleMouseClick(e)}}}get mediaPaused(){return iy(this,tW.MEDIA_PAUSED)}set mediaPaused(e){i_(this,tW.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){let t=this.mediaPaused?tx.MEDIA_PLAY_REQUEST:tx.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new ii.CustomEvent(t,{composed:!0,bubbles:!0}))}}o=new WeakMap,iL.shadowRootOptions={mode:"open"},iL.getTemplateHTML=function(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `},ii.customElements.get("media-gesture-receiver")||ii.customElements.define("media-gesture-receiver",iL);var iM=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},iR=(e,t,i)=>(iM(e,t,"read from private field"),i?i.call(e):t.get(e)),iC=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},iD=(e,t,i,a)=>(iM(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),iO=(e,t,i)=>(iM(e,t,"access private method"),i);let iN={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"},ix=Object.values(tW);function iP(e,t){var i,a,r;if(!e.isConnected)return;let n=Object.fromEntries((null!=(i=e.getAttribute(iN.BREAKPOINTS))?i:"sm:384 md:576 lg:768 xl:960").split(/\s+/).map(e=>e.split(":"))),o=(a=n,r=t,Object.keys(a).filter(e=>r>=parseInt(a[e]))),s=!1;if(Object.keys(n).forEach(t=>{if(o.includes(t)){e.hasAttribute(`breakpoint${t}`)||(e.setAttribute(`breakpoint${t}`,""),s=!0);return}e.hasAttribute(`breakpoint${t}`)&&(e.removeAttribute(`breakpoint${t}`),s=!0)}),s){let t=new CustomEvent(tV.BREAKPOINTS_CHANGE,{detail:o});e.dispatchEvent(t)}e.breakpointsComputed||(e.breakpointsComputed=!0,e.dispatchEvent(new CustomEvent(tV.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}class iU extends ii.HTMLElement{constructor(){if(super(),iC(this,c),iC(this,v),iC(this,b),iC(this,A),iC(this,_),iC(this,I),iC(this,s,0),iC(this,l,null),iC(this,d,null),iC(this,u,void 0),this.breakpointsComputed=!1,iC(this,h,new MutationObserver(iO(this,c,m).bind(this))),iC(this,p,!1),iC(this,E,e=>{iR(this,p)||(setTimeout(()=>{!function(e){iP(e.target,e.contentRect.width)}(e),iD(this,p,!1)},0),iD(this,p,!0))}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=iu(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}let e=this.querySelector(":scope > slot[slot=media]");e&&e.addEventListener("slotchange",()=>{if(!e.assignedElements({flatten:!0}).length){iR(this,l)&&this.mediaUnsetCallback(iR(this,l));return}this.handleMediaUpdated(this.media)})}static get observedAttributes(){return[iN.AUTOHIDE,iN.GESTURES_DISABLED].concat(ix).filter(e=>![tW.MEDIA_RENDITION_LIST,tW.MEDIA_AUDIO_TRACK_LIST,tW.MEDIA_CHAPTERS_CUES,tW.MEDIA_WIDTH,tW.MEDIA_HEIGHT,tW.MEDIA_ERROR,tW.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,t,i){e.toLowerCase()==iN.AUTOHIDE&&(this.autohide=i)}get media(){let e=this.querySelector(":scope > [slot=media]");return(null==e?void 0:e.nodeName)=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(iD(this,l,e),e.localName.includes("-")&&await ii.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;iR(this,h).observe(this,{childList:!0,subtree:!0}),il(this,iR(this,E));let t=null!=this.getAttribute(iN.AUDIO)?t5("audio player"):t5("video player");this.setAttribute("role","region"),this.setAttribute("aria-label",t),this.handleMediaUpdated(this.media),this.setAttribute(iN.USER_INACTIVE,""),iP(this,this.getBoundingClientRect().width),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),null==(e=ii.window)||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;iR(this,h).disconnect(),id(this,iR(this,E)),this.media&&this.mediaUnsetCallback(this.media),null==(e=ii.window)||e.removeEventListener("mouseup",this)}mediaSetCallback(e){}mediaUnsetCallback(e){iD(this,l,null)}handleEvent(e){switch(e.type){case"pointerdown":iD(this,s,e.timeStamp);break;case"pointermove":iO(this,v,g).call(this,e);break;case"pointerup":iO(this,b,f).call(this,e);break;case"mouseleave":iO(this,A,y).call(this);break;case"mouseup":this.removeAttribute(iN.KEYBOARD_CONTROL);break;case"keyup":iO(this,I,w).call(this),this.setAttribute(iN.KEYBOARD_CONTROL,"")}}set autohide(e){let t=Number(e);iD(this,u,isNaN(t)?0:t)}get autohide(){return(void 0===iR(this,u)?2:iR(this,u)).toString()}get breakpoints(){return iT(this,iN.BREAKPOINTS)}set breakpoints(e){iI(this,iN.BREAKPOINTS,e)}get audio(){return iy(this,iN.AUDIO)}set audio(e){i_(this,iN.AUDIO,e)}get gesturesDisabled(){return iy(this,iN.GESTURES_DISABLED)}set gesturesDisabled(e){i_(this,iN.GESTURES_DISABLED,e)}get keyboardControl(){return iy(this,iN.KEYBOARD_CONTROL)}set keyboardControl(e){i_(this,iN.KEYBOARD_CONTROL,e)}get noAutohide(){return iy(this,iN.NO_AUTOHIDE)}set noAutohide(e){i_(this,iN.NO_AUTOHIDE,e)}get autohideOverControls(){return iy(this,iN.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){i_(this,iN.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return iy(this,iN.USER_INACTIVE)}set userInteractive(e){i_(this,iN.USER_INACTIVE,e)}}s=new WeakMap,l=new WeakMap,d=new WeakMap,u=new WeakMap,h=new WeakMap,c=new WeakSet,m=function(e){let t=this.media;for(let i of e)if("childList"===i.type){for(let e of i.removedNodes){if("media"!=e.slot||i.target!=this)continue;let a=i.previousSibling&&i.previousSibling.previousElementSibling;if(a&&t){let t="media"!==a.slot;for(;null!==(a=a.previousSibling);)"media"==a.slot&&(t=!1);t&&this.mediaUnsetCallback(e)}else this.mediaUnsetCallback(e)}if(t)for(let e of i.addedNodes)e===t&&this.handleMediaUpdated(t)}},p=new WeakMap,E=new WeakMap,v=new WeakSet,g=function(e){if("mouse"!==e.pointerType&&e.timeStamp-iR(this,s)<250)return;iO(this,_,T).call(this),clearTimeout(iR(this,d));let t=this.hasAttribute(iN.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(e.target)||t)&&iO(this,I,w).call(this)},b=new WeakSet,f=function(e){if("touch"===e.pointerType){let t=!this.hasAttribute(iN.USER_INACTIVE);[this,this.media].includes(e.target)&&t?iO(this,A,y).call(this):iO(this,I,w).call(this)}else e.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(null==e?void 0:e.localName))&&iO(this,I,w).call(this)},A=new WeakSet,y=function(){if(0>iR(this,u)||this.hasAttribute(iN.USER_INACTIVE))return;this.setAttribute(iN.USER_INACTIVE,"");let e=new ii.CustomEvent(tV.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(e)},_=new WeakSet,T=function(){if(!this.hasAttribute(iN.USER_INACTIVE))return;this.removeAttribute(iN.USER_INACTIVE);let e=new ii.CustomEvent(tV.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(e)},I=new WeakSet,w=function(){iO(this,_,T).call(this),clearTimeout(iR(this,d));let e=parseInt(this.autohide);e<0||iD(this,d,setTimeout(()=>{iO(this,A,y).call(this)},1e3*e))},iU.shadowRootOptions={mode:"open"},iU.getTemplateHTML=function(e){return`
    <style>
      
      :host([${tW.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
        outline: none;
      }

      :host {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        line-height: 0;
        background-color: var(--media-background-color, #000);
        overflow: hidden;
      }

      :host(:not([${iN.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: start;
        pointer-events: none;
        background: none;
      }

      slot[name=media] {
        display: var(--media-slot-display, contents);
      }

      
      :host([${iN.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${iN.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${iN.AUDIO}])[${iN.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${iN.AUDIO}])[${iN.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${iN.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${iN.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${iN.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
        align-self: stretch;
        flex-grow: 1;
      }

      slot[name=middle-chrome] {
        display: inline;
        flex-grow: 1;
        pointer-events: none;
        background: none;
      }

      
      ::slotted([slot=media]),
      ::slotted([slot=poster]) {
        width: 100%;
        height: 100%;
      }

      
      :host(:not([${iN.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${iN.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${iN.USER_INACTIVE}]:not([${tW.MEDIA_PAUSED}]):not([${tW.MEDIA_IS_AIRPLAYING}]):not([${tW.MEDIA_IS_CASTING}]):not([${iN.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${iN.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${iN.USER_INACTIVE}]:not([${iN.NO_AUTOHIDE}]):not([${tW.MEDIA_PAUSED}]):not([${tW.MEDIA_IS_CASTING}]):not([${iN.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${iN.USER_INACTIVE}][${iN.AUTOHIDE_OVER_CONTROLS}]:not([${iN.NO_AUTOHIDE}]):not([${tW.MEDIA_PAUSED}]):not([${tW.MEDIA_IS_CASTING}]):not([${iN.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${iN.AUDIO}])[${tW.MEDIA_HAS_PLAYED}]) slot[name=poster] {
        display: none;
      }

      ::slotted([role=dialog]) {
        width: 100%;
        height: 100%;
        align-self: center;
      }

      ::slotted([role=menu]) {
        align-self: end;
      }
    </style>

    <slot name="media" part="layer media-layer"></slot>
    <slot name="poster" part="layer poster-layer"></slot>
    <slot name="gestures-chrome" part="layer gesture-layer">
      <media-gesture-receiver slot="gestures-chrome">
        <template shadowrootmode="${iL.shadowRootOptions.mode}">
          ${iL.getTemplateHTML({})}
        </template>
      </media-gesture-receiver>
    </slot>
    <span part="layer vertical-layer">
      <slot name="top-chrome" part="top chrome"></slot>
      <slot name="middle-chrome" part="middle chrome"></slot>
      <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
      
      <slot part="bottom chrome"></slot>
    </span>
    <slot name="dialog" part="layer dialog-layer"></slot>
  `},ii.customElements.get("media-container")||ii.customElements.define("media-container",iU);var iH=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},iW=(e,t,i)=>(iH(e,t,"read from private field"),i?i.call(e):t.get(e)),iV=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},iF=(e,t,i,a)=>(iH(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);class i${constructor(e,t,{defaultValue:i}={defaultValue:void 0}){iV(this,R),iV(this,S,void 0),iV(this,k,void 0),iV(this,L,void 0),iV(this,M,new Set),iF(this,S,e),iF(this,k,t),iF(this,L,new Set(i))}[Symbol.iterator](){return iW(this,R,C).values()}get length(){return iW(this,R,C).size}get value(){var e;return null!=(e=[...iW(this,R,C)].join(" "))?e:""}set value(e){var t;e!==this.value&&(iF(this,M,new Set),this.add(...null!=(t=null==e?void 0:e.split(" "))?t:[]))}toString(){return this.value}item(e){return[...iW(this,R,C)][e]}values(){return iW(this,R,C).values()}forEach(e,t){iW(this,R,C).forEach(e,t)}add(...e){var t,i;e.forEach(e=>iW(this,M).add(e)),(""!==this.value||(null==(t=iW(this,S))?void 0:t.hasAttribute(`${iW(this,k)}`)))&&(null==(i=iW(this,S))||i.setAttribute(`${iW(this,k)}`,`${this.value}`))}remove(...e){var t;e.forEach(e=>iW(this,M).delete(e)),null==(t=iW(this,S))||t.setAttribute(`${iW(this,k)}`,`${this.value}`)}contains(e){return iW(this,R,C).has(e)}toggle(e,t){if(void 0!==t)if(t)return this.add(e),!0;else return this.remove(e),!1;return this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,t){return this.remove(e),this.add(t),e===t}}S=new WeakMap,k=new WeakMap,L=new WeakMap,M=new WeakMap,R=new WeakSet,C=function(){return iW(this,M).size?iW(this,M):iW(this,L)};let iB=(e="")=>{let[t,i,a]=e.split(":"),r=a?decodeURIComponent(a):void 0;return{kind:"cc"===t?t$.CAPTIONS:t$.SUBTITLES,language:i,label:r}},iG=(e="",t={})=>((e="")=>e.split(/\s+/))(e).map(e=>{let i=iB(e);return{...t,...i}}),iK=e=>e?Array.isArray(e)?e.map(e=>"string"==typeof e?iB(e):e):"string"==typeof e?iG(e):[e]:[],ij=({kind:e,label:t,language:i}={kind:"subtitles"})=>t?`${"captions"===e?"cc":"sb"}:${i}:${encodeURIComponent(t)}`:i,iq=(e=[])=>Array.prototype.map.call(e,ij).join(" "),iQ=e=>{let t=Object.entries(e).map(([e,t])=>i=>i[e]===t);return e=>t.every(t=>t(e))},iY=(e,t=[],i=[])=>{let a=iK(i).map(iQ);Array.from(t).filter(e=>a.some(t=>t(e))).forEach(t=>{t.mode=e})},iz=(e,t=()=>!0)=>{if(!(null==e?void 0:e.textTracks))return[];let i="function"==typeof t?t:iQ(t);return Array.from(e.textTracks).filter(i)},iZ="exitFullscreen"in ia?"exitFullscreen":"webkitExitFullscreen"in ia?"webkitExitFullscreen":"webkitCancelFullScreen"in ia?"webkitCancelFullScreen":void 0,iX="fullscreenElement"in ia?"fullscreenElement":"webkitFullscreenElement"in ia?"webkitFullscreenElement":void 0,iJ="fullscreenEnabled"in ia?"fullscreenEnabled":"webkitFullscreenEnabled"in ia?"webkitFullscreenEnabled":void 0,i0=()=>{var e;return a||(a=null==(e=null==ia?void 0:ia.createElement)?void 0:e.call(ia,"video"))},i1=async(e=i0())=>{if(!e)return!1;let t=e.volume;e.volume=t/2+.1;let i=new AbortController,a=await Promise.race([i2(e,i.signal),i5(e,t)]);return i.abort(),a},i2=(e,t)=>new Promise(i=>{e.addEventListener("volumechange",()=>i(!0),{signal:t})}),i5=async(e,t)=>{for(let i=0;i<10;i++){if(e.volume===t)return!1;await tZ(10)}return e.volume!==t},i3=/.*Version\/.*Safari\/.*/.test(ii.navigator.userAgent),i4=(e=i0())=>(!ii.matchMedia("(display-mode: standalone)").matches||!i3)&&"function"==typeof(null==e?void 0:e.requestPictureInPicture),i7=(e=i0())=>(e=>{let{documentElement:t,media:i}=e;return!!(null==t?void 0:t[iJ])||i&&"webkitSupportsFullscreen"in i})({documentElement:ia,media:e}),i8=i7(),i9=i4(),i6=!!ii.WebKitPlaybackTargetAvailabilityEvent,ae=!!ii.chrome,at=e=>iz(e.media,e=>[t$.SUBTITLES,t$.CAPTIONS].includes(e.kind)).sort((e,t)=>e.kind>=t.kind?1:-1),ai=e=>iz(e.media,e=>e.mode===tB.SHOWING&&[t$.SUBTITLES,t$.CAPTIONS].includes(e.kind)),aa=(e,t)=>{let i=at(e),a=ai(e),r=!!a.length;if(i.length){if(!1===t||r&&!0!==t)iY(tB.DISABLED,i,a);else if(!0===t||!r&&!1!==t){let t=i[0],{options:r}=e;if(!(null==r?void 0:r.noSubtitlesLangPref)){let e=globalThis.localStorage.getItem("media-chrome-pref-subtitles-lang"),a=e?[e,...globalThis.navigator.languages]:globalThis.navigator.languages,r=i.filter(e=>a.some(t=>e.language.toLowerCase().startsWith(t.split("-")[0]))).sort((e,t)=>a.findIndex(t=>e.language.toLowerCase().startsWith(t.split("-")[0]))-a.findIndex(e=>t.language.toLowerCase().startsWith(e.split("-")[0])));r[0]&&(t=r[0])}let{language:n,label:o,kind:s}=t;iY(tB.DISABLED,i,a),iY(tB.SHOWING,i,[{language:n,label:o,kind:s}])}}},ar=(e,t)=>e===t||null!=e&&null!=t&&typeof e==typeof t&&(!!("number"==typeof e&&Number.isNaN(e)&&Number.isNaN(t))||"object"==typeof e&&(Array.isArray(e)?an(e,t):Object.entries(e).every(([e,i])=>e in t&&ar(i,t[e])))),an=(e,t)=>{let i=Array.isArray(e),a=Array.isArray(t);return i===a&&(!i&&!a||e.length===t.length&&e.every((e,i)=>ar(e,t[i])))},ao=Object.values(tj),as=i1().then(e=>r=e),al=async(...e)=>{await Promise.all(e.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof ii.HTMLElement))return;let t=e.localName;if(!t.includes("-"))return;let i=ii.customElements.get(t);i&&e instanceof i||(await ii.customElements.whenDefined(t),ii.customElements.upgrade(e))}))},ad=new ii.DOMParser,au={mediaError:{get(e,t){let{media:i}=e;if((null==t?void 0:t.type)!=="playing")return null==i?void 0:i.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(e,t){var i;let{media:a}=e;if((null==t?void 0:t.type)!=="playing")return null==(i=null==a?void 0:a.error)?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(e,t){var i,a;let{media:r}=e;if((null==t?void 0:t.type)!=="playing")return null!=(a=null==(i=null==r?void 0:r.error)?void 0:i.message)?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.videoWidth)?t:0},mediaEvents:["resize"]},mediaHeight:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.videoHeight)?t:0},mediaEvents:["resize"]},mediaPaused:{get(e){var t;let{media:i}=e;return null==(t=null==i?void 0:i.paused)||t},set(e,t){var i;let{media:a}=t;a&&(e?a.pause():null==(i=a.play())||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(e,t){let{media:i}=e;return!!i&&(t?"playing"===t.type:!i.paused)},mediaEvents:["playing","emptied"]},mediaEnded:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.ended)&&t},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.playbackRate)?t:1},set(e,t){let{media:i}=t;i&&Number.isFinite(+e)&&(i.playbackRate=+e)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.muted)&&t},set(e,t){let{media:i,options:{noMutedPref:a}={}}=t;if(i){i.muted=e;try{let t=null!==ii.localStorage.getItem("media-chrome-pref-muted"),r=i.hasAttribute("muted");if(a){t&&ii.localStorage.removeItem("media-chrome-pref-muted");return}if(r&&!t)return;ii.localStorage.setItem("media-chrome-pref-muted",e?"true":"false")}catch(e){console.debug("Error setting muted pref",e)}}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noMutedPref:i}}=t,{media:a}=t;if(a&&!a.muted&&!i)try{let i="true"===ii.localStorage.getItem("media-chrome-pref-muted");au.mediaMuted.set(i,t),e(i)}catch(e){console.debug("Error getting muted pref",e)}}]},mediaLoop:{get(e){let{media:t}=e;return null==t?void 0:t.loop},set(e,t){let{media:i}=t;i&&(i.loop=e)},mediaEvents:["medialooprequest"]},mediaVolume:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.volume)?t:1},set(e,t){let{media:i,options:{noVolumePref:a}={}}=t;if(i){try{null==e?ii.localStorage.removeItem("media-chrome-pref-volume"):i.hasAttribute("muted")||a||ii.localStorage.setItem("media-chrome-pref-volume",e.toString())}catch(e){console.debug("Error setting volume pref",e)}Number.isFinite(+e)&&(i.volume=+e)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(e,t)=>{let{options:{noVolumePref:i}}=t;if(!i)try{let{media:i}=t;if(!i)return;let a=ii.localStorage.getItem("media-chrome-pref-volume");if(null==a)return;au.mediaVolume.set(+a,t),e(+a)}catch(e){console.debug("Error getting volume pref",e)}}]},mediaVolumeLevel:{get(e){let{media:t}=e;return void 0===(null==t?void 0:t.volume)?"high":t.muted||0===t.volume?"off":t.volume<.5?"low":t.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(e){var t;let{media:i}=e;return null!=(t=null==i?void 0:i.currentTime)?t:0},set(e,t){let{media:i}=t;i&&tz(e)&&(i.currentTime=e)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(e){let{media:t,options:{defaultDuration:i}={}}=e;return i&&(!t||!t.duration||Number.isNaN(t.duration)||!Number.isFinite(t.duration))?i:Number.isFinite(null==t?void 0:t.duration)?t.duration:NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(e){let{media:t}=e;return(null==t?void 0:t.readyState)<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(e){var t;let{media:i}=e;if(!(null==(t=null==i?void 0:i.seekable)?void 0:t.length))return;let a=i.seekable.start(0),r=i.seekable.end(i.seekable.length-1);if(a||r)return[Number(a.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(e){var t;let{media:i}=e,a=null!=(t=null==i?void 0:i.buffered)?t:[];return Array.from(a).map((e,t)=>[Number(a.start(t).toFixed(3)),Number(a.end(t).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(e){let{media:t,options:{defaultStreamType:i}={}}=e,a=[tj.LIVE,tj.ON_DEMAND].includes(i)?i:void 0;if(!t)return a;let{streamType:r}=t;if(ao.includes(r))return r===tj.UNKNOWN?a:r;let n=t.duration;return n===1/0?tj.LIVE:Number.isFinite(n)?tj.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(e){let{media:t}=e;if(!t)return NaN;let{targetLiveWindow:i}=t,a=au.mediaStreamType.get(e);return(null==i||Number.isNaN(i))&&a===tj.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(e){let{media:t,options:{liveEdgeOffset:i=10}={}}=e;if(!t)return!1;if("number"==typeof t.liveEdgeStart)return!Number.isNaN(t.liveEdgeStart)&&t.currentTime>=t.liveEdgeStart;if(au.mediaStreamType.get(e)!==tj.LIVE)return!1;let a=t.seekable;if(!a)return!0;if(!a.length)return!1;let r=a.end(a.length-1)-i;return t.currentTime>=r},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get:e=>at(e).map(({kind:e,label:t,language:i})=>({kind:e,label:t,language:i})),mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get:e=>ai(e).map(({kind:e,label:t,language:i})=>({kind:e,label:t,language:i})),mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(e,t)=>{var i,a;let{media:r,options:n}=t;if(!r)return;let o=e=>{var i;n.defaultSubtitles&&(e&&![t$.CAPTIONS,t$.SUBTITLES].includes(null==(i=null==e?void 0:e.track)?void 0:i.kind)||aa(t,!0))};return r.addEventListener("loadstart",o),null==(i=r.textTracks)||i.addEventListener("addtrack",o),null==(a=r.textTracks)||a.addEventListener("removetrack",o),()=>{var e,t;r.removeEventListener("loadstart",o),null==(e=r.textTracks)||e.removeEventListener("addtrack",o),null==(t=r.textTracks)||t.removeEventListener("removetrack",o)}}]},mediaChaptersCues:{get(e){var t;let{media:i}=e;if(!i)return[];let[a]=iz(i,{kind:t$.CHAPTERS});return Array.from(null!=(t=null==a?void 0:a.cues)?t:[]).map(({text:e,startTime:t,endTime:i})=>({text:e&&ad.parseFromString(e,"text/html").body.textContent||e,startTime:t,endTime:i}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(e,t)=>{var i;let{media:a}=t;if(!a)return;let r=a.querySelector('track[kind="chapters"][default][src]'),n=null==(i=a.shadowRoot)?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return null==r||r.addEventListener("load",e),null==n||n.addEventListener("load",e),()=>{null==r||r.removeEventListener("load",e),null==n||n.removeEventListener("load",e)}}]},mediaIsPip:{get(e){var t,i;let{media:a,documentElement:r}=e;if(!a||!r||!r.pictureInPictureElement)return!1;if(r.pictureInPictureElement===a)return!0;if(r.pictureInPictureElement instanceof HTMLMediaElement)return!!(null==(t=a.localName)?void 0:t.includes("-"))&&im(a,r.pictureInPictureElement);if(r.pictureInPictureElement.localName.includes("-")){let e=r.pictureInPictureElement.shadowRoot;for(;null==e?void 0:e.pictureInPictureElement;){if(e.pictureInPictureElement===a)return!0;e=null==(i=e.pictureInPictureElement)?void 0:i.shadowRoot}}return!1},set(e,t){let{media:i}=t;if(i)if(e){if(!ia.pictureInPictureEnabled)return void console.warn("MediaChrome: Picture-in-picture is not enabled");if(!i.requestPictureInPicture)return void console.warn("MediaChrome: The current media does not support picture-in-picture");let e=()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")};i.requestPictureInPicture().catch(t=>{if(11===t.code){if(!i.src)return void console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");if(0===i.readyState&&"none"===i.preload){let t=()=>{i.removeEventListener("loadedmetadata",a),i.preload="none"},a=()=>{i.requestPictureInPicture().catch(e),t()};i.addEventListener("loadedmetadata",a),i.preload="metadata",setTimeout(()=>{0===i.readyState&&e(),t()},1e3)}else throw t}else throw t})}else ia.pictureInPictureElement&&ia.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(e){var t;let{media:i}=e;return[...null!=(t=null==i?void 0:i.videoRenditions)?t:[]].map(e=>({...e}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(e){var t,i,a;let{media:r}=e;return null==(a=null==(i=null==r?void 0:r.videoRenditions)?void 0:i[null==(t=r.videoRenditions)?void 0:t.selectedIndex])?void 0:a.id},set(e,t){let{media:i}=t;if(!(null==i?void 0:i.videoRenditions))return void console.warn("MediaController: Rendition selection not supported by this media.");let a=Array.prototype.findIndex.call(i.videoRenditions,t=>t.id==e);i.videoRenditions.selectedIndex!=a&&(i.videoRenditions.selectedIndex=a)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(e){var t;let{media:i}=e;return[...null!=(t=null==i?void 0:i.audioTracks)?t:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(e){var t,i;let{media:a}=e;return null==(i=[...null!=(t=null==a?void 0:a.audioTracks)?t:[]].find(e=>e.enabled))?void 0:i.id},set(e,t){let{media:i}=t;if(!(null==i?void 0:i.audioTracks))return void console.warn("MediaChrome: Audio track selection not supported by this media.");for(let t of i.audioTracks)t.enabled=e==t.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get:e=>(e=>{var t;let{media:i,documentElement:a,fullscreenElement:r=i}=e;if(!i||!a)return!1;let n=(e=>{let{documentElement:t,media:i}=e,a=null==t?void 0:t[iX];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===tq.FULLSCREEN?i:a})(e);if(!n)return!1;if(n===r||n===i)return!0;if(n.localName.includes("-")){let e=n.shadowRoot;if(!(iX in e))return im(n,r);for(;null==e?void 0:e[iX];){if(e[iX]===r)return!0;e=null==(t=e[iX])?void 0:t.shadowRoot}}return!1})(e),set(e,t,i){var a;e?((e=>{var t;let{media:i,fullscreenElement:a}=e;try{let e=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(e){let i=null==(t=a[e])?void 0:t.call(a);if(i instanceof Promise)return i.catch(()=>{})}else(null==i?void 0:i.webkitEnterFullscreen)?i.webkitEnterFullscreen():(null==i?void 0:i.requestFullscreen)&&i.requestFullscreen()}catch(e){console.error(e)}})(t),i.detail&&(null==(a=t.media)||a.focus())):(e=>{var t;let{documentElement:i}=e;if(iZ){let e=null==(t=null==i?void 0:i[iZ])?void 0:t.call(i);if(e instanceof Promise)return e.catch(()=>{})}})(t)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(e){var t;let{media:i}=e;return!!(null==i?void 0:i.remote)&&(null==(t=i.remote)?void 0:t.state)!=="disconnected"&&!!i.remote.state},set(e,t){var i,a;let{media:r}=t;if(r&&(!e||(null==(i=r.remote)?void 0:i.state)==="disconnected")&&(e||(null==(a=r.remote)?void 0:a.state)==="connected")){if("function"!=typeof r.remote.prompt)return void console.warn("MediaChrome: Casting is not supported in this environment");r.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get:()=>!1,set(e,t){let{media:i}=t;if(i){if(!(i.webkitShowPlaybackTargetPicker&&ii.WebKitPlaybackTargetAvailabilityEvent))return void console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(e){let{media:t}=e;if(!i8||!i7(t))return tK.UNSUPPORTED}},mediaPipUnavailable:{get(e){let{media:t}=e;return i9&&i4(t)?(null==t?void 0:t.disablePictureInPicture)?tK.UNAVAILABLE:void 0:tK.UNSUPPORTED}},mediaVolumeUnavailable:{get(e){let{media:t}=e;if(!1===r||(null==t?void 0:t.volume)==void 0)return tK.UNSUPPORTED},stateOwnersUpdateHandlers:[e=>{null==r&&as.then(t=>e(t?void 0:tK.UNSUPPORTED))}]},mediaCastUnavailable:{get(e,{availability:t="not-available"}={}){var i;let{media:a}=e;return ae&&(null==(i=null==a?void 0:a.remote)?void 0:i.state)?null!=t&&"available"!==t?tK.UNAVAILABLE:void 0:tK.UNSUPPORTED},stateOwnersUpdateHandlers:[(e,t)=>{var i;let{media:a}=t;if(a)return a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||null==(i=null==a?void 0:a.remote)||i.watchAvailability(t=>{e({availability:t?"available":"not-available"})}).catch(t=>{"NotSupportedError"===t.name?e({availability:null}):e({availability:"not-available"})}),()=>{var e;null==(e=null==a?void 0:a.remote)||e.cancelWatchAvailability().catch(()=>{})}}]},mediaAirplayUnavailable:{get:(e,t)=>i6?(null==t?void 0:t.availability)==="not-available"?tK.UNAVAILABLE:void 0:tK.UNSUPPORTED,mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(e,t)=>{var i;let{media:a}=t;if(a)return a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||null==(i=null==a?void 0:a.remote)||i.watchAvailability(t=>{e({availability:t?"available":"not-available"})}).catch(t=>{"NotSupportedError"===t.name?e({availability:null}):e({availability:"not-available"})}),()=>{var e;null==(e=null==a?void 0:a.remote)||e.cancelWatchAvailability().catch(()=>{})}}]},mediaRenditionUnavailable:{get(e){var t;let{media:i}=e;return(null==i?void 0:i.videoRenditions)?(null==(t=i.videoRenditions)?void 0:t.length)?void 0:tK.UNAVAILABLE:tK.UNSUPPORTED},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(e){var t,i;let{media:a}=e;return(null==a?void 0:a.audioTracks)?(null!=(i=null==(t=a.audioTracks)?void 0:t.length)?i:0)<=1?tK.UNAVAILABLE:void 0:tK.UNSUPPORTED},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaLang:{get(e){let{options:{mediaLang:t}={}}=e;return null!=t?t:"en"}}},ah={[tx.MEDIA_PREVIEW_REQUEST](e,t,{detail:i}){var a,r,n;let o,s,{media:l}=t,d=null!=i?i:void 0;if(l&&null!=d){let[e]=iz(l,{kind:t$.METADATA,label:"thumbnails"}),t=Array.prototype.find.call(null!=(a=null==e?void 0:e.cues)?a:[],(e,t,i)=>0===t?e.endTime>d:t===i.length-1?e.startTime<=d:e.startTime<=d&&e.endTime>d);if(t){let e=/'^(?:[a-z]+:)?\/\//i.test(t.text)||null==(r=null==l?void 0:l.querySelector('track[label="thumbnails"]'))?void 0:r.src,i=new URL(t.text,e);s=new URLSearchParams(i.hash).get("#xywh").split(",").map(e=>+e),o=i.href}}let u=e.mediaDuration.get(t),h=null==(n=e.mediaChaptersCues.get(t).find((e,t,i)=>t===i.length-1&&u===e.endTime?e.startTime<=d&&e.endTime>=d:e.startTime<=d&&e.endTime>d))?void 0:n.text;return null!=i&&null==h&&(h=""),{mediaPreviewTime:d,mediaPreviewImage:o,mediaPreviewCoords:s,mediaPreviewChapter:h}},[tx.MEDIA_PAUSE_REQUEST](e,t){e.mediaPaused.set(!0,t)},[tx.MEDIA_PLAY_REQUEST](e,t){var i,a,r,n;let o=e.mediaStreamType.get(t)===tj.LIVE,s=!(null==(i=t.options)?void 0:i.noAutoSeekToLive),l=e.mediaTargetLiveWindow.get(t)>0;if(o&&s&&!l){let i=null==(a=e.mediaSeekable.get(t))?void 0:a[1];if(i){let a=null!=(n=null==(r=t.options)?void 0:r.seekToLiveOffset)?n:0;e.mediaCurrentTime.set(i-a,t)}}e.mediaPaused.set(!1,t)},[tx.MEDIA_PLAYBACK_RATE_REQUEST](e,t,{detail:i}){e.mediaPlaybackRate.set(i,t)},[tx.MEDIA_MUTE_REQUEST](e,t){e.mediaMuted.set(!0,t)},[tx.MEDIA_UNMUTE_REQUEST](e,t){e.mediaVolume.get(t)||e.mediaVolume.set(.25,t),e.mediaMuted.set(!1,t)},[tx.MEDIA_LOOP_REQUEST](e,t,{detail:i}){let a=!!i;return e.mediaLoop.set(a,t),{mediaLoop:a}},[tx.MEDIA_VOLUME_REQUEST](e,t,{detail:i}){i&&e.mediaMuted.get(t)&&e.mediaMuted.set(!1,t),e.mediaVolume.set(i,t)},[tx.MEDIA_SEEK_REQUEST](e,t,{detail:i}){e.mediaCurrentTime.set(i,t)},[tx.MEDIA_SEEK_TO_LIVE_REQUEST](e,t){var i,a,r;let n=null==(i=e.mediaSeekable.get(t))?void 0:i[1];if(Number.isNaN(Number(n)))return;let o=null!=(r=null==(a=t.options)?void 0:a.seekToLiveOffset)?r:0;e.mediaCurrentTime.set(n-o,t)},[tx.MEDIA_SHOW_SUBTITLES_REQUEST](e,t,{detail:i}){var a;let{options:r}=t,n=at(t),o=iK(i),s=null==(a=o[0])?void 0:a.language;s&&!r.noSubtitlesLangPref&&ii.localStorage.setItem("media-chrome-pref-subtitles-lang",s),iY(tB.SHOWING,n,o)},[tx.MEDIA_DISABLE_SUBTITLES_REQUEST](e,t,{detail:i}){let a=at(t);iY(tB.DISABLED,a,null!=i?i:[])},[tx.MEDIA_TOGGLE_SUBTITLES_REQUEST](e,t,{detail:i}){aa(t,i)},[tx.MEDIA_RENDITION_REQUEST](e,t,{detail:i}){e.mediaRenditionSelected.set(i,t)},[tx.MEDIA_AUDIO_TRACK_REQUEST](e,t,{detail:i}){e.mediaAudioTrackEnabled.set(i,t)},[tx.MEDIA_ENTER_PIP_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsPip.set(!0,t)},[tx.MEDIA_EXIT_PIP_REQUEST](e,t){e.mediaIsPip.set(!1,t)},[tx.MEDIA_ENTER_FULLSCREEN_REQUEST](e,t,i){e.mediaIsPip.get(t)&&e.mediaIsPip.set(!1,t),e.mediaIsFullscreen.set(!0,t,i)},[tx.MEDIA_EXIT_FULLSCREEN_REQUEST](e,t){e.mediaIsFullscreen.set(!1,t)},[tx.MEDIA_ENTER_CAST_REQUEST](e,t){e.mediaIsFullscreen.get(t)&&e.mediaIsFullscreen.set(!1,t),e.mediaIsCasting.set(!0,t)},[tx.MEDIA_EXIT_CAST_REQUEST](e,t){e.mediaIsCasting.set(!1,t)},[tx.MEDIA_AIRPLAY_REQUEST](e,t){e.mediaIsAirplaying.set(!0,t)}};var ac=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},am=(e,t,i)=>(ac(e,t,"read from private field"),i?i.call(e):t.get(e)),ap=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},aE=(e,t,i,a)=>(ac(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),av=(e,t,i)=>(ac(e,t,"access private method"),i);let ag=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," ","f","m","k","c","l","j",">","<","p"],ab={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_DOWN_VOLUME_STEP:"keyboarddownvolumestep",KEYBOARD_UP_VOLUME_STEP:"keyboardupvolumestep",KEYS_USED:"keysused",LANG:"lang",LOOP:"loop",LIVE_EDGE_OFFSET:"liveedgeoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_DEFAULT_STORE:"nodefaultstore",NO_HOTKEYS:"nohotkeys",NO_MUTED_PREF:"nomutedpref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_VOLUME_PREF:"novolumepref",SEEK_TO_LIVE_OFFSET:"seektoliveoffset"};class af extends iU{constructor(){super(),ap(this,V),ap(this,$),ap(this,G),ap(this,j),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,ap(this,D,new i$(this,ab.HOTKEYS)),ap(this,O,void 0),ap(this,N,void 0),ap(this,x,null),ap(this,P,void 0),ap(this,U,void 0),ap(this,H,e=>{var t;null==(t=am(this,N))||t.dispatch(e)}),ap(this,W,void 0),this.associateElement(this);let e={};aE(this,P,t=>{Object.entries(t).forEach(([t,i])=>{if(t in e&&e[t]===i)return;this.propagateMediaState(t,i);let a=t.toLowerCase(),r=new ii.CustomEvent(tF[a],{composed:!0,detail:i});this.dispatchEvent(r)}),e=t}),this.hasAttribute(ab.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}static get observedAttributes(){return super.observedAttributes.concat(ab.NO_HOTKEYS,ab.HOTKEYS,ab.DEFAULT_STREAM_TYPE,ab.DEFAULT_SUBTITLES,ab.DEFAULT_DURATION,ab.NO_MUTED_PREF,ab.NO_VOLUME_PREF,ab.LANG,ab.LOOP)}get mediaStore(){return am(this,N)}set mediaStore(e){var t,i;if(am(this,N)&&(null==(t=am(this,U))||t.call(this),aE(this,U,void 0)),aE(this,N,e),!am(this,N)&&!this.hasAttribute(ab.NO_DEFAULT_STORE))return void av(this,V,F).call(this);aE(this,U,null==(i=am(this,N))?void 0:i.subscribe(am(this,P)))}get fullscreenElement(){var e;return null!=(e=am(this,O))?e:this}set fullscreenElement(e){var t;this.hasAttribute(ab.FULLSCREEN_ELEMENT)&&this.removeAttribute(ab.FULLSCREEN_ELEMENT),aE(this,O,e),null==(t=am(this,N))||t.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return iy(this,ab.DEFAULT_SUBTITLES)}set defaultSubtitles(e){i_(this,ab.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return iT(this,ab.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){iI(this,ab.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return ib(this,ab.DEFAULT_DURATION)}set defaultDuration(e){iA(this,ab.DEFAULT_DURATION,e)}get noHotkeys(){return iy(this,ab.NO_HOTKEYS)}set noHotkeys(e){i_(this,ab.NO_HOTKEYS,e)}get keysUsed(){return iT(this,ab.KEYS_USED)}set keysUsed(e){iI(this,ab.KEYS_USED,e)}get liveEdgeOffset(){return ib(this,ab.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){iA(this,ab.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return iy(this,ab.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){i_(this,ab.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return iy(this,ab.NO_VOLUME_PREF)}set noVolumePref(e){i_(this,ab.NO_VOLUME_PREF,e)}get noMutedPref(){return iy(this,ab.NO_MUTED_PREF)}set noMutedPref(e){i_(this,ab.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return iy(this,ab.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){i_(this,ab.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return iy(this,ab.NO_DEFAULT_STORE)}set noDefaultStore(e){i_(this,ab.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,t,i){var a,r,n,o,s,l,d,u,h,c,m,p;if(super.attributeChangedCallback(e,t,i),e===ab.NO_HOTKEYS)i!==t&&""===i?(this.hasAttribute(ab.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):i!==t&&null===i&&this.enableHotkeys();else if(e===ab.HOTKEYS)am(this,D).value=i;else if(e===ab.DEFAULT_SUBTITLES&&i!==t)null==(a=am(this,N))||a.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(ab.DEFAULT_SUBTITLES)}});else if(e===ab.DEFAULT_STREAM_TYPE)null==(n=am(this,N))||n.dispatch({type:"optionschangerequest",detail:{defaultStreamType:null!=(r=this.getAttribute(ab.DEFAULT_STREAM_TYPE))?r:void 0}});else if(e===ab.LIVE_EDGE_OFFSET)null==(o=am(this,N))||o.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(ab.LIVE_EDGE_OFFSET)?+this.getAttribute(ab.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(ab.SEEK_TO_LIVE_OFFSET)?void 0:+this.getAttribute(ab.LIVE_EDGE_OFFSET)}});else if(e===ab.SEEK_TO_LIVE_OFFSET)null==(s=am(this,N))||s.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(ab.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(ab.SEEK_TO_LIVE_OFFSET):void 0}});else if(e===ab.NO_AUTO_SEEK_TO_LIVE)null==(l=am(this,N))||l.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(ab.NO_AUTO_SEEK_TO_LIVE)}});else if(e===ab.FULLSCREEN_ELEMENT){let e=i?null==(d=this.getRootNode())?void 0:d.getElementById(i):void 0;aE(this,O,e),null==(u=am(this,N))||u.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===ab.LANG&&i!==t?(t2=i,null==(h=am(this,N))||h.dispatch({type:"optionschangerequest",detail:{mediaLang:i}})):e===ab.LOOP&&i!==t?null==(c=am(this,N))||c.dispatch({type:tx.MEDIA_LOOP_REQUEST,detail:null!=i}):e===ab.NO_VOLUME_PREF&&i!==t?null==(m=am(this,N))||m.dispatch({type:"optionschangerequest",detail:{noVolumePref:this.hasAttribute(ab.NO_VOLUME_PREF)}}):e===ab.NO_MUTED_PREF&&i!==t&&(null==(p=am(this,N))||p.dispatch({type:"optionschangerequest",detail:{noMutedPref:this.hasAttribute(ab.NO_MUTED_PREF)}}))}connectedCallback(){var e,t;am(this,N)||this.hasAttribute(ab.NO_DEFAULT_STORE)||av(this,V,F).call(this),null==(e=am(this,N))||e.dispatch({type:"documentelementchangerequest",detail:ia}),super.connectedCallback(),am(this,N)&&!am(this,U)&&aE(this,U,null==(t=am(this,N))?void 0:t.subscribe(am(this,P))),void 0!==am(this,W)&&am(this,N)&&this.media&&setTimeout(()=>{var e,t,i;(null==(t=null==(e=this.media)?void 0:e.textTracks)?void 0:t.length)&&(null==(i=am(this,N))||i.dispatch({type:tx.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:am(this,W)}))},0),this.hasAttribute(ab.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,t,i,a,r;if(null==(e=super.disconnectedCallback)||e.call(this),am(this,N)){let e=am(this,N).getState();aE(this,W,!!(null==(t=e.mediaSubtitlesShowing)?void 0:t.length)),null==(i=am(this,N))||i.dispatch({type:"documentelementchangerequest",detail:void 0}),null==(a=am(this,N))||a.dispatch({type:tx.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}am(this,U)&&(null==(r=am(this,U))||r.call(this),aE(this,U,void 0))}mediaSetCallback(e){var t;super.mediaSetCallback(e),null==(t=am(this,N))||t.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var t;super.mediaUnsetCallback(e),null==(t=am(this,N))||t.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,t){aL(this.mediaStateReceivers,e,t)}associateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;if(t.has(e))return;let i=aM(e,this.registerMediaStateReceiver.bind(this),this.unregisterMediaStateReceiver.bind(this));Object.values(tx).forEach(t=>{e.addEventListener(t,am(this,H))}),t.set(e,i)}unassociateElement(e){if(!e)return;let{associatedElementSubscriptions:t}=this;t.has(e)&&(t.get(e)(),t.delete(e),Object.values(tx).forEach(t=>{e.removeEventListener(t,am(this,H))}))}registerMediaStateReceiver(e){if(!e)return;let t=this.mediaStateReceivers;!(t.indexOf(e)>-1)&&(t.push(e),am(this,N)&&Object.entries(am(this,N).getState()).forEach(([t,i])=>{aL([e],t,i)}))}unregisterMediaStateReceiver(e){let t=this.mediaStateReceivers,i=t.indexOf(e);i<0||t.splice(i,1)}enableHotkeys(){this.addEventListener("keydown",av(this,G,K))}disableHotkeys(){this.removeEventListener("keydown",av(this,G,K)),this.removeEventListener("keyup",av(this,$,B))}get hotkeys(){return iT(this,ab.HOTKEYS)}set hotkeys(e){iI(this,ab.HOTKEYS,e)}keyboardShortcutHandler(e){var t,i,a,r,n,o,s,l,d;let u,h,c,m=e.target;if(!((null!=(a=null!=(i=null==(t=m.getAttribute(ab.KEYS_USED))?void 0:t.split(" "))?i:null==m?void 0:m.keysUsed)?a:[]).map(e=>"Space"===e?" ":e).filter(Boolean).includes(e.key)||am(this,D).contains(`no${e.key.toLowerCase()}`)||" "===e.key&&am(this,D).contains("nospace"))&&!(e.shiftKey&&("/"===e.key||"?"===e.key)&&am(this,D).contains("noshift+/")))switch(e.key){case" ":case"k":u=am(this,N).getState().mediaPaused?tx.MEDIA_PLAY_REQUEST:tx.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new ii.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"m":u="off"===this.mediaStore.getState().mediaVolumeLevel?tx.MEDIA_UNMUTE_REQUEST:tx.MEDIA_MUTE_REQUEST,this.dispatchEvent(new ii.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"f":u=this.mediaStore.getState().mediaIsFullscreen?tx.MEDIA_EXIT_FULLSCREEN_REQUEST:tx.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new ii.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new ii.CustomEvent(tx.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":case"j":{let e=this.hasAttribute(ab.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(ab.KEYBOARD_BACKWARD_SEEK_OFFSET):10;h=Math.max((null!=(r=this.mediaStore.getState().mediaCurrentTime)?r:0)-e,0),c=new ii.CustomEvent(tx.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:h}),this.dispatchEvent(c);break}case"ArrowRight":case"l":{let e=this.hasAttribute(ab.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(ab.KEYBOARD_FORWARD_SEEK_OFFSET):10;h=Math.max((null!=(n=this.mediaStore.getState().mediaCurrentTime)?n:0)+e,0),c=new ii.CustomEvent(tx.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:h}),this.dispatchEvent(c);break}case"ArrowUp":{let e=this.hasAttribute(ab.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(ab.KEYBOARD_UP_VOLUME_STEP):.025;h=Math.min((null!=(o=this.mediaStore.getState().mediaVolume)?o:1)+e,1),c=new ii.CustomEvent(tx.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:h}),this.dispatchEvent(c);break}case"ArrowDown":{let e=this.hasAttribute(ab.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(ab.KEYBOARD_DOWN_VOLUME_STEP):.025;h=Math.max((null!=(s=this.mediaStore.getState().mediaVolume)?s:1)-e,0),c=new ii.CustomEvent(tx.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:h}),this.dispatchEvent(c);break}case"<":h=Math.max((null!=(l=this.mediaStore.getState().mediaPlaybackRate)?l:1)-.25,.25).toFixed(2),c=new ii.CustomEvent(tx.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:h}),this.dispatchEvent(c);break;case">":h=Math.min((null!=(d=this.mediaStore.getState().mediaPlaybackRate)?d:1)+.25,2).toFixed(2),c=new ii.CustomEvent(tx.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:h}),this.dispatchEvent(c);break;case"/":case"?":e.shiftKey&&av(this,j,q).call(this);break;case"p":u=this.mediaStore.getState().mediaIsPip?tx.MEDIA_EXIT_PIP_REQUEST:tx.MEDIA_ENTER_PIP_REQUEST,c=new ii.CustomEvent(u,{composed:!0,bubbles:!0}),this.dispatchEvent(c)}}}D=new WeakMap,O=new WeakMap,N=new WeakMap,x=new WeakMap,P=new WeakMap,U=new WeakMap,H=new WeakMap,W=new WeakMap,V=new WeakSet,F=function(){var e;this.mediaStore=(({media:e,fullscreenElement:t,documentElement:i,stateMediator:a=au,requestMap:r=ah,options:n={},monitorStateOwnersOnlyWithSubscriptions:o=!0})=>{let s,l=[],d={options:{...n}},u=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0}),h=e=>{void 0!=e&&(ar(e,u)||(u=Object.freeze({...u,...e}),l.forEach(e=>e(u))))},c=()=>{h(Object.entries(a).reduce((e,[t,{get:i}])=>(e[t]=i(d),e),{}))},m={},p=async(e,t)=>{var i,r,n,u,p,E,v,g,b,f,A,y,_,T,I,w;let S=!!s;if(s={...d,...null!=s?s:{},...e},S)return;await al(...Object.values(e));let k=l.length>0&&0===t&&o,L=d.media!==s.media,M=(null==(i=d.media)?void 0:i.textTracks)!==(null==(r=s.media)?void 0:r.textTracks),R=(null==(n=d.media)?void 0:n.videoRenditions)!==(null==(u=s.media)?void 0:u.videoRenditions),C=(null==(p=d.media)?void 0:p.audioTracks)!==(null==(E=s.media)?void 0:E.audioTracks),D=(null==(v=d.media)?void 0:v.remote)!==(null==(g=s.media)?void 0:g.remote),O=d.documentElement!==s.documentElement,N=!!d.media&&(L||k),x=!!(null==(b=d.media)?void 0:b.textTracks)&&(M||k),P=!!(null==(f=d.media)?void 0:f.videoRenditions)&&(R||k),U=!!(null==(A=d.media)?void 0:A.audioTracks)&&(C||k),H=!!(null==(y=d.media)?void 0:y.remote)&&(D||k),W=!!d.documentElement&&(O||k),V=N||x||P||U||H||W,F=0===l.length&&1===t&&o,$=!!s.media&&(L||F),B=!!(null==(_=s.media)?void 0:_.textTracks)&&(M||F),G=!!(null==(T=s.media)?void 0:T.videoRenditions)&&(R||F),K=!!(null==(I=s.media)?void 0:I.audioTracks)&&(C||F),j=!!(null==(w=s.media)?void 0:w.remote)&&(D||F),q=!!s.documentElement&&(O||F),Q=$||B||G||K||j||q;if(!(V||Q)){Object.entries(s).forEach(([e,t])=>{d[e]=t}),c(),s=void 0;return}Object.entries(a).forEach(([e,{get:t,mediaEvents:i=[],textTracksEvents:a=[],videoRenditionsEvents:r=[],audioTracksEvents:n=[],remoteEvents:o=[],rootEvents:l=[],stateOwnersUpdateHandlers:u=[]}])=>{let c;m[e]||(m[e]={});let p=i=>{h({[e]:t(d,i)})};c=m[e].mediaEvents,i.forEach(t=>{c&&N&&(d.media.removeEventListener(t,c),m[e].mediaEvents=void 0),$&&(s.media.addEventListener(t,p),m[e].mediaEvents=p)}),c=m[e].textTracksEvents,a.forEach(t=>{var i,a;c&&x&&(null==(i=d.media.textTracks)||i.removeEventListener(t,c),m[e].textTracksEvents=void 0),B&&(null==(a=s.media.textTracks)||a.addEventListener(t,p),m[e].textTracksEvents=p)}),c=m[e].videoRenditionsEvents,r.forEach(t=>{var i,a;c&&P&&(null==(i=d.media.videoRenditions)||i.removeEventListener(t,c),m[e].videoRenditionsEvents=void 0),G&&(null==(a=s.media.videoRenditions)||a.addEventListener(t,p),m[e].videoRenditionsEvents=p)}),c=m[e].audioTracksEvents,n.forEach(t=>{var i,a;c&&U&&(null==(i=d.media.audioTracks)||i.removeEventListener(t,c),m[e].audioTracksEvents=void 0),K&&(null==(a=s.media.audioTracks)||a.addEventListener(t,p),m[e].audioTracksEvents=p)}),c=m[e].remoteEvents,o.forEach(t=>{var i,a;c&&H&&(null==(i=d.media.remote)||i.removeEventListener(t,c),m[e].remoteEvents=void 0),j&&(null==(a=s.media.remote)||a.addEventListener(t,p),m[e].remoteEvents=p)}),c=m[e].rootEvents,l.forEach(t=>{c&&W&&(d.documentElement.removeEventListener(t,c),m[e].rootEvents=void 0),q&&(s.documentElement.addEventListener(t,p),m[e].rootEvents=p)});let E=m[e].stateOwnersUpdateHandlers;if(E&&V&&(Array.isArray(E)?E:[E]).forEach(e=>{"function"==typeof e&&e()}),Q){let t=u.map(e=>e(p,s)).filter(e=>"function"==typeof e);m[e].stateOwnersUpdateHandlers=1===t.length?t[0]:t}else V&&(m[e].stateOwnersUpdateHandlers=void 0)}),Object.entries(s).forEach(([e,t])=>{d[e]=t}),c(),s=void 0};return p({media:e,fullscreenElement:t,documentElement:i,options:n}),{dispatch(e){let{type:t,detail:i}=e;if(r[t]&&null==u.mediaErrorCode)return void h(r[t](a,d,e));"mediaelementchangerequest"===t?p({media:i}):"fullscreenelementchangerequest"===t?p({fullscreenElement:i}):"documentelementchangerequest"===t?p({documentElement:i}):"optionschangerequest"===t&&(Object.entries(null!=i?i:{}).forEach(([e,t])=>{d.options[e]=t}),c())},getState:()=>u,subscribe:e=>(p({},l.length+1),l.push(e),e(u),()=>{let t=l.indexOf(e);t>=0&&(p({},l.length-1),l.splice(t,1))})}})({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(ab.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(ab.DEFAULT_DURATION)?+this.getAttribute(ab.DEFAULT_DURATION):void 0,defaultStreamType:null!=(e=this.getAttribute(ab.DEFAULT_STREAM_TYPE))?e:void 0,liveEdgeOffset:this.hasAttribute(ab.LIVE_EDGE_OFFSET)?+this.getAttribute(ab.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(ab.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(ab.SEEK_TO_LIVE_OFFSET):this.hasAttribute(ab.LIVE_EDGE_OFFSET)?+this.getAttribute(ab.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(ab.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(ab.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(ab.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(ab.NO_SUBTITLES_LANG_PREF)}})},$=new WeakSet,B=function(e){let{key:t,shiftKey:i}=e;if(!(i&&("/"===t||"?"===t)||ag.includes(t)))return void this.removeEventListener("keyup",av(this,$,B));this.keyboardShortcutHandler(e)},G=new WeakSet,K=function(e){var t;let{metaKey:i,altKey:a,key:r,shiftKey:n}=e,o=n&&("/"===r||"?"===r);if(o&&(null==(t=am(this,x))?void 0:t.open)||i||a||!o&&!ag.includes(r))return void this.removeEventListener("keyup",av(this,$,B));let s=e.target,l=s instanceof HTMLElement&&("media-volume-range"===s.tagName.toLowerCase()||"media-time-range"===s.tagName.toLowerCase());![" ","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(r)||am(this,D).contains(`no${r.toLowerCase()}`)||" "===r&&am(this,D).contains("nospace")||l||e.preventDefault(),this.addEventListener("keyup",av(this,$,B),{once:!0})},j=new WeakSet,q=function(){am(this,x)||(aE(this,x,ia.createElement("media-keyboard-shortcuts-dialog")),this.appendChild(am(this,x))),am(this,x).open=!0};let aA=Object.values(tW),ay=Object.values(tU),a_=e=>{var t,i,a,r;let{observedAttributes:n}=e.constructor;!n&&(null==(t=e.nodeName)?void 0:t.includes("-"))&&(ii.customElements.upgrade(e),{observedAttributes:n}=e.constructor);let o=null==(r=null==(a=null==(i=null==e?void 0:e.getAttribute)?void 0:i.call(e,tP.MEDIA_CHROME_ATTRIBUTES))?void 0:a.split)?void 0:r.call(a,/\s+/);return Array.isArray(n||o)?(n||o).filter(e=>aA.includes(e)):[]},aT=e=>(e=>{var t,i;return(null==(t=e.nodeName)?void 0:t.includes("-"))&&ii.customElements.get(null==(i=e.nodeName)?void 0:i.toLowerCase())&&!(e instanceof ii.customElements.get(e.nodeName.toLowerCase()))&&ii.customElements.upgrade(e),ay.some(t=>t in e)})(e)||!!a_(e).length,aI=e=>{var t;return null==(t=null==e?void 0:e.join)?void 0:t.call(e,":")},aw={[tW.MEDIA_SUBTITLES_LIST]:iq,[tW.MEDIA_SUBTITLES_SHOWING]:iq,[tW.MEDIA_SEEKABLE]:aI,[tW.MEDIA_BUFFERED]:e=>null==e?void 0:e.map(aI).join(" "),[tW.MEDIA_PREVIEW_COORDS]:e=>null==e?void 0:e.join(" "),[tW.MEDIA_RENDITION_LIST]:function(e){return null==e?void 0:e.map(tQ).join(" ")},[tW.MEDIA_AUDIO_TRACK_LIST]:function(e){return null==e?void 0:e.map(tY).join(" ")}},aS=async(e,t,i)=>{var a,r;if(e.isConnected||await tZ(0),"boolean"==typeof i||null==i)return i_(e,t,i);if("number"==typeof i)return iA(e,t,i);if("string"==typeof i)return iI(e,t,i);if(Array.isArray(i)&&!i.length)return e.removeAttribute(t);let n=null!=(r=null==(a=aw[t])?void 0:a.call(aw,i))?r:i;return e.setAttribute(t,n)},ak=(e,t)=>{if((e=>{var t;return!!(null==(t=e.closest)?void 0:t.call(e,'*[slot="media"]'))})(e))return;let i=(e,t)=>{var i,a;aT(e)&&t(e);let{children:r=[]}=null!=e?e:{};[...r,...null!=(a=null==(i=null==e?void 0:e.shadowRoot)?void 0:i.children)?a:[]].forEach(e=>ak(e,t))},a=null==e?void 0:e.nodeName.toLowerCase();if(a.includes("-")&&!aT(e))return void ii.customElements.whenDefined(a).then(()=>{i(e,t)});i(e,t)},aL=(e,t,i)=>{e.forEach(e=>{if(t in e){e[t]=i;return}let a=a_(e),r=t.toLowerCase();a.includes(r)&&aS(e,r,i)})},aM=(e,t,i)=>{ak(e,t);let a=e=>{var i;t(null!=(i=null==e?void 0:e.composedPath()[0])?i:e.target)},r=e=>{var t;i(null!=(t=null==e?void 0:e.composedPath()[0])?t:e.target)};e.addEventListener(tx.REGISTER_MEDIA_STATE_RECEIVER,a),e.addEventListener(tx.UNREGISTER_MEDIA_STATE_RECEIVER,r);let n=[],o=e=>{let a=e.target;"media"!==a.name&&(n.forEach(e=>ak(e,i)),(n=[...a.assignedElements({flatten:!0})]).forEach(e=>ak(e,t)))};e.addEventListener("slotchange",o);let s=new MutationObserver(e=>{e.forEach(e=>{let{addedNodes:a=[],removedNodes:r=[],type:n,target:o,attributeName:s}=e;"childList"===n?(Array.prototype.forEach.call(a,e=>ak(e,t)),Array.prototype.forEach.call(r,e=>ak(e,i))):"attributes"===n&&s===tP.MEDIA_CHROME_ATTRIBUTES&&(aT(o)?t(o):i(o))})});return s.observe(e,{childList:!0,attributes:!0,subtree:!0}),()=>{ak(e,i),e.removeEventListener("slotchange",o),s.disconnect(),e.removeEventListener(tx.REGISTER_MEDIA_STATE_RECEIVER,a),e.removeEventListener(tx.UNREGISTER_MEDIA_STATE_RECEIVER,r)}};ii.customElements.get("media-controller")||ii.customElements.define("media-controller",af);let aR={PLACEMENT:"placement",BOUNDS:"bounds"};class aC extends ii.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!iE(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;let t=this.placement;if("left"===t||"right"===t)return void this.style.removeProperty("--media-tooltip-offset-x");let i=getComputedStyle(this),a=null!=(e=ip(this,"#"+this.bounds))?e:function(e){var t;return null!=(t=function(e){var t;let{MEDIA_CONTROLLER:i}=tP,a=e.getAttribute(i);if(a)return null==(t=function(e){var t;let i=null==(t=null==e?void 0:e.getRootNode)?void 0:t.call(e);return i instanceof ShadowRoot||i instanceof Document?i:null}(e))?void 0:t.getElementById(a)}(e))?t:ip(e,"media-controller")}(this);if(!a)return;let{x:r,width:n}=a.getBoundingClientRect(),{x:o,width:s}=this.getBoundingClientRect(),l=i.getPropertyValue("--media-tooltip-offset-x"),d=l?parseFloat(l.replace("px","")):0,u=i.getPropertyValue("--media-tooltip-container-margin"),h=u?parseFloat(u.replace("px","")):0,c=o-r+d-h,m=o+s-(r+n)+d+h;return c<0?void this.style.setProperty("--media-tooltip-offset-x",`${c}px`):m>0?void this.style.setProperty("--media-tooltip-offset-x",`${m}px`):void this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=iu(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){let e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[aR.PLACEMENT,aR.BOUNDS]}get placement(){return iT(this,aR.PLACEMENT)}set placement(e){iI(this,aR.PLACEMENT,e)}get bounds(){return iT(this,aR.BOUNDS)}set bounds(e){iI(this,aR.BOUNDS,e)}}aC.shadowRootOptions={mode:"open"},aC.getTemplateHTML=function(e){return`
    <style>
      :host {
        --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
        --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
        --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
        --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
        --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
        position: relative;
        pointer-events: none;
        display: var(--media-tooltip-display, inline-flex);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: var(--media-tooltip-z-index, 1);
        background: var(--_tooltip-background);
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        font: var(--media-font,
          var(--media-font-weight, 400)
          var(--media-font-size, 13px) /
          var(--media-text-content-height, var(--media-control-height, 18px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        padding: var(--media-tooltip-padding, .35em .7em);
        border: var(--media-tooltip-border, none);
        border-radius: var(--media-tooltip-border-radius, 5px);
        filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
        white-space: var(--media-tooltip-white-space, nowrap);
      }

      :host([hidden]) {
        display: none;
      }

      img, svg {
        display: inline-block;
      }

      #arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        display: var(--media-tooltip-arrow-display, block);
      }

      :host(:not([placement])),
      :host([placement="top"]) {
        position: absolute;
        bottom: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host(:not([placement])) #arrow,
      :host([placement="top"]) #arrow {
        top: 100%;
        left: 50%;
        border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
        border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="right"]) {
        position: absolute;
        left: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="right"]) #arrow {
        top: 50%;
        right: 100%;
        border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
        border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
        transform: translate(0, -50%);
      }

      :host([placement="bottom"]) {
        position: absolute;
        top: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host([placement="bottom"]) #arrow {
        bottom: 100%;
        left: 50%;
        border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
        border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="left"]) {
        position: absolute;
        right: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="left"]) #arrow {
        top: 50%;
        left: 100%;
        border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
        border-color: transparent transparent transparent var(--_tooltip-arrow-background);
        transform: translate(0, -50%);
      }
      
      :host([placement="none"]) #arrow {
        display: none;
      }
    </style>
    <slot></slot>
    <div id="arrow"></div>
  `},ii.customElements.get("media-tooltip")||ii.customElements.define("media-tooltip",aC);var aD=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},aO=(e,t,i)=>(aD(e,t,"read from private field"),i?i.call(e):t.get(e)),aN=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},ax=(e,t,i,a)=>(aD(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);let aP={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};class aU extends ii.HTMLElement{constructor(){if(super(),aN(this,J),aN(this,Q,void 0),this.preventClick=!1,this.tooltipEl=null,aN(this,Y,e=>{this.preventClick||this.handleClick(e),setTimeout(aO(this,z),0)}),aN(this,z,()=>{var e,t;null==(t=null==(e=this.tooltipEl)?void 0:e.updateXOffset)||t.call(e)}),aN(this,Z,e=>{let{key:t}=e;if(!this.keysUsed.includes(t))return void this.removeEventListener("keyup",aO(this,Z));this.preventClick||this.handleClick(e)}),aN(this,X,e=>{let{metaKey:t,altKey:i,key:a}=e;if(t||i||!this.keysUsed.includes(a))return void this.removeEventListener("keyup",aO(this,Z));this.addEventListener("keyup",aO(this,Z),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=iu(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",aP.TOOLTIP_PLACEMENT,tP.MEDIA_CONTROLLER,tW.MEDIA_LANG]}enable(){this.addEventListener("click",aO(this,Y)),this.addEventListener("keydown",aO(this,X)),this.tabIndex=0}disable(){this.removeEventListener("click",aO(this,Y)),this.removeEventListener("keydown",aO(this,X)),this.removeEventListener("keyup",aO(this,Z)),this.tabIndex=-1}attributeChangedCallback(e,t,i){var a,r,n,o,s;e===tP.MEDIA_CONTROLLER?(t&&(null==(r=null==(a=aO(this,Q))?void 0:a.unassociateElement)||r.call(a,this),ax(this,Q,null)),i&&this.isConnected&&(ax(this,Q,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(s=null==(o=aO(this,Q))?void 0:o.associateElement)||s.call(o,this))):"disabled"===e&&i!==t?null==i?this.enable():this.disable():e===aP.TOOLTIP_PLACEMENT&&this.tooltipEl&&i!==t?this.tooltipEl.placement=i:e===tW.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),aO(this,z).call(this)}connectedCallback(){var e,t,i;let{style:a}=iv(this.shadowRoot,":host");a.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");let r=this.getAttribute(tP.MEDIA_CONTROLLER);r&&(ax(this,Q,null==(e=this.getRootNode())?void 0:e.getElementById(r)),null==(i=null==(t=aO(this,Q))?void 0:t.associateElement)||i.call(t,this)),ii.customElements.whenDefined("media-tooltip").then(()=>{var e,t;return(e=J,t=ee,aD(this,e,"access private method"),t).call(this)})}disconnectedCallback(){var e,t;this.disable(),null==(t=null==(e=aO(this,Q))?void 0:e.unassociateElement)||t.call(e,this),ax(this,Q,null),this.removeEventListener("mouseenter",aO(this,z)),this.removeEventListener("focus",aO(this,z)),this.removeEventListener("click",aO(this,Y))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return iT(this,aP.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){iI(this,aP.TOOLTIP_PLACEMENT,e)}get mediaController(){return iT(this,tP.MEDIA_CONTROLLER)}set mediaController(e){iI(this,tP.MEDIA_CONTROLLER,e)}get disabled(){return iy(this,aP.DISABLED)}set disabled(e){i_(this,aP.DISABLED,e)}get noTooltip(){return iy(this,aP.NO_TOOLTIP)}set noTooltip(e){i_(this,aP.NO_TOOLTIP,e)}handleClick(e){}}Q=new WeakMap,Y=new WeakMap,z=new WeakMap,Z=new WeakMap,X=new WeakMap,J=new WeakSet,ee=function(){this.addEventListener("mouseenter",aO(this,z)),this.addEventListener("focus",aO(this,z)),this.addEventListener("click",aO(this,Y));let e=this.tooltipPlacement;e&&this.tooltipEl&&(this.tooltipEl.placement=e)},aU.shadowRootOptions={mode:"open"},aU.getTemplateHTML=function(e,t={}){return`
    <style>
      :host {
        position: relative;
        font: var(--media-font,
          var(--media-font-weight, bold)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        padding: var(--media-button-padding, var(--media-control-padding, 10px));
        justify-content: var(--media-button-justify-content, center);
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        transition: background .15s linear;
        pointer-events: auto;
        cursor: var(--media-cursor, pointer);
        -webkit-tap-highlight-color: transparent;
      }

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }
      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgba(50 50 70 / .7));
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-button-icon-width);
        height: var(--media-button-icon-height, var(--media-control-height, 24px));
        transform: var(--media-button-icon-transform);
        transition: var(--media-button-icon-transition);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
      }

      media-tooltip {
        
        max-width: 0;
        overflow-x: clip;
        opacity: 0;
        transition: opacity .3s, max-width 0s 9s;
      }

      :host(:hover) media-tooltip,
      :host(:focus-visible) media-tooltip {
        max-width: 100vw;
        opacity: 1;
        transition: opacity .3s;
      }

      :host([notooltip]) slot[name="tooltip"] {
        display: none;
      }
    </style>

    ${this.getSlotTemplateHTML(e,t)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${aC.shadowRootOptions.mode}">
          ${aC.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(e)}
        </slot>
      </media-tooltip>
    </slot>
  `},aU.getSlotTemplateHTML=function(e,t){return`
    <slot></slot>
  `},aU.getTooltipContentHTML=function(){return""},ii.customElements.get("media-chrome-button")||ii.customElements.define("media-chrome-button",aU);let aH=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`,aW=e=>{let t=e.mediaIsAirplaying?t5("stop airplay"):t5("start airplay");e.setAttribute("aria-label",t)};class aV extends aU{static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_IS_AIRPLAYING,tW.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),aW(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===tW.MEDIA_IS_AIRPLAYING&&aW(this)}get mediaIsAirplaying(){return iy(this,tW.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){i_(this,tW.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return iT(this,tW.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){iI(this,tW.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){let e=new ii.CustomEvent(tx.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}}aV.getSlotTemplateHTML=function(e){return`
    <style>
      :host([${tW.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${tW.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${tW.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${tW.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${aH}</slot>
      <slot name="exit">${aH}</slot>
    </slot>
  `},aV.getTooltipContentHTML=function(){return`
    <slot name="tooltip-enter">${t5("start airplay")}</slot>
    <slot name="tooltip-exit">${t5("stop airplay")}</slot>
  `},ii.customElements.get("media-airplay-button")||ii.customElements.define("media-airplay-button",aV);let aF=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,a$=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`,aB=e=>{e.setAttribute("aria-checked",(e=>{var t;return!!(null==(t=e.mediaSubtitlesShowing)?void 0:t.length)||e.hasAttribute(tW.MEDIA_SUBTITLES_SHOWING)})(e).toString())};class aG extends aU{static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_SUBTITLES_LIST,tW.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("role","switch"),this.setAttribute("aria-label",t5("closed captions")),aB(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===tW.MEDIA_SUBTITLES_SHOWING&&aB(this)}get mediaSubtitlesList(){return aK(this,tW.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){aj(this,tW.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return aK(this,tW.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){aj(this,tW.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new ii.CustomEvent(tx.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}}aG.getSlotTemplateHTML=function(e){return`
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-checked="true"]) slot[name=tooltip-enable],
      :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${aF}</slot>
      <slot name="off">${a$}</slot>
    </slot>
  `},aG.getTooltipContentHTML=function(){return`
    <slot name="tooltip-enable">${t5("Enable captions")}</slot>
    <slot name="tooltip-disable">${t5("Disable captions")}</slot>
  `};let aK=(e,t)=>{let i=e.getAttribute(t);return i?iG(i):[]},aj=(e,t,i)=>{if(!(null==i?void 0:i.length))return void e.removeAttribute(t);let a=iq(i);e.getAttribute(t)!==a&&e.setAttribute(t,a)};ii.customElements.get("media-captions-button")||ii.customElements.define("media-captions-button",aG);let aq=e=>{let t=e.mediaIsCasting?t5("stop casting"):t5("start casting");e.setAttribute("aria-label",t)};class aQ extends aU{static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_IS_CASTING,tW.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),aq(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===tW.MEDIA_IS_CASTING&&aq(this)}get mediaIsCasting(){return iy(this,tW.MEDIA_IS_CASTING)}set mediaIsCasting(e){i_(this,tW.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return iT(this,tW.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){iI(this,tW.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){let e=this.mediaIsCasting?tx.MEDIA_EXIT_CAST_REQUEST:tx.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new ii.CustomEvent(e,{composed:!0,bubbles:!0}))}}aQ.getSlotTemplateHTML=function(e){return`
    <style>
      :host([${tW.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${tW.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${tW.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${tW.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter"><svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg></slot>
      <slot name="exit"><svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg></slot>
    </slot>
  `},aQ.getTooltipContentHTML=function(){return`
    <slot name="tooltip-enter">${t5("Start casting")}</slot>
    <slot name="tooltip-exit">${t5("Stop casting")}</slot>
  `},ii.customElements.get("media-cast-button")||ii.customElements.define("media-cast-button",aQ);var aY=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},az=(e,t,i)=>(aY(e,t,"read from private field"),i?i.call(e):t.get(e)),aZ=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},aX=(e,t,i,a)=>(aY(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),aJ=(e,t,i)=>(aY(e,t,"access private method"),i);let a0={OPEN:"open",ANCHOR:"anchor"};class a1 extends ii.HTMLElement{constructor(){super(),aZ(this,er),aZ(this,eo),aZ(this,el),aZ(this,eu),aZ(this,ec),aZ(this,ep),aZ(this,et,!1),aZ(this,ei,null),aZ(this,ea,null),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}static get observedAttributes(){return[a0.OPEN,a0.ANCHOR]}get open(){return iy(this,a0.OPEN)}set open(e){i_(this,a0.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":aJ(this,eu,eh).call(this,e);break;case"focusout":aJ(this,ec,em).call(this,e);break;case"keydown":aJ(this,ep,eE).call(this,e)}}connectedCallback(){aJ(this,er,en).call(this),this.role||(this.role="dialog")}attributeChangedCallback(e,t,i){aJ(this,er,en).call(this),e===a0.OPEN&&i!==t&&(this.open?aJ(this,eo,es).call(this):aJ(this,el,ed).call(this))}focus(){aX(this,ei,function e(t=document){var i;let a=null==t?void 0:t.activeElement;return a?null!=(i=e(a.shadowRoot))?i:a:null}());let e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),t=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||t)return;let i=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');null==i||i.focus()}get keysUsed(){return["Escape","Tab"]}}et=new WeakMap,ei=new WeakMap,ea=new WeakMap,er=new WeakSet,en=function(){if(!az(this,et)&&(aX(this,et,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);let e=iu(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e),queueMicrotask(()=>{let{style:e}=iv(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}},eo=new WeakSet,es=function(){var e;null==(e=az(this,ea))||e.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})},el=new WeakSet,ed=function(){var e;null==(e=az(this,ea))||e.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))},eu=new WeakSet,eh=function(e){aX(this,ea,e.relatedTarget),im(this,e.relatedTarget)||(this.open=!this.open)},ec=new WeakSet,em=function(e){var t;!im(this,e.relatedTarget)&&(null==(t=az(this,ei))||t.focus(),az(this,ea)&&az(this,ea)!==e.relatedTarget&&this.open&&(this.open=!1))},ep=new WeakSet,eE=function(e){var t,i,a,r,n;let{key:o,ctrlKey:s,altKey:l,metaKey:d}=e;s||l||d||this.keysUsed.includes(o)&&(e.preventDefault(),e.stopPropagation(),"Tab"===o?(e.shiftKey?null==(i=null==(t=this.previousElementSibling)?void 0:t.focus)||i.call(t):null==(r=null==(a=this.nextElementSibling)?void 0:a.focus)||r.call(a),this.blur()):"Escape"===o&&(null==(n=az(this,ei))||n.focus(),this.open=!1))},a1.shadowRootOptions={mode:"open"},a1.getTemplateHTML=function(e){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        display: var(--media-dialog-display, inline-flex);
        justify-content: center;
        align-items: center;
        
        transition-behavior: allow-discrete;
        visibility: hidden;
        opacity: 0;
        transform: translateY(2px) scale(.99);
        pointer-events: none;
      }

      :host([open]) {
        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      #content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: min(320px, 100%);
        word-wrap: break-word;
        max-height: 100%;
        overflow: auto;
        text-align: center;
        line-height: 1.4;
      }
    </style>
    ${this.getSlotTemplateHTML(e)}
  `},a1.getSlotTemplateHTML=function(e){return`
    <slot id="content"></slot>
  `},ii.customElements.get("media-chrome-dialog")||ii.customElements.define("media-chrome-dialog",a1);var a2=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},a5=(e,t,i)=>(a2(e,t,"read from private field"),i?i.call(e):t.get(e)),a3=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},a4=(e,t,i,a)=>(a2(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),a7=(e,t,i)=>(a2(e,t,"access private method"),i);class a8 extends ii.HTMLElement{constructor(){if(super(),a3(this,ew),a3(this,ek),a3(this,eM),a3(this,eC),a3(this,eO),a3(this,ex),a3(this,eU),a3(this,eW),a3(this,ev,void 0),a3(this,eg,void 0),a3(this,eb,void 0),a3(this,ef,void 0),a3(this,eA,{}),a3(this,ey,[]),a3(this,e_,()=>{if(this.range.matches(":focus-visible")){let{style:e}=iv(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),a3(this,eT,()=>{let{style:e}=iv(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),a3(this,eI,()=>{let e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=iu(this.attributes),t=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(t):this.shadowRoot.innerHTML=t}this.container=this.shadowRoot.querySelector("#container"),a4(this,eb,this.shadowRoot.querySelector("#startpoint")),a4(this,ef,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",tP.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,i){var a,r,n,o,s;e===tP.MEDIA_CONTROLLER?(t&&(null==(r=null==(a=a5(this,ev))?void 0:a.unassociateElement)||r.call(a,this),a4(this,ev,null)),i&&this.isConnected&&(a4(this,ev,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(s=null==(o=a5(this,ev))?void 0:o.associateElement)||s.call(o,this))):("disabled"===e||"aria-disabled"===e&&t!==i)&&(null==i?(this.range.removeAttribute(e),a7(this,ek,eL).call(this)):(this.range.setAttribute(e,i),a7(this,eM,eR).call(this)))}connectedCallback(){var e,t,i;let{style:a}=iv(this.shadowRoot,":host");a.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),a5(this,eA).pointer=iv(this.shadowRoot,"#pointer"),a5(this,eA).progress=iv(this.shadowRoot,"#progress"),a5(this,eA).thumb=iv(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),a5(this,eA).activeSegment=iv(this.shadowRoot,"#segments-clipping rect:nth-child(0)");let r=this.getAttribute(tP.MEDIA_CONTROLLER);r&&(a4(this,ev,null==(e=this.getRootNode())?void 0:e.getElementById(r)),null==(i=null==(t=a5(this,ev))?void 0:t.associateElement)||i.call(t,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",a5(this,e_)),this.shadowRoot.addEventListener("focusout",a5(this,eT)),a7(this,ek,eL).call(this),il(this.container,a5(this,eI))}disconnectedCallback(){var e,t;a7(this,eM,eR).call(this),null==(t=null==(e=a5(this,ev))?void 0:e.unassociateElement)||t.call(e,this),a4(this,ev,null),this.shadowRoot.removeEventListener("focusin",a5(this,e_)),this.shadowRoot.removeEventListener("focusout",a5(this,eT)),id(this.container,a5(this,eI))}updatePointerBar(e){var t;null==(t=a5(this,eA).pointer)||t.style.setProperty("width",`${100*this.getPointerRatio(e)}%`)}updateBar(){var e,t;let i=100*this.range.valueAsNumber;null==(e=a5(this,eA).progress)||e.style.setProperty("width",`${i}%`),null==(t=a5(this,eA).thumb)||t.style.setProperty("left",`${i}%`)}updateSegments(e){let t=this.shadowRoot.querySelector("#segments-clipping");if(t.textContent="",this.container.classList.toggle("segments",!!(null==e?void 0:e.length)),!(null==e?void 0:e.length))return;let i=[...new Set([+this.range.min,...e.flatMap(e=>[e.start,e.end]),+this.range.max])];a4(this,ey,[...i]);let a=i.pop();for(let[e,r]of i.entries()){let[n,o]=[0===e,e===i.length-1],s=n?"calc(var(--segments-gap) / -1)":`${100*r}%`,l=o?a:i[e+1],d=`calc(${(l-r)*100}%${n||o?"":" - var(--segments-gap)"})`,u=ia.createElementNS("http://www.w3.org/2000/svg","rect"),h=ig(this.shadowRoot,`#segments-clipping rect:nth-child(${e+1})`);h.style.setProperty("x",s),h.style.setProperty("width",d),t.append(u)}}getPointerRatio(e){return function(e,t,i,a){let r=a.x-i.x,n=a.y-i.y,o=r*r+n*n;return 0===o?0:Math.max(0,Math.min(1,((e-i.x)*r+(t-i.y)*n)/o))}(e.clientX,e.clientY,a5(this,eb).getBoundingClientRect(),a5(this,ef).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":a7(this,eW,eV).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":a7(this,eO,eN).call(this,e);break;case"pointerdown":a7(this,eC,eD).call(this,e);break;case"pointerup":a7(this,ex,eP).call(this);break;case"pointerleave":a7(this,eU,eH).call(this)}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}}ev=new WeakMap,eg=new WeakMap,eb=new WeakMap,ef=new WeakMap,eA=new WeakMap,ey=new WeakMap,e_=new WeakMap,eT=new WeakMap,eI=new WeakMap,ew=new WeakSet,eS=function(e){let t=a5(this,eA).activeSegment;if(!t)return;let i=this.getPointerRatio(e),a=a5(this,ey).findIndex((e,t,a)=>{let r=a[t+1];return null!=r&&i>=e&&i<=r}),r=`#segments-clipping rect:nth-child(${a+1})`;t.selectorText==r&&t.style.transform||(t.selectorText=r,t.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))},ek=new WeakSet,eL=function(){this.hasAttribute("disabled")||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))},eM=new WeakSet,eR=function(){var e,t;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),null==(e=ii.window)||e.removeEventListener("pointerup",this),null==(t=ii.window)||t.removeEventListener("pointermove",this)},eC=new WeakSet,eD=function(e){var t;a4(this,eg,e.composedPath().includes(this.range)),null==(t=ii.window)||t.addEventListener("pointerup",this)},eO=new WeakSet,eN=function(e){var t;"mouse"!==e.pointerType&&a7(this,eC,eD).call(this,e),this.addEventListener("pointerleave",this),null==(t=ii.window)||t.addEventListener("pointermove",this)},ex=new WeakSet,eP=function(){var e;null==(e=ii.window)||e.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")},eU=new WeakSet,eH=function(){var e,t;this.removeEventListener("pointerleave",this),null==(e=ii.window)||e.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),null==(t=a5(this,eA).activeSegment)||t.style.removeProperty("transform")},eW=new WeakSet,eV=function(e){("pen"!==e.pointerType||0!==e.buttons)&&(this.toggleAttribute("dragging",1===e.buttons||"mouse"!==e.pointerType),this.updatePointerBar(e),a7(this,ew,eS).call(this,e),this.dragging&&("mouse"!==e.pointerType||!a5(this,eg))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(e),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))))},a8.shadowRootOptions={mode:"open"},a8.getTemplateHTML=function(e){return`
    <style>
      :host {
        --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

        box-shadow: var(--_focus-visible-box-shadow, none);
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
        display: inline-flex;
        align-items: center;
        
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
        width: 100px;
        transition: background .15s linear;
        cursor: var(--media-cursor, pointer);
        pointer-events: auto;
        touch-action: none; 
      }

      
      input[type=range]:focus {
        outline: 0;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgb(50 50 70 / .7));
      }

      #leftgap {
        padding-left: var(--media-range-padding-left, var(--_media-range-padding));
      }

      #rightgap {
        padding-right: var(--media-range-padding-right, var(--_media-range-padding));
      }

      #startpoint,
      #endpoint {
        position: absolute;
      }

      #endpoint {
        right: 0;
      }

      #container {
        
        width: var(--media-range-track-width, 100%);
        transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 40px;
      }

      #range {
        
        display: var(--media-time-range-hover-display, block);
        bottom: var(--media-time-range-hover-bottom, -7px);
        height: var(--media-time-range-hover-height, max(100% + 7px, 25px));
        width: 100%;
        position: absolute;
        cursor: var(--media-cursor, pointer);

        -webkit-appearance: none; 
        -webkit-tap-highlight-color: transparent;
        background: transparent; 
        margin: 0;
        z-index: 1;
      }

      @media (hover: hover) {
        #range {
          bottom: var(--media-time-range-hover-bottom, -5px);
          height: var(--media-time-range-hover-height, max(100% + 5px, 20px));
        }
      }

      
      
      #range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: transparent;
        width: .1px;
        height: .1px;
      }

      
      #range::-moz-range-thumb {
        background: transparent;
        border: transparent;
        width: .1px;
        height: .1px;
      }

      #appearance {
        height: var(--media-range-track-height, 4px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: absolute;
        
        will-change: transform;
      }

      #track {
        background: var(--media-range-track-background, rgb(255 255 255 / .2));
        border-radius: var(--media-range-track-border-radius, 1px);
        border: var(--media-range-track-border, none);
        outline: var(--media-range-track-outline);
        outline-offset: var(--media-range-track-outline-offset);
        backdrop-filter: var(--media-range-track-backdrop-filter);
        -webkit-backdrop-filter: var(--media-range-track-backdrop-filter);
        box-shadow: var(--media-range-track-box-shadow, none);
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #progress,
      #pointer {
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #progress {
        background: var(--media-range-bar-color, var(--media-primary-color, rgb(238 238 238)));
        transition: var(--media-range-track-transition);
      }

      #pointer {
        background: var(--media-range-track-pointer-background);
        border-right: var(--media-range-track-pointer-border-right);
        transition: visibility .25s, opacity .25s;
        visibility: hidden;
        opacity: 0;
      }

      @media (hover: hover) {
        :host(:hover) #pointer {
          transition: visibility .5s, opacity .5s;
          visibility: visible;
          opacity: 1;
        }
      }

      #thumb,
      ::slotted([slot=thumb]) {
        width: var(--media-range-thumb-width, 10px);
        height: var(--media-range-thumb-height, 10px);
        transition: var(--media-range-thumb-transition);
        transform: var(--media-range-thumb-transform, none);
        opacity: var(--media-range-thumb-opacity, 1);
        translate: -50%;
        position: absolute;
        left: 0;
        cursor: var(--media-cursor, pointer);
      }

      #thumb {
        border-radius: var(--media-range-thumb-border-radius, 10px);
        background: var(--media-range-thumb-background, var(--media-primary-color, rgb(238 238 238)));
        box-shadow: var(--media-range-thumb-box-shadow, 1px 1px 1px transparent);
        border: var(--media-range-thumb-border, none);
      }

      :host([disabled]) #thumb {
        background-color: #777;
      }

      .segments #appearance {
        height: var(--media-range-segment-hover-height, 7px);
      }

      #track {
        clip-path: url(#segments-clipping);
      }

      #segments {
        --segments-gap: var(--media-range-segments-gap, 2px);
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #segments-clipping {
        transform: translateX(calc(var(--segments-gap) / 2));
      }

      #segments-clipping:empty {
        display: none;
      }

      #segments-clipping rect {
        height: var(--media-range-track-height, 4px);
        y: calc((var(--media-range-segment-hover-height, 7px) - var(--media-range-track-height, 4px)) / 2);
        transition: var(--media-range-segment-transition, transform .1s ease-in-out);
        transform: var(--media-range-segment-transform, scaleY(1));
        transform-origin: center;
      }
    </style>
    <div id="leftgap"></div>
    <div id="container">
      <div id="startpoint"></div>
      <div id="endpoint"></div>
      <div id="appearance">
        <div id="track" part="track">
          <div id="pointer"></div>
          <div id="progress" part="progress"></div>
        </div>
        <slot name="thumb">
          <div id="thumb" part="thumb"></div>
        </slot>
        <svg id="segments"><clipPath id="segments-clipping"></clipPath></svg>
      </div>
      <input id="range" type="range" min="0" max="1" step="any" value="0">

      ${this.getContainerTemplateHTML(e)}
    </div>
    <div id="rightgap"></div>
  `},a8.getContainerTemplateHTML=function(e){return""},ii.customElements.get("media-chrome-range")||ii.customElements.define("media-chrome-range",a8);var a9=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},a6=(e,t,i)=>(a9(e,t,"read from private field"),i?i.call(e):t.get(e)),re=(e,t,i,a)=>(a9(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);class rt extends ii.HTMLElement{constructor(){if(super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,eF,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=iu(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[tP.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,i){var a,r,n,o,s;e===tP.MEDIA_CONTROLLER&&(t&&(null==(r=null==(a=a6(this,eF))?void 0:a.unassociateElement)||r.call(a,this),re(this,eF,null)),i&&this.isConnected&&(re(this,eF,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(s=null==(o=a6(this,eF))?void 0:o.associateElement)||s.call(o,this)))}connectedCallback(){var e,t,i;let a=this.getAttribute(tP.MEDIA_CONTROLLER);a&&(re(this,eF,null==(e=this.getRootNode())?void 0:e.getElementById(a)),null==(i=null==(t=a6(this,eF))?void 0:t.associateElement)||i.call(t,this))}disconnectedCallback(){var e,t;null==(t=null==(e=a6(this,eF))?void 0:e.unassociateElement)||t.call(e,this),re(this,eF,null)}}eF=new WeakMap,rt.shadowRootOptions={mode:"open"},rt.getTemplateHTML=function(e){return`
    <style>
      :host {
        
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-control-bar-display, inline-flex));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --media-loading-indicator-icon-height: 44px;
      }

      ::slotted(media-time-range),
      ::slotted(media-volume-range) {
        min-height: 100%;
      }

      ::slotted(media-time-range),
      ::slotted(media-clip-selector) {
        flex-grow: 1;
      }

      ::slotted([role="menu"]) {
        position: absolute;
      }
    </style>

    <slot></slot>
  `},ii.customElements.get("media-control-bar")||ii.customElements.define("media-control-bar",rt);var ri=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},ra=(e,t,i)=>(ri(e,t,"read from private field"),i?i.call(e):t.get(e)),rr=(e,t,i,a)=>(ri(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);class rn extends ii.HTMLElement{constructor(){if(super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,e$,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=iu(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[tP.MEDIA_CONTROLLER]}attributeChangedCallback(e,t,i){var a,r,n,o,s;e===tP.MEDIA_CONTROLLER&&(t&&(null==(r=null==(a=ra(this,e$))?void 0:a.unassociateElement)||r.call(a,this),rr(this,e$,null)),i&&this.isConnected&&(rr(this,e$,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(s=null==(o=ra(this,e$))?void 0:o.associateElement)||s.call(o,this)))}connectedCallback(){var e,t,i;let{style:a}=iv(this.shadowRoot,":host");a.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);let r=this.getAttribute(tP.MEDIA_CONTROLLER);r&&(rr(this,e$,null==(e=this.getRootNode())?void 0:e.getElementById(r)),null==(i=null==(t=ra(this,e$))?void 0:t.associateElement)||i.call(t,this))}disconnectedCallback(){var e,t;null==(t=null==(e=ra(this,e$))?void 0:e.unassociateElement)||t.call(e,this),rr(this,e$,null)}}e$=new WeakMap,rn.shadowRootOptions={mode:"open"},rn.getTemplateHTML=function(e,t={}){return`
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-text-background, var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7))));
        padding: var(--media-control-padding, 10px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        pointer-events: auto;
      }

      
      :host(:focus-visible) {
        box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);
        outline: 0;
      }

      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(e,t)}
  `},rn.getSlotTemplateHTML=function(e,t){return`
    <slot></slot>
  `},ii.customElements.get("media-text-display")||ii.customElements.define("media-text-display",rn);var ro=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},rs=(e,t,i)=>(ro(e,t,"read from private field"),i?i.call(e):t.get(e));class rl extends rn{constructor(){var e;super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,eB,void 0),((e,t,i,a)=>(ro(e,t,"write to private field"),a?a.call(e,i):t.set(e,i)))(this,eB,this.shadowRoot.querySelector("slot")),rs(this,eB).textContent=t0(null!=(e=this.mediaDuration)?e:0)}static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_DURATION]}attributeChangedCallback(e,t,i){e===tW.MEDIA_DURATION&&(rs(this,eB).textContent=t0(+i)),super.attributeChangedCallback(e,t,i)}get mediaDuration(){return ib(this,tW.MEDIA_DURATION)}set mediaDuration(e){iA(this,tW.MEDIA_DURATION,e)}}eB=new WeakMap,rl.getSlotTemplateHTML=function(e,t){return`
    <slot>${t0(t.mediaDuration)}</slot>
  `},ii.customElements.get("media-duration-display")||ii.customElements.define("media-duration-display",rl);let rd={2:t5("Network Error"),3:t5("Decode Error"),4:t5("Source Not Supported"),5:t5("Encryption Error")},ru={2:t5("A network error caused the media download to fail."),3:t5("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:t5("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:t5("The media is encrypted and there are no keys to decrypt it.")},rh=e=>{var t,i;return 1===e.code?null:{title:null!=(t=rd[e.code])?t:`Error ${e.code}`,message:null!=(i=ru[e.code])?i:e.message}};var rc=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)};function rm(e){var t;let{title:i,message:a}=null!=(t=rh(e))?t:{},r="";return i&&(r+=`<slot name="error-${e.code}-title"><h3>${i}</h3></slot>`),a&&(r+=`<slot name="error-${e.code}-message"><p>${a}</p></slot>`),r}let rp=[tW.MEDIA_ERROR_CODE,tW.MEDIA_ERROR_MESSAGE];class rE extends a1{constructor(){super(...arguments),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,eG,null)}static get observedAttributes(){return[...super.observedAttributes,...rp]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,t,i){var a;if(super.attributeChangedCallback(e,t,i),!rp.includes(e))return;let r=null!=(a=this.mediaError)?a:{code:this.mediaErrorCode,message:this.mediaErrorMessage};this.open=r.code&&null!==rh(r),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(r))}get mediaError(){var e,t;return rc(this,e=eG,"read from private field"),t?t.call(this):e.get(this)}set mediaError(e){var t,i;rc(this,t=eG,"write to private field"),i?i.call(this,e):t.set(this,e)}get mediaErrorCode(){return ib(this,"mediaerrorcode")}set mediaErrorCode(e){iA(this,"mediaerrorcode",e)}get mediaErrorMessage(){return iT(this,"mediaerrormessage")}set mediaErrorMessage(e){iI(this,"mediaerrormessage",e)}}eG=new WeakMap,rE.getSlotTemplateHTML=function(e){return`
    <style>
      :host {
        background: rgb(20 20 30 / .8);
      }

      #content {
        display: block;
        padding: 1.2em 1.5em;
      }

      h3,
      p {
        margin-block: 0 .3em;
      }
    </style>
    <slot name="error-${e.mediaerrorcode}" id="content">
      ${rm({code:+e.mediaerrorcode,message:e.mediaerrormessage})}
    </slot>
  `},rE.formatErrorMessage=rm,ii.customElements.get("media-error-dialog")||ii.customElements.define("media-error-dialog",rE);var rv=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot read from private field");return i?i.call(e):t.get(e)},rg=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)};class rb extends a1{constructor(){super(...arguments),rg(this,eK,e=>{var t;if(!this.open)return;let i=null==(t=this.shadowRoot)?void 0:t.querySelector("#content");if(!i)return;let a=e.composedPath(),r=a[0]===this||a.includes(this),n=a.includes(i);r&&!n&&(this.open=!1)}),rg(this,ej,e=>{if(!this.open)return;let t=e.shiftKey&&("/"===e.key||"?"===e.key);"Escape"!==e.key&&!t||e.ctrlKey||e.altKey||e.metaKey||(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener("click",rv(this,eK)),document.addEventListener("keydown",rv(this,ej)))}disconnectedCallback(){this.removeEventListener("click",rv(this,eK)),document.removeEventListener("keydown",rv(this,ej))}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),"open"===e&&(this.open?(this.addEventListener("click",rv(this,eK)),document.addEventListener("keydown",rv(this,ej))):(this.removeEventListener("click",rv(this,eK)),document.removeEventListener("keydown",rv(this,ej))))}}eK=new WeakMap,ej=new WeakMap,rb.getSlotTemplateHTML=function(e){return`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        background: rgb(20 20 30 / .8);
        backdrop-filter: blur(10px);
      }

      #content {
        display: block;
        width: clamp(400px, 40vw, 700px);
        max-width: 90vw;
        text-align: left;
      }

      h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
      }

      .shortcuts-table {
        width: 100%;
        border-collapse: collapse;
      }

      .shortcuts-table tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .shortcuts-table tr:last-child {
        border-bottom: none;
      }

      .shortcuts-table td {
        padding: 0.75rem 0.5rem;
      }

      .shortcuts-table td:first-child {
        text-align: right;
        padding-right: 1rem;
        width: 40%;
        min-width: 120px;
      }

      .shortcuts-table td:last-child {
        padding-left: 1rem;
      }

      .key {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        font-weight: 500;
        min-width: 1.5rem;
        text-align: center;
        margin: 0 0.2rem;
      }

      .description {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.95rem;
      }

      .key-combo {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.3rem;
      }

      .key-separator {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
      }
    </style>
    <slot id="content">
      ${function(){let e=[{keys:["Space","k"],description:"Toggle Playback"},{keys:["m"],description:"Toggle mute"},{keys:["f"],description:"Toggle fullscreen"},{keys:["c"],description:"Toggle captions or subtitles, if available"},{keys:["p"],description:"Toggle Picture in Picture"},{keys:["←","j"],description:"Seek back 10s"},{keys:["→","l"],description:"Seek forward 10s"},{keys:["↑"],description:"Turn volume up"},{keys:["↓"],description:"Turn volume down"},{keys:["< (SHIFT+,)"],description:"Decrease playback rate"},{keys:["> (SHIFT+.)"],description:"Increase playback rate"}].map(({keys:e,description:t})=>{let i=e.map((e,t)=>t>0?`<span class="key-separator">or</span><span class="key">${e}</span>`:`<span class="key">${e}</span>`).join("");return`
      <tr>
        <td>
          <div class="key-combo">${i}</div>
        </td>
        <td class="description">${t}</td>
      </tr>
    `}).join("");return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${e}</table>
  `}()}
    </slot>
  `},ii.customElements.get("media-keyboard-shortcuts-dialog")||ii.customElements.define("media-keyboard-shortcuts-dialog",rb);var rf=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)};let rA=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,ry=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`,r_=e=>{let t=e.mediaIsFullscreen?t5("exit fullscreen mode"):t5("enter fullscreen mode");e.setAttribute("aria-label",t)};class rT extends aU{constructor(){super(...arguments),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,eq,null)}static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_IS_FULLSCREEN,tW.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),r_(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===tW.MEDIA_IS_FULLSCREEN&&r_(this)}get mediaFullscreenUnavailable(){return iT(this,tW.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){iI(this,tW.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return iy(this,tW.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){i_(this,tW.MEDIA_IS_FULLSCREEN,e)}handleClick(e){var t,i,a,r;rf(this,t=eq,"write to private field"),i?i.call(this,e):t.set(this,e);let n=(rf(this,a=eq,"read from private field"),(r?r.call(this):a.get(this))instanceof PointerEvent),o=this.mediaIsFullscreen?new ii.CustomEvent(tx.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new ii.CustomEvent(tx.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:n});this.dispatchEvent(o)}}eq=new WeakMap,rT.getSlotTemplateHTML=function(e){return`
    <style>
      :host([${tW.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${tW.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${tW.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${tW.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${rA}</slot>
      <slot name="exit">${ry}</slot>
    </slot>
  `},rT.getTooltipContentHTML=function(){return`
    <slot name="tooltip-enter">${t5("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${t5("Exit fullscreen mode")}</slot>
  `},ii.customElements.get("media-fullscreen-button")||ii.customElements.define("media-fullscreen-button",rT);let{MEDIA_TIME_IS_LIVE:rI,MEDIA_PAUSED:rw}=tW,{MEDIA_SEEK_TO_LIVE_REQUEST:rS,MEDIA_PLAY_REQUEST:rk}=tx,rL=e=>{var t;let i=e.mediaPaused||!e.mediaTimeIsLive,a=i?t5("seek to live"):t5("playing live");e.setAttribute("aria-label",a);let r=null==(t=e.shadowRoot)?void 0:t.querySelector('slot[name="text"]');r&&(r.textContent=t5("live")),i?e.removeAttribute("aria-disabled"):e.setAttribute("aria-disabled","true")};class rM extends aU{static get observedAttributes(){return[...super.observedAttributes,rI,rw]}connectedCallback(){super.connectedCallback(),rL(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),rL(this)}get mediaPaused(){return iy(this,tW.MEDIA_PAUSED)}set mediaPaused(e){i_(this,tW.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return iy(this,tW.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){i_(this,tW.MEDIA_TIME_IS_LIVE,e)}handleClick(){(this.mediaPaused||!this.mediaTimeIsLive)&&(this.dispatchEvent(new ii.CustomEvent(rS,{composed:!0,bubbles:!0})),this.hasAttribute(rw)&&this.dispatchEvent(new ii.CustomEvent(rk,{composed:!0,bubbles:!0})))}}rM.getSlotTemplateHTML=function(e){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${rI}]:not([${rw}])) slot[name=indicator] > *,
      :host([${rI}]:not([${rw}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${rI}]:not([${rw}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator"><svg viewBox="0 0 6 12"><circle cx="3" cy="6" r="2"></circle></svg></slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${t5("live")}</slot>
  `},ii.customElements.get("media-live-button")||ii.customElements.define("media-live-button",rM);var rR=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},rC=(e,t,i)=>(rR(e,t,"read from private field"),i?i.call(e):t.get(e)),rD=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},rO=(e,t,i,a)=>(rR(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);let rN={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},rx=`
<svg aria-hidden="true" viewBox="0 0 100 100">
  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
       attributeName="transform"
       attributeType="XML"
       type="rotate"
       dur="1s"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
  </path>
</svg>
`;class rP extends ii.HTMLElement{constructor(){if(super(),rD(this,eQ,void 0),rD(this,eY,500),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=iu(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[tP.MEDIA_CONTROLLER,tW.MEDIA_PAUSED,tW.MEDIA_LOADING,rN.LOADING_DELAY]}attributeChangedCallback(e,t,i){var a,r,n,o,s;e===rN.LOADING_DELAY&&t!==i?this.loadingDelay=Number(i):e===tP.MEDIA_CONTROLLER&&(t&&(null==(r=null==(a=rC(this,eQ))?void 0:a.unassociateElement)||r.call(a,this),rO(this,eQ,null)),i&&this.isConnected&&(rO(this,eQ,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(s=null==(o=rC(this,eQ))?void 0:o.associateElement)||s.call(o,this)))}connectedCallback(){var e,t,i;let a=this.getAttribute(tP.MEDIA_CONTROLLER);a&&(rO(this,eQ,null==(e=this.getRootNode())?void 0:e.getElementById(a)),null==(i=null==(t=rC(this,eQ))?void 0:t.associateElement)||i.call(t,this))}disconnectedCallback(){var e,t;null==(t=null==(e=rC(this,eQ))?void 0:e.unassociateElement)||t.call(e,this),rO(this,eQ,null)}get loadingDelay(){return rC(this,eY)}set loadingDelay(e){rO(this,eY,e);let{style:t}=iv(this.shadowRoot,":host");t.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return iy(this,tW.MEDIA_PAUSED)}set mediaPaused(e){i_(this,tW.MEDIA_PAUSED,e)}get mediaLoading(){return iy(this,tW.MEDIA_LOADING)}set mediaLoading(e){i_(this,tW.MEDIA_LOADING,e)}get mediaController(){return iT(this,tP.MEDIA_CONTROLLER)}set mediaController(e){iI(this,tP.MEDIA_CONTROLLER,e)}get noAutohide(){return iy(this,rN.NO_AUTOHIDE)}set noAutohide(e){i_(this,rN.NO_AUTOHIDE,e)}}eQ=new WeakMap,eY=new WeakMap,rP.shadowRootOptions={mode:"open"},rP.getTemplateHTML=function(e){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, 500ms);
      }

      #status {
        color: rgba(0,0,0,0);
        width: 0px;
        height: 0px;
      }

      :host slot[name=icon] > *,
      :host ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 0);
        transition: opacity 0.15s;
      }

      :host([${tW.MEDIA_LOADING}]:not([${tW.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${tW.MEDIA_LOADING}]:not([${tW.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${tW.MEDIA_LOADING}]:not([${tW.MEDIA_PAUSED}])) #status {
        visibility: var(--media-loading-indicator-opacity, visible);
        transition: visibility 0.15s var(--_loading-indicator-delay);
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-loading-indicator-icon-width);
        height: var(--media-loading-indicator-icon-height, 100px);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
      }
    </style>

    <slot name="icon">${rx}</slot>
    <div id="status" role="status" aria-live="polite">${t5("media loading")}</div>
  `},ii.customElements.get("media-loading-indicator")||ii.customElements.define("media-loading-indicator",rP);let rU=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,rH=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,rW=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`,rV=e=>{let t="off"===e.mediaVolumeLevel?t5("unmute"):t5("mute");e.setAttribute("aria-label",t)};class rF extends aU{static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),rV(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===tW.MEDIA_VOLUME_LEVEL&&rV(this)}get mediaVolumeLevel(){return iT(this,tW.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){iI(this,tW.MEDIA_VOLUME_LEVEL,e)}handleClick(){let e="off"===this.mediaVolumeLevel?tx.MEDIA_UNMUTE_REQUEST:tx.MEDIA_MUTE_REQUEST;this.dispatchEvent(new ii.CustomEvent(e,{composed:!0,bubbles:!0}))}}rF.getSlotTemplateHTML=function(e){return`
    <style>
      :host(:not([${tW.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${tW.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${tW.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${tW.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${tW.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${tW.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${tW.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${rU}</slot>
      <slot name="low">${rH}</slot>
      <slot name="medium">${rH}</slot>
      <slot name="high">${rW}</slot>
    </slot>
  `},rF.getTooltipContentHTML=function(){return`
    <slot name="tooltip-mute">${t5("Mute")}</slot>
    <slot name="tooltip-unmute">${t5("Unmute")}</slot>
  `},ii.customElements.get("media-mute-button")||ii.customElements.define("media-mute-button",rF);let r$=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`,rB=e=>{let t=e.mediaIsPip?t5("exit picture in picture mode"):t5("enter picture in picture mode");e.setAttribute("aria-label",t)};class rG extends aU{static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_IS_PIP,tW.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),rB(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===tW.MEDIA_IS_PIP&&rB(this)}get mediaPipUnavailable(){return iT(this,tW.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){iI(this,tW.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return iy(this,tW.MEDIA_IS_PIP)}set mediaIsPip(e){i_(this,tW.MEDIA_IS_PIP,e)}handleClick(){let e=this.mediaIsPip?tx.MEDIA_EXIT_PIP_REQUEST:tx.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new ii.CustomEvent(e,{composed:!0,bubbles:!0}))}}rG.getSlotTemplateHTML=function(e){return`
    <style>
      :host([${tW.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${tW.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${tW.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${tW.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${r$}</slot>
      <slot name="exit">${r$}</slot>
    </slot>
  `},rG.getTooltipContentHTML=function(){return`
    <slot name="tooltip-enter">${t5("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${t5("Exit picture in picture mode")}</slot>
  `},ii.customElements.get("media-pip-button")||ii.customElements.define("media-pip-button",rG);var rK=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot read from private field");return i?i.call(e):t.get(e)};let rj={RATES:"rates"},rq=[1,1.2,1.5,1.7,2];class rQ extends aU{constructor(){var e;super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,ez,new i$(this,rj.RATES,{defaultValue:rq})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${null!=(e=this.mediaPlaybackRate)?e:1}x`}static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_PLAYBACK_RATE,rj.RATES]}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),e===rj.RATES&&(rK(this,ez).value=i),e===tW.MEDIA_PLAYBACK_RATE){let e=i?+i:NaN,t=Number.isNaN(e)?1:e;this.container.innerHTML=`${t}x`,this.setAttribute("aria-label",t5("Playback rate {playbackRate}",{playbackRate:t}))}}get rates(){return rK(this,ez)}set rates(e){e?Array.isArray(e)?rK(this,ez).value=e.join(" "):"string"==typeof e&&(rK(this,ez).value=e):rK(this,ez).value=""}get mediaPlaybackRate(){return ib(this,tW.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){iA(this,tW.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,t;let i=Array.from(rK(this,ez).values(),e=>+e).sort((e,t)=>e-t),a=null!=(t=null!=(e=i.find(e=>e>this.mediaPlaybackRate))?e:i[0])?t:1,r=new ii.CustomEvent(tx.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:a});this.dispatchEvent(r)}}ez=new WeakMap,rQ.getSlotTemplateHTML=function(e){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${e.mediaplaybackrate||1}x</slot>
  `},rQ.getTooltipContentHTML=function(){return t5("Playback rate")},ii.customElements.get("media-playback-rate-button")||ii.customElements.define("media-playback-rate-button",rQ);let rY=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,rz=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`,rZ=e=>{let t=e.mediaPaused?t5("play"):t5("pause");e.setAttribute("aria-label",t)};class rX extends aU{static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_PAUSED,tW.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),rZ(this)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),(e===tW.MEDIA_PAUSED||e===tW.MEDIA_LANG)&&rZ(this)}get mediaPaused(){return iy(this,tW.MEDIA_PAUSED)}set mediaPaused(e){i_(this,tW.MEDIA_PAUSED,e)}handleClick(){let e=this.mediaPaused?tx.MEDIA_PLAY_REQUEST:tx.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new ii.CustomEvent(e,{composed:!0,bubbles:!0}))}}rX.getSlotTemplateHTML=function(e){return`
    <style>
      :host([${tW.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${tW.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${tW.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${tW.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${rY}</slot>
      <slot name="pause">${rz}</slot>
    </slot>
  `},rX.getTooltipContentHTML=function(){return`
    <slot name="tooltip-play">${t5("Play")}</slot>
    <slot name="tooltip-pause">${t5("Pause")}</slot>
  `},ii.customElements.get("media-play-button")||ii.customElements.define("media-play-button",rX);let rJ={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"};class r0 extends ii.HTMLElement{static get observedAttributes(){return[rJ.PLACEHOLDER_SRC,rJ.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=iu(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,t,i){if(e===rJ.SRC&&(null==i?this.image.removeAttribute(rJ.SRC):this.image.setAttribute(rJ.SRC,i)),e===rJ.PLACEHOLDER_SRC)if(null==i)this.image.style.removeProperty("background-image");else{var a;a=this.image,a.style["background-image"]=`url('${i}')`}}get placeholderSrc(){return iT(this,rJ.PLACEHOLDER_SRC)}set placeholderSrc(e){iI(this,rJ.SRC,e)}get src(){return iT(this,rJ.SRC)}set src(e){iI(this,rJ.SRC,e)}}r0.shadowRootOptions={mode:"open"},r0.getTemplateHTML=function(e){return`
    <style>
      :host {
        pointer-events: none;
        display: var(--media-poster-image-display, inline-block);
        box-sizing: border-box;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        background-repeat: no-repeat;
        background-position: var(--media-poster-image-background-position, var(--media-object-position, center));
        background-size: var(--media-poster-image-background-size, var(--media-object-fit, contain));
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, center);
      }
    </style>

    <img part="poster img" aria-hidden="true" id="image"/>
  `},ii.customElements.get("media-poster-image")||ii.customElements.define("media-poster-image",r0);var r1=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)};class r2 extends rn{constructor(){super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,eZ,void 0),((e,t,i,a)=>(r1(e,t,"write to private field"),a?a.call(e,i):t.set(e,i)))(this,eZ,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_PREVIEW_CHAPTER,tW.MEDIA_LANG]}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),(e===tW.MEDIA_PREVIEW_CHAPTER||e===tW.MEDIA_LANG)&&i!==t&&null!=i){var a,r;if((r1(this,a=eZ,"read from private field"),r?r.call(this):a.get(this)).textContent=i,""!==i){let e=t5("chapter: {chapterName}",{chapterName:i});this.setAttribute("aria-valuetext",e)}else this.removeAttribute("aria-valuetext")}}get mediaPreviewChapter(){return iT(this,tW.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){iI(this,tW.MEDIA_PREVIEW_CHAPTER,e)}}eZ=new WeakMap,ii.customElements.get("media-preview-chapter-display")||ii.customElements.define("media-preview-chapter-display",r2);var r5=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},r3=(e,t,i)=>(r5(e,t,"read from private field"),i?i.call(e):t.get(e)),r4=(e,t,i,a)=>(r5(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);class r7 extends ii.HTMLElement{constructor(){if(super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,eX,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);let e=iu(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[tP.MEDIA_CONTROLLER,tW.MEDIA_PREVIEW_IMAGE,tW.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,t,i;let a=this.getAttribute(tP.MEDIA_CONTROLLER);a&&(r4(this,eX,null==(e=this.getRootNode())?void 0:e.getElementById(a)),null==(i=null==(t=r3(this,eX))?void 0:t.associateElement)||i.call(t,this))}disconnectedCallback(){var e,t;null==(t=null==(e=r3(this,eX))?void 0:e.unassociateElement)||t.call(e,this),r4(this,eX,null)}attributeChangedCallback(e,t,i){var a,r,n,o,s;[tW.MEDIA_PREVIEW_IMAGE,tW.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===tP.MEDIA_CONTROLLER&&(t&&(null==(r=null==(a=r3(this,eX))?void 0:a.unassociateElement)||r.call(a,this),r4(this,eX,null)),i&&this.isConnected&&(r4(this,eX,null==(n=this.getRootNode())?void 0:n.getElementById(i)),null==(s=null==(o=r3(this,eX))?void 0:o.associateElement)||s.call(o,this)))}get mediaPreviewImage(){return iT(this,tW.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){iI(this,tW.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){let e=this.getAttribute(tW.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(e=>+e)}set mediaPreviewCoords(e){if(!e)return void this.removeAttribute(tW.MEDIA_PREVIEW_COORDS);this.setAttribute(tW.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){let e=this.mediaPreviewCoords,t=this.mediaPreviewImage;if(!(e&&t))return;let[i,a,r,n]=e,o=t.split("#")[0],{maxWidth:s,maxHeight:l,minWidth:d,minHeight:u}=getComputedStyle(this),h=Math.min(parseInt(s)/r,parseInt(l)/n),c=Math.max(parseInt(d)/r,parseInt(u)/n),m=h<1,p=m?h:c>1?c:1,{style:E}=iv(this.shadowRoot,":host"),v=iv(this.shadowRoot,"img").style,g=this.shadowRoot.querySelector("img"),b=m?"min":"max";E.setProperty(`${b}-width`,"initial","important"),E.setProperty(`${b}-height`,"initial","important"),E.width=`${r*p}px`,E.height=`${n*p}px`;let f=()=>{v.width=`${this.imgWidth*p}px`,v.height=`${this.imgHeight*p}px`,v.display="block"};g.src!==o&&(g.onload=()=>{this.imgWidth=g.naturalWidth,this.imgHeight=g.naturalHeight,f()},g.src=o,f()),f(),v.transform=`translate(-${i*p}px, -${a*p}px)`}}eX=new WeakMap,r7.shadowRootOptions={mode:"open"},r7.getTemplateHTML=function(e){return`
    <style>
      :host {
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-preview-thumbnail-display, inline-block));
        overflow: hidden;
      }

      img {
        display: none;
        position: relative;
      }
    </style>
    <img crossorigin loading="eager" decoding="async">
  `},ii.customElements.get("media-preview-thumbnail")||ii.customElements.define("media-preview-thumbnail",r7);var r8=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},r9=(e,t,i)=>(r8(e,t,"read from private field"),i?i.call(e):t.get(e));class r6 extends rn{constructor(){super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,eJ,void 0),((e,t,i,a)=>(r8(e,t,"write to private field"),a?a.call(e,i):t.set(e,i)))(this,eJ,this.shadowRoot.querySelector("slot")),r9(this,eJ).textContent=t0(0)}static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===tW.MEDIA_PREVIEW_TIME&&null!=i&&(r9(this,eJ).textContent=t0(parseFloat(i)))}get mediaPreviewTime(){return ib(this,tW.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){iA(this,tW.MEDIA_PREVIEW_TIME,e)}}eJ=new WeakMap,ii.customElements.get("media-preview-time-display")||ii.customElements.define("media-preview-time-display",r6);let ne={SEEK_OFFSET:"seekoffset"};class nt extends aU{static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_CURRENT_TIME,ne.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=ib(this,ne.SEEK_OFFSET,30)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ne.SEEK_OFFSET&&(this.seekOffset=ib(this,ne.SEEK_OFFSET,30))}get seekOffset(){return ib(this,ne.SEEK_OFFSET,30)}set seekOffset(e){iA(this,ne.SEEK_OFFSET,e),this.setAttribute("aria-label",t5("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),ih(ic(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return ib(this,tW.MEDIA_CURRENT_TIME,0)}set mediaCurrentTime(e){iA(this,tW.MEDIA_CURRENT_TIME,e)}handleClick(){let e=Math.max(this.mediaCurrentTime-this.seekOffset,0),t=new ii.CustomEvent(tx.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}}nt.getSlotTemplateHTML=function(e,t){let i;return`
    <slot name="icon">${i=t.seekOffset,`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${i}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`}</slot>
  `},nt.getTooltipContentHTML=function(){return t5("Seek backward")},ii.customElements.get("media-seek-backward-button")||ii.customElements.define("media-seek-backward-button",nt);let ni={SEEK_OFFSET:"seekoffset"};class na extends aU{static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_CURRENT_TIME,ni.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=ib(this,ni.SEEK_OFFSET,30)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===ni.SEEK_OFFSET&&(this.seekOffset=ib(this,ni.SEEK_OFFSET,30))}get seekOffset(){return ib(this,ni.SEEK_OFFSET,30)}set seekOffset(e){iA(this,ni.SEEK_OFFSET,e),this.setAttribute("aria-label",t5("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),ih(ic(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return ib(this,tW.MEDIA_CURRENT_TIME,0)}set mediaCurrentTime(e){iA(this,tW.MEDIA_CURRENT_TIME,e)}handleClick(){let e=this.mediaCurrentTime+this.seekOffset,t=new ii.CustomEvent(tx.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}}na.getSlotTemplateHTML=function(e,t){let i;return`
    <slot name="icon">${i=t.seekOffset,`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${i}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`}</slot>
  `},na.getTooltipContentHTML=function(){return t5("Seek forward")},ii.customElements.get("media-seek-forward-button")||ii.customElements.define("media-seek-forward-button",na);var nr=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},nn=(e,t,i)=>(nr(e,t,"read from private field"),i?i.call(e):t.get(e));let no={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},ns=[...Object.values(no),tW.MEDIA_CURRENT_TIME,tW.MEDIA_DURATION,tW.MEDIA_SEEKABLE],nl=["Enter"," "],nd="&nbsp;/&nbsp;",nu=(e,{timesSep:t=nd}={})=>{var i,a;let r=null!=(i=e.mediaCurrentTime)?i:0,[,n]=null!=(a=e.mediaSeekable)?a:[],o=0;Number.isFinite(e.mediaDuration)?o=e.mediaDuration:Number.isFinite(n)&&(o=n);let s=e.remaining?t0(0-(o-r)):t0(r);return e.showDuration?`${s}${t}${t0(o)}`:s};class nh extends rn{constructor(){super(),((e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)})(this,e0,void 0),((e,t,i,a)=>(nr(e,t,"write to private field"),a?a.call(e,i):t.set(e,i)))(this,e0,this.shadowRoot.querySelector("slot")),nn(this,e0).innerHTML=`${nu(this)}`}static get observedAttributes(){return[...super.observedAttributes,...ns,"disabled"]}connectedCallback(){let{style:e}=iv(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.hasAttribute("disabled")||this.enable(),this.setAttribute("role","progressbar"),this.setAttribute("aria-label",t5("playback time"));let t=e=>{let{key:i}=e;if(!nl.includes(i))return void this.removeEventListener("keyup",t);this.toggleTimeDisplay()};this.addEventListener("keydown",e=>{let{metaKey:i,altKey:a,key:r}=e;if(i||a||!nl.includes(r))return void this.removeEventListener("keyup",t);this.addEventListener("keyup",t)}),this.addEventListener("click",this.toggleTimeDisplay),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),super.disconnectedCallback()}attributeChangedCallback(e,t,i){ns.includes(e)?this.update():"disabled"===e&&i!==t&&(null==i?this.enable():this.disable()),super.attributeChangedCallback(e,t,i)}enable(){this.tabIndex=0}disable(){this.tabIndex=-1}get remaining(){return iy(this,no.REMAINING)}set remaining(e){i_(this,no.REMAINING,e)}get showDuration(){return iy(this,no.SHOW_DURATION)}set showDuration(e){i_(this,no.SHOW_DURATION,e)}get noToggle(){return iy(this,no.NO_TOGGLE)}set noToggle(e){i_(this,no.NO_TOGGLE,e)}get mediaDuration(){return ib(this,tW.MEDIA_DURATION)}set mediaDuration(e){iA(this,tW.MEDIA_DURATION,e)}get mediaCurrentTime(){return ib(this,tW.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){iA(this,tW.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){let e=this.getAttribute(tW.MEDIA_SEEKABLE);if(e)return e.split(":").map(e=>+e)}set mediaSeekable(e){if(null==e)return void this.removeAttribute(tW.MEDIA_SEEKABLE);this.setAttribute(tW.MEDIA_SEEKABLE,e.join(":"))}update(){let e=nu(this);(e=>{var t;let i=e.mediaCurrentTime,[,a]=null!=(t=e.mediaSeekable)?t:[],r=null;if(Number.isFinite(e.mediaDuration)?r=e.mediaDuration:Number.isFinite(a)&&(r=a),null==i||null===r)return e.setAttribute("aria-valuetext","video not loaded, unknown time.");let n=e.remaining?tJ(0-(r-i)):tJ(i);if(!e.showDuration)return e.setAttribute("aria-valuetext",n);let o=tJ(r),s=`${n} of ${o}`;e.setAttribute("aria-valuetext",s)})(this),e!==nn(this,e0).innerHTML&&(nn(this,e0).innerHTML=e)}}e0=new WeakMap,nh.getSlotTemplateHTML=function(e,t){return`
    <slot>${nu(t)}</slot>
  `},ii.customElements.get("media-time-display")||ii.customElements.define("media-time-display",nh);var nc=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},nm=(e,t,i)=>(nc(e,t,"read from private field"),i?i.call(e):t.get(e)),np=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},nE=(e,t,i,a)=>(nc(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i);class nv{constructor(e,t,i){np(this,e1,void 0),np(this,e2,void 0),np(this,e5,void 0),np(this,e3,void 0),np(this,e4,void 0),np(this,e7,void 0),np(this,e8,void 0),np(this,e9,void 0),np(this,e6,0),np(this,te,(e=performance.now())=>{nE(this,e6,requestAnimationFrame(nm(this,te))),nE(this,e3,performance.now()-nm(this,e5));let t=1e3/this.fps;if(nm(this,e3)>t){nE(this,e5,e-nm(this,e3)%t);let i=1e3/((e-nm(this,e2))/++((e,t,i,a)=>({set _(value){nE(e,t,value,i)},get _(){return nm(e,t,a)}}))(this,e4)._),a=(e-nm(this,e7))/1e3/this.duration,r=nm(this,e8)+a*this.playbackRate;r-nm(this,e1).valueAsNumber>0?nE(this,e9,this.playbackRate/this.duration/i):(nE(this,e9,.995*nm(this,e9)),r=nm(this,e1).valueAsNumber+nm(this,e9)),this.callback(r)}}),nE(this,e1,e),this.callback=t,this.fps=i}start(){0===nm(this,e6)&&(nE(this,e5,performance.now()),nE(this,e2,nm(this,e5)),nE(this,e4,0),nm(this,te).call(this))}stop(){0!==nm(this,e6)&&(cancelAnimationFrame(nm(this,e6)),nE(this,e6,0))}update({start:e,duration:t,playbackRate:i}){let a=e-nm(this,e1).valueAsNumber,r=Math.abs(t-this.duration);(a>0||a<-.03||r>=.5)&&this.callback(e),nE(this,e8,e),nE(this,e7,performance.now()),this.duration=t,this.playbackRate=i}}e1=new WeakMap,e2=new WeakMap,e5=new WeakMap,e3=new WeakMap,e4=new WeakMap,e7=new WeakMap,e8=new WeakMap,e9=new WeakMap,e6=new WeakMap,te=new WeakMap;var ng=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},nb=(e,t,i)=>(ng(e,t,"read from private field"),i?i.call(e):t.get(e)),nf=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},nA=(e,t,i,a)=>(ng(e,t,"write to private field"),a?a.call(e,i):t.set(e,i),i),ny=(e,t,i)=>(ng(e,t,"access private method"),i);let n_=(e,t=e.mediaCurrentTime)=>{let i=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,a=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;return Number.isNaN(a)?0:Math.max(0,Math.min((t-i)/(a-i),1))},nT=(e,t=e.range.valueAsNumber)=>{let i=Number.isFinite(e.mediaSeekableStart)?e.mediaSeekableStart:0,a=Number.isFinite(e.mediaDuration)?e.mediaDuration:e.mediaSeekableEnd;return Number.isNaN(a)?0:t*(a-i)+i};class nI extends a8{constructor(){super(),nf(this,th),nf(this,tm),nf(this,tv),nf(this,tb),nf(this,tA),nf(this,t_),nf(this,tI),nf(this,tS),nf(this,tt,void 0),nf(this,ti,void 0),nf(this,ta,void 0),nf(this,tr,void 0),nf(this,tn,void 0),nf(this,to,void 0),nf(this,ts,void 0),nf(this,tl,void 0),nf(this,td,void 0),nf(this,tu,void 0),nf(this,tE,e=>{!this.dragging&&(tz(e)&&(this.range.valueAsNumber=e),nb(this,tu)||this.updateBar())}),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),nA(this,ta,this.shadowRoot.querySelectorAll('[part~="box"]')),nA(this,tn,this.shadowRoot.querySelector('[part~="preview-box"]')),nA(this,to,this.shadowRoot.querySelector('[part~="current-box"]'));let e=getComputedStyle(this);nA(this,ts,parseInt(e.getPropertyValue("--media-box-padding-left"))),nA(this,tl,parseInt(e.getPropertyValue("--media-box-padding-right"))),nA(this,ti,new nv(this.range,nb(this,tE),60))}static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_PAUSED,tW.MEDIA_DURATION,tW.MEDIA_SEEKABLE,tW.MEDIA_CURRENT_TIME,tW.MEDIA_PREVIEW_IMAGE,tW.MEDIA_PREVIEW_TIME,tW.MEDIA_PREVIEW_CHAPTER,tW.MEDIA_BUFFERED,tW.MEDIA_PLAYBACK_RATE,tW.MEDIA_LOADING,tW.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",t5("seek")),ny(this,th,tc).call(this),nA(this,tt,this.getRootNode()),null==(e=nb(this,tt))||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),ny(this,th,tc).call(this),null==(e=nb(this,tt))||e.removeEventListener("transitionstart",this),nA(this,tt,null)}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),t!=i&&(e===tW.MEDIA_CURRENT_TIME||e===tW.MEDIA_PAUSED||e===tW.MEDIA_ENDED||e===tW.MEDIA_LOADING||e===tW.MEDIA_DURATION||e===tW.MEDIA_SEEKABLE?(nb(this,ti).update({start:n_(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),ny(this,th,tc).call(this),(e=>{let t=e.range,i=tJ(+nT(e)),a=tJ(+e.mediaSeekableEnd),r=i&&a?`${i} of ${a}`:"video not loaded, unknown time.";t.setAttribute("aria-valuetext",r)})(this)):e===tW.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===tW.MEDIA_DURATION||e===tW.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=nb(this,td),this.updateBar()))}get mediaChaptersCues(){return nb(this,td)}set mediaChaptersCues(e){var t;nA(this,td,e),this.updateSegments(null==(t=nb(this,td))?void 0:t.map(e=>({start:n_(this,e.startTime),end:n_(this,e.endTime)})))}get mediaPaused(){return iy(this,tW.MEDIA_PAUSED)}set mediaPaused(e){i_(this,tW.MEDIA_PAUSED,e)}get mediaLoading(){return iy(this,tW.MEDIA_LOADING)}set mediaLoading(e){i_(this,tW.MEDIA_LOADING,e)}get mediaDuration(){return ib(this,tW.MEDIA_DURATION)}set mediaDuration(e){iA(this,tW.MEDIA_DURATION,e)}get mediaCurrentTime(){return ib(this,tW.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){iA(this,tW.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return ib(this,tW.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){iA(this,tW.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){let e=this.getAttribute(tW.MEDIA_BUFFERED);return e?e.split(" ").map(e=>e.split(":").map(e=>+e)):[]}set mediaBuffered(e){if(!e)return void this.removeAttribute(tW.MEDIA_BUFFERED);let t=e.map(e=>e.join(":")).join(" ");this.setAttribute(tW.MEDIA_BUFFERED,t)}get mediaSeekable(){let e=this.getAttribute(tW.MEDIA_SEEKABLE);if(e)return e.split(":").map(e=>+e)}set mediaSeekable(e){if(null==e)return void this.removeAttribute(tW.MEDIA_SEEKABLE);this.setAttribute(tW.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;let[,t=this.mediaDuration]=null!=(e=this.mediaSeekable)?e:[];return t}get mediaSeekableStart(){var e;let[t=0]=null!=(e=this.mediaSeekable)?e:[];return t}get mediaPreviewImage(){return iT(this,tW.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){iI(this,tW.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return ib(this,tW.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){iA(this,tW.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return iy(this,tW.MEDIA_ENDED)}set mediaEnded(e){i_(this,tW.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;let t,i=this.mediaBuffered;if(!i.length)return;if(this.mediaEnded)t=1;else{let a=this.mediaCurrentTime,[,r=this.mediaSeekableStart]=null!=(e=i.find(([e,t])=>e<=a&&a<=t))?e:[];t=n_(this,r)}let{style:a}=iv(this.shadowRoot,"#buffered");a.setProperty("width",`${100*t}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;let e=iv(this.shadowRoot,"#current-rail"),t=iv(this.shadowRoot,'[part~="current-box"]'),i=ny(this,tv,tg).call(this,nb(this,to)),a=ny(this,tb,tf).call(this,i,this.range.valueAsNumber),r=ny(this,tA,ty).call(this,i,this.range.valueAsNumber);e.style.transform=`translateX(${a})`,e.style.setProperty("--_range-width",`${i.range.width}`),t.style.setProperty("--_box-shift",`${r}`),t.style.setProperty("--_box-width",`${i.box.width}px`),t.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":ny(this,tS,tk).call(this);break;case"pointermove":ny(this,t_,tT).call(this,e);break;case"pointerup":nb(this,tu)&&nA(this,tu,!1);break;case"pointerdown":nA(this,tu,!0);break;case"pointerleave":ny(this,tI,tw).call(this,null);break;case"transitionstart":im(e.target,this)&&setTimeout(()=>ny(this,th,tc).call(this),0)}}}tt=new WeakMap,ti=new WeakMap,ta=new WeakMap,tr=new WeakMap,tn=new WeakMap,to=new WeakMap,ts=new WeakMap,tl=new WeakMap,td=new WeakMap,tu=new WeakMap,th=new WeakSet,tc=function(){ny(this,tm,tp).call(this)?nb(this,ti).start():nb(this,ti).stop()},tm=new WeakSet,tp=function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&iE(this)},tE=new WeakMap,tv=new WeakSet,tg=function(e){var t;let i=(null!=(t=this.getAttribute("bounds")?ip(this,`#${this.getAttribute("bounds")}`):this.parentElement)?t:this).getBoundingClientRect(),a=this.range.getBoundingClientRect(),r=e.offsetWidth,n=-(a.left-i.left-r/2),o=i.right-a.left-r/2;return{box:{width:r,min:n,max:o},bounds:i,range:a}},tb=new WeakSet,tf=function(e,t){let i=`${100*t}%`,{width:a,min:r,max:n}=e.box;if(!a)return i;if(!Number.isNaN(r)){let e=`calc(1 / var(--_range-width) * 100 * ${r}% + var(--media-box-padding-left))`;i=`max(${e}, ${i})`}if(!Number.isNaN(n)){let e=`calc(1 / var(--_range-width) * 100 * ${n}% - var(--media-box-padding-right))`;i=`min(${i}, ${e})`}return i},tA=new WeakSet,ty=function(e,t){let{width:i,min:a,max:r}=e.box,n=t*e.range.width;if(n<a+nb(this,ts)){let t=e.range.left-e.bounds.left-nb(this,ts);return`${n-i/2+t}px`}if(n>r-nb(this,tl)){let t=e.bounds.right-e.range.right-nb(this,tl);return`${n+i/2-t-e.range.width}px`}return 0},t_=new WeakSet,tT=function(e){let t=[...nb(this,ta)].some(t=>e.composedPath().includes(t));if(!this.dragging&&(t||!e.composedPath().includes(this)))return void ny(this,tI,tw).call(this,null);let i=this.mediaSeekableEnd;if(!i)return;let a=iv(this.shadowRoot,"#preview-rail"),r=iv(this.shadowRoot,'[part~="preview-box"]'),n=ny(this,tv,tg).call(this,nb(this,tn)),o=(e.clientX-n.range.left)/n.range.width;o=Math.max(0,Math.min(1,o));let s=ny(this,tb,tf).call(this,n,o),l=ny(this,tA,ty).call(this,n,o);a.style.transform=`translateX(${s})`,a.style.setProperty("--_range-width",`${n.range.width}`),r.style.setProperty("--_box-shift",`${l}`),r.style.setProperty("--_box-width",`${n.box.width}px`),1>Math.abs(Math.round(nb(this,tr))-Math.round(o*i))&&o>.01&&o<.99||(nA(this,tr,o*i),ny(this,tI,tw).call(this,nb(this,tr)))},tI=new WeakSet,tw=function(e){this.dispatchEvent(new ii.CustomEvent(tx.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:e}))},tS=new WeakSet,tk=function(){nb(this,ti).stop();let e=nT(this);this.dispatchEvent(new ii.CustomEvent(tx.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e}))},nI.shadowRootOptions={mode:"open"},nI.getContainerTemplateHTML=function(e){return`
    <style>
      :host {
        --media-box-border-radius: 4px;
        --media-box-padding-left: 10px;
        --media-box-padding-right: 10px;
        --media-preview-border-radius: var(--media-box-border-radius);
        --media-box-arrow-offset: var(--media-box-border-radius);
        --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        --_preview-background: var(--media-preview-background, var(--_control-background));

        
        contain: layout;
      }

      #buffered {
        background: var(--media-time-range-buffered-color, rgb(255 255 255 / .4));
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #preview-rail,
      #current-rail {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 100%;
        pointer-events: none;
        will-change: transform;
      }

      [part~="box"] {
        width: min-content;
        
        position: absolute;
        bottom: 100%;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
      }

      [part~="current-box"] {
        display: var(--media-current-box-display, var(--media-box-display, flex));
        margin: var(--media-current-box-margin, var(--media-box-margin, 0 0 5px));
        visibility: hidden;
      }

      [part~="preview-box"] {
        display: var(--media-preview-box-display, var(--media-box-display, flex));
        margin: var(--media-preview-box-margin, var(--media-box-margin, 0 0 5px));
        transition-property: var(--media-preview-transition-property, visibility, opacity);
        transition-duration: var(--media-preview-transition-duration-out, .25s);
        transition-delay: var(--media-preview-transition-delay-out, 0s);
        visibility: hidden;
        opacity: 0;
      }

      :host(:is([${tW.MEDIA_PREVIEW_IMAGE}], [${tW.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${tW.MEDIA_PREVIEW_IMAGE}], [${tW.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
          transition-duration: var(--media-preview-transition-duration-in, .5s);
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
          opacity: 1;
        }
      }

      media-preview-thumbnail,
      ::slotted(media-preview-thumbnail) {
        visibility: hidden;
        
        transition: visibility 0s .25s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-thumbnail-background, var(--_preview-background));
        box-shadow: var(--media-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));
        max-width: var(--media-preview-thumbnail-max-width, 180px);
        max-height: var(--media-preview-thumbnail-max-height, 160px);
        min-width: var(--media-preview-thumbnail-min-width, 120px);
        min-height: var(--media-preview-thumbnail-min-height, 80px);
        border: var(--media-preview-thumbnail-border);
        border-radius: var(--media-preview-thumbnail-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius) 0 0);
      }

      :host([${tW.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${tW.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${tW.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${tW.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${tW.MEDIA_PREVIEW_TIME}]:hover) {
          --media-time-range-hover-display: block;
        }
      }

      media-preview-chapter-display,
      ::slotted(media-preview-chapter-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        visibility: hidden;
        
        transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-chapter-background, var(--_preview-background));
        border-radius: var(--media-preview-chapter-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-chapter-padding, 3.5px 9px);
        margin: var(--media-preview-chapter-margin, 0 0 5px);
        text-shadow: var(--media-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));
      }

      :host([${tW.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${tW.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${tW.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${tW.MEDIA_PREVIEW_CHAPTER}]) {
        visibility: visible;
      }

      media-preview-chapter-display:not([aria-valuetext]),
      ::slotted(media-preview-chapter-display:not([aria-valuetext])) {
        display: none;
      }

      media-preview-time-display,
      ::slotted(media-preview-time-display),
      media-time-display,
      ::slotted(media-time-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        
        transition: min-width 0s, border-radius 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-time-background, var(--_preview-background));
        border-radius: var(--media-preview-time-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-time-padding, 3.5px 9px);
        margin: var(--media-preview-time-margin, 0);
        text-shadow: var(--media-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50%)
        ));
      }

      :host([${tW.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${tW.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${tW.MEDIA_PREVIEW_TIME}]:hover) {
        --media-time-range-hover-display: block;
      }

      [part~="arrow"],
      ::slotted([part~="arrow"]) {
        display: var(--media-box-arrow-display, inline-block);
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2 + var(--media-box-arrow-offset)),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50% - var(--media-box-arrow-offset))
        ));
        
        border-color: transparent;
        border-top-color: var(--media-box-arrow-background, var(--_control-background));
        border-width: var(--media-box-arrow-border-width,
          var(--media-box-arrow-height, 5px) var(--media-box-arrow-width, 6px) 0);
        border-style: solid;
        justify-content: center;
        height: 0;
      }
    </style>
    <div id="preview-rail">
      <slot name="preview" part="box preview-box">
        <media-preview-thumbnail>
          <template shadowrootmode="${r7.shadowRootOptions.mode}">
            ${r7.getTemplateHTML({})}
          </template>
        </media-preview-thumbnail>
        <media-preview-chapter-display></media-preview-chapter-display>
        <media-preview-time-display></media-preview-time-display>
        <slot name="preview-arrow"><div part="arrow"></div></slot>
      </slot>
    </div>
    <div id="current-rail">
      <slot name="current" part="box current-box">
        
      </slot>
    </div>
  `},ii.customElements.get("media-time-range")||ii.customElements.define("media-time-range",nI);class nw extends a8{static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_VOLUME,tW.MEDIA_MUTED,tW.MEDIA_VOLUME_UNAVAILABLE]}constructor(){super(),this.range.addEventListener("input",()=>{let e=this.range.value,t=new ii.CustomEvent(tx.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)})}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",t5("volume"))}attributeChangedCallback(e,t,i){if(super.attributeChangedCallback(e,t,i),e===tW.MEDIA_VOLUME||e===tW.MEDIA_MUTED){let e;this.range.valueAsNumber=this.mediaMuted?0:this.mediaVolume,this.range.setAttribute("aria-valuetext",(e=this.range.valueAsNumber,`${Math.round(100*e)}%`)),this.updateBar()}}get mediaVolume(){return ib(this,tW.MEDIA_VOLUME,1)}set mediaVolume(e){iA(this,tW.MEDIA_VOLUME,e)}get mediaMuted(){return iy(this,tW.MEDIA_MUTED)}set mediaMuted(e){i_(this,tW.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return iT(this,tW.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){iI(this,tW.MEDIA_VOLUME_UNAVAILABLE,e)}}ii.customElements.get("media-volume-range")||ii.customElements.define("media-volume-range",nw);class nS extends aU{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,tW.MEDIA_LOOP]}connectedCallback(){var e;super.connectedCallback(),this.container=(null==(e=this.shadowRoot)?void 0:e.querySelector("#icon"))||null,this.container&&(this.container.textContent=t5("Loop"))}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e===tW.MEDIA_LOOP&&this.container&&this.setAttribute("aria-checked",this.mediaLoop?"true":"false")}get mediaLoop(){return iy(this,tW.MEDIA_LOOP)}set mediaLoop(e){i_(this,tW.MEDIA_LOOP,e)}handleClick(){let e=!this.mediaLoop,t=new ii.CustomEvent(tx.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(t)}}function nk(e){return"boolean"==typeof e?e?"":void 0:"function"==typeof e?void 0:Array.isArray(e)&&e.every(e=>"string"==typeof e||"number"==typeof e||"boolean"==typeof e)?e.join(" "):"object"!=typeof e||null===e?e:void 0}nS.getSlotTemplateHTML=function(e){return`
      <style>
        :host {
          min-width: 4ch;
          padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          font-weight: var(--media-button-font-weight, normal);
        }

        #checked-indicator {
          display: none;
        }

        :host([${tW.MEDIA_LOOP}]) #checked-indicator {
          display: block;
        }
      </style>
      
      <span id="icon">
     </span>

      <div id="checked-indicator">
        <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
          <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
        </svg>
      </div>
    `},nS.getTooltipContentHTML=function(){return t5("Loop")},ii.customElements.get("media-loop-button")||ii.customElements.define("media-loop-button",nS),tO({tagName:"media-gesture-receiver",elementClass:iL,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-container",elementClass:iU,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}});let nL=tO({tagName:"media-controller",elementClass:af,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}});tO({tagName:"media-tooltip",elementClass:aC,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-chrome-button",elementClass:aU,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-airplay-button",elementClass:aV,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-captions-button",elementClass:aG,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-cast-button",elementClass:aQ,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-chrome-dialog",elementClass:a1,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-chrome-range",elementClass:a8,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}});let nM=tO({tagName:"media-control-bar",elementClass:rt,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}});tO({tagName:"media-text-display",elementClass:rn,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-duration-display",elementClass:rl,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-error-dialog",elementClass:rE,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-keyboard-shortcuts-dialog",elementClass:rb,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-fullscreen-button",elementClass:rT,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-live-button",elementClass:rM,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}});let nR=tO({tagName:"media-loading-indicator",elementClass:rP,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),nC=tO({tagName:"media-mute-button",elementClass:rF,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}});tO({tagName:"media-pip-button",elementClass:rG,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-playback-rate-button",elementClass:rQ,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}});let nD=tO({tagName:"media-play-button",elementClass:rX,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}});tO({tagName:"media-poster-image",elementClass:r0,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-preview-chapter-display",elementClass:r2,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-preview-thumbnail",elementClass:r7,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-preview-time-display",elementClass:r6,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-seek-backward-button",elementClass:nt,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),tO({tagName:"media-seek-forward-button",elementClass:na,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}});let nO=tO({tagName:"media-time-display",elementClass:nh,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),nN=tO({tagName:"media-time-range",elementClass:nI,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}}),nx=tO({tagName:"media-volume-range",elementClass:nw,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}});tO({tagName:"media-loop-button",elementClass:nS,react:tL,toAttributeValue:nk,defaultProps:{suppressHydrationWarning:!0}})},8057:(e,t)=>{function i(e){let t={};for(let[i,a]of e.entries()){let e=t[i];void 0===e?t[i]=a:Array.isArray(e)?e.push(a):t[i]=[e,a]}return t}function a(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function r(e){let t=new URLSearchParams;for(let[i,r]of Object.entries(e))if(Array.isArray(r))for(let e of r)t.append(i,a(e));else t.set(i,a(r));return t}function n(e){for(var t=arguments.length,i=Array(t>1?t-1:0),a=1;a<t;a++)i[a-1]=arguments[a];for(let t of i){for(let i of t.keys())e.delete(i);for(let[i,a]of t.entries())e.append(i,a)}return e}Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var i in t)Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}(t,{assign:function(){return n},searchParamsToUrlQuery:function(){return i},urlQueryToSearchParams:function(){return r}})},8481:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var i in t)Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}(t,{DecodeError:function(){return p},MiddlewareNotFoundError:function(){return b},MissingStaticPage:function(){return g},NormalizeError:function(){return E},PageNotFoundError:function(){return v},SP:function(){return c},ST:function(){return m},WEB_VITALS:function(){return i},execOnce:function(){return a},getDisplayName:function(){return l},getLocationOrigin:function(){return o},getURL:function(){return s},isAbsoluteUrl:function(){return n},isResSent:function(){return d},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return u},stringifyError:function(){return f}});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function a(e){let t,i=!1;return function(){for(var a=arguments.length,r=Array(a),n=0;n<a;n++)r[n]=arguments[n];return i||(i=!0,t=e(...r)),t}}let r=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,n=e=>r.test(e);function o(){let{protocol:e,hostname:t,port:i}=window.location;return e+"//"+t+(i?":"+i:"")}function s(){let{href:e}=window.location,t=o();return e.substring(t.length)}function l(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function d(e){return e.finished||e.headersSent}function u(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?"?"+t.slice(1).join("?"):"")}async function h(e,t){let i=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let a=await e.getInitialProps(t);if(i&&d(i))return a;if(!a)throw Object.defineProperty(Error('"'+l(e)+'.getInitialProps()" should resolve to an object. But found "'+a+'" instead.'),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return a}let c="undefined"!=typeof performance,m=c&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class p extends Error{}class E extends Error{}class v extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message="Cannot find module for page: "+e}}class g extends Error{constructor(e,t){super(),this.message="Failed to load static file for page: "+e+" "+t}}class b extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function f(e){return JSON.stringify({message:e.message,stack:e.stack})}},8877:(e,t,i)=>{i.d(t,{A:()=>a});let a=(0,i(7835).A)("maximize-2",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"m21 3-7 7",key:"1l2asr"}],["path",{d:"m3 21 7-7",key:"tjx5ai"}],["path",{d:"M9 21H3v-6",key:"wtvkvv"}]])},9132:(e,t,i)=>{i.d(t,{W:()=>o});var a=i(9856),r=i(4191);let n={some:0,all:1};function o(e){let{root:t,margin:i,amount:o,once:s=!1,initial:l=!1}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},[d,u]=(0,a.useState)(l);return(0,a.useEffect)(()=>{if(!e.current||s&&d)return;let a={root:t&&t.current||void 0,margin:i,amount:o};return function(e,t,{root:i,margin:a,amount:o="some"}={}){let s=(0,r.K)(e),l=new WeakMap,d=new IntersectionObserver(e=>{e.forEach(e=>{let i=l.get(e.target);if(!!i!==e.isIntersecting)if(e.isIntersecting){let i=t(e.target,e);"function"==typeof i?l.set(e.target,i):d.unobserve(e.target)}else"function"==typeof i&&(i(e),l.delete(e.target))})},{root:i,rootMargin:a,threshold:"number"==typeof o?o:n[o]});return s.forEach(e=>d.observe(e)),()=>d.disconnect()}(e.current,()=>(u(!0),s?void 0:()=>u(!1)),a)},[t,e,i,s,o]),d}},9325:(e,t,i)=>{i.d(t,{o:()=>u});var a=i(3996),r=i(9856),n=i(4478);let o=(0,r.createContext)(null);var s=i(2916),l=i(6051);let d=e=>!e.isLayoutDirty&&e.willUpdate(!1),u=e=>{let{children:t,id:i,inherit:u=!0}=e,h=(0,r.useContext)(n.L),c=(0,r.useContext)(o),[m,p]=function(){let e=function(){let e=(0,r.useRef)(!1);return(0,l.E)(()=>(e.current=!0,()=>{e.current=!1}),[]),e}(),[t,i]=(0,r.useState)(0),a=(0,r.useCallback)(()=>{e.current&&i(t+1)},[t]);return[(0,r.useCallback)(()=>s.Gt.postRender(a),[a]),t]}(),E=(0,r.useRef)(null),v=h.id||c;null===E.current&&((e=>!0==(!0===e)||"id"===e)(u)&&v&&(i=i?v+"-"+i:v),E.current={id:i,group:!0===u&&h.group||function(){let e=new Set,t=new WeakMap,i=()=>e.forEach(d);return{add:a=>{e.add(a),t.set(a,a.addEventListener("willUpdate",i))},remove:a=>{e.delete(a);let r=t.get(a);r&&(r(),t.delete(a)),i()},dirty:i}}()});let g=(0,r.useMemo)(()=>({...E.current,forceRender:m}),[p]);return(0,a.jsx)(n.L.Provider,{value:g,children:t})}},9555:(e,t,i)=>{i.d(t,{Z:()=>d});var a=i(9856),r="https://embed.cloudflarestream.com/embed/sdk.latest.js",n=function(){if("undefined"!=typeof window)return window.Stream};function o(e,t,i){(0,a.useEffect)(function(){t.current&&void 0!==i&&(t.current[e]=i)},[e,i,t])}function s(e,t,i){void 0===i&&(i=l),(0,a.useEffect)(function(){if(t.current){var a=t.current;return a.addEventListener(e,i),function(){return a.removeEventListener(e,i)}}},[i,e,t])}var l=function(){},d=function(e){var t,i,o;return(i=(t=(0,a.useState)(n))[0],o=t[1],(0,a.useEffect)(function(){if(!i){var e=document.querySelector("script[src='"+r+"']"),t=null!=e?e:document.createElement("script");t.addEventListener("load",function(){o(n)}),e||(t.src=r,document.head.appendChild(t))}},[i]),i)?a.createElement(c,Object.assign({},e)):null},u={position:"absolute",top:0,left:0,right:0,bottom:0,height:"100%",width:"100%"},h=function(e){var t=e.children,i=e.responsive,r=e.className,n=e.videoDimensions,o=n.videoHeight,s=n.videoWidth,l=(0,a.useMemo)(function(){return{position:"relative",paddingTop:s>0?o/s*100+"%":void 0}},[s,o]);return a.createElement("div",{className:r,style:i?l:void 0},t)},c=function(e){var t,i,r,l,d,c,m,p,E,v,g,b,f,A,y=e.src,_=e.customerCode,T=e.adUrl,I=e.controls,w=void 0!==I&&I,S=e.muted,k=void 0!==S&&S,L=e.autoplay,M=void 0!==L&&L,R=e.loop,C=void 0!==R&&R,D=e.preload,O=void 0===D?"metadata":D,N=e.primaryColor,x=e.letterboxColor,P=e.defaultTextTrack,U=e.height,H=e.width,W=e.poster,V=e.currentTime,F=e.volume,$=e.playbackRate,B=e.startTime,G=e.streamRef,K=e.responsive,j=void 0===K||K,q=e.className,Q=e.title,Y=e.onAbort,z=e.onCanPlay,Z=e.onCanPlayThrough,X=e.onDurationChange,J=e.onEnded,ee=e.onError,et=e.onLoadedData,ei=e.onLoadedMetaData,ea=e.onLoadStart,er=e.onPause,en=e.onPlay,eo=e.onPlaying,es=e.onProgress,el=e.onRateChange,ed=e.onResize,eu=e.onSeeked,eh=e.onSeeking,ec=e.onStalled,em=e.onSuspend,ep=e.onTimeUpdate,eE=e.onVolumeChange,ev=e.onWaiting,eg=e.onStreamAdStart,eb=e.onStreamAdEnd,ef=e.onStreamAdTimeout,eA=(0,a.useRef)(),ey=null!=G?G:eA,e_=(0,a.useState)({videoHeight:0,videoWidth:0}),eT=e_[0],eI=e_[1],ew=(0,a.useRef)(null),eS=(i=(t={customerCode:_,muted:k,preload:O,loop:C,autoplay:M,controls:w,poster:W,primaryColor:N,letterboxColor:x,adUrl:T,defaultTextTrack:P,startTime:B}).muted,r=t.preload,l=t.loop,d=t.autoplay,c=t.controls,m=t.poster,p=t.primaryColor,E=t.letterboxColor,v=t.adUrl,g=t.startTime,b=t.defaultTextTrack,f=t.customerCode,A=[m&&"poster="+encodeURIComponent(m),v&&"ad-url="+encodeURIComponent(v),b&&"defaultTextTrack="+encodeURIComponent(b),p&&"primaryColor="+encodeURIComponent(p),E&&"letterboxColor="+encodeURIComponent(E),g&&"startTime="+g,i&&"muted=true",r&&"preload="+r,l&&"loop=true",d&&"autoplay=true",!c&&"controls=false"].filter(Boolean).join("&"),(0,a.useMemo)(function(){return f?"https://customer-"+f+".cloudflarestream.com/"+y+"/iframe?"+A:"https://iframe.cloudflarestream.com/"+y+"?"+A},[])),ek=!function(e){try{var t=new URL(e);return t.hostname.endsWith("videodelivery.net")||t.hostname.endsWith("cloudflarestream.com")}catch(e){return!1}}(y)?eS:y;return o("muted",ey,k),o("controls",ey,w),o("src",ey,y),o("autoplay",ey,M),o("currentTime",ey,V),o("loop",ey,C),o("preload",ey,O),o("primaryColor",ey,N),o("letterboxColor",ey,x),o("volume",ey,void 0===F?1:F),o("playbackRate",ey,void 0===$?1:$),(0,a.useEffect)(function(){var e=n();if(ew.current&&e){var t=e(ew.current);ey.current=t;var i=t.videoHeight,a=t.videoWidth;i&&a&&eI({videoHeight:i,videoWidth:a})}},[]),s("abort",ey,Y),s("canplay",ey,z),s("canplaythrough",ey,Z),s("durationchange",ey,X),s("ended",ey,J),s("error",ey,ee),s("loadeddata",ey,et),s("loadedmetadata",ey,ei),s("loadstart",ey,ea),s("pause",ey,er),s("play",ey,en),s("playing",ey,eo),s("progress",ey,es),s("ratechange",ey,el),s("seeked",ey,eu),s("seeking",ey,eh),s("stalled",ey,ec),s("suspend",ey,em),s("timeupdate",ey,ep),s("volumechange",ey,eE),s("waiting",ey,ev),s("stream-adstart",ey,eg),s("stream-adend",ey,eb),s("stream-adtimeout",ey,ef),s("resize",ey,function(e){if(ey.current){var t=ey.current;eI({videoHeight:t.videoHeight,videoWidth:t.videoWidth}),ed&&ed(e)}}),a.createElement(h,{className:q,responsive:j,videoDimensions:eT},a.createElement("iframe",{ref:ew,src:ek,title:Q,style:j?u:void 0,frameBorder:0,height:U,width:H,allow:"accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;",allowFullScreen:!0}))}},9580:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var i in t)Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}(t,{default:function(){return v},useLinkStatus:function(){return b}});let a=i(304),r=i(3996),n=a._(i(9856)),o=i(1059),s=i(9637),l=i(5932),d=i(8481),u=i(4407);i(7548);let h=i(612),c=i(1126),m=i(5940);i(2506);let p=i(7300);function E(e){return"string"==typeof e?e:(0,o.formatUrl)(e)}function v(e){var t;let i,a,o,[v,b]=(0,n.useOptimistic)(h.IDLE_LINK_STATUS),f=(0,n.useRef)(null),{href:A,as:y,children:_,prefetch:T=null,passHref:I,replace:w,shallow:S,scroll:k,onClick:L,onMouseEnter:M,onTouchStart:R,legacyBehavior:C=!1,onNavigate:D,ref:O,unstable_dynamicOnHover:N,...x}=e;i=_,C&&("string"==typeof i||"number"==typeof i)&&(i=(0,r.jsx)("a",{children:i}));let P=n.default.useContext(s.AppRouterContext),U=!1!==T,H=!1!==T?null===(t=T)||"auto"===t?p.FetchStrategy.PPR:p.FetchStrategy.Full:p.FetchStrategy.PPR,{href:W,as:V}=n.default.useMemo(()=>{let e=E(A);return{href:e,as:y?E(y):e}},[A,y]);C&&(a=n.default.Children.only(i));let F=C?a&&"object"==typeof a&&a.ref:O,$=n.default.useCallback(e=>(null!==P&&(f.current=(0,h.mountLinkInstance)(e,W,P,H,U,b)),()=>{f.current&&((0,h.unmountLinkForCurrentNavigation)(f.current),f.current=null),(0,h.unmountPrefetchableInstance)(e)}),[U,W,P,H,b]),B={ref:(0,l.useMergedRef)($,F),onClick(e){C||"function"!=typeof L||L(e),C&&a.props&&"function"==typeof a.props.onClick&&a.props.onClick(e),P&&(e.defaultPrevented||function(e,t,i,a,r,o,s){let{nodeName:l}=e.currentTarget;if(!("A"===l.toUpperCase()&&function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||e.currentTarget.hasAttribute("download"))){if(!(0,c.isLocalURL)(t)){r&&(e.preventDefault(),location.replace(t));return}if(e.preventDefault(),s){let e=!1;if(s({preventDefault:()=>{e=!0}}),e)return}n.default.startTransition(()=>{(0,m.dispatchNavigateAction)(i||t,r?"replace":"push",null==o||o,a.current)})}}(e,W,V,f,w,k,D))},onMouseEnter(e){C||"function"!=typeof M||M(e),C&&a.props&&"function"==typeof a.props.onMouseEnter&&a.props.onMouseEnter(e),P&&U&&(0,h.onNavigationIntent)(e.currentTarget,!0===N)},onTouchStart:function(e){C||"function"!=typeof R||R(e),C&&a.props&&"function"==typeof a.props.onTouchStart&&a.props.onTouchStart(e),P&&U&&(0,h.onNavigationIntent)(e.currentTarget,!0===N)}};return(0,d.isAbsoluteUrl)(V)?B.href=V:C&&!I&&("a"!==a.type||"href"in a.props)||(B.href=(0,u.addBasePath)(V)),o=C?n.default.cloneElement(a,B):(0,r.jsx)("a",{...x,...B,children:i}),(0,r.jsx)(g.Provider,{value:v,children:o})}let g=(0,n.createContext)(h.IDLE_LINK_STATUS),b=()=>(0,n.useContext)(g);("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9722:(e,t,i)=>{i.d(t,{A:()=>a});let a=(0,i(7835).A)("play",[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]])}}]);