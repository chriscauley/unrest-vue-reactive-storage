var e=Object.defineProperty,t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,o=(t,r,n)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n,a=(e,a)=>{for(var i in a||(a={}))r.call(a,i)&&o(e,i,a[i]);if(t)for(var i of t(a))n.call(a,i)&&o(e,i,a[i]);return e},i=(e,o)=>{var a={};for(var i in e)r.call(e,i)&&o.indexOf(i)<0&&(a[i]=e[i]);if(null!=e&&t)for(var i of t(e))o.indexOf(i)<0&&n.call(e,i)&&(a[i]=e[i]);return a};import{reactive as s}from"vue";import u from"querystring";const c=e=>new Promise((t=>{setTimeout((()=>t(e())),0)})),f={makePaginator:({items:e,page:t,per_page:r})=>({pages:Math.ceil(e.length/r),items:e.slice((t-1)*r,t*r),total:e.length,page:t}),prepareItem:(e,t)=>{var r=i(e,[]);return r.id||(r.created=(new Date).valueOf(),r.id=t()),r.updated=(new Date).valueOf(),r}};var l=(e,t={})=>{const{makePaginator:r=f.makePaginator,prepareItem:n=f.prepareItem,initial:o={},afterSave:a=(()=>{}),fromServer:i=(e=>e),toServer:u=(e=>e)}=t;let l=(Math.max(0,...Object.keys(o).map(Number))||0)+1;const p=s(o),d=e=>i(p[e]),h=({page:e=1,per_page:t=25,query:n={}}={})=>{let o=Object.values(p).map(i);return Object.entries(n).forEach((([e,t])=>{o=o.filter((r=>r[e]===t))})),r({items:o,per_page:t,page:e})};return{_state:p,getOne:d,getPage:h,fetchOne:e=>Promise.resolve(d(e)),fetchPage:e=>Promise.resolve(h(e)),save:e=>c((()=>(e=u(n(e,(()=>l++))),p[e.id]=e,a(p),e))),delete:({id:e})=>c((()=>{delete p[e],a(p)}))}},p="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},d={get:function(e){if(!localStorage)return null;try{return JSON.parse(localStorage.getItem(e))}catch(t){return null}},set:function(e,t){if(!localStorage)return null;try{var r=JSON.stringify(t);return localStorage.setItem(e,r),r}catch(n){return null}},remove:function(e){if(!localStorage)return null;try{return localStorage.removeItem(e),!0}catch(t){return null}},clear:function(){if(!localStorage)return null;try{return localStorage.clear(),!0}catch(e){return null}}};const h=(e={})=>{const{LS_KEY:t,initial:r={},ls:n=d}=e,o=s(n.get(t)||r);return{state:o,save:e=>{Object.assign(o,e),n.set(t,o)}}};var m=(e,t={})=>{var r=t,{ls:n=d}=r,o=i(r,["ls"]);const a=`LocalStorage:${e}`;o.initial=n.get(a)||o.initial,o.afterSave=e=>n.set(a,e);const s=l(0,o);return s.LS_KEY=a,s},g=/^\s+|\s+$/g,v=/^[-+]0x[0-9a-f]+$/i,y=/^0b[01]+$/i,b=/^0o[0-7]+$/i,w=parseInt,S="object"==typeof p&&p&&p.Object===Object&&p,O="object"==typeof self&&self&&self.Object===Object&&self,j=S||O||Function("return this")(),E=Object.prototype.toString,x=Math.max,R=Math.min,C=function(){return j.Date.now()};function N(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function T(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==E.call(e)}(e))return NaN;if(N(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=N(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(g,"");var r=y.test(e);return r||b.test(e)?w(e.slice(2),r?2:8):v.test(e)?NaN:+e}var P=function(e,t,r){var n,o,a,i,s,u,c=0,f=!1,l=!1,p=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function d(t){var r=n,a=o;return n=o=void 0,c=t,i=e.apply(a,r)}function h(e){return c=e,s=setTimeout(g,t),f?d(e):i}function m(e){var r=e-u;return void 0===u||r>=t||r<0||l&&e-c>=a}function g(){var e=C();if(m(e))return v(e);s=setTimeout(g,function(e){var r=t-(e-u);return l?R(r,a-(e-c)):r}(e))}function v(e){return s=void 0,p&&n?d(e):(n=o=void 0,i)}function y(){var e=C(),r=m(e);if(n=arguments,o=this,u=e,r){if(void 0===s)return h(u);if(l)return s=setTimeout(g,t),d(u)}return void 0===s&&(s=setTimeout(g,t)),i}return t=T(t)||0,N(r)&&(f=!!r.leading,a=(l="maxWait"in r)?x(T(r.maxWait)||0,t):a,p="trailing"in r?!!r.trailing:p),y.cancel=function(){void 0!==s&&clearTimeout(s),c=0,n=u=o=s=void 0},y.flush=function(){return void 0===s?i:v(C())},y},A={exports:{}},U=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}},L=U,$=Object.prototype.toString;function k(e){return"[object Array]"===$.call(e)}function B(e){return void 0===e}function q(e){return null!==e&&"object"==typeof e}function D(e){if("[object Object]"!==$.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function I(e){return"[object Function]"===$.call(e)}function _(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),k(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}var F={isArray:k,isArrayBuffer:function(e){return"[object ArrayBuffer]"===$.call(e)},isBuffer:function(e){return null!==e&&!B(e)&&null!==e.constructor&&!B(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:q,isPlainObject:D,isUndefined:B,isDate:function(e){return"[object Date]"===$.call(e)},isFile:function(e){return"[object File]"===$.call(e)},isBlob:function(e){return"[object Blob]"===$.call(e)},isFunction:I,isStream:function(e){return q(e)&&I(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:_,merge:function e(){var t={};function r(r,n){D(t[n])&&D(r)?t[n]=e(t[n],r):D(r)?t[n]=e({},r):k(r)?t[n]=r.slice():t[n]=r}for(var n=0,o=arguments.length;n<o;n++)_(arguments[n],r);return t},extend:function(e,t,r){return _(t,(function(t,n){e[n]=r&&"function"==typeof t?L(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}},M=F;function H(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var z=function(e,t,r){if(!t)return e;var n;if(r)n=r(t);else if(M.isURLSearchParams(t))n=t.toString();else{var o=[];M.forEach(t,(function(e,t){null!=e&&(M.isArray(e)?t+="[]":e=[e],M.forEach(e,(function(e){M.isDate(e)?e=e.toISOString():M.isObject(e)&&(e=JSON.stringify(e)),o.push(H(t)+"="+H(e))})))})),n=o.join("&")}if(n){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+n}return e},J=F;function X(){this.handlers=[]}X.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},X.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},X.prototype.forEach=function(e){J.forEach(this.handlers,(function(t){null!==t&&e(t)}))};var K=X,V=F,W=function(e){return!(!e||!e.__CANCEL__)},Y=F,G=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e},Q=function(e,t,r,n,o){var a=new Error(e);return G(a,t,r,n,o)},Z=Q,ee=F,te=ee.isStandardBrowserEnv()?{write:function(e,t,r,n,o,a){var i=[];i.push(e+"="+encodeURIComponent(t)),ee.isNumber(r)&&i.push("expires="+new Date(r).toGMTString()),ee.isString(n)&&i.push("path="+n),ee.isString(o)&&i.push("domain="+o),!0===a&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}},re=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)},ne=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e},oe=F,ae=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],ie=F,se=ie.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function n(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=n(window.location.href),function(t){var r=ie.isString(t)?n(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0},ue=F,ce=function(e,t,r){var n=r.config.validateStatus;r.status&&n&&!n(r.status)?t(Z("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)},fe=te,le=z,pe=function(e,t){return e&&!re(t)?ne(e,t):t},de=function(e){var t,r,n,o={};return e?(oe.forEach(e.split("\n"),(function(e){if(n=e.indexOf(":"),t=oe.trim(e.substr(0,n)).toLowerCase(),r=oe.trim(e.substr(n+1)),t){if(o[t]&&ae.indexOf(t)>=0)return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([r]):o[t]?o[t]+", "+r:r}})),o):o},he=se,me=Q,ge=function(e){return new Promise((function(t,r){var n=e.data,o=e.headers;ue.isFormData(n)&&delete o["Content-Type"];var a=new XMLHttpRequest;if(e.auth){var i=e.auth.username||"",s=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(i+":"+s)}var u=pe(e.baseURL,e.url);if(a.open(e.method.toUpperCase(),le(u,e.params,e.paramsSerializer),!0),a.timeout=e.timeout,a.onreadystatechange=function(){if(a&&4===a.readyState&&(0!==a.status||a.responseURL&&0===a.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in a?de(a.getAllResponseHeaders()):null,o={data:e.responseType&&"text"!==e.responseType?a.response:a.responseText,status:a.status,statusText:a.statusText,headers:n,config:e,request:a};ce(t,r,o),a=null}},a.onabort=function(){a&&(r(me("Request aborted",e,"ECONNABORTED",a)),a=null)},a.onerror=function(){r(me("Network Error",e,null,a)),a=null},a.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(me(t,e,"ECONNABORTED",a)),a=null},ue.isStandardBrowserEnv()){var c=(e.withCredentials||he(u))&&e.xsrfCookieName?fe.read(e.xsrfCookieName):void 0;c&&(o[e.xsrfHeaderName]=c)}if("setRequestHeader"in a&&ue.forEach(o,(function(e,t){void 0===n&&"content-type"===t.toLowerCase()?delete o[t]:a.setRequestHeader(t,e)})),ue.isUndefined(e.withCredentials)||(a.withCredentials=!!e.withCredentials),e.responseType)try{a.responseType=e.responseType}catch(f){if("json"!==e.responseType)throw f}"function"==typeof e.onDownloadProgress&&a.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&a.upload&&a.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){a&&(a.abort(),r(e),a=null)})),n||(n=null),a.send(n)}))},ve=F,ye=function(e,t){Y.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))},be={"Content-Type":"application/x-www-form-urlencoded"};function we(e,t){!ve.isUndefined(e)&&ve.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var Se,Oe={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(Se=ge),Se),transformRequest:[function(e,t){return ye(t,"Accept"),ye(t,"Content-Type"),ve.isFormData(e)||ve.isArrayBuffer(e)||ve.isBuffer(e)||ve.isStream(e)||ve.isFile(e)||ve.isBlob(e)?e:ve.isArrayBufferView(e)?e.buffer:ve.isURLSearchParams(e)?(we(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):ve.isObject(e)?(we(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(t){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};Oe.headers={common:{Accept:"application/json, text/plain, */*"}},ve.forEach(["delete","get","head"],(function(e){Oe.headers[e]={}})),ve.forEach(["post","put","patch"],(function(e){Oe.headers[e]=ve.merge(be)}));var je=Oe,Ee=F,xe=function(e,t,r){return V.forEach(r,(function(r){e=r(e,t)})),e},Re=W,Ce=je;function Ne(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var Te=F,Pe=function(e,t){t=t||{};var r={},n=["url","method","data"],o=["headers","auth","proxy","params"],a=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],i=["validateStatus"];function s(e,t){return Te.isPlainObject(e)&&Te.isPlainObject(t)?Te.merge(e,t):Te.isPlainObject(t)?Te.merge({},t):Te.isArray(t)?t.slice():t}function u(n){Te.isUndefined(t[n])?Te.isUndefined(e[n])||(r[n]=s(void 0,e[n])):r[n]=s(e[n],t[n])}Te.forEach(n,(function(e){Te.isUndefined(t[e])||(r[e]=s(void 0,t[e]))})),Te.forEach(o,u),Te.forEach(a,(function(n){Te.isUndefined(t[n])?Te.isUndefined(e[n])||(r[n]=s(void 0,e[n])):r[n]=s(void 0,t[n])})),Te.forEach(i,(function(n){n in t?r[n]=s(e[n],t[n]):n in e&&(r[n]=s(void 0,e[n]))}));var c=n.concat(o).concat(a).concat(i),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===c.indexOf(e)}));return Te.forEach(f,u),r},Ae=F,Ue=z,Le=K,$e=function(e){return Ne(e),e.headers=e.headers||{},e.data=xe(e.data,e.headers,e.transformRequest),e.headers=Ee.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),Ee.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||Ce.adapter)(e).then((function(t){return Ne(e),t.data=xe(t.data,t.headers,e.transformResponse),t}),(function(t){return Re(t)||(Ne(e),t&&t.response&&(t.response.data=xe(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))},ke=Pe;function Be(e){this.defaults=e,this.interceptors={request:new Le,response:new Le}}Be.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=ke(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[$e,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},Be.prototype.getUri=function(e){return e=ke(this.defaults,e),Ue(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},Ae.forEach(["delete","get","head","options"],(function(e){Be.prototype[e]=function(t,r){return this.request(ke(r||{},{method:e,url:t,data:(r||{}).data}))}})),Ae.forEach(["post","put","patch"],(function(e){Be.prototype[e]=function(t,r,n){return this.request(ke(n||{},{method:e,url:t,data:r}))}}));var qe=Be;function De(e){this.message=e}De.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},De.prototype.__CANCEL__=!0;var Ie=De,_e=Ie;function Fe(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new _e(e),t(r.reason))}))}Fe.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},Fe.source=function(){var e;return{token:new Fe((function(t){e=t})),cancel:e}};var Me=Fe,He=F,ze=U,Je=qe,Xe=Pe;function Ke(e){var t=new Je(e),r=ze(Je.prototype.request,t);return He.extend(r,Je.prototype,t),He.extend(r,t),r}var Ve=Ke(je);Ve.Axios=Je,Ve.create=function(e){return Ke(Xe(Ve.defaults,e))},Ve.Cancel=Ie,Ve.CancelToken=Me,Ve.isCancel=W,Ve.all=function(e){return Promise.all(e)},Ve.spread=function(e){return function(t){return e.apply(null,t)}},Ve.isAxiosError=function(e){return"object"==typeof e&&!0===e.isAxiosError},A.exports=Ve,A.exports.default=Ve;var We=A.exports;const Ye=()=>{const e=We.create({baseURL:"/api/",transformRequest(e,t){const r=((e="")=>{var t;return(null==(t=e.match(/csrftoken=([^;]+)/))?void 0:t[1])||""})("undefined"==typeof document?"":document.cookie);return t.delete["X-CSRFToken"]=r,t.post["X-CSRFToken"]=r,t.post["Content-Type"]="application/json",JSON.stringify(e)}});return e.interceptors.response.use((e=>e.data),(e=>{throw e})),e},Ge=e=>e,Qe=(e={})=>{const{client:t=Ye(),fromServer:r=Ge,toServer:n=Ge}=e;let o=(new Date).valueOf();const a={},i={},u=s({loading:{},byUrl:{},byId:{}}),c=e=>{const n=o>a[e]||!u.byUrl[e];if(u.loading[e]){i[e]=i[e]||[];return new Promise(((t,r)=>i[e].push([t,r])))}return n?(u.loading[e]=!0,t.get(e).then((t=>{var n;return a[e]=(new Date).valueOf(),u.byUrl[e]=t,t.id?u.byId[t.id]=r(t):t.items?t.items.forEach((e=>u.byId[e.id]=r(e))):u.byUrl[e]=r(t),u.loading[e]=!1,null==(n=i[e])||n.forEach((([e])=>e(t))),t})).catch((t=>{var r;throw u.loading[e]=!1,null==(r=i[e])||r.forEach((([e,r])=>r(t))),t}))):Promise.resolve(u.byUrl[e])},f=e=>(o=(new Date).valueOf(),e);return{state:u,fetch:c,get:e=>(c(e),u.byUrl[e]),markStale:f,post:(e,r)=>t.post(e,n(r)).then(f),put:(e,r)=>t.put(e,n(r)).then(f),delete:(e,r={})=>t.delete(e,{data:r}).then(f),isLoading:e=>u.loading[e]}};var Ze=(e,t={})=>{const{append_slash:r=!0,fromServer:n,toServer:o}=t,i=r?"/":"",s=t.collection_slug||`${e}s`,c=t.client||Ye(),f=t.api||Qe({client:c,fromServer:n,toServer:o}),l=t=>{const r=t.id?`${e}/${t.id}${i}`:`${e}${i}`;return f.post(r,t)},p={};return{api:f,save:l,bounceSave:e=>{p[e.id]||(p[e.id]=P((e=>l(e)),1e3)),p[e.id](e)},getOne:t=>f.get(`${e}/${t}${i}`),fetchOne:t=>f.fetch(`${e}/${t}${i}`),getPage:({page:e,limit:t=25,query:r={}}={})=>{const n=u.stringify(a({page:e,limit:t},r));return f.get(`${s}${i}?${n}`)},fetchPage:({page:e,limit:t=25,query:r={}}={})=>{const n=u.stringify(a({page:e,limit:t},r));return f.fetch(`${s}${i}?${n}`)},delete:({id:t})=>f.delete(`${e}/${t}${i}`)}},et={LocalStorage:m,ReactiveLocalStorage:h,MemoryStorage:l,RestStorage:Ze,ReactiveRestApi:Qe,getClient:Ye};export default et;export{m as LocalStorage,l as MemoryStorage,h as ReactiveLocalStorage,Qe as ReactiveRestApi,Ze as RestStorage,Ye as getClient};
