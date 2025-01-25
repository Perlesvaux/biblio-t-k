import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import LoadingScreen from "./LoadingScreen.jsx"

export default function Home() {

  const [booksAvailable, setBooksAvailable] = useState()
  const [locally, setLocally] = useState(()=>{
    const saved = localStorage.getItem('_available')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    console.log('inside HOME useEffect', locally)
    if (Array.isArray(locally) && locally.length>0) { 
      console.log('HOME has these in store for you',  locally, locally.length)
      setBooksAvailable(locally)
      return
    }


    fetch(`${import.meta.env.VITE_API_URL}books`)
      .then(res => res.json())
      .then(data => { 
        setBooksAvailable(data.result) 
        setLocally(data.result)
      })
  }, [])

  useEffect(()=>{
    localStorage.setItem('_available', JSON.stringify(locally))
  }
    , [locally])

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
