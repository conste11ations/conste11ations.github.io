(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[905],{7942:function(e,n,t){"use strict";var r=t(5696);n.default=void 0;var o,a=(o=t(7294))&&o.__esModule?o:{default:o},c=t(4957),l=t(9898),u=t(639);var i={};function s(e,n,t,r){if(e&&c.isLocalURL(n)){e.prefetch(n,t,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;i[n+"%"+t+(o?"%"+o:"")]=!0}}var f=function(e){var n,t=!1!==e.prefetch,o=l.useRouter(),f=a.default.useMemo((function(){var n=c.resolveHref(o,e.href,!0),t=r(n,2),a=t[0],l=t[1];return{href:a,as:e.as?c.resolveHref(o,e.as):l||a}}),[o,e.href,e.as]),d=f.href,v=f.as,p=e.children,h=e.replace,b=e.shallow,m=e.scroll,x=e.locale;"string"===typeof p&&(p=a.default.createElement("a",null,p));var y=(n=a.default.Children.only(p))&&"object"===typeof n&&n.ref,k=u.useIntersection({rootMargin:"200px"}),g=r(k,2),w=g[0],_=g[1],E=a.default.useCallback((function(e){w(e),y&&("function"===typeof y?y(e):"object"===typeof y&&(y.current=e))}),[y,w]);a.default.useEffect((function(){var e=_&&t&&c.isLocalURL(d),n="undefined"!==typeof x?x:o&&o.locale,r=i[d+"%"+v+(n?"%"+n:"")];e&&!r&&s(o,d,v,{locale:n})}),[v,d,_,x,t,o]);var L={ref:E,onClick:function(e){n.props&&"function"===typeof n.props.onClick&&n.props.onClick(e),e.defaultPrevented||function(e,n,t,r,o,a,l,u){("A"!==e.currentTarget.nodeName||!function(e){var n=e.currentTarget.target;return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&c.isLocalURL(t))&&(e.preventDefault(),null==l&&r.indexOf("#")>=0&&(l=!1),n[o?"replace":"push"](t,r,{shallow:a,locale:u,scroll:l}))}(e,o,d,v,h,b,m,x)},onMouseEnter:function(e){n.props&&"function"===typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),c.isLocalURL(d)&&s(o,d,v,{priority:!0})}};if(e.passHref||"a"===n.type&&!("href"in n.props)){var M="undefined"!==typeof x?x:o&&o.locale,C=o&&o.isLocaleDomain&&c.getDomainLocale(v,M,o&&o.locales,o&&o.domainLocales);L.href=C||c.addBasePath(c.addLocale(v,M,o&&o.defaultLocale))}return a.default.cloneElement(n,L)};n.default=f},639:function(e,n,t){"use strict";var r=t(5696);Object.defineProperty(n,"__esModule",{value:!0}),n.useIntersection=function(e){var n=e.rootMargin,t=e.disabled||!c,u=o.useRef(),i=o.useState(!1),s=r(i,2),f=s[0],d=s[1],v=o.useCallback((function(e){u.current&&(u.current(),u.current=void 0),t||f||e&&e.tagName&&(u.current=function(e,n,t){var r=function(e){var n=e.rootMargin||"",t=l.get(n);if(t)return t;var r=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var n=r.get(e.target),t=e.isIntersecting||e.intersectionRatio>0;n&&t&&n(t)}))}),e);return l.set(n,t={id:n,observer:o,elements:r}),t}(t),o=r.id,a=r.observer,c=r.elements;return c.set(e,n),a.observe(e),function(){c.delete(e),a.unobserve(e),0===c.size&&(a.disconnect(),l.delete(o))}}(e,(function(e){return e&&d(e)}),{rootMargin:n}))}),[t,n,f]);return o.useEffect((function(){if(!c&&!f){var e=a.requestIdleCallback((function(){return d(!0)}));return function(){return a.cancelIdleCallback(e)}}}),[f]),[v,f]};var o=t(7294),a=t(6286),c="undefined"!==typeof IntersectionObserver;var l=new Map},8853:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return a}});var r=t(1664),o=(t(3456),t(5893));function a(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{className:"absolute m-8 text-white prose-a:text-cyan-600 prose-a:underline hover:prose-a:text-cyan-300",children:[(0,o.jsx)("h1",{className:"text-5xl md:text-8xl mb-4",children:(0,o.jsx)("span",{className:"block animate-fade-in-down font-extrabold text-white xl:inline",children:"Talk"})}),(0,o.jsx)(r.default,{href:"/talk/ben-eater-clock-module",as:"/talk/ben-eater-clock-module",children:"Reviewing Ben Eater's Clock Module Kit"})]}),(0,o.jsx)("img",{src:"waves.svg",className:"object-cover flex h-screen w-full"})]})}},4788:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/talk",function(){return t(8853)}])},3456:function(){},1664:function(e,n,t){e.exports=t(7942)}},function(e){e.O(0,[774,206,888,179],(function(){return n=4788,e(e.s=n);var n}));var n=e.O();_N_E=n}]);