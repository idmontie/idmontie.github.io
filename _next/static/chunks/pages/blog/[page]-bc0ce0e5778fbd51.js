(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[989],{6155:function(e,t,n){var r={"./locale":9394,"./locale.js":9394};function s(e){var t=c(e);return n(t)}function c(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}s.keys=function(){return Object.keys(r)},s.resolve=c,e.exports=s,s.id=6155},807:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/[page]",function(){return n(5228)}])},8687:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(2322);n(9097);function s(e){let{children:t}=e;return(0,r.jsx)("div",{className:"overflow-visible rounded-lg bg-white shadow-lg dark:bg-gray-800",children:t})}},9760:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(2322);function s(e){let{children:t}=e;return(0,r.jsx)("h1",{className:"my-8 text-center text-3xl font-bold dark:text-white md:text-5xl",children:t})}},3068:function(e,t,n){"use strict";n.d(t,{u:function(){return a}});var r=n(2322),s=n(8687),c=n(7402),o=n(9097),i=n.n(o),l=n(207);function a(e){let{post:t}=e;const n=(0,c.b)((()=>new Date(t.date).toLocaleDateString()));return(0,r.jsx)(s.Z,{children:(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)(i(),{href:"/blog/post/".concat(t.slug),children:(0,r.jsx)("h2",{className:"text-2xl font-bold",children:t.title})}),(0,r.jsx)("div",{className:"py-2 text-sm",children:n}),(0,r.jsx)("div",{className:"prose dark:prose-dark py-4",children:(0,r.jsx)(l.o,{html:t.excerptHTML,code:t.excerptCode})}),(0,r.jsx)("div",{className:"pt-2",children:(0,r.jsxs)(i(),{href:"/blog/post/".concat(t.slug),children:["Continue reading",(0,r.jsx)("span",{className:"ml-2",children:"\u2192"})]})})]})})}},207:function(e,t,n){"use strict";n.d(t,{o:function(){return a}});var r=n(2322),s=n.t(r,2),c=n(3935),o=n(2784),i=n(91);const l={blockquote:e=>{let{children:t}=e;return(0,r.jsx)("blockquote",{className:"border-l-4 border-gray-300 pl-4",children:t})},img:e=>{let{src:t,alt:n,...s}=e;return(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("img",{alt:null!==n&&void 0!==n?n:"",src:t,...s,style:{maxHeight:500,margin:"auto",textAlign:"center"}})})},code:e=>(0,r.jsx)("code",{...e}),pre:e=>(0,r.jsx)("div",{className:"overflow-auto rounded bg-gray-200 p-4 font-mono text-sm dark:bg-gray-800 dark:text-gray-100",children:(0,r.jsx)("pre",{...e})}),Mermaid:e=>(0,r.jsx)("div",{className:"py-8 [&_svg]:m-auto",children:(0,r.jsx)(i.G,{...e})})};function a(e){let{html:t,code:n}=e;const[i,a]=(0,o.useState)(null);return(0,o.useEffect)((()=>{(async()=>{const{default:e}=await(0,c.K)(n,{...s,scope:{}});a((()=>e))})()}),[n]),(0,r.jsx)("div",{children:i?(0,r.jsx)(i,{components:l}):(0,r.jsx)("div",{dangerouslySetInnerHTML:{__html:t}})})}},7402:function(e,t,n){"use strict";n.d(t,{b:function(){return s}});var r=n(2784);function s(e){const t=(0,r.useRef)(e),[n,s]=(0,r.useState)();return(0,r.useEffect)((()=>{s(t.current())}),[]),n}},5228:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return u}});var r=n(2322),s=n(7729),c=n.n(s),o=n(5632),i=n(9097),l=n.n(i),a=n(3068),d=n(9760);var u=!0;t.default=function(e){let{hasPreviousPage:t,hasNextPage:n,posts:s}=e;const i=(0,o.useRouter)().query.page,u=Number.parseInt(i,10);return(0,r.jsxs)("div",{children:[(0,r.jsxs)(c(),{children:[(0,r.jsxs)("title",{children:["Blog Page ",i," - idmontie's Portfolio"]}),(0,r.jsx)("meta",{name:"description",content:"Latest blog posts"})]}),(0,r.jsxs)("div",{className:"px-4",children:[(0,r.jsx)("header",{children:(0,r.jsxs)(d.Z,{children:["Blog Page ",i]})}),(0,r.jsx)("div",{className:"space-y-6",children:s.map((e=>(0,r.jsx)(a.u,{post:e},e.slug)))}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{children:n&&(0,r.jsx)(l(),{href:2===u?"/blog":"/blog/".concat(u-1),children:"< Newer posts"})}),(0,r.jsx)("div",{children:t&&(0,r.jsx)(l(),{href:"/blog/".concat(u+1),children:"Older posts >"})})]})]})]})}}},function(e){e.O(0,[347,956,774,888,179],(function(){return t=807,e(e.s=t);var t}));var t=e.O();_N_E=t}]);