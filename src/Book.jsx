import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import './Book.css'
import hamburger from './assets/hamburger.svg'
import {renderContents, renderFootnotes, renderIndex} from './lib.js' 

import LoadingScreen from './LoadingScreen.jsx'

export default function Book({ title }) {
  //const [state, setState] = useState( {title:"", rgx:"", chapters:[], footnotes:''})
  const [state, setState] = useState()
  const [ asideVisible, setAsideVisible ] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}${title}`)
    .then(res => res.json())
    .then(data => setState(data))
  }, [])

      //{ asideVisible && ( <aside dangerouslySetInnerHTML={{__html:renderIndex(state)}}/> ) }
  return (<>

    <button 
      className="display-table-of-contents"
      style={ asideVisible ? {"left":"-50%" } : {"left":"0" } } 
      onClick={()=>setAsideVisible( !asideVisible )}
    >
      <img src={hamburger} alt="Hamburger menu icon" />
    </button>

  {
  state
  ? (
  <main 
    onClick={()=>{if (asideVisible) setAsideVisible( false )}}
    >
    <h1>{state.title}</h1>

    <aside
      style={ asideVisible ? {"left":"0" } : {"left":"-50%" } } 
      dangerouslySetInnerHTML={{__html:renderIndex(state)}}
      className="sidenav"
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
            
    <div className="bottom" />
  </main>
  ) 

  : (<LoadingScreen />)
  }
  </>)

}
