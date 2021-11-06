var __defProp=Object.defineProperty,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(e,t,r)=>t in e?__defProp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,__spreadValues=(e,t)=>{for(var r in t||(t={}))__hasOwnProp.call(t,r)&&__defNormalProp(e,r,t[r]);if(__getOwnPropSymbols)for(var r of __getOwnPropSymbols(t))__propIsEnum.call(t,r)&&__defNormalProp(e,r,t[r]);return e},__objRest=(e,t)=>{var r={};for(var n in e)__hasOwnProp.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&__getOwnPropSymbols)for(var n of __getOwnPropSymbols(e))t.indexOf(n)<0&&__propIsEnum.call(e,n)&&(r[n]=e[n]);return r};!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("vue"),require("querystring")):"function"==typeof define&&define.amd?define(["exports","vue","querystring"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self)["@unrest/vue-storage"]={},e.Vue,e.querystring)}(this,(function(e,t,r){"use strict";function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=n(r);const a=e=>new Promise((t=>{setTimeout((()=>t(e())),0)})),i={makePaginator:({items:e,page:t,per_page:r})=>({pages:Math.ceil(e.length/r),items:e.slice((t-1)*r,t*r),total:e.length,page:t}),prepareItem:(e,t)=>{var r=__objRest(e,[]);return r.id||(r.created=(new Date).valueOf(),r.id=t()),r.updated=(new Date).valueOf(),r}};var s=(e,r={})=>{const{makePaginator:n=i.makePaginator,prepareItem:o=i.prepareItem,initial:s={},afterSave:u=(()=>{}),fromServer:c=(e=>e),toServer:f=(e=>e)}=r;let l=(Math.max(0,...Object.keys(s).map(Number))||0)+1;const p=t.reactive(s),d=e=>c(p[e]),h=({page:e=1,per_page:t=25,query:r={}}={})=>{let o=Object.values(p).map(c);return Object.entries(r).forEach((([e,t])=>{o=o.filter((r=>r[e]===t))})),n({items:o,per_page:t,page:e})};return{_state:p,getOne:d,getPage:h,fetchOne:e=>Promise.resolve(d(e)),fetchPage:e=>Promise.resolve(h(e)),save:e=>a((()=>(e=f(o(e,(()=>l++))),p[e.id]=e,u(p),e))),delete:({id:e})=>a((()=>{delete p[e],u(p)}))}},u="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},c={get:function(e){if(!localStorage)return null;try{return JSON.parse(localStorage.getItem(e))}catch(t){return null}},set:function(e,t){if(!localStorage)return null;try{var r=JSON.stringify(t);return localStorage.setItem(e,r),r}catch(n){return null}},remove:function(e){if(!localStorage)return null;try{return localStorage.removeItem(e),!0}catch(t){return null}},clear:function(){if(!localStorage)return null;try{return localStorage.clear(),!0}catch(e){return null}}};const f=(e={})=>{const{LS_KEY:r,initial:n={},ls:o=c}=e,a=t.reactive(o.get(r)||n);return{state:a,save:e=>{Object.assign(a,e),o.set(r,a)}}};var l=(e,t={})=>{var r=t,{ls:n=c}=r,o=__objRest(r,["ls"]);const a=`LocalStorage:${e}`;o.initial=n.get(a)||o.initial,o.afterSave=e=>n.set(a,e);const i=s(0,o);return i.LS_KEY=a,i},p=/^\s+|\s+$/g,d=/^[-+]0x[0-9a-f]+$/i,h=/^0b[01]+$/i,m=/^0o[0-7]+$/i,g=parseInt,y="object"==typeof u&&u&&u.Object===Object&&u,v="object"==typeof self&&self&&self.Object===Object&&self,b=y||v||Function("return this")(),w=Object.prototype.toString,S=Math.max,O=Math.min,_=function(){return b.Date.now()};function j(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function E(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==w.call(e)}(e))return NaN;if(j(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=j(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(p,"");var r=h.test(e);return r||m.test(e)?g(e.slice(2),r?2:8):d.test(e)?NaN:+e}var x=function(e,t,r){var n,o,a,i,s,u,c=0,f=!1,l=!1,p=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function d(t){var r=n,a=o;return n=o=void 0,c=t,i=e.apply(a,r)}function h(e){return c=e,s=setTimeout(g,t),f?d(e):i}function m(e){var r=e-u;return void 0===u||r>=t||r<0||l&&e-c>=a}function g(){var e=_();if(m(e))return y(e);s=setTimeout(g,function(e){var r=t-(e-u);return l?O(r,a-(e-c)):r}(e))}function y(e){return s=void 0,p&&n?d(e):(n=o=void 0,i)}function v(){var e=_(),r=m(e);if(n=arguments,o=this,u=e,r){if(void 0===s)return h(u);if(l)return s=setTimeout(g,t),d(u)}return void 0===s&&(s=setTimeout(g,t)),i}return t=E(t)||0,j(r)&&(f=!!r.leading,a=(l="maxWait"in r)?S(E(r.maxWait)||0,t):a,p="trailing"in r?!!r.trailing:p),v.cancel=function(){void 0!==s&&clearTimeout(s),c=0,n=u=o=s=void 0},v.flush=function(){return void 0===s?i:y(_())},v},P={exports:{}},R=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}},C=R,N=Object.prototype.toString;function T(e){return"[object Array]"===N.call(e)}function A(e){return void 0===e}function U(e){return null!==e&&"object"==typeof e}function L(e){if("[object Object]"!==N.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function $(e){return"[object Function]"===N.call(e)}function k(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),T(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}var q={isArray:T,isArrayBuffer:function(e){return"[object ArrayBuffer]"===N.call(e)},isBuffer:function(e){return null!==e&&!A(e)&&null!==e.constructor&&!A(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:U,isPlainObject:L,isUndefined:A,isDate:function(e){return"[object Date]"===N.call(e)},isFile:function(e){return"[object File]"===N.call(e)},isBlob:function(e){return"[object Blob]"===N.call(e)},isFunction:$,isStream:function(e){return U(e)&&$(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:k,merge:function e(){var t={};function r(r,n){L(t[n])&&L(r)?t[n]=e(t[n],r):L(r)?t[n]=e({},r):T(r)?t[n]=r.slice():t[n]=r}for(var n=0,o=arguments.length;n<o;n++)k(arguments[n],r);return t},extend:function(e,t,r){return k(t,(function(t,n){e[n]=r&&"function"==typeof t?C(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}},B=q;function D(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var I=function(e,t,r){if(!t)return e;var n;if(r)n=r(t);else if(B.isURLSearchParams(t))n=t.toString();else{var o=[];B.forEach(t,(function(e,t){null!=e&&(B.isArray(e)?t+="[]":e=[e],B.forEach(e,(function(e){B.isDate(e)?e=e.toISOString():B.isObject(e)&&(e=JSON.stringify(e)),o.push(D(t)+"="+D(e))})))})),n=o.join("&")}if(n){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+n}return e},F=q;function M(){this.handlers=[]}M.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},M.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},M.prototype.forEach=function(e){F.forEach(this.handlers,(function(t){null!==t&&e(t)}))};var H=M,z=q,V=function(e){return!(!e||!e.__CANCEL__)},J=q,X=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e},K=function(e,t,r,n,o){var a=new Error(e);return X(a,t,r,n,o)},W=K,Y=q,G=Y.isStandardBrowserEnv()?{write:function(e,t,r,n,o,a){var i=[];i.push(e+"="+encodeURIComponent(t)),Y.isNumber(r)&&i.push("expires="+new Date(r).toGMTString()),Y.isString(n)&&i.push("path="+n),Y.isString(o)&&i.push("domain="+o),!0===a&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}},Q=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)},Z=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e},ee=q,te=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],re=q,ne=re.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function n(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=n(window.location.href),function(t){var r=re.isString(t)?n(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0},oe=q,ae=function(e,t,r){var n=r.config.validateStatus;r.status&&n&&!n(r.status)?t(W("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)},ie=G,se=I,ue=function(e,t){return e&&!Q(t)?Z(e,t):t},ce=function(e){var t,r,n,o={};return e?(ee.forEach(e.split("\n"),(function(e){if(n=e.indexOf(":"),t=ee.trim(e.substr(0,n)).toLowerCase(),r=ee.trim(e.substr(n+1)),t){if(o[t]&&te.indexOf(t)>=0)return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([r]):o[t]?o[t]+", "+r:r}})),o):o},fe=ne,le=K,pe=function(e){return new Promise((function(t,r){var n=e.data,o=e.headers;oe.isFormData(n)&&delete o["Content-Type"];var a=new XMLHttpRequest;if(e.auth){var i=e.auth.username||"",s=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(i+":"+s)}var u=ue(e.baseURL,e.url);if(a.open(e.method.toUpperCase(),se(u,e.params,e.paramsSerializer),!0),a.timeout=e.timeout,a.onreadystatechange=function(){if(a&&4===a.readyState&&(0!==a.status||a.responseURL&&0===a.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in a?ce(a.getAllResponseHeaders()):null,o={data:e.responseType&&"text"!==e.responseType?a.response:a.responseText,status:a.status,statusText:a.statusText,headers:n,config:e,request:a};ae(t,r,o),a=null}},a.onabort=function(){a&&(r(le("Request aborted",e,"ECONNABORTED",a)),a=null)},a.onerror=function(){r(le("Network Error",e,null,a)),a=null},a.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(le(t,e,"ECONNABORTED",a)),a=null},oe.isStandardBrowserEnv()){var c=(e.withCredentials||fe(u))&&e.xsrfCookieName?ie.read(e.xsrfCookieName):void 0;c&&(o[e.xsrfHeaderName]=c)}if("setRequestHeader"in a&&oe.forEach(o,(function(e,t){void 0===n&&"content-type"===t.toLowerCase()?delete o[t]:a.setRequestHeader(t,e)})),oe.isUndefined(e.withCredentials)||(a.withCredentials=!!e.withCredentials),e.responseType)try{a.responseType=e.responseType}catch(f){if("json"!==e.responseType)throw f}"function"==typeof e.onDownloadProgress&&a.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&a.upload&&a.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){a&&(a.abort(),r(e),a=null)})),n||(n=null),a.send(n)}))},de=q,he=function(e,t){J.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))},me={"Content-Type":"application/x-www-form-urlencoded"};function ge(e,t){!de.isUndefined(e)&&de.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var ye,ve={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(ye=pe),ye),transformRequest:[function(e,t){return he(t,"Accept"),he(t,"Content-Type"),de.isFormData(e)||de.isArrayBuffer(e)||de.isBuffer(e)||de.isStream(e)||de.isFile(e)||de.isBlob(e)?e:de.isArrayBufferView(e)?e.buffer:de.isURLSearchParams(e)?(ge(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):de.isObject(e)?(ge(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(t){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};ve.headers={common:{Accept:"application/json, text/plain, */*"}},de.forEach(["delete","get","head"],(function(e){ve.headers[e]={}})),de.forEach(["post","put","patch"],(function(e){ve.headers[e]=de.merge(me)}));var be=ve,we=q,Se=function(e,t,r){return z.forEach(r,(function(r){e=r(e,t)})),e},Oe=V,_e=be;function je(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var Ee=q,xe=function(e,t){t=t||{};var r={},n=["url","method","data"],o=["headers","auth","proxy","params"],a=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],i=["validateStatus"];function s(e,t){return Ee.isPlainObject(e)&&Ee.isPlainObject(t)?Ee.merge(e,t):Ee.isPlainObject(t)?Ee.merge({},t):Ee.isArray(t)?t.slice():t}function u(n){Ee.isUndefined(t[n])?Ee.isUndefined(e[n])||(r[n]=s(void 0,e[n])):r[n]=s(e[n],t[n])}Ee.forEach(n,(function(e){Ee.isUndefined(t[e])||(r[e]=s(void 0,t[e]))})),Ee.forEach(o,u),Ee.forEach(a,(function(n){Ee.isUndefined(t[n])?Ee.isUndefined(e[n])||(r[n]=s(void 0,e[n])):r[n]=s(void 0,t[n])})),Ee.forEach(i,(function(n){n in t?r[n]=s(e[n],t[n]):n in e&&(r[n]=s(void 0,e[n]))}));var c=n.concat(o).concat(a).concat(i),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===c.indexOf(e)}));return Ee.forEach(f,u),r},Pe=q,Re=I,Ce=H,Ne=function(e){return je(e),e.headers=e.headers||{},e.data=Se(e.data,e.headers,e.transformRequest),e.headers=we.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),we.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||_e.adapter)(e).then((function(t){return je(e),t.data=Se(t.data,t.headers,e.transformResponse),t}),(function(t){return Oe(t)||(je(e),t&&t.response&&(t.response.data=Se(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))},Te=xe;function Ae(e){this.defaults=e,this.interceptors={request:new Ce,response:new Ce}}Ae.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=Te(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[Ne,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},Ae.prototype.getUri=function(e){return e=Te(this.defaults,e),Re(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},Pe.forEach(["delete","get","head","options"],(function(e){Ae.prototype[e]=function(t,r){return this.request(Te(r||{},{method:e,url:t,data:(r||{}).data}))}})),Pe.forEach(["post","put","patch"],(function(e){Ae.prototype[e]=function(t,r,n){return this.request(Te(n||{},{method:e,url:t,data:r}))}}));var Ue=Ae;function Le(e){this.message=e}Le.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},Le.prototype.__CANCEL__=!0;var $e=Le,ke=$e;function qe(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new ke(e),t(r.reason))}))}qe.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},qe.source=function(){var e;return{token:new qe((function(t){e=t})),cancel:e}};var Be=qe,De=q,Ie=R,Fe=Ue,Me=xe;function He(e){var t=new Fe(e),r=Ie(Fe.prototype.request,t);return De.extend(r,Fe.prototype,t),De.extend(r,t),r}var ze=He(be);ze.Axios=Fe,ze.create=function(e){return He(Me(ze.defaults,e))},ze.Cancel=$e,ze.CancelToken=Be,ze.isCancel=V,ze.all=function(e){return Promise.all(e)},ze.spread=function(e){return function(t){return e.apply(null,t)}},ze.isAxiosError=function(e){return"object"==typeof e&&!0===e.isAxiosError},P.exports=ze,P.exports.default=ze;var Ve=P.exports;const Je=()=>{const e=Ve.create({baseURL:"/api/",transformRequest(e,t){const r=((e="")=>{var t;return(null==(t=e.match(/csrftoken=([^;]+)/))?void 0:t[1])||""})("undefined"==typeof document?"":document.cookie);return t.delete["X-CSRFToken"]=r,t.post["X-CSRFToken"]=r,t.post["Content-Type"]="application/json",JSON.stringify(e)}});return e.interceptors.response.use((e=>e.data),(e=>{throw e})),e},Xe=e=>e,Ke=(e={})=>{const{client:r=Je(),fromServer:n=Xe,toServer:o=Xe}=e;let a=(new Date).valueOf();const i={},s={},u=t.reactive({loading:{},byUrl:{},byId:{}}),c=e=>{const t=a>i[e]||!u.byUrl[e];if(u.loading[e]){s[e]=s[e]||[];return new Promise(((t,r)=>s[e].push([t,r])))}return t?(u.loading[e]=!0,r.get(e).then((t=>{var r;return i[e]=(new Date).valueOf(),u.byUrl[e]=t,t.id?u.byId[t.id]=n(t):t.items?t.items.forEach((e=>u.byId[e.id]=n(e))):u.byUrl[e]=n(t),u.loading[e]=!1,null==(r=s[e])||r.forEach((([e])=>e(t))),t})).catch((t=>{var r;throw u.loading[e]=!1,null==(r=s[e])||r.forEach((([e,r])=>r(t))),t}))):Promise.resolve(u.byUrl[e])},f=e=>(a=(new Date).valueOf(),e);return{state:u,fetch:c,get:e=>(c(e),u.byUrl[e]),markStale:f,post:(e,t)=>r.post(e,o(t)).then(f),put:(e,t)=>r.put(e,o(t)).then(f),delete:(e,t={})=>r.delete(e,{data:t}).then(f),isLoading:e=>u.loading[e]}};var We=(e,t={})=>{const{append_slash:r=!0,fromServer:n,toServer:a}=t,i=r?"/":"",s=t.collection_slug||`${e}s`,u=t.client||Je(),c=t.api||Ke({client:u,fromServer:n,toServer:a}),f=t=>{const r=t.id?`${e}/${t.id}${i}`:`${e}${i}`;return c.post(r,t)},l={};return{api:c,save:f,bounceSave:e=>{l[e.id]||(l[e.id]=x((e=>f(e)),1e3)),l[e.id](e)},getOne:t=>c.get(`${e}/${t}${i}`),fetchOne:t=>c.fetch(`${e}/${t}${i}`),getPage:({page:e,limit:t=25,query:r={}}={})=>{const n=o.default.stringify(__spreadValues({page:e,limit:t},r));return c.get(`${s}${i}?${n}`)},fetchPage:({page:e,limit:t=25,query:r={}}={})=>{const n=o.default.stringify(__spreadValues({page:e,limit:t},r));return c.fetch(`${s}${i}?${n}`)},delete:({id:t})=>c.delete(`${e}/${t}${i}`)}},Ye={LocalStorage:l,ReactiveLocalStorage:f,MemoryStorage:s,RestStorage:We,ReactiveRestApi:Ke,getClient:Je};e.LocalStorage=l,e.MemoryStorage=s,e.ReactiveLocalStorage=f,e.ReactiveRestApi=Ke,e.RestStorage=We,e.default=Ye,e.getClient=Je,Object.defineProperty(e,"__esModule",{value:!0}),e[Symbol.toStringTag]="Module"}));
