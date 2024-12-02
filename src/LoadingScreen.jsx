import './LoadingScreen.css'

export default function LoadingScreen({ color, taste}){

  function paint(){
    if (!color) return "gray"
    const hue = color.toLowerCase()
    if( new Set( ["red","blue","green","purple","pink","yellow","gray"] ).has(hue) ) return hue
    return "gray"
  }

  function fashion(){
    if (!taste) return "solid"
    const kind = taste.toLowerCase()
    if ( new Set(["dotted","solid" ,"ridge" ,"dashed","double","groove","inset" ,"outset"]).has(kind) ) return kind
    return "solid"
  }

  return (<div className={`loader ${paint()} ${fashion()}`}>
    <div className="loader-inner"></div>
  </div>)

}

