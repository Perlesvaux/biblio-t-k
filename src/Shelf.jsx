import { useState, useEffect } from 'react'
//import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './Shelf.css'
//import Book from './Book.jsx'

//import LoadingScreen from './LoadingScreen.jsx'
//const Book = lazy(()=> import('./Book.jsx')  )
//import {renderContents, renderFootnotes, renderIndex} from './lib.js' 

export default function Shelf({ setter }) {
  const [state, setState] = useState([])
  const [userChoice, setUserChoice] = useState('')
  //const [currentReading, setCurrentReading] = useState('')
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}books`)
    .then(res => res.json())
    .then(data => setState(data.result))
  }, [])

  function filtered(){
    //const raw = `${elem.title} ${elem.author}`
    const list = state.filter( (elem) => `${elem.title} ${elem.author}`.toLowerCase().includes(userChoice.toLowerCase()) ) 
    return list.map( (elem, indx) => 
      ( <button key={indx} onClick={()=>setter(elem.url)} > {elem.title}  <sub>{ elem.author }</sub> <sub>{elem.date}</sub> </button> )  )
  }
  

  return (<>
    { 
       <nav className="navbar">
       <input className="textbox" type="text" onChange={(e)=>setUserChoice(e.target.value) } value={userChoice} />
       <div className="book">
         { filtered() }
       </div>
       </nav>
    }      
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

