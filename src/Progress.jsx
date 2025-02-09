import './Progress.css'
import LoadingScreen from './LoadingScreen.jsx'
import { useProgress } from './lib.js'
import bookmark from './assets/bookmark.svg'
import { useEffect, useState } from 'react'

export default function Progress () {
  const [ progress, ref ] = useProgress()

  const [loading, setLoading] = useState(false)

  useEffect(() => {

    console.log('put to false')
    setLoading(true)
    //setState(<div className={ "bookmark buttonlike" }><LoadingScreen color="green" taste="ridge" /></div>)
    
   const timeout = setTimeout(() => {
    setLoading(false);
    }, 500);



    //console.log('progress updated')
    return () => 
      {
        clearTimeout(timeout)
        console.log('put to false')
        //setLoading(true)
      }
  }, [progress])

  //if (!progress && loading) return <div className={ "bookmark buttonlike" }><LoadingScreen color="pink" taste="dotted" /></div>
  //if (loading) return <div className={ "bookmark buttonlike" }><LoadingScreen color="green" taste="ridge" /></div>
  if(loading) return <div className={ "bookmark buttonlike" }> <img src={bookmark} /> </div>



  //if (!loading && progress)  <div className={ "bookmark buttonlike" }> <img src={bookmark} /> {progress}% </div>
  //if (!loading) return <div className={ "bookmark buttonlike" }><LoadingScreen color="blue" taste="solid" /></div>

  //if (!progress) return <div className={ "bookmark buttonlike" }><LoadingScreen color="pink" taste="dotted" /></div>
  
  


  return <div ref={ref} className={ "progress buttonlike" }> {progress}% </div>
}
