"use strict";var precacheConfig=[["/blazerius54/cards/index.html","a416b6356256898c0fbb778032d5e8af"],["/blazerius54/cards/static/css/main.0608d9b4.css","05ff932db69f86c050d40dc1f957c561"],["/blazerius54/cards/static/js/main.25d1d6d7.js","f70d455358b4d70c863d4567956e69ba"],["/blazerius54/cards/static/media/0C.4b8b1766.png","4b8b1766ddc4e863a2cc14515f3ac0ab"],["/blazerius54/cards/static/media/0D.2b1024be.png","2b1024bed0d766b32f4bd8e50a892d47"],["/blazerius54/cards/static/media/0H.0df35df4.png","0df35df482ce13edaabeae06f3fe4db7"],["/blazerius54/cards/static/media/0S.691685e5.png","691685e5500df5705dcccbbfebf4dd62"],["/blazerius54/cards/static/media/KC.247ffd29.png","247ffd29154b48fe7408897e65dc8a4c"],["/blazerius54/cards/static/media/KD.e7570305.png","e7570305a1aa95c48f490c47f741ea01"],["/blazerius54/cards/static/media/KH.2f61b286.png","2f61b2867fc5df85e24e0bbe0692125f"],["/blazerius54/cards/static/media/KS.843f3d93.png","843f3d93735fd30ba0699ce2e6ad1385"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var r=new URL(e);return"/"===r.pathname.slice(-1)&&(r.pathname+=t),r.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,r,n){var a=new URL(e);return n&&a.pathname.match(n)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(r)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var r=new URL(t).pathname;return e.some(function(e){return r.match(e)})},stripIgnoredUrlParameters=function(e,t){var r=new URL(e);return r.hash="",r.search=r.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),r.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],r=e[1],n=new URL(t,self.location),a=createCacheKey(n,hashParamName,r,/\.\w{8}\./);return[n.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(r){if(!t.has(r)){var n=new Request(r,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+r+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(r,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(r){return Promise.all(r.map(function(r){if(!t.has(r.url))return e.delete(r)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,r=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(t=urlsToCacheKeys.has(r))||(r=addDirectoryIndex(r,n),t=urlsToCacheKeys.has(r));var a="/blazerius54/cards/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(r=new URL(a,self.location).toString(),t=urlsToCacheKeys.has(r)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(r)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});