/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$1=Symbol(),o$3=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s$1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$3.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$1),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce(((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1]),t[0]);return new n$3(o,t,s$1)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:r$3,getOwnPropertyNames:h$1,getOwnPropertySymbols:o$2,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),y$1={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y$1){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e$1(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$3(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...h$1(t),...o$2(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f$1)(this[t],s))return;this.P(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$ET());}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$ET(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i);}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU();}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU();}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d$1("elementProperties")]=new Map,b[d$1("finalized")]=new Map,p$1?.({ReactiveElement:b}),(a$1.reactiveElementVersions??=[]).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t$1.trustedTypes,s=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e="$lit$",h=`lit$${Math.random().toFixed(9).slice(2)}$`,o$1="?"+h,n$1=`<${o$1}>`,r$2=document,l=()=>r$2.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,a=Array.isArray,u=t=>a(t)||"function"==typeof t?.[Symbol.iterator],d="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,_=/>/g,m=RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),p=/'/g,g=/"/g,$=/^(?:script|style|textarea|title)$/i,y=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=y(1),T=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),A=new WeakMap,C=r$2.createTreeWalker(r$2,129);function P(t,i){if(!a(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==s?s.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,o=[];let r,l=2===i?"<svg>":3===i?"<math>":"",c=f;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,y=0;for(;y<s.length&&(c.lastIndex=y,u=c.exec(s),null!==u);)y=c.lastIndex,c===f?"!--"===u[1]?c=v:void 0!==u[1]?c=_:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),c=m):void 0!==u[3]&&(c=m):c===m?">"===u[0]?(c=r??f,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?m:'"'===u[3]?g:p):c===g||c===p?c=m:c===v||c===_?c=f:(c=m,r=void 0);const x=c===m&&t[i+1].startsWith("/>")?" ":"";l+=c===f?s+n$1:d>=0?(o.push(a),s.slice(0,d)+e+s.slice(d)+h+x):s+h+(-2===d?i:x);}return [P(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),o]};class N{constructor({strings:t,_$litType$:s},n){let r;this.parts=[];let c=0,a=0;const u=t.length-1,d=this.parts,[f,v]=V(t,s);if(this.el=N.createElement(f,n),C.currentNode=this.el.content,2===s||3===s){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=C.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(e)){const i=v[a++],s=r.getAttribute(t).split(h),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:c,name:e[2],strings:s,ctor:"."===e[1]?H:"?"===e[1]?I:"@"===e[1]?L:k}),r.removeAttribute(t);}else t.startsWith(h)&&(d.push({type:6,index:c}),r.removeAttribute(t));if($.test(r.tagName)){const t=r.textContent.split(h),s=t.length-1;if(s>0){r.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)r.append(t[i],l()),C.nextNode(),d.push({type:2,index:++c});r.append(t[s],l());}}}else if(8===r.nodeType)if(r.data===o$1)d.push({type:2,index:c});else {let t=-1;for(;-1!==(t=r.data.indexOf(h,t+1));)d.push({type:7,index:c}),t+=h.length-1;}c++;}}static createElement(t,i){const s=r$2.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){if(i===T)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=c(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=S(t,h._$AS(t,i.values),h,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??r$2).importNode(i,!0);C.currentNode=e;let h=C.nextNode(),o=0,n=0,l=s[0];for(;void 0!==l;){if(o===l.index){let i;2===l.type?i=new R(h,h.nextSibling,this,t):1===l.type?i=new l.ctor(h,l.name,l.strings,this,t):6===l.type&&(i=new z(h,this,t)),this._$AV.push(i),l=s[++n];}o!==l?.index&&(h=C.nextNode(),o++);}return C.currentNode=r$2,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),c(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):u(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==E&&c(this._$AH)?this._$AA.nextSibling.data=t:this.T(r$2.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=N.createElement(P(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new M(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=A.get(t.strings);return void 0===i&&A.set(t.strings,i=new N(t)),i}k(t){a(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new R(this.O(l()),this.O(l()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=E;}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=S(this,t,i,0),o=!c(t)||t!==this._$AH&&t!==T,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=S(this,e[s+n],i,n),r===T&&(r=this._$AH[n]),o||=!c(r)||r!==this._$AH[n],r===E?t=E:t!==E&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===E?void 0:t;}}class I extends k{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E);}}class L extends k{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=S(this,t,i,0)??E)===T)return;const s=this._$AH,e=t===E&&s!==E||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==E&&(s===E||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const j=t$1.litHtmlPolyfillSupport;j?.(N,R),(t$1.litHtmlVersions??=[]).push("3.2.1");const B=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new R(i.insertBefore(l(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let r$1 = class r extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=B(s,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1);}render(){return T}};r$1._$litElement$=!0,r$1["finalized"]=!0,globalThis.litElementHydrateSupport?.({LitElement:r$1});const i=globalThis.litElementPolyfillSupport;i?.({LitElement:r$1});(globalThis.litElementVersions??=[]).push("4.1.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{void 0!==o?o.addInitializer((()=>{customElements.define(t,e);})):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:!0,type:String,converter:u$1,reflect:!1,hasChanged:f$1},r=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.P(o,void 0,t),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:!0}:t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

var suncalc = {exports: {}};

/*
 (c) 2011-2015, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 https://github.com/mourner/suncalc
*/

(function (module, exports) {
	(function () {
	// shortcuts for easier to read formulas

	var PI   = Math.PI,
	    sin  = Math.sin,
	    cos  = Math.cos,
	    tan  = Math.tan,
	    asin = Math.asin,
	    atan = Math.atan2,
	    acos = Math.acos,
	    rad  = PI / 180;

	// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


	// date/time constants and conversions

	var dayMs = 1000 * 60 * 60 * 24,
	    J1970 = 2440588,
	    J2000 = 2451545;

	function toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }
	function fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }
	function toDays(date)   { return toJulian(date) - J2000; }


	// general calculations for position

	var e = rad * 23.4397; // obliquity of the Earth

	function rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }
	function declination(l, b)    { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }

	function azimuth(H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }
	function altitude(H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }

	function siderealTime(d, lw) { return rad * (280.16 + 360.9856235 * d) - lw; }

	function astroRefraction(h) {
	    if (h < 0) // the following formula works for positive altitudes only.
	        h = 0; // if h = -0.08901179 a div/0 would occur.

	    // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
	    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
	    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
	}

	// general sun calculations

	function solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }

	function eclipticLongitude(M) {

	    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
	        P = rad * 102.9372; // perihelion of the Earth

	    return M + C + P + PI;
	}

	function sunCoords(d) {

	    var M = solarMeanAnomaly(d),
	        L = eclipticLongitude(M);

	    return {
	        dec: declination(L, 0),
	        ra: rightAscension(L, 0)
	    };
	}


	var SunCalc = {};


	// calculates sun position for a given date and latitude/longitude

	SunCalc.getPosition = function (date, lat, lng) {

	    var lw  = rad * -lng,
	        phi = rad * lat,
	        d   = toDays(date),

	        c  = sunCoords(d),
	        H  = siderealTime(d, lw) - c.ra;

	    return {
	        azimuth: azimuth(H, phi, c.dec),
	        altitude: altitude(H, phi, c.dec)
	    };
	};


	// sun times configuration (angle, morning name, evening name)

	var times = SunCalc.times = [
	    [-0.833, 'sunrise',       'sunset'      ],
	    [  -0.3, 'sunriseEnd',    'sunsetStart' ],
	    [    -6, 'dawn',          'dusk'        ],
	    [   -12, 'nauticalDawn',  'nauticalDusk'],
	    [   -18, 'nightEnd',      'night'       ],
	    [     6, 'goldenHourEnd', 'goldenHour'  ]
	];

	// adds a custom time to the times config

	SunCalc.addTime = function (angle, riseName, setName) {
	    times.push([angle, riseName, setName]);
	};


	// calculations for sun times

	var J0 = 0.0009;

	function julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }

	function approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }
	function solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }

	function hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }
	function observerAngle(height) { return -2.076 * Math.sqrt(height) / 60; }

	// returns set time for the given sun altitude
	function getSetJ(h, lw, phi, dec, n, M, L) {

	    var w = hourAngle(h, phi, dec),
	        a = approxTransit(w, lw, n);
	    return solarTransitJ(a, M, L);
	}


	// calculates sun times for a given date, latitude/longitude, and, optionally,
	// the observer height (in meters) relative to the horizon

	SunCalc.getTimes = function (date, lat, lng, height) {

	    height = height || 0;

	    var lw = rad * -lng,
	        phi = rad * lat,

	        dh = observerAngle(height),

	        d = toDays(date),
	        n = julianCycle(d, lw),
	        ds = approxTransit(0, lw, n),

	        M = solarMeanAnomaly(ds),
	        L = eclipticLongitude(M),
	        dec = declination(L, 0),

	        Jnoon = solarTransitJ(ds, M, L),

	        i, len, time, h0, Jset, Jrise;


	    var result = {
	        solarNoon: fromJulian(Jnoon),
	        nadir: fromJulian(Jnoon - 0.5)
	    };

	    for (i = 0, len = times.length; i < len; i += 1) {
	        time = times[i];
	        h0 = (time[0] + dh) * rad;

	        Jset = getSetJ(h0, lw, phi, dec, n, M, L);
	        Jrise = Jnoon - (Jset - Jnoon);

	        result[time[1]] = fromJulian(Jrise);
	        result[time[2]] = fromJulian(Jset);
	    }

	    return result;
	};


	// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

	function moonCoords(d) { // geocentric ecliptic coordinates of the moon

	    var L = rad * (218.316 + 13.176396 * d), // ecliptic longitude
	        M = rad * (134.963 + 13.064993 * d), // mean anomaly
	        F = rad * (93.272 + 13.229350 * d),  // mean distance

	        l  = L + rad * 6.289 * sin(M), // longitude
	        b  = rad * 5.128 * sin(F),     // latitude
	        dt = 385001 - 20905 * cos(M);  // distance to the moon in km

	    return {
	        ra: rightAscension(l, b),
	        dec: declination(l, b),
	        dist: dt
	    };
	}

	SunCalc.getMoonPosition = function (date, lat, lng) {

	    var lw  = rad * -lng,
	        phi = rad * lat,
	        d   = toDays(date),

	        c = moonCoords(d),
	        H = siderealTime(d, lw) - c.ra,
	        h = altitude(H, phi, c.dec),
	        // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
	        pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));

	    h = h + astroRefraction(h); // altitude correction for refraction

	    return {
	        azimuth: azimuth(H, phi, c.dec),
	        altitude: h,
	        distance: c.dist,
	        parallacticAngle: pa
	    };
	};


	// calculations for illumination parameters of the moon,
	// based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
	// Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.

	SunCalc.getMoonIllumination = function (date) {

	    var d = toDays(date || new Date()),
	        s = sunCoords(d),
	        m = moonCoords(d),

	        sdist = 149598000, // distance from Earth to Sun in km

	        phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
	        inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
	        angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -
	                cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));

	    return {
	        fraction: (1 + cos(inc)) / 2,
	        phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
	        angle: angle
	    };
	};


	function hoursLater(date, h) {
	    return new Date(date.valueOf() + h * dayMs / 24);
	}

	// calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article

	SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
	    var t = new Date(date);
	    if (inUTC) t.setUTCHours(0, 0, 0, 0);
	    else t.setHours(0, 0, 0, 0);

	    var hc = 0.133 * rad,
	        h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
	        h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;

	    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
	    for (var i = 1; i <= 24; i += 2) {
	        h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
	        h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

	        a = (h0 + h2) / 2 - h1;
	        b = (h2 - h0) / 2;
	        xe = -b / (2 * a);
	        ye = (a * xe + b) * xe + h1;
	        d = b * b - 4 * a * h1;
	        roots = 0;

	        if (d >= 0) {
	            dx = Math.sqrt(d) / (Math.abs(a) * 2);
	            x1 = xe - dx;
	            x2 = xe + dx;
	            if (Math.abs(x1) <= 1) roots++;
	            if (Math.abs(x2) <= 1) roots++;
	            if (x1 < -1) x1 = x2;
	        }

	        if (roots === 1) {
	            if (h0 < 0) rise = i + x1;
	            else set = i + x1;

	        } else if (roots === 2) {
	            rise = i + (ye < 0 ? x2 : x1);
	            set = i + (ye < 0 ? x1 : x2);
	        }

	        if (rise && set) break;

	        h0 = h2;
	    }

	    var result = {};

	    if (rise) result.rise = hoursLater(t, rise);
	    if (set) result.set = hoursLater(t, set);

	    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;

	    return result;
	};


	// export as Node module / AMD module / browser variable
	module.exports = SunCalc;

	}()); 
} (suncalc));

var suncalcExports = suncalc.exports;

