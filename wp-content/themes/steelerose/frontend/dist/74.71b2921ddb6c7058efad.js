(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{380:function(e,t,r){"use strict";function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var r=[],n=!0,i=!1,a=void 0;try{for(var u,s=e[Symbol.iterator]();!(n=(u=s.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(e){i=!0,a=e}finally{try{n||null==s.return||s.return()}finally{if(i)throw a}}return r}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function a(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.r(t),r.d(t,"default",(function(){return s}));var s=function(){function e(t,r,i){var a=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),u(this,"field",!1),u(this,"value",!1),u(this,"output",[]),u(this,"test",(function(e,t){var r={field:a.field,valid:!0,rule:e};if("required"!==e||a.value||t.test&&(r.valid=!1,r.message=t.message?t.message:a.field+" is required"),"email"===e&&(a.validateEmail(a.value)||(r.valid=!1,r.message=a.field+" is invalid")),"ninumber"===e&&t.test&&(a.validateNI(t.test,a.value)||(r.valid=!1,r.message=t.message?t.message:a.field+" is required")),"address"===e&&t.test)for(var n=a.value.split(","),i=0;i<n.length;i++)console.log(n[i]),n[i]&&""!==n[i]||(r.valid=!1,r.message=t.message?t.message:a.field+" is incomplete");return r})),this.field=t,this.value=r;for(var s=0,o=Object.entries(i);s<o.length;s++){var l=n(o[s],2),f=l[0],c=l[1];this.output.push(this.test(f,c))}return this.output}var t,r,i;return t=e,(r=[{key:"validateNI",value:function(e,t){return/^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-D]{1}$/i.test(String(t))}},{key:"validateEmail",value:function(e){return/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(String(e).toLowerCase())}}])&&a(t.prototype,r),i&&a(t,i),e}()}}]);
//# sourceMappingURL=74.71b2921ddb6c7058efad.js.map