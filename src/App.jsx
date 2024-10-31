import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import {renderContents, renderFootnotes, renderIndex} from './lib.js' 

export default function App() {
  //const [state, setState] = useState( {title:"", rgx:"", chapters:[], footnotes:''})
  const [state, setState] = useState()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}the-little-prince`)
    .then(res => res.json())
    .then(data => setState(data))
  }, [])

  return (<>
  {
  state && (
  <main>
    <h1>{state.title}</h1>
    <nav 
      dangerouslySetInnerHTML={{__html:renderIndex(state)}}
    />


    <article
      dangerouslySetInnerHTML={{__html:renderContents(state, 
        `<input type='button' value='{number}' popovertarget='footnote-{number}' id='{number}'>`
      )}}
    />
    <hr/>
    <footer
      dangerouslySetInnerHTML={{__html:
        `${renderFootnotes(state,
        `<section popover id='footnote-{number}'> <a href="#{number}">{number}</a> {content} </section>`)}
         ${renderFootnotes(state,
        `<section id='fn-{number}'> <a href='#{number}'>{number}</a> {content} </section>`)}`
      }}      
    />

              {console.log(state.chapters)}





  </main>
  )

  }

  </>)

}







//  return (
//    state && 
//    (<main>
//      <h1>{state.title}</h1>
//      {
//        state && state.chapters.map((entry, indx) => (
//          <article key={indx}>
//            <header>
//              <h2> {entry.title} </h2>
//            </header>
//            <section 
//              dangerouslySetInnerHTML={{__html:renderContents(
//                entry,
//                `<input type='button' value='{number}' popovertarget='footnote-{number}' id='{number}'>`
//              )}}
//              style={{textAlign:"justify"}}
//            />
//
//
//
//
//
//          </article>
//        ) )
//      }
//    </main>)
//  )
//}





            //<hr/>
            //<footer
            //  dangerouslySetInnerHTML={{__html:`${
            //    renderFootnotes(
            //      state.footnotes,
            //      entry.ch,
            //      state.rgx,
            //      `<div popover id='footnote-{number}'> <a href="#{number}">{number}</a> {content} </div>` 
            //    )}${
            //    renderFootnotes(
            //      state.footnotes,
            //      entry.ch,
            //      state.rgx,
            //      `<p id='footnote-{number}'> <a href='#{number}'>{number}</a> {content} </p>`
            //    )}`}}
            //  style={{textAlign:"justify"}}
            ///>
