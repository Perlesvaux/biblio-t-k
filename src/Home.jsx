import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import LoadingScreen from "./LoadingScreen.jsx"
//import { useLocalStorage } from './custom.js'
//import { getFromDB, saveToDB } from './lib.js'
//import { getFromDB, saveToDB } from './custom.js'
import { useIDB } from './lib.js'

export default function Home() {

  const [booksAvailable, error, loading] = useIDB('books', [])
  //const [booksAvailable, setBooksAvailable] = useState([])
  //const [booksAvailable, setBooksAvailable] = useState()
  //const [booksAvailable, setBooksAvailable] = useLocalStorage('_available', [])
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
  //const [locally, setLocally] = useState(()=>{
  //  const saved = localStorage.getItem('_available')
  //  return saved ? JSON.parse(saved) : []
  //})
  //const [books, setBooks] = useLocalStorage('_available', [])


  //const fetchBooks = async() =>{
  //  try {
  //    const cachedBooks = await getFromDB('booksDB', 'books', 'books-list')
  //    if (cachedBooks) {
  //      setBooksAvailable(cachedBooks.data)
  //      console.log(cachedBooks.data)
  //    } else {
  //      const response = await fetch(`${import.meta.env.VITE_API_URL}books`)
  //      const data = await response.json()
  //      //setBooksAvailable(data.result)
  //      setBooksAvailable(data)
  //
  //      await saveToDB('booksDB', 'books', { id:'books-list', data:data })
  //      //await saveToDB('booksDB', 'books',{ id:'books-list', data:data.result })
  //    }
  //  } catch (error) {
  //    console.error('Error fetching books at Home.jsx:', error)
  //    setError(error)
  //
  //  } finally {
  //    setLoading(false)
  //  }
  //}


  //useEffect(() => {
    //if (booksAvailable.length>0) { 
    //  console.log('HOME has these in store for you',  booksAvailable, booksAvailable.length)
    //  setLoading(false)
    //  return
    //}
    //
    //async function fetchData(){
    //  setLoading(true)
    //  setError(null)
    //  try {
    //    const response = await fetch(`${import.meta.env.VITE_API_URL}books`)
    //    if (!response.ok) throw new Error('Failed to fetch books!')
    //    const data = await response.json()
    //    setBooksAvailable(data.result)
    //  } catch (error) {
    //    console.error('Error fetching books:', error);
    //  } finally {
    //    setLoading(false)
    //  }
    //}
    //
    //fetchData()

    //fetchBooks()
    //fetch(`${import.meta.env.VITE_API_URL}books`)
    //  .then(res => res.json())
    //  .then(data => { 
    //    setBooksAvailable(data.result) 
    //  })
  //}, [])

  //useEffect(()=>{
  //  localStorage.setItem('_available', JSON.stringify(locally))
  //}
  //  , [locally])

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
