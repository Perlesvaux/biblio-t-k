import { useState, Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import LoadingScreen from './LoadingScreen.jsx'
import Shelf from './Shelf.jsx'
const Home = lazy(()=> import('./Home.jsx'))
const Book = lazy(()=> import('./Book.jsx'))
import './App.css'


// Custom hook for localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}



export default function App() {
  const [books, setBooks] = useLocalStorage('_available', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Skip fetch if books are already cached
    if (books.length > 0) {
      console.log('Books already fetched!', books);
      return;
    }

    // Fetch books from API
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}books`);
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data.result); // Update state and localStorage
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [books, setBooks]); // Add setBooks to dependency array

  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  //const [state, setState] = useState([])
  //const [locally, setLocally] = useState(()=>{
  //  const saved = localStorage.getItem('_available')
  //  return saved ? JSON.parse(saved) : []
  //})
  //
  //useEffect(() => {
  //
  //  if (Array.isArray(locally) && locally.length>0) { 
  //    console.log('Available books already fetched! =D',  locally, locally.length)
  //    setState(locally)
  //    return
  //  }
  //
  //  console.log('should only run the first time', locally, locally.length)
  //  fetch(`${import.meta.env.VITE_API_URL}books`)
  //  .then(res => res.json())
  //  .then(data => {
  //  //console.log(data.result)
  //    setState(data.result)
  //    setLocally(data.result)
  //    })
  //
  //  //return ()=> setState(null)
  //}, [])
  //
  //useEffect(()=>{
  //  localStorage.setItem('_available', JSON.stringify(locally))
  //
  //}, [locally])


  //useEffect(()=>{
  //
  //  //if (Array.isArray(locally) && !locally.lenght) { 
  //  //  console.log('Available books already fetched! =D')
  //  //  setState(locally)
  //  //  console.log(locally)
  //  //  return
  //  //}
  //
  //}, [locally])

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

