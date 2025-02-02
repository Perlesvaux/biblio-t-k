import { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import cancel from './assets/cancel.svg'
import search from './assets/search.svg'
import home from './assets/home.svg'
import './Shelf.css'
import { useIDB } from './lib.js'

export default function Shelf() {
  const [state, error, loading] = useIDB('books', [])
  const [userChoice, setUserChoice] = useState('')
  const [visible, setVisible] = useState(true)
  const inputRef = useRef(null)
  
  useEffect(() => {
    window.addEventListener("keydown", keyboardShortcuts)
    return ()=> window.removeEventListener("keydown", keyboardShortcuts)
  }, [])

  useEffect(()=>{
    if (!visible && inputRef.current) inputRef.current.focus();
  }, [visible])


  function keyboardShortcuts(e){
    if (e.key==='Escape') setVisible(true)
    if (e.key==='F' || e.key==='f' && e.shiftKey && e.ctrlKey) setVisible(false)
  }

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

  return (
  <>
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
