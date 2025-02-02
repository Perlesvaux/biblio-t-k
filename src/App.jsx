import { Suspense, lazy } from 'react'
import { Routes, Route } from "react-router-dom";
import LoadingScreen from './LoadingScreen.jsx'
import Shelf from './Shelf.jsx'
const Home = lazy(()=> import('./Home.jsx'))
const Book = lazy(()=> import('./Book.jsx'))
import './App.css'

import { useIDB } from './lib.js'

export default function App() {
  const [books, error, loading] = useIDB('books',[]);

  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
  <>
    <Shelf /> 
    <Suspense fallback={<LoadingScreen  color="gray" taste="dashed" />}>
      <Routes>
        <Route path={import.meta.env.BASE_URL} element={ <Home />  } />
        {books.map((elem, indx)=>(<Route key={indx} path={`${import.meta.env.BASE_URL}${elem.url}`} element={<Book title={elem.url} />} />))}
      </Routes>
    </Suspense>
  </>)
}

