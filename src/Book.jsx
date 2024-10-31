import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import {renderContents, renderFootnotes, renderIndex} from './lib.js' 

export default function Book({ title }) {
  //const [state, setState] = useState( {title:"", rgx:"", chapters:[], footnotes:''})
  const [state, setState] = useState()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}${title}`)
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
  </main>
  )

  }

  </>)

}
