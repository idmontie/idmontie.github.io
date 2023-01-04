(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{7314:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(7202)}])},8687:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var s=n(2322);function r(e){let{children:t}=e;return(0,s.jsx)("div",{className:"overflow-visible rounded-lg bg-white shadow-lg dark:bg-gray-800",children:t})}n(9097)},9760:function(e,t,n){"use strict";n.d(t,{Z:function(){return r}});var s=n(2322);function r(e){let{children:t}=e;return(0,s.jsx)("h1",{className:"my-8 text-center text-3xl font-bold dark:text-white md:text-5xl",children:t})}},1437:function(e,t,n){"use strict";n.d(t,{K:function(){return i}});var s=n(2322),r=n(2779),c=n.n(r);function i(e){let{children:t,className:n,as:r="button",...i}=e;return(0,s.jsx)(r,{className:c()("\n                inline-block\n                rounded-sm\n                bg-blue-600\n                px-6\n                py-2.5\n                text-xs\n                font-semibold\n                uppercase\n                leading-tight\n                text-white\n                shadow-md\n                transition\n                duration-150\n                ease-in-out\n                hover:bg-blue-700\n                hover:shadow-lg\n                focus:bg-blue-700\n                focus:shadow-lg\n                focus:outline-none\n                focus:ring-0\n                active:bg-blue-800\n                active:shadow-lg\n                ",n),...i,children:t})}},3068:function(e,t,n){"use strict";n.d(t,{u:function(){return o}});var s=n(2322),r=n(8687),c=n(7402),i=n(9097),l=n.n(i),a=n(4116);function o(e){let{post:t}=e,n=(0,c.b)(()=>new Date(t.date).toLocaleDateString());return(0,s.jsx)(r.Z,{children:(0,s.jsxs)("div",{className:"p-4",children:[(0,s.jsx)(l(),{href:"/blog/post/".concat(t.slug),children:(0,s.jsx)("h2",{className:"text-xl font-bold",children:t.title})}),(0,s.jsx)("div",{className:"py-2 text-sm",children:n}),(0,s.jsx)("div",{className:"prose dark:prose-dark py-4",children:(0,s.jsx)(a.o,{html:t.excerptHTML,code:t.excerptCode})}),(0,s.jsx)("div",{className:"pt-2",children:(0,s.jsxs)(l(),{href:"/blog/post/".concat(t.slug),children:["Continue reading",(0,s.jsx)("span",{className:"ml-2",children:"→"})]})})]})})}},4116:function(e,t,n){"use strict";n.d(t,{o:function(){return o}});var s=n(2322),r=n.t(s,2);let c=Object.getPrototypeOf(i).constructor;async function i(e,t){return new c(String(e))(t)}var l=n(2784);let a={img(e){let{src:t,alt:n,...r}=e;return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("img",{alt:null!=n?n:"",src:t,...r,style:{maxHeight:500,margin:"auto",textAlign:"center"}})})}};function o(e){let{html:t,code:n}=e,[c,o]=(0,l.useState)(null);return(0,l.useEffect)(()=>{(async()=>{let{default:e}=await i(n,{...r,scope:{}});o(()=>e)})()},[n]),(0,s.jsx)("div",{children:c?(0,s.jsx)(c,{components:a}):(0,s.jsx)("div",{dangerouslySetInnerHTML:{__html:t}})})}},6111:function(e,t,n){"use strict";n.d(t,{x:function(){return l}});var s=n(2322),r=n(8687),c=n(9097),i=n.n(c);function l(e){let{project:t}=e;return(0,s.jsxs)(r.Z,{children:[(0,s.jsx)("div",{className:"px-6 py-4",children:(0,s.jsx)("h4",{className:"text-xl font-semibold text-gray-800 dark:text-white",children:(0,s.jsx)(i(),{href:"/projects/".concat(t.slug),children:t.title})})}),(0,s.jsx)(i(),{href:"/projects/".concat(t.slug),children:(0,s.jsx)("div",{className:"ml-[-2%] w-[104%] bg-cover bg-center pb-[20vw] shadow-md",style:{backgroundImage:"url('".concat(t.frontmatter.image,"')")}})}),(0,s.jsx)("div",{className:"px-6 py-4",children:(0,s.jsx)("p",{className:"text-gray-700 dark:text-gray-300",children:t.frontmatter.description})})]})}},7402:function(e,t,n){"use strict";n.d(t,{b:function(){return r}});var s=n(2784);function r(e){let t=(0,s.useRef)(e),[n,r]=(0,s.useState)();return(0,s.useEffect)(()=>{r(t.current())},[]),n}},7202:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return x}});var s=n(2322);n(2784);var r=n(7729),c=n.n(r),i=n(9760),l=n(6111),a=n(3068),o=n(1437),d=n(9097),u=n.n(d),x=!0;t.default=function(e){let{posts:t,projects:n}=e;return(0,s.jsxs)("div",{children:[(0,s.jsxs)(c(),{children:[(0,s.jsx)("title",{children:"Welcome - idmontie's Portfolio"}),(0,s.jsx)("meta",{name:"description",content:"Latest projects"})]}),(0,s.jsxs)("div",{className:"px-4",children:[(0,s.jsx)("header",{children:(0,s.jsx)(i.Z,{children:"Welcome"})}),(0,s.jsxs)("section",{className:"my-4",children:[(0,s.jsx)("h3",{className:"mb-4 text-center text-2xl font-bold",children:"Latest Posts"}),(0,s.jsx)("div",{className:"grid grid-cols-1 gap-4",children:t.map(e=>(0,s.jsx)(a.u,{post:e},e.slug))}),(0,s.jsx)("div",{className:"mt-4 text-center",children:(0,s.jsx)(o.K,{as:u(),href:"/blog",children:"View All"})})]}),(0,s.jsxs)("section",{className:"my-4 mt-12",children:[(0,s.jsx)("h3",{className:"mb-4 text-center text-2xl font-bold",children:"Latest Projects"}),(0,s.jsx)("div",{className:"grid grid-cols-1 gap-4 md:grid-cols-2",children:n.map(e=>(0,s.jsx)(l.x,{project:e},e.slug))}),(0,s.jsx)("div",{className:"mt-4 text-center",children:(0,s.jsx)(o.K,{as:u(),href:"/portfolio",children:"View All"})})]})]})]})}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=7314)}),_N_E=e.O()}]);