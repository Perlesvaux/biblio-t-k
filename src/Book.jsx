import {renderContents, renderFootnotes, renderIndex} from './lib.js' 
import history from './assets/history.svg'
import footprints from './assets/footprints.svg'
import LoadingScreen from './LoadingScreen.jsx'
import AsideMenu from './AsideMenu.jsx'
import './Book.css'
import { useIDB } from './lib.js'

export default function Book({ title }) {

  const [ book, error, loading ] = useIDB(title, {})

  if (error instanceof TypeError) return <div> Oh, you're off the grid. Please go back <strong>On-line</strong> (<i>{error.message}</i>) </div>
  if (error) return <div> (<i>{error.message}</i>) </div>
  if (loading) return <LoadingScreen color="red" taste="dashed" />
  if (!book) return <LoadingScreen color="blue" taste="dashed"> {console.log(book)} </LoadingScreen>


  return ( 
    <main>

      <h1>{book.title}</h1>

      <article
        dangerouslySetInnerHTML={{__html:renderContents(book, 
          `<input type='button' value='{number}' popovertarget='footnote-{number}' id='{number}'>`
        )}}
      />
      <hr/>
      <footer
        dangerouslySetInnerHTML={{__html:
          `${renderFootnotes(book,
`<article popover id='footnote-{number}'> <a href="#{number}">{number}</a> {content} </article>`)}
`
        }}      
      />

      <div className="bottom" />

      <AsideMenu 
        icon={history}
        content={ renderIndex(book) }    
        position="left"
      />  

      <AsideMenu 
        icon={footprints}
        content={ renderFootnotes(book,
          `<article id='fn-{number}'> <span><a href='#{number}'><span>{number}</span></a></span> {content} </article>`) }    
        position="right"
      />  

    </main>)

  }

