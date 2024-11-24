import { useState, Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
//import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import home from './assets/home.svg'
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
  //const [currentReading, setCurrentReading] = useState('')
  //const [visible, setVisible] = useState(false)
  
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
    {console.log(import.meta.env.BASE_URL)}
    <Link className="home" to={import.meta.env.BASE_URL}> <img src={home} /> </Link>
      <Shelf  /> 
      <Suspense fallback={<LoadingScreen  color="red" taste="dashed" />}>
        <Routes>
          <Route path={import.meta.env.BASE_URL} element={<div> Hola! </div>} />
          {state.map((elem, indx)=>(<Route key={indx} path={`${import.meta.env.BASE_URL}${elem.url}`} element={<Book title={elem.url} />} />))}
        </Routes>
      </Suspense>
  </>)

}


          //{state.map((elem, indx)=>(<Route key={indx} path={`biblio-t-k/${elem.url}`} element={<Book title={elem.url} />} />))}


    //{currentReading 
    //  ? (<>
    //    <button onClick={()=>{setCurrentReading('')}} > close </button>
    //    <Suspense fallback={<LoadingScreen color="green" taste="dashed" />}>
    //      <Book title={currentReading} />
    //    </Suspense> 
    //  </>)
    //  : (<>
    //    { 
    //      state  
    //      ? <Shelf setter={setCurrentReading} />
    //      : <LoadingScreen  color="red" taste="dashed" />
    //    }
    //  </>)
    //}
    //
    //
    //  {console.log(currentReading)}








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
