(window.webpackJsonp=window.webpackJsonp||[]).push([[54,7],{364:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return f}));var r=n(415);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=s(e);if(t){var o=s(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var f=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(s,e);var t,n,o,c=i(s);function s(){return l(this,s),c.apply(this,arguments)}return t=s,(n=[{key:"render",value:function(){var e,t=this.props.type,n=Object(r.h)("i",{className:"probate-machine__status-blob"},"⬤");return"complete"===t&&(e=Object(r.h)("div",{className:"probate-machine__status-complete"},n," COMPLETED")),"incomplete"!==t&&"enabled"!==t&&"processing"!==t&&"purchased"!==t||(e=Object(r.h)("div",{className:"probate-machine__status-progressing"},n," IN PROGRESS")),"waiting"===t&&(e=Object(r.h)("div",{className:"probate-machine__status-waiting"},n," WAITING")),Object(r.h)("div",{className:"probate-machine__status"},e)}}])&&u(t.prototype,n),o&&u(t,o),s}(r.Component)},415:function(e,t,n){"use strict";n.r(t),n.d(t,"render",(function(){return L})),n.d(t,"hydrate",(function(){return M})),n.d(t,"createElement",(function(){return h})),n.d(t,"h",(function(){return h})),n.d(t,"Fragment",(function(){return m})),n.d(t,"createRef",(function(){return v})),n.d(t,"isValidElement",(function(){return o})),n.d(t,"Component",(function(){return b})),n.d(t,"cloneElement",(function(){return F})),n.d(t,"createContext",(function(){return I})),n.d(t,"toChildArray",(function(){return x})),n.d(t,"__u",(function(){return R})),n.d(t,"options",(function(){return r}));var r,o,l,u,_,i,c,s={},f=[],p=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function a(e,t){for(var n in t)e[n]=t[n];return e}function d(e){var t=e.parentNode;t&&t.removeChild(e)}function h(e,t,n){var r,o=arguments,l={};for(r in t)"key"!==r&&"ref"!==r&&(l[r]=t[r]);if(arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(o[r]);if(null!=n&&(l.children=n),"function"==typeof e&&null!=e.defaultProps)for(r in e.defaultProps)void 0===l[r]&&(l[r]=e.defaultProps[r]);return y(e,l,t&&t.key,t&&t.ref,null)}function y(e,t,n,o,l){var u={type:e,props:t,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:l};return null==l&&(u.__v=u),r.vnode&&r.vnode(u),u}function v(){return{current:null}}function m(e){return e.children}function b(e,t){this.props=e,this.context=t}function g(e,t){if(null==t)return e.__?g(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?g(e):null}function k(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return k(e)}}function w(e){(!e.__d&&(e.__d=!0)&&l.push(e)&&!S.__r++||_!==r.debounceRendering)&&((_=r.debounceRendering)||u)(S)}function S(){for(var e;S.__r=l.length;)e=l.sort((function(e,t){return e.__v.__b-t.__v.__b})),l=[],e.some((function(e){var t,n,r,o,l,u,_;e.__d&&(u=(l=(t=e).__v).__e,(_=t.__P)&&(n=[],(r=a({},l)).__v=r,o=T(_,l,r,t.__n,void 0!==_.ownerSVGElement,null,n,null==u?g(l):u),A(n,l),o!=u&&k(l)))}))}function C(e,t,n,r,o,l,u,_,i,c){var p,a,h,v,b,k,w,S=r&&r.__k||f,C=S.length;for(i==s&&(i=null!=u?u[0]:C?g(r,0):null),n.__k=[],p=0;p<t.length;p++)if(null!=(v=n.__k[p]=null==(v=t[p])||"boolean"==typeof v?null:"string"==typeof v||"number"==typeof v?y(null,v,null,null,v):Array.isArray(v)?y(m,{children:v},null,null,null):null!=v.__e||null!=v.__c?y(v.type,v.props,v.key,null,v.__v):v)){if(v.__=n,v.__b=n.__b+1,null===(h=S[p])||h&&v.key==h.key&&v.type===h.type)S[p]=void 0;else for(a=0;a<C;a++){if((h=S[a])&&v.key==h.key&&v.type===h.type){S[a]=void 0;break}h=null}b=T(e,v,h=h||s,o,l,u,_,i,c),(a=v.ref)&&h.ref!=a&&(w||(w=[]),h.ref&&w.push(h.ref,null,v),w.push(a,v.__c||b,v)),null!=b?(null==k&&(k=b),i=P(e,v,h,S,u,b,i),"option"==n.type?e.value="":"function"==typeof n.type&&(n.__d=i)):i&&h.__e==i&&i.parentNode!=e&&(i=g(h))}if(n.__e=k,null!=u&&"function"!=typeof n.type)for(p=u.length;p--;)null!=u[p]&&d(u[p]);for(p=C;p--;)null!=S[p]&&R(S[p],S[p]);if(w)for(p=0;p<w.length;p++)j(w[p],w[++p],w[++p])}function x(e){return null==e||"boolean"==typeof e?[]:Array.isArray(e)?f.concat.apply([],e.map(x)):[e]}function P(e,t,n,r,o,l,u){var _,i,c;if(void 0!==t.__d)_=t.__d,t.__d=void 0;else if(o==n||l!=u||null==l.parentNode)e:if(null==u||u.parentNode!==e)e.appendChild(l),_=null;else{for(i=u,c=0;(i=i.nextSibling)&&c<r.length;c+=2)if(i==l)break e;e.insertBefore(l,u),_=u}return void 0!==_?_:l.nextSibling}function N(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]="number"==typeof n&&!1===p.test(t)?n+"px":null==n?"":n}function E(e,t,n,r,o){var l,u,_,i,c;if(o?"className"===t&&(t="class"):"class"===t&&(t="className"),"style"===t)if(l=e.style,"string"==typeof n)l.cssText=n;else{if("string"==typeof r&&(l.cssText="",r=null),r)for(i in r)n&&i in n||N(l,i,"");if(n)for(c in n)r&&n[c]===r[c]||N(l,c,n[c])}else"o"===t[0]&&"n"===t[1]?(u=t!==(t=t.replace(/Capture$/,"")),_=t.toLowerCase(),t=(_ in e?_:t).slice(2),n?(r||e.addEventListener(t,O,u),(e.l||(e.l={}))[t]=n):e.removeEventListener(t,O,u)):"list"!==t&&"tagName"!==t&&"form"!==t&&"type"!==t&&"size"!==t&&!o&&t in e?e[t]=null==n?"":n:"function"!=typeof n&&"dangerouslySetInnerHTML"!==t&&(t!==(t=t.replace(/^xlink:?/,""))?null==n||!1===n?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),n):null==n||!1===n&&!/^ar/.test(t)?e.removeAttribute(t):e.setAttribute(t,n))}function O(e){this.l[e.type](r.event?r.event(e):e)}function D(e,t,n){var r,o;for(r=0;r<e.__k.length;r++)(o=e.__k[r])&&(o.__=e,o.__e&&("function"==typeof o.type&&o.__k.length>1&&D(o,t,n),t=P(n,o,o,e.__k,null,o.__e,t),"function"==typeof e.type&&(e.__d=t)))}function T(e,t,n,o,l,u,_,i,c){var s,f,p,d,h,y,v,g,k,w,S,x=t.type;if(void 0!==t.constructor)return null;(s=r.__b)&&s(t);try{e:if("function"==typeof x){if(g=t.props,k=(s=x.contextType)&&o[s.__c],w=s?k?k.props.value:s.__:o,n.__c?v=(f=t.__c=n.__c).__=f.__E:("prototype"in x&&x.prototype.render?t.__c=f=new x(g,w):(t.__c=f=new b(g,w),f.constructor=x,f.render=W),k&&k.sub(f),f.props=g,f.state||(f.state={}),f.context=w,f.__n=o,p=f.__d=!0,f.__h=[]),null==f.__s&&(f.__s=f.state),null!=x.getDerivedStateFromProps&&(f.__s==f.state&&(f.__s=a({},f.__s)),a(f.__s,x.getDerivedStateFromProps(g,f.__s))),d=f.props,h=f.state,p)null==x.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&f.__h.push(f.componentDidMount);else{if(null==x.getDerivedStateFromProps&&g!==d&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(g,w),!f.__e&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(g,f.__s,w)||t.__v===n.__v){f.props=g,f.state=f.__s,t.__v!==n.__v&&(f.__d=!1),f.__v=t,t.__e=n.__e,t.__k=n.__k,f.__h.length&&_.push(f),D(t,i,e);break e}null!=f.componentWillUpdate&&f.componentWillUpdate(g,f.__s,w),null!=f.componentDidUpdate&&f.__h.push((function(){f.componentDidUpdate(d,h,y)}))}f.context=w,f.props=g,f.state=f.__s,(s=r.__r)&&s(t),f.__d=!1,f.__v=t,f.__P=e,s=f.render(f.props,f.state,f.context),f.state=f.__s,null!=f.getChildContext&&(o=a(a({},o),f.getChildContext())),p||null==f.getSnapshotBeforeUpdate||(y=f.getSnapshotBeforeUpdate(d,h)),S=null!=s&&s.type==m&&null==s.key?s.props.children:s,C(e,Array.isArray(S)?S:[S],t,n,o,l,u,_,i,c),f.base=t.__e,f.__h.length&&_.push(f),v&&(f.__E=f.__=null),f.__e=!1}else null==u&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=U(n.__e,t,n,o,l,u,_,c);(s=r.diffed)&&s(t)}catch(e){t.__v=null,r.__e(e,t,n)}return t.__e}function A(e,t){r.__c&&r.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){r.__e(e,t.__v)}}))}function U(e,t,n,r,o,l,u,_){var i,c,p,a,d,h=n.props,y=t.props;if(o="svg"===t.type||o,null!=l)for(i=0;i<l.length;i++)if(null!=(c=l[i])&&((null===t.type?3===c.nodeType:c.localName===t.type)||e==c)){e=c,l[i]=null;break}if(null==e){if(null===t.type)return document.createTextNode(y);e=o?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type,y.is&&{is:y.is}),l=null,_=!1}if(null===t.type)h!==y&&e.data!=y&&(e.data=y);else{if(null!=l&&(l=f.slice.call(e.childNodes)),p=(h=n.props||s).dangerouslySetInnerHTML,a=y.dangerouslySetInnerHTML,!_){if(null!=l)for(h={},d=0;d<e.attributes.length;d++)h[e.attributes[d].name]=e.attributes[d].value;(a||p)&&(a&&p&&a.__html==p.__html||(e.innerHTML=a&&a.__html||""))}(function(e,t,n,r,o){var l;for(l in n)"children"===l||"key"===l||l in t||E(e,l,null,n[l],r);for(l in t)o&&"function"!=typeof t[l]||"children"===l||"key"===l||"value"===l||"checked"===l||n[l]===t[l]||E(e,l,t[l],n[l],r)})(e,y,h,o,_),a?t.__k=[]:(i=t.props.children,C(e,Array.isArray(i)?i:[i],t,n,r,"foreignObject"!==t.type&&o,l,u,s,_)),_||("value"in y&&void 0!==(i=y.value)&&i!==e.value&&E(e,"value",i,h.value,!1),"checked"in y&&void 0!==(i=y.checked)&&i!==e.checked&&E(e,"checked",i,h.checked,!1))}return e}function j(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){r.__e(e,n)}}function R(e,t,n){var o,l,u;if(r.unmount&&r.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||j(o,null,t)),n||"function"==typeof e.type||(n=null!=(l=e.__e)),e.__e=e.__d=void 0,null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){r.__e(e,t)}o.base=o.__P=null}if(o=e.__k)for(u=0;u<o.length;u++)o[u]&&R(o[u],t,n);null!=l&&d(l)}function W(e,t,n){return this.constructor(e,n)}function L(e,t,n){var o,l,u;r.__&&r.__(e,t),l=(o=n===i)?null:n&&n.__k||t.__k,e=h(m,null,[e]),u=[],T(t,(o?t:n||t).__k=e,l||s,s,void 0!==t.ownerSVGElement,n&&!o?[n]:l?null:t.childNodes.length?f.slice.call(t.childNodes):null,u,n||s,o),A(u,e)}function M(e,t){L(e,t,i)}function F(e,t){var n,r;for(r in t=a(a({},e.props),t),arguments.length>2&&(t.children=f.slice.call(arguments,2)),n={},t)"key"!==r&&"ref"!==r&&(n[r]=t[r]);return y(e.type,n,t.key||e.key,t.ref||e.ref,null)}function I(e){var t={},n={__c:"__cC"+c++,__:e,Consumer:function(e,t){return e.children(t)},Provider:function(e){var r,o=this;return this.getChildContext||(r=[],this.getChildContext=function(){return t[n.__c]=o,t},this.shouldComponentUpdate=function(e){o.props.value!==e.value&&r.some((function(t){t.context=e.value,w(t)}))},this.sub=function(e){r.push(e);var t=e.componentWillUnmount;e.componentWillUnmount=function(){r.splice(r.indexOf(e),1),t&&t.call(e)}}),e.children}};return n.Consumer.contextType=n,n.Provider.__=n,n}r={__e:function(e,t){for(var n,r;t=t.__;)if((n=t.__c)&&!n.__)try{if(n.constructor&&null!=n.constructor.getDerivedStateFromError&&(r=!0,n.setState(n.constructor.getDerivedStateFromError(e))),null!=n.componentDidCatch&&(r=!0,n.componentDidCatch(e)),r)return w(n.__E=n)}catch(t){e=t}throw e}},o=function(e){return null!=e&&void 0===e.constructor},b.prototype.setState=function(e,t){var n;n=this.__s!==this.state?this.__s:this.__s=a({},this.state),"function"==typeof e&&(e=e(n,this.props)),e&&a(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),w(this))},b.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),w(this))},b.prototype.render=m,l=[],u="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,S.__r=0,i=s,c=0}}]);
//# sourceMappingURL=54.71b2921ddb6c7058efad.js.map