function loader() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 139.11">
                    <defs>
                        <style>
                        .loader-cls-1 {
                            fill: #898989;
                        }

                        .loader-cls-2 {
                            fill: #141414;
                        }

                        .loader-cls-3 {
                            fill: #b1b1b1;
                        }

                        .loader-cls-4 {
                            fill: #4e4e4e;
                        }

                        .loader-cls-5 {
                            fill: #767676;
                        }

                        .loader-cls-6 {
                            fill: #272727;
                        }

                        .loader-cls-7 {
                            fill: #626262;
                        }

                        .loader-cls-8 {
                            fill: #fff;
                        }

                        .loader-cls-9 {
                            fill: #3b3b3b;
                        }

                        .loader-cls-10 {
                            fill: #d8d8d8;
                        }

                        .loader-cls-11 {
                            fill: #c4c4c4;
                        }

                        .loader-cls-12 {
                            fill: #ebebeb;
                        }

                        .loader-cls-13 {
                            fill: #9d9d9d;
                        }
                        </style>
                    </defs>
                    <g id="Layer">
                        <g>
                        <circle class="loader-cls-8" cx="70" cy="11.04" r="11.04" />
                        <circle class="loader-cls-12" cx="97.94" cy="18" r="11.04" />
                        <circle class="loader-cls-10" cx="118.78" cy="36.51" r="11.04" transform="translate(-4.93 48.23) rotate(-22.5)" />
                        <circle class="loader-cls-11" cx="128.96" cy="63.01" r="11.04" />
                        <circle class="loader-cls-3" cx="125.43" cy="91.94" r="11.04" />
                        <circle class="loader-cls-13" cx="109.47" cy="114.89" r="11.04" />
                        <circle class="loader-cls-1" cx="84.63" cy="128.07" r="11.04" transform="translate(-55.35 191.1) rotate(-80.78)" />
                        <circle class="loader-cls-5" cx="55.37" cy="128.07" r="11.04" transform="translate(-74.35 76.66) rotate(-45)" />
                        <circle class="loader-cls-7" cx="30.53" cy="114.89" r="11.04" />
                        <circle class="loader-cls-4" cx="14.57" cy="91.94" r="11.04" />
                        <circle class="loader-cls-9" cx="11.04" cy="63.01" r="11.04" />
                        <circle class="loader-cls-6" cx="21.22" cy="36.51" r="11.04" transform="translate(-19.6 25.7) rotate(-45)" />
                        <circle class="loader-cls-2" cx="42.06" cy="18" r="11.04" />
                        <circle cx="70" cy="11.04" r="11.04" />
                        </g>
                        <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 70 70"
                        to="360 70 70"
                        dur="1s"
                        repeatCount="indefinite"
                        />
                    </g>
                    </svg>
          `;
}
function rainy() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380.22 370.91">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="meteo-icon-svg" d="M141.41,251.36l-32.02,55.87M172.51,286.52l-44.07,76.88M243.91,251.36l-32.02,55.87M167.63,216.29c134.94,0,103.8,0,123.38,0,45.13,0,81.7-33.46,81.7-74.74s-36.58-74.75-81.7-74.75c-5.66,0-11.2.53-16.54,1.53-15.18-35.6-53.02-60.83-97.32-60.83-57.67,0-104.42,42.77-104.42,95.53v1.38c-1.32-.08-2.66-.13-4.02-.13-33.81,0-61.22,25.08-61.22,56.01s27.41,56,61.22,56h98.91Z"/>
                </g>
                </svg>
          `;
}
function cloudeCoverage() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 358.91 295.78">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="meteo-icon-svg" d="M163.15,120.82c5.05-27.28,27.53-49.16,56.53-52.19,35.3-3.69,66.91,21.94,70.61,57.24,1.97,18.83-4.41,36.61-16.14,49.66M216.64,31.76l-2.53-24.26,2.53,24.26h0ZM167.55,50.12l-14.33-19.74,14.33,19.74h0ZM134.22,90.57l-22.28-9.93,22.28,9.93h0ZM318.5,174.53l22.28,9.94-22.28-9.94h0ZM327.14,122.84l24.26-2.54-24.26,2.54h0ZM308.79,73.74l19.74-14.33-19.74,14.33h0ZM268.34,40.41l9.93-22.28-9.93,22.28h0ZM133.38,288.28c106.07,0,81.59,0,96.99,0,35.47,0,64.22-26.31,64.22-58.76s-28.75-58.76-64.22-58.76c-4.45,0-8.8.42-13,1.21-11.93-27.99-41.68-47.82-76.5-47.82-45.33,0-82.08,33.62-82.08,75.09v1.08c-1.04-.06-2.09-.1-3.16-.1-26.58,0-48.12,19.71-48.12,44.02s21.54,44.02,48.12,44.02h77.76Z"/>
                </g>
                </svg>
          `;
}
function uvIndex() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 361.09 361.09">
                <defs>
                    <style>
                    .cls-2 {
                        fill: #fff;
                        font-family: MyriadPro-Regular, 'Myriad Pro';
                        font-size: 100px;
                    }
                    </style>
                </defs>
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="meteo-icon-svg" d="M180.54,83.01c53.87,0,97.54,43.67,97.54,97.54s-43.67,97.54-97.54,97.54-97.54-43.67-97.54-97.54,43.67-97.54,97.54-97.54h0Z"/>
                    <polyline class="meteo-icon-svg" points="181.67 7.5 181.67 41.1 181.67 41.1 181.67 7.5"/>
                    <polygon class="meteo-icon-svg" points="111.8 59.22 95 30.12 111.8 59.22 111.8 59.22"/>
                    <polygon class="meteo-icon-svg" points="60.34 109.84 31.25 93.04 60.34 109.84 60.34 109.84"/>
                    <polygon class="meteo-icon-svg" points="41.1 179.41 7.5 179.41 41.1 179.41 41.1 179.41"/>
                    <polygon class="meteo-icon-svg" points="59.21 249.29 30.11 266.09 59.21 249.29 59.21 249.29"/>
                    <polygon class="meteo-icon-svg" points="109.84 300.75 93.04 329.84 109.84 300.75 109.84 300.75"/>
                    <polygon class="meteo-icon-svg" points="179.41 319.99 179.41 353.59 179.41 319.99 179.41 319.99"/>
                    <polygon class="meteo-icon-svg" points="249.29 301.87 266.09 330.97 249.29 301.87 249.29 301.87"/>
                    <polygon class="meteo-icon-svg" points="300.74 251.25 329.84 268.05 300.74 251.25 300.74 251.25"/>
                    <polygon class="meteo-icon-svg" points="319.99 181.68 353.59 181.68 319.99 181.68 319.99 181.68"/>
                    <polygon class="meteo-icon-svg" points="301.88 111.8 330.97 95 301.88 111.8 301.88 111.8"/>
                    <polygon class="meteo-icon-svg" points="251.25 60.35 268.04 31.25 251.25 60.35 251.25 60.35"/>
                    <text class="meteo-icon-svg-cl2" transform="translate(120.14 209.9)"><tspan x="0" y="0">UV</tspan></text>
                </g>
                </svg>
          `;
}
function temperature() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 243.22 384.87">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="meteo-icon-svg" d="M92.84,7.5h.69c20.38,0,37.06,16.67,37.06,37.06v170.03c28.58,13.89,48.28,43.19,48.28,77.1,0,47.32-38.36,85.68-85.68,85.68S7.5,339.01,7.5,291.69c0-33.91,19.7-63.21,48.28-77.1V44.56c0-20.38,16.67-37.06,37.06-37.06h0ZM93.18,256.31c19.54,0,35.38,15.84,35.38,35.38s-15.84,35.38-35.38,35.38-35.38-15.84-35.38-35.38,15.84-35.38,35.38-35.38h0ZM93.18,252.69V99.36M235.72,45.34h-61.85M209.66,82.48h-35.79M235.72,119.62h-61.85M209.66,156.77h-35.79M235.72,193.91h-61.85"/>
                </g>
                </svg>
          `;
}
function clearnight() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 339.7 364.5">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="meteo-icon-svg" d="M332.2,277.32c-25.62,38.87-66.15,67.05-113.46,76.35-11.1,2.18-22.59,3.33-34.33,3.33-84.49,0-155.15-59.24-172.71-138.43-2.74-12.39-4.2-25.26-4.2-38.47C7.5,95.77,66.5,25.24,145.48,7.5c-18.39,27.9-29.11,61.31-29.11,97.23,0,97.7,79.21,176.9,176.9,176.9,13.38,0,26.4-1.49,38.93-4.31h0Z"/>
                </g>
                </svg>
          `;
}
function cloudy() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 378.11 295.31">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="meteo-icon-svg" d="M185.9,287.81c72.89,0,52.49,0,68.8,0,37.58,0,68.04-27.87,68.04-62.24s-30.46-62.24-68.04-62.24c-4.72,0-9.32.44-13.77,1.28-12.64-29.65-44.16-50.66-81.04-50.66-48.03,0-86.96,35.62-86.96,79.55v1.15c-1.1-.07-2.22-.1-3.35-.1-28.16,0-50.98,20.88-50.98,46.64s22.82,46.64,50.98,46.64h116.32ZM33.03,194.86c-15.71-13.55-25.53-32.77-25.53-54.09,0-41.05,36.37-74.31,81.23-74.31,5.63,0,11.13.53,16.44,1.52,15.09-35.4,52.72-60.48,96.76-60.48,57.34,0,103.82,42.52,103.82,94.98l-.02,1.37c1.33-.08,2.67-.12,4.02-.12,33.61,0,60.86,24.93,60.86,55.68,0,23.95-16.53,44.36-39.71,52.22"/>
                </g>
                </svg>
          `;
}
function day() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 361.09 361.09">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="meteo-icon-svg" d="M180.54,83.01c53.87,0,97.54,43.67,97.54,97.54s-43.67,97.54-97.54,97.54-97.54-43.67-97.54-97.54,43.67-97.54,97.54-97.54h0ZM181.67,41.1V7.5v33.6h0ZM111.8,59.22l-16.8-29.1,16.8,29.1h0ZM60.34,109.84l-29.1-16.8,29.1,16.8h0ZM41.1,179.41H7.5h33.6ZM59.21,249.29l-29.1,16.8,29.1-16.8h0ZM109.84,300.75l-16.8,29.1,16.8-29.1h0ZM179.41,319.99v33.6-33.6h0ZM249.29,301.87l16.8,29.1-16.8-29.1h0ZM300.74,251.25l29.1,16.8-29.1-16.8h0ZM319.99,181.68h33.6-33.6ZM301.88,111.8l29.09-16.8-29.09,16.8h0ZM251.25,60.35l16.8-29.1-16.8,29.1h0Z"/>
                </g>
                </svg>
          `;
}
function partlycloudy() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 388.11 361.09">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="meteo-icon-svg" d="M267.64,224.5c-16.07,31.79-49.04,53.59-87.1,53.59-53.87,0-97.53-43.67-97.53-97.54s43.67-97.54,97.53-97.54c22.11,0,39.94,5.3,56,17.46M181.67,41.1V7.5v33.6h0ZM111.8,59.22l-16.8-29.1,16.8,29.1h0ZM60.34,109.84l-29.1-16.8,29.1,16.8h0ZM41.1,179.42H7.5h33.6ZM59.21,249.29l-29.1,16.8,29.1-16.8h0ZM109.84,300.75l-16.8,29.1,16.8-29.1h0ZM179.41,319.99v33.6-33.6h0ZM249.29,301.87l16.8,29.1-16.8-29.1h0ZM300.75,251.25l29.1,16.8-29.1-16.8h0ZM251.25,60.35l16.8-29.1-16.8,29.1h0ZM279.72,224.41c53.74,0,38.7,0,50.72,0,27.7,0,50.16-20.54,50.16-45.89s-22.46-45.89-50.16-45.89c-3.48,0-6.88.33-10.16.94-9.32-21.86-32.56-37.35-59.75-37.35-35.41,0-64.12,26.26-64.12,58.66v.84c-.81-.05-1.63-.07-2.47-.07-20.76,0-37.59,15.39-37.59,34.39s16.83,34.39,37.59,34.39h85.77Z"/>
                </g>
                </svg>
          `;
}
function hail() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380.21 320.89">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="meteo-icon-svg" d="M291.02,216.29c45.12,0,81.7-33.46,81.7-74.74s-36.58-74.75-81.7-74.75c-5.67,0-11.2.53-16.54,1.53-15.18-35.6-53.02-60.83-97.32-60.83-57.67,0-104.42,42.77-104.42,95.53l.02,1.38c-1.33-.08-2.68-.12-4.04-.12-33.81,0-61.22,25.07-61.22,56s27.41,56,61.22,56h38.15"/>
                    <circle class="meteo-icon-svg" cx="158.23" cy="156.15" r="30.79"/>
                    <circle class="meteo-icon-svg" cx="216.54" cy="234.77" r="17.04"/>
                    <circle class="meteo-icon-svg" cx="131.36" cy="292.43" r="20.97"/>
                </g>
                </svg>
          `;
}
function lightningrainy() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380.22 370.9">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="meteo-icon-svg" d="M204.32,251.37l-32.02,55.86M235.41,286.53l-44.07,76.88M306.81,251.37l-32.02,55.86M218.99,216.29c87.52,0,52.44,0,72.02,0,45.12,0,81.7-33.46,81.7-74.75s-36.58-74.74-81.7-74.74c-5.67,0-11.2.53-16.54,1.53-15.18-35.6-53.02-60.83-97.32-60.83-57.67,0-104.42,42.77-104.42,95.53l.02,1.38c-1.34-.08-2.68-.12-4.04-.12-33.81,0-61.22,25.07-61.22,56,0,22.03,13.9,41.08,34.11,50.23M70.8,337.51l39.72-93.62-39.07.59,44.38-100.99,57.21-.15-49.62,73.39,48.82.22-101.43,120.57h0Z"/>
                </g>
                </svg>
          `;
}
function lightning() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380.22 345">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="cls-1" d="M219,216.29c87.52,0,52.44,0,72.02,0,45.12,0,81.7-33.46,81.7-74.74s-36.58-74.75-81.7-74.75c-5.67,0-11.2.53-16.54,1.53-15.18-35.6-53.02-60.83-97.32-60.83-57.67,0-104.42,42.77-104.42,95.53v1.38c-1.32-.08-2.66-.13-4.02-.13-33.81,0-61.22,25.07-61.22,56.01,0,22.02,13.9,41.08,34.11,50.23M70.81,337.5l39.71-93.63-39.06.59,44.38-100.99,57.2-.15-49.62,73.4,48.81.21-101.43,120.57h0Z"/>
                </g>
                </svg>
          `;
}
function partlycloudynight() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 367.62 364.5">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="cls-1" d="M188.35,247.17c29.35,21.65,65.64,34.46,104.93,34.46,13.38,0,26.4-1.49,38.93-4.31-25.62,38.87-66.16,67.05-113.46,76.35-11.1,2.18-22.59,3.33-34.33,3.33-84.49,0-155.15-59.24-172.71-138.43-2.74-12.39-4.2-25.26-4.2-38.47C7.5,95.77,66.5,25.24,145.47,7.5c-18.39,27.9-29.11,61.31-29.11,97.23,0,17.42,2.52,34.26,7.21,50.15M230.96,245.51c68.8,0,49.54,0,64.94,0,35.47,0,64.22-26.3,64.22-58.75s-28.75-58.76-64.22-58.76c-4.45,0-8.8.42-13,1.21-11.93-27.99-41.68-47.82-76.5-47.82-45.33,0-82.08,33.62-82.08,75.09l.02,1.08c-1.05-.06-2.11-.1-3.18-.1-26.58,0-48.12,19.71-48.12,44.02s21.54,44.02,48.12,44.02h109.8Z"/>
                </g>
                </svg>
          `;
}
function pouring() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380.22 341.95">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="cls-1" d="M101.38,253.02l-46.68,81.44M167.63,216.29c134.94,0,103.8,0,123.38,0,45.12,0,81.7-33.46,81.7-74.74s-36.58-74.74-81.7-74.74c-5.67,0-11.2.53-16.54,1.53-15.18-35.61-53.03-60.84-97.32-60.84-57.67,0-104.42,42.77-104.42,95.53l.02,1.38c-1.34-.08-2.68-.12-4.04-.12-33.81,0-61.22,25.07-61.22,56.01s27.4,56,61.22,56h98.91ZM157.19,255.12l-45.09,78.66M213,255.12l-45.1,78.66M268.8,255.12l-45.1,78.66"/>
                </g>
                </svg>
          `;
}
function snowyrainy() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380.21 351.11">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="cls-1" d="M291.02,216.29c45.12,0,81.7-33.46,81.7-74.74s-36.58-74.75-81.7-74.75c-5.67,0-11.2.53-16.54,1.53-15.18-35.6-53.02-60.83-97.32-60.83-57.67,0-104.42,42.77-104.42,95.53l.02,1.38c-1.33-.08-2.68-.12-4.04-.12-33.81,0-61.22,25.07-61.22,56s27.41,56,61.22,56h38.15"/>
                    <line class="cls-1" x1="230.73" y1="188.11" x2="230.73" y2="262.38"/>
                    <line class="cls-1" x1="262.89" y1="243.81" x2="198.57" y2="206.68"/>
                    <line class="cls-1" x1="198.57" y1="243.81" x2="262.89" y2="206.68"/>
                    <line class="cls-1" x1="87.02" y1="248.3" x2="42.95" y2="325.17"/>
                    <line class="cls-1" x1="158.42" y1="213.14" x2="126.4" y2="269"/>
                    <line class="cls-1" x1="180.4" y1="292.11" x2="180.4" y2="343.61"/>
                    <line class="cls-1" x1="202.7" y1="330.74" x2="158.1" y2="304.99"/>
                    <line class="cls-1" x1="158.1" y1="330.74" x2="202.7" y2="304.99"/>
                </g>
                </svg>
          `;
}
function windyvariant() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 356.02 280.76">
                <g id="Livello_1-2" data-name="Livello_1">
                    <path class="cls-1" d="M291.02,66.8c-5.67,0-11.2.53-16.54,1.53-15.18-35.6-53.02-60.83-97.32-60.83-57.67,0-104.42,42.77-104.42,95.53l.02,1.38c-1.34-.08-2.68-.12-4.04-.12-33.81,0-61.22,25.07-61.22,56.01s27.41,56,61.22,56h51.5"/>
                    <g>
                    <path class="cls-1" d="M348.22,184.2h-192.03c-20.45,0-37.03-16.58-37.03-37.03s16.58-37.03,37.03-37.03c10.23,0,19.49,4.15,26.19,10.85,6.7,6.7,10.85,15.96,10.85,26.18"/>
                    <path class="cls-1" d="M309.75,211.05h-118.17c-17.18,0-31.1,13.93-31.1,31.1s13.93,31.1,31.1,31.1,31.1-13.93,31.1-31.1"/>
                    <path class="cls-1" d="M348.52,157.27h-107.28c-14.65,0-26.53-11.88-26.53-26.53,0-14.65,11.88-26.53,26.53-26.53,7.33,0,13.96,2.97,18.76,7.77,4.8,4.8,7.77,11.43,7.77,18.76"/>
                    </g>
                </g>
                </svg>
          `;
}
function windy() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 423.96 316.44">
                <g id="Livello_1-2" data-name="Livello_1">
                    <g>
                    <path class="cls-1" d="M284.4,84.11c0-18.24,7.39-34.74,19.34-46.69,11.95-11.95,28.46-19.35,46.69-19.35,36.47,0,66.03,29.56,66.03,66.03s-29.56,66.03-66.03,66.03H8.03"/>
                    <path class="cls-1" d="M231.88,253.48c0,30.63,24.83,55.46,55.46,55.46s55.46-24.83,55.46-55.46-24.83-55.46-55.46-55.46H76.63"/>
                    <path class="cls-1" d="M151.47,54.81c0-13.06,5.29-24.89,13.86-33.45,8.56-8.56,20.39-13.86,33.45-13.86,26.13,0,47.31,21.18,47.31,47.31s-21.18,47.31-47.31,47.31H7.5"/>
                    </g>
                </g>
                </svg>
          `;
}
function fog() {
  return x`<svg id="Livello_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 445.43 211.55">
                <g id="Livello_1-2" data-name="Livello_1">
                    <g>
                    <line class="cls-1" x1="7.5" y1="204.05" x2="281.18" y2="204.05"/>
                    <line class="cls-1" x1="59.75" y1="164.74" x2="383.19" y2="164.74"/>
                    <line class="cls-1" x1="17.45" y1="125.43" x2="313.53" y2="125.43"/>
                    <line class="cls-1" x1="159.27" y1="86.12" x2="437.93" y2="86.12"/>
                    <line class="cls-1" x1="72.19" y1="46.81" x2="286.16" y2="46.81"/>
                    <line class="cls-1" x1="146.83" y1="7.5" x2="370.75" y2="7.5"/>
                    </g>
                </g>
                </svg>
          `;
}

function pvIcon(state) {
  return x`
        <svg id="Livello_1" xmlns="http://www.w3.org/2000/svg"  version="1.1" viewBox="0 0 200 200">
          <defs>
            <style>
              .st0 {
                fill: #465e5e;
              }

              .st1 {
                fill: #fffeff;
              }

              .st3 {
                fill: #5e7574;
              }

              .st4 {
                fill: #4d636c;
              }

              .st5 {
                fill: #7b908e;
              }

              .st6 {
                fill: #b1bfbe;
              }

              .st7 {
                fill: #91a3a2;
              }
            </style>
          </defs>
          <g id="Oggetto_generativo">
            <g>
            <foreignObject id="foreign" class="st1" x="25" y="158" width="152" height="34">
                <div xmlns="http://www.w3.org/1999/xhtml" 
                  style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                  font-size: 34px;
                  text-align: center;
                  ">
              <!-- Inserisci qui il contenuto che desideri -->
              <p>${state}w</p>
            </div>
          </foreignObject>
              <g>
                <polygon class="st1" points="33.01 96.79 166.88 96.79 167 104.87 108.14 105.22 108.02 118.91 123.58 119.03 123.58 130.96 76.31 130.96 76.31 119.03 91.87 118.91 91.75 105.22 33.24 105.22 33.01 96.79"/>
                <path class="st4" d="M166.53,93.52c.02.43.58,2.25.12,2.57H33.01c-1.27-4.06,4.46-1.53,6.67-2.57h126.85Z"/>
                <g>
                  <path class="st1" d="M166.53,93.52H33.48l-.35-.59,12.29-52.31h109.06l12.29,52.07c.06.52-.24.64-.23.82Z"/>
                  <polygon class="st5" points="136.22 78.77 158.93 78.77 161.85 90.82 138.1 91.17 136.22 78.77"/>
                  <polygon class="st5" points="100.41 78.77 122.41 78.77 123.7 91.06 100.41 91.17 100.41 78.77"/>
                  <polygon class="st0" points="41.2 78.77 63.2 78.77 61.91 90.82 38.39 91.17 41.2 78.77"/>
                  <polygon class="st3" points="77.01 78.77 98.54 79 98.66 91.06 75.84 91.17 77.01 78.77"/>
                  <polygon class="st7" points="134.12 65.9 156.12 65.9 158.81 77.48 135.99 77.83 134.12 65.9"/>
                  <polygon class="st5" points="99.95 65.9 121.24 65.9 122.53 77.48 100.18 77.83 99.95 65.9"/>
                  <polygon class="st5" points="77.71 65.9 98.54 65.9 98.66 77.72 76.78 77.6 77.71 65.9"/>
                  <polygon class="st0" points="43.54 65.9 64.84 65.9 63.55 77.48 41.2 77.6 43.54 65.9"/>
                  <polygon class="st7" points="132.48 53.96 153.54 53.96 156 64.61 133.88 64.73 132.48 53.96"/>
                  <polygon class="st7" points="100.18 53.96 120.07 53.96 121.36 64.61 99.95 64.73 100.18 53.96"/>
                  <polygon class="st3" points="46.12 53.96 66.48 54.2 65.19 64.61 44.01 64.73 46.12 53.96"/>
                  <polygon class="st5" points="78.65 53.96 98.54 53.96 98.66 64.61 77.71 64.73 78.65 53.96"/>
                  <polygon class="st6" points="130.84 42.73 151.44 42.73 153.43 52.91 132.24 53.03 130.84 42.73"/>
                  <polygon class="st7" points="100.41 42.73 119.14 42.73 120.19 52.91 99.95 53.03 99.83 43.08 100.41 42.73"/>
                  <path class="st5" d="M88.48,42.73c1.28-.04,10.19-.15,10.41.35l-.35,9.95-20.01-.12.7-9.83c3.08-.03,6.18-.26,9.24-.35Z"/>
                  <path class="st3" d="M67.18,42.73c.2.02.47-.09.59.12l-1.29,10.18-20.24-.35,1.99-9.71,18.96-.23Z"/>
                  <polygon class="st5" points="124.05 78.77 134.7 79.12 136.22 91.17 125.11 91.06 124.05 78.77"/>
                  <polygon class="st3" points="64.84 78.77 75.25 79.12 73.97 91.17 63.32 91.06 64.84 78.77"/>
                  <polygon class="st7" points="122.65 65.9 132.83 66.02 134.35 77.83 123.7 77.48 122.65 65.9"/>
                  <polygon class="st3" points="66.24 65.9 76.42 66.02 75.14 77.83 64.96 77.72 66.24 65.9"/>
                  <polygon class="st5" points="67.88 53.96 77.36 54.31 76.31 64.73 66.36 64.61 67.88 53.96"/>
                  <polygon class="st7" points="121.71 53.96 130.84 53.96 132.6 64.61 122.65 64.73 121.71 53.96"/>
                  <polygon class="st5" points="69.29 42.73 78.3 43.08 77.24 53.03 67.77 52.67 69.29 42.73"/>
                  <path class="st6" d="M120.78,42.73l8.78.12,1.05,10.18-9.24-.12c-.09-1.37-1.42-9.79-.59-10.18Z"/>
                </g>
              </g>
            </g>
          </g>
        </svg>
    `;
}
function battery(state, batteryPercentageState, batterMode) {
  return x`
