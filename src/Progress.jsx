import './Progress.css'
import LoadingScreen from './LoadingScreen.jsx'
import { useProgress } from './lib.js'
import bookmark from './assets/bookmark.svg'
import { useEffect, useState } from 'react'

export default function Progress () {
  const [ percent, loading ]= useProgress()
  //const [ loading, setLoading] =useState(true)
  //useEffect(()=>{
  //  setLoading(true)
  //  const load = setTimeout(()=>{
  //    setLoading(false)
  //  }, 400)
  //
  //  return () => clearTimeout(load)  
  //}, [raw])


  //if (loading) return <div> bookmark </div>

  if (loading) return <div  className={ "progress buttonlike" }> saving...  </div>
  return <div  className={ "progress buttonlike" }> {percent}% </div>
}
