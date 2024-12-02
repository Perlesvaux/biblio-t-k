import {renderContents, renderFootnotes, renderIndex, romans} from './lib.js' 
import { useState, useEffect } from 'react'
import history from './assets/history.svg'
import footprints from './assets/footprints.svg'
import LoadingScreen from './LoadingScreen.jsx'
import AsideMenu from './AsideMenu.jsx'
import './Book.css'

export default function Book({ title }) {

  const [state, setState] = useState()
  const [ indexVisible, setIndexVisible ] = useState(false)
  const [ footnotesVisible, setFootnotesVisible ] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}${title}`)
    .then(res => res.json())
    .then(data => setState(data))

    return () => {
      setState(null);
  	};
  }, [title])

  return (<>

    {console.log("Book")}

  {
  state
  ? (
  <main 
    onClick={()=>{if (footnotesVisible) setFootnotesVisible( false );if (indexVisible) setIndexVisible(false)}}
    >
    <h1>{state.title}</h1>

    <article
      dangerouslySetInnerHTML={{__html:renderContents(state, 
        `<input type='button' value='{number}' popovertarget='footnote-{number}' id='{number}'>`
      )}}
    />
    <hr/>
    <footer
      dangerouslySetInnerHTML={{__html:
        `${renderFootnotes(state,
        `<article popover id='footnote-{number}'> <a href="#{number}">{number}</a> {content} </article>`)}
         `
      }}      
    />
            
    <div className="bottom" />



    <AsideMenu 
      icon={history}
      content={ renderIndex(state) }    
      position="left"
    />  

    <AsideMenu 
      icon={footprints}
      content={ renderFootnotes(state,
        `<article id='fn-{number}'> <span><a href='#{number}'><span>{number}</span></a></span> {content} </article>`) }    
      position="right"
    />  




  </main>
  ) 

  : (<LoadingScreen color="red" taste="dashed" />)
  }
  </>)

}

