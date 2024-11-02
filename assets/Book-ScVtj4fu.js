import{r as i,j as r,L as u}from"./index-Dtp13T2J.js";function m(o,e){return`
      ${o.chapters.map((t,l)=>`
            <header>
              <h2 id='chapter-${t.ch}'> ${t.title} </h2>
            </header>
            <section style='text-align:justify;'> 
              ${(()=>{let n=t.content;n=n.replace(/^/gm,"<p>"),n=n.replace(/$/gm,"</p>");let s=n.matchAll(new RegExp(o.rgx,"gm"));if(s===null)return n;for(let a of s)n=n.replace(a[0],e.replaceAll("{number}",`${t.ch}.${a[1]}`));return n})()}
            </section>
          `).join("")}

`}function c(o,e){return`<section style='text-align:justify;'>
    ${o.chapters.map(t=>`${t.footnotes.map(l=>e.replaceAll("{number}",`${t.ch}.${l.id}`).replaceAll("{content}",l.note.replace(/$/gm,"<br>"))).join("")}`).join("")}
    </section>
    `}function h(o){return`
  <ul style='text-align:justify;'>
    ${o.chapters.map(e=>`<li> <a href='#chapter-${e.ch}'>${e.title}</a></li>`).join("")}
  </ul>
  `}function d({title:o}){const[e,t]=i.useState();return i.useEffect(()=>{fetch(`https://bibilioteca-de-don-pelayo.onrender.com/${o}`).then(l=>l.json()).then(l=>t(l))},[]),r.jsx(r.Fragment,{children:e?r.jsxs("main",{children:[r.jsx("h1",{children:e.title}),r.jsx("nav",{dangerouslySetInnerHTML:{__html:h(e)}}),r.jsx("article",{dangerouslySetInnerHTML:{__html:m(e,"<input type='button' value='{number}' popovertarget='footnote-{number}' id='{number}'>")}}),r.jsx("hr",{}),r.jsx("footer",{dangerouslySetInnerHTML:{__html:`${c(e,`<section popover id='footnote-{number}'> <a href="#{number}">{number}</a> {content} </section>`)}
         ${c(e,"<section id='fn-{number}'> <a href='#{number}'>{number}</a> {content} </section>")}`}})]}):r.jsx(u,{})})}export{d as default};
