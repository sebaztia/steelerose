(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{375:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return v}));var r=n(415),o=n(422);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e,n,r,o,c,u){try{var i=t[c](u),a=i.value}catch(t){return void n(t)}i.done?e(a):Promise.resolve(a).then(r,o)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var c=t.apply(e,n);function i(t){u(c,r,o,i,a,"next",t)}function a(t){u(c,r,o,i,a,"throw",t)}i(void 0)}))}}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=y(t);if(e){var o=y(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return l(this,n)}}function l(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?p(t):e}function p(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function b(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}n(419);var h=n(431).Parser,m=new Headers({"content-type":"application/json","X-WP-Nonce":Globals.rest_nonce}),d={get:Globals.api_url+"stripe/payment/charges/",template:Globals.api_url+"twig/get-template/"},v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(l,t);var e,n,c,u=s(l);function l(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),b(p(e=u.call(this,t)),"componentDidUpdate",i(regeneratorRuntime.mark((function t(){var n,r,o,c,u,i,a,f,s,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.props.access,r=e.state.gotData,o=new h,!n||r){t.next=21;break}return c={method:"get",mode:"cors",headers:m},t.next=7,fetch(d.get,c);case 7:return u=t.sent,t.next=10,u.json();case 10:return i=t.sent,console.log(i),a={method:"post",mode:"cors",body:JSON.stringify({path:"payment-charges",filename:"payment-charges.twig",data:{charges:i}}),headers:m},t.next=15,fetch(d.template,a);case 15:return f=t.sent,t.next=18,f.json();case 18:s=t.sent,l=o.parse(s),e.setState({gotData:!0,html:l},(function(){document.dispatchEvent(new CustomEvent("ui-repaint"))}));case 21:document.dispatchEvent(new CustomEvent("ui-repaint"));case 22:case"end":return t.stop()}}),t)})))),b(p(e),"componentDidMount",(function(){document.dispatchEvent(new CustomEvent("ui-repaint"))})),e.state={gotData:!1,html:Object(r.h)(o.a,null)},e}return e=l,(n=[{key:"render",value:function(){var t=this.state.html;return Object(r.h)("div",null,Object(r.h)("p",null,Object(r.h)("b",null,"TODO: Design for charge history interface")),t)}}])&&a(e.prototype,n),c&&a(e,c),l}(r.Component)},422:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var r=n(415);function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=s(t);if(e){var o=s(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f(this,n)}}function f(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var l=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(s,t);var e,n,o,f=a(s);function s(){return c(this,s),f.apply(this,arguments)}return e=s,(n=[{key:"render",value:function(){return Object(r.h)("div",{className:"spinner"})}}])&&u(e.prototype,n),o&&u(e,o),s}(r.Component)},444:function(t,e){}}]);
//# sourceMappingURL=31.71b2921ddb6c7058efad.js.map