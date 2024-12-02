import { useState, Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import LoadingScreen from './LoadingScreen.jsx'
import Shelf from './Shelf.jsx'
const Home = lazy(()=> import('./Home.jsx'))
const Book = lazy(()=> import('./Book.jsx'))
import './App.css'

export default function App() {

  const [state, setState] = useState([])
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}books`)
    .then(res => res.json())
    .then(data => setState(data.result))
  }, [])

  return (
  <>
    <Shelf /> 
    <Suspense fallback={<LoadingScreen  color="gray" taste="dashed" />}>
      <Routes>
        <Route path={import.meta.env.BASE_URL} element={ <Home />  } />
        {state.map((elem, indx)=>(<Route key={indx} path={`${import.meta.env.BASE_URL}${elem.url}`} element={<Book title={elem.url} />} />))}
      </Routes>
    </Suspense>
  </>)
}

