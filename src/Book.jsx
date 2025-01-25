import {renderContents, renderFootnotes, renderIndex, romans} from './lib.js' 
import { useState, useEffect } from 'react'
import history from './assets/history.svg'
import footprints from './assets/footprints.svg'
import LoadingScreen from './LoadingScreen.jsx'
import AsideMenu from './AsideMenu.jsx'
import './Book.css'
import { useLocalStorage } from './custom.js'

export default function Book({ title }) {

  //const [ state, setState ] = useState()
  const [ state, setState ] = useLocalStorage('_library', {})
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ indexVisible, setIndexVisible ] = useState(false)
  const [ footnotesVisible, setFootnotesVisible ] = useState(false)
  //const [ locally, setLocally ] = useState(()=>{
  //  const saved = localStorage.getItem('_library')
  //  return saved ? JSON.parse(saved) : {}
  //})

  useEffect(() => {

    if (Object.keys(state).map(k => k).includes(title)){
      console.log(`${title} is already in! =D`)
      setLoading(false)
      return
    }

    async function fetchData(){
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}${title}`)
        if (!response.ok) throw new Error('unable to fetch data =(')
        const data = await response.json()
        console.log(data)
        setState({...state, [title]:data})
        
      } catch (error) {
        console.error(error)
        setError(error)
        
      } finally {
        setLoading(false)

      }
    }

    fetchData()

    //console.log("this happens the first time only")
    //  fetch(`${import.meta.env.VITE_API_URL}${title}`)
    //    .then(res => res.json())
    //    .then(data => { 
    //      setState(data) 
    //      setLocally({...locally, [title]:data   }) 
    //  })
        //.then(() => setLocally({...locally, [title]:state   }))
      //.then(()=> localStorage.setItem('_library', JSON.stringify( [...locally, {[title]:state }  ] ) ) )
    

  	// return () => {
  	//   console.log("inside cleanup")
  	//   setState(null);
  	//}

  }, [title])



  //useEffect(()=>{
  //  localStorage.setItem('_library', JSON.stringify( locally ))
  //
  //  //if (navigator.onLine)
  //  //{
  //
  //
  //    //}
  //}, [locally])


  if (error instanceof TypeError) return <div> Oh, you're off the grid. Please go back <strong>On-line</strong> (<i>{error.message}</i>) </div>
  if (loading) return <LoadingScreen color="red" taste="dashed" />

  return (
    <main 
      onClick={()=>{if (footnotesVisible) setFootnotesVisible( false );if (indexVisible) setIndexVisible(false)}}
      >
      <h1>{state[title].title}</h1>

      <article
        dangerouslySetInnerHTML={{__html:renderContents(state[title], 
          `<input type='button' value='{number}' popovertarget='footnote-{number}' id='{number}'>`
        )}}
      />
      <hr/>
      <footer
        dangerouslySetInnerHTML={{__html:
          `${renderFootnotes(state[title],
          `<article popover id='footnote-{number}'> <a href="#{number}">{number}</a> {content} </article>`)}
           `
        }}      
      />
              
      <div className="bottom" />

      <AsideMenu 
        icon={history}
        content={ renderIndex(state[title]) }    
        position="left"
      />  

      <AsideMenu 
        icon={footprints}
        content={ renderFootnotes(state[title],
          `<article id='fn-{number}'> <span><a href='#{number}'><span>{number}</span></a></span> {content} </article>`) }    
        position="right"
      />  

    </main>
  )

}

