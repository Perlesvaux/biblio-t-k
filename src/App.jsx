import { useState, Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
//import Book from './Book.jsx'

import LoadingScreen from './LoadingScreen.jsx'
import Shelf from './Shelf.jsx'
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


  
  //const [userChoice, setUserChoice] = useState('')

  //function filtered(){
  //  //const raw = `${elem.title} ${elem.author}`
  //  const list = state.filter( (elem) => `${elem.title} ${elem.author}`.toLowerCase().includes(userChoice.toLowerCase()) ) 
  //  return list.map( (elem, indx) => 
  //    ( <button key={indx} onClick={()=>setCurrentReading(elem.url)} > {elem.title}  <sub>{ elem.author }</sub> <sub>{elem.date}</sub> </button> )  )
  //}
  

  return (<>

    <div>
      <nav>
        <Link to="/biblio-t-k/">Home</Link>
        <Link to="/the-little-prince">About</Link>
      </nav>
            <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/biblio-t-k/" element={<div> Hola! </div>} />
        <Route path="/the-little-prince" element={ <Book title={"the-little-prince"} />  } />
      </Routes>
      </Suspense>
    </div>




    
    {currentReading 
      ? (<>
        <button onClick={()=>{setCurrentReading('')}} > close </button>
        <Suspense fallback={<LoadingScreen color="green" taste="dashed" />}>
          <Book title={currentReading} />
        </Suspense> 
      </>)
      : (<>
        { 
          state  
          ? <Shelf setter={setCurrentReading} />
          : <LoadingScreen  color="red" taste="dashed" />
        }
      </>)
    }


      {console.log(currentReading)}
  </>)

}

              //{
              //  state.map((item, indx) => ( 
              //    <button key={indx}  
              //      onClick={()=>setCurrentReading(item.url) }
              //    > 
              //      {item.title}
              //    </button>) )
              //}




    //<Book />
    //<Book title={'the-little-prince'} />


    //<button 
    //  onClick={()=>{setCurrentReading('the-little-prince')}}
    //> The Little Prince </button>
    //<button 
    //  onClick={()=>{setCurrentReading('to-kill-a-nation')}}
    //> To kill a nation </button>
