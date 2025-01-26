import {renderContents, renderFootnotes, renderIndex, romans} from './lib.js' 
import { useState, useEffect, useCallback } from 'react'
import history from './assets/history.svg'
import footprints from './assets/footprints.svg'
import LoadingScreen from './LoadingScreen.jsx'
import AsideMenu from './AsideMenu.jsx'
import './Book.css'
import { useLocalStorage } from './custom.js'

export default function Book({ title }) {

  const [ state, setState ] = useLocalStorage('_library', {})
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)
  //const [ indexVisible, setIndexVisible ] = useState(false)
  //const [ footnotesVisible, setFootnotesVisible ] = useState(false)
  const book = state[title]

  const fetchData = useCallback( async()=>{
    setLoading(true)
    setError(null)

    try {
      if (!Object.keys(state).map(k => k).includes(title)) 
      {
        const response = await fetch(`${import.meta.env.VITE_API_URL}${title}`)
        if (!response.ok) throw new Error('unable to fetch data =(')
        const data = await response.json()
        console.log(data)
        setState({...state, [title]:data})

      }
      
    } catch (error) {
      console.error(error)
      setError(error)
      
    } 
    finally {
      setLoading(false)

    }
  }, [title, state, setState])

  useEffect(() => {
      fetchData()
  }, [fetchData])


  if (error instanceof TypeError) return <div> Oh, you're off the grid. Please go back <strong>On-line</strong> (<i>{error.message}</i>) </div>
  if (error) return <div> (<i>{error.message}</i>) </div>
  if (loading) return <LoadingScreen color="red" taste="dashed" />
  if (!book) return <LoadingScreen color="blue" taste="dashed" />


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

