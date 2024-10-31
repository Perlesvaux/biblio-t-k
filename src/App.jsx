import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Book from './Book.jsx'
//import {renderContents, renderFootnotes, renderIndex} from './lib.js' 

export default function App() {
  const [currentReading, setCurrentReading] = useState('')
  

  

  return (<>
    
    {currentReading 
      ? (<>
      <button onClick={()=>{setCurrentReading('')}} > close </button>
      <Book title={currentReading} /> </>)
      : (<>Menu
    <button 
      onClick={()=>{setCurrentReading('the-little-prince')}}
    > The Little Prince </button>
    <button 
      onClick={()=>{setCurrentReading('to-kill-a-nation')}}
    > To kill a nation </button>

      </>)
    }


      {console.log(currentReading)}
  </>)

}
    //<Book />
    //<Book title={'the-little-prince'} />

