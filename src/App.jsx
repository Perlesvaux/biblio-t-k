import { useState, Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import LoadingScreen from './LoadingScreen.jsx'
import Shelf from './Shelf.jsx'
const Home = lazy(()=> import('./Home.jsx'))
const Book = lazy(()=> import('./Book.jsx'))
import './App.css'
//import { useLocalStorage } from './custom.js'
//import { getFromDB, saveToDB } from './custom.js'
import { getFromDB, saveToDB } from './lib.js'

export default function App() {
  //const [books, setBooks] = useLocalStorage('_available', []);
  //const [books, setBooks] = useLocalStorage('_available', []);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async() =>{


    try {
      // try to get books from IndexedDB
      const cachedBooks = await getFromDB('booksDB', 'books', 'books-list')
      if (cachedBooks) {
        setBooks(cachedBooks.data)
      } else {
      // fetch books from the APO
        const response = await fetch(`${import.meta.env.VITE_API_URL}books`);
        const data = await response.json()
        setBooks(data)
        //setBooks(data.result)

      // Save the fetched data to IndexedDB
        await saveToDB('booksDB', 'books',{ id:'books-list', data:data })
        //await saveToDB('booksDB', 'books',{ id:'books-list', data:data.result })
      }
      
    } catch (error) {
      console.error('Error fetching books', error)
      
    }





  }



  useEffect(() => {
    // Skip fetch if books are already cached
    //if (books.length > 0) {
    //  console.log('Books already fetched!', books);
    //  return;
    //}

    // Fetch books from API
    //const fetchBooks = async () => {
    //  setLoading(true);
    //  setError(null);
    //
    //  try {
    //    const response = await fetch(`${import.meta.env.VITE_API_URL}books`);
    //    if (!response.ok) {
    //      throw new Error('Failed to fetch books');
    //    }
    //    const data = await response.json();
    //    setBooks(data.result); // Update state and localStorage
    //  } catch (err) {
    //    console.error('Error fetching books:', err);
    //    setError(err.message);
    //  } finally {
    //    setLoading(false);
    //  }
    //};

    fetchBooks();
  //}, [books, setBooks]); // Add setBooks to dependency array
  }, []); // Add setBooks to dependency array

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

