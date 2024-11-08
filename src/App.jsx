import { useState, Suspense, lazy, useEffect } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
//import Book from './Book.jsx'

import LoadingScreen from './LoadingScreen.jsx'
const Book = lazy(()=> import('./Book.jsx')  )
//import {renderContents, renderFootnotes, renderIndex} from './lib.js' 

export default function App() {
  const [state, setState] = useState([])
  const [currentReading, setCurrentReading] = useState('')
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}books`)
    .then(res => res.json())
    .then(data => setState(data.result))
  }, [])

  

  return (<>
    
    {currentReading 
      ? (<>
        <button onClick={()=>{setCurrentReading('')}} > close </button>
        <Suspense fallback={<LoadingScreen />}>
          <Book title={currentReading} />
        </Suspense> 
      </>)
      : (<>Menu

        { 
          state  
          ? state.map((item, indx) => ( 
              <button key={indx}  
                onClick={()=>setCurrentReading(item.url) }
              > 
                {item.title}
              </button>) )
          : <LoadingScreen />
        }




      </>)
    }


      {console.log(currentReading)}
  </>)

}
    //<Book />
    //<Book title={'the-little-prince'} />


    //<button 
    //  onClick={()=>{setCurrentReading('the-little-prince')}}
    //> The Little Prince </button>
    //<button 
    //  onClick={()=>{setCurrentReading('to-kill-a-nation')}}
    //> To kill a nation </button>
