!function(){"use strict";var e,n={250:function(){var e=window.wp.blocks,n=window.wp.element,r=(window.wp.i18n,window.wp.blockEditor);(0,e.registerBlockType)("emma/slide",{edit:function(){const e=(0,r.useBlockProps)();return(0,n.createElement)("div",{...e},(0,n.createElement)(r.InnerBlocks,{template:[["core/paragraph",{placeholder:"Slide Content"}]]}))},save:function(){const e=r.useBlockProps.save({className:"splide__slide emma-container"});return(0,n.createElement)("li",{...e},(0,n.createElement)(r.InnerBlocks.Content,null))}})}},r={};function t(e){var o=r[e];if(void 0!==o)return o.exports;var i=r[e]={exports:{}};return n[e](i,i.exports,t),i.exports}t.m=n,e=[],t.O=function(n,r,o,i){if(!r){var c=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],i=e[u][2];for(var l=!0,a=0;a<r.length;a++)(!1&i||c>=i)&&Object.keys(t.O).every((function(e){return t.O[e](r[a])}))?r.splice(a--,1):(l=!1,i<c&&(c=i));if(l){e.splice(u--,1);var s=o();void 0!==s&&(n=s)}}return n}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[r,o,i]},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},function(){var e={830:0,252:0};t.O.j=function(n){return 0===e[n]};var n=function(n,r){var o,i,c=r[0],l=r[1],a=r[2],s=0;if(c.some((function(n){return 0!==e[n]}))){for(o in l)t.o(l,o)&&(t.m[o]=l[o]);if(a)var u=a(t)}for(n&&n(r);s<c.length;s++)i=c[s],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(u)},r=self.webpackChunkemma_slider=self.webpackChunkemma_slider||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var o=t.O(void 0,[252],(function(){return t(250)}));o=t.O(o)}();