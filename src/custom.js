import {useState, useEffect } from 'react'

export function useLocalStorage(key, initialState){
  const [value, setValue] = useState(()=>{
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialState;
  })

  useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(value))

  },[key, value])
  
  return [value, setValue]

}
