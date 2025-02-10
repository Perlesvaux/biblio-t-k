import './Progress.css'
import { useProgress } from './lib.js'
import bookmark from './assets/bookmark.svg'

export default function Progress () {
  const [ percent, loading ]= useProgress()
  if (loading) return <div  className="progress buttonlike">  <sub>{percent}%</sub> <img className="bookmark" src={bookmark} /> </div>
  return 
}