<svg id="Battery" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
  <defs>
    <style>
      .battBackground {
        fill: ${batteryPercentageState > 23 ? '#009245' : 'red'};
        ${batterMode == "discharge" && state != 0 ? 'animation: slide-in-out 2s infinite;' : ' '}
    </style>
    <linearGradient id="Sfumatura_icon" data-name="Sfumatura icon" x1="5.79" y1="-680" x2="5.79" y2="-560" gradientTransform="translate(-520 80) rotate(90)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#e7dfdc"/>
      <stop offset="1" stop-color="#b8b9ba"/>
    </linearGradient>
  </defs>
  <text class="white font43" transform="translate(51.09 175.53)"><tspan x="0" y="0">${state}w</tspan></text>
  <rect id="back_x5F_battery" class="battBackground" x="65" y="50" width="60" height="${batteryPercentageState}" transform="translate(-5 195) rotate(-90)"/>
  <path id="battery" class="battColor" d="M150,129v-14h5.52c2.47,0,4.48-2.01,4.48-4.48v-21.04c0-2.47-2.01-4.48-4.48-4.48h-5.52v-14c0-3.31-2.69-6-6-6H46c-3.31,0-6,2.69-6,6v58c0,3.31,2.69,6,6,6h98c3.31,0,6-2.69,6-6ZM49,130c-2.21,0-4-1.79-4-4v-52c0-2.21,1.79-4,4-4h17v60h-17ZM69,130v-60h24v60h-24ZM96,130v-60h24v60h-24ZM123,130v-60h18c2.21,0,4,1.79,4,4v52c0,2.21-1.79,4-4,4h-18Z"/>
  <text id="percentage" class="white font36" transform="translate(67.28 52)"><tspan x="0" y="0">${batteryPercentageState}%</tspan></text>
  </svg>
     `;
}
function gridPower(gridPower, gridEnergyState) {
  return x`
        <svg id="grid" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200">
          <style>
            .toparrow {
            fill: #ff0;
            opacity: ${gridEnergyState == "sell" ? "0.7" : "0"};
            }

            .leftarrow {
            fill: #ff0;
            opacity: ${gridEnergyState == "buy" ? "0.7" : "0"};
            }
          </style>
          <g id="traliccio" class="opcity76">
            <path class="gridIconColor" d="M76.91,77.4s0,.03,0,.05c0,.16-.03.31-.09.44h13.01v-.49h-12.92Z"/>
            <path class="gridIconColor" d="M122.86,77.45s0-.03,0-.05h-12.53v.49h12.62c-.06-.14-.09-.28-.09-.44"/>
            <path class="gridIconColor" d="M145.85,74.14s-.03-.01-.04-.01l-14.43,2.54c.13.12.22.28.28.45l14.17-2.49s.04-.02.04-.05v-.4s0-.03-.02-.04"/>
            <path class="gridIconColor" d="M68.43,76.63l-14.24-2.51s-.03,0-.04.01c-.01,0-.02.02-.02.04v.4s.02.04.04.05l13.95,2.46c.06-.17.17-.32.3-.44"/>
            <path class="gridIconColor" d="M68.06,79.41s0-.03,0-.05h-13.88s-.05.02-.05.05v.39s.02.05.05.05h13.97c-.06-.13-.09-.28-.09-.44"/>
            <path class="gridIconColor" d="M76.91,79.36s0,.03,0,.05c0,.16-.03.31-.09.44h13.01v-.49h-12.92Z"/>
            <path class="gridIconColor" d="M122.86,79.41s0-.03,0-.05h-12.53v.49h12.62c-.06-.13-.09-.28-.09-.44"/>
            <path class="gridIconColor" d="M145.81,79.36h-14.11s0,.03,0,.05c0,.16-.03.31-.09.44h14.2s.05-.02.05-.05v-.39s-.02-.05-.05-.05"/>
            <path class="gridIconColor" d="M126.99,68.6v2.31c0,.16.13.29.29.29s.29-.13.29-.29v-2.31h-.59Z"/>
            <path class="gridIconColor" d="M131.02,75.49c0-.23-.19-.4-.42-.42-.49-.03-1.31-.14-1.88-.58-.19-.14-.33-.34-.44-.55h2.32c.23,0,.42-.19.42-.42s-.19-.4-.42-.42c-.49-.03-1.31-.14-1.88-.58-.49-.38-.68-1.09-.72-1.5-.04-.39-.32-.72-.72-.72s-.7.32-.72.72c-.02.41-.09,1.04-.7,1.5-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h2.37c-.1.19-.25.38-.47.55-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h2.37c-.1.19-.25.38-.47.55-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h2.37c-.1.19-.25.38-.47.55-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h6.63c.23,0,.42-.19.42-.42s-.19-.4-.42-.42c-.49-.03-1.31-.14-1.88-.58-.19-.14-.33-.34-.44-.55h2.32c.23,0,.42-.19.42-.42s-.19-.4-.42-.42c-.49-.03-1.31-.14-1.88-.58-.19-.14-.33-.34-.44-.55h2.32c.23,0,.42-.19.42-.42"/>
            <path class="gridIconColor" d="M72.19,68.58v2.33c0,.16.13.29.29.29s.29-.13.29-.29v-2.33h-.59Z"/>
            <path class="gridIconColor" d="M76.22,75.49c0-.23-.19-.4-.42-.42-.49-.03-1.31-.14-1.88-.58-.19-.14-.33-.34-.44-.55h2.32c.23,0,.42-.19.42-.42s-.19-.4-.42-.42c-.49-.03-1.31-.14-1.88-.58-.49-.38-.68-1.09-.72-1.5-.04-.39-.32-.72-.72-.72s-.7.32-.72.72c-.02.41-.09,1.04-.7,1.5-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h2.37c-.1.19-.25.38-.47.55-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h2.37c-.1.19-.25.38-.47.55-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h2.37c-.1.19-.25.38-.47.55-.6.46-1.4.56-1.9.58-.23.01-.42.19-.42.42s.19.42.42.42h6.63c.23,0,.42-.19.42-.42s-.19-.4-.42-.42c-.49-.03-1.31-.14-1.88-.58-.19-.14-.33-.34-.44-.55h2.32c.23,0,.42-.19.42-.42s-.19-.4-.42-.42c-.49-.03-1.31-.14-1.88-.58-.19-.14-.33-.34-.44-.55h2.32c.23,0,.42-.19.42-.42"/>
            <path class="gridIconColor" d="M131.18,66.22l-21.88-11.48c-.1-.08-.23-.14-.36-.17l-8.41-20.68c-.07-.18-.25-.31-.45-.31s-.38.12-.45.31l-8.41,20.68s0,0,0,0c-.05.01-.1.03-.14.04-.01,0-.02.01-.04.02-.02,0-.03.01-.05.02l-22.06,11.57c-.36.19-.54.6-.45.99.1.39.45.67.86.67h21.18v22.14l-13.87,46.85c-.11.37.04.78.36.99.15.09.31.14.48.14.2,0,.41-.07.57-.21l13.08-11.18h17.87l13.08,11.18c.16.14.37.21.57.21.17,0,.33-.05.48-.14.33-.21.48-.61.36-.99l-9.12-30.82-4.74-16.02v-22.12h21.18c.49,0,.88-.39.88-.88,0-.36-.22-.67-.53-.81M118.08,66.14l-2.24-5.99,5.67,2.97-3.37,3.01h-.06ZM111.73,126.61h6.73l-2.35,3.74-4.38-3.74ZM82.02,66.12l-3.37-3.01,5.67-2.97-2.24,5.99h-.06ZM85.57,59.6l4.61,6.53h-7.05l2.45-6.53ZM94.47,49.17l11.27,5.38h-13.45l2.19-5.38ZM97.91,40.72l5.19,3.26-7.98,3.58,2.78-6.85ZM107.84,54.47l-12.47-5.95,8.5-3.82,3.97,9.76ZM107.88,65.83l-6.92-4.61,6.92-4.61v9.22ZM106.56,66.12h-12.96l6.48-4.32,6.48,4.32ZM106.56,56.31l-6.48,4.32-6.48-4.32h12.96ZM99.2,61.22l-6.92,4.61v-9.22l6.92,4.61ZM106.56,67.88l-6.48,4.32-6.48-4.32h12.96ZM99.2,72.79l-6.92,4.61v-9.22l6.92,4.61ZM93.44,91.03h13.29l-6.64,4.84-6.64-4.84ZM99.25,96.48l-11.23,8.19,3.99-13.47,7.24,5.28ZM100.08,97.08l11.43,8.34h-22.87l11.43-8.34ZM100.91,96.48l7.24-5.28,3.99,13.47-11.23-8.19ZM111.15,107.18l-11.07,9.46-11.07-9.46h22.14ZM93.6,89.27l6.48-4.32,6.48,4.32h-12.96ZM92.28,88.97v-9.22l6.92,4.61-6.92,4.61ZM87.08,107.85l11.07,9.46h-13.87l2.8-9.46ZM113.08,107.85l2.8,9.46h-13.87l11.07-9.46ZM100.96,84.36l6.92-4.61v9.22l-6.92-4.61ZM100.08,83.77l-7.8-5.2,7.8-5.2,7.8,5.2-7.8,5.2ZM83.73,119.15l5.56,6.47h-7.48l1.92-6.47ZM81.22,127.65l2.1,3.33-.51.43h-2.71l1.11-3.77ZM84.06,130.34l-2.35-3.74h6.72l-4.37,3.74ZM84.28,118.29h13.88l-8,6.84-5.88-6.84ZM115.89,118.29l-5.89,6.85-8.01-6.85h13.89ZM117.35,131.42l-.5-.43,2.09-3.33,1.11,3.75h-2.71ZM110.88,125.63l5.55-6.46,1.91,6.46h-7.47ZM100.96,72.79l6.92-4.61v9.22l-6.92-4.61ZM114.59,59.62l2.45,6.53h-7.05l4.61-6.53ZM109.64,64.93v-8.02l4.13,2.17-4.13,5.85ZM100.08,35.37l3.03,7.46-4.83-3.04,1.8-4.42ZM90.52,64.91l-4.13-5.85,4.13-2.17v8.02ZM77.73,63.59l2.82,2.53h-7.64l4.82-2.53ZM92.29,125.63l7.79-6.66,7.79,6.66h-15.58ZM119.6,66.14l2.82-2.53,4.82,2.53h-7.64Z"/>
          </g>
          <foreignObject id="foreign" class="st1" x="25" y="158" width="152" height="34">
                <div xmlns="http://www.w3.org/1999/xhtml" 
                  style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                  font-size: 34px;
                  text-align: center;
                  ">
              <!-- Inserisci qui il contenuto che desideri -->
              <p>${gridPower}w</p>
            </div>
          </foreignObject>
              <path id="TopARROW" class="toparrow" d="M103.03,3.05v11.19h4.95l-7.98,7.98-7.98-7.98h4.95V3.05c-5.49,1.36-9.55,6.31-9.55,12.21,0,6.95,5.63,12.58,12.58,12.58s12.58-5.63,12.58-12.58c0-5.91-4.07-10.86-9.55-12.21Z"/>
              <path id="leftARROW" class="leftarrow" d="M42.4,104.29h-15.85v7.02l-11.31-11.31,11.31-11.31v7.02h15.85c-1.92-7.78-8.94-13.54-17.31-13.54-9.85,0-17.83,7.98-17.83,17.83s7.98,17.83,17.83,17.83c8.37,0,15.39-5.77,17.31-13.54Z"/>
        </svg>
       `;
}
//   export function home_no_meter(totalPower) {
//     return html`
//     <svg id="home" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
//       <defs>
//         <linearGradient id="home_gradient_1" data-name="Sfumatura senza nome 137" x1="61.53" y1="91.73" x2="140.14" y2="106.85" gradientUnits="userSpaceOnUse">
//           <stop offset="0" stop-color="#dedfdf"/>
//           <stop offset="1" stop-color="#9ca09f"/>
//         </linearGradient>
//         <linearGradient id="home_gradient_2" data-name="Sfumatura senza nome 138" x1="52.04" y1="60.27" x2="148.68" y2="67.3" gradientUnits="userSpaceOnUse">
//           <stop offset="0" stop-color="#ececec"/>
//           <stop offset="1" stop-color="#9da09f"/>
//         </linearGradient>
//       </defs>
//       <text class="white font43" transform="translate(43.07 176.31)"><tspan x="0" y="0">${totalPower}w</tspan></text>
//       <polygon class="home_st2" points="99.54 59.67 138.62 85.48 138.3 131.29 112.08 130.98 111.97 90.43 87.43 90.74 87.33 131.29 60.89 130.98 60.89 85.27 99.54 59.67"/>
//       <polygon class="home_st0" points="99.54 40.29 152.1 76.21 144.62 83.9 99.75 53.35 54.67 83.9 47.2 76.21 99.54 40.29"/>
//     </svg>
//            `;
//   }
function home(totalPower, pvPercentage, batteryPercentage) {
  const total100 = Math.min(Number(pvPercentage) + Number(batteryPercentage), 100).toFixed(2);
  return x`
    <svg id="home" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 200 200">
      <defs>
        <style>
          .home_meter_st0 {
            fill: #606060;
          }

          .home_meter_st0, .home_meter_st1 {
            opacity: .56;
            stroke: #4d4d4d;
            stroke-miterlimit: 10;
          }

          .home_meter_st1 {
            fill: url(#Sfumatura_senza_nome_28);
          }

          .home_meter_st2 {
            fill: none;
          }

          .home_meter_st3 {
            fill: url(#Sfumatura_senza_nome_138);
          }



          .home_meter_st5 {
            fill: url(#Sfumatura_senza_nome_137);
          }
        </style>

        <linearGradient id="Sfumatura_senza_nome_137" data-name="Sfumatura senza nome 137" x1="61.88" y1="105.94" x2="140.49" y2="121.06" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#dedfdf"/>
          <stop offset="1" stop-color="#9ca09f"/>
        </linearGradient>
        <linearGradient id="Sfumatura_senza_nome_138" data-name="Sfumatura senza nome 138" x1="52.39" y1="74.48" x2="149.03" y2="81.51" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#ececec"/>
          <stop offset="1" stop-color="#9da09f"/>
        </linearGradient>
        <linearGradient id="Sfumatura_senza_nome_28" data-name="Sfumatura senza nome 28" x1="26.16" y1="27" x2="174.16" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#51d400"/>
          <stop offset="${Number(pvPercentage) / 100}" stop-color="#51d400"/>
          <stop offset="${Number(pvPercentage) / 100}" stop-color="#ff9115"/>
          <stop offset="${Number(total100) / 100}" stop-color="#ff9115"/>
          <stop offset="${Number(total100) / 100}" stop-color="${Number(total100) >= 100 ? '#ff9115' : '#235adf'}"/>
        </linearGradient>
      </defs>
      <g id="casa">
        <g>
          <path class="home_meter_st0" d="M164.07,11.04c-.22-.03-.44-.04-.66-.04H36.73c-.24,0-.49.02-.73.05-12.84,1.9-22.72,11.87-24.7,24.7-.04.25-.05.5-.05.74,0,.63,0,1.26,0,1.9,0,2.54,2.06,4.61,4.6,4.61h168.62c2.54,0,4.6-2.06,4.6-4.6h0c0-.13,0-.26-.01-.4-.97-13.69-11.33-25.14-24.99-26.96Z"/>
          <g>
            <polygon class="home_meter_st5" points="99.89 73.88 138.97 99.68 138.65 145.5 112.43 145.18 112.32 104.63 87.78 104.95 87.68 145.5 61.24 145.18 61.24 99.47 99.89 73.88"/>
            <polygon class="home_meter_st3" points="99.89 54.5 152.45 90.42 144.97 98.1 100.11 67.56 55.03 98.1 47.55 90.42 99.89 54.5"/>
          </g>
        </g>
      </g>
      <foreignObject id="foreign" class="st1" x="25" y="158" width="152" height="34">
                <div xmlns="http://www.w3.org/1999/xhtml" 
                  style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                  font-size: 34px;
                  text-align: center;
                  ">
                  <!-- Inserisci qui il contenuto che desideri -->
                  <p>${totalPower}w</p>
                </div>
              </foreignObject>
      <rect class="home_meter_st1" x="26.16" y="14.5" width="148" height="25" rx="10" ry="10"/>
      <g id="topArrow">


    </svg>
           `;
}
function inverter() {
  return x`

<svg id="home" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200">
  <path class="inverter_st1" d="M76.67,174.39h-29.16c-4.3,0-7.78-5.55-7.78-12.42V37.79c0-6.87,3.47-12.42,7.78-12.42h104.97c4.3,0,7.78,5.55,7.78,12.42v124.18c0,6.87-3.47,12.42-7.78,12.42h-75.81Z"/>
  <path id="displaybottom" class="inverter_st3" d="M61.12,100.52h81.65c2.15,0,3.89,1.74,3.89,3.89v31.1c0,2.15-1.74,3.89-3.89,3.89H57.23c-2.15,0-3.89-1.74-3.89-3.89v-31.1c0-2.15,1.74-3.89,3.89-3.89h3.89Z"/>
  <text class="inverter_st4" transform="translate(66.24 129.77)"><tspan x="0" y="0">220v</tspan></text>
  <path id="displayup" class="inverter_st3" d="M60.78,47.16h81.65c2.15,0,3.89,1.74,3.89,3.89v31.1c0,2.15-1.74,3.89-3.89,3.89H56.89c-2.15,0-3.89-1.74-3.89-3.89v-31.1c0-2.15,1.74-3.89,3.89-3.89h3.89Z"/>
  <text class="inverter_st4" transform="translate(74.81 76.41)"><tspan x="0" y="0">12v</tspan></text>
  <g id="led">
    <circle class="inverter_st0" cx="126.4" cy="36.51" r="3.34"/>
    <circle class="inverter_st0" cx="99.66" cy="36.51" r="3.34"/>
    <circle class="inverter_st0" cx="72.92" cy="36.51" r="3.34"/>
  </g>
  <line class="inverter_st2" x1="72.78" y1="153.01" x2="88.34" y2="153.01"/>
  <line class="inverter_st2" x1="72.78" y1="160.78" x2="88.34" y2="160.78"/>
  <line class="inverter_st2" x1="100" y1="149.12" x2="100" y2="164.67"/>
  <path class="inverter_st2" d="M127.22,156.9c0,2.14-1.75,3.89-3.89,3.89s-3.89-1.75-3.89-3.89-1.75-3.89-3.89-3.89-3.89,1.75-3.89,3.89"/>
  <path class="inverter_st2" d="M76.67,174.39v7.78c0,3.23,2.6,5.83,5.83,5.83h3.89c3.23,0,5.83-2.6,5.83-5.83v-7.78"/>
  <path class="inverter_st2" d="M107.78,174.39v7.78c0,3.23,2.6,5.83,5.83,5.83h3.89c3.23,0,5.83-2.6,5.83-5.83v-7.78"/>
  <path class="inverter_st2" d="M123.33,25.61v-7.78c0-3.23-2.6-5.83-5.83-5.83h-3.89c-3.23,0-5.83,2.6-5.83,5.83v7.78"/>
  <path class="inverter_st2" d="M92.22,25.61v-7.78c0-3.23-2.6-5.83-5.83-5.83h-3.89c-3.23,0-5.83,2.6-5.83,5.83v7.78"/>
</svg>
`;
}

var styles = i$3`
  // **************  css svg  ***************

  .foreign-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 14px;
    text-align: center;
    color: #000;
    background-color: yellow;
  }
  .st0 {
    fill: #465e5e;
  }

  .st1 {
    fill: #fffeff;
  }

  .st2 {
    fill: #fff;
    /* font-family: MyriadPro-Regular, 'Myriad Pro'; */
    font-size: 43px;
  }

  .st3 {
    fill: #5e7574;
  }

  .st4 {
    fill: #4d636c;
  }

  .st5 {
    fill: #7b908e;
  }

  .st6 {
    fill: #b1bfbe;
  }

  .st7 {
    fill: #91a3a2;
  }

  .battColor {
    fill: url(#Sfumatura_icon);
  }

  .white {
    fill: #fff;
  }

  .font43 {
    font-size: 36px;
  }

  .font36 {
    font-size: 36px;
  }

  .opacity76 {
    opacity: 0.76;
  }

  .gridIconColor {
    fill: #b3b3b3;
  }

  .batterypercent {
    fill: url(#Sfumatura_senza_nome_48);
    stroke: #254344;
  }

  .inverter_st0 {
    fill: #69ea00;
    stroke-miterlimit: 10;
    stroke: #b3b3b3;
    stroke-width: 2px;
  }

  .inverter_st1 {
    fill: rgba(110, 0, 0, 0.6);
    stroke: #b3b3b3;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .inverter_st2 {
    fill: none;
    stroke: #b3b3b3;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .inverter_st3 {
    fill: rgba(0, 0, 0, 0.3);
    stroke: #b3b3b3;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .inverter_st4 {
    fill: #fff;
    font-size: 26px;
  }

  .inverter_st5 {
    fill: none;
    stroke: #039;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .home_st0 {
    fill: url(#home_gradient_2);
  }

  .home_st2 {
    fill: url(#home_gradient_1);
  }


  // ***************fine svg *******************

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }

  @keyframes dash-move {
    0% {
      stroke-dashoffset: 20; /* Cambia il valore per regolare la velocità */
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes draw-line {
    0% {
      stroke-dasharray: 0, 1000; /* Inizia da zero */
    }
    100% {
      stroke-dasharray: 1000, 0; /* Completa la linea */
    }
  }

  @keyframes slide-in-out {
    0% {
      height: 0;
    }
    100% {
      height: 50%;
    }
  }

  @keyframes circular-border {
    0% {
      border: 2px solid transparent;
    }
    50% {
      border: 2px solid rgba(255, 0, 0, 0.7);
    }
    100% {
      border: 2px solid transparent;
    }
  }

  .ha-card_vertical {
    padding: 16px;
    // display: flex;
    // flex-direction: column;
    // height: 92vh;
    background: linear-gradient(180deg, #61716e, #253835);
    display: grid;
    grid-template-rows: 100px minmax(0, auto) 100px;
  }

  .line-style {
    // stroke: red; /* Cambia questo valore con la tua variabile o colore */
    stroke-width: 3;
    stroke-dasharray: 5.5, 5;
    opacity: 0.5;
    fill: none;
    stroke: #333333;
    // stroke-width:4;
    // stroke-miterlimit:10;
    // stroke-dasharray: 6, 8;
    // animation: dash-move 1s linear infinite; /* Durata e loop infinito */
    animation: draw-line 2s ease-in-out forwards; /* Durata e curva animazione */
  }

  .meteo-icon-svg {
    fill: none;
    stroke: #fff;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 5px;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title {
    font-size: 2rem;
    font-weight: bold;
    background-color: #565656;
    color: transparent;
    text-shadow: 1.5px 1.5px 1.5px rgba(255, 255, 255, 0.3);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;

    margin: 5% 10% 15%;
  }
  #chart {
    width: 100%;
    height: 300px;
  }

  button {
    margin-bottom: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  // input[type="range"] {
  //   width: 100%;
  // }
  

  // input[type="range"]:focus {
  //   outline: transparent;
  // }

  // input[type="range"]::-webkit-slider-thumb {
  //   background-color: #255ff4;
  //   border: 0;
  //   border-radius: 50%;
  //   box-shadow:
  //     -1px -1px 6px #0937aa inset,
  //     0 -2px 2px 0 #0004,
  //     2px 2px 6px #0007;
  //   cursor: pointer;
  //   position: relative;
  //   width: 24px;
  //   height: 24px;
  //   transition: all var(--transDur) linear;
  //   z-index: 1;
  //   -webkit-appearance: none;
  //   appearance: none;
  // }
  // input[type="range"]:focus::-webkit-slider-thumb {
  //   background-color: #5583f6;
  //   box-shadow:
  //     -1px -1px 6px #0937aa inset,
  //     0 -2px 2px 0 #0004,
  //     2px 2px 6px #0007;
  // }
  // input[type="range"]::-moz-range-thumb {
  //   background-color: #255ff4;
  //   border: 0;
  //   border-radius: 50%;
  //   box-shadow:
  //     -1px -1px 6px #0937aa inset,
  //     0 -2px 2px 0 #0004,
  //     2px 2px 6px #0007;
  //   cursor: pointer;
  //   position: relative;
  //   width: 24px;
  //   height: 24px;
  //   transform: translateZ(1px);
  //   transition: all var(--transDur) linear;
  //   z-index: 1;
  //   -moz-appearance: none;
  //   appearance: none;
  // }
  // input[type="range"]:focus::-moz-range-thumb {
  //   background-color: #5583f6;
  //   box-shadow:
  //     -1px -1px 6px #0937aa inset,
  //     0 -2px 2px 0 #0004,
  //     2px 2px 6px #0007;
  // }

  // input[type="range"]::-moz-focus-outer {
  //   border: 0;
  // }











input[type="range"]::-webkit-slider-thumb {
    background-color: #255ff4;
    border: 0;
    border-radius: 50%;
    box-shadow:
      -1px -1px 6px #0937aa inset,
      0 -2px 2px 0 #0004,
      2px 2px 6px #0007;
    cursor: pointer;
    position: relative;
    // width: 24px;
    // height: 24px;
    transition: all var(--transDur) linear;
    z-index: 1;
    -webkit-appearance: none;
    appearance: none;
  }
  input[type="range"]:focus::-webkit-slider-thumb {
    background-color: #5583f6;
    box-shadow:
      -1px -1px 6px #0937aa inset,
      0 -2px 2px 0 #0004,
      2px 2px 6px #0007;
  }
























  @media (prefers-color-scheme: dark) {
    :host {
      --bg: #2e3138;
      --fg: #e3e4e8;
      --bs1: #3c4049;
      --bs2: #202227;
      --tick: rgb(55, 61, 63);
    }
  }


    .range-container {
    position: relative;
    }
  .production_range {
    position: relative;
    height: 70px;
    // background-color: coral;
  }

  .range__ticks {
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
    position: absolute;
    // top: 28px;
    left: 12px;
    width: calc(100% - 36px);
    height: 100% !important;
    // background-color: rgba(255, 0, 0, 0.2);
    position: absolute;
    top: 0;
    /* left: 0; */
    /* background-color: blueviolet; */
    height: 3vh;
    align-content: center;
    display: flex
;
  }
  .range__tick,
  .range__tick-text {
    display: inline-block;
  }
  .range__tick {
    color: var(--tick);
    font-size: 1.35vh;
    text-align: center;
    width: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  .range__tick-text {
    transform: translateX(-50%);
  }

  // .range-thumb-label {
  //   position: absolute;
  //   width: 16px;
  //   height: 22px;
  //   top: 24px; /* Posiziona il label sopra il thumb */
  //   transform: translateX(-50%);
  //   // background-color: rgba(255, 0, 0, 0.6);
  //   color: white;
  //   padding: 2px 5px;
  //   border-radius: 4px;
  //   font-size: 12px;
  //   pointer-events: none;
  //   white-space: nowrap;
  //   z-index: 11;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }

   .range-thumb-label {
    position: absolute;
    /* width: 16px; */
    height: 100%;
    /* top: 24px; */
    transform: translateX(-50%);
    color: white;
    /* padding: 2px 5px; */
    /* border-radius: 4px; */
    font-size: 1.4vh;
    pointer-events: none;
    white-space: nowrap;
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    // background-color: rgba(125, 125, 0, 0.5);
    margin-left: 0.4%;
  }

  .offset_label {
  position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    // background-color: rgba(15, 0, 0, 0.2);
}

  .custom-legend-btn {
    background-color: transparent;
    color: white;
    // border: 2px solid transparent;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    // font-size: 14px;
    font-size:1.5vh
  }

  .custom-legend-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .apexcharts-legend-series .apexcharts-legend-marker {
    display: none;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 2px red;
    border-radius: 25px;
    // animation: blinker 1.5s linear infinite;
  }

  .bottom_bar_vertical {
    height: 60px;
    background-color: rgba(125, 125, 125, 0.1);
    border-radius: 12px;
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10%;
  }

  .home_info {
    height: 150px;
    background-color: rgba(125, 125, 125, 0.1);
    border-radius: 12px;
    // margin-top: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* padding: 0 30%; */
    // margin-left: 5%;
    // margin-right: 5%;
    -webkit-box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  }

  .info_icon {
    color: #7a8683;
    --mdc-icon-size: 40px;
  }

  .info_column {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }

  .menu_icon {
    cursor: pointer;
    color: var(--state-icon-color);
    --mdc-icon-size: 40px;
  }

  

  .menu_icon_on {
    color: var(--state-icon-active-color) !important;
  }

  .tile-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 16px;
    margin: 16px 0;
  }

  .lines-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;
  }

  .tile {
    // background-color: red;
    border-radius: 15px;
    -webkit-box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
  }
  .tile_vertical {
    width: 70px;
    height: 70px;
}

  .weather_attributes {
    display: flex;
    gap: 5px;
    // margin-top: 10px;
  }

  .weather_attributes_vertical {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .glow-line {
    // stroke: rgba(0, 191, 255, 0.8);
    stroke-width: 4;
    fill: none;
    stroke-dasharray: 10, 40;
    filter: url(#glow-blur); /* Usa il filtro SVG */
    animation: glow-animation 1s infinite linear;
  }

  @keyframes glow-animation {
    from {
      stroke-dashoffset: 50;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  .apexcharts-legend {
    display: flex !important;
    gap: 0px !important; /* Rimuove lo spazio tra i pulsanti */
    justify-content: center; /* Allinea i pulsanti */
    flex-wrap: nowrap;
  }

  .apexcharts-legend-series {
    margin: 0 !important; /* Rimuove il margine tra i pulsanti */
    padding: 0 !important;
  }

  .chart-navigator {
    display: flex;
    justify-content: space-between;
  }
  .chart-navigator-button {
    width: 150px;
    background-color: rgba(125, 125, 125, 0.1);
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    margin: 0 18px;
  }

  hui-tile-card {
    /* Esempio: sovrascrivi la custom property usata da ha-card per lo sfondo */
    --ha-card-background: rgba(125, 125, 125, 0.1);
    --ha-card-box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  }
  
  hui-entities-card {
    /* Esempio: sovrascrivi la custom property usata da ha-card per lo sfondo */
    --ha-card-background: rgba(125, 125, 125, 0.1);
    --ha-card-box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
  }

  .chart-cutton-container {
    display: flex;
    background-color: rgba(125, 125, 125, 0.1);
    border-radius: var(--ha-card-border-radius, 12px);
    -webkit-box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    margin-left: 5%;
    margin-right: 5%;
    height: 100px;
    margin-top: auto;
    // flex-grow: 1;
  }

  .chart-button-select {
    background-color: transparent;
    width: 50%;
    height: 100%;
    border-radius: var(--ha-card-border-radius, 12px);
  }

  .chart-button-select:hover {
    background-color: rgba(125, 125, 125, 0.5);
  }

  .more_elements_container {
  display: flex; 
  flex-direction: 
  column; gap: 10px; 
  background-color: rgba(125, 125, 125, 0.3);
  border-radius: 12px;
  overflow: auto;
  height: auto;
  // height: -webkit-fill-available;
  }

  .more_elements {
  display: flex; 
  flex-direction: 
  column; gap: 10px; 
  border-radius: 12px;
  overflow: auto;
  height: -webkit-fill-available;
  padding: 0 20px;
  flex-grow:4;
    height: 1px;
  }

  #style-2::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    background-color: transparent; /* Rendi trasparente lo sfondo della traccia */
}

#style-2::-webkit-scrollbar {
    width: 24px;
    background-color: transparent; /* Rendi trasparente anche lo sfondo della scrollbar */
}

#style-2::-webkit-scrollbar-thumb {
    border-radius: 12px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    background-color: transparent;
}

 .more_elemnts_divider  {
    
    height: 100%;
    // width: 100%;
    /* background-color: red; */
    border-bottom: 1px solid var(--divider-color);
    border-right: 1px solid var(--divider-color);
    /* border-radius: 12px; */
    border-radius: 0 0 20px 0;
    flex-grow: 2;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 1.5px 1.5px 1.5px rgba(255, 255, 255, 0.3);
    font-size: 2rem;
    font-weight: bold;
    background-color: #565656;
    color: transparent;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    
}

.back_button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width:70px;
    height:70px;
    }

    .ha-card_horizontal {
    /* padding: 16px; */
    background: linear-gradient(180deg, #61716e, #253835);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 5vh auto 4vh 14vh;
    grid-template-areas: 
        ". title"
        "pv chart"
        "daystext chart"
        "info menu";
    column-gap: 3vh;
    padding: 3vh;
}


.main_content_horizontal {
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: 96%;
    width: 50%;
    // background: linear-gradient(180deg, #61716e, #253835);
    // display: grid;
    // grid-template-rows: 10% minmax(0, auto) 20%;
    
  }

    .tile_horizontal {
    // width: 18%;
    height: 100%;
    aspect-ratio: 1 / 1;
}

    .title_horizontal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 4vh;
    font-weight: bold;
    background-color: #565656;
    color: transparent;
    text-shadow: 0.2vh 0.2vh 0.2vh rgba(255, 255, 255, 0.3);
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    height: 5vh;
    margin: 0 10% 3%;
    grid-area: title;
    
    }

    .more_elements_container_horizontal {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: rgba(125, 125, 125, 0.1);
    border-radius: 2vh;
    overflow: auto;
    // height: 100%;
    margin: 3vh 13% 5vh;
    grid-area: pv;
}

.horizontal_chart_container {
  width: 50%;
  height: 96%;
  display:flex;
  flex-direction: column;
  padding: 16px;
}

.bottom_bar_horizontal {
    height: 14vh;
    background-color: rgba(125, 125, 125, 0.1);
    box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 2px 2px;
    border-radius: 12px;
    // margin-top: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // padding: 0 10%;
    grid-area: menu;
    // margin: 3vh 0;
  }

 .menu_icon_horizontal {
    cursor: pointer;
    color: var(--state-icon-color);
    --mdc-icon-size: 5.5vh;
  }

  .mainChartHorizonatContainer {
  // flex-grow:4;
  background-color: rgba(125, 125, 125, 0.1);
    box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 2px 2px;
    border-radius: 12px;
    // padding: 16px;
    display: flex; 
    // height:100%;
    padding: 4%;
    // margin-top: 3%;
    justify-content: space-around;
    grid-area: chart;
        margin: 3vh 0;

  }




        .current_percentage {
        // width: 100%;
        width: -webkit-fill-available;
        height: 65%;
        background-color: rgba(56, 67, 65, 0.7);
        border-radius: 2vh;
        overflow: hidden;
        display: flex;
        margin-right:20px;
        align-self: flex-end;
        box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
        margin-top: auto;
        
        }

        .inner_meter {
        width: 70%;
        height: 100%;
        background-color: red;
        border-radius: 1.5vh;
        overflow: hidden;
        display: flex;
        align-items: center;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        }
        .grid {
            height:auto;
            width: 100%;
            background-color: #235adf;
            align-items: center;
            justify-content: center;
            display: flex;
            flex-grow: 2;
            overflow: hidden;
            
        }
        .battery {
            // height: 33%;
            width: 100%;
            background-color: #f8d25d;
            align-items: center;
            justify-content: center;
            display: flex;
            box-shadow: 0 0px 8px 4px rgba(0, 0, 0, 0.44);
            overflow: hidden;
        }
        .photovoltaic {
            // height: 33%;
            width: 100%;
            background-color: #4ab87e;
            // align-items: center;
            justify-content: center;
            display: flex;
            box-shadow: 0 0px 8px 4px rgba(0, 0, 0, 0.44);
            overflow: hidden;
        }
        .homePer {
            width:30%;
            height: 100%;
            align-items: center;
            justify-content: center;
            display: flex;

        }

        
        .bar_icon {
          color: rgba(255, 255, 255, 0.3);
          --mdc-icon-size: 3.5vh;
          margin-top: 8%;
        }


`;

var PhotovoltaicCard_1;
let PhotovoltaicCard = PhotovoltaicCard_1 = class PhotovoltaicCard extends r$1 {
  static get properties() {
    return {
      hass: {},
      config: {},
      activeMenu: {},
      showChart: {},
      swicthChart: {},
      panelMode: {},
      showMoreElements: {}
    };
  }
  static get iconMapping() {
    return {
      loader: loader(),
      cloudeCoverage: cloudeCoverage(),
      uvIndex: uvIndex(),
      rainy: rainy(),
      temperature: temperature(),
      "clear-night": clearnight(),
      cloudy: cloudy(),
      day: day(),
      sunny: day(),
      partlycloudy: partlycloudy(),
      hail: hail(),
      "lightning-rainy": lightningrainy(),
      lightning: lightning(),
      night: clearnight(),
      "partlycloudy-night": partlycloudynight(),
      pouring: pouring(),
      "snowy-rainy": snowyrainy,
      "windy-variant": windyvariant(),
      windy: windy(),
      fog: fog()
    };
  }
  constructor() {
    super();
    this._interval = 25; // Intervallo iniziale in minuti
    this._debounceFetchHistory = null;
    this.chartHeight = 400; // Imposta la variabile con il valore iniziale
    // private seriesDataLast7Days: {
    //   name: string;
    //   data: { x: number; y: number }[];
    // }[] = [];
    // private weeklyChart: any | null = null; // Dichiarazione della proprietà
    this.activeMenu = "home";
    this._tileCards = null;
    this.moreElements_Cards = null;
    // private moreElements_tileCard: HTMLElement[] | null = null;
    this._moreElementsContainer = null;
    this.previousWidth = 0;
    this.weekGridConsumption = 0;
    this.chartMap = null; // Variabile per mantenere l'istanza del grafico
    this.gridWeekTotal = null;
    this.gridWeek = null;
    this.totalWekkPvProduction = 0;
    this.daysToEvaluate = 7;
    this.disableLeftButtonHeatmap = false;
    this.gridEnergyState = "neutral";
    this.batterMode = "neutral";
    this.sensorData = [];
    this.aggregatedData = [];
    this.showMoreElements = false;
    this.dinamicContent = [];
    this.moreElemetsName = "";
    this.moreElemetsFunction = "";
    this.totalMaxPower = 0;
    this.sliderHeight = 0;
    this.dynamicFunction = () => "";
    this.updateNavigatorButtonsHeatmap = disableLeftButtonHeatmap => {
      var _a;
      const nextButton = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("#prev-day-heatmap");
      if (nextButton) {
        nextButton.disabled = disableLeftButtonHeatmap;
      }
    };
    this.showChart = false;
    this.swicthChart = true;
  }
  static get styles() {
    return styles;
  }
  setConfig(config) {
    var _a, _b, _c;
    if (!config.entities || !Array.isArray(config.entities)) {
      throw new Error("Invalid configuration: entities must be a list of entity IDs");
    }
    const updatedConfig = Object.assign({}, config);
    // Genera una chiave univoca basata sulla configurazione
    const uniqueKey = JSON.stringify(config.entities) + (((_a = config.card) === null || _a === void 0 ? void 0 : _a.type) || "default");
    const hash = this._generateHash(uniqueKey);
    const storageKey = `local_conditional_card_id_${hash}`;
    let savedId = localStorage.getItem(storageKey);
    // Se non esiste, genera un ID univoco
    if (!savedId) {
      savedId = `card_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
      localStorage.setItem(storageKey, savedId);
    }
    // Assegna l'ID generato o recuperato
    updatedConfig.id = savedId;
    // Imposta la configurazione aggiornata
    this.config = updatedConfig;
    // Recupera il valore dello slider dal localStorage o usa il valore predefinito
    const sliderKey = `slider_value_${this.config.id}`;
    const savedSliderValue = localStorage.getItem(sliderKey);
    this._interval = savedSliderValue ? parseInt(savedSliderValue, 10) : (_c = (_b = config.options) === null || _b === void 0 ? void 0 : _b.data_time_period) !== null && _c !== void 0 ? _c : 25;
    // legge le entità in enetities
    this.entities = this.config.entities;
    this.totalMaxPower = this.entities.reduce((sum, entity) => sum + (entity.max_power || 0), 0) / 1000;
  }
  _generateHash(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString(36);
  }
  connectedCallback() {
    super.connectedCallback();
    // Aggiungi il listener per il resize della finestra
    window.addEventListener("resize", this.handleResize.bind(this));
    // Calcola inizialmente la larghezza
    this.handleResize();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    // Rimuovi il listener per evitare memory leak
    window.removeEventListener("resize", this.handleResize.bind(this));
  }
  handleResize() {
    // Ottieni la larghezza corrente della card
    const currentWidth = this.getBoundingClientRect().width;
    // Confronta la larghezza corrente con quella precedente
    if (currentWidth !== this.previousWidth) {
      this.previousWidth = currentWidth;
      this.initializeLines(); // Richiama la funzione solo se la larghezza è cambiata
    }
  }
  createTileCards() {
    if (!this.config.tile_cards || !Array.isArray(this.config.tile_cards)) {
      return [];
    }
    if (!this._tileCards) {
      this._tileCards = this.config.tile_cards.map(entity => {
        const tileConfig = {
          type: "tile",
          entity: entity
        };
        const tile = document.createElement("hui-tile-card");
        tile.setConfig(tileConfig);
        return tile;
      });
    }
    this._tileCards.forEach(tile => {
      tile.hass = this.hass;
    });
    return this._tileCards;
  }
  // private entitiesCard() {
  //   if (!this.config.more_elements || !Array.isArray(this.config.more_elements)) {
  //       return [];
  //   }
  //   if (!this.moreElements_tileCard) {
  //       const sensorEntities = this.config.more_elements
  //           .filter(entity => entity.startsWith("sensor.")); // Filtra solo i sensori
  //       if (sensorEntities.length === 0) {
  //           return []; // Nessun sensore, nessuna card
  //       }
  //       const tileConfig = {
  //           type: "entities",
  //           entities: sensorEntities, // Passa tutte le entità insieme
  //       };
  //       const tile = document.createElement("hui-entities-card") as any;
  //       tile.setConfig(tileConfig);
  //       this.moreElements_tileCard = tile;
  //   }
  //   (this.moreElements_tileCard as any).hass = this.hass;
  //   return [this.moreElements_tileCard]; // Deve restituire un array con una sola card
  // }
  // private more_elements() {
  //   if (!this.config.more_elements || !Array.isArray(this.config.more_elements)) {
  //       return [];
  //   }
  //   if (!this.moreElements_EntitiesCards) {
  //       this.moreElements_EntitiesCards = this.config.more_elements
  //           .filter(entity => !entity.startsWith("sensor.")) // Filtro i sensori
  //           .map((entity) => {
  //               const tileConfig = {
  //                   type: "tile",
  //                   entity: entity,
  //               };
  //               const tile = document.createElement("hui-tile-card") as any;
  //               tile.setConfig(tileConfig);
  //               return tile;
  //           });
  //   }
  //   this.moreElements_EntitiesCards.forEach((tile) => {
  //       (tile as any).hass = this.hass;
  //   });
  //   return this.moreElements_EntitiesCards;
  // }
  generateMoreElements(more_elements) {
    if (!more_elements || !Array.isArray(more_elements)) {
      return [];
    }
    if (!this.moreElements_Cards) {
      this.moreElements_Cards = [];
      const sensorEntities = more_elements.filter(entity => entity.startsWith("sensor."));
      const otherEntities = more_elements.filter(entity => !entity.startsWith("sensor."));
      // Se ci sono sensori, crea una Entities Card
      if (sensorEntities.length > 0) {
        const tileConfig = {
          type: "entities",
          entities: sensorEntities
        };
        const tile = document.createElement("hui-entities-card");
        tile.setConfig(tileConfig);
        this.moreElements_Cards.push(tile);
      }
      // Crea Tile Cards per le altre entità
      this.moreElements_Cards.push(...otherEntities.map(entity => {
        const tileConfig = {
          type: "tile",
          entity: entity
        };
        const tile = document.createElement("hui-tile-card");
        tile.setConfig(tileConfig);
        return tile;
      }));
    }
    // Aggiorna `hass` per tutte le card
    this.moreElements_Cards.forEach(tile => {
      tile.hass = this.hass;
    });
    return this.moreElements_Cards;
  }
  // *********************** calolo pv settimanale ********************
  getTotalSum(chartdata) {
    let sum = 0;
    // Se c'è una sola entità, somma solo gli ultimi 7 valori della sua serie
    if (this.entities.length === 1) {
      const seriesData = chartdata.series[0].data;
      const last7Values = seriesData.slice(-7); // Prende solo gli ultimi 7 valori
      sum = last7Values.reduce((total, point) => total + point.y, 0);
    } else {
      // Trova la serie con nome "totale"
      const totaleSeries = chartdata.series.find(series => series.name === "totale");
      // Se la serie esiste, somma solo gli ultimi 7 valori
      if (totaleSeries) {
        const seriesData = totaleSeries.data;
        const last7Values = seriesData.slice(-7); // Prende solo gli ultimi 7 valori
        sum = last7Values.reduce((total, point) => total + point.y, 0);
      }
    }
    // Restituisce la somma arrotondata a due decimali
    return Number(sum.toFixed(2));
  }
  //*********************** fine calolo pv settimanale ********************
  // ********************** interrogazione singola entità ******************
  askForEntity(consumer, days, unit) {
    return new Promise((resolve, reject) => {
      var _a, _b;
      const now = new Date();
      const startTime = new Date();
      // Sottraggo giorni per ottenere il range corretto
      startTime.setDate(now.getDate() - (days - 1));
      startTime.setHours(0, 0, 0, 0); // Imposta a mezzanotte esatta
      // Recupero i dettagli dell'entità per verificare l'unità di misura
      const entity = this.hass.states[consumer];
      const entityUnit = ((_b = (_a = entity === null || entity === void 0 ? void 0 : entity.attributes) === null || _a === void 0 ? void 0 : _a.unit_of_measurement) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "";
      const isWatt = entityUnit === "w" || unit.toLowerCase() === "watt"; // Controlla se è in watt
      this.hass.callWS({
        type: "recorder/statistics_during_period",
        statistic_ids: [consumer],
        // Deve sempre essere un array
        period: "day",
        start_time: startTime.toISOString(),
        types: ["sum", "mean"]
      }).then(recorderResponse => {
        // Prendi i dati e calcola il valore corretto
        const entityData = recorderResponse[consumer] || [];
        if (entityData.length < 2) {
          console.warn("Dati insufficienti per il calcolo del valore giornaliero.");
          return resolve({
            days: [],
            totale: 0
          }); // Restituisco dati vuoti invece di undefined
        }
        // Array per i valori giornalieri corretti
        let correctedDays = [];
        let totalSum = 0;
        for (let i = 1; i < entityData.length; i++) {
          // Calcola la differenza tra giorni consecutivi
          let correctedSum = entityData[i].sum - entityData[i - 1].sum;
          // Se l'unità è in watt, divido per 1000 per ottenere i kWh
          if (isWatt) {
            correctedSum /= 1000;
          }
          // Arrotondo il valore a 2 decimali
          correctedSum = parseFloat(correctedSum.toFixed(2));
          // Aggiungo il valore alla lista dei giorni
          correctedDays.push({
            start: entityData[i].start,
            // Timestamp del giorno
            end: entityData[i].end,
            // Fine del periodo
            sum: correctedSum
          });
          // Aggiorno il totale
          totalSum += correctedSum;
        }
        // Arrotondo il totale a massimo 2 decimali
        totalSum = parseFloat(totalSum.toFixed(2));
        // Oggetto finale con days e totale
        const correctedData = {
          days: correctedDays,
          totale: totalSum
        };
        resolve(correctedData); // Restituisce i dati corretti
      }).catch(error => {
        console.error("Errore nella richiesta al recorder:", error);
        reject(error); // Propaga l'errore
      });
    });
  }
  // isPanelMode() {
  //   const huiRoot = document.querySelector("home-assistant")?.shadowRoot
  //     ?.querySelector("home-assistant-main")?.shadowRoot
  //     ?.querySelector("ha-panel-lovelace")?.shadowRoot
  //     ?.querySelector("hui-root") as any; // 👈 CAST a "any"
  // return huiRoot?.lovelace?.config?.views[huiRoot?.lovelace?.current_view]?.panel || false;
  // }
  isPanelMode() {
    var _a, _b, _c, _d, _e, _f, _g;
    const huiRoot = (_f = (_e = (_d = (_c = (_b = (_a = document.querySelector("home-assistant")) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector("home-assistant-main")) === null || _c === void 0 ? void 0 : _c.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector("ha-panel-lovelace")) === null || _e === void 0 ? void 0 : _e.shadowRoot) === null || _f === void 0 ? void 0 : _f.querySelector("hui-root");
    return !!((_g = huiRoot === null || huiRoot === void 0 ? void 0 : huiRoot.shadowRoot) === null || _g === void 0 ? void 0 : _g.querySelector("hui-panel-view"));
  }
  isVericarlCard() {
    var _a;
    const haCard = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("ha-card");
    return haCard ? haCard.offsetHeight > haCard.offsetWidth : false;
  }
  // ********************** fine interrogazione singola entità ******************
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const verticalCard = this.isVericarlCard();
    const panelMode = this.isPanelMode();
    const cardHeight = Math.round(this.getBoundingClientRect().height);
    if (!verticalCard) {
      this.chartHeight = cardHeight / 2.2;
    }
    const pv_nemuber = this.config.entities.length;
    this.cardCardWidth = Math.round(this.getBoundingClientRect().width);
    this.initializeLines();
    // Gestione opzionale di weather_entity
    let weatherObj = null;
    let weatherSvg = "";
    let renderIcon = "";
    if (((_a = this.config) === null || _a === void 0 ? void 0 : _a.weather_entity) && ((_b = this.hass) === null || _b === void 0 ? void 0 : _b.states[this.config.weather_entity])) {
      weatherObj = this.hass.states[this.config.weather_entity];
      weatherSvg = weatherObj.state;
      renderIcon = PhotovoltaicCard_1.iconMapping[weatherSvg] || (() => "");
    } else {
      console.warn("weather_entity is not configured or not found.");
    }
    // Inizializza i totali
    let pvTotalEnergy = 0;
    let pvTotal = 0;
    let batteryTotal = 0;
    let gridTotal = 0;
    // Calcola i valori delle entità configurate
    this.config.entities.forEach(entity => {
      var _a, _b, _c;
      const pvState = ((_a = this.hass.states[entity.pv]) === null || _a === void 0 ? void 0 : _a.state) ? parseInt(this.hass.states[entity.pv].state) || 0 : 0;
      const convertedPvState = entity.convert_to_watt || ((_c = (_b = this.hass.states[entity.pv]) === null || _b === void 0 ? void 0 : _b.attributes.unit_of_measurement) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === "kwh" ? pvState * 1000 : pvState;
      // Aggiungi al totale PV
      pvTotal += convertedPvState;
    });
    // Aggiorna il totale generale
    pvTotalEnergy += pvTotal;
    let gridState;
    if ((_c = this.config.grid) === null || _c === void 0 ? void 0 : _c.grid_entity) {
      const inverted = (_d = this.config.grid) === null || _d === void 0 ? void 0 : _d.inverted;
      if ((_e = this.config.grid) === null || _e === void 0 ? void 0 : _e.sell_energy) {
        const buy_energy = parseFloat((_f = this.hass.states[this.config.grid.grid_entity]) === null || _f === void 0 ? void 0 : _f.state) || 0;
        const sellEnergy = parseFloat((_h = this.hass.states[(_g = this.config.grid) === null || _g === void 0 ? void 0 : _g.sell_energy]) === null || _h === void 0 ? void 0 : _h.state) || 0;
        gridState = buy_energy + sellEnergy;
        // console.table({buy_energy, sellEnergy, gridState});
        gridTotal = sellEnergy > 0 ? sellEnergy : gridState;
        this.gridEnergyState = sellEnergy > 0 ? "sell" : (parseFloat((_j = this.hass.states[this.config.grid.sell_energy]) === null || _j === void 0 ? void 0 : _j.state) || 0) > 0 ? "sell" : "neutral";
        if (sellEnergy > 0) {
          this.gridEnergyState = "sell";
        } else if (buy_energy > 0) {
          this.gridEnergyState = "buy";
        } else {
          this.gridEnergyState = "neutral";
        }
      } else {
        gridState = inverted ? -(parseFloat((_k = this.hass.states[this.config.grid.grid_entity]) === null || _k === void 0 ? void 0 : _k.state) || 0) : parseFloat((_l = this.hass.states[this.config.grid.grid_entity]) === null || _l === void 0 ? void 0 : _l.state) || 0;
        gridTotal = Math.abs(gridState);
        this.gridEnergyState = gridState > 0 ? "buy" : gridState < 0 ? "sell" : "neutral";
      }
    }
    // console.log(gridTotal, this.gridEnergyState);
    // Calcola i valori per la batteria
    if ((_m = this.config.battery) === null || _m === void 0 ? void 0 : _m.power) {
      const batteryPower = Math.round(parseFloat(this.hass.states[this.config.battery.power].state));
      // let batteryPower;
      if ((_p = (_o = this.config) === null || _o === void 0 ? void 0 : _o.battery) === null || _p === void 0 ? void 0 : _p.battery_to_inverter) {
        const batteryToInverter = Math.round(this.hass.states[this.config.battery.battery_to_inverter].state);
        if (batteryToInverter > 0) {
          this.batterMode = "discharge";
          batteryTotal = batteryToInverter;
        } else if (batteryPower > 0) {
          this.batterMode = "charge";
          batteryTotal = batteryPower;
        } else {
          this.gridEnergyState = "neutral";
        }
        console.log(this.batterMode, batteryToInverter, batteryTotal);
      } else {
        this.batterMode = batteryPower > 0 ? 'charge' : 'discharge';
        batteryTotal = batteryPower > 0 ? batteryPower : -batteryPower;
      }
    }
    // potenza verso inverter
    const totalDcInput = Math.round(this.batterMode == "discharge" ? pvTotalEnergy : batteryTotal + pvTotalEnergy);
    let inverterEfficiency = (_q = this.config.inverter.inverter_efficency) !== null && _q !== void 0 ? _q : 0.96;
    let DcToAcTotal = (_t = (_s = (_r = this.config) === null || _r === void 0 ? void 0 : _r.grid) === null || _s === void 0 ? void 0 : _s.inverter_output) !== null && _t !== void 0 ? _t : totalDcInput * inverterEfficiency;
    if ((_u = this.config) === null || _u === void 0 ? void 0 : _u.inverter.inverter_output) {
      inverterEfficiency = totalDcInput > 0 ? DcToAcTotal / totalDcInput : 1;
    }
    // Calcola il totale di potenza
    const totalPower = Math.round(DcToAcTotal + (this.gridEnergyState == "buy" ? gridTotal : 0));
    // calcolo percentuali
    const pvPercentage = Number((pvTotal * inverterEfficiency / totalPower * 100).toFixed(2));
    const batteryPercentage = this.batterMode == "charge" ? Number((batteryTotal * inverterEfficiency / totalPower * 100).toFixed(2)) : 0;
    const gridPercentage = this.gridEnergyState == "buy" ? Number((gridTotal / totalPower * 100).toFixed(2)) : 0;
    // console.log('gridTotal', gridTotal ,'totalPower', totalPower);
    // console.table({gridTotal, totalPower});
    // console.log('pvPercentage', pvPercentage, 'batteryPercentage', batteryPercentage, 'gridPercentage', gridPercentage);
    const batteryPercentageNow = (_w = (_v = this.config.battery) === null || _v === void 0 ? void 0 : _v.battery_state) !== null && _w !== void 0 ? _w : "0";
    const batteryPercentageState = ((_x = this.hass.states[batteryPercentageNow]) === null || _x === void 0 ? void 0 : _x.state) ? parseInt(this.hass.states[batteryPercentageNow].state, 10) || 0 : 0;
    // Calcola la riduzione di CO2
    const c02 = parseFloat((this.totalWekkPvProduction * 0.25).toFixed(2));
    // Calcola il consumo totale settimanale
    const totalConsumption = Number(this.totalWekkPvProduction) + Number(this.gridWeekTotal);
    const totalWeekKwhPercentage = totalConsumption > 0 ? this.totalWekkPvProduction / totalConsumption * 100 : 0;
    return x`
      ${verticalCard ? x`
            <ha-card
              class="ha-card_vertical"
              style="height: ${panelMode ? "100%" : "900px"} !important;"
            >
              <div class="title">
                <div>E</div>
                <div>n</div>
                <div>e</div>
                <div>r</div>
                <div>g</div>
                <div>y</div>
                <div>C</div>
                <div>o</div>
                <div>n</div>
                <div>t</div>
                <div>r</div>
                <div>o</div>
                <div>l</div>
              </div>

              ${this.activeMenu === "home" ? x`
                    ${!this.showMoreElements ? x`
                          <div
                            id="homeContent"
                            style="display: flex; flex-direction: column;"
                          >
                            <div
                              style="display: flex; justify-content: center; flex-direction: column; gap: 50px; margin: auto 10%"
                            >
                              ${pv_nemuber >= 1 ? x`
                                    <div
                                      style="display: flex; justify-content: ${pv_nemuber == 1 ? "space-around" : "space-between"}"
                                    >
                                      ${weatherObj && pv_nemuber <= 2 ? x`
                                            <div
                                              style="width: 70px;cursor:pointer;"
                                              @click=${() => this._moreinfo(this.config.weather_entity)}
                                            >
                                              ${renderIcon}
                                            </div>
                                          ` : ""}
                                      ${this.entities.map(entity => {
      const entityId = entity.pv; // Estrai l'ID dell'entità dalla chiave 'pv'
      const maxPower = entity.max_power;
      const stateObj = this.hass.states[entityId];
      const unit = stateObj && stateObj.attributes.unit_of_measurement ? stateObj.attributes.unit_of_measurement : "";
      const state = stateObj ? (unit === null || unit === void 0 ? void 0 : unit.toLowerCase()) === "kwh" || entity.convert_to_watt ? Math.round(parseFloat(stateObj.state) * 1000) : Math.round(parseFloat(stateObj.state)) : "N/A";
      const percentage = state !== "N/A" && maxPower > 0 ? Math.round(state / maxPower * 100) : "N/A";
      return x`
                                          <div
                                            @click="${() => {
        if (entity.more_elements) {
          this.moreElemetsName = this.hass.states[entityId].attributes.friendly_name;
          this.dynamicFunction = () => pvIcon(state);
          this.dinamicContent = entity.more_elements;
          this.showMoreElements = true;
        } else {
          // Se more_elements non esiste, esegui this._moreinfo(entityId)
          this._moreinfo(entityId);
        }
      }}"
                                            id="pv-element"
                                            class="element-svg top tile tile_vertical"
                                            value="${state}"
                                            style=" cursor:pointer; background: linear-gradient(90deg, #4eb274 0%, #4eb274 ${percentage}%, #284932 ${percentage}%, #284932 100%);"
                                          >
                                            ${pvIcon(state)}
                                          </div>
                                        `;
    })}
                                    </div>
                                  ` : ""}
                              <!-- SVG Casa -->
                              <div
                                style="display:flex; justify-content:space-evenly; align-items: center;"
                              >
                                ${weatherObj && pv_nemuber > 2 ? x`
                                      <div
                                        style="display: flex; flex-direction: column;"
                                      >
                                        <div
                                          style="aspect-ratio: 1 / 1; width: 70px; cursor:pointer;"
                                          @click=${() => this._moreinfo(this.config.weather_entity)}
                                        >
                                          ${renderIcon}
                                        </div>
                                        <div class="weather_attributes">
                                          <div style="display: flex;">
                                            <div style="width: 25px;">
                                              ${cloudeCoverage()}
                                            </div>
                                            <div style="font-size: 12px">
                                              &nbsp;${weatherObj.attributes.cloud_coverage}%
                                            </div>
                                          </div>
                                          <div style="font-size: 12px">
                                            Uv:${weatherObj.attributes.uv_index}
                                          </div>
                                          <div style="display: flex;">
                                            <div style="width: 13px;">
                                              ${temperature()}
                                            </div>
                                            <div style="font-size: 12px">
                                              &nbsp;${weatherObj.attributes.temperature}${weatherObj.attributes.temperature_unit}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ` : ""}
                                ${weatherObj && pv_nemuber <= 2 ? x`
                                      <div
                                        style="display: grid; grid-template-columns: auto auto; grid-template-rows: 1fr 1fr 1fr; align-items: center;grid-column-gap:5px;"
                                      >
                                        <div style="width: 25px;">
                                          ${cloudeCoverage()}
                                        </div>
                                        <div style="font-size: 12px">
                                          &nbsp;${weatherObj.attributes.cloud_coverage}%
                                        </div>
                                        <div
                                          style="font-size: 12px; opacity: .76;"
                                        >
                                          Uv:
                                        </div>
                                        <div style="font-size: 12px">
                                          &nbsp;${weatherObj.attributes.uv_index}
                                        </div>
                                        <div style="width: 13px;">
                                          ${temperature()}
                                        </div>
                                        <div style="font-size: 12px">
                                          &nbsp;${weatherObj.attributes.temperature}${weatherObj.attributes.temperature_unit}
                                        </div>
                                      </div>
                                    ` : ""}

                                <div
                                  id="casa"
                                  class="element-svg tile tile_vertical"
                                  style="background: linear-gradient(118deg, #959c98 0%, #254344 100%);cursor: pointer;${pv_nemuber >= 3 ? "margin:auto;" : " "} "
                                  @click="${() => {
      var _a, _b;
      this.moreElemetsName = "Inverter";
      this.dynamicFunction = () => inverter();
      if (!((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.inverter) === null || _b === void 0 ? void 0 : _b.more_elements)) return; // Se non esiste, non fare nulla
      this.dinamicContent = this.config.inverter.more_elements;
      this.showMoreElements = true;
    }}"
                                >
                                  ${inverter()}
                                </div>
                              </div>
                              <div
                                style=" display: flex; justify-content:space-between; "
                              >
                                ${this.config.battery ? (() => {
      return x`
                                    <div
                                      id="battery"
                                      class="element-svg bottom tile tile_horizontal"
                                      value="${batteryTotal}"
                                      style="cursor: pointer; background-color: #b95618; border: 2px solid transparent; ${this.batterMode == "discharge" ? "animation: circular-border 2s infinite;" : ""}  "
                                      @click="${() => {
        var _a, _b, _c, _d;
        if ((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.battery) === null || _b === void 0 ? void 0 : _b.more_elements) {
          this.moreElemetsName = "Battery";
          this.dynamicFunction = () => battery(batteryTotal, batteryPercentageState, this.batterMode);
          this.dinamicContent = this.config.battery.more_elements;
          this.showMoreElements = true;
        } else {
          // Se more_elements non esiste, esegui this._moreinfo(entityId)
          this._moreinfo((_d = (_c = this.config) === null || _c === void 0 ? void 0 : _c.battery) === null || _d === void 0 ? void 0 : _d.power);
        }
      }}"
                                    >
                                          ${battery(batteryTotal, batteryPercentageState, this.batterMode)}
                                        </div>
                                      `;
    })() : ""}
                                <div
                                  id="home_tile"
                                  class="element-svg bottom tile tile_vertical"
                                  value="${totalPower}"
                                  style="background: linear-gradient(118deg, #959c98 0%, #254344 100%); "
                                  @click="${() => {
      var _a, _b;
      this.moreElemetsName = "Home";
      this.dynamicFunction = () => inverter();
      if (!((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.inverter) === null || _b === void 0 ? void 0 : _b.more_elements)) return; // Se non esiste, non fare nulla
      this.dinamicContent = this.config.inverter.more_elements;
      this.showMoreElements = true;
    }}"
                                >
                                  ${home(totalPower, pvPercentage, batteryPercentage)}
                                </div>
                                ${this.config.grid ? (() => {
      var _a, _b;
      const maxPower = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.grid) === null || _b === void 0 ? void 0 : _b.max_power;
      const percentage = Math.round(gridTotal / maxPower * 100);
      return x`
                                        <div
                                          id="grid-power-direct"
                                          class="element-svg bottom tile tile_vertical"
                                          value="${gridTotal}"
                                          style=${`cursor: pointer; ${this.gridEnergyState == "buy" ? `background: linear-gradient(90deg, #235adf 0%, #235adf ${percentage}%, #2a3948 ${percentage}%, #2a3948 100%);` : 'background-color: #2a3948;'}`}
                                          @click="${() => {
        var _a, _b;
        if (this.config.grid.more_elements) {
          this.moreElemetsName = "Grid";
          this.dynamicFunction = () => gridPower(gridTotal, this.gridEnergyState);
          this.dinamicContent = this.config.grid.more_elements;
          this.showMoreElements = true;
        } else {
          // Se more_elements non esiste, esegui this._moreinfo(entityId)
          this._moreinfo((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.grid) === null || _b === void 0 ? void 0 : _b.grid_entity);
        }
      }}"
                                        >
                                          ${gridPower(gridTotal, this.gridEnergyState)}
                                        </div>
                                      `;
    })() : ""}
                              </div>
                              <!-- Linee dinamiche -->
                              <svg
                                class="lines-svg"
                                style="width: 100%; height: 100%; z-index: 1; pointer-events: none;"
                              ></svg>
                            </div>
                            <!-- ****************** info **************************** -->
                            <div
                              style="margin-left: 5%; margin-right: 5%; margin-top: auto;"
                            >
                              <div>produzione ultimi 7 giorni</div>
                              <div class="home_info">
                                <div class="info_column">
                                  <ha-icon
                                    icon="mdi:molecule-co2"
                                    class="info_icon"
                                  ></ha-icon>
                                  ${c02 > 0 ? x` <div>${c02} kg</div> ` : x` <div style="width:25px;">
                                        ${loader()}
                                      </div>`}
                                  <div>co2 risparmiata</div>
                                </div>
                                <div
                                  style="width: 2px; height: 80%; background-color: var(--divider-color);"
                                ></div>
                                <div class="info_column">
                                  <ha-icon
                                    icon="mdi:piggy-bank"
                                    class="info_icon"
                                  ></ha-icon>
                                  ${this.totalWekkPvProduction > 0 ? x`
                                        <div>
                                          ${this.totalWekkPvProduction} Kwh
                                        </div>
                                      ` : x` <div style="width:25px;">
                                        ${loader()}
                                      </div>`}

                                  <div>risparmio</div>
                                </div>
                                <div
                                  style="width: 2px; height: 80%; background-color: var(--divider-color);"
                                ></div>
                                <div class="info_column">
                                  <ha-icon
                                    icon="mdi:home"
                                    class="info_icon"
                                  ></ha-icon>
                                  ${totalWeekKwhPercentage > 0 ? x`
                                        <div>
                                          ${totalWeekKwhPercentage.toFixed(1)}%
                                        </div>
                                      ` : x` <div style="width:25px;">
                                        ${loader()}
                                      </div>`}

                                  <div>autosufficienza</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ` : x`
                          <div class="more_elements_container">
                            <div
                              style="padding: 20px 20px 15px 20px; display:flex;justify-content: center; align-items: center;"
                            >
                              <div
                                class="element-svg tile tile_vertical"
                                style="background: linear-gradient(118deg, #959c98 0%, #254344 100%);cursor: pointer;  width:70px; height:70px;"
                              >
                                ${this.dynamicFunction()}
                              </div>
                              <div class="more_elemnts_divider ">
                                ${this.moreElemetsName}
                              </div>
                              <div
                                class="element-svg tile tile_vertical back_button"
                                style="background: linear-gradient(118deg, #959c98 0%, #254344 100%);"
                                @click="${() => {
      this.showMoreElements = false;
      this.moreElements_Cards = null;
    }}"
                              >
                                back
                              </div>
                            </div>
                            <div id="style-2" class="more_elements">
                              ${this.generateMoreElements(this.dinamicContent)}
                            </div>
                          </div>
                        `}
                  ` : ""}
              ${this.activeMenu === "chart" ? x`
            <div class"arci" style="display: flex; flex-direction: column;">
            <div style="flex-grow: 4;"> 
              ${this.swicthChart ? x`
                      <h3>Previsioni Produzione Fotovoltaica</h3>
                      <div class="production_range">
                        <label for="interval-slider"
                          >Intervallo: ${this._interval} minuti</label
                        >
                        <div class="range-container">
                          <input
                            id="interval-slider"
                            type="range"
                            min="1"
                            max="30"
                            .value="${this._interval}"
                            @input="${this._onSliderInput}"
                            @change="${this._atSliderChange}"
                          />
                          <div class="offset_label">
                            <span class="range-thumb-label"
                              >${this._interval}</span
                            >
                          </div>
                        </div>
                      </div>
                      <div id="chart"></div>
                    ` : x`
                      <h3 style="margin-bottom: 70px;">
                        Andamento Settimanale (Ultimi 7 Giorni)
                      </h3>
                      <div id="week-chart"></div>
                      <!-- Nuovo contenitore per il secondo grafico -->
                    `}
                </div>
                <div class="chart-cutton-container">
                  <button class="chart-button-select"
                @click="${() => {
      this.swicthChart = true;
      // this.showWeeklyChart = false;
      this._initializeChart(this.seriesData);
    }}"
              >
                Toggle Chart and Update
              </button>
              <div style="width: 2px; height: 80%; background-color: var(--divider-color); align-self: center;"></div>
              <button class="chart-button-select"
                  @click="${() => {
      this.swicthChart = false;
      this.initializeApexChart(this.chartdata, "week-chart");
    }}"
                >
                  inizilte week chart
                </button>
                </div>
            </div>    
            ` : ""}
              ${this.activeMenu === "tile" ? x`
                    <div
                      style="display: flex; flex-direction: column; gap: 10px;"
                    >
                      ${this.createTileCards().map(tile => tile)}
                    </div>
                  ` : ""}
              ${this.activeMenu === "heatmap" ? x` <div id="heatmap-chart"></div> ` : ""}

              <!-- ******************* bottom menu ****************** -->
              <div class="bottom_bar_vertical">
                <ha-icon
                  icon="mdi:home"
                  class="menu_icon ${this.activeMenu === "home" ? "menu_icon_on" : ""}"
                  @click="${() => {
      this.activeMenu = "home";
    }}"
                ></ha-icon>
                <ha-icon
                  icon="mdi:chart-areaspline"
                  class="menu_icon ${this.activeMenu === "chart" ? "menu_icon_on" : ""}"
                  @click="${() => {
      this.activeMenu = "chart";
      this._initializeChart(this.seriesData);
    }}"
                ></ha-icon>
                <ha-icon
                  icon="mdi:view-grid-compact"
                  class="menu_icon ${this.activeMenu === "heatmap" ? "menu_icon_on" : ""}"
                  @click="${() => {
      this.activeMenu = "heatmap";
      this.get_recorder_for_heatmap();
      // this.initializeHeatmapChart();
    }}"
                ></ha-icon>
                <ha-icon
                  icon="mdi:format-list-numbered"
                  class="menu_icon ${this.activeMenu === "tile" ? "menu_icon_on" : ""}"
                  @click="${() => {
      this.activeMenu = "tile";
    }}"
                ></ha-icon>
              </div>
            </ha-card>
          ` : x`
            <!-- ********************************************************************************************************************** -->
            <!-- ********************************************************************************************************************** -->
            <!-- ********************************************************************************************************************** -->
            <ha-card
              class="ha-card_horizontal scaled-container"
              style="height: ${panelMode ? "100%" : "900px"} !important;"
            >
              <!-- ************************** title *************************************** -->
              <div class="title_horizontal" style="width: 100">
                <div>E</div>
                <div>n</div>
                <div>e</div>
                <div>r</div>
                <div>g</div>
                <div>y</div>
                <div>C</div>
                <div>o</div>
                <div>n</div>
                <div>t</div>
                <div>r</div>
                <div>o</div>
                <div>l</div>
              </div>

              <!-- ************************** main flow **************************************** -->

              ${!this.showMoreElements ? x`
                    
                      <div
                        style="margin: 3vh 13% 10vh; display: flex; justify-content: space-between; flex-direction: column; grid-area: pv;"
                      >
                        ${pv_nemuber >= 1 ? x`
                                <div
                                  style="height:10vh; display: flex; justify-content: ${pv_nemuber == 1 ? "space-around" : "space-between"}"
                                >
                                  ${weatherObj && pv_nemuber <= 2 ? x`
                                        <div
                                          style="width: 12vh;cursor:pointer;"
                                          @click=${() => this._moreinfo(this.config.weather_entity)}
                                        >
                                          ${renderIcon}
                                        </div>
                                      ` : ""}
                                  ${this.entities.map(entity => {
      const entityId = entity.pv; // Estrai l'ID dell'entità dalla chiave 'pv'
      const maxPower = entity.max_power;
      const stateObj = this.hass.states[entityId];
      const unit = stateObj && stateObj.attributes.unit_of_measurement ? stateObj.attributes.unit_of_measurement : "";
      const state = stateObj ? (unit === null || unit === void 0 ? void 0 : unit.toLowerCase()) === "kwh" || entity.convert_to_watt ? Math.round(parseFloat(stateObj.state) * 1000) : Math.round(parseFloat(stateObj.state)) : "N/A";
      const percentage = state !== "N/A" && maxPower > 0 ? Math.round(state / maxPower * 100) : "N/A";
      return x`
                                      <div
                                        @click="${() => {
        if (entity.more_elements) {
          this.moreElemetsName = this.hass.states[entityId].attributes.friendly_name;
          this.dynamicFunction = () => pvIcon(state);
          this.dinamicContent = entity.more_elements;
          this.showMoreElements = true;
        } else {
          // Se more_elements non esiste, esegui this._moreinfo(entityId)
          this._moreinfo(entityId);
        }
      }}"
                                        id="pv-element"
                                        class="element-svg top tile tile_horizontal"
                                        value="${state}"
                                        style=" cursor:pointer; background: linear-gradient(90deg, #4eb274 0%, #4eb274 ${percentage}%, #284932 ${percentage}%, #284932 100%);"
                                      >
                                        ${pvIcon(state)}
                                      </div>
                                    `;
    })}
                                </div>
                              ` : ""}
                        <!-- SVG Casa -->
                        <div
                          style="display:flex; justify-content:space-evenly; align-items: center; height:10vh;"
                        >
                          ${weatherObj && pv_nemuber > 2 ? x`
                                  <div
                                    style="display: flex; flex-direction: column;"
                                  >
                                    <div
                                      style="aspect-ratio: 1 / 1; width: 12vh; cursor:pointer;"
                                      @click=${() => this._moreinfo(this.config.weather_entity)}
                                    >
                                      ${renderIcon}
                                    </div>
                                    <div class="weather_attributes">
                                      <div style="display: flex;">
                                        <div style="width: 3vh">
                                          ${cloudeCoverage()}
                                        </div>
                                        <div
                                          style="font-size: 1.6vh;opacity: .76;align-self: center;"
                                        >
                                          &nbsp;${weatherObj.attributes.cloud_coverage}%
                                        </div>
                                      </div>
                                      <div
                                        style="font-size: 1.6vh;opacity: .76;align-self: center;"
                                      >
                                        Uv:${weatherObj.attributes.uv_index}
                                      </div>
                                      <div style="display: flex;">
                                        <div style="width: 1.6vh;">
                                          ${temperature()}
                                        </div>
                                        <div
                                          style="font-size: 1.6vh;opacity: .76;align-self: center;"
                                        >
                                          &nbsp;${weatherObj.attributes.temperature}${weatherObj.attributes.temperature_unit}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ` : ""}
                          ${weatherObj && pv_nemuber <= 2 ? x`
                                  <div
                                    style="display: grid;height:100%; grid-template-columns: auto auto; grid-template-rows: 1fr 1fr 1fr; align-items: center;grid-column-gap:5px;"
                                  >
                                    <div
                                      style="height:100%; aspect-ratio: 1 / 1;"
                                    >
                                      ${cloudeCoverage()}
                                    </div>
                                    <div style="font-size: 2vh;opacity: .76;">
                                      &nbsp;${weatherObj.attributes.cloud_coverage}%
                                    </div>
                                    <div style="font-size: 2vh; opacity: .76;">
                                      Uv:
                                    </div>
                                    <div style="font-size: 2vh;opacity: .76;">
                                      &nbsp;${weatherObj.attributes.uv_index}
                                    </div>
                                    <div style="height:100%; width: 2vh;">
                                      ${temperature()}
                                    </div>
                                    <div style="font-size: 2vh; opacity: .76;">
                                      &nbsp;${weatherObj.attributes.temperature}${weatherObj.attributes.temperature_unit}
                                    </div>
                                  </div>
                                ` : ""}

                          <div
                            id="casa"
                            class="element-svg tile tile_horizontal"
                            style="background: linear-gradient(118deg, #959c98 0%, #254344 100%);cursor: pointer;${pv_nemuber >= 3 ? "margin:auto;" : " "} "
                            @click="${() => {
      var _a, _b;
      this.moreElemetsName = "Inverter";
      this.dynamicFunction = () => inverter();
      if (!((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.inverter) === null || _b === void 0 ? void 0 : _b.more_elements)) return; // Se non esiste, non fare nulla
      this.dinamicContent = this.config.inverter.more_elements;
      this.showMoreElements = true;
    }}"
                          >
                            ${inverter()}
                          </div>
                        </div>
                        <div
                          style=" display: flex; justify-content:space-between; height:10vh;"
                        
                        >
                          ${this.config.battery ? (() => {
      return x`
                                    <div
                                      id="battery"
                                      class="element-svg bottom tile tile_horizontal"
                                      value="${batteryTotal}"
                                      style="cursor: pointer; background-color: #b95618; border: 2px solid transparent; ${this.batterMode == "discharge" ? "animation: circular-border 2s infinite;" : ""}  "
                                      @click="${() => {
        var _a, _b, _c, _d;
        if ((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.battery) === null || _b === void 0 ? void 0 : _b.more_elements) {
          this.moreElemetsName = "Battery";
          this.dynamicFunction = () => battery(batteryTotal, batteryPercentageState, this.batterMode);
          this.dinamicContent = this.config.battery.more_elements;
          this.showMoreElements = true;
        } else {
          // Se more_elements non esiste, esegui this._moreinfo(entityId)
          this._moreinfo((_d = (_c = this.config) === null || _c === void 0 ? void 0 : _c.battery) === null || _d === void 0 ? void 0 : _d.power);
        }
      }}"
                                    >
                                      ${battery(batteryTotal, batteryPercentageState, this.batterMode)}
                                    </div>
                                  `;
    })() : ""}
                          <div
                            id="home_tile"
                            class="element-svg bottom tile tile_horizontal"
                            value="${totalPower}"
                            style="background: linear-gradient(118deg, #959c98 0%, #254344 100%); "
                             @click="${() => {
      var _a, _b;
      this.moreElemetsName = "Home";
      this.dynamicFunction = () => inverter();
      if (!((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.inverter) === null || _b === void 0 ? void 0 : _b.more_elements)) return; // Se non esiste, non fare nulla
      this.dinamicContent = this.config.inverter.more_elements;
      this.showMoreElements = true;
    }}"
                          >
                            ${home(totalPower, pvPercentage, batteryPercentage)}
                          </div>
                          ${this.config.grid ? (() => {
      var _a, _b;
      const maxPower = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.grid) === null || _b === void 0 ? void 0 : _b.max_power;
      const percentage = Math.round(gridTotal / maxPower * 100);
      return x`
                                    <div
                                      id="grid-power-direct"
                                      class="element-svg bottom tile tile_horizontal"
                                      value="${gridTotal}"
                                      style=${`cursor: pointer; ${this.gridEnergyState == "buy" ? `background: linear-gradient(90deg, #235adf 0%, #235adf ${percentage}%, #2a3948 ${percentage}%, #2a3948 100%);` : 'background-color: #2a3948;'}`}

                                      @click="${() => {
        var _a, _b;
        if (this.config.grid.more_elements) {
          this.moreElemetsName = "Grid";
          this.dynamicFunction = () => gridPower(gridTotal, this.gridEnergyState);
          this.dinamicContent = this.config.grid.more_elements;
          this.showMoreElements = true;
        } else {
          // Se more_elements non esiste, esegui this._moreinfo(entityId)
          this._moreinfo((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.grid) === null || _b === void 0 ? void 0 : _b.grid_entity);
        }
      }}"
                                    >
                                      ${gridPower(gridTotal, this.gridEnergyState)}
                                    </div>
                                  `;
    })() : ""}
                        </div>
                        <!-- Linee dinamiche -->
                        <svg
                          class="lines-svg"
                          style="width: 100%; height: 100%; z-index: 1; pointer-events: none;"
                        ></svg>
                      </div>
                      </div>
                                          
                  ` : x`
                    <div class="more_elements_container_horizontal">
                      <div
                        style="padding: 20px 20px 15px 20px; display:flex;justify-content: center; align-items: center;"
                      >
                        <div
                          class="element-svg tile tile_horizontal"
                          style="background: linear-gradient(118deg, #959c98 0%, #254344 100%);cursor: pointer;  width:10vh; height:10vh;"
                        >
                          ${this.dynamicFunction()}
                        </div>
                        <div class="more_elemnts_divider ">
                          ${this.moreElemetsName}
                        </div>
                        <div
                          class="element-svg tile  back_button"
                          style="background: linear-gradient(118deg, #959c98 0%, #254344 100%); height:10vh; width: 10vh;"
                          @click="${() => {
      this.showMoreElements = false;
      this.moreElements_Cards = null;
    }}"
                        >
                          back
                        </div>
                      </div>
                      <div id="style-2" class="more_elements">
                        ${this.generateMoreElements(this.dinamicContent)}
                      </div>
                    </div>
                  `}

              <!-- ************************** chart container *************************************** -->
              <div class="mainChartHorizonatContainer">
                <div style="width: 20%; display: flex;flex-direction: column;">
                  <div style="opacity: 0.4;">
                    <svg
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 1190.9 1040.9"
                      style="enable-background:new 0 0 1190.9 1040.9;"
                      xml:space="preserve"
                    >
                      <style type="text/css">
                        .st0_logo {
                          fill: #ffffff;
                        }
                        .st1_logo {
                          fill: #534741;
                        }
                        .st2_logo {
                          opacity: 0.29;
                        }
                      </style>
                      <path class="st0_logo" d="M2118.9-650.2" />
                      <g>
                        <g>
                          <path
                            class="st1_logo"
                            d="M905.6,489.9l-10.5,65.2c-2.1,12.9,9.5,20.6,26.1,17.1l89.8-19c18.2-3.8,34.5-18.1,36.1-31.8l8.4-68.9
                              c1.6-13.1-11.7-19.8-29.4-15.3L938.4,460C922.2,464.2,907.6,477.5,905.6,489.9z"
                          />
                          <path
                            class="st1_logo"
                            d="M760.3,606.3l77.6-16.4c15.6-3.3,30.2-16.4,32.3-29.2l10.8-64.6c2-12.3-8.9-18.9-24.2-15l-76.1,19.6
                              c-14.1,3.6-27.3,16-29.6,27.7l-12.2,61.4C736.4,601.9,746,609.3,760.3,606.3z"
                          />
                          <path
                            class="st1_logo"
                            d="M459.5,780.4l68.2-10.4c12.1-1.8,24.4-13.2,27.2-25.2l14.5-61.2c2.7-11.6-4.9-19-16.8-16.6l-67.4,13.7
                              c-11,2.2-22.2,12.9-25.1,24l-15.2,58.1C441.9,774.1,448.4,782.1,459.5,780.4z"
                          />
                          <path
                            class="st1_logo"
                            d="M524.7,873l15.4-65.1c2.9-12.3-4.7-20.9-16.9-19.2l-68.3,9.8c-11.2,1.6-22.6,12.3-25.7,24L413.1,884
                              c-3.2,12.1,3.3,21.2,14.6,20.2l69.1-6C509.1,897.1,521.7,885.8,524.7,873z"
                          />
                          <path
                            class="st1_logo"
                            d="M620.3,635.9l67.7-14.3c13.6-2.9,26.8-15,29.2-27.1l12.4-60.8c2.4-11.6-6.7-18.1-20.1-14.6l-66.7,17.2
                              c-12.4,3.2-24.4,14.7-27,25.7l-13.4,58C599.8,631.4,607.7,638.6,620.3,635.9z"
                          />
                          <path
                            class="st1_logo"
                            d="M691.1,722.6l13.3-65.1c2.5-12.3-6.6-20-20.3-17.2l-67.9,13.8c-12.6,2.6-24.9,14.1-27.6,25.8l-14.3,61.8
                              c-2.8,12.2,5.1,20.5,17.9,18.6l68.9-10.5C674.9,747.6,688.4,735.4,691.1,722.6z"
                          />
                          <path
                            class="st1_logo"
                            d="M884.3,622.9L873,693c-2.2,13.8,9.6,23.1,26.6,20.5l92.3-14c18.7-2.8,35.6-17.2,37.4-31.9l9.1-74.4
                              c1.7-14.1-11.9-22.3-30.1-18.6l-90.2,18.3C901.5,596.2,886.4,609.6,884.3,622.9z"
                          />
                          <path
                            class="st1_logo"
                            d="M699.6,786.9l-14,70.2c-2.8,13.8,7,24.1,22,22.8l81.1-7.1c16.4-1.4,31.9-14.6,34.3-29.3l12.4-74.5
                              c2.3-14.1-9-23.6-25-21.3l-79.6,11.4C716.2,761.2,702.3,773.6,699.6,786.9z"
                          />
                          <path
                            class="st1_logo"
                            d="M726.2,653.3L713.1,719c-2.6,12.9,7.1,21.7,21.8,19.5l79.3-12.1c16-2.4,31-15.6,33.3-29.3l11.6-69.4
                              c2.2-13.1-8.9-21.1-24.6-17.9l-77.8,15.8C742.2,628.5,728.7,640.9,726.2,653.3z"
                          />
                          <path
                            class="st1_logo"
                            d="M796.9,1000.8l13.4-80.1c2.5-15.1-9-26.3-25.4-25l-81.4,6.2c-15,1.2-29.4,13.5-32.2,27.8l-14.9,75.1
                              c-2.9,14.8,6.9,26.7,22.2,26.5l83-1.3C778.3,1029.8,794.3,1016.6,796.9,1000.8z"
                          />
                          <path
                            class="st1_logo"
                            d="M988.9,722.3l-92.7,13.2c-17.1,2.4-32.6,15.9-34.9,30.1l-12.1,75.3c-2.4,14.9,9.6,25.8,27.1,24.3l94.9-8.3
                              c19.3-1.7,36.7-16,38.7-31.9l9.8-80.3C1021.7,729.6,1007.7,719.6,988.9,722.3z"
                          />
                          <path
                            class="st1_logo"
                            d="M562.2,892.5l70.1-6.1c14.1-1.2,28-13.4,30.8-27.1l14.2-69.5c2.7-13.2-6.6-22.1-20.5-20.2l-69.1,9.9
                              c-12.8,1.8-25.4,13.3-28.3,25.8L544.3,871C541.3,884,549.2,893.6,562.2,892.5z"
                          />
                          <path
                            class="st1_logo"
                            d="M583.5,624.1l13.6-57.5c2.6-11-5-17.3-16.8-14.3l-66.5,17.1c-10.9,2.8-21.8,13.5-24.6,23.9l-14.3,54.7
                              c-2.8,10.8,3.7,17.7,14.7,15.4l67.3-14.2C568.8,646.8,580.8,635.5,583.5,624.1z"
                          />
                          <path
                            class="st1_logo"
                            d="M492.4,1009.4l16.4-69.3c3.1-13.1-4.5-23-16.8-22l-69.3,5.3c-11.3,0.9-23,11.6-26.2,24l-17.1,65.3
                              c-3.4,12.9,3,23.2,14.5,23l70-1.1C476.3,1034.4,489.2,1023.1,492.4,1009.4z"
                          />
                          <path
                            class="st1_logo"
                            d="M836.8,919l-13,81.1c-2.6,16,9.7,28.9,27.6,28.6l97.7-1.5c19.9-0.3,37.9-14.6,40.1-31.8l10.6-86.9
                              c2-16.4-12.3-28.4-31.7-26.9l-95.3,7.3C855.2,890.2,839.2,903.7,836.8,919z"
                          />
                          <path
                            class="st1_logo"
                            d="M627.9,907.7l-70.3,5.4c-13,1-26,12.5-29,25.8l-16.2,70c-3.2,13.8,4.8,24.9,18,24.7l71.4-1.1
                              c14.4-0.2,28.7-12.4,31.7-27l15.2-74.3C651.4,917,642.1,906.6,627.9,907.7z"
                          />
                        </g>
                        <g>
                          <path
                            class="st1_logo"
                            d="M349.4,1015.9l28.9-114.4c-111.6-72-181-201.4-169.3-342.9C225.9,354.1,405.4,202,609.9,218.9
                              c140.9,11.7,256.7,100.6,309.7,221.6l131.1-32.4c-76.1-34.3-111.3-137-49.8-212.2v0C897.6,269.1,758.8,175,788.5,52
                              c-61.4,110.7-227.2,86.2-253.8-37.6c-7.2,126.4-167.3,176.2-245,76.3c48.3,117-74.3,231.4-187.6,175
                              c94.3,84.5,33.5,240.7-93.1,239.1c121.6,35.2,134.6,202.3,19.8,255.8c124.8-21.1,209,123.9,128.9,221.9
                              C225.6,934.4,308.8,958.6,349.4,1015.9z"
                          />
                          <g class="st2_logo">
                            <path
                              class="st1_logo"
                              d="M354.7,994.7l18.9-75l0-0.2c-122.9-76.6-194.1-217.6-182.1-362.3C208.2,357,378.3,200.2,578.8,200.2
                                c10.8,0,21.7,0.5,32.5,1.3c140.7,11.6,262.7,97.5,321.4,225.3l89-15c-26.1-17.4-46.9-42.9-58.9-73.6
                                c-13.4-34.3-14-70.7-2.8-104.1c-12.4,3.3-25.1,4.9-37.9,4.9c-47.2,0-93-22.5-122.7-60.2c-17.5-22.2-28.1-47.8-31.4-74.8
                                c-27.1,23-61.5,35.9-98.7,35.9c-54.2,0-102.3-27-130.1-69.9c-26,59.5-86.6,91-142.6,91c-28.7,0-55.5-7.6-78.9-22
                                c1,31.1-7.7,61.9-25.7,88.9c-29.3,43.7-77.3,69.8-128.6,69.8c-5,0-10-0.3-15-0.8c19.9,38,22.8,82.9,6.4,125.7
                                c-16.6,43.5-49.4,75.4-90.4,90.1c34.7,25.8,56.7,65.3,60.3,111.5c3.6,46.2-12.1,88.7-42.5,119.5c47.1,9.2,87.4,40.4,109,86
                                c17.7,37.4,19.9,77.5,7.4,114.3c12.3-3.2,24.9-4.9,37.6-4.9C282.7,939.4,325.8,960.9,354.7,994.7z"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div class="current_percentage">
                    <div class="inner_meter">
                      <div
                        class="grid"
                        style="height:${gridPercentage}%"
                      >
                        <ha-icon icon="mdi:factory" class="bar_icon"></ha-icon>
                      </div>
                      <div class="battery" style="height:${batteryPercentage}%">
                        <ha-icon
                          icon="mdi:battery-high"
                          class="bar_icon"
                          style="transform: rotate(90deg);"
                        ></ha-icon>
                      </div>
                      <div class="photovoltaic" style="height:${pvPercentage}%">
                        <ha-icon
                          icon="mdi:solar-power-variant-outline"
                          class="bar_icon"
                        ></ha-icon>
                      </div>
                    </div>
                    <div class="homePer">
                      <ha-icon icon="mdi:home" class="bar_icon"></ha-icon>
                    </div>
                  </div>
                </div>
                <div
                  style="width:70%; display: flex; flex-direction: column; align-self: flex-end;"
                >
                  ${this.activeMenu === "home" ? x`
                        <h3 style="font-size: 2vh; margin: 0 0 1vh;">
                          Previsioni Produzione Fotovoltaica
                        </h3>
                        <div class="production_range">
                          <label for="interval-slider" style="font-size: 1.4vh"
                            >Intervallo: ${this._interval} minuti</label
                          >
                          <div class="range-container">
                            <input
                              class="slider_in_horizontal_view"
                              id="interval-slider"
                              type="range"
                              min="1"
                              max="30"
                              .value="${this._interval}"
                              @input="${this._onSliderInput}"
                              @change="${this._atSliderChange}"
                            />
                            <div class="offset_label">
                              <span class="range-thumb-label"
                                >${this._interval}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div id="chart"></div>
                      ` : ""}
                  ${this.activeMenu === "chart" ? x`

                              <h3 style="margin-bottom: 70px;">
                                Andamento Settimanale (Ultimi 7 Giorni)
                              </h3>
                              <div id="week-chart"></div>
                              <!-- Nuovo contenitore per il secondo grafico -->
                        </div>
                      ` : ""}
                  ${this.activeMenu === "tile" ? x`
                        <div
                          style="display: flex; flex-direction: column; gap: 10px;"
                        >
                          ${this.createTileCards().map(tile => tile)}
                        </div>
                      ` : ""}
                  ${this.activeMenu === "heatmap" ? x` <div id="heatmap-chart"></div> ` : ""}
                </div>
              </div>

              <!-- ************************** 7 day text *************************************** -->

              <div
                style="font-size: 2vh; margin-bottom:2vh;grid-area: daystext;"
              >
                produzione ultimi 7 giorni
              </div>

              <!-- ************************** info *************************************** -->
              <div style="grid-area: info;">
                <div class="home_info" style="height: 14vh;">
                  <div class="info_column">
                    <ha-icon
                      style="--mdc-icon-size: 5.5vh;"
                      icon="mdi:molecule-co2"
                      class="info_icon"
                    ></ha-icon>
                    ${c02 > 0 ? x` <div style="font-size:2vh;">${c02} kg</div> ` : x` <div style="width:25px;">${loader()}</div>`}
                    <div style="font-size:1.6vh;">co2 risparmiata</div>
                  </div>
                  <div
                    style="width: 2px; height: 80%; background-color: var(--divider-color);"
                  ></div>
                  <div class="info_column">
                    <ha-icon
                      style="--mdc-icon-size: 5.5vh;"
                      icon="mdi:piggy-bank"
                      class="info_icon"
                    ></ha-icon>
                    ${this.totalWekkPvProduction > 0 ? x`
                          <div style="font-size:2vh;">
                            ${this.totalWekkPvProduction} Kwh
                          </div>
                        ` : x` <div style="width:25px;">${loader()}</div>`}

                    <div style="font-size:1.6vh;">risparmio</div>
                  </div>
                  <div
                    style="width: 2px; height: 80%; background-color: var(--divider-color);"
                  ></div>
                  <div class="info_column">
                    <ha-icon
                      style="--mdc-icon-size: 5.5vh;"
                      icon="mdi:home"
                      class="info_icon"
                    ></ha-icon>
                    ${totalWeekKwhPercentage > 0 ? x`
                          <div style="font-size:2vh;">
                            ${totalWeekKwhPercentage.toFixed(1)}%
                          </div>
                        ` : x` <div style="width:25px;">${loader()}</div>`}

                    <div style="font-size:1.6vh;">autosufficienza</div>
                  </div>
                </div>
              </div>

              <!-- ******************* bottom menu ****************** -->
              <div class="bottom_bar_horizontal">
                <ha-icon
                  icon="mdi:chart-areaspline"
                  class="menu_icon_horizontal ${this.activeMenu === "home" ? "menu_icon_on" : ""}"
                  @click="${() => {
      this.activeMenu = "home";
      this._initializeChart(this.seriesData);
    }}"
                ></ha-icon>
                <ha-icon
                  icon="mdi:chart-box-outline"
                  class="menu_icon_horizontal ${this.activeMenu === "chart" ? "menu_icon_on" : ""}"
                  @click="${() => {
      this.activeMenu = "chart";
      this.initializeApexChart(this.chartdata, "week-chart");
    }}"
                ></ha-icon>
                <ha-icon
                  icon="mdi:view-grid-compact"
                  class="menu_icon_horizontal ${this.activeMenu === "heatmap" ? "menu_icon_on" : ""}"
                  @click="${() => {
      this.activeMenu = "heatmap";
      this.get_recorder_for_heatmap();
      // this.initializeHeatmapChart();
    }}"
                ></ha-icon>
                <ha-icon
                  icon="mdi:format-list-numbered"
                  class="menu_icon_horizontal ${this.activeMenu === "tile" ? "menu_icon_on" : ""}"
                  @click="${() => {
      this.activeMenu = "tile";
    }}"
                ></ha-icon>
              </div>
            </ha-card>
          `}
    `;
  }
  //   // ******************************* fine heatmap **********************
  getNowTime() {
    this.startTime = new Date();
    this.endTime = new Date();
    this.startTime.setDate(this.endTime.getDate() - 7);
    this.startTime.setHours(23, 0, 0);
    this.endTime.setHours(23, 59, 59, 999);
  }
  async firstUpdated() {
    var _a, _b, _c, _d, _e, _f, _g;
    this.daysToEvaluate = this.config.days ? this.config.days : 7;
    this.getNowTime();
    // Ottieni latitudine e longitudine da Home Assistant
    const latitude = this.hass.config.latitude;
    const longitude = this.hass.config.longitude;
    if (latitude === undefined || longitude === undefined) {
      const now = new Date().getTime();
      return {
        min: now - 6 * 60 * 60 * 1000,
        max: now + 6 * 60 * 60 * 1000
      }; // Valori di default
    }
    // Calcola alba e tramonto usando SunCalc
    const times = suncalcExports.getTimes(new Date(), latitude, longitude);
    this.dawnTime = times.sunrise.getTime(); // Alba
    this.duskTime = times.sunset.getTime(); // Tramonto
    this.formatDataForWeekApexChart();
    this.panelMode = this.config.panel_mode ? this.config.panel_mode : false;
    this._applyDynamicStyles();
    const slider = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input[type="range"]');
    if (slider) {
      requestAnimationFrame(() => this._updateLabelPosition(slider));
      this._updateLabelPosition(slider);
      const resizeObserver = new ResizeObserver(() => {
        this._updateLabelPosition(slider);
        this.requestUpdate();
      });
      resizeObserver.observe(slider.parentElement);
    }
    this._fetchTodayData();
    if (((_c = (_b = this.config) === null || _b === void 0 ? void 0 : _b.grid) === null || _c === void 0 ? void 0 : _c.grid_meter) && this.gridWeekTotal === null) {
      this.askForEntity(this.config.grid.grid_meter, 8, (_d = this.config.grid) === null || _d === void 0 ? void 0 : _d.unit_of_measurament).then(gridAsk => {
        this.gridWeek = gridAsk;
        this.gridWeekTotal = gridAsk.totale;
      });
    }
    if ((_f = (_e = this.config) === null || _e === void 0 ? void 0 : _e.battery) === null || _f === void 0 ? void 0 : _f.battery_meter) {
      this.askForEntity(this.config.battery.battery_meter, 8, (_g = this.config.battery) === null || _g === void 0 ? void 0 : _g.unit_of_measurament).then(batteryAsk => {
        this.batteryWeek = batteryAsk;
        this.batteryWeekTotal = batteryAsk.totale;
      });
    }
  }
  //   protected updated(changedProps: Map<string, any>) {
  //     super.updated(changedProps);
  //     if (!this.hass) return;
  //     // Lista delle entità da monitorare
  //     let entitiesToWatch: string[] = [];
  //     // Aggiungi `this.config.battery.power` se esiste
  //     if (this.config?.battery?.power) {
  //         entitiesToWatch.push(this.config.battery.power);
  //     }
  //     // Aggiungi `this.config.grid.grid_entity` se esiste
  //     if (this.config?.grid?.grid_entity) {
  //         entitiesToWatch.push(this.config.grid.grid_entity);
  //     }
  //     // Aggiungi tutte le entità contenute in `this.config.entities`
  //     if (this.config?.entities) {
  //         this.config.entities.forEach((entityConfig: any) => {
  //             if (entityConfig.pv) {
  //                 entitiesToWatch.push(entityConfig.pv);
  //             }
  //             if (entityConfig.sensor_meter) {
  //                 entitiesToWatch.push(entityConfig.sensor_meter);
  //             }
  //             if (entityConfig.more_elements && Array.isArray(entityConfig.more_elements)) {
  //                 entitiesToWatch.push(...entityConfig.more_elements);
  //             }
  //         });
  //     }
  //     // **1️⃣ Primo avvio: Se hass era undefined, esegui immediatamente handleEntityChange()**
  //     if (changedProps.has("hass") && !changedProps.get("hass")) {
  //         console.log("hass è ora disponibile, eseguo subito handleEntityChange()");
  //         this.initializeLines();
  //         return; // Evita di eseguire il controllo due volte
  //     }
  //     // **2️⃣ Controlla se una delle entità ha cambiato stato**
  //     let hasChanged = false;
  //     entitiesToWatch.forEach(entity => {
  //         if (changedProps.has("hass") && this.hass.states[entity] !== changedProps.get("hass")?.states[entity]) {
  //             hasChanged = true;
  //             console.log(`L'entità ${entity} è cambiata! Nuovo stato:`, this.hass.states[entity]?.state);
  //         }
  //     });
  //     // **3️⃣ Se una delle entità è cambiata, esegui una funzione**
  //     if (hasChanged) {
  //         this.initializeLines();
  //     }
  // }
  // initializeLines() {
  //   const linesSvg = this.shadowRoot.querySelector(
  //     ".lines-svg"
  //   ) as SVGSVGElement;
  //   if (!linesSvg) {
  //     return;
  //   }
  //   // Rimuovi tutte le linee esistenti
  //   while (linesSvg.firstChild) {
  //     linesSvg.removeChild(linesSvg.firstChild);
  //   }
  //   const photovoltaicTopElements = Array.from(
  //     this.shadowRoot.querySelectorAll(".element-svg.top")
  //   ) as SVGSVGElement[];
  //   const photovoltaicBottomElements = Array.from(
  //     this.shadowRoot.querySelectorAll(".element-svg.bottom")
  //   ) as SVGSVGElement[];
  //   const casaSvg = this.shadowRoot.querySelector(
  //     ".element-svg#casa"
  //   ) as SVGSVGElement;
  //   if (!casaSvg) {
  //     return;
  //   }
  //   const linesSvgRect = linesSvg.getBoundingClientRect();
  //   const casaRect = casaSvg.getBoundingClientRect();
  //   const casaX = casaRect.x - linesSvgRect.x;
  //   const casaY = casaRect.y - linesSvgRect.y;
  //   const casaWidth = casaRect.width;
  //   const casaHeight = casaRect.height;
  //   const casaCenterX = casaX + casaWidth / 2;
  //   const drawLines = (
  //     photovoltaicElements: SVGSVGElement[],
  //     isBottom: boolean
  //   ) => {
  //     if (photovoltaicElements.length === 0) return;
  //     const spacing = 10;
  //     const offsets = 10;
  //     const elementsWithCenter = photovoltaicElements.map((element) => {
  //       const rect = element.getBoundingClientRect();
  //       return {
  //         element,
  //         centerX: rect.x - linesSvgRect.x + rect.width / 2,
  //         rect,
  //       };
  //     });
  //     const perfectlyCenteredElement = elementsWithCenter.find(
  //       (item) => Math.abs(item.centerX - casaCenterX) < 1
  //     );
  //     const elementsLeft = elementsWithCenter
  //       .filter((item) => item.centerX < casaCenterX)
  //       .sort((a, b) => b.centerX - a.centerX);
  //     const elementsRight = elementsWithCenter
  //       .filter((item) => item.centerX > casaCenterX)
  //       .sort((a, b) => a.centerX - b.centerX);
  //     const casaLine3StartX =
  //       casaCenterX - ((photovoltaicElements.length - 1) * spacing) / 2;
  //     const casaPointsX = Array.from(
  //       { length: photovoltaicElements.length },
  //       (_, i) => casaLine3StartX + i * spacing
  //     );
  //     elementsWithCenter.forEach((item, index) => {
  //       const { element, rect, centerX } = item;
  //       const elementX = rect.x - linesSvgRect.x;
  //       const elementY = rect.y - linesSvgRect.y;
  //       const elementWidth = rect.width;
  //       const elementHeight = rect.height;
  //       const elementVerticalX = centerX;
  //       const isLeft = elementsLeft.some((left) => left.element === element);
  //       const isRight = elementsRight.some(
  //         (right) => right.element === element
  //       );
  //       const relativeIndex = isLeft
  //         ? elementsLeft.findIndex((left) => left.element === element)
  //         : elementsRight.findIndex((right) => right.element === element);
  //       let line1Length = 10;
  //       if (relativeIndex > 0) {
  //         line1Length += relativeIndex * offsets;
  //       }
  //       const line1StartY = isBottom ? elementY : elementY + elementHeight;
  //       const line1EndY = isBottom
  //         ? elementY - line1Length
  //         : elementY + elementHeight + line1Length;
  //       let lineColor = "red";
  //       if (
  //         (isLeft && item === elementsLeft[0]) ||
  //         (isRight && item === elementsRight[0])
  //       ) {
  //         lineColor = "green";
  //       }
  //       if (
  //         perfectlyCenteredElement &&
  //         perfectlyCenteredElement.element === element
  //       ) {
  //         lineColor = "blue";
  //       }
  //       const casaPointX = casaPointsX[index];
  //       const casaPointY = isBottom ? casaY + casaHeight : casaY;
  //       // Creazione di un unico path che unisce line1, line2 e line3
  //       let path;
  //       let d;
  //       // Definizione del filtro per l'effetto blur (spostata fuori dal ciclo)
  //       const createGlowFilter = () => {
  //         const existingDefs = linesSvg.querySelector("defs");
  //         if (existingDefs) return; // Evita di ridefinire il filtro se già esiste
  //         const defs = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "defs"
  //         );
  //         const filter = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "filter"
  //         );
  //         filter.setAttribute("id", "glow-blur");
  //         filter.setAttribute("x", "-50%");
  //         filter.setAttribute("y", "-50%");
  //         filter.setAttribute("width", "200%");
  //         filter.setAttribute("height", "200%");
  //         const feGaussianBlur = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "feGaussianBlur"
  //         );
  //         feGaussianBlur.setAttribute("in", "SourceGraphic");
  //         feGaussianBlur.setAttribute("stdDeviation", "1.5"); // Intensità del blur
  //         filter.appendChild(feGaussianBlur);
  //         defs.appendChild(filter);
  //         linesSvg.appendChild(defs);
  //       };
  //       createGlowFilter();
  // if (element.id === "grid-power-direct") {
  //   const homeTile = this.shadowRoot.querySelector(".element-svg#home_tile") as SVGSVGElement;
  //   if (!homeTile) {
  //       console.error("Home Tile SVG element not found.");
  //       return;
  //   }
  //   const homeTileRect = homeTile.getBoundingClientRect();
  //   const homeTileX = homeTileRect.x - linesSvgRect.x;
  //   const homeTileY = homeTileRect.y - linesSvgRect.y;
  //   const homeTileHeight = homeTileRect.height;
  //   const gridPowerX = elementX;
  //   const gridPowerCenterY = elementY + elementHeight / 2;
  //   const homeTileXEnd = homeTileX + homeTileRect.width;
  //   const homeTileCenterY = homeTileY + homeTileHeight / 2;
  //   // Linea statica verso home
  //   const staticLineHome = document.createElementNS("http://www.w3.org/2000/svg", "line");
  //   staticLineHome.setAttribute("x1", gridPowerX.toString());
  //   staticLineHome.setAttribute("y1", gridPowerCenterY.toString());
  //   staticLineHome.setAttribute("x2", homeTileXEnd.toString());
  //   staticLineHome.setAttribute("y2", homeTileCenterY.toString());
  //   staticLineHome.setAttribute("stroke", "#999");
  //   staticLineHome.setAttribute("stroke-width", "2");
  //   staticLineHome.setAttribute("stroke-dasharray", "7,5");
  //   staticLineHome.setAttribute("stroke-linecap", "round");
  //   linesSvg.appendChild(staticLineHome);
  //         // Glow line se il valore è maggiore di 0
  //         const stateValue = parseFloat(element.getAttribute("value") || "0");
  //         if (stateValue > 0) {
  //             const glowLineHome = document.createElementNS("http://www.w3.org/2000/svg", "line");
  //             glowLineHome.setAttribute("x1", gridPowerX.toString());
  //             glowLineHome.setAttribute("y1", gridPowerCenterY.toString());
  //             glowLineHome.setAttribute("x2", homeTileXEnd.toString());
  //             glowLineHome.setAttribute("y2", homeTileCenterY.toString());
  //             glowLineHome.setAttribute("stroke", "rgba(0, 191, 255, 0.8)");
  //             glowLineHome.setAttribute("stroke-width", "4");
  //             glowLineHome.setAttribute("stroke-dasharray", "10,15");
  //             glowLineHome.setAttribute("stroke-linecap", "round");
  //             const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  //             animate.setAttribute("attributeName", "stroke-dashoffset");
  //             animate.setAttribute("from", "50");
  //             animate.setAttribute("to", "0");
  //             animate.setAttribute("dur", "2s");
  //             animate.setAttribute("repeatCount", "indefinite");
  //             glowLineHome.appendChild(animate);
  //             linesSvg.appendChild(glowLineHome);
  //         }
  //         // Se è configurata la vendita di energia, collegare anche a casa
  //         if (this.config.grid.energy_sell) {
  //             const casaTile = this.shadowRoot.querySelector(".element-svg#casa") as SVGSVGElement;
  //             if (casaTile) {
  //                 const casaRect = casaTile.getBoundingClientRect();
  //                 const casaX = casaRect.x - linesSvgRect.x;
  //                 const casaY = casaRect.y - linesSvgRect.y;
  //                 const casaHeight = casaRect.height;
  //                 const casaCenterY = casaY + casaHeight / 2;
  //                 const staticLineCasa = document.createElementNS("http://www.w3.org/2000/svg", "line");
  //                 staticLineCasa.setAttribute("x1", gridPowerX.toString());
  //                 staticLineCasa.setAttribute("y1", gridPowerCenterY.toString());
  //                 staticLineCasa.setAttribute("x2", casaX.toString());
  //                 staticLineCasa.setAttribute("y2", casaCenterY.toString());
  //                 staticLineCasa.setAttribute("stroke", "#999");
  //                 staticLineCasa.setAttribute("stroke-width", "2");
  //                 staticLineCasa.setAttribute("stroke-dasharray", "7,5");
  //                 staticLineCasa.setAttribute("stroke-linecap", "round");
  //                 linesSvg.appendChild(staticLineCasa);
  //                 const energySellState = parseFloat(this.hass.states[this.config.grid.energy_sell]?.state || "0");
  //                 if (energySellState > 0) {
  //                     const glowLineCasa = document.createElementNS("http://www.w3.org/2000/svg", "line");
  //                     glowLineCasa.setAttribute("x1", gridPowerX.toString());
  //                     glowLineCasa.setAttribute("y1", gridPowerCenterY.toString());
  //                     glowLineCasa.setAttribute("x2", casaX.toString());
  //                     glowLineCasa.setAttribute("y2", casaCenterY.toString());
  //                     glowLineCasa.setAttribute("stroke", "rgba(0, 191, 255, 0.8)");
  //                     glowLineCasa.setAttribute("stroke-width", "4");
  //                     glowLineCasa.setAttribute("stroke-dasharray", "10,15");
  //                     glowLineCasa.setAttribute("stroke-linecap", "round");
  //                     const animateCasa = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  //                     animateCasa.setAttribute("attributeName", "stroke-dashoffset");
  //                     animateCasa.setAttribute("from", "50");
  //                     animateCasa.setAttribute("to", "0");
  //                     animateCasa.setAttribute("dur", "2s");
  //                     animateCasa.setAttribute("repeatCount", "indefinite");
  //                     glowLineCasa.appendChild(animateCasa);
  //                     linesSvg.appendChild(glowLineCasa);
  //                 }
  //             }
  //         }
  //     } else {
  //         // Logica originale per disegnare line1, line2 e line3
  //         const casaPointX = casaPointsX[index];
  //         const casaPointY = isBottom ? casaY + casaHeight : casaY;
  //         d =
  //           `M ${elementVerticalX} ${line1StartY} ` + // Inizio di line1
  //           `L ${elementVerticalX} ${line1EndY} ` + // Fine di line1
  //           `L ${casaPointX} ${line1EndY} ` + // Line2 orizzontale
  //           `L ${casaPointX} ${casaPointY}`; // Line3 verticale
  //         // Linea statica tratteggiata
  //         const staticLine = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "path"
  //         );
  //         staticLine.setAttribute("d", d);
  //         staticLine.setAttribute("stroke", "#999"); // Colore della linea statica
  //         staticLine.setAttribute("stroke-width", "2");
  //         staticLine.setAttribute("fill", "none");
  //         staticLine.setAttribute("stroke-dasharray", "7,5"); // Tratteggio
  //         staticLine.setAttribute("stroke-linecap", "round"); // Bordi arrotondati
  //         linesSvg.appendChild(staticLine);
  //       }
  //       // Linea dinamica per l'effetto bagliore
  //       const glowLine = document.createElementNS(
  //         "http://www.w3.org/2000/svg",
  //         "path"
  //       );
  //       glowLine.setAttribute("d", d);
  //       // Applica il filtro blur al glowLine
  //       // glowLine.setAttribute('filter', 'url(#glow-blur)');
  //       // Controlla l'id per configurare il colore
  //       if (element.id === "grid-power") {
  //         glowLine.setAttribute("stroke", "rgba(0, 191, 255, 0.6)"); // Colore azzurro
  //       } else {
  //         glowLine.setAttribute("stroke", "rgba(0, 255, 0, 0.6)"); // Colore verde per default
  //       }
  //       glowLine.setAttribute("stroke-width", "4");
  //       glowLine.setAttribute("fill", "none");
  //       glowLine.setAttribute("stroke-dasharray", "10,40"); // Configura tratteggio per il bagliore
  //       glowLine.setAttribute("stroke-linecap", "round"); // Bordi arrotondati
  //       // Recupera il valore dell'attributo "value"
  //       const stateValue = parseFloat(element.getAttribute("value") || "0");
  //       // Logica per gli elementi
  //       if (element.id === "battery") {
  //         // const stateValue = parseFloat(this.config?.battery?.power || "0");
  //         if (stateValue > 0) {
  //           // Direzione inversa per battery con value > 0
  //           const animate = document.createElementNS(
  //             "http://www.w3.org/2000/svg",
  //             "animate"
  //           );
  //           animate.setAttribute("attributeName", "stroke-dashoffset");
  //           animate.setAttribute("from", "50"); // Direzione inversa
  //           animate.setAttribute("to", "0");
  //           animate.setAttribute("dur", "1s");
  //           animate.setAttribute("repeatCount", "indefinite");
  //           glowLine.appendChild(animate);
  //           linesSvg.appendChild(glowLine);
  //         } else if (stateValue < 0) {
  //           // Direzione normale per battery con value < 0
  //           const animate = document.createElementNS(
  //             "http://www.w3.org/2000/svg",
  //             "animate"
  //           );
  //           animate.setAttribute("attributeName", "stroke-dashoffset");
  //           animate.setAttribute("from", "0"); // Direzione normale
  //           animate.setAttribute("to", "50");
  //           animate.setAttribute("dur", "1s");
  //           animate.setAttribute("repeatCount", "indefinite");
  //           glowLine.appendChild(animate);
  //           linesSvg.appendChild(glowLine);
  //         } else {
  //           // Non aggiungere il glowLine se stateValue == 0
  //           console.log(
  //             `GlowLine nascosto per elemento con id "battery" e stateValue = 0`
  //           );
  //         }
  //       } else if (element.id === "pv-element" || element.id === "grid-power") {
  //         // Direzione inversa per pv-element e grid-power
  //         const animate = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "animate"
  //         );
  //         animate.setAttribute("attributeName", "stroke-dashoffset");
  //         animate.setAttribute("from", "50"); // Direzione inversa
  //         animate.setAttribute("to", "0");
  //         animate.setAttribute("dur", "1s");
  //         animate.setAttribute("repeatCount", "indefinite");
  //         glowLine.appendChild(animate);
  //         linesSvg.appendChild(glowLine);
  //       } else if (stateValue > 0) {
  //         // Altri elementi con stateValue > 0
  //         const animate = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "animate"
  //         );
  //         animate.setAttribute("attributeName", "stroke-dashoffset");
  //         animate.setAttribute("from", "0"); // Direzione normale
  //         animate.setAttribute("to", "50");
  //         animate.setAttribute("dur", "1s");
  //         animate.setAttribute("repeatCount", "indefinite");
  //         glowLine.appendChild(animate);
  //         linesSvg.appendChild(glowLine);
  //       }
  //     });
  //   };
  //   drawLines(photovoltaicTopElements, false);
  //   drawLines(photovoltaicBottomElements, true);
  // }
  initializeLines() {
    const linesSvg = this.shadowRoot.querySelector(".lines-svg");
    if (!linesSvg) return;
    // Svuota linesSvg velocemente
    linesSvg.innerHTML = "";
    const photovoltaicTopElements = Array.from(this.shadowRoot.querySelectorAll(".element-svg.top"));
    const photovoltaicBottomElements = Array.from(this.shadowRoot.querySelectorAll(".element-svg.bottom"));
    const casaSvg = this.shadowRoot.querySelector(".element-svg#casa");
    if (!casaSvg) return;
    const linesSvgRect = linesSvg.getBoundingClientRect();
    const casaRect = casaSvg.getBoundingClientRect();
    const casaX = casaRect.x - linesSvgRect.x;
    const casaY = casaRect.y - linesSvgRect.y;
    const casaWidth = casaRect.width;
    const casaHeight = casaRect.height;
    const casaCenterX = casaX + casaWidth / 2;
    this.createGlowFilter(linesSvg);
    const drawLines = (photovoltaicElements, isBottom) => {
      if (photovoltaicElements.length === 0) return;
      const spacing = 10;
      const offsets = 10;
      const elementsWithCenter = photovoltaicElements.map(element => {
        const rect = element.getBoundingClientRect();
        return {
          element,
          centerX: rect.x - linesSvgRect.x + rect.width / 2,
          rect
        };
      });
      const elementsLeft = elementsWithCenter.filter(item => item.centerX < casaCenterX).sort((a, b) => b.centerX - a.centerX);
      const elementsRight = elementsWithCenter.filter(item => item.centerX > casaCenterX).sort((a, b) => a.centerX - b.centerX);
      const casaLineStartX = casaCenterX - (photovoltaicElements.length - 1) * spacing / 2;
      const casaPointsX = Array.from({
        length: photovoltaicElements.length
      }, (_, i) => casaLineStartX + i * spacing);
      const fragment = document.createDocumentFragment();
      elementsWithCenter.forEach((item, index) => {
        var _a, _b;
        const {
          element,
          rect,
          centerX
        } = item;
        const elementVerticalX = centerX;
        const isLeft = elementsLeft.includes(item);
        elementsRight.includes(item);
        const elementX = rect.x - linesSvgRect.x;
        const elementY = rect.y - linesSvgRect.y;
        const elementHeight = rect.height;
        const relativeIndex = isLeft ? elementsLeft.findIndex(left => left === item) : elementsRight.findIndex(right => right === item);
        let line1Length = 10;
        if (relativeIndex > 0) {
          line1Length += relativeIndex * offsets;
        }
        const line1StartY = isBottom ? rect.y - linesSvgRect.y : rect.y + rect.height - linesSvgRect.y;
        const line1EndY = isBottom ? line1StartY - line1Length : line1StartY + line1Length;
        const casaPointX = casaPointsX[index];
        const casaPointY = isBottom ? casaY + casaHeight : casaY;
        const stateValue = parseFloat(element.getAttribute("value") || "0");
        const d = `M ${elementVerticalX} ${line1StartY} L ${elementVerticalX} ${line1EndY} L ${casaPointX} ${line1EndY} L ${casaPointX} ${casaPointY}`;
        if (!((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.grid) === null || _b === void 0 ? void 0 : _b.hide_energy_line)) {
          const staticLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
          staticLine.setAttribute("d", d);
          staticLine.setAttribute("stroke", "#999");
          staticLine.setAttribute("stroke-width", "2");
          staticLine.setAttribute("fill", "none");
          staticLine.setAttribute("stroke-dasharray", "7,5");
          staticLine.setAttribute("stroke-linecap", "round");
          fragment.appendChild(staticLine);
        }
        if (element.id === "grid-power-direct") {
          if (this.gridEnergyState == "sell") {
            const glowLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
            glowLine.setAttribute("d", d);
            glowLine.setAttribute("stroke", "rgba(0, 255, 0, 0.6)");
            glowLine.setAttribute("stroke-width", "4");
            glowLine.setAttribute("fill", "none");
            glowLine.setAttribute("stroke-dasharray", "10,40");
            glowLine.setAttribute("stroke-linecap", "round");
            const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            animate.setAttribute("attributeName", "stroke-dashoffset");
            animate.setAttribute("from", "0");
            animate.setAttribute("to", "50");
            animate.setAttribute("dur", "2s");
            animate.setAttribute("repeatCount", "indefinite");
            glowLine.appendChild(animate);
            fragment.appendChild(glowLine);
          }
          const homeTile = this.shadowRoot.querySelector(".element-svg#home_tile");
          if (!homeTile) {
            console.error("Home Tile SVG element not found.");
            return;
          }
          const homeTileRect = homeTile.getBoundingClientRect();
          const homeTileX = homeTileRect.x - linesSvgRect.x;
          const homeTileY = homeTileRect.y - linesSvgRect.y;
          const homeTileHeight = homeTileRect.height;
          const gridPowerX = elementX;
          const gridPowerCenterY = elementY + elementHeight / 2;
          const homeTileXEnd = homeTileX + homeTileRect.width;
          const homeTileCenterY = homeTileY + homeTileHeight / 2;
          // Linea statica verso home
          const staticLineHome = document.createElementNS("http://www.w3.org/2000/svg", "line");
          staticLineHome.setAttribute("x1", gridPowerX.toString());
          staticLineHome.setAttribute("y1", gridPowerCenterY.toString());
          staticLineHome.setAttribute("x2", homeTileXEnd.toString());
          staticLineHome.setAttribute("y2", homeTileCenterY.toString());
          staticLineHome.setAttribute("stroke", "#999");
          staticLineHome.setAttribute("stroke-width", "2");
          staticLineHome.setAttribute("stroke-dasharray", "7,5");
          staticLineHome.setAttribute("stroke-linecap", "round");
          linesSvg.appendChild(staticLineHome);
          if (this.gridEnergyState == "buy") {
            const glowLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
            glowLine.setAttribute("x1", gridPowerX.toString());
            glowLine.setAttribute("y1", gridPowerCenterY.toString());
            glowLine.setAttribute("x2", homeTileXEnd.toString());
            glowLine.setAttribute("y2", homeTileCenterY.toString());
            glowLine.setAttribute("stroke", "rgba(0, 191, 255, 0.8)");
            glowLine.setAttribute("stroke-width", "4");
            glowLine.setAttribute("stroke-dasharray", "10,15");
            glowLine.setAttribute("stroke-linecap", "round");
            const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            animate.setAttribute("attributeName", "stroke-dashoffset");
            animate.setAttribute("from", "50");
            animate.setAttribute("to", "0");
            animate.setAttribute("dur", "2s");
            animate.setAttribute("repeatCount", "indefinite");
            glowLine.appendChild(animate);
            linesSvg.appendChild(glowLine);
          }
        }
        if (element.id === "pv-element" && stateValue > 0) {
          const glowLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
          glowLine.setAttribute("d", d);
          glowLine.setAttribute("stroke", "rgba(255, 255, 0, 0.6)");
          glowLine.setAttribute("stroke-width", "4");
          glowLine.setAttribute("fill", "none");
          glowLine.setAttribute("stroke-dasharray", "10,40");
          glowLine.setAttribute("stroke-linecap", "round");
          const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
          animate.setAttribute("attributeName", "stroke-dashoffset");
          animate.setAttribute("from", "50");
          animate.setAttribute("to", "0");
          animate.setAttribute("dur", "2s");
          animate.setAttribute("repeatCount", "indefinite");
          glowLine.appendChild(animate);
          fragment.appendChild(glowLine);
        }
        if (element.id === "home_tile" && stateValue > 0) {
          const glowLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
          glowLine.setAttribute("d", d);
          glowLine.setAttribute("stroke", "rgba(255, 255, 0, 0.6)");
          glowLine.setAttribute("stroke-width", "4");
          glowLine.setAttribute("fill", "none");
          glowLine.setAttribute("stroke-dasharray", "10,40");
          glowLine.setAttribute("stroke-linecap", "round");
          const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
          animate.setAttribute("attributeName", "stroke-dashoffset");
          animate.setAttribute("from", "0");
          animate.setAttribute("to", "50");
          animate.setAttribute("dur", "2s");
          animate.setAttribute("repeatCount", "indefinite");
          glowLine.appendChild(animate);
          fragment.appendChild(glowLine);
        }
        if (element.id === "battery" && stateValue != 0) {
          const glowLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
          glowLine.setAttribute("d", d);
          glowLine.setAttribute("stroke", "rgba(255, 255, 0, 0.6)");
          glowLine.setAttribute("stroke-width", "4");
          glowLine.setAttribute("fill", "none");
          glowLine.setAttribute("stroke-dasharray", "10,40");
          glowLine.setAttribute("stroke-linecap", "round");
          if (this.batterMode == "discharge") {
            const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            animate.setAttribute("attributeName", "stroke-dashoffset");
            animate.setAttribute("from", "0");
            animate.setAttribute("to", "50");
            animate.setAttribute("dur", "2s");
            animate.setAttribute("repeatCount", "indefinite");
            glowLine.appendChild(animate);
            fragment.appendChild(glowLine);
          } else if (this.batterMode == "charge") {
            const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            animate.setAttribute("attributeName", "stroke-dashoffset");
            animate.setAttribute("from", "50");
            animate.setAttribute("to", "0");
            animate.setAttribute("dur", "2s");
            animate.setAttribute("repeatCount", "indefinite");
            glowLine.appendChild(animate);
            fragment.appendChild(glowLine);
          }
        }
      });
      linesSvg.appendChild(fragment);
    };
    drawLines(photovoltaicTopElements, false);
    drawLines(photovoltaicBottomElements, true);
  }
  createGlowFilter(linesSvg) {
    if (linesSvg.querySelector("#glow-blur")) return;
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    filter.setAttribute("id", "glow-blur");
    const feGaussianBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
    feGaussianBlur.setAttribute("in", "SourceGraphic");
    feGaussianBlur.setAttribute("stdDeviation", "1.5");
    filter.appendChild(feGaussianBlur);
    defs.appendChild(filter);
    linesSvg.appendChild(defs);
  }
  getLineColor(element) {
    return element.id === "grid-power" ? "rgba(0, 191, 255, 0.6)" : "rgba(0, 255, 0, 0.6)";
  }
  createGlowAnimation(glowLine, from, to) {
    const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animate.setAttribute("attributeName", "stroke-dashoffset");
    animate.setAttribute("from", from);
    animate.setAttribute("to", to);
    animate.setAttribute("dur", "1s");
    animate.setAttribute("repeatCount", "indefinite");
    glowLine.appendChild(animate);
  }
  _applyDynamicStyles() {
    var _a, _b;
    const verticalCard = this.isVericarlCard();
    const panelMode = this.isPanelMode();
    const cardHeight = Math.round(this.getBoundingClientRect().height);
    this.sliderHeight = !verticalCard && panelMode ? cardHeight / 31.8 : 30;
    const currentTheme = (_a = this.hass.themes) === null || _a === void 0 ? void 0 : _a.darkMode; // Verifica se il tema è scuro
    const shadowDark_dark = "rgba(0, 0, 0, 0.3)";
    const shadowLight_dark = "rgba(255, 255, 255, 0.1)";
    const shadowDark_light = "rgba(0, 0, 0, 0.15)";
    const shadowLight_light = "rgba(125, 125, 125, 0.1)";
    // const heightValue = !verticalCard && panelMode ? '36px' : '30px';
    // console.log("heightValue", this.sliderHeight);
    const darkThemeStyles = `
  input[type='range'] {
    background-color: transparent;
    box-shadow: 
      6px 6px 6px ${shadowDark_dark} inset, 
      -4px -4px 6px ${shadowLight_dark} inset;
    display: block;
    // padding: 0 1.6px;
    width: 100%;
    height: ${this.sliderHeight}px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 500px;
  }
`;
    const lightThemeStyles = `
  input[type='range'] {
    background-color: transparent;
    box-shadow: 
      6px 6px 6px ${shadowLight_light} inset, 
      -4px -4px 6px ${shadowDark_light} inset;
    display: block;
    // padding: 0 1.6px;
    width: 100%;
    height: ${this.sliderHeight}px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 500px;
  }

    `;
    const sliderHeightVertical = `
      input[type="range"]::-webkit-slider-thumb {
      width: 24px;
      height: 24px;
      } 
    `;
    const sliderHeightHorizontal = `
      input[type="range"]::-webkit-slider-thumb {
      width: ${this.sliderHeight}px;
      height: ${this.sliderHeight}px;
      } 
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = currentTheme ? darkThemeStyles : lightThemeStyles;
    styleSheet.innerHTML += !verticalCard && panelMode ? sliderHeightHorizontal : sliderHeightVertical;
    (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.appendChild(styleSheet);
  }
  _updateLabelPosition(slider) {
    var _a;
    if (this.panelMode) ;
    const label = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".range-thumb-label");
    if (!label || !slider) return;
    label.clientHeight;
    const sliderWidth = slider.offsetWidth;
    const thumbWidth = this.sliderHeight; // Larghezza del thumb in px (aggiorna se diversa)
    const min = parseInt(slider.min, 10);
    const max = parseInt(slider.max, 10);
    const percentage = (+slider.value - min) / (max - min) * 100;
    // Calcola la posizione del label in px
    const labelPosition = percentage / 100 * (sliderWidth - thumbWidth) + thumbWidth / 2;
    // Aggiorna lo stile del label per posizionarlo correttamente sopra il thumb
    label.style.left = `${labelPosition}px`;
    // console.log("position", labelPosition);
  }
  _addTicks() {
    var _a, _b, _c;
    // Seleziona lo slider
    const slider = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input[type="range"]');
    if (!slider) {
      // console.error('Slider element not found');
      return;
    }
    // Rimuove eventuali tick esistenti
    let tickContainer = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(".range__ticks");
    if (tickContainer) {
      tickContainer.remove();
    }
    // Crea un nuovo contenitore per i tick
    tickContainer = document.createElement("div");
    tickContainer.className = "range__ticks";
    (_c = slider.parentElement) === null || _c === void 0 ? void 0 : _c.appendChild(tickContainer);
    // Configura intervalli e tick
    const min = parseInt(slider.min, 10) || 1; // Inizia da 1
    const max = parseInt(slider.max, 10) || 30; // Termina a 30
    const step = 5; // Intervallo dei tick (multipli di 5)
    // Aggiunge il tick iniziale (1)
    const tickStart = document.createElement("span");
    tickStart.className = "range__tick";
    tickStart.textContent = min.toString();
    // tickStart.style.position = "absolute";
    tickStart.style.left = "0%"; // Il primo tick è sempre all'inizio (0%)
    tickContainer.appendChild(tickStart);
    // Aggiunge i tick successivi (multipli di 5 fino a 30)
    for (let i = step; i <= max; i += step) {
      const tick = document.createElement("span");
      tick.className = "range__tick";
      tick.textContent = i.toString();
      tick.style.position = "absolute";
      tick.style.left = `${(i - min) / (max - min) * 100}%`; // Calcola la posizione relativa in %
      tickContainer.appendChild(tick);
    }
  }
  _onSliderInput(event) {
    const slider = event.target;
    this._interval = parseInt(slider.value, 10);
    // Aggiorna la posizione della label
    this._updateLabelPosition(slider);
    if (this._debounceFetchHistory) {
      clearTimeout(this._debounceFetchHistory);
    }
  }
  _atSliderChange(event) {
    var _a;
    const slider = event.target;
    this._interval = parseInt(slider.value, 10);
    // Salva il valore dello slider nel localStorage
    if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.id) {
      const sliderKey = `slider_value_${this.config.id}`;
      localStorage.setItem(sliderKey, slider.value);
    } else {
      console.warn("Unable to save slider value: no config.id found.");
    }
    // Debounce per ridurre chiamate e aggiornare i dati
    this._debounceFetchHistory = window.setTimeout(() => {
      this._fetchTodayData();
    }, 300);
  }
  async _fetchTodayData() {
    var _a, _b, _c;
    const entities = this.config.entities.map(item => item);
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0); // Inizio del giorno corrente
    const endTime = new Date();
    endTime.setHours(23, 59, 59, 999); // Fine del giorno corrente
    const seriesData = [];
    try {
      for (const entity of entities) {
        const {
          pv: entityId
        } = entity;
        // Recupera l'unità di misura da Home Assistant se disponibile
        const entityState = this.hass.states[entityId];
        const unit_of_maesurament = ((_a = entityState === null || entityState === void 0 ? void 0 : entityState.attributes) === null || _a === void 0 ? void 0 : _a.unit_of_measurement) || entity.unit_of_maesurament || "w";
        const response = await this.hass.callApi("GET", `history/period/${startTime.toISOString()}?filter_entity_id=${entityId}&end_time=${endTime.toISOString()}`);
        const historyData = response[0] || [];
        const chartData = historyData.map(entry => {
          const rawValue = parseFloat(entry.state);
          const value = ["watt", "w"].includes(unit_of_maesurament.toLowerCase()) ? rawValue / 1000 : rawValue;
          return {
            x: new Date(entry.last_updated).getTime(),
            y: value
          };
        }).filter(point => point.y !== null && !isNaN(point.y));
        const friendlyName = (_c = (_b = this.hass.states[entityId]) === null || _b === void 0 ? void 0 : _b.attributes) === null || _c === void 0 ? void 0 : _c.friendly_name;
        seriesData.push({
          name: friendlyName || entityId,
          data: chartData
        });
      }
      this.seriesData = seriesData;
      this._initializeChart(this.seriesData); // Inizializza il primo grafico con i dati di oggi
    } catch (error) {
      console.error("Errore durante il recupero dei dati di oggi:", error);
    }
  }
  calculateGraphSpan() {
    // Sottrai un'ora all'alba e aggiungi un'ora al tramonto
    const min = new Date(this.dawnTime - 60 * 60 * 1000).setMinutes(0, 0, 0); // Ora intera prima dell'alba
    const max = new Date(this.duskTime + 60 * 60 * 1000).setMinutes(0, 0, 0); // Ora intera dopo il tramonto
    return {
      min,
      max
    };
  }
  async _initializeChart(series) {
    var _a, _b, _c;
    const ApexCharts = await this._getApexCharts();
    const graphSpan = this.calculateGraphSpan();
    const intervalMs = this._interval * 60 * 1000;
    const allTimestamps = series.flatMap(serie => serie.data.map(point => point.x));
    const minTimestamp = Math.min(...allTimestamps);
    const maxTimestamp = Math.max(...allTimestamps);
    const groupedSeries = series.map(serie => ({
      name: serie.name,
      data: this._groupByNearest(serie.data, intervalMs, minTimestamp, maxTimestamp).filter(point => point.y !== null && point.y !== undefined && !isNaN(point.y))
    }));
    const slider = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input[type="range"]');
    if (slider) {
      this._updateLabelPosition(slider); // Aggiorna la posizione dell'etichetta
    }
    if ((_b = this.config.grafic_forcast) === null || _b === void 0 ? void 0 : _b.forcast) {
      const forecastEntity = this.hass.states[this.config.grafic_forcast.forcast];
      if (forecastEntity && forecastEntity.attributes.detailedForecast) {
        const detailedForecast = forecastEntity.attributes.detailedForecast;
        groupedSeries.push({
          name: "Stima media",
          data: detailedForecast.filter(item => {
            const estimate = item.pv_estimate;
            return typeof estimate === "number" && !isNaN(estimate) && estimate !== 0;
          }).map(item => ({
            x: new Date(item.period_start).getTime(),
            y: item.pv_estimate
          })),
          type: "line",
          color: "rgba(0, 0, 255, 1)"
        }, {
          name: "min - max",
          data: detailedForecast.filter(item => {
            const min = item.pv_estimate10;
            const max = item.pv_estimate90;
            return typeof min === "number" && typeof max === "number" && !isNaN(min) && !isNaN(max) && (min !== 0 || max !== 0);
          }).map(item => ({
            x: new Date(item.period_start).getTime(),
            y: [item.pv_estimate10, item.pv_estimate90]
          })),
          type: "rangeArea",
          color: "rgba(0, 255, 0, 0.6)"
        });
      }
    }
    const summedData = groupedSeries.filter(serie => !["Stima media", "Intervallo (min - max)"].includes(serie.name)) // Esclude le serie previsionali
    .reduce((acc, serie) => {
      serie.data.forEach((point, index) => {
        var _a;
        if (!acc[index]) {
          acc[index] = {
            x: point.x,
            y: 0
          };
        }
        acc[index].y += (_a = point.y) !== null && _a !== void 0 ? _a : 0;
      });
      return acc;
    }, []);
    groupedSeries.push({
      name: "Somma Totale",
      data: summedData,
      type: "area",
      color: "red"
    });
    const chartContainer = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.getElementById("chart");
    if (chartContainer) {
      if (this.chart) {
        this.chart.destroy();
      }
      const options = {
        fill: {
          type: "gradient",
          gradient: {
            // shade: 'light',
            type: "vertical",
            // shadeIntensity: 0.5,
            // gradientToColors: [ '#FDD835'], // optional, if not defined - uses the shades of same color in series
            inverseColors: false,
            opacityFrom: 0.2,
            opacityTo: 0.6,
            stops: [0, 100]
            // colorStops: []
          }
        },
        chart: {
          type: "rangeArea",
          height: this.chartHeight,
          zoom: {
            enabled: true,
            type: "x"
          },
          toolbar: {
            show: true
          }
        },
        series: groupedSeries,
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: "datetime",
          min: graphSpan.min,
          max: graphSpan.max,
          tooltip: {
            enabled: false // Disattiva il tooltip separato per l'asse X
          },
          labels: {
            formatter: value => {
              const date = new Date(value);
              return `${date.getHours().toString().padStart(2, "0")}:00`;
            }
          }
        },
        yaxis: {
          labels: {
            formatter: value => {
              if (typeof value !== "number" || isNaN(value)) {
                return "";
              }
              return value.toFixed(1);
            }
          }
        },
        tooltip: {
          shared: true,
          intersect: false,
          theme: "dark",
          custom: function ({
            series,
            seriesIndex,
            dataPointIndex,
            w
          }) {
            const timestamp = w.globals.seriesX[seriesIndex][dataPointIndex];
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleString("it-IT", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            });
            let tooltipHtml = `<div><strong>${formattedDate}</strong></div>`;
            series.forEach((value, idx) => {
              const dataValue = value[dataPointIndex];
              if (dataValue !== undefined && !isNaN(dataValue)) {
                const seriesName = w.globals.seriesNames[idx];
                tooltipHtml += `<div>${seriesName}: ${dataValue.toFixed(1)} kW</div>`;
              }
            });
            return tooltipHtml;
          }
        },
        grid: {
          show: true,
          borderColor: "var(--divider-color)",
          // '#FF5733', // Cambia il colore delle linee tratteggiate
          strokeDashArray: 4 // Lunghezza dei trattini
        },
        stroke: {
          width: 2,
          // curve: 'smooth',
          curve: "straight"
        },
        legend: {
          show: true,
          custom: true,
          formatter: function (seriesName, opts) {
            // Ottiene il colore della serie dall'indice della serie
            const seriesColor = opts.w.globals.colors[opts.seriesIndex];
            return `
              <button class="custom-legend-btn" style="border: 2px solid ${seriesColor};">
                ${seriesName}
              </button>
            `;
          }
        }
      };
      this.chart = new ApexCharts(chartContainer, options);
      this.chart.render().then(() => {
        this.config.entities.forEach(entity => {
          var _a, _b;
          const friendlyName = ((_b = (_a = this.hass.states[entity.pv]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.friendly_name) || entity.pv;
          this.chart.hideSeries(friendlyName); // Usa direttamente il friendlyName o l'entityId
        });
      });
    }
    this._addTicks();
  }
  _groupByNearest(data, intervalMs, startTime, endTime) {
    const groupedData = [];
    let currentInterval = startTime;
    while (currentInterval <= endTime) {
      let closestPoint = null;
      let minDistance = Infinity;
      data.forEach(point => {
        const distance = Math.abs(point.x - currentInterval);
        if (distance < minDistance) {
          minDistance = distance;
          closestPoint = point;
        }
      });
      if (closestPoint) {
        groupedData.push({
          x: currentInterval,
          y: closestPoint.y
        });
      } else {
        groupedData.push({
          x: currentInterval,
          y: null
        });
      }
      currentInterval += intervalMs;
    }
    return groupedData;
  }
  // ************************* NUOVO GRAFICO Daily *****************************
  formatDataForWeekApexChart() {
    const weekEntities = this.config.entities.map(entry => entry.sensor_meter);
    const now = new Date();
    const startTime = new Date();
    startTime.setDate(now.getDate() - this.daysToEvaluate);
    startTime.setHours(23, 0, 0);
    const fetchAllData = () => {
      if (weekEntities.length === 0) {
        console.log("Nessuna entità da interrogare");
        return Promise.resolve({});
      }
      return this.hass.callWS({
        type: "recorder/statistics_during_period",
        statistic_ids: weekEntities,
        period: "day",
        start_time: startTime.toISOString(),
        types: ["sum"]
      });
    };
    const fetchTotalPvMeter = () => {
      if (!this.config.total_pv_power) {
        return Promise.resolve(null);
      }
      return this.hass.callWS({
        type: "recorder/statistics_during_period",
        statistic_ids: [this.config.total_pv_power],
        period: "day",
        start_time: startTime.toISOString(),
        types: ["sum"]
      });
    };
    return Promise.all([fetchAllData(), fetchTotalPvMeter()]).then(([recorderResponse, totalPvPowerResponse]) => {
      var _a, _b, _c, _d, _e;
      const formattedData = weekEntities.map(sensorId => {
        var _a, _b, _c, _d;
        const sensorValues = recorderResponse[sensorId] || [];
        const unit = ((_b = (_a = this.hass.states[sensorId]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.unit_of_measurement) || "";
        const needsConversion = unit.toLowerCase() === "w";
        if (sensorValues.length < 2) {
          console.warn(`Dati insufficienti per ${sensorId}, impossibile rimuovere il valore iniziale.`);
          return {
            name: sensorId,
            data: []
          };
        }
        let previousSum = sensorValues[0].sum;
        return {
          name: ((_d = (_c = this.hass.states[sensorId]) === null || _c === void 0 ? void 0 : _c.attributes) === null || _d === void 0 ? void 0 : _d.friendly_name) || sensorId,
          data: sensorValues.slice(1).map(entry => {
            let dailyValue = entry.sum - previousSum;
            if (needsConversion) {
              dailyValue /= 1000; // Converti da W a kW
            }
            previousSum = entry.sum;
            return {
              x: new Date(entry.start).getTime(),
              y: dailyValue
            };
          })
        };
      });
      let series = formattedData;
      if (weekEntities.length > 1) {
        let totalSeries = {
          name: "totale",
          data: []
        };
        if (this.config.total_pv_power && totalPvPowerResponse) {
          const totalData = totalPvPowerResponse[this.config.total_pv_power] || [];
          if (totalData.length < 2) {
            console.warn(`Dati insufficienti per ${this.config.total_pv_power}, impossibile rimuovere il valore iniziale.`);
          } else {
            let previousSum = totalData[0].sum;
            const unit = ((_b = (_a = this.hass.states[this.config.total_pv_power]) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.unit_of_measurement) || "";
            const needsConversion = unit.toLowerCase() === "w";
            totalSeries = {
              name: ((_d = (_c = this.hass.states[this.config.total_pv_power]) === null || _c === void 0 ? void 0 : _c.attributes) === null || _d === void 0 ? void 0 : _d.friendly_name) || this.config.total_pv_power,
              data: totalData.slice(1).map(entry => {
                let dailyValue = entry.sum - previousSum;
                if (needsConversion) {
                  dailyValue /= 1000;
                }
                previousSum = entry.sum;
                return {
                  x: new Date(entry.start).getTime(),
                  y: dailyValue
                };
              })
            };
          }
        } else {
          const daysCount = formattedData.length > 0 ? formattedData[0].data.length : 0;
          for (let i = 0; i < daysCount; i++) {
            let sum = 0;
            formattedData.forEach(series => {
              var _a;
              sum += ((_a = series.data[i]) === null || _a === void 0 ? void 0 : _a.y) || 0;
            });
            totalSeries.data.push({
              x: ((_e = formattedData[0].data[i]) === null || _e === void 0 ? void 0 : _e.x) || 0,
              y: sum
            });
          }
        }
        series.push(totalSeries);
      }
      this.chartdata = {
        chart: {
          type: "bar"
        },
        series: series
      };
      this.sommaYUltimi7(this.chartdata);
      // console.log('chart data: ', this.chartdata);
      // console.log('sensori', this.hass.states['sensor.2_condizionatore_channel_1_power']);
      this.requestUpdate();
    }).catch(error => {
      console.error("Errore nel recupero dei dati:", error);
    });
  }
  sommaYUltimi7(chartObj) {
    // Cerchiamo la serie con nome "totale"
    const serieTotale = chartObj.series.find(serie => serie.name === "totale");
    if (!serieTotale) {
      throw new Error("Serie 'totale' non trovata.");
    }
    // Prendiamo gli ultimi 7 elementi dell'array 'data'
    const ultimiSette = serieTotale.data.slice(-7);
    // console.log("ultimi7pv", ultimiSette);
    // Sommiamo i valori di y dei punti presi
    const somma = ultimiSette.reduce((acc, punto) => acc + punto.y, 0);
    this.totalWekkPvProduction = somma.toFixed(2);
    return somma;
  }
  async initializeApexChart(chartOptions, containerId) {
    var _a, _b;
    const chartContainer = await ((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.getElementById(containerId));
    if (chartContainer) {
      if (this.weekChart) {
        this.weekChart.destroy();
      }
    }
    const options = {
      chart: {
        type: "bar",
        height: this.chartHeight,
        events: {
          mounted: () => {
            this.setDefaultZoom();
            this.hideNonTotaleSeries(chartOptions.series);
          },
          resetZoom: () => {
            setTimeout(() => {
              this.setDefaultZoom();
            }, 100);
          }
        }
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: "dd/MM"
        }
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return Math.round(val);
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        custom: true,
        formatter: function (seriesName, opts) {
          const seriesColor = opts.w.globals.colors[opts.seriesIndex];
          return `
                    <button class="custom-legend-btn" style="border: 2px solid ${seriesColor}; background: none; color: ${seriesColor}; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                        ${seriesName}
                    </button>
                `;
        }
      },
      tooltip: {
        enabled: true,
        theme: "dark"
      },
      series: chartOptions.series.map(series => Object.assign(Object.assign({}, series), {
        visible: series.name === "totale"
      }))
    };
    this.weekChart = new ApexCharts((_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(`#${containerId}`), options);
    this.weekChart.render();
  }
  setDefaultZoom() {
    if (!this.weekChart) return;
    const allDataPoints = this.weekChart.w.config.series[0].data;
    if (allDataPoints.length > 7) {
      const lastIndex = allDataPoints.length - 1;
      const firstIndex = Math.max(0, lastIndex - 6);
      const startDate = allDataPoints[firstIndex].x;
      const endDate = allDataPoints[lastIndex].x;
      this.weekChart.updateOptions({
        xaxis: {
          min: startDate,
          max: endDate
        }
      }, false, false);
    }
  }
  hideNonTotaleSeries(series) {
    if (!this.weekChart) return;
    series.forEach(seriesItem => {
      if (seriesItem.name !== "totale") {
        this.weekChart.hideSeries(seriesItem.name);
      }
    });
  }
  // ************************* FINE GRAFICO daily *****************************
  async _getApexCharts() {
    if (!window.ApexCharts) {
      const {
        default: ApexCharts
      } = await import('./apexcharts.esm-DBB7GLaP.js');
      window.ApexCharts = ApexCharts;
    }
    return window.ApexCharts;
  }
  // *********************************      test new heatmap ****************************
  waitForApexCharts() {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (typeof ApexCharts !== "undefined") {
          clearInterval(interval);
          resolve(); // Risolve la Promise senza restituire alcun valore
        }
      }, 100); // Controlla ogni 100ms
    });
  }
  updateDateRange(days) {
    const newStartTime = new Date(this.startTime);
    const newEndTime = new Date(this.endTime);
    newStartTime.setDate(newStartTime.getDate() + days);
    newEndTime.setDate(newEndTime.getDate() + days);
    // Assicura che endTime non superi il giorno attuale
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (newEndTime > today) {
      return; // Se si tenta di andare oltre oggi, non fare nulla
    }
    this.startTime = newStartTime;
    this.endTime = newEndTime;
    this.get_recorder_for_heatmap(); // Ricarica i dati con le nuove date
  }
  get_recorder_for_heatmap() {
    const entitiesToPass = this.config.entities.filter(entry => entry.sensor_meter).map(entry => entry.sensor_meter);
    const fetchAllData = () => {
      if (entitiesToPass.length === 0) {
        return Promise.resolve({});
      }
      return this.hass.callWS({
        type: "recorder/statistics_during_period",
        statistic_ids: entitiesToPass,
        period: "hour",
        start_time: this.startTime.toISOString(),
        end_time: this.endTime.toISOString(),
        types: ["sum"]
      });
    };
    const fetchTotalPvMeter = () => {
      return this.hass.callWS({
        type: "recorder/statistics_during_period",
        statistic_ids: [this.config.total_pv_meter],
        period: "hour",
        start_time: this.startTime.toISOString(),
        end_time: this.endTime.toISOString(),
        types: ["sum"]
      });
    };
    const processResponse = (recorderResponse, isSummed = false) => {
      // Converti alba e tramonto in formato HH:mm
      const dawnTime = new Date(this.dawnTime);
      const duskTime = new Date(this.duskTime);
      const dawnExtended = new Date(dawnTime.getTime() - 2 * 60 * 60 * 1000).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      const duskExtended = new Date(duskTime.getTime() + 1 * 60 * 60 * 1000).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      let hourlyData = {}; // Oggetto per organizzare i dati per ora
      Object.keys(recorderResponse).forEach(sensor => {
        let data = recorderResponse[sensor];
        if (data.length < 2) {
          console.warn(`Dati insufficienti per ${sensor}`);
          return;
        }
        data.forEach((entry, index) => {
          if (index === 0) return; // Il primo valore viene ignorato per il calcolo
          let previousEntry = data[index - 1]; // Valore precedente per la sottrazione
          let dailyValue = Number((entry.sum - previousEntry.sum).toFixed(2)); // Differenza arrotondata a 2 decimali
          let entryDate = new Date(entry.start);
          let hourKey = entryDate.getHours().toString().padStart(2, "0") + ":00"; // Formato "HH:00"
          let dateString = entryDate.toISOString().split("T")[0]; // Solo la data "YYYY-MM-DD"
          // Filtra solo le ore comprese tra 2 ore prima dell'alba e 1 ora dopo il tramonto
          if (hourKey < dawnExtended || hourKey > duskExtended) {
            return;
          }
          if (!hourlyData[hourKey]) {
            hourlyData[hourKey] = {};
          }
          if (!hourlyData[hourKey][dateString]) {
            hourlyData[hourKey][dateString] = 0;
          }
          // Se stiamo aggregando i sensori, sommiamo i valori
          if (isSummed) {
            hourlyData[hourKey][dateString] += dailyValue;
          } else {
            hourlyData[hourKey][dateString] = dailyValue;
          }
        });
      });
      // Convertiamo i dati nel formato richiesto (array con {name: 'HH:00', data: [...]})
      let formattedData = Object.keys(hourlyData).sort((a, b) => parseInt(b) - parseInt(a)) // Ordine decrescente delle ore
      .map(hour => ({
        name: hour,
        data: Object.keys(hourlyData[hour]).map(date => ({
          x: date,
          y: Number(hourlyData[hour][date].toFixed(2))
        }))
      }));
      const disableLeftButtonHeatmap = formattedData.length > 0 && formattedData[formattedData.length - 1].data.length <= 6;
      this.heatmapObj = formattedData;
      this.initializeHeatmapChart2(formattedData);
      this.updateNavigatorButtonsHeatmap(disableLeftButtonHeatmap);
      return formattedData;
    };
    if (this.config.total_pv_meter) {
      fetchTotalPvMeter().then(response => processResponse(response, false)) // NO somma, il valore è già aggregato
      .catch(error => {
        console.error("Errore nel recupero dei dati:", error);
      });
    } else {
      fetchAllData().then(response => processResponse(response, true)) // SOMMA tutti i sensori interrogati
      .catch(error => {
        console.error("Errore nel recupero dei dati:", error);
      });
    }
  }
  async initializeHeatmapChart2(formattedData) {
    var _a;
    // const totalMaxPower =
    //   this.entities.reduce((sum, entity) => sum + (entity.max_power || 0), 0) /
    //   1000;
    const step = parseFloat((this.totalMaxPower / 5).toFixed(2));
    const totalMaxPowerArray = Array.from({
      length: 6
    }, (_, i) => parseFloat(((i + 1) * step).toFixed(2)));
    await this.waitForApexCharts();
    // let formattedData = this.transformToHeatmapData();
    if (formattedData.length === 0) {
      console.warn("Dati formattati vuoti. Impossibile inizializzare il grafico.");
      return;
    }
    // ✅ Aggiunge `min` e `max` a ogni serie
    formattedData = formattedData.map(series => Object.assign(Object.assign({}, series), {
      data: series.data.map(dataPoint => Object.assign(Object.assign({}, dataPoint), {
        min: 0,
        max: totalMaxPowerArray[5]
      }))
    }));
    const options = {
      chart: {
        type: "heatmap",
        height: 550,
        zoom: {
          enabled: true,
          // ✅ Abilita il zoom manuale
          autoScaleYaxis: true
        }
      },
      series: formattedData,
      // ✅ Usa i dati aggiornati con `min` e `max`
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.8,
          useFillColorAsStroke: true,
          radius: 0,
          colorScale: {
            ranges: [{
              from: 0,
              to: totalMaxPowerArray[0],
              color: "#280487",
              name: `0 - ${totalMaxPowerArray[0]}`
            },
            // Blu
            {
              from: totalMaxPowerArray[0],
              to: totalMaxPowerArray[1],
              color: "#b6346a"
            },
            // Verde
            {
              from: totalMaxPowerArray[1],
              to: totalMaxPowerArray[2],
              color: "#df6d2e"
            },
            // Giallo
            {
              from: totalMaxPowerArray[2],
              to: totalMaxPowerArray[3],
              color: "#efb03d"
            },
            // Arancione
            {
              from: totalMaxPowerArray[3],
              to: totalMaxPowerArray[4],
              color: "#f8e36c"
            },
            // Rosso
            {
              from: totalMaxPowerArray[4],
              to: totalMaxPowerArray[5],
              color: "#f3f4d0"
            } // Bianco
            ]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        formatter: function (seriesName, opts) {
          // Array di gradienti da assegnare in ordine
          const gradients = ["linear-gradient(to right, #280487, #8b2572)", "linear-gradient(to right, #8b2572, #c54855)", "linear-gradient(to right, #c54855, #df6d2f)", "linear-gradient(to right, #df6d2f, #e99838)", "linear-gradient(to right, #e99838, #f0c56c)", "linear-gradient(to right, #f0c56c, #f3f2cc)"];
          // Determina il colore in base all'indice della serie
          const background = gradients[opts.seriesIndex] || "#ccc"; // Default a grigio se fuori range
          return `<button style="
          
          background:${background}; 
          color:white; 
          border:none; 
          flex-grow: 1
          border-radius: 0 !important;
          height: 35px; /* Altezza fissa per tutti i pulsanti */
          text-align: center;
          cursor:pointer;
          font-weight:bold;
          ;">
            ${seriesName}
        </button>`;
        }
      },
      xaxis: {
        labels: {
          style: {
            colors: "var(--primary-text-color)"
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: "var(--primary-text-color)"
          }
        }
      },
      tooltip: {
        enabled: true,
        theme: "dark"
      },
      title: {
        text: "Produzione giornaliera",
        align: "center",
        style: {
          color: "#FFF"
        }
      }
    };
    const chartElement = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("#heatmap-chart");
    if (!chartElement) {
      console.error("Elemento #heatmap-chart non trovato.");
      return;
    }
    if (this.chartMap) {
      this.chartMap.destroy();
    }
    this.chartMap = new ApexCharts(chartElement, options);
    // this.chartMap.render();
    this.chartMap.render().then(() => {
      var _a, _b, _c, _d, _e, _f, _g;
      // Combiniamo tutti i dati di tutte le serie in un unico array
      const allDataPoints = formattedData.flatMap(series => series.data);
      // Verifica che ci siano dati
      if (!allDataPoints.length) {
        console.warn("Nessun dato disponibile per il grafico.");
        return;
      }
      // Ordina per asse X (tempo) se necessario
      allDataPoints.sort((a, b) => a.x - b.x);
      // Se ci sono più di 7 giorni di dati, limita la visualizzazione
      if (allDataPoints.length > 7) {
        const lastIndex = allDataPoints.length - 1;
        const firstIndex = Math.max(0, lastIndex - 6);
        new Date(allDataPoints[firstIndex].x).getTime();
        new Date(allDataPoints[lastIndex].x).getTime();
        // Converti x in Date per confronto
        formattedData.forEach(series => {
          series.data.forEach(point => {
            point.x = new Date(point.x); // Converti la stringa "YYYY-MM-DD" in un oggetto Date
          });
        });
        // Ordina per data (se non già ordinato)
        formattedData.forEach(series => {
          series.data.sort((a, b) => a.x - b.x);
        });
        // Trova la data limite per gli ultimi 7 giorni
        const lastDate = formattedData[0].data[formattedData[0].data.length - 1].x;
        const firstDate = new Date(lastDate);
        firstDate.setDate(firstDate.getDate() - 6); // Ultimi 7 giorni
        // Filtra i dati per tenere solo gli ultimi 7 giorni
        const filteredData = formattedData.map(series => ({
          name: series.name,
          data: series.data.filter(point => point.x >= firstDate)
        }));
        // 🔥 Converti `x` in stringa per renderlo compatibile con Heatmap
        filteredData.forEach(series => {
          series.data.forEach(point => {
            point.x = point.x.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short"
            });
          });
        });
        // 🔄 Aggiorna il grafico con i dati corretti
        this.chartMap.updateSeries(filteredData);
      }
      const chartContainer = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("#heatmap-chart");
      // Controlla se il navigatore già esiste per evitare duplicati
      if (!((_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(".chart-cutton-container"))) {
        // Aggiunge l'HTML sotto il grafico
        chartContainer.insertAdjacentHTML("afterend", `
          <div class="chart-cutton-container">
            <button class="chart-button-select" id="prev-day-heatmap">◀ Giorno Precedente</button>
            <div style="width: 2px; height: 80%; background-color: var(--divider-color); align-self: center;"></div>
            <button class="chart-button-select" id="reset-heatmap">Ripristina</button>
            <div style="width: 2px; height: 80%; background-color: var(--divider-color); align-self: center;"></div>
            <button class="chart-button-select" id="next-day-heatmap">Giorno Successivo ▶</button>
          </div>
        `);
        // Aggiungi gli event listener ai bottoni
        (_d = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector("#prev-day-heatmap")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
          this.updateDateRange(-1); // Cambia la data
          // Aggiorna lo stato dei pulsanti
        });
        (_f = (_e = this.shadowRoot) === null || _e === void 0 ? void 0 : _e.querySelector("#reset-heatmap")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => {
          // this.initializeHeatmapChart2(formattedData);
          this.getNowTime();
          this.initializeHeatmapChart2(formattedData);
        });
        (_g = this.shadowRoot) === null || _g === void 0 ? void 0 : _g.querySelector("#next-day-heatmap").addEventListener("click", () => this.updateDateRange(1));
      }
    });
  }
  _moreinfo(entityinfo) {
    const popupEvent = new Event("hass-more-info", {
      bubbles: true,
      cancelable: false,
      composed: true
    });
    // Utilizza 'as any' per aggirare la verifica del tipo
    popupEvent.detail = {
      entityId: entityinfo
    };
    this.ownerDocument.querySelector("home-assistant").dispatchEvent(popupEvent);
  }
};
__decorate([n({
  attribute: false
})], PhotovoltaicCard.prototype, "hass", void 0);
__decorate([n()], PhotovoltaicCard.prototype, "config", void 0);
__decorate([n({
  type: Number
})], PhotovoltaicCard.prototype, "_interval", void 0);
PhotovoltaicCard = PhotovoltaicCard_1 = __decorate([t("photovoltaic-card")], PhotovoltaicCard);
