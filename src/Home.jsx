import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import LoadingScreen from "./LoadingScreen.jsx"

export default function Home() {

  const [booksAvailable, setBooksAvailable] = useState()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}books`)
      .then(res => res.json())
      .then(data => setBooksAvailable(data.result))
  }, [])

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
