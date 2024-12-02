import { Link } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from 'react'
import LoadingScreen from "./LoadingScreen.jsx"
import './Home.css'
//const LoadingScreen = lazy(()=> import("./LoadingScreen.jsx" ))  

export default function Home(  ) {

  const [booksAvailable, setBooksAvailable] = useState()

  //useEffect(() => {
  //  setBooksAvailable(booklist)
  //
  //  return ()=> setBooksAvailable()
  //}, [booklist])
  useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}books`)
    .then(res => res.json())
    .then(data => setBooksAvailable(data.result))
  }, [])

  //const [libros, setLibros] = useState(()=>booksAvailable)
  //useEffect(() => {
  //
  //  setLibros(booksAvailable)
  //  console.log(libros)
  //}, [libros])
  


  return (<>  
  {
    booksAvailable 
      ? <div className="book">
          {
            booksAvailable.map((book, indx) => (<Link 
              key={indx} 
              to={`${import.meta.env.BASE_URL}${book.url}`} 
              className="libro"
            >
            {book.title} <sub>{book.author}</sub> <sub>{book.date}</sub> 
            </Link>))
          }
        </div>
      : <LoadingScreen color="red" taste="dashed"/>
    }
  </>)
  
}



//{
//
//    booksAvailable.map((book, indx) => (<Link 
//      key={indx} 
//      to={`${import.meta.env.BASE_URL}${book.url}`} 
//    >
//      {book.title} <sub>{book.author}</sub> <sub>{book.date}</sub> 
//    </Link>))
//    :  waitScreen  
//  }
//
//
//  
//    <Suspense fallback={<LoadingScreen color="green" taste="dashed"/>}>
//{
//
//    booksAvailable.map((book, indx) => (<Link 
//      key={indx} 
//      to={`${import.meta.env.BASE_URL}${book.url}`} 
//    >
//      {book.title} <sub>{book.author}</sub> <sub>{book.date}</sub> 
//    </Link>))
//  }
//
//    </Suspense>
