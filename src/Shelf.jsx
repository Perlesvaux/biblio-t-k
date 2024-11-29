import { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
//import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './Shelf.css'
import cancel from './assets/cancel.svg'
import search from './assets/search.svg'
import home from './assets/home.svg'
//import Book from './Book.jsx'

//import LoadingScreen from './LoadingScreen.jsx'
//const Book = lazy(()=> import('./Book.jsx')  )
//import {renderContents, renderFootnotes, renderIndex} from './lib.js' 

export default function Shelf() {
  const [state, setState] = useState([])
  const [userChoice, setUserChoice] = useState('')
  const [visible, setVisible] = useState(true)
  const inputRef = useRef(null)
  //const [currentReading, setCurrentReading] = useState('')
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}books`)
    .then(res => res.json())
    .then(data => setState(data.result))

    window.addEventListener("keydown", keyboardShortcuts)

    return ()=>{
      window.removeEventListener("keydown", keyboardShortcuts)
    }
  }, [])

  useEffect(()=>{
    if (!visible && inputRef.current) inputRef.current.focus();
  }, [visible])



  function keyboardShortcuts(e){
    if (e.key==='Escape') setVisible(true)
    if (e.key==='F' || e.key==='f' && e.shiftKey && e.ctrlKey) setVisible(false)
  }


  //function filtered(){
  //  const list = state.filter( (elem) => `${elem.title} ${elem.author}`.toLowerCase().includes(userChoice.toLowerCase()) ) 
  //  return list.map( (elem, indx) => 
  //    ( <button key={indx} onClick={()=>setter(elem.url)} > {elem.title}  <sub>{ elem.author }</sub> <sub>{elem.date}</sub> </button> )  )
  //}
  
  function filtered(){
    if (userChoice.length < 3) return;
    const list = state.filter( (elem) => `${elem.title} ${elem.author}`.toLowerCase().includes(userChoice.toLowerCase()) ) 
    return list.map( (elem, indx) => 
       (<Link key={indx}  
          to={ `${import.meta.env.BASE_URL}${elem.url}`} 
          className="libro"
          onClick={ ()=>{setVisible(!visible)}  }
        >
          {elem.title} <sub>{elem.author}</sub> <sub>{elem.date}</sub> 
        </Link> ))
  }

  return (<>
  <div className={ "background-panel" + ` ${visible && "hidden"}`} />
  <div className="top-panel" />
  <Link className={ "home buttonlike" + ` ${!visible && "hidden"}` } to={import.meta.env.BASE_URL}> <img src={home} /> </Link>
  <a className={ "on-off buttonlike" + ` ${!visible && "hidden"}` }  onClick={()=>setVisible(!visible) }> <img src={search}/> </a>
    <nav className={ "navbar" + ` ${visible && "hidden"}` }>
      <a className="on-off circular buttonlike" onClick={()=>setVisible(!visible) }> <img src={cancel} /> </a>
      <input className="textbox" type="text" onChange={(e)=>setUserChoice(e.target.value) } value={userChoice} ref={inputRef}/>
      <div className="book">
        { filtered() }
      </div>
    </nav>
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

