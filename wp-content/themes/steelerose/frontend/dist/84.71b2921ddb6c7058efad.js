(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{666:function(t,o,n){
/*!
 * headroom.js v0.10.4 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2020 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */
t.exports=function(){"use strict";function t(){return"undefined"!=typeof window}function o(t,n){var s;n=n||{},Object.assign(this,o.options,n),this.classes=Object.assign({},o.options.classes,n.classes),this.elem=t,this.tolerance=(s=this.tolerance)===Object(s)?s:{down:s,up:s},this.initialised=!1,this.frozen=!1}return o.prototype={constructor:o,init:function(){return o.cutsTheMustard&&!this.initialised&&(this.addClass("initial"),this.initialised=!0,setTimeout((function(t){t.scrollTracker=function(t,o,n){var s,e=function(){var t=!1;try{var o={get passive(){t=!0}};window.addEventListener("test",o,o),window.removeEventListener("test",o,o)}catch(o){t=!1}return t}(),i=!1,r=function(t){return(i=t)&&i.document&&function(t){return 9===t.nodeType}(i.document)?(n=(o=t).document,s=n.body,e=n.documentElement,{scrollHeight:function(){return Math.max(s.scrollHeight,e.scrollHeight,s.offsetHeight,e.offsetHeight,s.clientHeight,e.clientHeight)},height:function(){return o.innerHeight||e.clientHeight||s.clientHeight},scrollY:function(){return void 0!==o.pageYOffset?o.pageYOffset:(e||s.parentNode||s).scrollTop}}):function(t){return{scrollHeight:function(){return Math.max(t.scrollHeight,t.offsetHeight,t.clientHeight)},height:function(){return Math.max(t.offsetHeight,t.clientHeight)},scrollY:function(){return t.scrollTop}}}(t);var o,n,s,e,i}(t),a=r.scrollY(),c={};function h(){var t=Math.round(r.scrollY()),s=r.height(),e=r.scrollHeight();c.scrollY=t,c.lastScrollY=a,c.direction=t>a?"down":"up",c.distance=Math.abs(t-a),c.isOutOfBounds=t<0||t+s>e,c.top=t<=o.offset,c.bottom=t+s>=e,c.toleranceExceeded=c.distance>o.tolerance[c.direction],n(c),a=t,i=!1}function l(){i||(i=!0,s=requestAnimationFrame(h))}var d=!!e&&{passive:!0,capture:!1};return t.addEventListener("scroll",l,d),h(),{destroy:function(){cancelAnimationFrame(s),t.removeEventListener("scroll",l,d)}}}(t.scroller,{offset:t.offset,tolerance:t.tolerance},t.update.bind(t))}),100,this)),this},destroy:function(){this.initialised=!1,Object.keys(this.classes).forEach(this.removeClass,this),this.scrollTracker.destroy()},unpin:function(){!this.hasClass("pinned")&&this.hasClass("unpinned")||(this.addClass("unpinned"),this.removeClass("pinned"),this.onUnpin&&this.onUnpin.call(this))},pin:function(){this.hasClass("unpinned")&&(this.addClass("pinned"),this.removeClass("unpinned"),this.onPin&&this.onPin.call(this))},freeze:function(){this.frozen=!0,this.addClass("frozen")},unfreeze:function(){this.frozen=!1,this.removeClass("frozen")},top:function(){this.hasClass("top")||(this.addClass("top"),this.removeClass("notTop"),this.onTop&&this.onTop.call(this))},notTop:function(){this.hasClass("notTop")||(this.addClass("notTop"),this.removeClass("top"),this.onNotTop&&this.onNotTop.call(this))},bottom:function(){this.hasClass("bottom")||(this.addClass("bottom"),this.removeClass("notBottom"),this.onBottom&&this.onBottom.call(this))},notBottom:function(){this.hasClass("notBottom")||(this.addClass("notBottom"),this.removeClass("bottom"),this.onNotBottom&&this.onNotBottom.call(this))},shouldUnpin:function(t){return"down"===t.direction&&!t.top&&t.toleranceExceeded},shouldPin:function(t){return"up"===t.direction&&t.toleranceExceeded||t.top},addClass:function(t){this.elem.classList.add(this.classes[t])},removeClass:function(t){this.elem.classList.remove(this.classes[t])},hasClass:function(t){return this.elem.classList.contains(this.classes[t])},update:function(t){t.isOutOfBounds||!0!==this.frozen&&(t.top?this.top():this.notTop(),t.bottom?this.bottom():this.notBottom(),this.shouldUnpin(t)?this.unpin():this.shouldPin(t)&&this.pin())}},o.options={tolerance:{up:0,down:0},offset:0,scroller:t()?window:null,classes:{frozen:"headroom--frozen",pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",bottom:"headroom--bottom",notBottom:"headroom--not-bottom",initial:"headroom"}},o.cutsTheMustard=!!(t()&&function(){}.bind&&"classList"in document.documentElement&&Object.assign&&Object.keys&&requestAnimationFrame),o}()}}]);
//# sourceMappingURL=84.71b2921ddb6c7058efad.js.map