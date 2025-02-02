import { Link } from "react-router-dom";
import LoadingScreen from "./LoadingScreen.jsx"
import { useIDB } from './lib.js'

export default function Home() {

  const [booksAvailable, error, loading] = useIDB('books', [])

  if (loading) return <LoadingScreen color="red" taste="dashed"/>

  if (error) return <div> Maybe you are offline {error} </div>

  return (<div className="book">
    {
      booksAvailable.map((book, indx) => (<Link 
        key={indx} 
        to={`${import.meta.env.BASE_URL}${book.url}`} 
        className="libro"
      >
      {book.title} <sub>{book.author}</sub> <sub>{book.date}</sub> 
      </Link>))
    }
  </div>)
}
