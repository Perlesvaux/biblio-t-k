import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import AsideMenu from './AsideMenu.jsx'
import './Book.css'
import history from './assets/history.svg'
import footprints from './assets/footprints.svg'
import {renderContents, renderFootnotes, renderIndex, romans} from './lib.js' 

import LoadingScreen from './LoadingScreen.jsx'

export default function Book({ title }) {
  //const [state, setState] = useState( {title:"", rgx:"", chapters:[], footnotes:''})
  const [state, setState] = useState()
  const [ indexVisible, setIndexVisible ] = useState(false)
  const [ footnotesVisible, setFootnotesVisible ] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}${title}`)
    .then(res => res.json())
    .then(data => setState(data))
  }, [title])

      //{ asideVisible && ( <aside dangerouslySetInnerHTML={{__html:renderIndex(state)}}/> ) }
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
      //visible={indexVisible}
      //swap={()=>setIndexVisible(!indexVisible)}        
      content={ renderIndex(state) }    
      position="left"
    />  

    <AsideMenu 
      icon={footprints}
      //visible={indexVisible}
      //swap={()=>setIndexVisible(!indexVisible)}        
      content={ renderFootnotes(state,
        `<article id='fn-{number}'> <span><a href='#{number}'><span>{number}</span></a></span> {content} </article>`) }    
      position="right"
    />  




  </main>
  ) 

  : (<LoadingScreen taste="dashed" />)
  }
  </>)

}



    //<AsideMenu 
    //  icon={footprints}
    //  visible={footnotesVisible}
    //  swap={()=>setFootnotesVisible(!footnotesVisible)}        
    //  content={ renderIndex(state) }    
    //  position="right"
    ///>  



    //<button 
    //  className="display-table-of-contents"
    //  style={ asideVisible ? {"left":"-50%" } : {"left":"0" } } 
    //  onClick={()=>setAsideVisible( !asideVisible )}
    //>
    //  <img src={hamburger} alt="Hamburger menu icon" />
    //</button>
    //
    //<aside
    //  style={ asideVisible ? {"left":"0" } : {"left":"-50%" } } 
    //  dangerouslySetInnerHTML={{__html:renderIndex(state)}}
    //  className="sidenav"
    ///> 
